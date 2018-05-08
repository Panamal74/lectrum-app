// Core
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup, Transition } from 'react-transition-group';
import { fromTo } from 'gsap';

// Instruments
import { withApi } from "../../components/HOC/withApi";

// Components
import Catcher from '../Catcher';
import Composer from '../../components/Composer';
import { Counter } from '../../components/Counter';
import { Post } from '../../components/Post';
import StatusBar from '../../components/StatusBar';
import Spinner from '../../components/Spinner';
import Postman from '../../components/Postman';

// Style
import Styles from './styles.m.css';

class Feed extends Component {
    static propTypes = {
        //avatar:               PropTypes.string.isRequired,
        createPost:           PropTypes.func.isRequired,
        currentUserFirstName: PropTypes.string.isRequired,
        currentUserLastName:  PropTypes.string.isRequired,
        //fetchPosts:           PropTypes.func.isRequired,
        likePost:             PropTypes.func.isRequired,
        removePost:           PropTypes.func.isRequired,
    };

    state = {
        posts:           [],
        isPostmanAppear: true,
    };

    _handleComposerAppear = (composer) => {
        fromTo(composer, 1, { opacity: 0 }, { opacity: 1 });
    };

    _handleCounterAppear = (counter) => {
        fromTo(counter, 2, { x: 400, opacity: 0 }, { x: 0, opacity: 1 });
    };

    _handlePostmanAppear = (postman) => {
        fromTo(postman, 1, { x: 400 }, {
            x:          0,
            onComplete: () => {
                setTimeout(() => {
                    this.setState(() => ({
                        isPostmanAppear: false,
                    }));
                }, 7000);
            },
        });
    };

    _handlePostmanDisappear = (postman) => {
        fromTo(postman, 1, { x: 0 }, { x: 400 });
    };

    render () {
        const {
            createPost,
            currentUserFirstName,
            currentUserLastName,
            likePost,
            removePost,
            posts,
            isPostsFetching,
        } = this.props;
        const { isPostmanAppear } = this.state;

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
                            likePost = { likePost }
                            removePost = { removePost }
                        />
                    </Catcher>
                </CSSTransition>);
        });

        return (
            <section className = { Styles.feed }>
                <StatusBar />
                <Transition
                    appear
                    in
                    timeout = { 1000 }
                    onEnter = { this._handleComposerAppear }>
                    <Composer
                        createPost = { createPost }
                        currentUserFirstName = { currentUserFirstName }
                    />
                </Transition>
                <Spinner isSpinning = { isPostsFetching } />
                <Transition
                    appear
                    in
                    timeout = { 2000 }
                    onEnter = { this._handleCounterAppear }>
                    <Counter count = { posts.length } />
                </Transition>
                <Transition
                    appear
                    in = { isPostmanAppear }
                    timeout = { 1000 }
                    onEnter = { this._handlePostmanAppear }
                    onExit = { this._handlePostmanDisappear }>
                    <Postman />
                </Transition>
                <TransitionGroup>{ renderPosts }</TransitionGroup>
            </section>
        );
    }
}

export default withApi(Feed);
