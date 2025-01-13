import { Controller, Get, Redirect, Req, Res } from "@nestjs/common";
import { Request } from "express";

@Controller()
export class FallBackController {
  @Get('*')
  fallBack(
    @Req() req: Request,
    @Res() res: any
  ) {
    if (req.isAuthenticated()) res.redirect('/production');
    else res.redirect('/auth/login');
  }
}