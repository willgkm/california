import pgp from "pg-promise"
import Account from "./entity/Account";

// Port
export default interface AccountDAO {
	getAccountByEmail (email: string): Promise<any>;
	getAccountById (accountId: string): Promise<any>;
	saveAccount (account: any): Promise<any>;
}

// Adapter
export class AccountRepositoryDatabase implements AccountDAO {

	async getAccountByEmail (email: string) {
		try {
			const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
			const [accountData] = await connection.query("select * from ccca.account where email = $1", [email]);
			await connection.$pool.end();
			return accountData;
		} catch (error) {
			console.error(error)
		}
	}
	
	async saveAccount (account: any) {
		try {
			const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
			await connection.query("insert into ccca.account (account_id, name, email, password) values ($1, $2, $3, $4)", [account.accountId.getValue(), account.getName(), account.getEmail(), account.getPassword()]);
			await connection.$pool.end();
		} catch (error) {
			console.error(error)
		}
	}
	
	async getAccountById (accountId: string){
		const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
		const [accountData] = await connection.query("select * from ccca.account where account_id = $1", [accountId]);
		if(!accountData) return;
		await connection.$pool.end();
		return new Account(accountData.account_id, accountData.name, accountData.email, accountData.password);
	}
}

// Adapter -- exemple
export class AccountDAOMemory implements AccountDAO {
	accounts: any[];

	constructor () {
		this.accounts = [];
	}

	async getAccountByEmail(email: string): Promise<any> {
		return this.accounts.find((account: any) => account.email === email);
	}

	async getAccountById(accountId: string): Promise<any> {
		return this.accounts.find((account: any) => account.accountId === accountId);
	}

	async saveAccount(account: any): Promise<any> {
		return this.accounts.push(account);
	}

}