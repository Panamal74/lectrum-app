import React from 'react';
import dom from 'react-test-renderer';

import { Counter } from './';

const renderTree = dom.create(<Counter count = { 2 } />).toJSON();

test('Counter should correspond to its snapshot counterpart', () => {
    expect(renderTree).toMatchSnapshot();
});
