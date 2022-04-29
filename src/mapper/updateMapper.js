export const sheet1Mapper = (apiData) => {
    return apiData.map((data, index) => {
        return ({
          date: data[0],
          item: data[1],
          income: data[2],
          expense: data[3],
          accountType:data[4],
          row:index+2
        });
    });
  };
  