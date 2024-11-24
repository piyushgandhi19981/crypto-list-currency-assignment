import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TableHeader from '../TableHeader';

describe('TableHeader Component', () => {
  it('renders the title and subtitle correctly', () => {
    const title = 'Test Title';
    const subTitle = 'Test Subtitle';

    render(<TableHeader title={title} subTitle={subTitle} />);

    const titleElement = screen.getByText(title);
    const subTitleElement = screen.getByText(subTitle);

    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveClass('header-title');
    expect(subTitleElement).toBeInTheDocument();
    expect(subTitleElement).toHaveClass('header-subtitle');
  });

  it('renders with default props when no title or subtitle is provided', () => {
    render(<TableHeader />);
  
    const titleElement = screen.queryByText('', { selector: '.header-title' });
    const subTitleElement = screen.queryByText('', { selector: '.header-subtitle' });
  
    expect(titleElement).not.toBeInTheDocument();
    expect(subTitleElement).not.toBeInTheDocument();
  });
  

  it('handles long text gracefully', () => {
    const longTitle = 'A Very Long Title That Exceeds Normal Length';
    const longSubTitle = 'A Very Long Subtitle That Exceeds Normal Length';

    render(<TableHeader title={longTitle} subTitle={longSubTitle} />);

    const titleElement = screen.getByText(longTitle);
    const subTitleElement = screen.getByText(longSubTitle);

    expect(titleElement).toBeInTheDocument();
    expect(subTitleElement).toBeInTheDocument();
    expect(titleElement).toHaveClass('header-title');
    expect(subTitleElement).toHaveClass('header-subtitle');
  });
});
