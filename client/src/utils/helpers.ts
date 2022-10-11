const getNumberFromIntervalValue = (str: string) => {
  return Number(str.slice(0, 1)) * 1000;
};

export default getNumberFromIntervalValue;
