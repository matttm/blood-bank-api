const eventTypeEnum = {
  NewDonorApplicant: {
    code: "NDA",
    desc: "New Donor Applicant",
  },
  EditDonorApplicant: {
    code: "EDA",
    desc: "Edit Donor Applicant",
  },
  DeleteDonorApplicant: {
    code: "DDA",
    desc: "Delete Donor Applicant",
  },
  NewTransaction: {
    code: "NT",
    desc: "New Transaction",
  },
  EditTransaction: {
    code: "ET",
    desc: "Edit Transaction",
  },
};

module.exports = {
  eventTypeEnum,
};
