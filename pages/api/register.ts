import { createJwt, hashPassword } from "@/lib/auth";
import { NextApiResponse, NextApiRequest } from "next";
import { db } from "@/lib/db";
import { serialize } from "cookie";

export default async function register(req: NextApiRequest, res: NextApiResponse) {
    if( req.method === 'POST'){
        const user = await db.user.create({
            data: {
                email: req.body.email,
                password: await hashPassword(req.body.password),
                firstName: req.body.firstName,
                lastName: req.body.lastName,

            }
        })

        const jwt = await createJwt(user)

        res.setHeader(
            "Set-Cookie",
            serialize(process.env.COOKIE_NAME, jwt, {
                httpOnly: true,
                path: "/",
                maxAge: 60 * 60 * 24 *7,
            })
        );


    }

    res.status(201);
    res.end();
}