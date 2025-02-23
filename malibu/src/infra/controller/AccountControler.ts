import { inject } from "../DI/DI";
import HttpServer from "../http/HttpServer";
import GetAccount from "../../usecase/GetAccount";
import Singup from "../../usecase/Signup";

export default class AccountController { 
  @inject("httpServer")
  httpServer?:HttpServer

  @inject("signup")
  signup?:Singup

  @inject("getAccount")
  getAccount?:GetAccount

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

  }
}