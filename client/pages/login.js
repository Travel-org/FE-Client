import React from 'react';
import AppLayout from '../components/Applayout';
import Head from 'next/head';

const Login = () => {
    return (
        <div>
            <Head>
                <title>로그인 | Travel</title>
            </Head>
            <AppLayout>로그인페이지</AppLayout>
        </div>
    );
};

export default Login;