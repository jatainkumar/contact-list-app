import { ContactCard } from './ContactCard';

export function ContactList({ contacts, isLoading, onDeleteContact }) {
  // Loading skeleton state with enhanced animation
  if (isLoading) {
    return (
      <div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        role="status"
        aria-live="polite"
        aria-label="Loading contacts"
      >
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 animate-pulse"
            style={{ animationDelay: `${index * 50}ms` }}
            aria-hidden="true"
          >
            <div className="flex items-start space-x-4">
              {/* Avatar skeleton */}
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gray-200 to-gray-300"></div>
              </div>

              {/* Content skeleton */}
              <div className="flex-1 space-y-3">
                <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gradient-to-r from-gray-100 to-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gradient-to-r from-gray-100 to-gray-200 rounded w-5/6"></div>
                  <div className="h-4 bg-gradient-to-r from-gray-100 to-gray-200 rounded w-4/6"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <span className="sr-only">Loading contacts, please wait...</span>
      </div>
    );
  }

  // Render responsive grid of ContactCard components
  return (
    <div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fadeIn"
      role="list"
      aria-label={`Contact list with ${contacts.length} contact${contacts.length !== 1 ? 's' : ''}`}
    >
      {contacts.map((contact, index) => (
        <div
          key={contact.id}
          style={{ animationDelay: `${index * 30}ms` }}
          className="animate-slideUp"
          role="listitem"
        >
          <ContactCard contact={contact} onDelete={onDeleteContact} />
        </div>
      ))}
    </div>
  );
}
