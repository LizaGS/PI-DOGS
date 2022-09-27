import React from "react";
import NavBar from "../NavBar/NavBar";
import styled from './AboutMe.module.css';
import git from './assets/git.png';
import linked from './assets/linked.png';

export default function AboutMe() {

    return (
        <React.Fragment>
            <NavBar />
            <div className={styled.container}>
                <h1 className={styled.title}>Hello World!!</h1>
                <div className={styled.pre}>
                    <h3>I'm Liza García...</h3>
                    <p>I live in Peru, specifically in Lima.
                        Actually I'm studying for being a Full Stack Developer.
                        I'm passionate about the design but nowadays the backend have my attention.
                        I like the challenges and meet new people, and that's what this career is bringing me.
                    </p>
                </div>
                <div className={styled.skills}>
                    <h3>My skills:</h3>
                    <div className={styled.front}>
                        <h4>Frontend</h4>
                        <ul>
                            <li>HTML</li>
                            <li>CSS</li>
                            <li>js</li>
                            <li>React</li>
                            <li>Redux</li>
                        </ul>
                    </div>
                    <br />
                    <div className={styled.back}>
                        <h4>Backend</h4>
                        <ul>
                            <li>Node JS</li>
                            <li>Express</li>
                            <li>PostgreSQL</li>
                            <li>Sequelize</li>
                        </ul>
                    </div>
                </div>
                <br />
                <div className={styled.links}>
                    <div className={styled.git}>
                        <a href='https://github.com/LizaGS' target="_blank">
                            <img className={styled.img} src={git} alt="GitHub" />
                        </a>
                        <p>GitHub</p>
                    </div>
                    <div className={styled.linked}>
                        <a href='https://www.linkedin.com/in/lizags/' target="_blank">
                            <img className={styled.img} src={linked} alt="LinkedIn" />
                        </a>
                        <p>Linkedin</p>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};