import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { EmptyState } from './EmptyState';

describe('EmptyState', () => {
  it('displays empty list message when type is empty', () => {
    render(<EmptyState type="empty" />);
    expect(screen.getByText('No contacts yet')).toBeInTheDocument();
    expect(screen.getByText(/Get started by adding your first contact/)).toBeInTheDocument();
  });

  it('displays no results message when type is no-results', () => {
    render(<EmptyState type="no-results" />);
    expect(screen.getByText('No contacts found')).toBeInTheDocument();
  });

  it('displays search query in no results message', () => {
    render(<EmptyState type="no-results" searchQuery="John" />);
    expect(screen.getByText(/John/)).toBeInTheDocument();
  });

  it('shows add contact button for empty state', () => {
    render(<EmptyState type="empty" />);
    expect(screen.getByRole('button', { name: /Add Your First Contact/i })).toBeInTheDocument();
  });

  it('does not show add contact button for no-results state', () => {
    render(<EmptyState type="no-results" />);
    expect(screen.queryByRole('button', { name: /Add Your First Contact/i })).not.toBeInTheDocument();
  });
});
