import { gql } from "@apollo/client";

export const GET_ADS_BY_ID = gql `
query GetAdById($id: Float!) {
  getAdById(id: $id) {
    id
    title
    description
    author
    price
    image
    city
    createdAt
    category {
      id
      categoryName
    }
    tags {
      id
      tagName
    }
  }
}
`