import constants from "../config/constants/constants.js";
import Drones from "../models/droneModel.js";

// Insert a new drone
const create = async (dronObj) => {
    return await Drones.create({ ...dronObj });
};

const setDroneState = async (droneID, state) => {
    return await Drones.update({ state: state }, {
        where: { id: droneID }
    });
}

const getDroneByID = async (droneID) => {
    return await Drones.findAll({
        where: { id: droneID }
    });
};

const getIdleDrones = async () => {
    return await Drones.findAll({
        where: { state: constants.droneStates[0] }
    });
};

const getDrones = async () => {
    return await Drones.findAll();
}

export default {
    create,
    setDroneState,
    getDroneByID,
    getIdleDrones,
    getDrones
};