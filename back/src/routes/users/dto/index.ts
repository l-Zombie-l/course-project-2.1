import { IsDefined, IsEmail, IsNotEmpty, Length } from "class-validator";

export class IUserCreateDTO {
    @Length(6, 100, {})
    fio: string;

    @IsEmail()
    @IsDefined()
    email: string;

    @IsDefined()
    @Length(6, 20, {})
    password: string;
}

export class IUserLoginDTO {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}

export class IMessageDTO {
    @IsEmail()
    email: string;

    @IsDefined()
    info: string;

    userId: number;
}

export class INewsDTO {
    @IsEmail()
    @IsDefined()
    email: string;

    @IsDefined()
    name: string;

    @IsDefined()
    // @Length(6,20,{})
    info: string;

    userId: number;
}

export class IGetNewsDTO {

    @IsDefined()
    name: string;

    @IsDefined()
    info: string;

    userId: number;
}

export class IUserUpdateDTO {
    @Length(6, 100, {})
    fio: string;

    @IsDefined()
    @Length(6, 20, {})
    password: string;
}

export class ICreateIGetNewsDTO extends IGetNewsDTO {}

