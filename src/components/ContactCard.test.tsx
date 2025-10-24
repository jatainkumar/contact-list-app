import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ContactCard } from './ContactCard';
import { Contact } from '../types/contact';

describe('ContactCard', () => {
  const mockContact: Contact = {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    company: 'Acme Corporation',
    createdAt: new Date(),
  };

  it('renders contact name', () => {
    render(<ContactCard contact={mockContact} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('renders contact email when provided', () => {
    render(<ContactCard contact={mockContact} />);
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
  });

  it('renders contact phone when provided', () => {
    render(<ContactCard contact={mockContact} />);
    expect(screen.getByText('+1 (555) 123-4567')).toBeInTheDocument();
  });

  it('renders contact company when provided', () => {
    render(<ContactCard contact={mockContact} />);
    expect(screen.getByText('Acme Corporation')).toBeInTheDocument();
  });

  it('does not render email when not provided', () => {
    const contactWithoutEmail = { ...mockContact, email: undefined };
    render(<ContactCard contact={contactWithoutEmail} />);
    expect(screen.queryByLabelText(/Email:/)).not.toBeInTheDocument();
  });

  it('renders initials when no avatar is provided', () => {
    render(<ContactCard contact={mockContact} />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });
});
