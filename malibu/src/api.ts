import express from "express";
import cors from "cors";
import { AccountRepositoryDatabase } from "./AccountRepository";
import Singup from "./usecase/Signup";
import GetAccount from "./usecase/GetAccount";
import { Registry } from "./DI";
import { PgPromiseAdapter } from "./DatabaseConnection";

const app = express();
app.use(express.json())
app.use(cors())

Registry.getInstance().provide("accountRepositoryDatabase", new AccountRepositoryDatabase());
Registry.getInstance().provide("databaseConnection", new PgPromiseAdapter());

//todo: create salt password and save a hash,
app.post("/signup", async function (req, res) {
  const input = req.body 
  try {
    const singup = new Singup(); 
    const output = await singup.execute(input)
    res.json(output)
  } catch (e:any) {
    res.status(422).json({ message: e.message})
  }
});

//todo: create a login

//todo: create a logout

app.get("/accounts/:accountId", async function (req, res) {
  try {
    const getAccount = new GetAccount(); 
    const output = await getAccount.execute(req.params.accountId);
    res.json(output);
  } catch (e:any) {
    res.status(422).json({ message: e.message})
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
