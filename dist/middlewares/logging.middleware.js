export const requestLogger = (req, _res, next) => {
    console.log(`Request masuk : ${req.method} ${req.path}`);
    req.startTime = Date.now();
    next();
};
//# sourceMappingURL=logging.middleware.js.map