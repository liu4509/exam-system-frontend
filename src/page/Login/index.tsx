import { Button, Form, Input, message } from "antd";
import "./index.css";
import { login } from "../../interfaces/user";
import { useNavigate } from "react-router-dom";

const layout1 = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const layout2 = {
  labelCol: { span: 0 },
  wrapperCol: { span: 24 },
};

interface LoginUser {
  username: string;
  password: string;
}

export function Login() {
  const navigate = useNavigate();

  const onFinish = async (value: LoginUser) => {
    console.log(value);
    try {
      const res = await login(value.username, value.password);
      if (res.status === 201 || res.status === 200) {
        message.success("登录成功");
        setTimeout(() => {
          navigate("/");
        }, 1000);
        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem("userInfo", JSON.stringify(res.data.data.user));
      }
    } catch (error: any) {
      message.error(
        error.response?.data?.data?.message || "系统繁忙，请稍后再试"
      );
    }
  };
  return (
    <div id="login-container">
      <h1>考试系统</h1>
      {/* 表单 */}
      <Form {...layout1} colon={false} autoComplete="off" onFinish={onFinish}>
        {/* <Form {...layout1}> */}
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: "请输入用户名！" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: "请输入密码！" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item {...layout2}>
          <div className="links">
            <a href="/register">创建账号</a>
            <a href="/update_password">忘记密码</a>
          </div>
        </Form.Item>
        <Form.Item {...layout2}>
          <Button className="btn" type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
