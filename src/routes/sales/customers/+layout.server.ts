import { getCustomerListItems } from '../../../models/customerserver';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	const customers = await getCustomerListItems();

	return { customers };
};
