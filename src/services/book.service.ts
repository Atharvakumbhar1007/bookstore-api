import prisma from "../config/prisma";
import { ApiError } from "../utils/ApiError";
import { Role } from "@prisma/client";

export const getAllBooks = async (

    role: Role,

    userId: number

) => {

    if (role === Role.ADMIN) {

        return await prisma.book.findMany({

            include: {

                owner: true,

                category: true,

            },

            orderBy: {

                createdAt: "desc",

            },

        });

    }

    return await prisma.book.findMany({

        where: {

            ownerId: userId,

        },

        include: {

            owner: true,

            category: true,

        },

        orderBy: {

            createdAt: "desc",

        },

    });

};
export const createBook = async (

title:string,

author:string,

price:number,

description:string | undefined,

categoryId:number,

ownerId:number

)=>{

const category=

await prisma.category.findUnique({

where:{

id:categoryId

}

});

if(!category){

throw new ApiError(

404,

"Category not found"

);

}

const book=

await prisma.book.create({

data:{

title,

author,

price,

description,

ownerId,

categoryId,

},

include:{

owner:true,

category:true,

},

});

return book;

};

export const getBookById = async (

    id: number,

    role: Role,

    userId: number

) => {

    const book = await prisma.book.findUnique({

        where: {

            id,

        },

        include: {

            owner: true,

            category: true,

        },

    });

    if (!book) {

        throw new ApiError(

            404,

            "Book not found"

        );

    }

    if (role === Role.ADMIN) {

        return book;

    }

    if (book.ownerId !== userId) {

        throw new ApiError(

            403,

            "Access denied"

        );

    }

    return book;

};