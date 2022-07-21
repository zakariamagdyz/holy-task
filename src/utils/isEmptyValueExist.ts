export const isEmptyValueExist = <k extends Record<string, string>>(obj: k) => {
  let isEmpty = false;
  let key: keyof k;
  for (key in obj) {
    if (obj[key].trim() === "") {
      isEmpty = true;
      break;
    }
  }
  return isEmpty;
};
