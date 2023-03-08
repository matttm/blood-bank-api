const obj = require('../../../database');
async function getDonors(req, res) {
    console.log(obj);
    try {
        return obj.Donor.findAll();
    } catch (e) {
        console.error(`Error: ${e}`);
        return res.json({ success: false });
    }
}

module.exports = {
    getDonors
};
