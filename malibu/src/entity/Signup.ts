import { AccountRepositoryDatabase } from "../AccountRepository";
import { inject } from "../DI";
import Account from "./Account";


export default class Singup { 

  @inject('AccountRepositoryDatabase')
  AccountDAODatabase?: AccountRepositoryDatabase

  async execute (input: any){
    const account = Account.create(input.name, input.email, input.password)
    const accountData = await this.AccountDAODatabase?.getAccountByEmail(account.getEmail());
		if (accountData) throw new Error("Duplicated account");

    await this.AccountDAODatabase?.saveAccount(account)
    return { accountId: account.getAccountId()}

  }

}