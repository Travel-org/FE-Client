import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Link from "next/link";
import { Menu, Row, Col } from 'antd';
import { useRouter } from 'next/router'


function getItem(label, key, children, type) {
    return {
        key,
        children,
        label,
        type,
    };
}

const items = [
    getItem('is better', 'sub1', [
        getItem('홈', 'home'),
        getItem('내 여행', 'admin'),
        getItem('친구', 'friend'),
        getItem('피드', 'feed'),
        getItem('공지사항', 'notice'),
        getItem('이벤트', 'event'),
        getItem('설정', 'set'),
        getItem('로그아웃', '/'),
    ]),
];

const SideLayout = ({ children }) => {
    const router = useRouter();
    let domain = router.pathname;
    const a = domain.split(/[/]/)[1];

    const [current, setCurrent] = useState(`${a}`);
    const onClick = (e) => {
        setCurrent(e.key);
        const pageMove = () => router.push(`/${e.key}`);
        pageMove();
    };
    return (
        <div>
            <Row>
                <Col span={6}>
                    <Link href="/"><a style={{ marginLeft: 20, fontSize: 30, }}>Travel</a></Link>
                    <Menu
                        onClick={onClick}
                        style={{
                            width: 256,
                        }}
                        defaultOpenKeys={['sub1']}
                        selectedKeys={current}
                        mode="inline"
                        items={items}
                    />
                </Col>
                <Col span={18}>
                    {children}
                </Col>
            </Row>
        </div>
    );
};

SideLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default SideLayout;