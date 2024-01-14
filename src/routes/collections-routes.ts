import {
  createCollection,
  deleteCollection,
  getCollection,
  getCollections,
  updateCollection,
} from "../controllers/collections-controller";

import { Router } from "express";

const collectionsRoutes = Router();

collectionsRoutes.get("/", getCollections);
collectionsRoutes.post("/", createCollection);
collectionsRoutes.get("/:collectionId", getCollection);
collectionsRoutes.put("/:collectionId", updateCollection);
collectionsRoutes.delete("/:collectionId", deleteCollection);

export default collectionsRoutes;
