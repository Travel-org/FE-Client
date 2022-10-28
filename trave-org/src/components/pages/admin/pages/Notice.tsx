import { TableCell } from "@material-ui/core";
import styled from "@emotion/styled";
import PaginationTable from "../components/PaginationTable";

const Notice = () => {
  const url = "https://api.dev.travely.guide/v1/admin/notices";

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
  return <PaginationTable url={url} kps={kps}></PaginationTable>;
};

export default Notice;