import models from "../models/index.js";
const { sequelize } = models;

const { Color } = models;

class ColorService {
  async defaultColor() {
    const lookup = process.env.DEFAULT_COLOR.toLowerCase();
    const color = await Color.findOne({
      where: {
        name: sequelize.where(
          sequelize.fn("LOWER", sequelize.col("name")),
          "LIKE",
          "%" + lookup + "%"
        ),
      },
    });
    return color.colorId;
  }
}

export default new ColorService();
