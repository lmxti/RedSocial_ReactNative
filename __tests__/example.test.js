import React from 'react';
import { render } from '@testing-library/react-native';
import ExampleComponent from '../components/ExampleComponent';

describe('ExampleComponent', () => {
  it('renders correctly with title', () => {
    const { getByTestId } = render(
      <ExampleComponent title="Hello Jest!" />
    );
    
    const textElement = getByTestId('example-text');
    expect(textElement).toBeDefined();
    expect(textElement.props.children).toBe('Hello Jest!');
  });

  it('simple math test', () => {
    expect(1 + 2).toBe(3);
  });
});