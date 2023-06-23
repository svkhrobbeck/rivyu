export const filterUniqueObjects = (arr, key) => {
  let seen = new Set();
  return arr.filter(obj => {
    let value = obj[key];
    if (!seen.has(value)) {
      seen.add(value);
      return true;
    }
    return false;
  });
};

export default filterUniqueObjects;
