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
    @Length(6, 20, {})
    password: string;
}

export class INewsCreateDTO {
    @Length(6, 50, {})
    @IsDefined()
    name: string;

    @IsDefined()
    @Length(6,10000,{})
    info: string;
}

export class IGetNewsDTO {

    @IsDefined()
    name: string;

    @IsDefined()
    info: string;

    userId: number;
}

export class IUserUpdateDTO {
    @Length(6, 50, {})
    fio: string;

    @IsDefined()
    @Length(6, 20, {})
    password: string;
}

export class IGetTasksDTO {
    @IsDefined()
    name: string;

    @IsDefined()
    info: string;

    isFinish: boolean;

    userId: number;
}

export class IAddTasksDTO {
    @Length(6, 50, {})
    @IsDefined()
    name: string;
        
    @Length(6, 10000, {})
    @IsDefined()
    info: string;

    @IsDefined()
    userId: number;
}

export class ICreateIGetNewsDTO extends IGetNewsDTO {}

