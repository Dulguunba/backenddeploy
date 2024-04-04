import express, { Request, Response } from "express";
import cors from "cors";
import { connectToDb } from "../connectToDb";
import cookieParser from "cookie-parser";
import { travelRouter } from "../routes/travelRoute";
import upload from "../mildwares/multer";
import cloudinary from "../utils/cloudinary";
import { ImageModel } from "../models/imageModel";
import touristRouter from "../routes/touristRoute";
import categoryRouter from "../routes/categoryRoute";
import destinationCategoryRouter from "../routes/destinationCategoryRoute";
import destinationRouter from "../routes/destinationRoute";
import companyRouter from "../routes/companyRoute";
import userRouter from "../routes/userRoute";
import orderRouter from "../routes/orderRoute";
import commmentRouter from "../routes/commentRoute";
import reviewRouter from "../routes/reviewRoute";
import paymentRouter from "../routes/paymentRoute";
import shoppingCartRouter from "../routes/shoppingCartRoute";

const app = express();
const port = process.env.PORT || 8080;

connectToDb();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/travel", travelRouter);
app.use("/tourist", touristRouter);
app.use("/category", categoryRouter);
app.use("/destination", destinationRouter);
app.use("/destinationcategory", destinationCategoryRouter);
app.use("/company", companyRouter);
app.use("/user", userRouter);
app.use("/order", orderRouter);

app.use("/comment", commmentRouter);
app.use("/review", reviewRouter);
app.use("/payment", paymentRouter);
app.use("/shoppingcart", shoppingCartRouter);

app.get("/", (_req: Request, res: Response) => {
  return res.send("travel web backend - DEPLOY");
});

app.get("/test", (_req: Request, res: Response) => {
  return res.send("test travel ok 🏓");
});

app.use("/upload", upload.single("image"), async (req, res) => {
  const uploadedFile = req.file;
  if (!uploadedFile) {
    return res.status(400).json({ message: "fail to upload image" });
  }

  try {
    const newImage = await cloudinary.uploader.upload(uploadedFile.path);

    const image = new ImageModel({ imageUrl: newImage.secure_url });
    await image.save();
    return res.status(200).json({ message: "successful", image: image });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "fail to upload image" });
  }
});

app.listen(port, () => {
  return console.log(`Server is listening on http://localhost:${port}`);
});
