import React from "react";
import Head from "next/head";
import SideLayout from "../components/SideLayout";

const Notice = () => {
    return (
        <SideLayout>
            <Head>
                <title>내 여행 | Travel</title>
            </Head>
            <div>
                <h3>Notice</h3>
            </div>
        </SideLayout>
    );
};

export default Notice;
