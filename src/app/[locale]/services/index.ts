import { GraphQLClient, gql } from "graphql-request";

const graphQlClient = new GraphQLClient(
  process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT!
);

export type Navlink = {
  id: string;
  title: string;
  slug: string;
};

export const queryNavlinks = async (locale: string) => {
  const query = gql`
    query Navlink {
      navlinks(locales: [${locale}]) {
        id
        title
        slug
      }
    }
  `;

  const { navlinks }: { navlinks: Navlink[] } = await graphQlClient.request(
    query
  );

  return navlinks;
};
