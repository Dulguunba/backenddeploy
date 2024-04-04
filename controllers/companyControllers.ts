import { CompanyModel } from "../models/companyModel";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

dotenv.config();

function generateRandomString() {
  return Math.random().toString(36).substring(2, 8);
}

export const createCompany = async (req: Request, res: Response) => {
  const { name, english, info, email, phoneNumber } = req.body;
  console.log(name, english, info, phoneNumber, email);
  try {
    const generatedPassword = generateRandomString();
    const hashPassword = await bcrypt.hash(generatedPassword, 10);
    const newCategory = await CompanyModel.create({
      name,
      english,
      info,
      email,
      phoneNumber,
      password: hashPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "dulguunbatbaa@gmail.com",
        pass: "dfvb bzgl ignx jcmd",
      },
    });

    const mailOptions = {
      from: '"Travel to mongolia" <travel_to_mongolia@no_reply_email>',
      to: `${email}`,
      subject:
        "Successfully created new admin account in 'Travel to Mongolia' website",
      text: "'Travel to Mongolia' new account informtion",
      html: `<b>Dear ${name},</b>
                  <p> Username or Email: ${email} </p>
                  <p> Password: ${generatedPassword} </p>`,
    };

    const sendEmail = await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email: ", error);
        res.status(400).json({ message: "fail to create admin account" });
      } else {
        console.log("Email sent: ", info.response);
        res
          .status(200)
          .json({ message: "successfully created new admin account" });
      }
    });
  } catch (error) {
    res.status(400).json({ message: "fail to create admin account" });
  }
};

export const getCompany = async (req: Request, res: Response) => {
  try {
    const companyQuery = CompanyModel.find({});
    companyQuery.sort("-createdAt");
    companyQuery.select("_id name english info email phoneNumber role");
    const companyData = await companyQuery.exec();
    res.status(200).json({ result: companyData });
  } catch (error) {
    res.status(400).json({ message: "fail to get company data", error: error });
  }
};
