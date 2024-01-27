import conf from '../conf/conf';
import{Client, Account, ID} from 'appwrite'


export class AuthService{
    client = new Client(); //by this client is made
    account;

    constructor(){  //when the object is made the constructor will be called
       this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
            this.account = new Account(this.client)
    }

    async createAccount({email,password,name}){
        try {
            const userAccount = await this.account.create(ID.unique(),email,password,name)
            if(userAccount){
                //call another method
                return this.logIn({email,password})
            }else{
                 return userAccount;
            }
        } catch (error) {
            console.log('error',error);
        }


    }

    async logIn({email,password}){
        try {
            await this.account.createEmailSession(email,password)
        } catch (error) {
            console.log('error',error);
        }

    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log('error',error);
        }
        return null;
    }

    async logOut(){
        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.log('error',error);
        }
    }
}

const authService = new AuthService()
export default authService

