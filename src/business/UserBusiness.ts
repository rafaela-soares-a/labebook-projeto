import { UserDatabase } from "../database/UserDatabase";
import { SignupInputDTO, SignupOutputDTO } from "../dtos/userDTO";
import { BadRequestError } from "../errors/BadRequestError";
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
            role: newUser.getRole()
        }

     
        // const token = this.tokenMagnager.createToken(payload)
    
        const output: SignupOutputDTO = {

            token: this.tokenMagnager.createToken(payload)
        }
        return output

    }
}