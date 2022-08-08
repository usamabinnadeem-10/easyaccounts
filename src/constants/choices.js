export const PERSON_OPTIONS = [
  {
    label: 'Customer',
    value: 'C',
  },
  {
    label: 'Supplier',
    value: 'S',
  },
  {
    label: 'Equity',
    value: 'E',
  },
  {
    label: 'Advance Expense',
    value: 'EXA',
  },
];

export const NATURE_OPTIONS = [
  {
    label: 'Debit',
    value: 'D',
  },
  {
    label: 'Credit',
    value: 'C',
  },
];

export const INVOICE_OPTIONS = [
  {
    label: 'Customer Invoice',
    value: 'INV',
  },
  {
    label: 'Maal Wapsi Customer',
    value: 'MWC',
  },
  {
    label: 'Supplier Purchase',
    value: 'SUP',
  },
  {
    label: 'Maal Wapsi Supplier',
    value: 'MWS',
  },
];

export const RAW_PRODUCT_TYPES = [
  {
    label: 'Standard',
    value: 'Standard',
  },
  {
    label: 'Baara',
    value: 'Baara',
  },
];

export const EXPENSE_TYPES = [
  { value: 'rent', label: 'Rent' },
  { value: 'electricity', label: 'Electricity' },
  { value: 'maintenance', label: 'Maintenance' },
  { value: 'salary', label: 'Salary' },
  { value: 'transportation', label: 'Transportation' },
  { value: 'administrative', label: 'Administrative' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'refreshments', label: 'Refreshments' },
  { value: 'food', label: 'Food' },
  { value: 'special', label: 'Special' },
  { value: 'commission', label: 'Commission' },
  { value: 'printing', label: 'Printing' },
  { value: 'legal', label: 'Legal' },
  { value: 'communication', label: 'Communication' },
  { value: 'nagh_mazdoori', label: 'Nagh Mazdoori' },
  { value: 'construction', label: 'Construction' },
  { value: 'taxation', label: 'Taxation' },
  { value: 'software', label: 'Software' },
  { value: 'other', label: 'Other' },
];

export const ASSET_TYPES = [
  { value: 'property', label: 'Property' },
  { value: 'equipment', label: 'Equipment' },
  { value: 'investment', label: 'Investment' },
  { value: 'vehicle', label: 'Vehicle' },
];

export const ASSET_STATUS = [
  { value: 'P', label: 'Purchased' },
  { value: 'S', label: 'Sold' },
];

export const ACTIVITY_LOG_CATEGORY = [
  { value: 'transaction', label: 'Transaction' },
  { value: 'cancelled_transaction', label: 'Cancelled Transaction' },
  { value: 'expense', label: 'Expense' },
  { value: 'ledger_entry', label: 'Ledger entry' },
  { value: 'external_cheque', label: 'External cheque' },
  { value: 'external_cheque_history', label: 'External cheque history' },
  { value: 'personal_cheque', label: 'Personal cheque' },
  { value: 'personal_cheque_history', label: 'Personal cheque history' },
  { value: 'stock_transfer', label: 'Stock transfer' },
  { value: 'cancelled_stock_transfer', label: 'Cancelled stock transfer' },
  { value: 'person', label: 'Person' },
  { value: 'account_type', label: 'Account type' },
  { value: 'warehouse', label: 'Warehouse' },
  { value: 'product', label: 'Product' },
  { value: 'product_category', label: 'Product category' },
  { value: 'area', label: 'Area' },
  { value: 'payment', label: 'Payment' },
];

export const ACTIVITY_LOG_TYPE = [
  { value: 'C', label: 'Created' },
  { value: 'E', label: 'Edited' },
  { value: 'D', label: 'Deleted' },
];
