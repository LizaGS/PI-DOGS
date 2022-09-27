import React from "react";
import styles from './Pagination.module.css';

export default function Pagination({ dogsPerPage, dogs, pagination }) {

    const pageNumbers = [];

    for (let i = 0; i < Math.ceil(dogs / dogsPerPage); i++) {
        pageNumbers.push(i + 1)
    };

    return (
        <nav>
            <ul className={styles.pagination}>
                {pageNumbers && pageNumbers.map((num, index) => (
                    <button key={index}>
                        <a onClick={() => pagination(num)}>{num}</a>
                    </button>
                ))}
            </ul>
        </nav>
    );
};