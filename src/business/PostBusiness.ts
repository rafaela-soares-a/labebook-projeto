import { PostDataBase } from "../database/PostDatabase";
import { GetPostInput, GetPostOutput } from "../dtos/postDTO";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { Post } from "../models/Post";
import { IdGenerator } from "../services/idGenerator";
import { TokenManager } from "../services/TokenManager";

export class PostBusiness {
    constructor (
        private postDatabase: PostDataBase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager
    ){}

    public getPost = async (input: GetPostInput): Promise <GetPostOutput> => {
        const {token} = input

        if (!token) {
            throw new NotFoundError ("'Token' ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (payload === null) {
            throw new BadRequestError("'Token' inválido")
        }

        const {postDB, userDB} = await this.postDatabase.gerPostCreator()

        function creator (userId: string) {
            const user = userDB.find((userDB)=> {
                return userDB.id === userId
            })

            return {
                id: user.id,
                name: user.name
            }
        }

        const post = postDB.map((postDB)=> {
            const post = new Post (
                postDB.id,
                postDB.content,
                postDB.likes,
                postDB.dislikes,
                postDB.createAt,
                postDB.updatedAt,
                postDB.creatorId,
                postDB.creatorName
            )

            return post.toPostDBModel
        })
        const output: GetPostOutput = post 

        return output
    }
} 