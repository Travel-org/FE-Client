import React from "react";
import Head from "next/head";
import SideLayout from "../components/SideLayout";

const Feed = () => {
    return (
        <SideLayout>
            <Head>
                <title>내 여행 | Travel</title>
            </Head>
            <div>
                <h3>Feed</h3>
            </div>
        </SideLayout>
    );
};

export default Feed;
