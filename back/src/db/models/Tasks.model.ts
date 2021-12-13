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
  timestamps: true,
})
class Tasks extends Model {
  @Column(DataType.STRING)
  name: string;

  @Column(DataType.STRING)
  info: string;

  @Column(DataType.BOOLEAN)
  isFinish: boolean;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  userId: number;

  @BelongsTo(() => User, "userId")
  user: User;
}

export default Tasks;
