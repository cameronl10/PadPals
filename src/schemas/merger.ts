import  { loadFilesSync } from '@graphql-tools/load-files';
import  { mergeTypeDefs } from '@graphql-tools/merge';
import path from 'path';
import { fileURLToPath } from 'url';

// Convert the URL to a file path for the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const typesArray = loadFilesSync(path.join(__dirname, './*.graphql'));

const typeDefs = mergeTypeDefs(typesArray);

export default typeDefs;




