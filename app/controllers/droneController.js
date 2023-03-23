import droneMapper from "../mappers/droneMapper.js";
import medicationMapper from "../mappers/medicationMapper.js";
import Medications from "../models/medicationModel.js";
import constants from "../config/constants/constants.js";
import droneMedicationsMapper from "../mappers/droneMedicationsMapper.js";

// Validate and insert a drone
const create = async (req, res) => {
    const { body } = req;
    try {
        const drone = await droneMapper.create({
            serialNumber: body.serialNumber,
            model: body.model,
            weightLimit: body.weightLimit,
            batteryCapacity: body.batteryCapacity,
            state: body.state
        });

        res.status(200).send({ drone });
    } catch (error) {
        const errorMessage = error['errors'][0].message || error;
        res.status(500).send({ message: errorMessage })
    }
};

const load = async (req, res) => {
    const { body } = req;
    let valid = true;
    if (!body.droneID) {
        valid = false;
        res.status(400).send({ message: 'Drone ID is mandatory' });
    }
    if (!(Array.isArray(body.medications) && body.medications.length > 0)) {
        valid = false;
        res.status(400).send({ message: 'Medications array should have at least 1 medicine code' });
    }
    const drone = await droneMapper.getDroneByID(body.droneID);
    if (drone.length <= 0) {
        valid = false;
        res.status(400).send({ message: 'Invalid drone ID' });
    }
    const droneFromDB = drone[0]['dataValues'];
    if (droneFromDB.state !== constants.droneStates[0]) { // Check if drone is not in idle state
        valid = false;
        res.status(400).send({ message: 'Drone is not in IDLE state' });
    }
    if (droneFromDB.batteryCapacity < 25) {
        valid = false;
        res.status(400).send({ message: 'Battery capacity of drone is not above 25%' });
    }
    if (valid) {
        await droneMapper.setDroneState(droneFromDB.id, constants.droneStates[1]); // Set drone state to loading
        const { medications } = body;
        let totalWeight = 0;
        let medicationFromDB;
        for (const medication of medications) {
            medicationFromDB = await medicationMapper.getMedicationByCode(medication);
            if (medicationFromDB.length > 0) {
                totalWeight += medicationFromDB[0]['dataValues']['weight'];
            } else {
                res.status(400).send({ message: 'Invalid medication code' });
            }
        }
        if (totalWeight <= droneFromDB.weightLimit) {
            try {
                await droneMedicationsMapper.create({ droneID: drone.id, medicationID: medicationFromDB[0]['dataValues']['id'] });
            } catch (error) {
                await droneMapper.setDroneState(droneFromDB.id, constants.droneStates[0]);
                throw error;
            }
            await droneMapper.setDroneState(droneFromDB.id, constants.droneStates[2]);
            res.status(200).send();
        } else {
            await droneMapper.setDroneState(droneFromDB.id, constants.droneStates[0]);
            res.status(400).send({ message: 'Total weight of medications exceeds drone max weight limit' });
        }
    }
};

const getLoadedMedication = async (req, res) => {
    const droneID = req.query.droneID;
    let valid = true;
    if (!droneID) {
        valid = false;
        res.status(400).send({ message: 'Drone ID is mandatory' });
    }
    const drone = await droneMapper.getDroneByID(droneID);
    if (drone.length <= 0) {
        valid = false;
        res.status(400).send({ message: 'Invalid drone ID' });
    }
    const droneFromDB = drone[0]['dataValues'];
    if (droneFromDB.state !== constants.droneStates[2]) { // Check if drone is not in loaded state
        valid = false;
        res.status(400).send({ message: 'Drone is not in LOADED state' });
    }
    if (valid) {
        const droneMedications = await droneMedicationsMapper.getLoadedMedications(droneFromDB.id);
        // const medicationFromDB = await medicationMapper.getMedicationByCode(droneMedications[0]['dataValues']['code']);
        return res.status(200).send({ droneMedications });
    }
};

export default {
    create,
    load,
    getLoadedMedication
};