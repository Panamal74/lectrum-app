// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.m.css';

// Components
import { Consumer } from '../../components/HOC/withProfile';
//import PropTypes from "prop-types";

export default class StatusBar extends Component {
    render () {
        // const {
        //     avatar,
        //     currentUserFirstName,
        //     currentUserLastName,
        // } = this.props;

        return (
            <Consumer>
                {
                    ({
                        avatar,
                        currentUserFirstName,
                        currentUserLastName,
                    } = {}) => (
                        <section className = { Styles.statusBar }>
                            <div className = { Styles.offline }>
                                <div>Offline</div>
                                <span />
                            </div>
                            <button>
                                <img alt = 'Homer' src = { avatar } />
                                <span>{ currentUserFirstName }</span>
                                &nbsp;
                                <span>{ currentUserLastName }</span>
                            </button>
                        </section>
                    )
                }
            </Consumer>
        );
    }
}
