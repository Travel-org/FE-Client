import React, { useCallback } from 'react';
import { Button, Menu } from 'antd';
import Link from 'next/link';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../reducers/user';

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
    const { isLoggedIn } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const onLogOut = useCallback(() => {
        dispatch(logoutAction());
    }, [])
    return (
        <div>
            <Menu mode="horizontal">
                <Menu.Item>
                    <Link href="/"><a>Travel</a></Link>
                </Menu.Item>
                <Menu.Item>
                    {isLoggedIn ? <a onClick={onLogOut}>로그아웃</a> : <Link href="/login"><a>로그인</a></Link>}
                </Menu.Item>
                <Menu.Item>
                    <Link href="/signup"><a>회원가입</a></Link>
                </Menu.Item>
            </Menu>
            <Mainpage>
                <h1>지금 여행을 <br />
                    계획해보세요</h1>
                <h3>여러 사람들과 함께 계획을 세워보세요.</h3>
                {isLoggedIn ? <Button><Link href="/home"><a>시작하기</a></Link></Button> : <Button><Link href="/login"><a>시작하기</a></Link></Button>}
                </Mainpage>
        </div>
    );
};

export default Home;