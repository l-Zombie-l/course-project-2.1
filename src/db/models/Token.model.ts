import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  BelongsTo,
} from "sequelize-typescript";
import Hobby from "./Hobby.model";
import Message from "./Message.model";
import New from "./New.model";
import User from "./User.model";

@Table({
  timestamps: true,
})
class Token extends Model {
  @Column(DataType.NUMBER)
  userId: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  token: string;

  @BelongsTo(() => User, 'userId')
  user: User[];

}

export default Token;
