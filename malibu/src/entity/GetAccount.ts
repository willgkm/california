import AccountDAO from "../AccountDAO";

export default class GetAccount {

	constructor (readonly accountDAO: AccountDAO) {
	}

	async execute (accountId: string) {
    const accountData = await this.accountDAO.getAccountById(accountId);    
		return accountData;
	}
}