import { error, redirect } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';
import invariant from 'tiny-invariant';
import { deleteDeposit, getDepositDetails } from '../../../../models/depositserver';

export const load: PageServerLoad = async ({ params: { depositId } }) => {
	invariant(typeof depositId === 'string', 'params.depositId is not available');
	const depositDetails = await getDepositDetails(depositId);
	if (!depositDetails) {
		throw error(404, 'not found');
	}

	return { depositDetails };
};

export const actions = {
	deleteDeposit: async ({ request }: { request: Request }) => {
		const formData = await request.formData();
		const invoiceId = formData.get('invoiceId');

		const depositId = formData.get('depositId');
		invariant(typeof depositId === 'string', 'params.depositId is not available');

		const intent = formData.get('intent');
		invariant(typeof intent === 'string', 'intent must be a string');
		switch (intent) {
			case 'delete': {
				await deleteDeposit(depositId);

				throw redirect(303, `/sales/invoices/${invoiceId}`);
			}
			default: {
				throw error(404, `Unsupported intent: ${intent}`);
			}
		}
	}
};
