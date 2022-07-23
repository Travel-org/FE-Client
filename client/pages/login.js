import React, { useCallback, useState } from 'react';
import AppLayout from '../components/Applayout';
import Head from 'next/head';
import { Form, Input, Button, Checkbox } from 'antd';
import Link from 'next/link';

const Login = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const onChangeId = useCallback((e) => {
        setId(e.target.value);
    }, []);

    const onChangePassword = useCallback((e) => {
        setPassword(e.target.value);
    }, []);

    const onSubmitForm = useCallback(() => {
        console.log(id, password);
    }, [id, password]);

    return (
        <div>
            <Head>
                <title>로그인 | Travel</title>
            </Head>
            <AppLayout>
                <Form
                    name="basic"
                    labelCol={{ span: 10 }}
                    wrapperCol={{ span: 5 }}
                    initialValues={{ remember: true }}
                    autoComplete="off"
                    onFinish={onSubmitForm}
                >
                    <Form.Item
                        label="아이디"
                        name="username"
                        rules={[{ required: true, message: '아이디를 입력해주세요!' }]}
                    >
                        <Input value={id} onChange={onChangeId} />
                    </Form.Item>

                    <Form.Item
                        label="비밀번호"
                        name="password"
                        rules={[{ required: true, message: '비밀번호를 입력해주세요!' }]}
                    >
                        <Input.Password value={password} onChange={onChangePassword} />
                    </Form.Item>

                    <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 10, span: 10 }}>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 10, span: 10 }}>
                        <Button type="primary" htmlType="submit"><Link href="/home"><a>로그인</a></Link></Button>
                        <Link href="/signup"><a><Button>회원가입</Button></a></Link>
                    </Form.Item>
                </Form>
            </AppLayout>
        </div>
    );
};

export default Login;