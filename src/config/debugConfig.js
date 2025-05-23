/**
 * Configuration file for debug settings
 * This allows enabling/disabling specific debug features based on environment
 */
import { isLocalEnvironment } from '../utils/environmentUtils';

/**
 * Debug configuration settings
 * All settings are automatically disabled in production environments
 */
const debugConfig = {
  // General settings
  enableConsoleLogging: isLocalEnvironment(),
  enableDebugOverlays: isLocalEnvironment(),
  
  // Specific features
  imageDebug: {
    enabled: isLocalEnvironment(),
    showImageReport: isLocalEnvironment(),
    logImageMatches: isLocalEnvironment(),
    showDebugPanel: isLocalEnvironment()
  },
  
  // Performance monitoring
  performance: {
    enabled: isLocalEnvironment(),
    logLoadTimes: isLocalEnvironment()
  }
};

/**
 * Helper function to check if a specific debug feature is enabled
 * @param {string} feature - Dot notation path to the feature (e.g., 'imageDebug.enabled')
 * @returns {boolean} - Whether the feature is enabled
 */
export const isDebugFeatureEnabled = (feature) => {
  // Always disable debugging in production
  if (!isLocalEnvironment()) return false;
  
  // Parse the feature path
  const path = feature.split('.');
  let current = debugConfig;
  
  for (const key of path) {
    if (current[key] === undefined) return false;
    current = current[key];
  }
  
  return !!current;
};

export default debugConfig;
