// Core
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Instruments
//import { getUniqueID } from "../../instruments";
import { api, TOKEN } from "../../config/api";

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
        this.fetchPosts = this._fetchPosts.bind(this);
    }

    state = {
        posts: [],
    };

    componentDidMount () {
        this.fetchPosts();
    }

    _fetchPosts () {
        fetch(api)
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error('Fetch post failed');
                }

                return response.json();
            })
            .then(({ data }) => {
                console.log(data);
                this.setState(({ posts }) => ({
                    posts: [...data, ...posts],
                }));
            })
            .catch((message) => {
                console.error(message);
            });
    }

    _createPost (comment) {
        // this.setState(({ posts }) => ({
        //     posts: [{ id: getUniqueID(), comment }, ...posts],
        // }));
        fetch(api, {
            method:  'POST',
            headers: {
                Authorization:  TOKEN,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ comment }),
        })
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error('Fetch post failed');
                }

                return response.json();
            })
            .then(({ data }) => {
                this.setState(({ posts }) => ({
                    posts: [data, ...posts],
                }));
            })
            .catch((message) => {
                console.error(message);
            });
    }

    render () {
        const {
            //avatar,
            currentUserFirstName,
            //currentUserLastName,
        } = this.props;
        const { posts } = this.state;

        const renderPost = posts.map((post) => {
            return (
                <Catcher key = { post.id }>
                    <Post
                        { ...post }
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
                <RenderCounter count = { posts.length } />
                { renderPost }
            </section>
        );
    }
}
