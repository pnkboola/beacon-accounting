// api/config.js - Azure Function to serve configuration
module.exports = async function (context, req) {
    context.res = {
        status: 200,
        headers: {
            "Content-Type": "application/json"
        },
        body: {
            apiUrl: process.env.CHATBOT_API_URL || 'https://whatsapp-verification-webhook.azurewebsites.net/api/uk-account-assist',
            emailId: process.env.CHATBOT_EMAIL || 'info@beaconacounting.co.uk'
            // Note: Don't expose secrets directly - handle them server-side
        }
    };
};