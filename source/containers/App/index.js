// Core
import React, { Component } from 'react';

export default class App extends Component {
    render () {
        const items = [...Array(10).keys()].map((item, index) =>
            <li key = { index }>Element: { item }</li>
        );

        return (
            <ul>
                { items }
            </ul>
        );
    }
}
