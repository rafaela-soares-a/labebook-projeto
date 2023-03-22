import { UserDatabase } from "../database/UserDatabase";
import { LoginInputDTO, LoginOutputDTO, SignupInputDTO, SignupOutputDTO } from "../dtos/userDTO";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { User } from "../models/User";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/idGenerator";
import { TokenManager } from "../services/TokenManager";
import { TokenPayload, USER_ROLES } from "../type";

export class UserBusiness {
    constructor (
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private tokenMagnager: TokenManager,
        private hashManager: HashManager
    ) {}

    public signup = async (input: SignupInputDTO): Promise<SignupOutputDTO> => {
        const {name, email, password} =  input

        if (typeof name !== "string") {
            throw new BadRequestError ("'Name' deve ser uma string")
        }

        if (typeof email !== "string") {
            throw new BadRequestError ("'email' deve ser uma string")
        }

        if (typeof password !== "string") {
            throw new BadRequestError ("'Password' deve ser uma string")
        }

        const userDB = await this.userDatabase.findEmail(email)

        if (!userDB) {
            throw new NotFoundError("Email inválido")
        }

        const id = this.idGenerator.generate()
        const role = USER_ROLES.NORMAL
        const createAt = new Date().toISOString()
        

        const newUser = new User(
            id,
            name,
            email,
            password,
            role,
            createAt
        )

        const unserDB = newUser.toDBModel()
        await this.userDatabase.insert(unserDB)

        const payload : TokenPayload = {
            id: newUser.getId(),
            name: newUser.getName(),

        }

     
        // const token = this.tokenMagnager.createToken(payload)
    
        const output: SignupOutputDTO = {

            token: this.tokenMagnager.createToken(payload)
        }
        return output

    }

    public login = async (input: LoginInputDTO): Promise <LoginOutputDTO> => {

        const {email, password} = input

        
        if (typeof email !== "string") {
            throw new BadRequestError (" O'email' deve ser uma string")
        }

        if (typeof password !== "string") {
            throw new BadRequestError (" 'Password' deve ser uma string")
        }

        const userDB = await this.userDatabase.findEmail(email)

        if (!userDB) {
            throw new NotFoundError("Email invalido")
        }

    const isPasswordCorrect = await this.hashManager.compare(password, userDB.password)

    if (!isPasswordCorrect) {
        throw new NotFoundError ("Password invalido")
    }
    
    const user = new User (
        userDB.id,
        userDB.name,
        userDB.email,
        userDB.password,
        userDB.role,
        userDB.created_at
    )

    const payload: TokenPayload = {
        id: user.getId(),
        name: user.getName()
    }

    const token = this.tokenMagnager.createToken(payload)

    const output: LoginOutputDTO = {
        token
    }

    return output

    }
}