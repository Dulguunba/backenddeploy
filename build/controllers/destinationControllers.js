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
exports.getDestination = exports.createDestination = void 0;
const destinationModel_1 = require("../models/destinationModel");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const createDestination = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, english, destinationCategory } = req.body;
    console.log("name", name, "english", english, "destination category id", destinationCategory);
    try {
        const newCategory = yield destinationModel_1.DestinationModel.create({
            name,
            english,
            destinationCategory,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        res.status(200).json({ message: "successfully created destination" });
    }
    catch (error) {
        res.status(400).json({ message: "fail to create destination" });
    }
});
exports.createDestination = createDestination;
const getDestination = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const destinationQuery = destinationModel_1.DestinationModel.find({}).populate("destinationCategory");
        destinationQuery.sort("-createdAt");
        const destinationData = yield destinationQuery.exec();
        res.status(200).json({ result: destinationData });
    }
    catch (error) {
        res
            .status(400)
            .json({ message: "fail to get destination data", error: error });
    }
});
exports.getDestination = getDestination;
