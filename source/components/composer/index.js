import React, { Component } from 'react';
import { Consumer } from '../../components/HOC/withProfile';

import Styles from './styles.m.css';
import PropTypes from "prop-types";

export class Composer extends Component {
    static propTypes = {
        currentUserFirstName: PropTypes.string.isRequired,
    };

    render () {
        const { currentUserFirstName } = this.props;

        return (
            <Consumer>
                {
                    ({ avatar }) => (
                        <section className = { Styles.composer } >
                            <form>
                                <img alt = 'homer' src = { avatar } />
                                <textarea
                                    placeholder = { `Hi ${currentUserFirstName}` }
                                />
                                <input type = 'submit' value = 'Post' />
                            </form>
                        </section>
                    )
                }
            </Consumer>
        );
    }
}
