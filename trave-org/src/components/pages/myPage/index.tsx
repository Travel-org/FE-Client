import { api } from "@src/app/api/api";
import { Container } from "./styles"

const MyPage = () => {
    const {data: myData} = api.useGetMyInfoQuery();
    return (
        <Container>
            {
                myData!==undefined && Object.entries(myData).map(([key,value])=>(
                    <div>{`${key}:${value}`}</div>
                ))
            }
        </Container>
    );
}

export default MyPage;