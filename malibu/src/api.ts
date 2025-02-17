import express  from "express";
import cors from "cors"
import { AccountDAODatabase } from "./AccountDAO";
import Singup from "./entity/Signup";
import GetAccount from "./entity/GetAccount";

const app = express();
app.use(express.json())
app.use(cors())

app.post("/signup", async function (req, res) {
  const input = req.body 
  try {
    const accountDAO = new AccountDAODatabase();
    const singup = new Singup(accountDAO); 
    const output = await singup.execute(input)
    res.json(output)
  } catch (e:any) {
    res.status(422).json({ message: e.message})
  }
});

app.get("/accounts/:accountId", async function (req, res) {
  try {
    const accountDAO = new AccountDAODatabase();
    const getAccount = new GetAccount(accountDAO); 
    const output = await getAccount.execute(req.params.accountId);
    res.json(output);
  } catch (e:any) {
    res.status(422).json({ message: e.message})
  }
});

app.listen(3000)