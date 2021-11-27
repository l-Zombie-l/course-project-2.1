import User from "@/db/models/User.model";
import Message from "@/db/models/Message.model";
import Hobby from "@/db/models/Hobby.model";
import { IMessageDTO, INewDTO, IUserCreateDTO, IUserLoginDTO } from "./dto";
import moment from "moment";
import {Op} from "sequelize";
import New from "@/db/models/New.model";
import {genSaltSync, hashSync} from "bcrypt";
import Token from "@/db/models/Token.model";
import {compareSync} from "bcrypt";
import { sign } from "jsonwebtoken";

export class UsersService {

  async getList() {
    const foundUsers = await User.findAll({
      include: [
        { model: Message },
        { model: Hobby },
        { model: New },        
      ]
    });

    return { data: foundUsers };
  }

  async register(user: IUserCreateDTO) {
    const founded = await User.findOne({where: {email: user.email}})
    if(founded){
      return{success:false, message: 'Email уже зарегистрирован.'}
    }

    const USER_LIMIT = 2;
    const USER_DELAY = 60;
    const where: any = {};

    where.createdAt={
      [Op.gte]: moment()
      .subtract(USER_DELAY, "seconds")
      .format("YYYY-MM-DD HH:mm:ss"),
    };

    const userCount = await User.count({where});

    if (userCount >= USER_LIMIT){
      return{
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

    return{
      success: true,
      message: "Успешная регистрация.",
      data: result
    }      
  } 

  generateJWT(owner: User): string{
    if(!owner){
      throw new Error()
    }
    const accessToken = sign(owner.toJSON(), process.env.TOKEN_SECRET||"mySecretForGenerationJWT", {
      algorithm: "HS256",
    });

    return accessToken
  }

  async login(body: IUserLoginDTO) {
    const foundUser = await User.findOne({where: {email: body.email}})
    if(foundUser){
      await Token.destroy({where: {userId: foundUser.id}});

      const correctPass = compareSync(body.password, foundUser.password);
      if(!correctPass){
        return {success: false,
          message: "Неверный пароль.",}
      }

      delete foundUser.password;
      const token = this.generateJWT(foundUser);

      await Token.create({
        token,
        userId: foundUser.id,
      })
      
      return{
        success:true, 
        message: 'Успешная авторизация.',
        user: foundUser,
        token
      }
    }
    return{
      success: false,
      message: "Ошибка авторизации.",      
    }      
  } 

  async addMessage(message: IMessageDTO) {
    const founded = await User.findOne({where: {email: message.email}})
      if(founded){
        const MESSAGE_LIMIT = 3;
        const MESSAGE_DELAY = 30;
        const where: any = {};
    
        where.userId = founded.id;
        where.createdAt={
          [Op.gte]: moment()
          .subtract(MESSAGE_DELAY, "seconds")
          .format("YYYY-MM-DD HH:mm:ss"),
        };
  
        const messageCount = await Message.count({where});
    
        if (messageCount >= MESSAGE_LIMIT){
          return{
            success: false,
            message: `За ${MESSAGE_DELAY} секунд отправлено ${messageCount} сообщений. Лимит (${MESSAGE_LIMIT}!)`,
          };
        }
  
        const result = new Message();
    
        result.userId = founded.id
        result.info = message.info
    
        await result.save();
    
        return{
          success: true,
          message: "Успешно добавлено.",
          data: result
        }  
    }   
  return{
        success:false, 
        message: 'Email отсутствует в базе.'}        
  } 

  async addNews(news: INewDTO) {
    const founded = await User.findOne({where: {email: news.email}})
      if(founded){
        const NEW_LIMIT = 3;
        const NEW_DELAY = 30;
        const where: any = {};
    
        where.userId = founded.id;
        where.createdAt={
          [Op.gte]: moment()
          .subtract(NEW_DELAY, "seconds")
          .format("YYYY-MM-DD HH:mm:ss"),
        };
  
        const newCount = await New.count({where});
    
        if (newCount >= NEW_LIMIT){
          return{
            success: false,
            message: `За ${NEW_DELAY} секунд отправлено ${newCount} сообщений. Лимит (${NEW_LIMIT}!)`,
          };
        }
  
        const result = new New();    
        result.userId = founded.id
        result.name = news.name
        result.info = news.info
    
        await result.save();
    
        return{
          success: true,
          message: "Успешно добавлено.",
          data: result
        }  
    }   
  return{
        success:false, 
        message: 'Email отсутствует в базе.'}        
  } 
}

export const usersFactory = () => new UsersService();
