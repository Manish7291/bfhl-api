const axios = require('axios');

const getAIResponse = async (question) => {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        throw new Error('GEMINI_API_KEY is not configured');
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const requestBody = {
        contents: [
            {
                parts: [
                    {
                        text: `Answer the following question in exactly ONE word only. No explanations, no punctuation, just one single word: ${question}`
                    }
                ]
            }
        ],
        generationConfig: {
            temperature: 0.1,
            maxOutputTokens: 100
        }
    };

    const response = await axios.post(url, requestBody, {
        headers: {
            'Content-Type': 'application/json'
        },
        timeout: 30000
    });

    const data = response.data;

    if (!data || !data.candidates || data.candidates.length === 0) {
        throw new Error('No response from AI');
    }

    const candidate = data.candidates[0];

    if (!candidate || !candidate.content || !candidate.content.parts || candidate.content.parts.length === 0) {
        throw new Error('Invalid AI response format');
    }

    const fullText = candidate.content.parts[0].text || '';
    const words = fullText.trim().split(/\s+/);
    const singleWord = words[0].replace(/[^a-zA-Z0-9]/g, '');

    return singleWord || 'Unknown';
};

module.exports = {
    getAIResponse
};
