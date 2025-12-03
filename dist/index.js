import express from "express";
import dotenv from "dotenv";
dotenv.config;
const app = express();
const HOST = process.env.HOST;
const PORT = process.env.PORT;
app.use(express.json());
app.listen(PORT, () => {
    console.log(`server running at ${HOST}, ${PORT}`);
});
//# sourceMappingURL=index.js.map