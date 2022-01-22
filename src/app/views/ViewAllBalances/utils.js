export const formatBalances = (data) => {
    let newBalancesData = [];
    let id = 0;
    data.forEach((element) => {
      let idx = newBalancesData.findIndex(
        (balance) => balance.person === element.name
      );
      if (idx >= 0) {
        let prevBalance = newBalancesData[idx].balance;
        newBalancesData[idx] = {
          ...newBalancesData[idx],
          balance:
            element.nature === "C"
              ? prevBalance + element.balance
              : prevBalance - element.balance,
        };
      } else {
        newBalancesData.push({
          id: id,
          person: element.name,
          balance: element.balance,
        });
        id++;
      }
    });
    return newBalancesData;
  };