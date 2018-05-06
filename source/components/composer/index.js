import React, { Component } from 'react';
import { Consumer } from '../../components/HOC/withProfile';

//import avatar from '../../theme/assets/homer.png';

import Styles from './styles.m.css';
import { func } from 'prop-types';

export class Composer extends Component {
    static propTypes = {
        createPost: func.isRequired,
    };
    constructor () {
        super();
        this.handleChangeTextArea = this._handleChangeTextArea.bind(this);
        this.handleSubmit = this._handleSubmit.bind(this);
    }
    state = {
        comment: 'I am a comment',
    };

    _handleChangeTextArea (event) {
        this.setState({
            comment: event.target.value,
        });
    }

    _handleSubmit (event) {
        event.preventDefault();
        const { comment } = this.state;
        const { createPost } = this.props;

        createPost(comment);
    }

    render () {
        const { comment } = this.state;

        return (
            <Consumer>
                {
                    ({ avatar, currentUserFirstName }) => (
                        <section className = { Styles.composer } >
                            <form onSubmit = { this.handleSubmit }>
                                <img alt = 'homer' src = { avatar } />
                                <textarea
                                    placeholder = { `Hello ${currentUserFirstName}` }
                                    value = { comment }
                                    onChange = { this.handleChangeTextArea }
                                />
                                <input type = 'submit' value = 'Post' />
                            </form>
                        </section>
                    )
                }
            </Consumer>
        );
    }
}
