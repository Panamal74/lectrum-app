import React, { Component } from 'react';

import moment from 'moment';

import Styles from './styles.m.css';
import PropTypes from 'prop-types';

export class Post extends Component {
    static propTypes = {
        avatar:               PropTypes.string.isRequired,
        currentUserFirstName: PropTypes.string.isRequired,
        currentUserLastName:  PropTypes.string.isRequired,
        post:                 PropTypes.object.isRequired,
    };

    render () {
        const {
            avatar,
            currentUserFirstName,
            currentUserLastName,
            post,
        } = this.props;
        const currentTime = moment().format('MMMM D h:mm:ss a');
        const userName = `${currentUserLastName} ${currentUserFirstName}`;
        const currentPost = post.comment;

        return (
            <section className = { Styles.post } >
                <img alt = 'Homer' src = { avatar } />
                <a>{userName}</a>
                <time>{ currentTime }</time>
                <p>{currentPost}</p>
            </section>
        );
    }
}