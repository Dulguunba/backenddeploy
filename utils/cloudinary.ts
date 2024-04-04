import dotenv from "dotenv";
dotenv.config();

//api key n fb username
//secret key n private key hend c ugch bolohgui
//cloudinary n two way security tai gedger yavdag

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dvvfdsvvr",
  api_key: "627528783726787",
  api_secret: "NzTnZxAumlOB4JY6ELRvhLudG9A",
});

export default cloudinary;
