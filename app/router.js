import { ErrorMessage } from "./utils/ErrorMessage.js";
import authRouter from "./routes/Auth.js";
import userRouter from "./routes/User.js";
import postRouter from "./routes/Post.js";
import commentRouter from "./routes/Comment.js";
import tagRouter from "./routes/Tag.js";
import rankRouter from "./routes/Rank.js";

export default (app)=>{
    // routes
    app.use("/auth", authRouter);
    app.use("/user", userRouter);
    app.use("/post", postRouter);
    app.use("/comment", commentRouter);
    app.use("/tag", tagRouter);
    app.use("/rank", rankRouter);


    //! Not Found Page
    app.use((request, response, next) => {
        next(ErrorMessage(404, `Not found - ${request.originalUrl}`));
    });

    //! to catch any error
    app.use((error, request, response, next) => {
        response.status(error.status || 500).json({
            error: error.message,
            statusError: error.status,
        });
    });
}