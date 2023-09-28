import { error, fail, json, redirect } from '@sveltejs/kit';
import { getInvoiceDetails } from '../../../../models/invoiceserver';
import type { PageServerLoad } from './$types';
import invariant from 'tiny-invariant';
import { parseDate, validateAmount, validateDepositDate } from '$lib';
import { createDeposit } from '../../../../models/depositserver';
import { invalidate } from '$app/navigation';

export const load: PageServerLoad = async ({ params: { invoiceId } }) => {
	if (typeof invoiceId !== 'string') {
		throw new Error('This should be impossible.');
	}
	const invoiceDetails = await getInvoiceDetails(invoiceId);
	if (!invoiceDetails) {
		throw error(404, 'Not found');
	}

	return {
		invoiceDetails: {
			invoiceId: invoiceId,
			customerName: invoiceDetails.invoice.customer.name,
			customerId: invoiceDetails.invoice.customer.id,
			totalAmount: invoiceDetails.totalAmount,
			dueStatus: invoiceDetails.dueStatus,
			dueDisplay: invoiceDetails.dueStatusDisplay,
			invoiceDateDisplay: invoiceDetails.invoice.invoiceDate.toLocaleDateString(),
			lineItems: invoiceDetails.invoice.lineItems.map((li) => ({
				id: li.id,
				description: li.description,
				quantity: li.quantity,
				unitPrice: li.unitPrice
			})),
			deposits: invoiceDetails.invoice.deposits.map((deposit) => ({
				id: deposit.id,
				amount: deposit.amount,
				depositDateFormatted: deposit.depositDate.toLocaleDateString()
			}))
		}
	};
};

export const actions = {
	createDeposit: async ({ request }: { request: Request }) => {
		const formData = await request.formData();

		const invoiceId = formData.get('invoiceId');
		if (typeof invoiceId !== 'string') {
			throw new Error('This should be impossible.');
		}
		const intent = formData.get('intent');
		invariant(typeof intent === 'string', 'intent required');
		switch (intent) {
			case 'create-deposit': {
				const amount = Number(formData.get('amount'));
				const depositDateString = formData.get('depositDate');
				const note = formData.get('note');
				invariant(!Number.isNaN(amount), 'amount must be a number');
				invariant(typeof depositDateString === 'string', 'dueDate is required');
				invariant(typeof note === 'string', 'dueDate is required');
				const depositDate = parseDate(depositDateString);

				const errors = {
					amount: validateAmount(amount),
					depositDate: validateDepositDate(depositDate)
				};
				const hasErrors = Object.values(errors).some((errorMessage) => errorMessage);
				if (hasErrors) {
					return fail(422, {
						errors
					});
				}

				const data = {
					invoiceId,
					amount,
					depositDate,
					note
				};

				await createDeposit(data);
				throw redirect(303, `/sales/invoices/${invoiceId}`);
			}
			default: {
				throw error(404, `Unsupported intent: ${intent}`);
			}
		}
	}
};
