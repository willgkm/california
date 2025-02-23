import GetAccount from "../src/usecase/GetAccount";
import {Registry} from "../src/infra/DI/DI";
import { PgPromiseAdapter } from "../src/infra/database/DatabaseConnection";
import { AccountRepositoryDatabase } from "../src/infra/repository/AccountRepository";
import Singup from "../src/usecase/Signup";

let signup: Singup;
let getAccount: GetAccount;

beforeEach(() => {
	Registry.getInstance().provide("accountRepositoryDatabase", new AccountRepositoryDatabase());
	Registry.getInstance().provide("databaseConnection", new PgPromiseAdapter());
	signup = new Singup();
	getAccount = new GetAccount();
});

test("Deve criar a conta", async function () {
	const input = {
		name: "John Doe",
		email: `john.doe${Math.random()}@gmail.com`,
		cpf: "97456321558",
		password: "123456",
	};
	const outputSignup = await signup.execute(input);
	expect(outputSignup.accountId).toBeDefined();
	const outputGetAccount = await getAccount.execute(outputSignup.accountId);
	expect(outputGetAccount.name).toBe(input.name);
	expect(outputGetAccount.email).toBe(input.email);
	expect(outputGetAccount.password).toBe(input.password);
});


test("Não deve criar a conta duplicado", async function () {
	const input = {
		name: "John Doe",
		email: `john.doe${Math.random()}@gmail.com`,
		cpf: "97456321558",
		password: "123456",
	};
	await signup.execute(input);
	await expect(() => signup.execute(input)).rejects.toThrow(new Error("Duplicated account"));
});


afterEach(async () => {
	const connection = Registry.getInstance().inject("databaseConnection");
	await connection.close();
});