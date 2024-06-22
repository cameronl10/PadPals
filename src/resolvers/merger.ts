import { mergeResolvers } from '@graphql-tools/merge';
import path from 'path';
import wishGroup from './wishGroup';
import wish from './wish';
import household from './household';

const resolversArray = [wishGroup, wish, household]

const resolvers = mergeResolvers(resolversArray);

export default resolvers;