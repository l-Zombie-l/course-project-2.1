import config from "@/config";
import User from "@/db/models/User.model";

const password = "$2b$10$IhaZR3eFgxF/esTIR8DLVe.wDX9GtsU7wsTVzWa9GHCF5AKitRxk2"

const seedUsers = {
  development: [
    {
      fio: "Первый",
      email: "1@mail.ru",
      password,
      isAdmin: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      fio: "Второй",
      email: "2@mail.ru",
      password,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      fio: "Третий",
      email: "3@mail.ru",
      password,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      fio: "Четвертый",
      email: "4@mail.ru",
      password,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ] as User[],
};

export const up = async ({ context: sequelize }) => {
  if (!seedUsers[config.env].length) return;
  await sequelize
    .getQueryInterface()
    .bulkInsert("Users", seedUsers[config.env]);
};

export const down = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().bulkDelete("Users", {
    uuid: seedUsers[config.env].map((u) => u.uuid),
  });
};
