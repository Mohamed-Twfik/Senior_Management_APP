import { catchError } from "../../utils/catchAsyncError.js";
import { ErrorMessage } from "../../utils/ErrorMessage.js";

export const validPageNumber = catchError(async (req, res, next)=>{
    const page = req.params.page || 1;
    if(isNaN(page)){
        return next(ErrorMessage(403, "Invalid page number"));
    }
    next();
})