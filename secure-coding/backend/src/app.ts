import express from "express";
import { home, test } from "./routes"

const path = require('path')
const cors = require('cors')
const cookieParser = require("cookie-parser");

export const createApp = async () => {

    const app = express();

    app.use(cors())

    app.use(cookieParser());

    app.use('/static', express.static(path.join(__dirname, 'public')))

    app.use(express.json());

    app.use('/api', home)

    app.use('/test', test)

    return app
}
