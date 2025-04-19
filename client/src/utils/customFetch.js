/**
 * Custom fetch utility for making API requests with credentials
 * @param {string} url - The URL to fetch
 * @param {Object} options - Fetch options
 * @returns {Promise<any>} - JSON response from the server
 */
const customFetch = async (url, options = {}) => {
  try {
    // Set default options
    const defaultOptions = {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // Merge options
    const mergedOptions = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers,
      },
    };

    console.log(`Fetching ${url}...`);

    // Make the request
    const response = await fetch(`http://localhost:8000${url}`, mergedOptions);

    // Handle non-2xx responses
    if (!response.ok) {
      const errorText = await response.text();
      const error = new Error(errorText || response.statusText);
      error.status = response.status;
      throw error;
    }

    // Parse JSON response
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error in customFetch (${url}):`, error);
    
    // Special handling for 401/403 errors
    if (error.status === 401 || error.status === 403) {
      console.warn('Authentication error. User may need to log in again.');
      // You could redirect to login page or display a notification here
    }
    
    throw error;
  }
};

export default customFetch; 