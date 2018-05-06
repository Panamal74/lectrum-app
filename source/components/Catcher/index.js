import React, { Component } from 'react';
import { object } from 'prop-types';

import Styles from './styles.m.css';

export default class Catcher extends Component {
    static propTypes = {
        children: object.isRequired,
    };

    state = {
        error: false,
    };

    componentDidCatch (error, stack) {
        this.setState(() => ({
            error: true,
        }));
        console.log(stack);
    }

    render () {
        const { error } = this.state;
        const { children } = this.props;

        if (error) {
            return (
                <section className = { Styles.catcher }>
                    <span>A mysterious error occured.</span>
                    <p>
                        Our space engineers strike team
                        &nbsp;is already working in order to fix that
                        for you!
                    </p>
                </section>
            );
        }

        return children;
    }
}
