import React, { Component } from 'react';

import moment from 'moment';

import avatar from 'theme/assets/homer';

export class Post extends Component {
    render () {
        const currentTime = moment().format('MMMM D h:mm:ss a');

        return (
            <section>
                <img alt = 'homer' src = { avatar } />
                <a>Pasha</a>
                <time>{ currentTime }</time>
                <p>произвольный комментарий</p>
            </section>
        );
    }
}