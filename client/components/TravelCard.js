import { Card, Avatar, } from 'antd';
import React from 'react';
const { Meta } = Card;
import PropTypes from 'prop-types';

const TravelCard = ({ post }) => {
  return (
    <Card
      style={{
        width: 200,
        margin: 10
      }}
      cover={<img src={"/travel.jpg"} />}
    >
      <Meta
        avatar={<Avatar>{post.nickname[0]}</Avatar>}
        title={post.content}
        description={`${post.Fday}~${post.Lday}`}
      />
    </Card>
  );
};

TravelCard.propTypes = {
  post: PropTypes.object.isRequired,
};

export default TravelCard;