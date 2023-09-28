import invariant from 'tiny-invariant';
import { getCustomerListItems } from '../../../../models/customerserver';
import type { PageServerLoad } from './$types';
import {
	parseDate,
	validateCustomerId,
	validateDueDate,
	validateLineItemQuantity,
	validateLineItemUnitPrice
} from '$lib';
import { createInvoice, type LineItemFields } from '../../../../models/invoiceserver';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	const customers = await getCustomerListItems();

	return { customers };
};

export const actions = {
	create: async ({ request }: { request: Request }) => {
		const formData = await request.formData();

		const intent = formData.get('intent');
		switch (intent) {
			case 'create': {
				const customerId = formData.get('customerId');
				const dueDateString = formData.get('dueDateString');
				invariant(typeof customerId === 'string', 'customerId is required');
				invariant(typeof dueDateString === 'string', 'dueDate is required');
				const dueDate = parseDate(dueDateString);

				const lineItemIds = formData.getAll('lineItemId');
				const lineItemQuantities = formData.getAll('quantity');
				const lineItemUnitPrices = formData.getAll('unitPrice');
				const lineItemDescriptions = formData.getAll('description');
				const lineItems: Array<LineItemFields> = [];
				for (let i = 0; i < lineItemQuantities.length; i++) {
					// @ts-ignore
					const quantity = +lineItemQuantities[i];
					// @ts-ignore
					const unitPrice = +lineItemUnitPrices[i];
					const description = lineItemDescriptions[i];
					invariant(typeof quantity === 'number', 'quantity is required');
					invariant(typeof unitPrice === 'number', 'unitPrice is required');
					invariant(typeof description === 'string', 'description is required');

					lineItems.push({ quantity, unitPrice, description });
				}

				const errors = {
					customerId: validateCustomerId(customerId),
					dueDate: validateDueDate(dueDate),
					lineItems: lineItems.reduce((acc, lineItem, index) => {
						const id = lineItemIds[index];
						invariant(typeof id === 'string', 'lineItem ids are required');
						acc[id] = {
							quantity: validateLineItemQuantity(lineItem.quantity),
							unitPrice: validateLineItemUnitPrice(lineItem.unitPrice)
						};
						return acc;
					}, {} as Record<string, { quantity: null | string; unitPrice: null | string }>)
				};

				const customerIdHasError = errors.customerId !== null;
				const dueDateHasError = errors.dueDate !== null;
				const lineItemsHaveErrors = Object.values(errors.lineItems).some((lineItem) =>
					Object.values(lineItem).some(Boolean)
				);
				const hasErrors = dueDateHasError || customerIdHasError || lineItemsHaveErrors;
				if (hasErrors) {
					console.log('has errors', hasErrors);
					return fail(422, {
						errors
					});
				}

				const data = {
					dueDate,
					customerId,
					lineItems
				};

				const newInvoice = await createInvoice(data);

				throw redirect(303, `/sales/invoices/${newInvoice.id}`);
			}
		}
	}
};
