import React from 'react';
import Styles from './styles.m.css';

const Counter = ({ count }) => {
    return (
        <div className = { Styles.counter }>
            Posts count { count }
        </div>
    );
};

export { Counter };
