import { Router, type IRouter } from "express";
import healthRouter from "./health";
import ordersRouter from "./orders";
import contactRouter from "./contact";
import videosRouter from "./videos";
import adminRouter from "./admin";
import chatRouter from "./chat";

const router: IRouter = Router();

router.use(healthRouter);
router.use(ordersRouter);
router.use(contactRouter);
router.use(videosRouter);
router.use(adminRouter);
router.use(chatRouter);

export default router;
