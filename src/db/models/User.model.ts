import {
  Table,
  Column,
  Model,
  DataType,
  Unique,
  AllowNull,
  Default,
  HasMany,
  IsEmail,
} from "sequelize-typescript";
import Hobby from "./Hobby.model";
import Message from "./Message.model";
import New from "./New.model";

@Table({
  timestamps: true,
})
class User extends Model {
  @Default("Иванов Иван Иванович")
  @Column(DataType.STRING)
  fio: string;

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
  email: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  password: string;

  @HasMany(() => Message, { foreignKey: "userId", onDelete: "RESTRICT" })
  message: Message[];

  @HasMany(() => Hobby, { foreignKey: "userId", onDelete: "RESTRICT" })
  hobby: Hobby[];

  @HasMany(() => New, { foreignKey: "userId", onDelete: "RESTRICT" })
  news: New[];
}

export default User;
