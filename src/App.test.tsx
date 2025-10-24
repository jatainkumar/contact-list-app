import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

// Mock the useContacts hook
vi.mock('./hooks/useContacts', () => ({
  useContacts: () => ({
    contacts: [
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1 (555) 123-4567',
        company: 'Acme Corp',
        createdAt: new Date(),
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '+1 (555) 987-6543',
        company: 'Tech Inc',
        createdAt: new Date(),
      },
    ],
    isLoading: false,
    error: null,
    addContact: vi.fn((contact) => {
      // Mock implementation that doesn't actually add
    }),
    searchContacts: vi.fn(),
  }),
}));

describe('App Integration Tests', () => {
  it('filters contacts based on search query', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    // Wait for contacts to load
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
    
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    
    // Type in search bar
    const searchInput = screen.getByRole('textbox', { name: /Search contacts/i });
    await user.type(searchInput, 'John');
    
    // John should be visible, Jane should not
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
  });

  it('shows no results message when search has no matches', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
    
    const searchInput = screen.getByRole('textbox', { name: /Search contacts/i });
    await user.type(searchInput, 'NonExistent');
    
    expect(screen.getByText('No contacts found')).toBeInTheDocument();
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
  });

  it('clears search and shows all contacts', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
    
    const searchInput = screen.getByRole('textbox', { name: /Search contacts/i });
    await user.type(searchInput, 'John');
    
    expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
    
    // Clear search
    const clearButton = screen.getByLabelText('Clear search');
    await user.click(clearButton);
    
    // Both contacts should be visible again
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  it('shows add contact form when button is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
    
    // Click add contact button to show form (using aria-label)
    const addButton = screen.getByRole('button', { name: /Add new contact/i });
    await user.click(addButton);
    
    // Form should be visible
    expect(screen.getByText('Add New Contact')).toBeInTheDocument();
    
    // Button text should change
    expect(screen.getByRole('button', { name: /Close add contact form/i })).toBeInTheDocument();
  });
});
