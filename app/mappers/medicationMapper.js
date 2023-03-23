import Medications from "../models/medicationModel.js";

const getMedicationByCode = async (code) => {
    return await Medications.findAll({
        where:{ code: code }
    })
}

export default {
    getMedicationByCode
}