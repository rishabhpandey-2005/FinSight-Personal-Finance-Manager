export const getCurrentUser = () => {
    return JSON.parse(
      localStorage.getItem("currentUser")
    );
  };
  
  export const getTransactionKey = () => {
    const user = getCurrentUser();
  
    if (!user) {
      return "transactions_guest";
    }
  
    return `transactions_${user.email}`;
  };
  
  export const getBudgetKey = () => {
    const user = getCurrentUser();
  
    if (!user) {
      return "budget_guest";
    }
  
    return `budget_${user.email}`;
  };