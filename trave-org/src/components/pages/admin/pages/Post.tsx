import { Button, TableCell } from "@material-ui/core";
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

const Post = () => {
  const url = "https://api.dev.travely.guide/v1/admin/posts";

  const kps: { title: string; gen: (rowData: any) => React.ReactNode }[] = [
    {
      title: "ID",
      gen: (rowData: any) => (
        <TableCell align="center">{rowData.postId}</TableCell>
      ),
    },
    {
      title: "글쓴이",
      gen: (rowData: any) => (
        <TableCell align="center">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {rowData.userInfo.userName}
            <Img img={rowData.userInfo.profilePath} />
          </div>
        </TableCell>
      ),
    },
    {
      title: "일정",
      gen: (rowData: any) => (
        <TableCell align="center">{rowData.scheduleId}</TableCell>
      ),
    },
    {
      title: "제목",
      gen: (rowData: any) => (
        <TableCell align="center">{rowData.title}</TableCell>
      ),
    },
    {
      title: "생성 일자",
      gen: (rowData: any) => (
        <TableCell align="center">{rowData.createdAt}</TableCell>
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

export default Post;