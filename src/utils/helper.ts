import Token from "@/db/models/Token.model";
import User from "@/db/models/User.model";
import { NotFoundError, NotFoundErrorToken } from "./errors";

export async function verifyUserToken(token: string) {
    const foundToken = await Token.findOne({
        where: { token }
    });

    if (!foundToken) {
        throw new NotFoundErrorToken();
    }

    const foundUser = await User.findByPk(foundToken.userId);
    if (!foundUser) {
        throw new NotFoundError();
    }

    return {
        token: foundToken,
        user: foundUser,
    };
}