const DEFAULTS = [
  {
    value: "pending",
    label: "Pending",
  },
  {
    value: "cleared",
    label: "Cleared",
  },
  {
    value: "returned",
    label: "Returned",
  },
];

export const STATUS = {
  PERSONAL: [...DEFAULTS, { value: "cancelled", label: "Cancelled" }],
  EXTERNAL: [
    ...DEFAULTS,
    { value: "transferred", label: "Transferred" },
    { value: "completed_history", label: "Completed History" },
  ],
};
