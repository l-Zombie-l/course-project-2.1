import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  BelongsTo,
} from "sequelize-typescript";
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
  user: User;
}

export default Token;
