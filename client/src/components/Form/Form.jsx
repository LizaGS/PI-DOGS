import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments, postDog } from "../../actions";
import NavBar from "../NavBar/NavBar";
import styled from './Form.module.css';


//---------------------------------VALIDACIONES---------------------------------
const validations = (breed) => {
    let errors = {};

    if (breed.name === '' || breed.name.length <= 2)
        errors.name = 'Please, insert a breed name.';
    else if (!isNaN(breed.name))
        errors.name = 'The breed could not be a number.';

    if (breed.image.length < 1)
        errors.image = 'Please insert an URL for the image.';
    else if (breed.image.length !== 0 && !/^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/.test(breed.image))
        errors.image = 'Please insert an URL for the image.';

    if (breed.min_height === '' || breed.min_height.length <= 1)
        errors.min_height = 'Please, insert a minimun height, must be more than 9 centimeters, like 23.';
    else if (breed.min_height <= 0)
        errors.min_height = 'The dog can not measure 0 or less.';
    else if (/[a-zA-Z]/.test(breed.min_height))
        errors.min_height = 'The height can not contain letters.';

    if (breed.max_height === '' || breed.max_height.length <= 1)
        errors.max_height = 'Please, insert a maximun height, the value is in centimeters, like 98.';
    else if (breed.max_height > 180)
        errors.max_height = 'The dog can not measure more the 180cm.';
    else if (/[a-zA-Z]/.test(breed.max_height))
        errors.max_height = 'The height can not contain letters.';
    else if (breed.max_height <= breed.min_height)
        errors.max_height = 'The max height can not be lower than the min height.';

    if (breed.min_weight === '' || breed.min_weight.length < 1)
        errors.min_weight = 'Please, insert a minimun weight, the value is in kilograms, like 5.';
    else if (breed.min_weight <= 0)
        errors.min_weight = 'The dog can not weight 0 or less.';
    else if (/[a-zA-Z]/.test(breed.min_weight))
        errors.min_weight = 'The weight can not contain letters.';

    if (breed.max_weight === '' || breed.max_weight.length <= 1)
        errors.max_weight = 'Please, insert a maximun weight, the value is in kilograms, like 45.';
    else if (breed.max_weight > 100)
        errors.max_weight = 'The dog can not weight more the 100kg.';
    else if (/[a-zA-Z]/.test(breed.max_weight))
        errors.max_weight = 'The weight can not contain letters.';
    else if (breed.max_weight <= breed.min_weight)
        errors.max_weight = 'The max weight can not be lower than the min weight.';

    if (breed.min_life_span === '' || breed.min_life_span < 1)
        errors.min_life_span = 'Please, insert a minimun life expectancy, like 5.';
    else if (breed.min_life_span <= 0)
        errors.min_life_span = 'The dog can not live 0 or less years.';

    if (breed.max_life_span === '' || breed.max_life_span.length < 1)
        errors.max_life_span = 'Please, insert a maximun life expectancy, like 15.';
    else if (breed.max_life_span > 25)
        errors.max_life_span = 'The dog can not live more than 25 years.';
    else if (breed.max_life_span <= breed.min_life_span)
        errors.max_life_span = 'The maximun life expectancy can not be lower than the minimun life expectancy.';

    /* if (breed.temperament.lenght === 0)
        errors.temperament = 'Please, at least choose one temperament.' */

    return errors;
};

//----------------------------------FUNCIÓN CREATE A DOG------------------------------------------

export default function Form() {
    const dispatch = useDispatch();
    const temperament = useSelector((state) => state.temperament)

    useEffect(() => {
        dispatch(getTemperaments());
    }, [dispatch]);



    const [breed, setBreed] = useState({
        name: '',
        image: '',
        min_height: '',
        max_height: '',
        min_weight: '',
        max_weight: '',
        min_life_span: '',
        max_life_span: '',
        temperament: [],
    });

    const [errors, setErrors] = useState({});

    //---------------Funciones onChange---------------

    function handleChange(e) {
        e.preventDefault();
        setBreed({
            ...breed,
            [e.target.name]: e.target.value
        })
        setErrors(
            validations({
                ...breed,
                [e.target.name]: e.target.value
            })
        )
    };

    function handleTemps(e) {
        e.preventDefault();
        if(breed.temperament.includes(e.target.value))
        alert('try again')
        else if (breed.temperament.length < 5) {
            setBreed({
                ...breed,
                temperament: [...breed.temperament, e.target.value]
            })
            /* setErrors(
                validations({
                    ...breed,
                    [e.target.name]: e.target.value
                })
            ) */
            //console.log(breed)
        } else {
            alert('You can not choose more than 5 temperaments.')
        }
    };

    function handleDelete(temp) {
        setBreed({
            ...breed,
            temperament: breed.temperament.filter((e) => e !== temp)
        })
    };

    //---------------Función onSubmit---------------
    function handleSubmit(e) {
        e.preventDefault();
        if (breed.temperament.lenght === 0)
            alert('Please, at least choose one temperament.')
        else if (Object.values(errors).length >= 1)
            alert('Please, complete de form correctly!');
        else if (breed.temperament.length === 0)
            alert('Please, choose at least choose one temperament.');
        else if (breed.name &&
            breed.image && breed.min_height &&
            breed.max_height && breed.min_weight &&
            breed.max_weight && breed.min_life_span &&
            breed.max_life_span && breed.temperament.length >= 1) {
            dispatch(postDog(breed))
            setBreed({ //para limpiar input
                name: '',
                image: '',
                min_height: '',
                max_height: '',
                min_weight: '',
                max_weight: '',
                min_life_span: '',
                max_life_span: '',
                temperament: [],
            })
            alert('Your dog breed was successfully created!')
            /* history.push('/home') */
        } else {
            alert('An error ocurred! Please, verify is not missing data.')
        }
    };

    return (
        <React.Fragment>
            <>
                <NavBar />
            </>
            <div className={styled.CONTAINER}>
                <div className={styled.container}>
                    <h2>Create your dog breed!</h2>
                    <br />
                    <form onSubmit={handleSubmit}>
                        <div className={styled.cont1}>
                            <div className={styled.name}>
                                <label htmlFor='name'>Breed name:</label>
                                <input type='text' /* placeholder='Tomito' */ id='name' name='name' value={breed.name} onChange={e => handleChange(e)} />
                                {errors.name && (<h6 className={styled.errors}>{errors.name}</h6>)}<br />
                            </div>

                            <div className={styled.image}>
                                <label htmlFor='image'>Image URL:</label>
                                <input type='url' /* placeholder='https://dogpic.com/img/XR.jpg' */ id='image' name='image' value={breed.image} onChange={e => handleChange(e)} />
                                {errors.image && (<h6 className={styled.errors}>{errors.image}</h6>)}<br />
                            </div>
                        </div>

                        <div className={styled.cont2}>
                            <div className={styled.minheight}>
                                <label htmlFor='min_height'>Minimun Height:</label>
                                <input type='number' /* placeholder='12' */ id='min_height' name='min_height' value={breed.min_height} onChange={e => handleChange(e)} />
                                {errors.min_height && (<h6 className={styled.errors}>{errors.min_height}</h6>)}<br />
                            </div>

                            <div className={styled.maxheight}>
                                <label htmlFor='max_height'>Maximun Height:</label>
                                <input type='number' /* placeholder='24' */ id='max_height' name='max_height' value={breed.max_height} onChange={e => handleChange(e)} />
                                {errors.max_height && (<h6 className={styled.errors}>{errors.max_height}</h6>)}<br />
                            </div>
                        </div>

                        <div className={styled.cont3}>
                            <div className={styled.minweight}>
                                <label htmlFor='min_weight'>Minimun Weight:</label>
                                <input type='number' /* placeholder='11' */ id='min_weight' name='min_weight' value={breed.min_weight} onChange={e => handleChange(e)} />
                                {errors.min_weight && (<h6 className={styled.errors}>{errors.min_weight}</h6>)}<br />
                            </div>

                            <div className={styled.maxweight}>
                                <label htmlFor='max_weight'>Maximun Weight:</label>
                                <input type='number' /* placeholder='34' */ id='max_weight' name='max_weight' value={breed.max_weight} onChange={e => handleChange(e)} />
                                {errors.max_weight && (<h6 className={styled.errors}>{errors.max_weight}</h6>)}<br />
                            </div>
                        </div>

                        <div className={styled.cont4}>
                            <div className={styled.minlife}>
                                <label htmlFor='min_life_span'>Minimun Life Expectancy:</label>
                                <input type='number' /* placeholder='10' */ id='min_life_span' name='min_life_span' value={breed.min_life_span} onChange={e => handleChange(e)} />
                                {errors.min_life_span && (<h6 className={styled.errors}>{errors.min_life_span}</h6>)}<br />
                            </div>

                            <div className={styled.maxlife}>
                                <label htmlFor='max_life_span'>Maximun Life Expectancy:</label>
                                <input type='number' /* placeholder='12' */ id='max_life_span' name='max_life_span' value={breed.max_life_span} onChange={e => handleChange(e)} />
                                {errors.max_life_span && (<h6 className={styled.errors}>{errors.max_life_span}</h6>)}<br />
                            </div>
                        </div>
                        <div className={styled.cont5}>
                            <label htmlFor='temperament'>Temperament/s:</label>
                            <select id='tem' name='temperament' value={breed.temperament} onChange={e => handleTemps(e)}>
                                <option>-- Select temperament/s --</option>
                                {temperament?.map((tem) => (
                                    <option key={tem.id} value={tem.name}>{tem.name}</option>
                                ))}
                            </select>
                            {errors.temperament && (<h6 className={styled.errors}>{errors.temperament}</h6>)}<br />
                            <div className={styled.cont6}>
                                <p className={styled.select}>Temperament/s selected:</p>
                                {breed.temperament.map((el, index) =>
                                    <div className={styled.cont7} key={index}>
                                        <h6>{el}</h6>
                                        <button className={styled.but} onClick={() => handleDelete(el)}>x</button>
                                    </div>
                                )}
                            </div>
                        </div>
                        <button className={styled.button} type="submit" >Create!</button>
                    </form>

                </div>
            </div>
        </React.Fragment>
    );
};