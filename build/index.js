"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const connectToDb_1 = require("./connectToDb");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const travelRoute_1 = require("./routes/travelRoute");
const multer_1 = __importDefault(require("./mildwares/multer"));
const cloudinary_1 = __importDefault(require("./utils/cloudinary"));
const imageModel_1 = require("./models/imageModel");
const touristRoute_1 = __importDefault(require("./routes/touristRoute"));
const categoryRoute_1 = __importDefault(require("./routes/categoryRoute"));
const destinationCategoryRoute_1 = __importDefault(require("./routes/destinationCategoryRoute"));
const destinationRoute_1 = __importDefault(require("./routes/destinationRoute"));
const companyRoute_1 = __importDefault(require("./routes/companyRoute"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const orderRoute_1 = __importDefault(require("./routes/orderRoute"));
const commentRoute_1 = __importDefault(require("./routes/commentRoute"));
const reviewRoute_1 = __importDefault(require("./routes/reviewRoute"));
const paymentRoute_1 = __importDefault(require("./routes/paymentRoute"));
const shoppingCartRoute_1 = __importDefault(require("./routes/shoppingCartRoute"));
const axios_1 = __importDefault(require("axios"));
const orderModel_1 = require("./models/orderModel");
const app = (0, express_1.default)();
const PORT = 8800;
(0, connectToDb_1.connectToDb)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
//test pls
app.use("/travel", travelRoute_1.travelRouter);
app.use("/tourist", touristRoute_1.default);
app.use("/category", categoryRoute_1.default);
app.use("/destination", destinationRoute_1.default);
app.use("/destinationcategory", destinationCategoryRoute_1.default);
app.use("/company", companyRoute_1.default);
app.use("/user", userRoute_1.default);
app.use("/order", orderRoute_1.default);
app.use("/comment", commentRoute_1.default);
app.use("/review", reviewRoute_1.default);
app.use("/payment", paymentRoute_1.default);
app.use("/shoppingcart", shoppingCartRoute_1.default);
// app.use("/travelcalendar", );
// app.use("/travelroute", );
app.get("", (req, res) => {
    res.send("Hello world");
});
app.use("/upload", multer_1.default.single("image"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uploadedFile = req.file;
    if (!uploadedFile) {
        return res.status(400).json({ message: "fail to upload image" });
    }
    try {
        const newImage = yield cloudinary_1.default.uploader.upload(uploadedFile.path);
        const image = new imageModel_1.ImageModel({ imageUrl: newImage.secure_url });
        yield image.save();
        return res.status(200).json({ message: "successful", image: image });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: "fail to upload image" });
    }
}));
app.post("/createinvoice", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.body;
    console.log('token', token);
    const createQr = yield axios_1.default.post("https://merchant.qpay.mn/v2/invoice", {
        "invoice_code": "POWER_EXPO_INVOICE",
        "sender_invoice_no": "1234567",
        "invoice_receiver_code": "terminal",
        "invoice_description": "test",
        "amount": 10,
        "callback_url": "http://localhost:3000"
    }, { headers: { Authorization: `Bearer ${token}` } });
    console.log('invoice', createQr);
    return res.status(201).json({ invoiceId: createQr.data });
}));
app.post("/check", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId } = req.body;
    const checkRes = yield axios_1.default.post("https://merchant.qpay.mn/v2/payment/check", {
        object_type: "INVOICE",
        object_id: req.body.invoiceId,
        offset: {
            page_number: 1,
            page_limit: 100,
        },
    }, { headers: { Authorization: `Bearer ${req.body.token}` } });
    console.log(checkRes.data.rows.length);
    if (checkRes.data.rows.length > 0) {
        yield orderModel_1.OrderModel.findByIdAndUpdate(orderId, { IsPaidStatus: true });
    }
    return res.status(200).json({ check: checkRes.data });
}));
app.listen(PORT, () => {
    console.log("running at http://localhost:" + PORT);
});
