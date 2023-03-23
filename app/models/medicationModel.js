import { DataTypes } from 'sequelize';
import sequelizeCon from './db.connection.js';

// Define medicine model with validations
const Medications = sequelizeCon.define('medications', {
    name: {
        type: DataTypes.STRING, allowNull: false,
        validate: {
            is: { args: /^[a-zA-Z0-9_-]+$/i, msg: 'Name can only contain alphanumeric characters, _ and -' }
        }
    },
    weight: {
        type: DataTypes.DOUBLE, allowNull: false,
        validate: {
            isNumeric: { msg: 'Weight should be numeric' },
            max: { args: 500, msg: 'Max weight is 500' }
        }
    },
    code: {
        type: DataTypes.STRING, allowNull: false,
        validate: {
            is: { args: /^[A-Z0-9_]+$/i, msg: 'Name can only contain uppercase letters, numbers and _' }
        }
    },
    image: {
        type: DataTypes.BLOB
    }
});

await Medications.sync(); // Create table in DB if it doesn't exist

export default Medications;
