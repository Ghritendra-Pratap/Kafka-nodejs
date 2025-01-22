import express from "express";
import CatelogRouter from '../src/routes/catalog.route'

const app = express()

app.use(express.json())

app.use("/" , CatelogRouter)

export default app;

