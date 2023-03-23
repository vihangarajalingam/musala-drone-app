import DroneMedications from "../models/droneMedicationsModel.js";
import Drones from "../models/droneModel.js";
import Medications from "../models/medicationModel.js";

const create = async (droneMedicationsObj) => {
    return await DroneMedications.create({ ...droneMedicationsObj });
};

const getLoadedMedications = async (droneID) => {
    return await Drones.findAll({
        where: { id: droneID },
        include: Medications
    });
}

export default {
    create,
    getLoadedMedications
}