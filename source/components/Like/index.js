// Core
import React, { Component } from 'react';
import { string, func, arrayOf, shape } from 'prop-types';

import Styles from './styles.m.css';
import { withProfile } from '../../components/HOC/withProfile';

@withProfile
export default class Like extends Component {
    static propTypes = {
        // post: PropTypes.object.isRequired,
        id:       string.isRequired,
        likePost: func.isRequired,
        likes:    arrayOf(
            shape({
                firstName: string.isRequired,
                lastName:  string.isRequired,
            })
        ).isRequired,
    };

    static defaultProps = {
        likes: [],
    };

    constructor () {
        super();
        //this.createPost = ::this._createPost; - новый синтаксис
        this.showLikers = this._showLikers.bind(this);
        this.hideLikers = this._hideLikers.bind(this);
        this.postLike = this._postLike.bind(this);
        this.getLikeByMe = this._getLikeByMe.bind(this);
        this.getLikeStyle = this._getLikeStyle.bind(this);
        this.getLikersList = this._getLikersList.bind(this);
        this.getLikesDescription = this._getLikesDescription.bind(this);
    }

    state = {
        showLikers: false,
    };

    _showLikers () {
        this.setState({
            showLikers: true,
        });
    }

    _hideLikers () {
        this.setState({
            showLikers: false,
        });
    }

    _postLike () {
        const { id, likePost } = this.props;

        likePost(id);
    }

    _getLikeByMe () {
        const {
            currentUserFirstName,
            currentUserLastName,
        } = this.props;

        return this.props.likes
            .some(({ firstName, lastName }) =>
                `${firstName} ${lastName}`
                === `${currentUserFirstName} ${currentUserLastName}`
            );
    }

    _getLikeStyle () {
        const likeByMe = this.getLikeByMe();

        return likeByMe
            ? `${Styles.icon} ${Styles.liked}`
            : `${Styles.icon}`;
    }

    _getLikersList () {
        const { showLikers } = this.state;
        const { likes } = this.props;

        const likesJSX = likes.map(({ firstName, lastName, id }) => (
            <li key = { id }>{ `${firstName} ${lastName}` }</li>
        ));

        return showLikers && likes.length
            ? <ul>{ likesJSX }</ul>
            : null;
    }

    _getLikesDescription () {
        const {
            likes,
            currentUserFirstName,
            currentUserLastName,
        } = this.props;

        const likedByMe = this._getLikeByMe();

        if (likes.length === 1 && likedByMe) {
            return `${currentUserFirstName} ${currentUserLastName}`;
        } else if (likes.length === 2 && likedByMe) {
            return 'You and 1 other';
        } else if (likedByMe) {
            return `You and ${likes.length - 1} other`;
        }

        return likes.length;
    }

    render () {
        //const { likePost } = this.props;
        const likers = this.getLikersList();
        const likeStyles = this.getLikeStyle();
        const likersDescription = this.getLikesDescription();

        return (
            <section className = { Styles.like } >
                <span
                    className = { likeStyles }
                    onClick = { this.postLike }>
                    Like
                </span>
                <div>
                    { likers }
                    <span
                        onMouseEnter = { this.showLikers }
                        onMouseLeave = { this.hideLikers }>
                        { likersDescription }
                    </span>
                </div>
            </section>
        );
    }
}
