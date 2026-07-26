import { Request, Response } from "express";

import { asyncHandler } from "../utils/asyncHandler";

import { CategorySchema } from "../validators/category.validator";

import { createCategory } from "../services/category.service";

export const createCategoryController =
asyncHandler(

async (

req: Request,

res: Response

)=>{

const result=

CategorySchema.safeParse(

req.body

);

if(!result.success){

return res.status(400).json({

errors:

result.error.issues,

});

}

const category=

await createCategory(

result.data.name

);

return res.status(201).json({

message:

"Category created successfully",

category,

});

});