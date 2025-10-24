interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder = 'Search contacts by name...' }: SearchBarProps) {
  const handleClear = () => {
    onChange('');
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <label htmlFor="contact-search" className="sr-only">
        Search contacts
      </label>
      <div className="relative group">
        {/* Search Icon with enhanced styling */}
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Search Input with enhanced styling */}
        <input
          id="contact-search"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="block w-full pl-12 pr-12 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400 transition-all duration-200 bg-white shadow-sm hover:border-gray-300 focus:shadow-md text-base"
          aria-label="Search contacts by name"
          aria-describedby="search-description"
        />

        {/* Clear Button with enhanced styling */}
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-all duration-200 hover:scale-110"
            aria-label="Clear search"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
      <span id="search-description" className="sr-only">
        Type to filter contacts by name. Results update as you type.
      </span>
    </div>
  );
}
