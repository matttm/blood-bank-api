const models = require('../../../database');
const obj = require("../../../database");
async function getDonors(req, res) {
    console.log(models);
    try {
        return models.Donor.findAll();
    } catch (e) {
        console.error(`Error: ${e}`);
        throw e;
    }
}

async function getDonor(req, res) {
    const id = req.params['donor-id'];
    try {
        return res.json({
            ...await models.Donor.findOne({
                where: {
                    donorId: id
                }
            })
        });
    } catch (e) {
        console.error(`Error: ${e}`);
        throw e;
    }
}

async function createDonor(req, res) {
    try {
        return models.Donor.findAll();
    } catch (e) {
        console.error(`Error: ${e}`);
        return res.json({ success: false });
    }
}
module.exports = {
    getDonors,
    getDonor,
    createDonor
};
