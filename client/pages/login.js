import React, { useCallback, useState } from 'react';
import Head from 'next/head';
import { Form, Input, Button, Checkbox } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux';
import { loginAction } from '../reducers';

const Login = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    
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
        dispatch(loginAction({ id, password }));
        const pageMove = () => router.push(`/`);
        pageMove();
    }, [id, password]);


    return (
        <div>
            <Head>
                <title>로그인 | Travel</title>
            </Head>
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
                        <Button type="primary" htmlType="submit">로그인</Button>
                        <Link href="/signup"><a><Button>회원가입</Button></a></Link>
                    </Form.Item>
                </Form>
        </div>
    );
};

export default Login;