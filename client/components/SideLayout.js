import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Link from "next/link";
import { Menu, Row, Col, Avatar } from 'antd';
import { useRouter } from 'next/router'
import { logoutAction } from '../reducers/user';
import { useDispatch } from 'react-redux';


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
        getItem('로그아웃', 'logout'),
    ]),
];

const SideLayout = ({ children }) => {
    const router = useRouter();
    let domain = router.pathname;
    const a = domain.split(/[/]/)[1];
    const dispatch = useDispatch();

    const [current, setCurrent] = useState(`${a}`);
    const onClick = (e) => {
        setCurrent(e.key);
        if (e.key === 'logout') {
            dispatch(logoutAction());
            const pageMove = () => router.push(`/`);
            pageMove();
        } else {
            const pageMove = () => router.push(`/${e.key}`);
            pageMove();
        }
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
                    <Avatar style={{ marginTop: '1rem', marginLeft: '60em', backgroundColor: '#99ccff', verticalAlign: 'middle' }} size="large" gap={1}>
                        PKB
                    </Avatar>
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