import Singup from "../src/usecase/Signup";
import GetAccount from "../src/usecase/GetAccount";
import {Registry} from "../src/DI";
import {AccountRepositoryDatabase} from "../src/AccountRepository";

let signup: Singup;
let getAccount: GetAccount;

beforeEach(() => {
	Registry.getInstance().provide("AccountRepositoryDatabase", new AccountRepositoryDatabase());
	signup = new Singup();
	getAccount = new GetAccount();
});


test("Deve criar a conta de um passageiro", async function () {
	const input = {
		name: "John Doe",
		email: `john.doe${Math.random()}@gmail.com`,
		cpf: "97456321558",
		password: "123456",
		isPassenger: true
	};
	const outputSignup = await signup.execute(input);
	expect(outputSignup.accountId).toBeDefined();
	const outputGetAccount = await getAccount.execute(outputSignup.accountId);
	expect(outputGetAccount.name).toBe(input.name);
	expect(outputGetAccount.email).toBe(input.email);
	expect(outputGetAccount.password).toBe(input.password);
});

