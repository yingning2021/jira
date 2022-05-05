import { FormEvent } from "react";
import { useAuth } from "../context/auth-context";

export const RegisterScreen = () => {
  const { login, user } = useAuth();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    // 阻止默认的提交行为
    event.preventDefault();
    const username = (event.currentTarget.elements[0] as HTMLInputElement)
      .value;
    const password = (event.currentTarget.elements[1] as HTMLInputElement)
      .value;
    await login({ username, password });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" id="username" />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="password" id="password" />
      </div>
      <button type="submit">注册</button>
    </form>
  );
};
