import { DataTypes } from 'sequelize';
import sequelizeCon from './db.connection.js';
import Drones from './droneModel.js';
import Medications from './medicationModel.js';

// Define drone medications model with validations (for loading drone)
const DroneMedications = sequelizeCon.define('droneMedications', {
    droneID: {
        type: DataTypes.INTEGER,
        references: {
            model: Drones,
            key: 'id'
        }
    },
    medicationID: {
        type: DataTypes.INTEGER,
        references: {
            model: Medications,
            key: 'id'
        }
    }
});

await DroneMedications.sync(); // Create table in DB if it doesn't exist

export default DroneMedications;