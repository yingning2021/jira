import { useAsync } from "./use-async";
import { useEffect } from "react";
import { useHttp } from "./http";
import { cleanObject } from "./index";
import { User } from "../project-list/search-panel";

export const useUsers = (param ?: Partial<User>) => {
  const {run, ...result} = useAsync<User[]>()
  const client = useHttp();

  useEffect(() => {
    run(client("users", { data: cleanObject(param || {}) }))

    // eslint-disable-next-line
  }, [param]);
  return result
}