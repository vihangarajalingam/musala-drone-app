import Drones from './droneModel.js';
import Medications from './medicationModel.js';
import DroneMedications from './droneMedicationsModel.js';

Drones.belongsToMany(Medications, { through: DroneMedications });
Medications.belongsToMany(Drones, { through: DroneMedications });
