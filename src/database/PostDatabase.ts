
import { PostDB, PostLikesDislikesDB } from "../type";
import { BaseDatabase } from "./database";
import { UserDatabase } from "./UserDatabase";

export class PostDataBase extends BaseDatabase {
    public static TABLE_USERS = "users"
    public static TABLE_POSTS = "posts"
    public static TABLE_LIKEDISLIKES = "likes_dislikes"

    public getAllPosts = async () => {
        const result = await BaseDatabase
        .connection(PostDataBase.TABLE_POSTS)
        .select()

        return result 
    }

    public gerPostCreator = async () => {
        const postDB = await this.getAllPosts()
        const userDB = await BaseDatabase
        .connection(UserDatabase.TABLE_USERS)
        .select() 

        return {
            postDB,
            userDB
        }
    }

    public insertPost = async (postDB: PostDB): Promise <void> => {
        await BaseDatabase
        .connection(PostDataBase.TABLE_POSTS)
        .insert(postDB)
    }

    public getPostById = async (id:string): Promise <PostDB | undefined> => {
        const [result]: PostDB[] | undefined = await BaseDatabase
        .connection(PostDataBase.TABLE_POSTS)
        .select()
        .where({id:id})

        return result
    }

    public likeDislikes = async (likeDislikesPost: PostLikesDislikesDB) => {
        await BaseDatabase
        .connection(PostDataBase.TABLE_LIKEDISLIKES)
        .insert(likeDislikesPost)
    }
}
