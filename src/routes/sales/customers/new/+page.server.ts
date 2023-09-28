import invariant from 'tiny-invariant';
import { createCustomer } from '../../../../models/customerserver';
import { error, redirect } from '@sveltejs/kit';

export const actions = {
	create: async ({ request }: { request: Request }) => {
		const formData = await request.formData();

		const intent = formData.get('intent');
		switch (intent) {
			case 'create': {
				const name = formData.get('name');
				const email = formData.get('email');
				invariant(typeof name === 'string', 'name is required');
				invariant(typeof email === 'string', 'email is required');

				const data = {
					name,
					email
				};

				const customer = await createCustomer(data);

				// handle the redirect/navigation on the frontend
				// res.redirect(`/sales/customers/${customer.id}`);
				throw redirect(303, `/sales/customers/${customer.id}`);
			}
		}
		throw error(400, `Unsupported intent: ${intent}`);
	}
};
