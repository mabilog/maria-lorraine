import { GraphQLClient, gql } from "graphql-request";

const graphQlClient = new GraphQLClient(
  process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT!
);

export type Navlink = {
  id: string;
  title: string;
  slug: string;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  body?: {
    html: string;
  };
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

export const queryProjects = async (locale: string) => {
  const query = gql`
    query Projects {
      projects(locales: [${locale}]) {
        title
        slug
        description
      }
    }
  `;

  const { projects }: { projects: Project[] } = await graphQlClient.request(
    query
  );

  return projects;
};

export const queryProject = async (locale: string, slug: string) => {
  const query = gql`
  query Project {
    projects(locales: [${locale}], where: {slug: [${slug}]}) {
      id
      title
      slug
      locale
      body {
        html
      }
    }
  }`;

  const { projects }: { projects: Project } = await graphQlClient.request(
    query
  );
  console.log(projects);

  return projects;
};
