import Link from "next/link";

async function getProjects() {
  const response = await fetch(process.env.NEXT_HYGRAPH_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `query Projects {
        projects {
          title
          slug
          body {
            text
          }
        }
      }`,
    }),
  });
  const json = await response.json();

  return json.data.projects;
}

export default async function Home() {
  const projects = await getProjects();
  return (
    <div className="m-12">
      <h1>Hygraph Implementation Guides demo</h1>
      <p className="text-lg mb-4">Click the links below to see other pages</p>
      <ul className="mb-8 list-disc list-inside">
        {projects.map((project: any) => {
          return (
            <li key={project.slug}>
              <Link href={`/projects/${project.slug}`} className="underline">
                {project.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
