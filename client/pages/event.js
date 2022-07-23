import React from "react";
import Head from "next/head";
import SideLayout from "../components/SideLayout";

const Event = () => {
    return (
        <SideLayout>
            <Head>
                <title>내 여행 | Travel</title>
            </Head>
            <div>
                <h3>Event</h3>
            </div>
        </SideLayout>
    );
};

export default Event;
