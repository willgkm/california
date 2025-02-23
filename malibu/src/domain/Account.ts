import UUID from "./UUID";
import Name from "./Name";
import Email from "./Email";
import Password from "./Password";


export default class Account {

  private accountId: UUID;
	private name: Name;
	private email: Email;
	private password: Password;

	constructor (accountId: string, name: string, email: string, password: string) {
		this.accountId = new UUID(accountId);
		this.name = new Name(name);
		this.email = new Email(email),
		this.password = new Password(password);
	}

	static create(name: string, email: string, password: string){
		const accountId = UUID.create();
		return new Account(accountId.getValue() ,name,email, password)
	}

  getAccountId () {
		return this.accountId.getValue();
	}

	getName () {
		return this.name.getValue();
	}

	getEmail () {
		return this.email.getValue();
	}
	
	getPassword() { 
		return this.password.getValue();
	}
}