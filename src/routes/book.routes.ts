import { Router } from "express";

import { requireAuth } from "../middleware/auth.middleware";

import { getBookByIdController } from "../controllers/book.controller";

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

router.get(

"/:id",

requireAuth,

getBookByIdController

);