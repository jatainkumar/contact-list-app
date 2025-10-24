const API_URL = 'http://localhost:3001/api';

// Login
export async function login(email, password) {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  return response.json();
}

// Get all contacts
export async function getContacts() {
  const response = await fetch(`${API_URL}/contacts`);

  if (!response.ok) {
    throw new Error('Failed to fetch contacts');
  }

  return response.json();
}

// Create contact
export async function createContact(contactData) {
  const response = await fetch(`${API_URL}/contacts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(contactData),
  });

  if (!response.ok) {
    throw new Error('Failed to create contact');
  }

  return response.json();
}

// Update contact
export async function updateContact(id, contactData) {
  const response = await fetch(`${API_URL}/contacts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(contactData),
  });

  if (!response.ok) {
    throw new Error('Failed to update contact');
  }

  return response.json();
}

// Delete contact
export async function deleteContact(id) {
  const response = await fetch(`${API_URL}/contacts/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete contact');
  }

  return response.json();
}
