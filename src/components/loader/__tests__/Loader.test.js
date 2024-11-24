import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Loader from '../Loader';

describe('Loader Component', () => {
  test('renders the loader container', () => {
    render(<Loader />);
    const loaderContainer = screen.getByRole('region', { name: /loader container/i });
    expect(loaderContainer).toBeInTheDocument();
  });

  test('renders the loader animation', () => {
    render(<Loader />);
    const loader = screen.getByRole('status', { name: /loading animation/i });
    expect(loader).toBeInTheDocument();
  });

  test('renders the loading text', () => {
    render(<Loader />);
    const loaderText = screen.getByText(/loading.../i);
    expect(loaderText).toBeInTheDocument();
  });

  test('loader animation has the correct number of divs', () => {
    render(<Loader />);
    const loaderDivs = screen.getByRole('status', { name: /loading animation/i }).querySelectorAll('div');
    expect(loaderDivs).toHaveLength(4);
  });
});
