import User from "@/db/models/User.model";
import { IAddTasksDTO, INewsCreateDTO, IUserCreateDTO, IUserLoginDTO, IUserUpdateDTO } from "./dto";
import moment from "moment";
import { NUMBER, Op } from "sequelize";
import { genSaltSync, hashSync } from "bcrypt";
import Token from "@/db/models/Token.model";
import { compareSync } from "bcrypt";
import News from "@/db/models/News.model";
import { sign } from "jsonwebtoken"
import Tasks from "@/db/models/Tasks.model";

export class UsersService {

  async getList() {
    const foundUsers = await User.findAll({
      include: [
        { model: News },
      ]
    });

    return { data: foundUsers };
  }

  async getNews() {
    const foundNews = await News.findAll({
      include: []
    });

    return {
      data:
        foundNews
    };
  }

  async getTasks() {
    const foundTasks = await Tasks.findAll({
      include: []
    });

    return {
      data:
        foundTasks
    };
  }

  async getUserSort() {
    const foundTasks = await User.findAll({
      include: [] 
    });

    var arr: User[]= foundTasks;

    var compareData = function (sort1: User, sort2: User) {
      var sort1Data = new Number(sort1.taskCount);
      var sort2Data = new Number(sort2.taskCount);
      return sort1Data < sort2Data ? 1 : -1;
    }
    var sortedArray = arr.sort(compareData);

    return {
      data:
        sortedArray
    };
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
    const foundUser = await User.findByPk(userId);
    if (!foundUser) {
      return {
        success: false,
        message: "Пользователь не найден.",
      };
    }

    await News.destroy({ where: { userId } });
    await Token.destroy({ where: { userId } });
    await User.destroy({ where: { id: userId } });

    return {
      success: true,
      message: "Пользователь удален.",
    };
  }

  async update(id: number, body: IUserUpdateDTO) {
    const foundUser = await User.findByPk(id);

    if (body.password) {
      foundUser.password = hashSync(body.password, genSaltSync(10))
    }

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

  async read(id: number) {
    const foundUser = await User.findByPk(id);

    return foundUser;
  }

  async tasksList(id: number) {
    const foundUser = await User.findByPk(id);
    const foundTasks = await Tasks.findAll({ where: { userId: foundUser.id } })

    return foundTasks;
  }

  async newsOne(id: number) {
    const foundNews = await News.findByPk(id);

    return foundNews;
  }

  async updateNews(id: number, body: INewsCreateDTO) {
    const foundNews = await News.findByPk(id);

    if (body.name) {
      foundNews.name = body.name
    }

    if (body.info) {
      foundNews.info = body.info
    }

    await foundNews.save()

    return {
      success: true,
      message: "Успешное редактирование.",
      user: foundNews
    }
  }

  async addNews(userId: number, news: INewsCreateDTO) {
    const NEW_LIMIT = 3;
    const NEW_DELAY = 60;
    const where: any = {};

    where.userId = userId;
    where.createdAt = {
      [Op.gte]: moment()
        .subtract(NEW_DELAY, "seconds")
        .format("YYYY-MM-DD HH:mm:ss"),
    };

    const newCount = await News.count({ where });

    if (newCount >= NEW_LIMIT) {
      return {
        success: false,
        message: `За ${NEW_DELAY} секунд отправлено ${newCount} новостей. Лимит (${NEW_LIMIT}!)`,
      };
    }

    const result = new News();
    result.userId = userId
    result.name = news.name
    result.info = news.info

    await result.save();

    return {
      success: true,
      message: "Успешно добавлено.",
      data: result
    };
  }

  async addTask(userTask: IUserUpdateDTO, task: IAddTasksDTO) {
    const NEW_LIMIT = 3;
    const NEW_DELAY = 60;
    const where: any = {};

    where.createdAt = {
      [Op.gte]: moment()
        .subtract(NEW_DELAY, "seconds")
        .format("YYYY-MM-DD HH:mm:ss"),
    };

    const newCount = await Tasks.count({ where });

    if (newCount >= NEW_LIMIT) {
      return {
        success: false,
        message: `За ${NEW_DELAY} секунд отправлено ${newCount} задач. Лимит (${NEW_LIMIT}!)`,
      };
    }

    const result = new Tasks();
    result.userId = task.userId
    result.name = task.name
    result.info = task.info

    await result.save();

    const foundUser = await User.findOne({ where: { id: result.userId } })
    if (foundUser) {
      foundUser.taskCount = foundUser.taskCount+1;
      await foundUser.save()
    }

    return {
      success: true,
      message: "Успешно добавлено.",
      data: result
    };
  }

  async logout(userId: number) {
    await Token.destroy({ where: { userId } });

    return {
      success: true,
      message: "успешный выход из системы",
    };
  }
}
export const usersFactory = () => new UsersService();
