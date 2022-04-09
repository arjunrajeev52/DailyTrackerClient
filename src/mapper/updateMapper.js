export const updateMapper = (apiData, rowNumber) => {
    apiData.map((data, index) => {
        return ((index + 1 === rowNumber) ?{
          name: "arjun",
          age: "20",
          salary: "2000",
          hobby: "test",
        }:'');
    });
  };
  