import { mergeResolvers } from '@graphql-tools/merge';
import path from 'path';
import wishGroup from './wishGroup';
import wish from './wish';

const resolversArray = [wishGroup, wish]

const resolvers = mergeResolvers(resolversArray);

export default resolvers;