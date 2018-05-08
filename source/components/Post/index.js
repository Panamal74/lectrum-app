import React, { Component } from 'react';

import moment from 'moment';

import Styles from './styles.m.css';
import PropTypes from 'prop-types';

import Like from '../../components/Like';
//import { api, TOKEN } from "../../config/api";

export class Post extends Component {
    static propTypes = {
        avatar:               PropTypes.string.isRequired,
        currentUserFirstName: PropTypes.string.isRequired,
        currentUserLastName:  PropTypes.string.isRequired,
        firstName:            PropTypes.string.isRequired,
        id:                   PropTypes.string.isRequired,
        lastName:             PropTypes.string.isRequired,
        likePost:             PropTypes.func.isRequired,
        removePost:           PropTypes.func.isRequired,

        // post: PropTypes.object.isRequired,
    };

    constructor () {
        super();
        //this.createPost = ::this._createPost; - новый синтаксис
        this.handleRemove = this._handleRemove.bind(this);
        this.handleLikePost = this._handleLikePost.bind(this);
    }

    shouldComponentUpdate (nextProps) {
        let flags = true;

        if (nextProps.id === this.props.id) {
            if (nextProps.likes === this.props.likes) {
                flags = false;
            }
        }

        return flags;
        //return true;
    }

    _getCross = () => {
        const {
            currentUserFirstName,
            currentUserLastName,
            firstName,
            lastName,
        } = this.props;

        return (
            `${currentUserFirstName} ${currentUserLastName}` ===
            `${firstName} ${lastName}`
                ? <span className = { Styles.cross } onClick = { this.handleRemove } />
                : null
        );
    };

    _handleRemove () {
        const { id, removePost } = this.props;

        removePost(id);
    }

    _handleLikePost (id) {
        const {
            //id,
            //likes,
            likePost,
        } = this.props;

        likePost(id);
    }

    render () {
        const {
            avatar,
            comment,
            created,
            firstName,
            lastName,
            id,
            likes,
        } = this.props;

        return (
            <section className = { Styles.post } >
                { this._getCross() }
                <img alt = 'Homer' src = { avatar } />
                <a>{ `${firstName} ${lastName}` }</a>
                <time>{ moment.unix(created).format('MMMM D h:mm:ss a') }</time>
                <p>{comment}</p>
                <Like
                    id = { id }
                    likePost = { this.handleLikePost }
                    likes = { likes }
                />
            </section>
        );
    }
}
