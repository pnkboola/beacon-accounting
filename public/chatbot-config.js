// Chatbot Configuration File
// Azure Static Web Apps Configuration

// IMPORTANT: Azure Static Web Apps cannot expose server environment variables to client-side JavaScript
// for security reasons. Instead, we use API functions to handle secure operations.

// Configuration object for chatbot
window.CHATBOT_CONFIG = {
    // Detect if running locally vs Azure
    USE_LOCAL_API: (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1'),
    LOCAL_API_ENDPOINT: '/api/chatbot',
    CONFIG_API_ENDPOINT: '/api/config',
    
    // Direct API configuration for local development
    API_URL: 'https://whatsapp-verification-webhook.azurewebsites.net/api/uk-account-assist',
    API_SECRET: '', // For local dev only
    EMAIL_ID: 'info@beaconaccounting.co.uk',
    
    // Fallback configuration 
    FALLBACK_CONFIG: {
        API_URL: 'https://whatsapp-verification-webhook.azurewebsites.net/api/uk-account-assist',
        EMAIL_ID: 'info@beaconaccounting.co.uk'
    }
};

// Function to load configuration from API
window.loadChatbotConfig = async function() {
    // Skip API loading for local development
    if (!window.CHATBOT_CONFIG.USE_LOCAL_API) {
        console.log('Using direct API configuration for local development');
        window.CHATBOT_CONFIG.RUNTIME_CONFIG = {
            apiUrl: window.CHATBOT_CONFIG.API_URL,
            emailId: window.CHATBOT_CONFIG.EMAIL_ID
        };
        return window.CHATBOT_CONFIG.RUNTIME_CONFIG;
    }
    
    try {
        const response = await fetch(window.CHATBOT_CONFIG.CONFIG_API_ENDPOINT);
        if (response.ok) {
            const config = await response.json();
            window.CHATBOT_CONFIG.RUNTIME_CONFIG = config;
            return config;
        }
    } catch (error) {
        console.warn('Failed to load config from API, using fallback');
    }
    
    // Use fallback configuration
    window.CHATBOT_CONFIG.RUNTIME_CONFIG = window.CHATBOT_CONFIG.FALLBACK_CONFIG;
    return window.CHATBOT_CONFIG.FALLBACK_CONFIG;
};