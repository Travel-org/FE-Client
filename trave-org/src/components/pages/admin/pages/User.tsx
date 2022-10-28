import { TableCell } from "@material-ui/core";
import styled from "@emotion/styled";
import PaginationTable from "../components/PaginationTable";

const Img = styled.div<{ img: string }>`
  width: 30px;
  height: 30px;
  border-radius: 30px;
  margin-left: 10px;
  background-image: url(${({ img }) => img});
  background-position: center;
  background-size: cover;
`;

const User = () => {
  const url = "https://api.dev.travely.guide/v1/admin/users";

  const kps: { title: string; gen: (rowData: any) => React.ReactNode }[] = [
    {
      title: "ID",
      gen: (rowData: any) => (
        <TableCell align="center">
          {rowData.userId}
        </TableCell>
      ),
    },
    {
      title: "이름",
      gen: (rowData: any) => (
        <TableCell align="center">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {rowData.name}
            <Img img={rowData.profilePath} />
          </div>
        </TableCell>
      ),
    },
    {
      title: "이메일",
      gen: (rowData: any) => (
        <TableCell align="center">{rowData.email}</TableCell>
      ),
    },
    {
      title: "휴대폰",
      gen: (rowData: any) => (
        <TableCell align="center">{rowData.phoneNumber}</TableCell>
      ),
    },
    {
      title: "권한",
      gen: (rowData: any) => (
        <TableCell align="center">{rowData.userType}</TableCell>
      ),
    },
  ];
  return <PaginationTable url={url} kps={kps}></PaginationTable>;
};

export default User;