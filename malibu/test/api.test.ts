import axios from "axios"
import jwt from "jsonwebtoken";

axios.defaults.validateStatus = function () {
	return true;
}

test("Deve criar a conta", async function () {
	const input = {
		name: "John Doe",
		email: `john.doe${Math.random()}@gmail.com`,
		password: "123456",
	};	
  const responseSignup = await axios.post("http://localhost:3000/signup", input);
	const outputSignup = responseSignup.data;
	expect(outputSignup.accountId).toBeDefined();
	const responseGetAccount = await axios.get(`http://localhost:3000/accounts/${outputSignup.accountId}`);
	const outputGetAccount = responseGetAccount.data;
	expect(outputGetAccount.name).toBe(input.name);
	expect(outputGetAccount.email).toBe(input.email);
	expect(outputGetAccount.password).toBe(input.password);

});


test("Deve logar", async function () {
	const email =  `john.doe${Math.random()}@gmail.com`
	const input = {
		name: "John Doe",
		email: email,
		password: "123456",
	};	
  const responseSignup = await axios.post("http://localhost:3000/signup", input);
	const outputSignup = responseSignup.data;
	expect(outputSignup.accountId).toBeDefined();

	const login = {
		email: email,
		password: "123456",
	};	
	const responseLogin:any = await axios.post(`http://localhost:3000/login`,login );
	const decodedToken:any = jwt.decode(responseLogin.data);
	expect(decodedToken).toBeDefined();
  expect(decodedToken.user.id).toBe(outputSignup.accountId);  

});