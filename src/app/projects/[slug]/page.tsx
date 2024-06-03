import Link from "next/link";

async function getProject(slug: string) {
  const HYGRAPH_ENDPOINT = process.env.NEXT_HYGRAPH_ENDPOINT;

  if (!HYGRAPH_ENDPOINT) {
    throw new Error("HYGRAPH_ENDPOINT is not defined");
  }

  const response = await fetch(HYGRAPH_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `query Projects ($slug:String!) {
        project(where: {slug:$slug}) {
          title
          slug
          body {
            text
          }
        }
      }`,
      variables: {
        slug: slug,
      },
    }),
  });

  const json = await response.json();
  return json.data.project;
}

export default async function Page({ params }: { params: { slug: string } }) {
  const project = await getProject(params.slug);

  return (
    <div className="m-12">
      <h1 className="text-5xl font-bold mb-4">{project.title}</h1>
      <p className="text-lg mb-8">{project.body.text}</p>

      <p>
        <Link href="/" className="underline">
          Back to homepage
        </Link>
      </p>
    </div>
  );
}
