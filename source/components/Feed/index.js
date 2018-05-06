// Core
import React, { Component } from 'react';
import PropTypes from 'prop-types';

//Components
import { Composer } from "../../components/Composer";
import { Post } from "../../components/Post";
import StatusBar from "../../components/StatusBar";

import Styles from './styles.m.css';

export default class Feed extends Component {
    static propTypes = {
        avatar:               PropTypes.string.isRequired,
        currentUserFirstName: PropTypes.string.isRequired,
        currentUserLastName:  PropTypes.string.isRequired,
    };
    render () {
        const {
            avatar,
            currentUserFirstName,
            currentUserLastName,
        } = this.props;

        return (
            <section className = { Styles.feed }>
                <StatusBar />
                <Composer
                    currentUserFirstName = { currentUserFirstName }
                />
                <Post
                    avatar = { avatar }
                    currentUserFirstName = { currentUserFirstName }
                    currentUserLastName = { currentUserLastName }
                />
            </section>
        );
    }
}
