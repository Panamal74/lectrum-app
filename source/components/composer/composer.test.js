import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Composer } from './';

configure({ adapter: new Adapter() });

const state = {
    comment: '',
};

const props = {
    avatar:               'some url',
    createPost:           jest.fn(),
    currentUserFirstName: 'Pasha',
};

const message = 'Hello Lectrum!';
const mutatedState = {
    comment: message,
};

const result = mount(<Composer { ...props } />);

//console.log(result.debug());
const spy = jest.spyOn(Composer.prototype, 'componentDidUpdate');

global.fetch = jest.fn(() => Promise.resolve({
    status: 200,
    json:   jest.fn(() => Promise.resolve({ data: ['some fake data']})),
}));

describe('Consumer component:', () => {
    test(`Should have 1 'section' element`, () => {
        expect(result.find('section')).toHaveLength(1);
    });
    test(`Should have 1 'form' element`, () => {
        expect(result.find('form')).toHaveLength(1);
    });
    test(`Should have 1 'textarea' element`, () => {
        expect(result.find('textarea')).toHaveLength(1);
    });
    test(`Should have 1 'input' element`, () => {
        expect(result.find('input')).toHaveLength(1);
    });
    test(`Should have 1 'img' element`, () => {
        expect(result.find('img')).toHaveLength(1);
    });

    test(`Should have a valid state`, () => {
        expect(result.state()).toEqual(state);
    });
    test(`textarea value should have a value ''`, () => {
        expect(result.find('textarea').text()).toBe(state.comment);
    });
    test(`should respond to state change property`, () => {
        result.setState(() => ({
            comment: message,
        }));

        expect(result.state()).toEqual(mutatedState);
        expect(result.find('textarea').text()).toBe(message);

        result.setState(() => ({
            comment: '',
        }));

        expect(result.state()).toEqual(state);
        expect(result.find('textarea').text()).toBe(state.comment);
    });

    test(`component state textarea value should reflect according changes`, () => {
        result.find('textarea').simulate('change', {
            target: {
                value: message,
            },
        });

        expect(result.state()).toEqual(mutatedState);
        expect(result.find('textarea').text()).toBe(message);
    });

    test(`component state and textarea value should reflect according form submit`, () => {
        result.find('form').simulate('submit');

        expect(result.state()).toEqual(state);
    });

    test(`createPost method be invoked once after submitted`, () => {
        console.log(spy.mock);
        expect(props.createPost.mock.calls).toHaveLength(1);
    });

});
