
import { AccountRepositoryDatabase } from "./AccountRepository";
import Singup from "./usecase/Signup";
import GetAccount from "./usecase/GetAccount";
import { Registry } from "./DI";
import { PgPromiseAdapter } from "./DatabaseConnection";
import ExpressAdapter from './HttpServer'

const httpServer = new ExpressAdapter()
Registry.getInstance().provide("accountRepositoryDatabase", new AccountRepositoryDatabase());
Registry.getInstance().provide("databaseConnection", new PgPromiseAdapter());

//todo: create salt password and save a hash,

httpServer.register("post", "/signup", async function (params:any, body:any) {

  const input = body; 
  const singup = new Singup(); 
  const output = await singup.execute(input)
  return output

})
//todo: create a login

//todo: create a logout

httpServer.register("get", "/accounts/:accountId", async function (params:any, body:any) {
  const getAccount = new GetAccount(); 
  const output = await getAccount.execute(params.accountId);
  return output
})

httpServer.listen(3000);
