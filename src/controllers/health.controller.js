const { successResponse } = require('../utils/response.util');

const getHealth = (req, res) => {
    return res.status(200).json(successResponse(null));
};

module.exports = {
    getHealth
};
