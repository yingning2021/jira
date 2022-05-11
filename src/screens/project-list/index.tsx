import { SearchPanel } from "./search-panel";
import { List } from "./list";
import {  useState } from "react";
import {  useDebounce } from "../utils";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProjects } from "../utils/project";
import { useUsers } from "../utils/user";

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debouncedParam = useDebounce(param, 300);
  const {isLoading, error, data: list} = useProjects(debouncedParam)
  const {data: users} = useUsers()

  return (
    <Container>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List dataSource={list || []} users={users || []} loading={isLoading} />
    </Container>
  );
};
const Container = styled.div`
  padding: 3.2rem;
`;
