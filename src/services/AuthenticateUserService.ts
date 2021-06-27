import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UsersRepositories"
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"


interface IAuthenticateRequest {
    email: string
    password: string
}

class AuthenticateUserService {

    async execute( {email, password}: IAuthenticateRequest ) {

        const usersRepositories = getCustomRepository(UsersRepositories)

        const user = await usersRepositories.findOne({email})

        // se usuario nao existir
        if(!user) {
            throw new Error("Email/Password Incorrect")
        }

        // compara as senhas
        const passwordMatch = await compare(password, user.password)

        if (!passwordMatch) {
            throw new Error("Email/Password Incorrect")
        }

        const token = sign({
            email: user.email
        }, "2d194c84f2ffe2d669ba79af22e48bcc", {
            subject: user.id,
            expiresIn: "1d"
        })

        return token

    }

}

export { AuthenticateUserService }