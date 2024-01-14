import express from "express";
import productsRoutes from "./routes/products-routes";
import collectionsRoutes from "./routes/collections-routes";
import errorMiddleware from "./middlewares/error";
export const app = express();

app.use(express.json());
app.use("/products", productsRoutes);
app.use("/collections", collectionsRoutes);

app.use(errorMiddleware);
