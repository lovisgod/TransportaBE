import { UserInterface } from "../domain/User";
import { User } from "../../data/models/user.model";

export class UserDataSource extends User {
    
    static listUsers(){
        return this.findAll<User> ({
            attributes: {
                exclude: ['password'],
              },
              order: [
                ['createdAt', 'DESC'],
              ],
        })
    }
    
    static createUser(user: UserInterface) {
        return this.create<User>(user)
    }

    static getAUserbyEmail(email: string, password?:string, authCheck?: boolean) {

        if (password) {
            return this.findOne<User> ({
                where : {
                    email,
                    password
                },
            })
        } else if (authCheck) {
            return this.findOne<User> ({
                where : {
                    email
                },
                attributes : {
                    exclude: ["password"]
                }
            })
        } else {
            return this.findOne<User> ({
                where : {
                    email
                },
            })
        }
       
    }
}