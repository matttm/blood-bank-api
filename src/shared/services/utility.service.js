function UtilityService() {
  const deepCopy = (o) => {
    return JSON.parse(JSON.stringify(o));
  };
  return Object.freeze({
    deepCopy,
  });
}

module.exports = new UtilityService();
