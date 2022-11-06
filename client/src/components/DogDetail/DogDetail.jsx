import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import { breedDetail } from "../../actions";
import errorphoto from "./images/errorphoto.jpg"
//import opps from "./images/opps.png"
import styled from './DogDetail.module.css';
import Loading from "../Loading/Loading";

export default function DogDetail() {

    const dispatch = useDispatch();
    const breedDetails = useSelector((state) => state.breedDetail[0]);

    console.log(breedDetails)
    const { id } = useParams();

    useEffect(() => {
        dispatch(breedDetail(id))
    }, [dispatch, id]);

    return (
        <React.Fragment>
            <>
                <NavBar />
            </>
            <div className={styled.container} >
                {breedDetails ?
                    <div className={styled.cont}>
                        <h1 className={styled.name}>{breedDetails.name}</h1>
                        <img className={styled.image} src={breedDetails.image ? breedDetails.image : errorphoto} alt='Not found' />
                        <div className={styled.info}>
                            <div className={styled.temps}>
                                <h4>Temperaments:</h4>
                                <b><p>{breedDetails.temperament}</p></b>
                            </div>
                            <div className={styled.weight}>
                                <h4>Weight:</h4>
                                <b><p>{breedDetails.weight} kg.</p></b>
                            </div>
                            <div className={styled.height}>
                                <h4>Height:</h4>
                                <b><p>{breedDetails.height} cm.</p></b>
                            </div>
                            <div className={styled.life}>
                                <h4>Life Expectancy:</h4>
                                <b><p>{breedDetails.life_span + '.'}</p></b>
                            </div>
                        </div>
                    </div>
                    :
                    <Loading />
                }
            </div>
        </React.Fragment >
    );
};