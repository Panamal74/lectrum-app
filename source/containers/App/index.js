// Core
import React, { Component } from 'react';

//Components
import { Composer } from "../../components/Composer";
import { Post } from "../../components/Post";

export default class App extends Component {
    render () {

        /*
        const items = [...Array(10).keys()].map((item, index) =>
            <li key = { index }>Element: { item }</li>
        );
        */

        return (
            <div>
                {/*
                <ul>
                    { items }
                </ul>
                */}
                <Composer />
                <Post />
            </div>

        );
    }
}
