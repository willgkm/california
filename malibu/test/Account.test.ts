import Account from "../src/entity/Account";

test("Deve criar uma conta", function () {
	const account = Account.create("John Doe", "john.doe@gmail.com", "123456");
	expect(account).toBeDefined();
});

test("Não deve criar uma conta com nome inválido", function () {
	expect(() => Account.create("John", "john.doe@gmail.com", "123456")).toThrow(new Error("Invalid name"));
});

test("Não deve criar uma conta com email inválido", function () {
	expect(() => Account.create("John Doe", "john.doe", "123456")).toThrow(new Error("Invalid email"));
});

test("Não deve criar uma conta com senha inválido (Minimo 3 caracteres)", function () {
	expect(() => Account.create("John Doe", "john.doe@gmail.com", "12" )).toThrow(new Error("Invalid password"))
});
