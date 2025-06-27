/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\nmutation CreatedAd($data: AdInput!) {\n  createAd(data: $data) {\n    id\n    title\n    description\n    author\n    price\n    image\n    city\n    createdAt\n    category {\n      id\n      categoryName\n    }\n    tags {\n      id\n      tagName\n    }\n  }\n}\n": typeof types.CreatedAdDocument,
    "\nmutation DeleteAd($id: Float!) {\n  deleteAd(id: $id) {\n    id\n    title\n  }\n}\n": typeof types.DeleteAdDocument,
    "\nquery GetAdById($id: Float!) {\n  getAdById(id: $id) {\n    id\n    title\n    description\n    author\n    price\n    image\n    city\n    createdAt\n    category {\n      id\n      categoryName\n    }\n    tags {\n      id\n      tagName\n    }\n  }\n}\n": typeof types.GetAdByIdDocument,
    "\nquery GetAds($filters: AdFiltersInput) {\n  getAds(filters: $filters) {\n    id\n    title\n    description\n    author\n    price\n    image\n    city\n    createdAt\n    category {\n      id\n      categoryName\n    }\n    tags {\n      id\n      tagName\n    }\n  }\n}\n": typeof types.GetAdsDocument,
    "\n  query GetCategories {\n    getCategories {\n      id\n      categoryName\n    }\n  }\n": typeof types.GetCategoriesDocument,
    "\n  query GetTags {\n    getTags {\n      id\n      tagName\n    }\n  }\n": typeof types.GetTagsDocument,
};
const documents: Documents = {
    "\nmutation CreatedAd($data: AdInput!) {\n  createAd(data: $data) {\n    id\n    title\n    description\n    author\n    price\n    image\n    city\n    createdAt\n    category {\n      id\n      categoryName\n    }\n    tags {\n      id\n      tagName\n    }\n  }\n}\n": types.CreatedAdDocument,
    "\nmutation DeleteAd($id: Float!) {\n  deleteAd(id: $id) {\n    id\n    title\n  }\n}\n": types.DeleteAdDocument,
    "\nquery GetAdById($id: Float!) {\n  getAdById(id: $id) {\n    id\n    title\n    description\n    author\n    price\n    image\n    city\n    createdAt\n    category {\n      id\n      categoryName\n    }\n    tags {\n      id\n      tagName\n    }\n  }\n}\n": types.GetAdByIdDocument,
    "\nquery GetAds($filters: AdFiltersInput) {\n  getAds(filters: $filters) {\n    id\n    title\n    description\n    author\n    price\n    image\n    city\n    createdAt\n    category {\n      id\n      categoryName\n    }\n    tags {\n      id\n      tagName\n    }\n  }\n}\n": types.GetAdsDocument,
    "\n  query GetCategories {\n    getCategories {\n      id\n      categoryName\n    }\n  }\n": types.GetCategoriesDocument,
    "\n  query GetTags {\n    getTags {\n      id\n      tagName\n    }\n  }\n": types.GetTagsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation CreatedAd($data: AdInput!) {\n  createAd(data: $data) {\n    id\n    title\n    description\n    author\n    price\n    image\n    city\n    createdAt\n    category {\n      id\n      categoryName\n    }\n    tags {\n      id\n      tagName\n    }\n  }\n}\n"): (typeof documents)["\nmutation CreatedAd($data: AdInput!) {\n  createAd(data: $data) {\n    id\n    title\n    description\n    author\n    price\n    image\n    city\n    createdAt\n    category {\n      id\n      categoryName\n    }\n    tags {\n      id\n      tagName\n    }\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation DeleteAd($id: Float!) {\n  deleteAd(id: $id) {\n    id\n    title\n  }\n}\n"): (typeof documents)["\nmutation DeleteAd($id: Float!) {\n  deleteAd(id: $id) {\n    id\n    title\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery GetAdById($id: Float!) {\n  getAdById(id: $id) {\n    id\n    title\n    description\n    author\n    price\n    image\n    city\n    createdAt\n    category {\n      id\n      categoryName\n    }\n    tags {\n      id\n      tagName\n    }\n  }\n}\n"): (typeof documents)["\nquery GetAdById($id: Float!) {\n  getAdById(id: $id) {\n    id\n    title\n    description\n    author\n    price\n    image\n    city\n    createdAt\n    category {\n      id\n      categoryName\n    }\n    tags {\n      id\n      tagName\n    }\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery GetAds($filters: AdFiltersInput) {\n  getAds(filters: $filters) {\n    id\n    title\n    description\n    author\n    price\n    image\n    city\n    createdAt\n    category {\n      id\n      categoryName\n    }\n    tags {\n      id\n      tagName\n    }\n  }\n}\n"): (typeof documents)["\nquery GetAds($filters: AdFiltersInput) {\n  getAds(filters: $filters) {\n    id\n    title\n    description\n    author\n    price\n    image\n    city\n    createdAt\n    category {\n      id\n      categoryName\n    }\n    tags {\n      id\n      tagName\n    }\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCategories {\n    getCategories {\n      id\n      categoryName\n    }\n  }\n"): (typeof documents)["\n  query GetCategories {\n    getCategories {\n      id\n      categoryName\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetTags {\n    getTags {\n      id\n      tagName\n    }\n  }\n"): (typeof documents)["\n  query GetTags {\n    getTags {\n      id\n      tagName\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;