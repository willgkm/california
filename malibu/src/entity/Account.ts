import UUID from "./UUID";


export default class Account {

  private accountId: UUID;
	private name: string;
	private email: string;
	private password: string;

	constructor (accountId: string, name: string, email: string, password: string) {
		this.accountId = new UUID(accountId);
    this.name = name,
    this.email = email,
		this.password = password;
	}

  static create(name: string, email: string, password: string){
    const accountId = UUID.create(); 
    return new Account(accountId.getValue() ,name,email, password)
  }

  getAccountId () {
		return this.accountId.getValue();
	}

	getName () {
		return this.name;
	}

	getEmail () {
		return this.email;
	}
	
	getPassword() { 
		return this.password;
	}
}