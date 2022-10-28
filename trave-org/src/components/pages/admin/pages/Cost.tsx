import { TableCell } from "@material-ui/core";
import styled from "@emotion/styled";
import PaginationTable from "../components/PaginationTable";

const Cost = () => {
  const url = "https://api.dev.travely.guide/v1/admin/costs";

  const kps: { title: string; gen: (rowData: any) => React.ReactNode }[] = [
    {
      title: "ID",
      gen: (rowData: any) => (
        <TableCell align="center">
          {rowData.costId}
        </TableCell>
      ),
    },
    {
      title: "정산 금액",
      gen: (rowData: any) => (
        <TableCell align="center">
          {rowData.totalAmount}
        </TableCell>
      ),
    },
    {
      title: "제목",
      gen: (rowData: any) => (
        <TableCell align="center">{rowData.title}</TableCell>
      ),
    },
    {
      title: "결제자",
      gen: (rowData: any) => (
        <TableCell align="center">{rowData.payerId}</TableCell>
      ),
    },
  ];
  return <PaginationTable url={url} kps={kps}></PaginationTable>;
};

export default Cost;