// Core
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Instruments
import { getUniqueID } from "../../instruments";

//Components
import { Composer } from '../../components/Composer';
import { Post } from '../../components/Post';
import StatusBar from '../../components/StatusBar';

import Styles from './styles.m.css';

export default class Feed extends Component {
    static propTypes = {
        avatar:               PropTypes.string.isRequired,
        currentUserFirstName: PropTypes.string.isRequired,
        currentUserLastName:  PropTypes.string.isRequired,
    };

    constructor () {
        super();
        this.createPost = ::this._createPost;
    }

    state = {
        posts: [],
    };

    _createPost (comment) {
        this.setState(({ posts }) => ({
            posts: [{ id: getUniqueID(), comment }, ...posts],
        }));
    }

    render () {
        const {
            avatar,
            currentUserFirstName,
            currentUserLastName,
        } = this.props;
        const { posts } = this.state;

        const renderPost = posts.map((value, index) => {
            return (
                <Post
                    avatar = { avatar }
                    currentUserFirstName = { currentUserFirstName }
                    currentUserLastName = { currentUserLastName }
                    key = { index }
                    post = { value }
                />
            );
        });

        return (
            <section className = { Styles.feed }>
                <StatusBar />
                <Composer
                    createPost = { this.createPost }
                    currentUserFirstName = { currentUserFirstName }
                />
                { renderPost }
            </section>
        );
    }
}
