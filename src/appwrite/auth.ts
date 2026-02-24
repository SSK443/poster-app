import config from "../config/config";
import { Client, Account, ID, type Models } from "appwrite";

interface CreateAccountData {
  name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

export class AuthService {
  client: Client;
  account: Account;

  constructor() {
    this.client = new Client();
    this.client
      .setEndpoint(config.vite_appwrite_url)
      .setProject(config.vite_appwrite_project_id);

    this.account = new Account(this.client);
  }

  // create user + auto login
async createAccount(
  { email, password, name }: CreateAccountData
): Promise<Models.User<Models.Preferences>> {
  try {
    const userAccount = await this.account.create(
      ID.unique(),
      email,
      password,
      name
    );

    await this.userLogin({ email, password }); // 
    return userAccount; 
  } catch (error) {
    console.error("Appwrite createAccount failed:", error);
    throw error;
  }
}


  // login
  async userLogin({ email, password }: LoginData): Promise<Models.Session> {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.error("appwrite Login failed:", error);
      throw error;
    }
  }

  // get current user
  async currentUser(): Promise<Models.User<Models.Preferences> | null> {
    try {
      return await this.account.get();
    } catch (error) {
      console.error("Get current user failed:", error);
      return null;
    }
  
  }

  // logout
  async userLogout():Promise<null> {
    try {
      await this.account.deleteSessions();
 
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
    return null
  }
  //password recovery
  async sendPasswordRecovery(email:string):Promise<void>{
    try {
      await this.account.createRecovery(
        email,
        `${window.location.origin}/reset-password`
      );
      
    } catch (error) {
      console.error("password recovery failed:" ,error)
      throw error
      
    }
  
}
}

const authService = new AuthService();

export default authService;
