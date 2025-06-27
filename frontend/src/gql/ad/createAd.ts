import { gql } from "@apollo/client";

export const CREATE_AD = gql `
mutation CreatedAd($data: AdInput!) {
  createAd(data: $data) {
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
;