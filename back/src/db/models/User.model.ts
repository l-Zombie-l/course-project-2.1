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
import New from "./News.model";

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

  @Column(DataType.BOOLEAN)
  isAdmin: boolean;

  @HasMany(() => New, { foreignKey: "userId", onDelete: "RESTRICT" })
  news: New[];
}

export default User;
