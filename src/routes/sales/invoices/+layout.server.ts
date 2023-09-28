import { getInvoiceListItems } from '../../../models/invoiceserver';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	const invoiceListItems = await getInvoiceListItems();
	const dueSoonAmount = invoiceListItems.reduce((sum, li) => {
		if (li.dueStatus !== 'due') {
			return sum;
		}
		const remainingBalance = li.totalAmount - li.totalDeposits;
		return sum + remainingBalance;
	}, 0);
	const overdueAmount = invoiceListItems.reduce((sum, li) => {
		if (li.dueStatus !== 'overdue') {
			return sum;
		}
		const remainingBalance = li.totalAmount - li.totalDeposits;
		return sum + remainingBalance;
	}, 0);
	return { invoiceListItems, dueSoonAmount, overdueAmount };
};
