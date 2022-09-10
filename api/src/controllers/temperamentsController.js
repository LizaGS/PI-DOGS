const { Temperament } = require('../db');
const { getApiDogs } = require('./dogsControllers');


//------------------------ADD TEMPERAMENTS TO DB------------------------
const addTemperaments = async () => {
    const apiTemperaments = (await getApiDogs()).map((tem) => tem.temperament);
    //console.log(apiTemperaments);

    try {
        let temperaments = apiTemperaments.join().split(',');
        temperaments = temperaments.filter(e => e);
        //temperaments = temperaments.filter((e, index) => temperaments.indexOf(e) === index).sort();
        temperaments = [...new Set(temperaments)].sort();
        //console.log(temperaments);
        await Temperament.bulkCreate(temperaments.map((t) => {
            return {
                name: t
            }
        }))
    } catch (error) {
        console.log(error)
    }
};
addTemperaments();

module.exports = {
    addTemperaments
};
