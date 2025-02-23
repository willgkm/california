
import Singup from "./usecase/Signup";
import GetAccount from "./usecase/GetAccount";
import { Registry } from "./infra/DI/DI";
import { PgPromiseAdapter } from "./infra/database/DatabaseConnection";
import ExpressAdapter from './infra/http/HttpServer'
import AccountController from "./infra/controller/AccountControler";
import { AccountRepositoryDatabase } from "./infra/repository/AccountRepository";

const httpServer = new ExpressAdapter()
Registry.getInstance().provide("httpServer", httpServer);
Registry.getInstance().provide("databaseConnection", new PgPromiseAdapter());
Registry.getInstance().provide("accountRepositoryDatabase", new AccountRepositoryDatabase());
Registry.getInstance().provide("signup", new Singup());
Registry.getInstance().provide("getAccount", new GetAccount());
Registry.getInstance().provide("accountController", new AccountController());

httpServer.listen(3000);
