function UtilityService() {
  const deepCopy = (o) => {
    return JSON.parse(JSON.stringify(o));
  };
  const cleanObject = (fields, object) => {
    return Object.fromEntries(
      Object.entries(object).filter(([k, v]) => fields.includes(k))
    );
  };
  return Object.freeze({
    deepCopy,
    cleanObject,
  });
}

module.exports = UtilityService();
