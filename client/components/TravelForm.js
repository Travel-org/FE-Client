import { Button } from 'antd';
import React, { useCallback, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import Modal from './Modal';
import WhenTravel from './WhenTravel';

const MyTravel = styled(Button)`
      margin-top: 10px;
      width: 200px;
      height: 250px;
      margin-right: 15px;
`
const TravelForm = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const openModal = () => {
    setModalVisible(true)
  }
  const closeModal = () => {
    setModalVisible(false)
  }
  return (
    <div>
    
      <MyTravel onClick={openModal}>
        <PlusOutlined></PlusOutlined>
      </MyTravel>
      { 
          modalVisible && <Modal
            visible={modalVisible}
            closable={true}
            maskClosable={true}
            onClose={closeModal}>
            <h3>새 여행 생성</h3>
            <WhenTravel /></Modal>
        }
    </div>
  );
};

export default TravelForm;