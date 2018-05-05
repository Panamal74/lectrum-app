// Core
import React, { Component } from 'react';

//Components
import Feed from "../../components/Feed";
import avatar from '../../theme/assets/homer.png';

const config = {
    avatar,
    currentUserFirstName: 'Pasha',
    currentUserLastName: 'Malakhovskyi',
};

export default class App extends Component {
    render () {
        return (
            <Feed { ...config } />
        );
    }
}
