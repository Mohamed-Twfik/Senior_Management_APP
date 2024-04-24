import { catchError } from "../../utils/catchAsyncError.js";
import { ErrorMessage } from "../../utils/ErrorMessage.js";

export const checkAdmin = catchError(async (req, res, next)=>{
    const user = req.user
    if(!user.isSuperuser) return next(ErrorMessage(401, "Access Denied"));
    next()
})