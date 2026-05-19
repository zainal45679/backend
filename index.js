import express from 'express'
import env from './env.js';
import cors from "cors";
import mongoSanitize from "express-mongo-sanitize";
import helmet from 'helmet';
import { statusCode } from './src/utils/statusCode.js';
import ConnectDB from './config/db.js';
import { dashboardMainRoutes } from './src/routes/dashboard/main-routes.js';
import { createAdmin } from './src/utils/create-admin.js';
import { cwd } from 'process';


const app = express();

app.use(express.json());
app.use(cors());
app.use(
    helmet({
        crossOriginEmbedderPolicy : false,
        crossOriginResourcePolicy : { policy : "cross-origin" },
        contentSecurityPolicy: {
            directives:{
                defaultSrc: ["'self'"],
                imgSrc: ["'self'", 'data:',],
                connectSrc: ["'self",]
            }
        }
    })
)

// app.use(mongoSanitize())

const port = env.PORT;

app.use((err, req, res, next) => {
  if (err.status === statusCode.notFound) {
    const errorMessage = err.message || "Page Not found";
    res.status(statusCode.notFound).json({
      success: false,
      message: errorMessage,
    });
  } else {
    const errorStatus = err.status || statusCode.serverError;
    const errorMessage = err.message || "Something went wrong.";
    res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
    });
  }
  next();
});

app.listen(port, async ()=>{
    console.log(`server listening to port ${port}`);
})

ConnectDB();
createAdmin();

app.get("/test/api", async (req, res) => {
    console.log("Hello Get");
});

app.use("/api/dashboard", dashboardMainRoutes)
app.use("/uploads", express.static(cwd()+ '/uploads', {maxAge : 732793242}))

app.post("/test/api", async (req, res) => {
    console.log("Hello post");
    console.log(req.body);
    return res.status(statusCode.success).json({
            success : true,
            message : "success"
        }
    )
});

