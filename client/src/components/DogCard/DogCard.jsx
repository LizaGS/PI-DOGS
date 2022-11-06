import React from "react";
import notimage from "./images/NoPhoto.gif";
import styles from './DogCard.module.css';

export default function DogCard({ image, name, weight, temperament }) {
    return (
        <React.Fragment>
           
                <div className={styles.card}>
                    <img src={image ? image : notimage} alt='Not found' />
                    <div className={styles.group}>
                    <h2>{name}</h2>
                    <div className={styles.cont}>
                        <p className={styles.p}>Weight:</p><p className={styles.p1}>{weight} kg.</p>
                        <p className={styles.p}>Temperaments:</p><p className={styles.p1}>{temperament}</p>    
                    </div>
                    </div>
                </div>
            
        </React.Fragment>
    );
};
