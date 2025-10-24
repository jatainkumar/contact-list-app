import { useState, useEffect } from 'react';
import { Contact } from '../types/contact';
import { mockContacts } from '../data/mockContacts';

interface UseContactsReturn {
  contacts: Contact[];
  isLoading: boolean;
  error: Error | null;
  addContact: (contact: Omit<Contact, 'id' | 'createdAt'>) => void;
  deleteContact: (id: string) => void;
  searchContacts: (query: string) => Contact[];
}

export const useContacts = (): UseContactsReturn => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // Simulate async data fetching with loading state
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 800));
        
        // Simulate potential network error (uncomment to test error state)
        // throw new Error('Failed to fetch contacts from server');
        
        setContacts(mockContacts);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch contacts'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchContacts();
  }, []);

  // Add contact function with ID generation
  const addContact = (contactData: Omit<Contact, 'id' | 'createdAt'>) => {
    try {
      // Validate contact data
      if (!contactData.name || !contactData.name.trim()) {
        throw new Error('Contact name is required');
      }

      const newContact: Contact = {
        ...contactData,
        id: crypto.randomUUID(),
        createdAt: new Date(),
      };

      setContacts((prevContacts: Contact[]) => [newContact, ...prevContacts]);
    } catch (err) {
      // Re-throw error to be handled by the form component
      throw err instanceof Error ? err : new Error('Failed to add contact');
    }
  };

  // Delete contact function
  const deleteContact = (id: string) => {
    setContacts((prevContacts: Contact[]) => 
      prevContacts.filter((contact) => contact.id !== id)
    );
  };

  // Search contacts function with case-insensitive filtering
  const searchContacts = (query: string): Contact[] => {
    try {
      // Handle null or undefined query
      if (!query || typeof query !== 'string') {
        return contacts;
      }

      // Handle empty or whitespace-only query
      const trimmedQuery = query.trim();
      if (!trimmedQuery) {
        return contacts;
      }

      const normalizedQuery = trimmedQuery.toLowerCase();
      
      // Filter contacts with safe name access
      return contacts.filter((contact: Contact) => {
        if (!contact || !contact.name) {
          return false;
        }
        return contact.name.toLowerCase().includes(normalizedQuery);
      });
    } catch (err) {
      // If search fails, return all contacts as fallback
      console.error('Search error:', err);
      return contacts;
    }
  };

  return {
    contacts,
    isLoading,
    error,
    addContact,
    deleteContact,
    searchContacts,
  };
};
