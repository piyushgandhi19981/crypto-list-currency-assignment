import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import withActionHandlers from '../withActionHandlers';

describe('withActionHandlers HOC', () => {
  const mockComponent = ({ count, onAction }) => (
    <div>
      <p data-testid="count">Count: {count}</p>
      <button
        data-testid="increment"
        onClick={() => onAction({ type: 'INCREMENT', payload: { incrementBy: 1 } })}
      >
        Increment
      </button>
      <button
        data-testid="decrement"
        onClick={() => onAction({ type: 'DECREMENT', payload: { decrementBy: 1 } })}
      >
        Decrement
      </button>
    </div>
  );

  const MockComponent = withActionHandlers(
    {
      INCREMENT: ({ state, setState }, { incrementBy }) => {
        setState({ count: state.count + incrementBy });
      },
      DECREMENT: ({ state, setState }, { decrementBy }) => {
        setState({ count: state.count - decrementBy });
      },
    },
    { count: 0 }
  )(mockComponent);

  it('renders the wrapped component with initial state', () => {
    render(<MockComponent />);
    const countElement = screen.getByTestId('count');
    expect(countElement).toHaveTextContent('Count: 0');
  });

  it('handles the INCREMENT action correctly', () => {
    render(<MockComponent />);
    const incrementButton = screen.getByTestId('increment');
    fireEvent.click(incrementButton);
    const countElement = screen.getByTestId('count');
    expect(countElement).toHaveTextContent('Count: 1');
  });

  it('handles the DECREMENT action correctly', () => {
    render(<MockComponent />);
    const incrementButton = screen.getByTestId('increment');
    const decrementButton = screen.getByTestId('decrement');

    fireEvent.click(incrementButton);

    fireEvent.click(decrementButton);
    const countElement = screen.getByTestId('count');
    expect(countElement).toHaveTextContent('Count: 0');
  });
});
