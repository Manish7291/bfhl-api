const mathService = require('../services/math.service');
const aiService = require('../services/ai.service');
const { successResponse, errorResponse } = require('../utils/response.util');

const handleBfhl = async (req, res) => {
    try {
        const body = req.body;
        const keys = Object.keys(body);

        if (keys.length !== 1) {
            return res.status(400).json(errorResponse('Request body must contain exactly one key'));
        }

        const key = keys[0];
        const value = body[key];

        let result;

        switch (key) {
            case 'fibonacci':
                if (!Number.isInteger(value) || value < 0) {
                    return res.status(400).json(errorResponse('fibonacci must be a non-negative integer'));
                }
                result = mathService.generateFibonacci(value);
                break;

            case 'prime':
                if (!Array.isArray(value)) {
                    return res.status(400).json(errorResponse('prime must be an array of integers'));
                }
                if (value.length === 0) {
                    return res.status(400).json(errorResponse('prime array cannot be empty'));
                }
                if (!value.every(num => Number.isInteger(num))) {
                    return res.status(400).json(errorResponse('prime array must contain only integers'));
                }
                result = mathService.filterPrimes(value);
                break;

            case 'lcm':
                if (!Array.isArray(value)) {
                    return res.status(400).json(errorResponse('lcm must be an array of integers'));
                }
                if (value.length === 0) {
                    return res.status(400).json(errorResponse('lcm array cannot be empty'));
                }
                if (!value.every(num => Number.isInteger(num) && num > 0)) {
                    return res.status(400).json(errorResponse('lcm array must contain only positive integers'));
                }
                result = mathService.calculateLCM(value);
                break;

            case 'hcf':
                if (!Array.isArray(value)) {
                    return res.status(400).json(errorResponse('hcf must be an array of integers'));
                }
                if (value.length === 0) {
                    return res.status(400).json(errorResponse('hcf array cannot be empty'));
                }
                if (!value.every(num => Number.isInteger(num) && num > 0)) {
                    return res.status(400).json(errorResponse('hcf array must contain only positive integers'));
                }
                result = mathService.calculateHCF(value);
                break;

            case 'AI':
                if (typeof value !== 'string' || value.trim() === '') {
                    return res.status(400).json(errorResponse('AI must be a non-empty string'));
                }
                result = await aiService.getAIResponse(value);
                break;

            default:
                return res.status(400).json(errorResponse('Invalid key. Allowed keys: fibonacci, prime, lcm, hcf, AI'));
        }

        return res.status(200).json(successResponse(result));

    } catch (error) {
        return res.status(500).json(errorResponse(error.message || 'Internal server error'));
    }
};

module.exports = {
    handleBfhl
};
