import { Button, Form, Input } from 'antd';
import React, { useCallback, useState } from 'react';
import useInput from './hooks/useInput';
import TogetherTravel from './TogetherTravel';
const DetailTravel = () => {
    const [id, onChangeId] = useInput('');
    const [toggle, setToggle] = useState(true);
    const title = [];
    const onSubmit = useCallback(() => {
        title.push(id);
        console.log(id);
        setToggle(false);
    }, [id]);
    return (
        <div>
            <h3>여행의 이름을 알려주세요.</h3>
            {toggle ?  <Form
                name="basic"
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 20 }}
                onFinish={onSubmit}
            >
                <Form.Item>
                    <Input value={id} onChange={onChangeId} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">다음</Button>
                </Form.Item>
            </Form> : <TogetherTravel/>}
        </div>
    );
};

export default DetailTravel;