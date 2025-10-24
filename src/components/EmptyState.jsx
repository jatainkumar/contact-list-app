export function EmptyState({ type, searchQuery }) {
  if (type === 'no-results') {
    return (
      <div 
        className="flex flex-col items-center justify-center py-20 px-4 animate-fadeIn"
        role="status"
        aria-live="polite"
      >
        {/* No Results Icon with enhanced styling */}
        <div className="w-20 h-20 mb-6 text-gray-400 bg-gray-50 rounded-full p-4 shadow-inner" aria-hidden="true">
          <svg
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            className="w-full h-full"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* No Results Message with enhanced typography */}
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          No contacts found
        </h3>
        <p className="text-gray-700 text-center max-w-md text-base leading-relaxed">
          {searchQuery ? (
            <>
              No contacts match "<span className="font-semibold text-gray-900">{searchQuery}</span>".
              Try adjusting your search terms.
            </>
          ) : (
            'No contacts match your search. Try different keywords.'
          )}
        </p>
      </div>
    );
  }

  // Empty list state with enhanced styling
  return (
    <div 
      className="flex flex-col items-center justify-center py-20 px-4 animate-fadeIn"
      role="status"
      aria-live="polite"
    >
      {/* Empty List Icon with enhanced styling */}
      <div className="w-24 h-24 mb-6 text-blue-500 bg-blue-50 rounded-full p-5 shadow-lg" aria-hidden="true">
        <svg
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          className="w-full h-full"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      </div>

      {/* Empty List Message with enhanced typography */}
      <h3 className="text-2xl font-bold text-gray-900 mb-3">
        No contacts yet
      </h3>
      <p className="text-gray-700 text-center max-w-md mb-8 text-base leading-relaxed">
        Get started by adding your first contact to build your contact list.
      </p>

      {/* Call to Action with enhanced styling */}
      <button
        type="button"
        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-semibold rounded-lg text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        aria-label="Add your first contact"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
        Add Your First Contact
      </button>
    </div>
  );
}
