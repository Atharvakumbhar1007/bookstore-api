import { Router } from "express";

import { requireAuth } from "../middleware/auth.middleware";

import {

createBookController,

getAllBooksController,

}

from "../controllers/book.controller";

const router=Router();

router.post(

"/",

requireAuth,

createBookController

);

router.get(

"/",

requireAuth,

getAllBooksController

);

export default router;