import React, { Component } from 'react';
import { Consumer } from 'components/HOC/withProfile';
import Styles from './styles.m.css';

export default class Postman extends Component {
    render () {
        return (
            <Consumer>
                {
                    ({ avatar, currentUserFirstName, currentUserLastName } = {}) => (
                        <section className = { Styles.postman }>
                            <img alt = 'avatar' src = { avatar } />
                            <span>{currentUserFirstName}</span>
                            &nbsp;
                            <span>{currentUserLastName}</span>
                        </section>
                    )
                }
            </Consumer>
        );
    }
}
