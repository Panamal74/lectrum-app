// Core
import React, { Component } from 'react';
import { Provider } from '../../components/HOC/withProfile';

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
            <Provider value = { config }>
                <Feed { ...config } />
            </Provider>
        );
    }
}
