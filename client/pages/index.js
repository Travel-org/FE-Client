import React, { useState } from 'react';
import AppLayout from '../components/Applayout';
import { Button } from 'antd';
import Link from 'next/link';
import styled from 'styled-components';

const Mainpage = styled.div`
    width: 100%;
    heigt: 100%;
    background-image: url("/travel.jpg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    
    & h1 {
        margin-left: 2em;
        font-size: 3rem;
        padding-top: 150px;
        font-weight: bold;
    }

    & h3 {
        font-size: 1.5rem;
        margin-left: 4em;
        font-weight: bold;
    }

    & Button {
        margin-left: 7em;
        margin-top: 3em;
        margin-bottom: 5em;
    }

    & a {
        font-weight: bold;
    }
`;

const Home = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    return (
        <div>
            <AppLayout>
            </AppLayout>
            <Mainpage>
                <h1>지금 여행을 <br />
                    계획해보세요</h1>
                <h3>여러 사람들과 함께 계획을 세워보세요.</h3>
                {isLoggedIn ? <Button><Link href="/admin"><a>시작하기</a></Link></Button> : <Button><Link href="/login"><a>시작하기</a></Link></Button>}
            </Mainpage>
        </div>
    );
};

export default Home;