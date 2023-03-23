import Drones from "../models/droneModel.js";

// Insert a new drone
const create = async (dronObj) => {
    return await Drones.create({...dronObj});
};

const getDroneByID = async(droneID) => {
    return await Drones.findAll({
        where: { id: droneID }
    });
};

export default {
    create,
    getDroneByID
};