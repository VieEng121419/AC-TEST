export const searchData = (data, keyword, value) => {
    const results = data.filter((item) => item[keyword].trim().toLowerCase() == value.trim().toLowerCase());
    return results;
  }