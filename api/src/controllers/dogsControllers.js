const axios = require('axios');
const { Dog, Temperament } = require('../db');

//------------------------API DOGS------------------------
const getApiDogs = async () => {
    try {
        let apiD = (await axios('https://api.thedogapi.com/v1/breeds')).data.map(d => {
            return {
                id: d.id,
                image: d.image.url,
                name: d.name,
                temperament: d.temperament,
                weight: d.weight.metric,
                height: d.height.metric,
                life_span: d.life_span,
            }
        })
        return apiD;  
    } catch (error) {
        console.log(error)   
    };
};

//------------------------DB DOGS------------------------
const getDbDogs = async () => {
    try {
        let dbD = await Dog.findAll({
            include: {
                model: Temperament,
                attributes: ['name'],
                through: {
                    attributes: [],
                }
            }
        });
        return dbD;
    } catch (error) {
        console.log(error) 
    }
};

//------------------------API + DB DOGS------------------------
const getAllDogs = async () => {
    try {
        const apiDogs = await getApiDogs();
        const dbDogs = await getDbDogs();
        const getAllDogs = apiDogs.concat(dbDogs);
        return getAllDogs;
    } catch (error) {
        console.log(error)
    }
};

module.exports = {
    getApiDogs,
    getDbDogs,
    getAllDogs
};