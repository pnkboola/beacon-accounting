// Chatbot Configuration File
// This file can be used to set environment-specific configuration for the chatbot

// For Azure Static Web Apps:
// Set these as Application Settings in Azure Portal:
// - CHATBOT_API_SECRET: Your function app code/secret
// - CHATBOT_API_URL: (optional) Custom API URL if different from default
// - CHATBOT_EMAIL: (optional) Custom email ID for API calls

// For local development, uncomment and set these values:
/*
window.CHATBOT_API_SECRET = 'your-secret-here';
window.CHATBOT_API_URL = 'https://whatsapp-verification-webhook.azurewebsites.net/api/uk-account-assist';
window.CHATBOT_EMAIL = 'chatbot@beaconaccounting.co.uk';
*/

// Azure Static Web Apps automatically injects environment variables
// They can be accessed via window object if configured properly
if (typeof window !== 'undefined') {
    // Try to get from Azure SWA injected variables
    window.CHATBOT_API_SECRET = window.CHATBOT_API_SECRET || '';
    window.CHATBOT_API_URL = window.CHATBOT_API_URL || 'https://whatsapp-verification-webhook.azurewebsites.net/api/uk-account-assist';
    window.CHATBOT_EMAIL = window.CHATBOT_EMAIL || 'info@beaconacounting.co.uk';
}