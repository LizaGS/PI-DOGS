import { BREED_DETAIL, FILTER_BY_TEMPS, GET_ARRANGED, GET_BREED, GET_CREATED, GET_DOGS, GET_ORDERED, GET_TEMPERAMENTS, POST_DOG } from "../actions"

const initialStates = {
    dogs: [],
    breedDetail: [],
    temperament: [],
    allDogs: [],
    loading: false,
    details: []
};

function rootReducer(state = initialStates, action) {
    switch (action.type) {
        case GET_DOGS:
            return {
                ...state,
                dogs: action.payload,
                allDogs: action.payload
            }
        case GET_BREED:
            return {
                ...state,
                dogs: action.payload
            }
        case BREED_DETAIL:
            return {
                ...state,
                breedDetail: action.payload
            }
        case GET_TEMPERAMENTS:
            return {
                ...state,
                temperament: action.payload
            }
        case FILTER_BY_TEMPS:
            let allDogs = state.allDogs;
            /* allDogs = [...new Set(allDogs)].sort(); */
            const dogsFilter = [];
            allDogs.forEach((e) => {
                /* if (e.id.lenght > 10) {
                    e.temperament.map((t) => (
                        t.name === action.payload ? dogsFilter.push(e) : null
                    ))
                } else { */
                if (e.temperament?.includes(action.payload)) {
                    dogsFilter.push(e);
                }
                /* } */
            })
            return {
                ...state,
                dogs: dogsFilter
            }
        case GET_CREATED:
            const created = action.payload === 'new' ?
                state.allDogs.filter(e => e.id.length > 10) :
                state.allDogs.filter(e => e.id.toString().length < 5);
            return {
                ...state,
                dogs: created
            }
        case GET_ORDERED:
            const ordered = action.payload === 'a-z' ?
                state.allDogs.sort((a, z) =>
                    a.name.localeCompare(z.name)) :
                state.allDogs.sort((a, z) =>
                    z.name.localeCompare(a.name));
            return {
                ...state,
                dogs: ordered
            }
        case GET_ARRANGED:
            const arranged = action.payload === 'low' ?
                state.allDogs.sort((a, b) => {
                    if (parseInt(a.weight) > parseInt(b.weight)) return 1;
                    if (parseInt(a.weight) < parseInt(b.weight)) return -1;
                    return 0;
                }) :
                state.allDogs.sort((b, a) => {
                    if (parseInt(a.weight) > parseInt(b.weight)) return 1;
                    if (parseInt(a.weight) < parseInt(b.weight)) return -1;
                    return 0;
                })
            return {
                ...state,
                dogs: arranged
            }
        case POST_DOG:
            return {
                ...state
            }
        case "LOADING":
            return {
                ...state,
                loading: action.payload
            }
        case "CLEAR_DETAIL":
            return {
                ...state,
                details: action.payload
            }

        default:
            return state;
    }
};

export default rootReducer;