import { AccountRepositoryDatabase } from "../AccountRepository";
import { inject } from "../DI";
import Account from "../entity/Account";


export default class Singup { 

  @inject('accountRepositoryDatabase')
  accountRepositoryDatabase?: AccountRepositoryDatabase

  async execute (input: any){
    const account = Account.create(input.name, input.email, input.password)
    const accountData = await this.accountRepositoryDatabase?.getAccountByEmail(account.getEmail());
		if (accountData) throw new Error("Duplicated account");

    await this.accountRepositoryDatabase?.saveAccount(account)
    return { accountId: account.getAccountId()}

  }

}