import { DataTypes } from 'sequelize';
import sequelizeCC from './db.js';
import constants from '../config/constants/constants.js';

// Define drone model with validations
const Drones = sequelizeCC.define('drones', {
    serialNumber: {
        type: DataTypes.INTEGER(100), allowNull: false, unique: true,
        validate: {
            isInt: { msg: 'Serial number should be an integer' },
            len: { args: [1, 100], msg: 'Serial number should have a max length of 100 chars' },
        }
    },
    model: {
        type: DataTypes.STRING(20), allowNull: false,
        validate: {
            isIn: { args: [`${constants.droneModels}`], msg: `Invalid drone model. Allowed drone models are: ${constants.droneModels}` }
        }
    },
    weightLimit: {
        type: DataTypes.INTEGER(3), allowNull: false,
        validate: {
            isInt: { msg: 'Weight limit should be an integer' },
            max: { args: 500, msg: 'Max weight is 500' }
        }
    },
    batteryCapacity: {
        type: DataTypes.DOUBLE, allowNull: false,
        validate: {
            isNumeric: { msg: 'Battery capacity should be a number' },
            max: { args: 100, msg: 'Max battery capacity is 100' }
        },
    },
    state: {
        type: DataTypes.STRING(20), allowNull: false,
        validate: { 
            isIn: { args: [`${constants.droneStates}`], msg: `Invalid drone state. Allowed drone states are: ${constants.droneStates}` }
         }
    }
});

await Drones.sync(); // Create table in DB if it doesn't exist

export default Drones;