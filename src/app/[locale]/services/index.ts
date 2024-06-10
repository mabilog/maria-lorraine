import { GraphQLClient, gql } from "graphql-request";

const graphQlClient = new GraphQLClient(
  process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT!
);

export const queryNavlinks = async () => {
  const query = gql`
    query Navlink {
      navlinks {
        id
        title
        slug
      }
    }
  `;

  const response = await graphQlClient.request(query);
  return response;
};
