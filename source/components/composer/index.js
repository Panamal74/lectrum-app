import React, { Component } from 'react';

import avatar from 'theme/assets/homer';

import Styles from './styles.m.css';

export class Composer extends Component {
    render () {
        return (
            <section className = { Styles.composer } >
                <form>
                    <img alt = 'homer' src = { avatar } />
                    <textarea
                        placeholder = { 'Hello world' }
                    /><input type = 'submit' value = 'Post' />
                </form>
            </section>
        );
    }
}