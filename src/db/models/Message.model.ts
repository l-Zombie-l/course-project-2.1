import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  HasMany,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import User from "./User.model";

@Table({
  paranoid: true,
  timestamps: true,
})
class Message extends Model {
  @Column(DataType.STRING)
  info: string;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  userId: number;

  @BelongsTo(() => User, "userId")
  user: User;
}

export default Message;
