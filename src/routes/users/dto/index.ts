import { IsDefined, IsEmail, Length } from "class-validator";

export class IUserDTO{
    @IsDefined()
    fio: string;

    @IsEmail()
    @IsDefined()
    email: string;

    @IsDefined()
    @Length(6,20,{})
    password: string;
}
export class IMessageDTO{
    @IsEmail()
    @IsDefined()
    email: string;

    @IsDefined()
    info: string;

    userId: number;
}

export class ICreateUserDTO extends IUserDTO {}
export class ICreateMessageDTO extends IMessageDTO {}
