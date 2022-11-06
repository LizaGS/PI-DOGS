import axios from 'axios';
export const GET_DOGS = 'GET_DOGS';
export const GET_BREED = 'GET_BREED';
export const BREED_DETAIL = 'BREED_DETAIL';
export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS';
export const FILTER_BY_TEMPS = 'FILTER_BY_TEMPS';
export const GET_CREATED = 'GET_CREATED';
export const GET_ORDERED = 'GET_ORDERED';
export const GET_ARRANGED = 'GET_ARRANGED';
export const POST_DOG = 'POST_DOG';

//----------------Función - acción que me trae todos los perros----------------
export const getDogs = () => {
    return function (dispatch) {
        return fetch('http://localhost:3001/dogs')
            .then(data => data.json())
            .then(res => {
                return dispatch({
                    type: GET_DOGS,
                    payload: res
                })
            })
    }
};

/* export const getDogs = () => {
    return async function (dispatch) {
        let dogs = await axios('http://localhost:3001/dogs')
        return dispatch({
            type: GET_DOGS,
            payload: dogs.data
        })
    };
}; */

//----------------Función - acción que me trae la raza que quiero----------------
export const getBreed = (name) => {
    return async function (dispatch) {
        let breed = await axios(`http://localhost:3001/dogs?name=${name}`)
        return dispatch({
            type: GET_BREED,
            payload: breed.data
        })
    }
};

//----------------Función - acción trae detalle de la raza(id)----------------
export const breedDetail = (id) => {
    return async function (dispatch) {
        let detail = await axios(`http://localhost:3001/dogs/${id}`)
        return dispatch({
            type: BREED_DETAIL,
            payload: detail.data
        })
    };
};

//----------------Función - acción trae los temperamentos----------------
export const getTemperaments = () => {
    return async function (dispatch) {
        const temperaments = await axios('http://localhost:3001/temperaments');
        return dispatch({
            type: GET_TEMPERAMENTS,
            payload: temperaments.data
        })
    };
};

//----------------Función - acción post dog----------------
export const postDog = (payload) => {
    return async function (dispatch) {
        const newDog = {
            name: payload.name,
            image: payload.image,
            height: payload.min_height + ' - ' + payload.max_height,
            weight: payload.min_weight + ' - ' + payload.max_weight,
            life_span: payload.min_life_span + ' - ' + payload.max_life_span + ' years',
            temperament: payload.temperament,
        }
        const post = await axios.post('http://localhost:3001/dogs', newDog)
        return dispatch({
            type: POST_DOG,
            payload: post.data
        })
    };
};

//----------------FUNCIONES DE FILTRO----------------

//Filtrar por temperamentos
export const filterByTemps = (payload) => {
    return {
        type: FILTER_BY_TEMPS, payload
    };
};

//Filtrar por creados
export const getCreated = (payload) => {
    return {
        type: GET_CREATED, payload
    };
};

//Filtrar por orden alfabético
export const getOrdered = (payload) => {
    return {
        type: GET_ORDERED, payload
    };
};

//Filtrar por peso
export const getArranged = (payload) => {
    return {
        type: GET_ARRANGED, payload
    };
};

//LOADING
export const setLoading = (payload) => {
    return {
        type: "LOADING", payload
    };
};

//CLEAR DETAIL
export const setClearDetail = () => {
    return {
        type: "CLEAR_DETAIL"
    };
};




