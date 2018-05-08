import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Composer } from './';

configure({ adapter: new Adapter() });

const state = {
    comment: '',
};

const props = {
    createPost: jest.fn(),
};

const message = 'Hello Lectrum!';
const mutatedState = {
    comment: message,
};

const result = mount(<Composer { ...props } />);

console.log(result.debug());

describe('Consumer component:', () => {
    test(`Should have 1 'section' element`, () => {
        expect(result.find('section')).toHaveLength(1);
    });
});
