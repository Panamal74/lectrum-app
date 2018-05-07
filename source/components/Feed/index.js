// Core
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Instruments
//import { getUniqueID } from "../../instruments";
import { api, GROUP_ID, TOKEN } from "../../config/api";
import { socket } from '../../socket';

// Components
import Composer from '../../components/Composer';
import { Post } from '../../components/Post';
import StatusBar from '../../components/StatusBar';
import Catcher from '../Catcher';
//import RenderCounter from '../../components/Counter';

// Style
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
        this.removePost = this._removePost.bind(this);
    }

    state = {
        posts: [],
    };

    componentDidMount () {
        const {
            currentUserFirstName,
            currentUserLastName,
        } = this.props;

        this.fetchPosts();

        socket.emit('join', GROUP_ID);
        socket.on('create', (postJSON) => {
            const { data: createPost, meta } = JSON.parse(postJSON);

            //console.log(createPost);
            if (
                `${currentUserFirstName} ${currentUserLastName}` !==
                `${meta.authorFirstName} ${meta.authorLastName}`
            ) {
                this.setState(({ posts }) => ({
                    posts: [createPost, ...posts],
                }));
            }
        });
        socket.on('remove', (postJSON) => {
            const { data: { id }, meta } = JSON.parse(postJSON);

            if (
                `${currentUserFirstName} ${currentUserLastName}` !==
                `${meta.authorFirstName} ${meta.authorLastName}`
            ) {
                this.setState(({ posts }) => ({
                    posts: posts.filter((post) => post.id !== id),
                }));
            }
        });
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
                //console.log(data);
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

    async _removePost (id) {
        try {
            const responce = await fetch(`${api}/${id}`, {
                method:  'DELETE',
                headers: {
                    Authorization: TOKEN,
                },
            });


            if (responce.status !== 204) {
                throw new Error('Delete post filed');
            }

            this.setState(({ posts }) => ({
                posts: posts.filter((post) => post.id !== id),
            }));
        } catch (error) {
            console.error(error);
        }
    }

    render () {
        const {
            //avatar,
            currentUserFirstName,
            currentUserLastName,
        } = this.props;
        const { posts } = this.state;

        const renderPost = posts.map((post) => {
            return (
                <Catcher key = { post.id }>
                    <Post
                        { ...post }
                        currentUserFirstName = { currentUserFirstName }
                        currentUserLastName = { currentUserLastName }
                        removePost = { this.removePost }
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
