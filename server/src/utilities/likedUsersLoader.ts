import DataLoader from 'dataloader';
// import { Post } from '../entity/Post';
import { PostLike } from '../entity/PostLike';
import { In } from 'typeorm';
import { User } from '../entity/User';

const batchUsers = async (postIds: string[]) => {
  const pLikes = await PostLike.find({
    where: {
      postId: In(postIds)
    },
    relations: ['user']
  });

  const postIdToUsers: { [key: string]: User[] } = {};
  pLikes.forEach(pL => {
    if (pL.postId in postIdToUsers) {
      postIdToUsers[pL.postId].push(pL.user as User);
    } else {
      postIdToUsers[pL.postId] = [pL.user as User];
    }
  });

  return postIds.map(postId => postIdToUsers[postId] || []);
};
export const createLikePostLoader = () => new DataLoader(batchUsers);
