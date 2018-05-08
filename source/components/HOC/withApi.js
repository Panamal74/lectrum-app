import React, { Component } from 'react';
import { api, TOKEN, GROUP_ID } from "../../config/api";
import { socket } from '../../socket';

export const withApi = (Enchanced) =>
    class WithApi extends Component {

        constructor () {
            super();
            //this.createPost = ::this._createPost; - новый синтаксис
            this.createPost = this._createPost.bind(this);
            this.fetchPosts = this._fetchPosts.bind(this);
            this.removePost = this._removePost.bind(this);
            this.likePost = this._likePost.bind(this);
        }

        state = {
            posts:           [],
            isPostsFetching: true,
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

        async _fetchPosts () {
            this._setPostsFetchingState(true);
            try {
                const response = await fetch(api);

                if (response.status !== 200) {
                    throw new Error('Fetch post failed');
                }

                const { data } = await response.json();

                this.setState(({ posts }) => ({
                    posts: [...data, ...posts],
                }));
            } catch (message) {
                console.error(message);
            } finally {
                this._setPostsFetchingState(false);
            }
        }

        async _createPost (comment) {
            this._setPostsFetchingState(true);
            try {
                const response = await fetch(api, {
                    method:  'POST',
                    headers: {
                        Authorization:  TOKEN,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ comment }),
                });

                if (response.status !== 200) {
                    throw new Error('Fetch post failed');
                }

                const { data } = await response.json();

                this.setState(({ posts }) => ({
                    posts: [data, ...posts],
                }));
            } catch (message) {
                console.error(message);
            } finally {
                this._setPostsFetchingState(false);
            }
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
            return (
                <Enchanced
                    { ...this.state }
                    { ...this.props }
                    createPost = { this.createPost }
                    fetchPosts = { this.fetchPosts }
                    likePost = { this.likePost }
                    removePost = { this.removePost }
                />
            );
        }
    };
