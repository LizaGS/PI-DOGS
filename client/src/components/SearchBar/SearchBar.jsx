import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getBreed } from "../../actions";
import styled from './SearchBar.module.css';

export default function SearchBar({setCurrentPage}) {

    const dispatch = useDispatch();
    const [dog, setDog] = useState('');

    function handleSearch(e) {
        e.preventDefault();
        setDog(e.target.value)
    };

    function handleClick(e) {
        e.preventDefault();
        e.target.value = "";
        dispatch(getBreed(dog));
        setDog('');
        setCurrentPage(1);
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
