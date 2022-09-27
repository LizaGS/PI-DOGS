import React from "react";
import { Link } from "react-router-dom";
import pug from './assets/pug.mp4'
import styled from './LandingPage.module.css';
import logo from './assets/LOGO.png';

export default function LandingPage() {
    return (
        <React.Fragment>
            <video className={styled.video} src={pug} autoPlay muted loop /> {/* sin muted no se reproduce automáticamente */}
            <div className={styled.container} >
                <Link to='/home'>
                    <img className={styled.logo} src={logo} />
                </Link>
            </div>
        </React.Fragment>
    );
};