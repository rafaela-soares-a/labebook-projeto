import { PostModel} from "../type"


export interface SignupInputDTO {
    name: unknown,
    email: unknown,
    password: unknown
}

export interface SignupOutputDTO {
    token: string
}

export interface LoginInputDTO {
    email: unknown,
    password: unknown
}

export interface LoginOutputDTO {
    token: string
}

export interface GetPostsInputDTO {
    token: string | undefined
}

export type GetPostsOutputDTO = PostModel[]

export interface CreatePostsInpputDTO {
    token: string | undefined
}

export interface EditPotsInputDTO {
    idToEdit: string,
    token: string | undefined,
    content: unknown
}

export interface DeletePotsInputDTO {
    idToDelete: string,
    token: string | undefined
}

export interface LikeOrDislikePostsInputDTO{
    idToLikeOrDislike: string,
    token: string | undefined,
    like: unknown
}