import { useAuth } from "../context/auth-context";
import { Form, Input } from "antd";
import { LongButton } from "./index";
import { useAsync } from "../screens/utils/use-async";

export const LoginScreen = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  const { login } = useAuth();
  const { run, isLoading, error, isError } = useAsync(undefined, {
    throwOnError: true,
  });

  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    // 阻止默认的提交行为
    try {
      await run(login(values));
    } catch (e) {
      onError(e as Error);
    }
  };
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder={"用户名"} type={"text"} id={"username"} />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input placeholder={"密码"} type={"password"} id={"password"} />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType={"submit"} type="primary">
          登陆
        </LongButton>
      </Form.Item>
    </Form>
  );
};
