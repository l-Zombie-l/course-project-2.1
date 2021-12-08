import config from "@/config";
import Message from "../models/Message.model";

const seedMessages = {
  development: [
    {
      info: "Первый тут",
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },   
    {
      info: "Третий тут",
      userId: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      info: "Третий снова тут",
      userId: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      info: "Заканчивайте перекличку!",
      userId: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ] as Message[],
};

export const up = async ({ context: sequelize }) => {
  if (!seedMessages[config.env].length) return;
  await sequelize
    .getQueryInterface()
    .bulkInsert("Messages", seedMessages[config.env]);
};

export const down = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().bulkDelete("Messages", {
    uuid: seedMessages[config.env].map((u) => u.uuid),
  });
};
