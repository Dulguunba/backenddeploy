import { TravelModel } from "../models/travelModel";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { consumers } from "stream";
import { DestinationModel } from "../models/destinationModel";

dotenv.config();

export const createTravel = async (req: Request, res: Response) => {
  const {
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
    maxTourist,
  } = req.body;
  console.log(
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
    destination,
    route,
    calendar,
    maxTourist
  );

  try {
    const newTravel = await TravelModel.create({
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
  } catch (error) {
    console.log("failt to create travel", error);
    res.status(400).json({ message: "fail to create travel " });
  }
};

export const getTravel = async (req: Request, res: Response) => {
  try {
    const travelQuery = TravelModel.find({}).populate("destination");
    travelQuery.sort("-createdAt");
    // travelQuery.select("_id travelName email phoneNumber");
    const travelData = await travelQuery.exec();
    res.status(200).json({ result: travelData });
  } catch (error) {
    res.status(400).json({ message: "fail to get travel data", error: error });
  }
};

export const getTravelByDestination = async (req: Request, res: Response) => {
  const { destinationId } = req.body;
  try {
    const travelQuery = TravelModel.find({})
    travelQuery.sort("-createdAt");
    const travelData = await travelQuery.exec()
    const destinationData = await travelData.filter((travel) => {
      travel.destination === destinationId;
    });
    const travelNumber = destinationData.length;
    res.status(200).json({ result: destinationData, count: travelNumber });
  } catch (error) {
    res.status(400).json({ message: "fail to get travel data by destination" });
  }
};

export const getNumberofTravel = async (req: Request, res: Response) => {
  try {
    const travelQuery = TravelModel.find({});
    travelQuery.sort("-createdAt");
    const travelData = await travelQuery.exec();
    const travelNumber = travelData.length;
    res.status(200).json({ result: travelNumber });
  } catch (error) {
    res.status(400).json({ message: "fail to get travel number" });
  }
};

export const getNumberTravelLastWeek = async (req: Request, res: Response) => {
  const today = new Date();
  const lastWeek = new Date(today);
  const lastMonth = new Date(today);

  lastWeek.setDate(today.getDate() - 7);
  lastMonth.setDate(today.getDate() - 30);
  const date = [];
  const travelNumber = [];

  try {
    const travelQuery = TravelModel.find({});
    travelQuery.sort("-createdAt");
    const travelData = await travelQuery.exec();
    const totalTravelNumber = travelData.length;

    for (let i = lastWeek; i <= today; i.setDate(i.getDate() + 1)) {
      const travelBeforeDate = travelData.filter(
        (travel) => travel.createdAt <= i
      );
      const numberTravelBeforeDate = travelBeforeDate.length;
      date.push(i);
      travelNumber.push(numberTravelBeforeDate);
    }
    const travelDataLastMonth = travelData.filter(
      (travel) => travel.createdAt <= lastMonth
    );
    const travelNumberLastMonth = travelDataLastMonth.length;
    const changes = (totalTravelNumber / travelNumberLastMonth - 1) | 0;
    res
      .status(200)
      .json({ result: { label: date, data: travelNumber, changes: changes } });
  } catch (error) {
    res.status(400).json({ message: "fail to get travel statistic" });
  }
};

export const deleteTravel = async (req: Request, res: Response) => {
  try {
    const {
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
    } = req.body;
    if (
      !name ||
      !duration ||
      !food ||
      !categoryType ||
      !additionalInfo ||
      !route
    ) {
      res.status(400).json({ message: "undifined travel data" });
    }
    const deleteTravel = await TravelModel.deleteMany({
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
  } catch (error) {
    res.status(400).json({ message: "fail to delete travel" });
  }
};

export const getTravelAllPagination = async (req: Request, res: Response) => {
  const { skip, limit } = req.body;
  console.log(skip, limit);

  try {
    const travelTotalQuery = TravelModel.find({})
      .populate("destination")
      .sort("-createdAt");
    const travelTotalData = await travelTotalQuery.exec();

    const travelQuery = TravelModel.find({})
      .populate("destination")
      .sort("-createdAt")
      .limit(limit)
      .skip(skip);
    const travelData = await travelQuery.exec();
    const numberData = travelTotalData.length;
    res.status(200).json({ result: travelData, number: numberData });
  } catch (error) {
    res
      .status(400)
      .json({ message: " fail to get all travel data with pagination" });
  }
};

export const getTravelSkipLimit = async (req: Request, res: Response) => {
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

    const destinations = await DestinationModel.find({
      destinationCategory: destination,
    }).exec();

    const destinationIds = [];

    for (let i = 0; i < destinations.length; i++) {
      destinationIds.push(destinations[i]._id);
    }

    const travelQuery = TravelModel.find({}).populate("destination");
    travelQuery.sort("-createdAt");
    const travelData = await travelQuery.exec();

    const travelDataFiltered = [];

    for (let t = 0; t < travelData.length; t++) {
      for (let i = 0; i < destinationIds.length; i++) {
        if (travelData[t].destination._id == destinationIds[i]) {
          travelDataFiltered.push(travelData[t]);
        }
      }
    }

    res.status(200).json({ result: travelDataFiltered });
  } catch (error) {
    res.status(400).json({ message: "fail to get travel data", error: error });
  }
};

export const getTravelId = async (req: Request, res: Response) => {
  const { travelId } = req.body;
  console.log(travelId, typeof travelId);

  try {
    const travelQuery = TravelModel.find({ _id: travelId }).populate(
      "destination"
    );
    travelQuery.sort("-createdAt");
    // travelQuery.select("_id travelName email phoneNumber");
    const travelData = await travelQuery.exec();
    res.status(200).json({ result: travelData });
  } catch (error) {
    res.status(400).json({ message: "fail to get travel data", error: error });
  }
};
