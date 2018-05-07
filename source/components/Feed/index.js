// Core
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

// Instruments
//import { getUniqueID } from "../../instruments";
import { api, GROUP_ID, TOKEN } from "../../config/api";
import { socket } from '../../socket';

// Components
import Catcher from '../Catcher';
import Composer from '../../components/Composer';
import { Counter } from '../../components/Counter';
import { Post } from '../../components/Post';
import StatusBar from '../../components/StatusBar';
import Spinner from '../../components/Spinner';

// Style
import Styles from './styles.m.css';

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
        this.likePost = this._likePost.bind(this);
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
        socket.on('like', (postJSON) => {
            const { data: likedPost, meta } = JSON.parse(postJSON);

            if (
                `${currentUserFirstName} ${currentUserLastName}` !==
                `${meta.authorFirstName} ${meta.authorLastName}`
            ) {
                this.setState(({ posts }) => ({
                    posts: posts.map((post) => post.id === likedPost.id ? likedPost : post),
                }));
            }
        });
    }

    _setPostsFetchingState = (state) => {
        this.setState(() => ({
            isPostsFetching: state,
        }));
    };

    _fetchPosts () {
        this._setPostsFetchingState(true);
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
                this._setPostsFetchingState(false);
            })
            .catch((message) => {
                console.error(message);
                this._setPostsFetchingState(false);
            });
    }

    _createPost (comment) {
        // this.setState(({ posts }) => ({
        //     posts: [{ id: getUniqueID(), comment }, ...posts],
        // }));
        this._setPostsFetchingState(true);
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
                this._setPostsFetchingState(false);
            })
            .catch((message) => {
                console.error(message);
                this._setPostsFetchingState(false);
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

    async _likePost (id) {
        try {
            const responce = await fetch(`${api}/${id}`, {
                method:  'PUT',
                headers: {
                    Authorization: TOKEN,
                },
            });

            if (responce.status !== 200) {
                throw new Error('Like post filed');
            }

            const { data } = await responce.json();

            this.setState(({ posts }) => ({
                posts: posts.map((post) => post.id === id ? data : post),
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
        const { posts, isPostsFetching } = this.state;

        const renderPosts = posts.map((post) => {
            return (
                <CSSTransition
                    classNames = { {
                        enter:       Styles.postInStart,
                        enterActive: Styles.postInEnd,
                        exit:        Styles.postOutStart,
                        exitActive:  Styles.postOutEnd,
                    } }
                    key = { post.id }
                    timeout = { { enter: 500, exit: 400 } }>
                    <Catcher key = { post.id }>
                        <Post
                            { ...post }
                            currentUserFirstName = { currentUserFirstName }
                            currentUserLastName = { currentUserLastName }
                            likePost = { this.likePost }
                            removePost = { this.removePost }
                        />
                    </Catcher>
                </CSSTransition>);
        });

        return (
            <section className = { Styles.feed }>
                <StatusBar />
                <Composer
                    createPost = { this.createPost }
                    currentUserFirstName = { currentUserFirstName }
                />
                <Spinner isSpinning = { isPostsFetching } />
                <Counter count = { posts.length } />
                <TransitionGroup>{ renderPosts }</TransitionGroup>
            </section>
        );
    }
}
