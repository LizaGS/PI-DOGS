import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getBreed } from "../../actions";
import styled from './SearchBar.module.css';

export default function SearchBar() {

    const dispatch = useDispatch();
    const [dog, setDog] = useState('');

    function handleSearch(e) {
        e.preventDefault();
        setDog(e.target.value)
    };

    function handleClick(e) {
        e.preventDefault();
        dispatch(getBreed(dog));
        setDog('');
    };


    return (
        <div className={styled.wrap}>
            <div className={styled.search}>
                <input className={styled.searchTerm} placeholder="Search a breed" type="search" onChange={handleSearch} />
                <button className={styled.searchButton} type="submit" onClick={handleClick}>Search</button>
            </div>
        </div>
    );
};
