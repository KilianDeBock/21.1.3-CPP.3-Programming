export const saveArray = (key, arr) => {
  const arrStr = JSON.stringify(arr);
  localStorage.setItem(key, arrStr);
};

export const getArray = (key) => {
  return JSON.parse(localStorage.getItem(key)) || [];
};
