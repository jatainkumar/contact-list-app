import { useState, useMemo } from 'react';
import { useContacts } from './hooks/useContacts';
import { SearchBar } from './components/SearchBar';
import { AddContactForm } from './components/AddContactForm';
import { ContactList } from './components/ContactList';
import { EmptyState } from './components/EmptyState';

function App() {
  const { contacts, isLoading, error, addContact, deleteContact } = useContacts();
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  // Implement search filtering logic using useMemo with error handling
  const filteredContacts = useMemo(() => {
    try {
      // Handle null or undefined search query
      if (!searchQuery || typeof searchQuery !== 'string') {
        return contacts;
      }

      // Handle empty or whitespace-only query
      const trimmedQuery = searchQuery.trim();
      if (!trimmedQuery) {
        return contacts;
      }

      const normalizedQuery = trimmedQuery.toLowerCase();
      
      // Filter contacts with safe access
      return contacts.filter((contact) => {
        if (!contact || !contact.name) {
          return false;
        }
        return contact.name.toLowerCase().includes(normalizedQuery);
      });
    } catch (err) {
      // If filtering fails, return all contacts as fallback
      console.error('Filter error:', err);
      return contacts;
    }
  }, [contacts, searchQuery]);

  const handleAddContact = (contactData: Parameters<typeof addContact>[0]) => {
    try {
      addContact(contactData);
      setShowAddForm(false);
    } catch (err) {
      // Error is handled by the form component
      console.error('Failed to add contact:', err);
      throw err;
    }
  };

  const handleToggleForm = () => {
    setShowAddForm((prev) => !prev);
  };

  const handleCancelForm = () => {
    setShowAddForm(false);
  };

  // Determine which state to show
  const showEmptyState = !isLoading && contacts.length === 0;
  const showNoResults = !isLoading && contacts.length > 0 && filteredContacts.length === 0;
  const showContactList = !isLoading && filteredContacts.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Skip to main content link for keyboard navigation */}
      <a href="#main-content" className="skip-to-main">
        Skip to main content
      </a>

      {/* Header Section with enhanced styling */}
      <header className="bg-white shadow-sm border-b border-gray-200" role="banner">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-7xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Title with icon */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                  Contact List
                </h1>
                <p className="text-sm text-gray-500 mt-0.5">
                  Manage your contacts with ease
                </p>
              </div>
            </div>
            
            {/* Add Contact Button with enhanced styling */}
            <button
              onClick={handleToggleForm}
              className="inline-flex items-center justify-center px-5 py-2.5 border border-transparent text-sm font-semibold rounded-lg text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              aria-label={showAddForm ? 'Close add contact form' : 'Add new contact'}
              aria-expanded={showAddForm}
            >
              <svg
                className={`w-5 h-5 mr-2 transition-transform duration-300 ${showAddForm ? 'rotate-45' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              {showAddForm ? 'Close Form' : 'Add Contact'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
        {/* Search Bar Section */}
        <div className="mb-8" role="search">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search contacts by name..."
          />
        </div>

        {/* Add Contact Form (Toggle Visibility) with smooth transition */}
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            showAddForm ? 'max-h-[800px] opacity-100 mb-8' : 'max-h-0 opacity-0'
          }`}
          aria-hidden={!showAddForm}
        >
          <div className="max-w-2xl mx-auto">
            <AddContactForm
              onAddContact={handleAddContact}
              onCancel={handleCancelForm}
            />
          </div>
        </div>

        {/* Main Content Area with proper spacing */}
        <main id="main-content" className="mt-8" role="main">
          {/* Error State - Data fetch failed */}
          {error && !isLoading && (
            <div role="alert" aria-live="assertive" className="max-w-2xl mx-auto">
              <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-6 shadow-md">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-red-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-lg font-semibold text-red-800 mb-2">
                      Failed to Load Contacts
                    </h3>
                    <p className="text-sm text-red-700 mb-4">
                      {error.message || 'An unexpected error occurred while fetching contacts.'}
                    </p>
                    <button
                      onClick={() => window.location.reload()}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200"
                    >
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                      Retry
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div role="status" aria-live="polite">
              <ContactList contacts={[]} isLoading={true} onDeleteContact={deleteContact} />
            </div>
          )}

          {/* Empty State - No contacts at all */}
          {showEmptyState && (
            <div role="status" aria-live="polite">
              <EmptyState type="empty" />
            </div>
          )}

          {/* No Results State - Search returned no matches */}
          {showNoResults && (
            <div role="status" aria-live="polite">
              <EmptyState type="no-results" searchQuery={searchQuery} />
            </div>
          )}

          {/* Contact List with Filtered Contacts */}
          {showContactList && (
            <div role="region" aria-live="polite" aria-atomic="false">
              <ContactList contacts={filteredContacts} isLoading={false} onDeleteContact={deleteContact} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
