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
exports.deleteUser = exports.getUser = exports.createUser = void 0;
const userModel_1 = require("../models/userModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, email, phoneNumber, password } = req.body;
    console.log(userName, email, phoneNumber, password);
    try {
        const hashPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = yield userModel_1.UserModel.create({
            userName,
            email,
            phoneNumber,
            password: hashPassword,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        res
            .status(200)
            .json({ message: "successfully created user account", result: newUser });
    }
    catch (error) {
        res.status(400).json({ message: "fail to create user account" });
    }
});
exports.createUser = createUser;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userQuery = userModel_1.UserModel.find({});
        userQuery.sort("-createdAt");
        userQuery.select("_id userName email phoneNumber");
        const userData = yield userQuery.exec();
        res.status(200).json({ result: userData });
    }
    catch (error) {
        res.status(400).json({ message: "fail to get user data", error: error });
    }
});
exports.getUser = getUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, userName, } = req.body;
        if (!email || !userName) {
            return res.status(400).json({ message: "undifined email pass" });
        }
        const deleteUser = yield userModel_1.UserModel.deleteMany({ email, userName });
        res.status(201).json({ message: "successfully delete" });
    }
    catch (error) {
        res.status(400).json({ message: "fail to delete" });
    }
});
exports.deleteUser = deleteUser;
