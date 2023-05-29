import * as url from 'url'
import {  mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge"
import { loadFilesSync, loadFiles } from "@graphql-tools/load-files"
import path from 'path'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const typeDefs = mergeTypeDefs(loadFilesSync(path.join(__dirname, "./types"), 
{ 
    recursive: true,
    extensions: ['gql'],
}));

const resolversArray = await loadFiles(path.join(__dirname, "./resolvers/**/*.resolvers.js"),
{
    recursive: true,
    extensions: ['js']
});

const resolvers = mergeResolvers(resolversArray)

export { typeDefs,  resolvers }