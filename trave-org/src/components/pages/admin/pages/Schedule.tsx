import { TableCell } from "@material-ui/core";
import styled from "@emotion/styled";
import PaginationTable from "../components/PaginationTable";

const Schedule = () => {
  const url = "https://api.dev.travely.guide/v1/admin/schedules";

  const kps: { title: string; gen: (rowData: any) => React.ReactNode }[] = [
    {
      title: "ID",
      gen: (rowData: any) => (
        <TableCell align="center">
          {rowData.scheduleId}
        </TableCell>
      ),
    },
    {
      title: "시작 시간",
      gen: (rowData: any) => (
        <TableCell align="center">
          {rowData.startTime}
        </TableCell>
      ),
    },
    {
      title: "종료 시간",
      gen: (rowData: any) => (
        <TableCell align="center">{rowData.endTime}</TableCell>
      ),
    },
    {
      title: "장소",
      gen: (rowData: any) => (
        <TableCell align="center">{rowData.place.placeName}</TableCell>
      ),
    },
  ];
  return <PaginationTable url={url} kps={kps}></PaginationTable>;
};

export default Schedule;