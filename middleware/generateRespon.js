const handleServerResponse = (res, status, message = '', data = null, error = null, path = null) => {
    if (error) {
        return res.status(status || 500).json({
            code: status || 500,
            message: message || 'Internal Server Error',
            fullError: error,
            path: path || null
        });
    }

    return res.status(status).json({
        message,
        data,
    });
};

module.exports = handleServerResponse;
