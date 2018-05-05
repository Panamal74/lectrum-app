import React, { Component } from 'react';
import { Consumer } from '../../components/HOC/withProfile';

//import avatar from '../../theme/assets/homer.png';

import Styles from './styles.m.css';
import PropTypes from "prop-types";

export class Composer extends Component {
    static propTypes = {
        currentUserFirstName: PropTypes.string.isRequired,
    };

    render () {
        const { currentUserFirstName } = this.props;
        const textValue = `Hello ${currentUserFirstName}`;

        return (
            <Consumer>
                {
                    ({ avatar }) => (
                        <section className = { Styles.composer } >
                            <form>
                                <img alt = 'homer' src = { avatar } />
                                <textarea
                                    placeholder = { textValue }
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
