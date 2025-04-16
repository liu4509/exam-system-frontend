import { Button, message } from "antd";
import "./index.scss";
import { useEffect, useState } from "react";
import { examList } from "../../interfaces/exam";
import { ExamAddModal } from "./ExamAddModal";

interface ExamDto {
  id: number;
  name: string;
  isPublish: boolean;
  isDelete: boolean;
  content: string;
  createTime: string;
  updateTime: string;
}

const ExamList = () => {
  const [list, setList] = useState<Array<ExamDto>>();
  const [isExamAddModalOpen, setIsExamAddModalOpen] = useState(false);

  async function query() {
    try {
      const res = await examList();
      if (res.status === 200 || res.status === 201) {
        console.log(res.data.data);
        setList(res.data.data);
      }
    } catch (error: any) {
      message.error(
        error.response?.data?.data?.message || "系统繁忙，请稍后再试"
      );
    }
  }
  useEffect(() => {
    query();
  }, []);

  return (
    <div id="ExamList-container">
      <div className="header">
        <h1>考试系统</h1>
      </div>
      <div className="body">
        <div className="operate">
          <Button type="primary" onClick={() => setIsExamAddModalOpen(true)}>
            新建试卷
          </Button>
        </div>
        <div className="list">
          {list?.map((item) => {
            return (
              <div className="item" key={item.id}>
                <p>{item.name}</p>
                <div className="btns">
                  <Button
                    className="btn"
                    type="primary"
                    style={{ background: "darkblue" }}
                  >
                    发布
                  </Button>
                  <Button
                    className="btn"
                    type="primary"
                    style={{ background: "green" }}
                  >
                    编辑
                  </Button>
                  <Button
                    className="btn"
                    type="primary"
                    style={{ background: "darkred" }}
                  >
                    删除
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <ExamAddModal
        isOpen={isExamAddModalOpen}
        handleClose={() => {
          setIsExamAddModalOpen(false);
          query();
        }}
      />
    </div>
  );
};

export default ExamList;
