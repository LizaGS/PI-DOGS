/* require('dotenv').config();
const API_KEY = process.env.API_KEY;
const axios = require('axios'); */
const { Temperament } = require('../db');
const { getApiDogs } = require('./dogsControllers');



//------------------------ADD TEMPERAMENTS TO DB------------------------
const addTemperaments = async (req, res) => {

    try {
        const checked = await Temperament.findAll();
        //console.log(checked);
        if (checked.length === 0) {
            const apiTemperaments = await getApiDogs();
            let onlyTemps = apiTemperaments.map(e => e.temperament).join(', ').split(', ').flat();
            onlyTemps = [... new Set(onlyTemps)].sort();
            onlyTemps.forEach(async (element) => {
                if (!element) return;
                const [createdTemp, isCreated] = await Temperament.findOrCreate({
                    where: {
                        name: element,
                    },
                    defaults: {
                        name: element,
                    },
                });
            });
            //console.log(onlyTemps)
            const tempsDb = await Temperament.findAll();
            return tempsDb;
        } else {
            return checked;
        }
        /* apiTemperaments.forEach((tem) => {
            if (typeof (tem.temperament) === 'string')
                temperaments = temperaments.concat(tem.temperament.split(', '))
        });
        //console.log(temperaments);
        temperaments = [...new Set(temperaments)].sort();
        console.log(temperaments);
        await Temperament.bulkCreate((temperaments).map((t) => {
            return {
                name: t
            }
        }))  */
    } catch (error) {
        console.log(error)
    }
};
/* addTemperaments(); */

module.exports = {
    addTemperaments
};
