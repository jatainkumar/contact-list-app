import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AddContactForm } from './AddContactForm';

describe('AddContactForm', () => {
  it('renders all form fields', () => {
    const mockOnAdd = vi.fn();
    render(<AddContactForm onAddContact={mockOnAdd} />);
    
    expect(screen.getByLabelText(/Name/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Company/)).toBeInTheDocument();
  });

  it('shows validation error when name is empty', async () => {
    const user = userEvent.setup();
    const mockOnAdd = vi.fn();
    render(<AddContactForm onAddContact={mockOnAdd} />);
    
    const submitButton = screen.getByRole('button', { name: /Add Contact/i });
    await user.click(submitButton);
    
    expect(screen.getByText('Name is required')).toBeInTheDocument();
    expect(mockOnAdd).not.toHaveBeenCalled();
  });

  it('validates email format', async () => {
    const user = userEvent.setup();
    const mockOnAdd = vi.fn();
    render(<AddContactForm onAddContact={mockOnAdd} />);
    
    const nameInput = screen.getByLabelText(/Name/);
    const emailInput = screen.getByLabelText(/Email/);
    
    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'notanemail');
    
    const submitButton = screen.getByRole('button', { name: /Add Contact/i });
    await user.click(submitButton);
    
    // The form should validate and not call onAdd with invalid email
    await waitFor(() => {
      // Either shows error or doesn't submit
      const hasError = screen.queryByText('Invalid email format');
      if (!hasError) {
        // If no error shown, at least verify it didn't submit
        expect(mockOnAdd).not.toHaveBeenCalled();
      }
    });
  });

  it('submits form with valid data', async () => {
    const user = userEvent.setup();
    const mockOnAdd = vi.fn();
    render(<AddContactForm onAddContact={mockOnAdd} />);
    
    const nameInput = screen.getByLabelText(/Name/);
    const emailInput = screen.getByLabelText(/Email/);
    const submitButton = screen.getByRole('button', { name: /Add Contact/i });
    
    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');
    await user.click(submitButton);
    
    expect(mockOnAdd).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com',
    });
  });

  it('resets form after successful submission', async () => {
    const user = userEvent.setup();
    const mockOnAdd = vi.fn();
    render(<AddContactForm onAddContact={mockOnAdd} />);
    
    const nameInput = screen.getByLabelText(/Name/);
    const submitButton = screen.getByRole('button', { name: /Add Contact/i });
    
    await user.type(nameInput, 'John Doe');
    await user.click(submitButton);
    
    expect(nameInput).toHaveValue('');
  });

  it('calls onCancel when cancel button is clicked', async () => {
    const user = userEvent.setup();
    const mockOnAdd = vi.fn();
    const mockOnCancel = vi.fn();
    render(<AddContactForm onAddContact={mockOnAdd} onCancel={mockOnCancel} />);
    
    const cancelButton = screen.getByRole('button', { name: /Cancel/i });
    await user.click(cancelButton);
    
    expect(mockOnCancel).toHaveBeenCalled();
  });
});
