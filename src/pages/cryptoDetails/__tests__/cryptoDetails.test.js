import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import CryptoDetailsPage from '../CryptoDetails';

jest.mock('../../../actions/crypto.actions', () => ({
  fetchCryptoDetailsAction: jest.fn().mockResolvedValue([]),
}));

jest.mock('../../../components/loader', () => () => <div>Loading...</div>);

describe('CryptoDetailsPage', () => {
  it('shows a loader while fetching crypto data', () => {
    render(
      <MemoryRouter initialEntries={['/crypto/1']}>
        <CryptoDetailsPage />
      </MemoryRouter>
    );

    const loader = screen.getByText('Loading...');
    expect(loader).toBeInTheDocument();
  });
});

describe('CryptoDetailsPage 2', () => {
  it('handles missing crypto data gracefully', async () => {
    render(
      <MemoryRouter initialEntries={['/crypto-details/Bitcoin?currency=usd']}>
        <CryptoDetailsPage />
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText('Loading...'));

    const loader = screen.getByText('Loading...');
    expect(loader).toBeInTheDocument();

  });
});
