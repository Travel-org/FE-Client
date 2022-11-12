import { TableCell, IconButton } from "@material-ui/core";
import styled from "@emotion/styled";
import PaginationTable from "../components/PaginationTable";

const Event = () => {
  const url = "https://api.dev.travely.guide/v1/admin/events";

  const kps: { title: string; gen: (rowData: any) => React.ReactNode }[] = [
    {
      title: "ID",
      gen: (rowData: any) => (
        <TableCell align="center">{rowData.eventId}</TableCell>
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
  ];
  return <PaginationTable url={url} kps={kps}></PaginationTable>;
};

export default Event;