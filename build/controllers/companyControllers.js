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
exports.deleteCompany = exports.getCompany = exports.createCompany = void 0;
const companyModel_1 = require("../models/companyModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const nodemailer_1 = __importDefault(require("nodemailer"));
dotenv_1.default.config();
function generateRandomString() {
    return Math.random().toString(36).substring(2, 8);
}
const createCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, english, info, email, phoneNumber } = req.body;
    console.log(name, english, info, phoneNumber, email);
    try {
        const generatedPassword = generateRandomString();
        const hashPassword = yield bcrypt_1.default.hash(generatedPassword, 10);
        const newCategory = yield companyModel_1.CompanyModel.create({
            name,
            english,
            info,
            email,
            phoneNumber,
            password: hashPassword,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        const transporter = nodemailer_1.default.createTransport({
            service: "Gmail",
            auth: {
                user: "dulguunbatbaa@gmail.com",
                pass: "dfvb bzgl ignx jcmd",
            },
        });
        const mailOptions = {
            from: '"Travel to mongolia" <travel_to_mongolia@no_reply_email>',
            to: `${email}`,
            subject: "Successfully created new admin account in 'Travel to Mongolia' website",
            text: "'Travel to Mongolia' new account informtion",
            html: `<b>Dear ${name},</b>
                  <p> Username or Email: ${email} </p>
                  <p> Password: ${generatedPassword} </p>`,
        };
        const sendEmail = yield transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending email: ", error);
                res.status(400).json({ message: "fail to create admin account" });
            }
            else {
                console.log("Email sent: ", info.response);
                res
                    .status(200)
                    .json({ message: "successfully created new admin account" });
            }
        });
    }
    catch (error) {
        res.status(400).json({ message: "fail to create admin account" });
    }
});
exports.createCompany = createCompany;
const getCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const companyQuery = companyModel_1.CompanyModel.find({});
        companyQuery.sort("-createdAt");
        companyQuery.select("_id name english info email phoneNumber role");
        const companyData = yield companyQuery.exec();
        res.status(200).json({ result: companyData });
    }
    catch (error) {
        res.status(400).json({ message: "fail to get company data", error: error });
    }
});
exports.getCompany = getCompany;
const deleteCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, phoneNumber } = req.body;
        if (!name || !email || !phoneNumber) {
            return res.status(400).json({ message: "undifined name or email" });
        }
        const deleteCompany = yield companyModel_1.CompanyModel.deleteMany({ name, email, phoneNumber });
        res.status(200).json({ message: "successfull delete company" });
    }
    catch (error) {
        res.status(400).json({ message: "faild delete company" });
    }
});
exports.deleteCompany = deleteCompany;
