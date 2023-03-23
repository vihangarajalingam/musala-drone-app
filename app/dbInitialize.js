import { faker } from '@faker-js/faker';
import Drones from './models/droneModel.js';
import Medications from './models/medicationModel.js';
import DroneMedications from './models/droneMedicationsModel.js';
import sequelizeCon from './models/db.connection.js';
import constants from './config/constants/constants.js';

const init = async () => {
    try {
        await sequelizeCon.sync({ force: true });
        // seed
        for (let i = 0; i < 20; i += 1) {
            const drone = await Drones.create({
                serialNumber: faker.datatype.number({ max: 999999999 }),
                model: faker.helpers.arrayElement(constants.droneModels),
                weightLimit: faker.datatype.number({ min: 1, max: 500 }),
                batteryCapacity: faker.datatype.number({ min: 0, max: 100, precision: 0.01 }),
                state: faker.helpers.arrayElement(constants.droneStates)
            });
            const medication = await Medications.create({
                name: faker.lorem.word(),
                weight: faker.datatype.number({ min: 0, max: 500, precision: 0.01 }),
                code: faker.random.alpha({ count: 5, casing: 'upper' }),
                image: faker.image.dataUri()
            });
        }
    } catch (error) {
        console.log(error);
    }
}

export default init;