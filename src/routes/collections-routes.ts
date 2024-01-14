import {
  addProductToCollection,
  createCollection,
  deleteCollection,
  deleteProductFromCollection,
  getCollection,
  getCollections,
  updateCollection,
} from "../controllers/collections-controller";

import { Router } from "express";
import validate from "../middlewares/validate";
import { collectionValidator } from "../validators";

const collectionsRoutes = Router();

collectionsRoutes.get("/", getCollections);
collectionsRoutes.post(
  "/",
  validate(collectionValidator.createCollection),
  createCollection
);
collectionsRoutes.post(
  "/:collectionId/products",
  validate(collectionValidator.addProductToCollection),
  addProductToCollection
);
collectionsRoutes.get("/:collectionId", getCollection);
collectionsRoutes.put(
  "/:collectionId",
  validate(collectionValidator.updateCollection),
  updateCollection
);
collectionsRoutes.delete("/:collectionId", deleteCollection);
collectionsRoutes.delete(
  "/:collectionId/products/:productId",
  deleteProductFromCollection
);

export default collectionsRoutes;
