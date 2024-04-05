"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
            step(generator.next(value));
        }
        catch (e) {
            reject(e);
        } }
        function rejected(value) { try {
            step(generator["throw"](value));
        }
        catch (e) {
            reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTravel = exports.createTravel = void 0;
const travelModel_1 = require("../models/travelModel");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const createTravel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, travelCompany, duration, price, food, traffic, categoryType, touristType, additionalInfo, image, route, calendar, } = req.body;
    console.log(name, travelCompany, duration, price, food, traffic, categoryType, touristType, additionalInfo, image, route, calendar);
    try {
        const newTravel = yield travelModel_1.TravelModel.create({
            name,
            travelCompany,
            duration,
            price,
            food,
            traffic,
            categoryType,
            touristType,
            additionalInfo,
            image,
            route,
            calendar,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        console.log("newTravel", newTravel);
        res
            .status(200)
            .json({ message: "successfully created travel info", result: newTravel });
    }
    catch (error) {
        console.log("failt to create travel", error);
        res.status(400).json({ message: "fail to create travel " });
    }
});
exports.createTravel = createTravel;
const getTravel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const travelQuery = travelModel_1.TravelModel.find({});
        travelQuery.sort("-createdAt");
        // travelQuery.select("_id travelName email phoneNumber");
        const travelData = yield travelQuery.exec();
        res.status(200).json({ result: travelData });
    }
    catch (error) {
        res.status(400).json({ message: "fail to get tourist data", error: error });
    }
});
exports.getTravel = getTravel;
