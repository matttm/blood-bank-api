const { Donor } = require('../../../database');
async function getDonors(req, res) {
    return Donor.findAll();
}

module.exports = {
    getDonors
};
