import { TableCell, Button } from "@material-ui/core";
import styled from "@emotion/styled";
import PaginationTable from "../components/PaginationTable";
import { css } from "@emotion/react";
import { useState } from "react";
import CreateNoticeModal from "../components/CreateNoticeModal";
import Modal from "@src/components/modal";

const Notice = () => {
  const url = "https://api.dev.travely.guide/v1/admin/notices";
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const kps: { title: string; gen: (rowData: any) => React.ReactNode }[] = [
    {
      title: "ID",
      gen: (rowData: any) => (
        <TableCell align="center">{rowData.noticeId}</TableCell>
      ),
    },
    {
      title: "제목",
      gen: (rowData: any) => (
        <TableCell align="center">{rowData.title}</TableCell>
      ),
    },
    {
      title: "작성자",
      gen: (rowData: any) => (
        <TableCell align="center">{rowData.authorName}</TableCell>
      ),
    },
    {
      title: "상세 페이지",
      gen: (rowData: any) => (
        <TableCell align="center">
          <a href={`/admin/notices/${rowData.noticeId}`}>
            상세 보기
          </a>
        </TableCell>
      ),
    },
  ];
  return (
    <>
      {modalOpen && (
        <Modal onClick={closeModal}>
          <CreateNoticeModal open={modalOpen} close={closeModal} />
        </Modal>
      )}
      <PaginationTable url={url} kps={kps}>
        <div style={{ display: "flex", justifyContent: "right", width: "90%" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={openModal}
            style={{ marginTop: "10px" }}
          >
            생성하기
          </Button>
        </div>
      </PaginationTable>
    </>
  );
};

export default Notice;