import React from "react";
import Head from "next/head";
import SideLayout from "../components/SideLayout";


const Admin = () => {
    return (
        <SideLayout>
            <Head>
                <title>내 여행 | Travel</title>
            </Head>
            <div>
                <h3>내 여행</h3>
            </div>
        </SideLayout>
    );
};

export default Admin;
