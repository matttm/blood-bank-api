const donorService = require('./donors.service');

async function getDonors(req, res) {
    try {
        const donors = await donorService.getDonors();
        return res.json(donors);
    } catch (e) {
        const error = 'Error while getting donors';
        console.error(`${error}`);
        return res.send(error);
    }
}

async function getDonor(req, res) {
    const id = req.params['id'];
    try {
        const donor = await donorService.getDonor(id);
        return res.json(donor);
    } catch (e) {
        const error = 'Error while getting donor';
        console.error(`${error}`);
        return res.send(error);
    }
}

async function createDonor(req, res) {
    try {
        const { firstName, lastName, bloodType } = req.body;
        const success = await donorService.createDonor(firstName, lastName, bloodType);
        return res.status(200).json({ ...success });
    } catch (e) {
        const error = 'Error while creating new donor';
        console.error(`${error}`);
        return res.status(500).send(error);
    }
}

async function updateDonor(req, res) {
    try {
        const {id} = req.params;
        const { firstName, lastName, bloodType } = req.body;
        const success = await donorService.updateDonor(id, firstName, lastName, bloodType);
        return res.json({ ...success });
    } catch (e) {
        const error = 'Error while updating donor';
        console.error(`${error}`);
        return res.send(error);
    }
}

async function deleteDonor(req, res) {
    try {
        const {id} = req.params;
        const success = await donorService.deleteDonor(id);
        return res.json({ ...success });
    } catch (e) {
        const error = 'Error while updating donor';
        console.error(`${error}`);
        return res.send(error);
    }
}
module.exports = {
    getDonors,
    getDonor,
    createDonor,
    updateDonor,
    deleteDonor
};
