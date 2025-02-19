import AccountDAO, { AccountRepositoryDatabase } from "../AccountRepository";
import { inject } from "../DI";

export default class GetAccount {

	@inject("AccountRepositoryDatabase")
	accountRepositoryDatabase?:AccountRepositoryDatabase

	async execute (accountId: string) {
    const accountData = await this.accountRepositoryDatabase?.getAccountById(accountId);    
		return accountData;
	}
}