import { inject } from "../DI/DI";
import HttpServer from "../http/HttpServer";
import GetAccount from "../../usecase/GetAccount";
import Singup from "../../usecase/Signup";
import Login from "../../usecase/Login";

export default class AccountController { 
  @inject("httpServer")
  httpServer?:HttpServer

  @inject("signup")
  signup?:Singup

  @inject("getAccount")
  getAccount?:GetAccount

  @inject("login")
  login?:Login

  constructor() { 
    this.httpServer?.register("post", "/signup", async (params:any, body:any) => {
      const input = body; 
      const output = await this.signup?.execute(input)
      return output
    })

    this.httpServer?.register("get", "/accounts/:accountId", async (params:any, body:any) => {
      const output = await this.getAccount?.execute(params.accountId);
      return output
    })

    this.httpServer?.register("post", "/login", async (params:any, body:any) => {
      const input = body; 
      const output = await this.login?.execute(input);
      return output
    })

  }
}