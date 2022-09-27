require('dotenv').config(); // para variables de entorno como .env
const axios = require('axios');
const API_KEY = process.env.API_KEY;
const { Dog, Temperament } = require('../db');

//------------------------API DOGS------------------------
const getApiDogs = async () => {
    try {
        let apiD = (await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)).data.map(d => {
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
        //console.log(apiD);
        return apiD;  
    } catch (error) {
        console.log(error)   
    };
};

//------------------------DB DOGS------------------------
const getDbDogs = async () => {
    try {
        return await Dog.findAll({
            include: {
                model: Temperament,
                attributes: ['name'],
                through: {
                    attributes: [],
                }
            }
        });
    } catch (error) {
        console.log(error) 
    }
};

//------------------------API + DB DOGS------------------------
const getAllDogs = async () => {
    try {
        let apiDogs = await getApiDogs();
        let dbDogs = await getDbDogs();
        dbDogs = dbDogs.map(d => {
            return {
                id: d.id,
                image: d.image,
                name: d.name,
                temperament: d.temperaments.map(e => e.name).join(', '),
                weight: d.weight,
                height: d.height,
                life_span: d.life_span,
            }
        })
        //console.log(dbDogs);
        const getAllDogs = [...dbDogs, ...apiDogs];
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