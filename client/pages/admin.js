import React from "react";
import Head from "next/head";
import { Menu, Row, Col } from 'antd';
import Link from "next/link";

const Admin = () => {
    return (
        <div>
            <Head>
                <title>내 여행 | Travel</title>
            </Head>
            <Row>
                <Col span={18} push={6}>
                    빈페이지
                </Col>
                <Col span={6} pull={18}>
                    <Link href="/"><a style={{ marginLeft: 20, fontSize:30, }}>Travel</a></Link>
                    <Menu
                        style={{ width: 256 }}
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                    >
                        <Menu.Item>
                            <div>홈</div>
                        </Menu.Item>
                        <Menu.Item>
                            <div>내여행</div>
                        </Menu.Item>
                        <Menu.Item>
                            <div>친구</div>
                        </Menu.Item>
                        <Menu.Item>
                            <div>피드</div>
                        </Menu.Item>
                        <Menu.Item>
                            <div>공지사항</div>
                        </Menu.Item>
                        <Menu.Item>
                            <div>이벤트</div>
                        </Menu.Item>
                        <Menu.Item>
                            <div>설정</div>
                        </Menu.Item>
                        <Menu.Item>
                            <div>로그아웃</div>
                        </Menu.Item>
                    </Menu>
                </Col>
            </Row>
        </div>
    );
};

export default Admin;