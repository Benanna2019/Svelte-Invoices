import { error } from '@sveltejs/kit';
import {
	getCustomerDetails,
	getCustomerInfo,
	getCustomerListItems
} from '../../../../models/customerserver';
import type { PageServerLoad } from './$types';
import invariant from 'tiny-invariant';

export const load: PageServerLoad = async ({ params: { customerId } }) => {
	invariant(typeof customerId === 'string', 'params.customerId is not available');
	const customerInfo = await getCustomerInfo(customerId);
	if (!customerInfo) {
		throw error(404, 'not found');
	}
	const customerDetails = getCustomerDetails(customerId);
	const customers = await getCustomerListItems();

	return { customers, customerInfo, streamed: { customerDetails } };
};
