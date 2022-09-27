/* import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByTemps, getArranged, getCreated, getDogs, getOrdered, getTemperaments } from "../../actions";
import styled from './Filters.module.css';

export default function Filters({setCurrentPage}) {
    const dispatch = useDispatch();
    const [order, setOrder] = useState('');
    const temperaments = useSelector((state) => state.temperament);
    const dogs = useSelector((state) => state.allDogs);
    console.log(temperaments)

    useEffect(() => {
        dispatch(getDogs());
        dispatch(getTemperaments());
    }, [dispatch]);

    function handleTemperaments(e) {
        e.preventDefault();
        dispatch(filterByTemps(e.target.value));
        setCurrentPage(1)
    };

    function handleBreeds(e) {
        e.preventDefault();
        dispatch(getCreated(e.target.value));
        setCurrentPage(1)
    };

    function handleOrder(e) {
        e.preventDefault();
        dispatch(getOrdered(e.target.value));
        setOrder(`${e.target.value}`)
        setCurrentPage(1);
    };

    function handleWeight(e) {
        e.preventDefault();
        dispatch(getArranged(e.target.value));
        setOrder(`('Ordenado', ${e.target.value})`)
        setCurrentPage(1);
    };

    return (
        <React.Fragment>
            <select className={styled.f1} id='bytemperaments' onChange={e => handleTemperaments(e)}>
                <option>-- Select temperament --</option>
                {temperaments?.map((t, index) => (
                    <option key={index} value={t.name}>{t.name}</option>
                ))}
            </select>
            <select className={styled.f2} id='byowners' onChange={e => handleBreeds(e)}>
                <option>-- Select breed's owner--</option>
                <option value='new'>User's breeds</option>
                <option value='old'>Page's breeds</option>
            </select>
            <select className={styled.f3} id='byorder' onChange={e => handleOrder(e)}>
                <option>-- Select order--</option>
                <option value='a-z'>A - Z</option>
                <option value='z-a'>Z - A</option>
            </select>
            <select  className={styled.f4} id='byweight' onChange={e => handleWeight(e)}>
                <option>-- Arranged weight --</option>
                <option value='low'>Lower to higher</option>
                <option value='high'>Higher to lower</option>
            </select>

        </React.Fragment>
    );
}; */