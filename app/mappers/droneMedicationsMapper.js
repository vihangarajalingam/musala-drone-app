import DroneMedications from "../models/droneMedicationsModel.js";

const create = async (droneMedicationsObj) => {
    return await DroneMedications.create({ ...droneMedicationsObj });
};

export default {
    create
}