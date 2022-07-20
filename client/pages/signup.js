import React from 'react';
import AppLayout from '../components/Applayout';
import Head from 'next/head';

const Signup = () => {
    return (
        <div>
            <Head>
                <title>회원가입 | Travel</title>
            </Head>
            <AppLayout>회원가입 페이지</AppLayout>
        </div>
    );
};

export default Signup;