//const axios = require('axios');
const { Dog, Temperament } = require('../db');
const { getAllDogs, getApiDogs } = require('./dogsControllers');
const { addTemperaments } = require('./temperamentsController');

//-------------------------GET DOGS & BY QUERY-------------------------
const getDogs = async (req, res) => {
    const { name } = req.query;
    const dogs = (await getAllDogs()).map(d => {
        return {
            id: d.id,
            image: d.image,
            name: d.name,
            temperament: d.temperament,
            weight: d.weight            
        }
    });

    try {
        if (name) {
            let breeds = dogs.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
            breeds.length ?
                res.status(200).send(breeds) :
                res.status(400).send('This dog does not exist');
        }
        res.send(dogs)
    } catch (error) {
        console.log(error)
    }
};

//-------------------------GET DOGS BY ID-------------------------
const getDogId = async (req, res) => {
    const { id } = req.params;
    const dogs = await getAllDogs();

    try {
        while (id) {
            const idDog = dogs.filter(e => e.id == id);
            /* console.log(idDog) */
            idDog.length ?
                res.status(200).send(idDog) :
                res.status(400).send('Dog not found');

            /* if (idDog.id.length > 20) {
                const dbDog = idDog.map(d => {
                    return {
                        id: d.id,
                        image: d.image,
                        name: d.name,
                        temperament: d.temperaments.map(e => e.name).join(', '),
                        weight: d.weight,
                        height: d.height,
                        life_span: d.life_span,
                    }

                });
                res.status(200).send(dbDog);
            } else {
                res.status(200).send(idDog);
            } */
            /* if (isNaN(idDog.id)) {
                let dbDog = idDog.map(d => {
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
                res.status(200).send(dbDog)
            }
            else res.status(200).send(idDog); */
        }
    } catch (error) {
        console.log(error)
    }
};

/* const getDogId = async (req, res) => {
    const { id } = req.params;

    try {
        if (id.length > 20) {
            const dogDb = await Dog.findAll({
                include: {
                    model: Temperament,
                    attributes: ['name'],
                    through: {
                        attributes: [],
                    }
                }
            });
            let dogDB = await dogDb.filter(e => e.id === id);
            dogDB = dogDB.map(d => {
                return {
                    id: d.id,
                    image: d.image,
                    name: d.name,
                    temperament: d.temperaments.map(e => e.name).join(', '),
                    weight: d.weight,
                    height: d.height,
                    life_span: d.life_span,
                }
            });
            console.log(dogDB)
            dogDB.length ?
                res.status(200).send(dogDB) :
                res.status(400).send('Dog not found in the DB')
        } else {
            const apiDog = await getApiDogs();
            const dog = apiDog.filter(e => e.id == id);
            console.log(dog)
            dog.length ?
                res.status(200).send(dog) :
                res.status(400).send('Dog not found in the API')
        }
    } catch (error) {
        console.log(error)
    }
}; */

//-------------------------GET TEMPERAMENTS-------------------------
const getTemperaments = async (req, res, next) => {
    try {
        const tempsDb = await addTemperaments();
        res.status(200).send(tempsDb);
        /* res.status(400).send('No temperaments in the DB');    GET/temperaments 500*/
    } catch (error) {
        next(error)
    }
};

//-------------------------POST DOG-------------------------
const newDog = async (req, res) => {
    const { name, image, temperament, height, weight, life_span, createdInDb } = req.body;

    try {
        if (!name || !image || !temperament || !height || !weight || !life_span) res.status(400).send('Missing data')
        const createDog = await Dog.create({
            name,
            image,
            height,
            weight,
            life_span,
            createdInDb
        });
        const getTemperament = await Temperament.findAll({
            where: { name: temperament }
        });
        createDog.addTemperaments(getTemperament);
        res.send(createDog);
    } catch (error) {
        console.log(error)
    }
};
    


module.exports = {
    getDogs,
    getDogId,
    getTemperaments,
    newDog,
};