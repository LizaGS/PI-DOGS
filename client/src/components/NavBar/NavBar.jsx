import React from "react";
import loguito from './assets/loguito.png';
import styled from './NavBar.module.css';
/* import SearchBar from "../SearchBar/SearchBar"; */

export default function NavBar() {

    return (
        <div className={styled.container}>
            <nav>
                <a href="/">
                    <img className={styled.loguito} src={loguito} />
                </a>
                <div className={styled.links}>
                    <a href="/about">About Me</a>
                    <a href="/form">Create a dog breed</a>
                    <a href="/home" >Home</a>
                </div>
            </nav>
            {/* <SearchBar /> */}
        </div>
    );
};