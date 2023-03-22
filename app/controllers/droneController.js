import droneMapper from "../mappers/droneMapper.js";
import constants from "../config/constants/constants.js";

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

export default {
    create
};