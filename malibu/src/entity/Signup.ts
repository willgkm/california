import AccountDAO from "../AccountDAO";
import Account from "./Account";


export default class Singup { 

  constructor(readonly accountDAO:AccountDAO){ 
  }

  async execute (input: any){
    const account = Account.create(input.name, input.email, input.password)
    const accountData = await this.accountDAO.getAccountByEmail(account.getEmail());
		if (accountData) throw new Error("Duplicated account");

    await this.accountDAO.saveAccount(account)
    return { accountId: account.getAccountId()}

  }

}