import config from "@/config";
import Hobby from "../models/Hobby.model";

const seedHobby = {
  development: [
    {
      name: "Футбол",
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },   
    {
      name: "Игра на скрипке",
      userId: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Шахматы",
      userId: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Волонтерство",
      userId: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ] as Hobby[],
};

export const up = async ({ context: sequelize }) => {
  if (!seedHobby[config.env].length) return;
  await sequelize
    .getQueryInterface()
    .bulkInsert("Hobbies", seedHobby[config.env]);
};

export const down = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().bulkDelete("Hobbies", {
    uuid: seedHobby[config.env].map((u) => u.uuid),
  });
};
