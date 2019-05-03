import DataLoader from "dataloader";
import { User } from "../entity/User";
type batchUsers = (userIds: string[]) => Promise<User[]>;

const batchUsers: batchUsers = async (userIds: string[]) => {
   const users = await User.findByIds(userIds);
   const userMap: { [key: string]: User } = {};

   users.forEach(user => {
      userMap[user.id] = user;
   });
   return userIds.map(id => userMap[id]);
};

export const createUserLoader = () => new DataLoader<string, User>(batchUsers);
