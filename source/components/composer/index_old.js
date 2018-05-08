import React, { Component } from 'react';
import { withProfile } from '../../components/HOC/withProfile';
import { func } from 'prop-types';

//import avatar from '../../theme/assets/homer.png';

import Styles from './styles.m.css';


class Composer extends Component {
    static propTypes = {
        createPost: func.isRequired,
    };
    constructor () {
        super();
        this.handleChangeTextArea = this._handleChangeTextArea.bind(this);
        this.handleSubmit = this._handleSubmit.bind(this);
        this.handleCopyTextArea = this._handleCopyTextArea.bind(this);
        this.handleTextAreaKeyDown = this._handleTextAreaKeyDown.bind(this);
    }
    state = {
        comment: 'I am a comment',
    };

    _handleChangeTextArea (event) {
        this.setState({
            comment: event.target.value,
        });
    }

    _handleCopyTextArea (event) {
        event.preventDefault();
    }

    _handleTextAreaKeyDown (event) {
        if (event.keyCode === 13) {
            this.handleSubmit(event);
        }
    }

    _handleSubmit (event) {
        event.preventDefault();
        const { comment } = this.state;
        const { createPost } = this.props;

        if (comment.trim()) {
            createPost(comment);
        }
        this.setState({
            comment: '',
        });
    }

    render () {
        const { comment } = this.state;
        const {
            avatar,
            currentUserFirstName,
        } = this.props;

        return (
            <section className = { Styles.composer } >
                <form onSubmit = { this.handleSubmit }>
                    <img alt = 'homer' src = { avatar } />
                    <textarea
                        placeholder = { `Привет, ${currentUserFirstName}` }
                        value = { comment }
                        onChange = { this.handleChangeTextArea }
                        onCopy = { this.handleCopyTextArea }
                        onKeyDown = { this.handleTextAreaKeyDown }
                    />
                    <input type = 'submit' value = 'Post' />
                </form>
            </section>
        );
    }
}

export default withProfile(Composer);
