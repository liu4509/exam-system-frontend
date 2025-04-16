import { Button, message, Popconfirm } from "antd";
import "./index.scss";
import { useEffect, useState } from "react";
import {
  examDelete,
  examList,
  examPublish,
  examUndelete,
  examUnpublish,
} from "../../interfaces/exam";
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
  const [bin, setBin] = useState(false);

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

  const changPublishState = async (id: number, publish: boolean) => {
    try {
      const res = publish ? await examUnpublish(id) : await examPublish(id);
      if (res.status === 200 || res.status === 201) {
        message.success(res.data.data);
        query();
      }
    } catch (error: any) {
      message.error(
        error.response?.data?.data?.message || "系统繁忙，请稍后再试"
      );
    }
  };
  const deleteExam = async (id: number) => {
    try {
      const res = await examDelete(id);
      if (res.status === 200 || res.status === 201) {
        message.success(res.data.data);
        query();
      }
    } catch (error: any) {
      message.error(
        error.response?.data?.data?.message || "系统繁忙，请稍后再试"
      );
    }
  };
  const undeleteExam = async (id: number) => {
    try {
      const res = await examUndelete(id);
      if (res.status === 200 || res.status === 201) {
        message.success(res.data.data);
        query();
      }
    } catch (error: any) {
      message.error(
        error.response?.data?.data?.message || "系统繁忙，请稍后再试"
      );
    }
  };

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
          <Button
            onClick={() => {
              setBin((bin) => !bin);
            }}
          >
            {bin ? "退出回收站" : "打开回收站"}
          </Button>
        </div>
        <div className="list">
          {list
            ?.filter((item) => {
              return bin ? item.isDelete === true : item.isDelete === false;
            })
            .map((item) => {
              return (
                <div className="item" key={item.id}>
                  <p>{item.name}</p>
                  {item.isDelete ? (
                    <div className="btns">
                      <Button
                        className="btn"
                        type="primary"
                        style={{ background: "green" }}
                        onClick={() => undeleteExam(item.id)}
                      >
                        恢复
                      </Button>
                    </div>
                  ) : (
                    <div className="btns">
                      <Button
                        className="btn"
                        type="primary"
                        style={{ background: "darkblue" }}
                        onClick={() =>
                          changPublishState(item.id, item.isPublish)
                        }
                      >
                        {item.isPublish ? "停止" : "发布"}
                      </Button>
                      <Button
                        className="btn"
                        type="primary"
                        style={
                          item.isPublish
                            ? { color: "black" }
                            : { background: "green" }
                        }
                        disabled={item.isPublish}
                        onClick={() => console.log("编辑")}
                      >
                        编辑
                      </Button>
                      <Popconfirm
                        title={"试卷删除"}
                        description={"请确认放入回收站吗?"}
                        onConfirm={() => deleteExam(item.id)}
                        okText={"Yes"}
                        cancelText={"No"}
                      >
                        <Button
                          className="btn"
                          type="primary"
                          style={
                            item.isPublish
                              ? { color: "black" }
                              : { background: "darkred" }
                          }
                          disabled={item.isPublish}
                        >
                          删除
                        </Button>
                      </Popconfirm>
                    </div>
                  )}
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
