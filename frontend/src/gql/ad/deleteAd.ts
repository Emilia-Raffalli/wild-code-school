import { gql } from "@apollo/client";

export const DELETE_AD = gql `
mutation DeleteAd($id: Float!) {
  deleteAd(id: $id) {
    id
    title
  }
}
`