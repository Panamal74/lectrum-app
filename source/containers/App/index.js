// Core
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

//Components
import { Provider } from '../../components/HOC/withProfile';
import Feed from '../../components/Feed';
import avatar from '../../theme/assets/homer.png';
import Catcher from '../../components/Catcher';

const config = {
    avatar,
    currentUserFirstName: 'Pasha',
    currentUserLastName:  'Malakhovskyi',
};

@hot(module)
export default class App extends Component {
    render () {
        return (
            <Catcher>
                <Provider value = { config }>
                    <Feed { ...config } />
                </Provider>
            </Catcher>
        );
    }
}
