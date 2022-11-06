import React from 'react';
import dog from './assets/dog.png'
import style from './Loading.module.css';

const Loading = () => {
    return (
        <React.Fragment>
            <div className={style.container}>
                <div className={style.cont1}>
                    <img className={style.img} src={dog} />
                    <h2 className={style.h2} >Loading...</h2>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Loading