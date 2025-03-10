import {
    Controller,
    Get,
    Post,
    Query,
    Req,
    Res,
    UseGuards
} from "@nestjs/common";
import { Request, Response } from "express";
import { UserDocument } from "src/resources/users/entities/user.entity";
import { LocalAuthGuard } from "./guards/localAuth.guard";

@Controller("auth")
export class AuthController {
  /**
   * Renders the login page.
   * @param res - Response object.
   * @returns - The login page.
   */
  @Get('login')
  loginPage(@Req() req: Request, @Query() query: any, @Res() res: Response) {
    if (req.isAuthenticated()) return res.redirect('/production');
    const { error, username } = query;
    const renderData = {
      error: error || null,
      username: username || '',
    };
    return res.render('login', renderData);
  }

  /**
   * Handles user login by validating credentials and returning tokens.
   * 
   * @param user - user document.
   * @returns - An object containing access and refresh tokens, along with user data.
   */
  @Post("login")
  @UseGuards(LocalAuthGuard)
  login(@Req() req: Request, @Res() res: Response) {
    req.login(req.user, (err) => {
      if (err) return res.redirect('/auth/login?error=خطأ في تسجيل الدخول&username='+(req.user as UserDocument).username);
      else return res.redirect('/main');
    });
  }

  /**
   * Logs the user out by clearing the session.
   * @param req - Request object.
   * @param res - Response object.
   * @returns - Redirects to the login page.
   */
  @Get("logout")
  logout(@Req() req: Request, @Res() res: Response) {
    req.logout(() => res.redirect('/auth/login'));
  }
}