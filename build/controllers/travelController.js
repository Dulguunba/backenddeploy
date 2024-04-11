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
exports.getTravelId = exports.getTravelSkipLimit = exports.getTravelAllPagination = exports.deleteTravel = exports.getNumberTravelLastWeek = exports.getNumberofTravel = exports.getTravelByDestination = exports.getTravel = exports.createTravel = void 0;
const travelModel_1 = require("../models/travelModel");
const dotenv_1 = __importDefault(require("dotenv"));
const destinationModel_1 = require("../models/destinationModel");
dotenv_1.default.config();
const createTravel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, travelCompany, duration, price, food, traffic, categoryType, touristType, additionalInfo, image, route, destination, calendar, maxTourist, } = req.body;
    console.log(name, travelCompany, duration, price, food, traffic, categoryType, touristType, additionalInfo, image, destination, route, calendar, maxTourist);
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
            destination,
            calendar,
            createdAt: new Date(),
            updatedAt: new Date(),
            maxTourist,
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
        const travelQuery = travelModel_1.TravelModel.find({}).populate("destination");
        travelQuery.sort("-createdAt");
        // travelQuery.select("_id travelName email phoneNumber");
        const travelData = yield travelQuery.exec();
        res.status(200).json({ result: travelData });
    }
    catch (error) {
        res.status(400).json({ message: "fail to get travel data", error: error });
    }
});
exports.getTravel = getTravel;
const getTravelByDestination = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { destinationId } = req.body;
    try {
        const travelQuery = travelModel_1.TravelModel.find({});
        travelQuery.sort("-createdAt");
        const travelData = yield travelQuery.exec();
        const destinationData = yield travelData.filter((travel) => {
            travel.destination === destinationId;
        });
        const travelNumber = destinationData.length;
        res.status(200).json({ result: destinationData, count: travelNumber });
    }
    catch (error) {
        res.status(400).json({ message: "fail to get travel data by destination" });
    }
});
exports.getTravelByDestination = getTravelByDestination;
const getNumberofTravel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const travelQuery = travelModel_1.TravelModel.find({});
        travelQuery.sort("-createdAt");
        const travelData = yield travelQuery.exec();
        const travelNumber = travelData.length;
        res.status(200).json({ result: travelNumber });
    }
    catch (error) {
        res.status(400).json({ message: "fail to get travel number" });
    }
});
exports.getNumberofTravel = getNumberofTravel;
const getNumberTravelLastWeek = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const today = new Date();
    const lastWeek = new Date(today);
    const lastMonth = new Date(today);
    lastWeek.setDate(today.getDate() - 7);
    lastMonth.setDate(today.getDate() - 30);
    const date = [];
    const travelNumber = [];
    try {
        const travelQuery = travelModel_1.TravelModel.find({});
        travelQuery.sort("-createdAt");
        const travelData = yield travelQuery.exec();
        const totalTravelNumber = travelData.length;
        for (let i = lastWeek; i <= today; i.setDate(i.getDate() + 1)) {
            const travelBeforeDate = travelData.filter((travel) => travel.createdAt <= i);
            const numberTravelBeforeDate = travelBeforeDate.length;
            date.push(i);
            travelNumber.push(numberTravelBeforeDate);
        }
        const travelDataLastMonth = travelData.filter((travel) => travel.createdAt <= lastMonth);
        const travelNumberLastMonth = travelDataLastMonth.length;
        const changes = (totalTravelNumber / travelNumberLastMonth - 1) | 0;
        res
            .status(200)
            .json({ result: { label: date, data: travelNumber, changes: changes } });
    }
    catch (error) {
        res.status(400).json({ message: "fail to get travel statistic" });
    }
});
exports.getNumberTravelLastWeek = getNumberTravelLastWeek;
const deleteTravel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, travelCompany, duration, price, food, traffic, categoryType, touristType, additionalInfo, image, route, calendar, } = req.body;
        if (!name ||
            !duration ||
            !food ||
            !categoryType ||
            !additionalInfo ||
            !route) {
            res.status(400).json({ message: "undifined travel data" });
        }
        const deleteTravel = yield travelModel_1.TravelModel.deleteMany({
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
        });
        res.status(201).json({ message: "successfully to delete" });
    }
    catch (error) {
        res.status(400).json({ message: "fail to delete travel" });
    }
});
exports.deleteTravel = deleteTravel;
const getTravelAllPagination = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { skip, limit } = req.body;
    console.log(skip, limit);
    try {
        const travelTotalQuery = travelModel_1.TravelModel.find({})
            .populate("destination")
            .sort("-createdAt");
        const travelTotalData = yield travelTotalQuery.exec();
        const travelQuery = travelModel_1.TravelModel.find({})
            .populate("destination")
            .sort("-createdAt")
            .limit(limit)
            .skip(skip);
        const travelData = yield travelQuery.exec();
        const numberData = travelTotalData.length;
        res.status(200).json({ result: travelData, number: numberData });
    }
    catch (error) {
        res
            .status(400)
            .json({ message: " fail to get all travel data with pagination" });
    }
});
exports.getTravelAllPagination = getTravelAllPagination;
const getTravelSkipLimit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { destination } = req.body;
    try {
        // const filterTravelData = TravelModel.aggregate([
        //     {
        //       $lookup: {
        //         from: "destinations",
        //         localField: "destination",
        //         foreignField: "_id",
        //         as: "destination_info"
        //       }
        //     },
        //     {
        //       $unwind: "$destination_info"
        //     },
        //     {
        //       $lookup: {
        //         from: "destinationcategories",
        //         localField: "destination_info.destinationCategory",
        //         foreignField: "_id",
        //         as: "category_info"
        //       }
        //     },
        //     {
        //       $unwind: "$category_info"
        //     },
        //     {
        //       $match: {
        //         "category_info._id": destination
        //       }
        //     }
        //   ]).exec()
        const destinations = yield destinationModel_1.DestinationModel.find({
            destinationCategory: destination,
        }).exec();
        const destinationIds = [];
        for (let i = 0; i < destinations.length; i++) {
            destinationIds.push(destinations[i]._id);
        }
        const travelQuery = travelModel_1.TravelModel.find({}).populate("destination");
        travelQuery.sort("-createdAt");
        const travelData = yield travelQuery.exec();
        const travelDataFiltered = [];
        for (let t = 0; t < travelData.length; t++) {
            for (let i = 0; i < destinationIds.length; i++) {
                if (travelData[t].destination._id == destinationIds[i]) {
                    travelDataFiltered.push(travelData[t]);
                }
            }
        }
        res.status(200).json({ result: travelDataFiltered });
    }
    catch (error) {
        res.status(400).json({ message: "fail to get travel data", error: error });
    }
});
exports.getTravelSkipLimit = getTravelSkipLimit;
const getTravelId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { travelId } = req.body;
    console.log(travelId, typeof travelId);
    try {
        const travelQuery = travelModel_1.TravelModel.find({ _id: travelId }).populate("destination");
        travelQuery.sort("-createdAt");
        // travelQuery.select("_id travelName email phoneNumber");
        const travelData = yield travelQuery.exec();
        res.status(200).json({ result: travelData });
    }
    catch (error) {
        res.status(400).json({ message: "fail to get travel data", error: error });
    }
});
exports.getTravelId = getTravelId;
