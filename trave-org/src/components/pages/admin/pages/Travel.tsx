import { TableCell, Button } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import PaginationTable from "../components/PaginationTable";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  })
);

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
  return (
    <PaginationTable url={url} kps={kps}>
      <div style={{ display: "flex", justifyContent: "right", width: "90%" }}>
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: "10px" }}
        >
          생성하기
        </Button>
      </div>
    </PaginationTable>
  );
};

export default Travel;