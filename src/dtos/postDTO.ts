import { PostModel } from "../type"

export interface GetPostInput {
    token: string | undefined
}

export type GetPostOutput = PostModel[]

export interface CreatePostInput{
    token: string | undefined,
    content: string
}

export interface EditPosInput {
    idToEdit: string,
    token: string | undefined,
    content: unknown
}

export interface DeletePostInput {
    idToDelete: string,
    token: string | undefined
}

export interface LikeOrDislikePostInput {
    idToLikeOrDislike: string,
    token: string | undefined,
    like: unknown
}