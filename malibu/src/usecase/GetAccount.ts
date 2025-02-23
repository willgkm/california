import Account from "../domain/Account"
import { inject } from "../infra/DI/DI";
import { AccountRepositoryDatabase } from "../infra/repository/AccountRepository";

export default class GetAccount {

	@inject("accountRepositoryDatabase")
	accountRepositoryDatabase?:AccountRepositoryDatabase

	async execute (accountId: string) {
		const account = await this.accountRepositoryDatabase?.getAccountById(accountId);
		if (!account) throw new Error("Account not found");
		return {
			accountId: account.getAccountId(),
			name: account.getName(),
			email: account.getEmail(),
			password: account.getPassword()
		}
	}
}