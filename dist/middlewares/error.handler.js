import { errorResponse } from "../utils/response";
export const errorHandler = (err, _req, res, _next) => {
    console.error("ERROR:", err.message);
    errorResponse(res, err.message, 400);
};
//# sourceMappingURL=error.handler.js.map