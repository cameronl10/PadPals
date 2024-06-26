import { mergeResolvers } from '@graphql-tools/merge';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const currentFileUrl = fileURLToPath(import.meta.url);
//Get directory of merger.ts 
const resolversDir = path.dirname(currentFileUrl);
console.log(resolversDir);

async function loadResolvers() {
    const files = fs.readdirSync(resolversDir);
    const resolverImports = files
        .filter(file => file.endsWith('.ts') && file !== 'merger.ts')
        .map(file => import(path.join(resolversDir, file)))

    // gets the module imports
    const resolverExports = await Promise.all(resolverImports);

    // extract exports from imported modules
    const resolversArray = resolverExports.map(module => module.default);
    return mergeResolvers(resolversArray);
}

export default loadResolvers();