import { v4 } from "uuid";
import chalk from "chalk";
import models from "../models/index.js";

const colorsArr = [
  {
    name: "Pink",
    code: "#FF0AD8",
  },
  {
    name: "Lemon",
    code: "#01FF0C",
  },
  {
    name: "Minty",
    code: "#6ACCBC",
  },
  {
    name: "Olive",
    code: "#AFB83B",
  },
  {
    name: "Navy Blue",
    code: "#065583",
  },
  {
    name: "Teal",
    code: "#008080",
  },
  {
    name: "Sky Blue",
    code: "#38B6FF",
  },
  {
    name: "Light Blue",
    code: "#96C3EB",
  },
  {
    name: "Magenta",
    code: "#E05194",
  },
  {
    name: "Tuape",
    code: "#CCAC93",
  },
  {
    name: "Red",
    code: "#EB4335",
  },
  {
    name: "Salmon",
    code: "#FF8D85",
  },
  {
    name: "Lime",
    code: "#7ECC49",
  },
  {
    name: "Green",
    code: "#34A853",
  },
  {
    name: "Orange",
    code: "#FF4D00",
  },
  {
    name: "Grey",
    code: "#959595",
  },
  {
    name: "Charcoal",
    code: "#808080",
  },
  {
    name: "Blue",
    code: "#4285F4",
  },
  {
    name: "Grape",
    code: "#884DFF",
  },
  {
    name: "Lavender",
    code: "#EB96EB",
  },
  {
    name: "Purple",
    code: "#731AE4",
  },
  {
    name: "Yellow",
    code: "#FBBC05",
  },
  {
    name: "Black",
    code: "#000000",
  },
];

const colorSeeder = async () => {
  const colorsExist = await models.Color.findOne({
    where: { name: colorsArr[0].name },
  });
  if (colorsExist) {
    const colorInit = chalk.green("[✔] Colors already initialized...");
    console.log(colorInit);
    return;
  }

  const colorInit = chalk.yellowBright("[!] Initializing Colors!");
  console.log(colorInit);

  const colorsWithId = colorsArr.map((color) => {
    return {
      ...color,
      colorId: v4(),
    };
  });

  const colorsCreated = await models.Color.bulkCreate(colorsWithId);
  if (colorsCreated) {
    const log = chalk.green("[✔] Colors created successfully");
    console.log(log);
  }
};

export default colorSeeder;
