import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken"

interface IPayload {
    sub: string
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {

    const authToken = request.headers.authorization

    if (!authToken) {
        return response.status(401).json({ message: "Invalid token"})
    }

    const [, token] = authToken.split(" ")

    try {
        // forçando verify a usar a interface Ipayload pois o sub estava vindo como function
        const { sub } = verify(token, "2d194c84f2ffe2d669ba79af22e48bcc") as IPayload
        
        request.user_id = sub

        return next()

    } catch (err) {
        return response.status(401).json({ message: "Invalid token"})
    }


}