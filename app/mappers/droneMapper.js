import Drones from "../models/droneModel.js";

// Insert a new drone
const create = async (dronObj) => {
    return await Drones.create({...dronObj});
}

export default {
    create
};