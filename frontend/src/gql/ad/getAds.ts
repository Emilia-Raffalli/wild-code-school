import { gql } from "@apollo/client";

export const GET_ADS = gql `
query GetAds($filters: AdFiltersInput) {
  getAds(filters: $filters) {
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