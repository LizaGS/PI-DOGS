//const axios = require('axios');
const {Dog, Temperament} = require('../db');
const { getAllDogs } = require('./dogsControllers');

//-------------------------GET DOGS & BY QUERY-------------------------
const getDogs = async (req, res) => {
    const {name} = req.query;
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
        if(name) {
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
    const {id} = req.params;
    const dogs = await getAllDogs();

    try {
        while(id) {
            const idDog = dogs.filter(e => e.id == id); // con === no lo encuentra
            console.log(idDog)
            idDog.length ?
            res.status(200).send(idDog) :
            res.status(400). send('This dog does not exist');
        }      
    } catch (error) {
        console.log(error)
    }
};

//-------------------------GET TEMPERAMENTS-------------------------
const getTemperaments = async(req, res, next) => {
    try {
        const temperaments = await Temperament.findAll({attributes: ['name']});
        res.status(200).send(temperaments);
    } catch (error) {
        next(error)
    }

};

//-------------------------POST DOG-------------------------
const newDog = async (req, res) => {
    const {name, image, temperament, height, weight, life_span, createdInDb} = req.body;
    
    try {
        if(!name || !image || !temperament || !height || !weight || !life_span) res.status(400).send('Missing data')
        const createDog = await Dog.create({
            name, 
            image, 
            temperament, 
            height, 
            weight, 
            life_span, 
            createdInDb
        });
        const getTemperament = await Temperament.findAll({
            where: {name: temperament}
        });
        createDog.addTemperament(getTemperament);
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