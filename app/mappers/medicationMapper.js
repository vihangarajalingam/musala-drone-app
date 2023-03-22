import Medications from "../models/medicationModel.js";

// Get Medication by ID
const getMedicationByID = async (id) => {
    return await Medications.findAll({
        where:{ id: id }
    })
}