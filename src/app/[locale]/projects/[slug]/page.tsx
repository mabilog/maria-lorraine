"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Project, queryProject } from "../../services";

export default function Page() {
  const { locale, slug }: { locale: string; slug: string } = useParams();
  const [project, setProject] = useState<Project>();

  useEffect(() => {
    getProjectData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getProjectData = async () => {
    try {
      const res: Project = await queryProject(locale, slug);
      console.log("res from /project/[slug]", res);
      setProject(res);
    } catch (error) {
      console.error("Failed to fetch project", error);
    }
  };

  return (
    <div className="m-12">
      {project ? (
        <>
          <h1 className="text-5xl font-bold mb-4">{project.title}</h1>
          <div className="text-lg mb-8">{project.body}</div>
        </>
      ) : (
        <div>theres no project like this i guess</div>
      )}

      <p>
        <Link href={`${locale}/`} className="underline">
          Back to homepage
        </Link>
      </p>
    </div>
  );
}
