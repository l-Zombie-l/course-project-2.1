import User from "@/db/models/User.model";
import Message from "@/db/models/Message.model";
import Hobby from "@/db/models/Hobby.model";
import { IMessageDTO, INewsDTO, IUserCreateDTO, IUserLoginDTO, IUserUpdateDTO } from "./dto";
import moment from "moment";
import { Op } from "sequelize";
import { genSaltSync, hashSync } from "bcrypt";
import Token from "@/db/models/Token.model";
import { compareSync } from "bcrypt";
import News from "@/db/models/News.model";
import { sign } from "jsonwebtoken"

export class UsersService {

  async getList() {
    const foundUsers = await User.findAll({
      include: [
        { model: Message },
        { model: Hobby },
        { model: News },
      ]
    });

    return { data: foundUsers };
  }

  async getNews() {
    const foundNews = await News.findAll({
      include: [
      ]
    });

    return { data: foundNews };
  }

  async register(user: IUserCreateDTO) {
    const foundUsers = await User.findOne({ where: { email: user.email } })
    if (foundUsers) {
      return { success: false, message: 'Email уже зарегистрирован.' }
    }

    const USER_LIMIT = 2;
    const USER_DELAY = 60;
    const where: any = {};

    where.createdAt = {
      [Op.gte]: moment()
        .subtract(USER_DELAY, "seconds")
        .format("YYYY-MM-DD HH:mm:ss"),
    };

    const userCount = await User.count({ where });

    if (userCount >= USER_LIMIT) {
      return {
        success: false,
        message: `За ${USER_DELAY} секунд зарегистрировано ${userCount} пользователей. Лимит (${USER_LIMIT}!)`,
      };
    }
    const result = new User();

    result.email = user.email
    result.fio = user.fio

    const salt = genSaltSync(10);
    result.password = hashSync(user.password, salt)

    await result.save();

    return {
      success: true,
      message: "Успешная регистрация.",
      data: result
    };
  }

  generateJWT(owner: User): string {
    if (!owner) {
      throw new Error()
    }

    const access_token = sign(owner.toJSON(), process.env.TOKEN_SECRET || "mySecretForGenerationJWT",
      {
        algorithm: "HS256",
      });

    console.log("access_token                                 "+access_token)
    return access_token
  }

  async login(body: IUserLoginDTO) {
    const foundUser = await User.findOne({
      where: { email: body.email }
    });

    if (!foundUser) {
      return {
        success: false,
        message: "Email не найден."
      };
    }

    const correctPass = compareSync(body.password, foundUser.password);
    if (!correctPass) {
      return {
        success: false,
        message: "Неверный пароль.",
      };
    }

    await Token.destroy({ where: { userId: foundUser.id } });

    delete foundUser.password;

    const token = this.generateJWT(foundUser);

    await Token.create({
      token,
      userId: foundUser.id,
    });

    return {
      success: true,
      message: "Успешная авторизация.",
      user: foundUser,
      token
    };
  }
  
  async destroy(self: User, userId: number) {
    if (!self.isAdmin) {
      return {
        success: false,
        message: "Недостаточно полномочий.",
      };
    }

    const foundUser = await User.findByPk(userId);
    if (!foundUser) {
      return {
        success: false,
        message: "Пользователь не найден.",
      };
    }

    if (foundUser.isAdmin) {
      return {
        success: false,
        message: "Удаление администратора запрещено.",
      };
    }
    await Hobby.destroy({ where: { userId } });
    await Message.destroy({ where: { userId } });
    await User.destroy({ where: { id: userId } });

    return {
      success: true,
      message: "Пользователь удален.",
    };
  }

  async update(id: number, body: IUserUpdateDTO) {
    const foundUser = await User.findByPk(id);

    // if (body.password) {
    //   foundUser.password = hashSync(body.password, genSaltSync(10))
    // }

    if (body.fio) {
      foundUser.fio = body.fio
    }

    await foundUser.save()

    return {
      success: true,
      message: "Успешное редактирование профиля.",
      user: foundUser
    }
  }

  async addMessage(message: IMessageDTO) {
    const foundUsers = await User.findOne({ where: { email: message.email } })
    if (foundUsers) {
      const MESSAGE_LIMIT = 3;
      const MESSAGE_DELAY = 30;
      const where: any = {};

      where.userId = foundUsers.id;
      where.createdAt = {
        [Op.gte]: moment()
          .subtract(MESSAGE_DELAY, "seconds")
          .format("YYYY-MM-DD HH:mm:ss"),
      };

      const messageCount = await Message.count({ where });

      if (messageCount >= MESSAGE_LIMIT) {
        return {
          success: false,
          message: `За ${MESSAGE_DELAY} секунд отправлено ${messageCount} сообщений. Лимит (${MESSAGE_LIMIT}!)`,
        };
      }

      const result = new Message();

      result.userId = foundUsers.id
      result.info = message.info

      await result.save();

      return {
        success: true,
        message: "Успешно добавлено.",
        data: result
      }
    }
    return {
      success: false,
      message: 'Email отсутствует в базе.'
    };
  }


  async addNews(news: INewsDTO) {
    const foundUsers = await User.findOne({ where: { email: news.email } })
    if (foundUsers) {
      const NEW_LIMIT = 3;
      const NEW_DELAY = 30;
      const where: any = {};

      where.userId = foundUsers.id;
      where.createdAt = {
        [Op.gte]: moment()
          .subtract(NEW_DELAY, "seconds")
          .format("YYYY-MM-DD HH:mm:ss"),
      };

      const newCount = await News.count({ where });

      if (newCount >= NEW_LIMIT) {
        return {
          success: false,
          message: `За ${NEW_DELAY} секунд отправлено ${newCount} сообщений. Лимит (${NEW_LIMIT}!)`,
        };
      }

      const result = new News();
      result.userId = foundUsers.id
      result.name = news.name
      result.info = news.info

      await result.save();

      return {
        success: true,
        message: "Успешно добавлено.",
        data: result
      }
    }
    return {
      success: false,
      message: 'Email отсутствует в базе.'
    };
  }

  async logout(body: Token){
    await Token.destroy({where:{}});

    return{
      seccess: true,
      message: "Успешный выход"
    };
  }
}
export const usersFactory = () => new UsersService();
