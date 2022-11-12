import { TableCell } from "@material-ui/core";
import PaginationTable from "../components/PaginationTable";

const Travel = () => {
  const url = "https://api.dev.travely.guide/v1/admin/travels";
  const kps: { title: string; gen: (rowData: any) => React.ReactNode }[] = [
    {
      title: "ID",
      gen: (rowData: any) => <TableCell align="center">{rowData.id}</TableCell>,
    },
    {
      title: "제목",
      gen: (rowData: any) => (
        <TableCell align="center">
        <a href={window.location.href + "/" + rowData.id}>{rowData.title}</a>
      </TableCell>
      ),
    },
    {
      title: "시작 날짜",
      gen: (rowData: any) => (
        <TableCell align="center">{rowData.startDate}</TableCell>
      ),
    },
    {
      title: "종료 날짜",
      gen: (rowData: any) => (
        <TableCell align="center">{rowData.endDate}</TableCell>
      ),
    },
    {
      title: "방장",
      gen: (rowData: any) => (
        <TableCell align="center">{rowData.managerId}</TableCell>
      ),
    },
  ];
  return <PaginationTable url={url} kps={kps}></PaginationTable>;
};

export default Travel;