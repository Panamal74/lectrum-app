import React, { Component } from 'react';

import moment from 'moment';

import avatar from 'theme/assets/homer';

import Styles from './styles.m.css';

export class Post extends Component {
    render () {
        const currentTime = moment().format('MMMM D h:mm:ss a');

        return (
            <section className = { Styles.post } >
                <img alt = 'homer' src = { avatar } />
                <a>Pasha</a>
                <time>{ currentTime }</time>
                <p>произвольный комментарий</p>
            </section>
        );
    }
}