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
exports.deleteDestinationCategory = exports.getDestinationCategory = exports.createDestinationCategory = void 0;
const destinationCategoryModel_1 = require("../models/destinationCategoryModel");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const createDestinationCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, english } = req.body;
    console.log("name", name, "english", english);
    try {
        const newCategory = yield destinationCategoryModel_1.DestinationCategoryModel.create({
            name,
            english,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        res.status(200).json({ message: "successfully created destination category" });
    }
    catch (error) {
        res.status(400).json({ message: "fail to create destination category " });
    }
});
exports.createDestinationCategory = createDestinationCategory;
const getDestinationCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const destinationCategoryQuery = destinationCategoryModel_1.DestinationCategoryModel.find({});
        destinationCategoryQuery.sort("-createdAt");
        // destinationCategoryQuery.select("_id destinationCategoryName email phoneNumber");
        const destinationCategoryData = yield destinationCategoryQuery.exec();
        res.status(200).json({ result: destinationCategoryData });
    }
    catch (error) {
        res.status(400).json({ message: "fail to get destination category data", error: error });
    }
});
exports.getDestinationCategory = getDestinationCategory;
const deleteDestinationCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, english } = req.body;
        if (!name || !english) {
            return res.status(401).json({ message: "undifinded name or english" });
        }
        const deleteDestination = yield destinationCategoryModel_1.DestinationCategoryModel.deleteMany({ name, english });
    }
    catch (error) {
        res.status(400).json({ message: "fail to delete DestinationCategory" });
    }
});
exports.deleteDestinationCategory = deleteDestinationCategory;
