"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//api key n fb username
//secret key n private key hend c ugch bolohgui
//cloudinary n two way security tai gedger yavdag
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: "dvvfdsvvr",
    api_key: "627528783726787",
    api_secret: "NzTnZxAumlOB4JY6ELRvhLudG9A",
});
exports.default = cloudinary_1.v2;
