import React, { Component, createContext } from 'react';

const { Provider, Consumer } = createContext();

const withProfile = (Enchanced) =>
    class WithConsumer extends Component {
        render () {
            return (
                <Consumer>
                    { (context) => <Enchanced { ...context } { ...this.props } /> }
                </Consumer>
            );
        }
    };

export { Provider, Consumer, withProfile };
