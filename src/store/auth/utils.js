export const clearLocalStorage = () => {
  localStorage.clear();
};

export const setActiveBranch = (branch) => {
  localStorage.setItem('activeBranchId', branch.branch_id);
  localStorage.setItem('activeBranchName', branch.branch_name);
  localStorage.setItem('userRole', branch.role);
  localStorage.setItem('permissions', JSON.stringify(branch.permissions));
};

export const getActiveBranch = () => {
  return {
    branch_id: localStorage.getItem('activeBranchId'),
    branch_name: localStorage.getItem('activeBranchName'),
    role: localStorage.getItem('userRole'),
    permissions: JSON.parse(localStorage.getItem('permissions')),
  };
};
