import { Contact } from '../types/contact';

interface ContactCardProps {
  contact: Contact;
}

export function ContactCard({ contact }: ContactCardProps) {
  // Generate initials from name for avatar
  const getInitials = (name: string): string => {
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const initials = getInitials(contact.name);

  return (
    <article 
      className="group bg-white rounded-xl shadow-sm hover:shadow-xl focus-within:shadow-xl transition-all duration-300 p-6 border border-gray-200 hover:border-blue-400 focus-within:border-blue-400 transform hover:-translate-y-1 focus-within:-translate-y-1"
      role="article"
      aria-label={`Contact card for ${contact.name}`}
      tabIndex={0}
    >
      <div className="flex items-start space-x-4">
        {/* Avatar with enhanced styling */}
        <div className="flex-shrink-0" aria-hidden="true">
          {contact.avatar ? (
            <img
              src={contact.avatar}
              alt=""
              className="w-14 h-14 rounded-full object-cover ring-2 ring-gray-100 group-hover:ring-blue-300 group-focus-within:ring-blue-300 transition-all duration-300"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:shadow-lg group-focus-within:shadow-lg group-hover:scale-105 group-focus-within:scale-105 transition-all duration-300">
              {initials}
            </div>
          )}
        </div>

        {/* Contact Information with enhanced typography */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-gray-900 truncate mb-3 group-hover:text-blue-600 group-focus-within:text-blue-600 transition-colors duration-200">
            {contact.name}
          </h3>

          <div className="space-y-2">
            {contact.email && (
              <div className="flex items-center text-sm text-gray-700 group-hover:text-gray-900 group-focus-within:text-gray-900 transition-colors duration-200">
                <svg
                  className="w-4 h-4 mr-2.5 flex-shrink-0 text-gray-500 group-hover:text-blue-600 group-focus-within:text-blue-600 transition-colors duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="truncate font-medium" aria-label={`Email: ${contact.email}`}>{contact.email}</span>
              </div>
            )}

            {contact.phone && (
              <div className="flex items-center text-sm text-gray-700 group-hover:text-gray-900 group-focus-within:text-gray-900 transition-colors duration-200">
                <svg
                  className="w-4 h-4 mr-2.5 flex-shrink-0 text-gray-500 group-hover:text-blue-600 group-focus-within:text-blue-600 transition-colors duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span className="truncate font-medium" aria-label={`Phone: ${contact.phone}`}>{contact.phone}</span>
              </div>
            )}

            {contact.company && (
              <div className="flex items-center text-sm text-gray-700 group-hover:text-gray-900 group-focus-within:text-gray-900 transition-colors duration-200">
                <svg
                  className="w-4 h-4 mr-2.5 flex-shrink-0 text-gray-500 group-hover:text-blue-600 group-focus-within:text-blue-600 transition-colors duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                <span className="truncate font-medium" aria-label={`Company: ${contact.company}`}>{contact.company}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
