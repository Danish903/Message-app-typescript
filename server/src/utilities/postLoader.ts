import DataLoader from 'dataloader';
import { Post } from '../entity/Post';
import { PostLike } from '../entity/PostLike';
import { In } from 'typeorm';

const batchPosts = async (userIds: string[]) => {
  const pLikes = await PostLike.find({
    join: {
      alias: 'plike',
      innerJoinAndSelect: {
        post: 'plike.post'
      }
    },
    where: {
      userId: In(userIds)
    }
  });

  const postIdToUsers: { [key: string]: Post[] } = {};
  pLikes.forEach(pL => {
    if (pL.userId in postIdToUsers) {
      postIdToUsers[pL.userId].push(pL.post as any);
    } else {
      postIdToUsers[pL.userId] = [pL.post as any];
    }
  });

  return userIds.map(userId => postIdToUsers[userId]);
};

export const createPostsLoader = () => new DataLoader(batchPosts);
