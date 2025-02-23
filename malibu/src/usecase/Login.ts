import { inject } from "../infra/DI/DI";
import jsonwebtoken from "jsonwebtoken"
import { AccountRepositoryDatabase } from "../infra/repository/AccountRepository";
import Account from "../domain/Account";

export default class Login { 

  @inject('accountRepositoryDatabase')
  accountRepositoryDatabase?: AccountRepositoryDatabase

  async execute (input: any){
    const accountData = await this.accountRepositoryDatabase?.getAccountByEmail(input.email);
    if (!accountData) throw new Error("Email or password incorret!");
    const account:Account = new Account(accountData.account_id, accountData.name, accountData.email, accountData.password)

    if(accountData && accountData.password === input.password) {
      const payload = { 
        user:{ 
          id: account.getAccountId(), 
          email: account.getEmail()
        }
      }
      const token = jsonwebtoken.sign(
        payload,
        "F0F0F0",
        { expiresIn:"10m"}
      )
      return token;
    } else { 
      throw new Error("Email or password incorret!")
    }
  }

}