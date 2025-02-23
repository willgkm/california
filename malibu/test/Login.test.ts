import GetAccount from "../src/usecase/GetAccount";
import {Registry} from "../src/infra/DI/DI";
import { PgPromiseAdapter } from "../src/infra/database/DatabaseConnection";
import { AccountRepositoryDatabase } from "../src/infra/repository/AccountRepository";
import Singup from "../src/usecase/Signup";
import Login from "../src/usecase/Login";
import jwt from "jsonwebtoken";

let signup: Singup;
let login: Login;

beforeEach(() => {
	Registry.getInstance().provide("accountRepositoryDatabase", new AccountRepositoryDatabase());
	Registry.getInstance().provide("databaseConnection", new PgPromiseAdapter());
	signup = new Singup();
	login = new Login(); 
});

test("Deve logar", async function () {
	const input = {
		name: "John Doe",
		email: `john.doe${Math.random()}@gmail.com`,
		cpf: "97456321558",
		password: "123456",
	};
	const outputSignup = await signup.execute(input);
	expect(outputSignup.accountId).toBeDefined();

	const outputLogin = await login.execute({email: input.email, password: input.password})
  expect(outputLogin).not.toBeNull();
	
	const decodedToken:any = jwt.decode(outputLogin);
	expect(decodedToken).toBeDefined();
	expect(decodedToken.user.id).toBe(outputSignup.accountId);   

});

test("Não deve logar com email nao cadastrado", async function () {
	const input = {
		name: "John Doe",
		email: `john.doe${Math.random()}@gmail.com`,
		cpf: "97456321558",
		password: "123456",
	};
	const outputSignup = await signup.execute(input);
	expect(outputSignup.accountId).toBeDefined();

	await expect(() => login.execute({email: "john.doe@gmail.com", password: input.password}))
																	.rejects.toThrow(new Error("Email or password incorret!"));

});

test("Não deve logar com senha errada!", async function () {
	const input = {
		name: "John Doe",
		email: `john.doe${Math.random()}@gmail.com`,
		cpf: "97456321558",
		password: "123456",
	};
	const outputSignup = await signup.execute(input);
	expect(outputSignup.accountId).toBeDefined();

	await expect(() => login.execute({email: input.email, password: "12345"}))
																	.rejects.toThrow(new Error("Email or password incorret!"));

});


afterEach(async () => {
	const connection = Registry.getInstance().inject("databaseConnection");
	await connection.close();
});