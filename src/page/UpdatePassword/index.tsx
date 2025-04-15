import { Button, Form, Input, message } from "antd";
import { useForm } from "antd/es/form/Form";
import { useNavigate } from "react-router-dom";
import { forgotCaptcha, forgotPassword } from "../../interfaces";

const layout1 = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

export interface UpdatePassword {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  captcha: string;
}

export function UpdatePassword() {
  const [form] = useForm<UpdatePassword>();
  const navigate = useNavigate();

  const onFinish = async (value: UpdatePassword) => {
    if (value.password !== value.confirmPassword) {
      return message.error("两次密码不一致");
    }
    try {
      const res = await forgotPassword(value);
      if (res.status === 201 || res.status === 200) {
        message.success(res.data);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (error: any) {
      message.error(error?.response?.data?.message || "注册失败，请稍后重试");
    }
  };

  async function sendCaptcha() {
    const address = form.getFieldValue("email");
    if (!address) {
      return message.error("请输入邮箱地址");
    }
    try {
      const res = await forgotCaptcha(address);
      if (res.status === 201 || res.status === 200) {
        message.success(res.data);
      }
    } catch (error: any) {
      message.error(
        error?.response?.data?.message || "获取验证码失败，请稍后重试"
      );
    }
  }

  return (
    <div id="register-container">
      <h1>考试系统</h1>
      <Form
        form={form}
        {...layout1}
        colon={false}
        autoComplete="off"
        onFinish={onFinish}
      >
        <Form.Item
          label={"用户名"}
          name={"username"}
          rules={[{ required: true, message: "请输入用户名" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"邮箱"}
          name={"email"}
          rules={[
            { required: true, message: "请输入密码" },
            { type: "email", message: "请输入合法地址" },
          ]}
        >
          <Input />
        </Form.Item>
        <div className="captcha-wrapper">
          <Form.Item
            label={"验证码"}
            name={"captcha"}
            rules={[{ required: true, message: "请输入验证码" }]}
          >
            <Input />
          </Form.Item>
          <Button type="primary" onClick={sendCaptcha}>
            发送验证码
          </Button>
        </div>
        <Form.Item
          label={"密码"}
          name={"password"}
          rules={[{ required: true, message: "请输入密码" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label={"确认密码"}
          name={"confirmPassword"}
          rules={[{ required: true, message: "请输入确认密码" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item {...layout1} label=" ">
          <Button className="btn" type="primary" htmlType="submit">
            修改
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
