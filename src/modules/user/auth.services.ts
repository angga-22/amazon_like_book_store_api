import { IUser, IServiceAuth, TLoginPayload } from "../../interfaces";
import bcrypt, { genSaltSync } from "bcrypt";
import jwt from "jsonwebtoken";
import RepoUser from "./user.repository";
import ClientError from "../../utils/ClientError";
import { JWT_KEY } from "../../config/jwt";

class ServiceAuth implements IServiceAuth {
  private _repoUser: RepoUser;

  constructor(repoUser: RepoUser) {
    this._repoUser = repoUser;
  }

  public async login(payload: TLoginPayload): Promise<IUser | string> {
    const user = await this._repoUser.findByUsername(payload.username);
    if (!user) {
      throw new ClientError("User not found!", 404);
    }
    const validatePassword = bcrypt.compareSync(
      payload.password,
      user.password
    );

    if (!validatePassword) {
      throw new ClientError("Username and Password is not match", 404);
    }

    return this.generateToken(user);
  }

  public async register(payload: IUser): Promise<IUser> {
    const password = this.encryptPassword(payload.password);
    return await this._repoUser.create({
      ...payload,
      password
    });
  }

  private generateToken(user: IUser): string {
    return jwt.sign({ ...user }, JWT_KEY) as string;
  }

  private encryptPassword(password: string): string {
    return bcrypt.hashSync(password, genSaltSync(5));
  }
}

export default ServiceAuth;
