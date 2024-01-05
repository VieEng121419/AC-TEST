export const searchData = (data, keyword, value) => {
    const results = data.filter((item) => item[keyword] === value);
    return results;
  }