import { useAsync } from "./use-async";
import { Project } from "../project-list/list";
import { useEffect } from "react";
import { useHttp } from "./http";
import { cleanObject } from "./index";

export const useProjects = (param ?: Partial<Project>) => {
  const {run, ...result} = useAsync<Project[]>()
  const client = useHttp();

  useEffect(() => {
    run(client("projects", { data: cleanObject(param || {}) }))

    // eslint-disable-next-line
  }, [param]);
  return result
}