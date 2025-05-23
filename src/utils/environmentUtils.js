/**
 * Utility functions for checking the current environment
 */

// Cache the environment check results
let _isLocalEnvironment = null;

/**
 * Detects if the app is running in a local development environment
 * @returns {boolean} True if running locally
 */
export const isLocalEnvironment = () => {
  // Use cached result if available
  if (_isLocalEnvironment !== null) {
    return _isLocalEnvironment;
  }
  
  // Check if we're in a development environment
  const isDev = process.env.NODE_ENV === 'development' || import.meta.env.DEV;
  
  // Check if we're running on localhost or a local IP
  const isLocalhost = typeof window !== 'undefined' && (
    window.location.hostname === 'localhost' || 
    window.location.hostname === '127.0.0.1' ||
    window.location.hostname.includes('192.168.') ||
    window.location.hostname.includes('10.0.')
  );
  
  // Cache the result
  _isLocalEnvironment = isDev && isLocalhost;
  
  return _isLocalEnvironment;
};

/**
 * Safely logs debug information only in local environments
 * @param {string} message - The message to log
 * @param {any} data - Additional data to log
 */
export const debugLog = (message, data) => {
  if (isLocalEnvironment()) {
    if (data !== undefined) {
      console.log(`[DEBUG] ${message}`, data);
    } else {
      console.log(`[DEBUG] ${message}`);
    }
  }
};

/**
 * Get the current environment name
 * @returns {string} - The current environment name
 */
export const getEnvironmentName = () => {
  if (isLocalEnvironment()) return 'local';
  if (import.meta.env.DEV) return 'development';
  return 'production';
};
