import React, { useState, useCallback } from 'react';
import AppLayout from '../components/Applayout';
import Head from 'next/head';
import { useRouter } from 'next/router'
import { Form, Input, Button, Checkbox } from 'antd';
import useInput from '../components/hooks/useInput';
import styled from 'styled-components';


const ErrorMessage = styled.div`
    color: red;
`;
const ErrorTerm = styled.div`
    color: red;
`;

const Signup = () => {
    const router = useRouter();
    const [id, onChangeId] = useInput('');
    const [nickname, onChangeNickname] = useInput('');
    const [password, onChangePassword] = useInput('');

    const [passwordCheck, setPasswordCheck] = useState('');
    const [passwordError, setPasswordError] = useState(false);

    const onChangePasswordCheck = useCallback((e) => {
        setPasswordCheck(e.target.value);
        setPasswordError(e.target.value !== password);
    }, [password]);

    const [term, setTerm] = useState('');
    const [termError, setTermError] = useState(false);
    const onChangeTerm = useCallback((e) => {
        setTerm(e.target.checked);
        setTermError(false)
    }, []);

    const pageMove = () => router.push('/login'); // 회원가입후 페이지 이동

    const onSubmit = useCallback(() => {
        if (password !== passwordCheck) {
            return setPasswordError(true);
        }
        if (!term) {
            return setTermError(true);
        }
        alert('회원가입되었습니다');
        setTimeout(() => { pageMove() }, 1000);
    }, [id, password, nickname, passwordCheck, term]);
    return (
        <div>
            <Head>
                <title>회원가입 | Travel</title>
            </Head>
            <AppLayout>
                <Form
                    name="basic"
                    labelCol={{ span: 10 }}
                    wrapperCol={{ span: 5 }}
                    initialValues={{ remember: true }}
                    autoComplete="off"
                    onFinish={onSubmit}
                >
                    <Form.Item
                        label="아이디"
                        name="username"
                    >
                        <Input value={id} onChange={onChangeId} />
                    </Form.Item>

                    <Form.Item
                        label="닉네임"
                        name="usernickname"
                    >
                        <Input value={nickname} onChange={onChangeNickname} />
                    </Form.Item>

                    <Form.Item
                        label="비밀번호"
                        name="password"
                    >
                        <Input.Password value={password} onChange={onChangePassword} />
                    </Form.Item>

                    <Form.Item
                        label="비밀번호체크"
                        name="passwordCheck"
                    >
                        <Input.Password value={passwordCheck} onChange={onChangePasswordCheck} />
                        {passwordError && <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>}
                    </Form.Item>

                    <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 10, span: 10 }}>
                        <Checkbox name='user-term' checked={term} onChange={onChangeTerm}>박경빈의 말을 잘 들을것 을 동의합니다.</Checkbox>
                        {termError && <ErrorTerm>약관에 동의하셔야합니다.</ErrorTerm>}
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 10, span: 10 }}>
                        <Button type="primary" htmlType="submit">가입하기</Button>
                    </Form.Item>
                </Form>
            </AppLayout>
        </div>
    );
};

export default Signup;