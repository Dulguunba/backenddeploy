import express from "express";
import cors from "cors";
import { connectToDb } from "./connectToDb";
import cookieParser from "cookie-parser";
import { travelRouter } from "./routes/travelRoute";
import upload from "./mildwares/multer";
import cloudinary from "./utils/cloudinary";
import { ImageModel } from "./models/imageModel";
import touristRouter from "./routes/touristRoute";
import categoryRouter from "./routes/categoryRoute";
import destinationCategoryRouter from "./routes/destinationCategoryRoute";
import destinationRouter from "./routes/destinationRoute";
import companyRouter from "./routes/companyRoute";
import userRouter from "./routes/userRoute";
import orderRouter from "./routes/orderRoute";
import commmentRouter from "./routes/commentRoute";
import reviewRouter from "./routes/reviewRoute";
import paymentRouter from "./routes/paymentRoute";
import shoppingCartRouter from "./routes/shoppingCartRoute";
import axios from "axios";
import { OrderModel } from "./models/orderModel";

const app = express();
const PORT = 8800;
connectToDb();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
//test pls
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
// app.use("/travelcalendar", );
// app.use("/travelroute", );

app.get("", (req, res) => {
  res.send("Hello world");
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

app.post("/createinvoice", async (req, res) => {
  const { token } = req.body
  console.log('token', token);


  const createQr = await axios.post("https://merchant.qpay.mn/v2/invoice", {
    "invoice_code": "POWER_EXPO_INVOICE",
    "sender_invoice_no": "1234567",
    "invoice_receiver_code": "terminal",
    "invoice_description": "test",
    "amount": 10,
    "callback_url": "http://localhost:3000"
  }, { headers: { Authorization: `Bearer ${token}` } });

  console.log('invoice', createQr);

  return res.status(201).json({ invoiceId: createQr.data })
})

app.post("/check", async (req, res) => {
  const { orderId } = req.body;
  const checkRes = await axios.post(
    "https://merchant.qpay.mn/v2/payment/check",
    {
      object_type: "INVOICE",
      object_id: req.body.invoiceId,
      offset: {
        page_number: 1,
        page_limit: 100,
      },
    },

    { headers: { Authorization: `Bearer ${req.body.token}` } }
  );
  console.log(checkRes.data.rows.length);

  if (checkRes.data.rows.length > 0) {
    await OrderModel.findByIdAndUpdate(orderId, { IsPaidStatus: true });

  }
  return res.status(200).json({ check: checkRes.data });
});


app.listen(PORT, () => {
  console.log("running at http://localhost:" + PORT);
});
