// api/chatbot.js - Proxy function to handle API calls with secret
module.exports = async function (context, req) {
    if (req.method !== 'POST') {
        context.res = {
            status: 405,
            body: 'Method not allowed'
        };
        return;
    }

    try {
        const { EmailId, Message, PhoneNumber } = req.body;
        
        if (!Message || (!EmailId && !PhoneNumber)) {
            context.res = {
                status: 400,
                body: 'Missing required fields: Message and (EmailId or PhoneNumber)'
            };
            return;
        }

        // Get the secret from environment variables (server-side only)
        const apiSecret = process.env.CHATBOT_API_SECRET;
        const apiUrl = process.env.CHATBOT_API_URL || 'https://whatsapp-verification-webhook.azurewebsites.net/api/uk-account-assist';
        
        if (!apiSecret) {
            throw new Error('CHATBOT_API_SECRET not configured');
        }

        // Construct the endpoint with secret
        const endpoint = `${apiUrl}?code=${apiSecret}`;

        // Make the API call
        const fetch = require('node-fetch');
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                EmailId,
                Message,
                PhoneNumber
            })
        });

        const responseText = await response.text();

        context.res = {
            status: response.status,
            headers: {
                "Content-Type": "application/json"
            },
            body: responseText
        };

    } catch (error) {
        context.log.error('Chatbot API Error:', error);
        context.res = {
            status: 500,
            body: 'Internal server error'
        };
    }
};