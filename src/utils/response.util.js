const successResponse = (data) => {
    const response = {
        is_success: true,
        official_email: process.env.OFFICIAL_EMAIL || ''
    };

    if (data !== null && data !== undefined) {
        response.data = data;
    }

    return response;
};

const errorResponse = (message) => {
    return {
        is_success: false,
        official_email: process.env.OFFICIAL_EMAIL || '',
        error: message
    };
};

module.exports = {
    successResponse,
    errorResponse
};
