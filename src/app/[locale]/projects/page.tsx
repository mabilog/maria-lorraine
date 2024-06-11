"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { queryProjects, Project } from "../services";
import { Link } from "@/navigation";

const Projects = () => {
  const { locale }: { locale: string } = useParams();

  console.log("locale", locale);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    getProjectsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getProjectsData = async () => {
    try {
      console.log("getprojectsData");
      const res: Project[] = await queryProjects(locale);
      console.log("res", res);
      setProjects(res);
      console.log("what are we in for");
    } catch (error) {
      console.error("Failed to fetch navlinks", error);
    }
  };
  return (
    <>
      {projects ? (
        <ul>
          {projects.map((project) => (
            <li key={project.id}>
              <Link href={project.slug}> {project.title}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <>nothing to see here</>
      )}
    </>
  );
};

export default Projects;
