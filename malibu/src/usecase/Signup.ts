import { inject } from "../infra/DI/DI";
import Account from "../domain/Account";
import { AccountRepositoryDatabase } from "../infra/repository/AccountRepository";


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