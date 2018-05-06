// Core
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Instruments
import { getUniqueID } from "../../instruments";

//Components
import { Composer } from '../../components/Composer';
import { Post } from '../../components/Post';
import StatusBar from '../../components/StatusBar';
import Catcher from '../Catcher';
//import RenderCounter from '../../components/Counter';

import Styles from './styles.m.css';
import counterStyles from '../../components/Counter/styles.m.css';

export default class Feed extends Component {
    static propTypes = {
        avatar:               PropTypes.string.isRequired,
        currentUserFirstName: PropTypes.string.isRequired,
        currentUserLastName:  PropTypes.string.isRequired,
    };

    constructor () {
        super();
        //this.createPost = ::this._createPost; - новый синтаксис
        this.createPost = this._createPost.bind(this);
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
                <Catcher key = { value.id }>
                    <Post
                        avatar = { avatar }
                        currentUserFirstName = { currentUserFirstName }
                        currentUserLastName = { currentUserLastName }
                        post = { value }
                    />
                </Catcher>
            );
        });

        const RenderCounter = ({ count }) => {
            return (
                <div className = { counterStyles.counter }>
                    Posts count { count }
                </div>
            );
        };

        return (
            <section className = { Styles.feed }>
                <StatusBar />
                <Composer
                    createPost = { this.createPost }
                    currentUserFirstName = { currentUserFirstName }
                />
                <RenderCounter count = {posts.length}/>
                { renderPost }
            </section>
        );
    }
}
