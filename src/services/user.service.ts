import type { IUser } from "../interfaces/user.interface.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { UserRepository } from "../repositories/user.repository.js";

const userRepository = new UserRepository();

export class UserService {
  async registerUser(userData: Partial<IUser>) {
    const existingUser = await userRepository.findByUsername(
      userData.user_name!,
    );
    if (existingUser) throw new Error("Username already taken");

    const hashedPassword = await bcrypt.hash(userData.password!, 10);

    const newUser: IUser = {
      ...(userData as IUser),
      userid: uuidv4(),
      password: hashedPassword,
      start_date: new Date(),
      end_date:
        userData.end_date ||
        new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
    };

    return await userRepository.createUser(newUser);
  }
}
