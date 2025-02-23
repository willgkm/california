
import { AccountRepositoryDatabase } from "./AccountRepository";
import Singup from "./usecase/Signup";
import GetAccount from "./usecase/GetAccount";
import { Registry } from "./DI";
import { PgPromiseAdapter } from "./DatabaseConnection";
import ExpressAdapter from './HttpServer'
import AccountController from "./AccountControler";

const httpServer = new ExpressAdapter()
Registry.getInstance().provide("httpServer", httpServer);
Registry.getInstance().provide("databaseConnection", new PgPromiseAdapter());
Registry.getInstance().provide("accountRepositoryDatabase", new AccountRepositoryDatabase());
Registry.getInstance().provide("signup", new Singup());
Registry.getInstance().provide("getAccount", new GetAccount());
Registry.getInstance().provide("accountController", new AccountController());

httpServer.listen(3000);
