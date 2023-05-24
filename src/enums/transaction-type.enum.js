const transactionTypeEnum = {
  DONATION: {
    code: "D",
    desc: "DONATION",
  },
  TRANSFUSION: {
    code: "T",
    desc: "TRANSFUSION",
  },
};

const transactionTypeCds = Object.values(transactionTypeEnum).map(
  (v) => v.code
);

module.exports = {
  transactionTypeEnum,
  transactionTypeCds,
};
