import { UserDB } from "../type"
import { BaseDatabase } from "./database"

export class UserDatabase extends BaseDatabase {
    public static TABLE_USERS = "users"

    public insert = async (userDB: UserDB) => {
        await BaseDatabase
        .connection(UserDatabase.TABLE_USERS)
        .insert(userDB)
    }
}