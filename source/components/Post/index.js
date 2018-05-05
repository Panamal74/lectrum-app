import React, { Component } from 'react';

import moment from 'moment';

import avatar from 'theme/assets/homer';

export class Post extends Component {
    render () {
        const currentTime = moment().format('MMMM D h:mm:ss a');

        return (
            <div>
                <div><img alt = 'homer' src = { avatar } /></div>
                <div><a>Pasha</a></div>
                <div><time>{ currentTime }</time></div>
                <p>произвольный комментарий</p>
            </div>
        );
    }
}