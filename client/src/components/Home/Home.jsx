import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getDogs } from "../../actions";
import DogCard from "../DogCard/DogCard";
import Pagination from "../Pagination/Pagination";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import NavBar from "../NavBar/NavBar";
//import Filters from "../Filters/Filters";
import styled from './Home.module.css';
import { filterByTemps, getArranged, getCreated, getOrdered, getTemperaments } from "../../actions";
import styles from './Filters.module.css';

export default function Home() {

    const dispatch = useDispatch();
    const dogs = useSelector((state) => state.dogs)
    console.log(dogs)

    //-------------PAGINADO--------------
    const [currentPage, setCurrentPage] = useState(1);
    const [dogsPerPage,setDogsPerPage] = useState(8);
    const iLastDog = currentPage * dogsPerPage;
    const iFirstDog = iLastDog - dogsPerPage;
    const currentDogs = dogs.slice(iFirstDog, iLastDog);

    //Función onClick
    const pagination = (pageNumber) => {
        setCurrentPage(pageNumber)
    };
    //--------------------------------------

    //-------------TRAEMOS EL CONTENIDO DEL ESTADO--------------
    useEffect(() => {
        dispatch(getDogs())
    }, [dispatch]);

    //-------------FILTROS--------------
    const [order, setOrder] = useState('');
    const temperaments = useSelector((state) => state.temperament);

    useEffect(() => {
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
    };

    function handleWeight(e) {
        e.preventDefault();
        dispatch(getArranged(e.target.value));
        setOrder(`${e.target.value}`)
    };


    return (
        <React.Fragment>
            <>
                <NavBar />
            </>
            <div className={styled.fondo} >
                <h1 className={styled.title}>World's Dog Breeds</h1><br />
                <div className={styled.filters}>

                    {/* ------------------Filtros------------------ */}

                    <div>
                        <select className={styles.f1} id='bytemperaments' onChange={e => handleTemperaments(e)}>
                            <option>-- Select temperament --</option>
                            {temperaments?.map((t, index) => (
                                <option key={index} value={t.name}>{t.name}</option>
                            ))}
                        </select>
                        <select className={styles.f2} id='byowners' onChange={e => handleBreeds(e)}>
                            <option>-- Select breed's owner--</option>
                            <option value='new'>User's breeds</option>
                            <option value='old'>Page's breeds</option>
                        </select>
                        <select className={styles.f3} id='byorder' onChange={e => handleOrder(e)}>
                            <option>-- Select order--</option>
                            <option value='a-z'>A - Z</option>
                            <option value='z-a'>Z - A</option>
                        </select>
                        <select className={styles.f4} id='byweight' onChange={e => handleWeight(e)}>
                            <option>-- Arranged weight --</option>
                            <option value='low'>Lower to higher</option>
                            <option value='high'>Higher to lower</option>
                        </select>
                    </div>

                    {/* <Filters setCurrentPage={setCurrentPage} /> */}

                    {/* ------------------------------------------------- */}


                </div>
                <SearchBar />
                <div>
                    <p className={styled.text}>From first to last dog of the world, <br />
                        everything you need to know about the breed you can find it here.</p>
                    <div>
                        <Pagination
                            dogsPerPage={dogsPerPage}
                            dogs={dogs.length}
                            pagination={pagination}
                        />
                    </div>
                    <div>
                        {currentDogs?.map((d, index) => {
                            return (
                                <div key={index}>
                                    <Link to={`/dogs/${d.id}`}>
                                        <DogCard
                                            id={d.id}
                                            image={d.image}
                                            name={d.name}
                                            weight={d.weight}
                                            temperament={d.temperament}
                                        />
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                    <div>
                        <Pagination
                            dogsPerPage={dogsPerPage}
                            dogs={dogs.length}
                            pagination={pagination}
                        />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};