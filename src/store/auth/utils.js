export const clearLocalStorage = () => {
  localStorage.clear();
};

export const setActiveBranch = (branch) => {
  localStorage.setItem("activeBranchId", branch.branch_id);
  localStorage.setItem("activeBranchName", branch.branch_name);
};

export const getActiveBranch = () => {
  return {
    branch_id: localStorage.getItem("activeBranchId"),
    branch_name: localStorage.getItem("activeBranchName"),
  };
};
