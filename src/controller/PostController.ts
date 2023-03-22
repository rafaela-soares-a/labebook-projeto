import { PostBusiness } from "../business/PostBusiness";
import { CreatePostInput, GetPostInput } from "../dtos/postDTO";
import {Request, Response} from "express"
import { BaseError } from "../errors/BaseError";

export class PostController {
    constructor (
        private postBusiness: PostBusiness
    ) {}

    public getPost = (req: Request, res: Response) => {
        try {

            const input: GetPostInput = {
                token: req.headers.authorization
            }

            const output = this.postBusiness.getPost(input)
            
        } catch (error) {
            if(error instanceof BaseError){
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }            
        }
    }

    public createPost =async (req:Request, res: Response) => {
        try {

            const input: CreatePostInput = {
                token: req.body.authorization,
                content: req.body.content
            }

            await this.postBusiness.createPost(input)

            res.status(201).send("Post criado com sucesso")
            
        } catch (error) {
            if(error instanceof BaseError){
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }    
        }
    }
}