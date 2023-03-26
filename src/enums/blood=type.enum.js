const bloodTypeEnum = {
    A: {
        cd: 'A',
        desc: ''
    },
    B: {
        cd: 'B',
        desc: ''
    },
    AB: {
        cd: 'AB',
        desc: ''
    },
    O: {
        cd: 'O',
        desc: ''
    }
};

const bloodTypeCds = Object.values(bloodTypeEnum).map((obj) => obj.cd);

module.exports = {
    bloodTypeCds,
    bloodTypeEnum
};
