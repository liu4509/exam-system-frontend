import { Form, Input, message, Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import { examAdd } from "../../interfaces/exam";

export interface ExamAdd {
  name: string;
  content?: string;
}
interface ExamAddModalProps {
  isOpen: boolean;
  handleClose: () => void;
}
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

export const ExamAddModal = (props: ExamAddModalProps) => {
  const [form] = useForm<ExamAdd>();
  const handleOk = async () => {
    await form.validateFields();

    const values = form.getFieldsValue();

    try {
      const res = await examAdd(values);
      if (res.status === 200 || res.status === 201) {
        message.success("创建成功");
        form.resetFields();
        props.handleClose();
      }
    } catch (error: any) {
      message.error(
        error.response?.data?.data?.message || "系统繁忙，请稍后再试"
      );
    }
  };
  return (
    <Modal
      title={"新增试卷"}
      open={props.isOpen}
      onOk={handleOk}
      onCancel={() => props.handleClose()}
      okText={"创建"}
      cancelText={"取消"}
    >
      <Form form={form} colon={false} {...layout}>
        <Form.Item
          label={"试卷名"}
          name={"name"}
          rules={[{ required: true, message: "请输入试卷名!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label={"内容"} name={"content"}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
