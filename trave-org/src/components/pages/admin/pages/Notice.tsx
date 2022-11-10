import { TableCell } from "@material-ui/core";
import styled from "@emotion/styled";
import PaginationTable from "../components/PaginationTable";
import { css } from "@emotion/react";
import { useState } from "react";
import  CreateNoticeModal  from "../components/CreateNoticeModal";

const Notice = () => {
  const url = "https://api.dev.travely.guide/v1/admin/notices";
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  }

  const closeModal = () => {
    setModalOpen(false);
  }

  const kps: { title: string; gen: (rowData: any) => React.ReactNode }[] = [
    {
      title: "ID",
      gen: (rowData: any) => (
        <TableCell align="center">
          {rowData.noticeId}
        </TableCell>
      ),
    },
    {
      title: "제목",
      gen: (rowData: any) => (
        <TableCell align="center">
          {rowData.title}
        </TableCell>
      ),
    },
    {
      title: "작성자",
      gen: (rowData: any) => (
        <TableCell align="center">{rowData.authorName}</TableCell>
      ),
    },
  ];
  return <>
  <PaginationTable url={url} kps={kps}></PaginationTable>
  <button css={
        css`
          background-color: grey;
          border: none;
          color: white;
          padding: 20px;
          text-align: center;
          text-decoration: none;
          display: flex;
          font-size: 16px;
          margin: 2px 1.5px;
          border-radius: 50%;
          position: relative;
          margin-top: 20px;
          margin-left: 87%;
          :hover {
            opacity: 50%
          }
        `} onClick={openModal}>글쓰기</button>
    <CreateNoticeModal open={modalOpen} close={closeModal} />
</>;
};

export default Notice;