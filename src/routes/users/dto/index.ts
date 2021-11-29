import { IsDefined, IsEmail, Length } from "class-validator";

export class IUserCreateDTO{
    @Length(6,100,{})
    fio: string;

    @IsEmail()
    @IsDefined()
    email: string;

    @IsDefined()
    @Length(6,20,{})
    password: string;
}

export class IUserLoginDTO{
    @IsEmail()
    email: string;

    @Length(6,20,{})
    password: string;
}

export class IMessageDTO{
    @IsEmail()
    email: string;

    @IsDefined()
    info: string;

    userId: number;
}

export class INewDTO{
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

// export class ICreateUserDTO extends IUserCreateDTO {}
// export class ICreateUserLoginDTO extends IUserLoginDTO {}
// export class ICreateMessageDTO extends IMessageDTO {}
// export class ICreateNewsDTO extends INewDTO {}
