import { List, Rate } from "antd";
import Avatar from "react-avatar";

const FeedbackList = ({ reviews }) => {
  return (
    <List
      itemLayout="vertical"
      dataSource={reviews}
      renderItem={(review) => (
        <List.Item key={review.comment_id}>
          <List.Item.Meta
            avatar={
              <Avatar
                src={review.user?.avatar || review.user?.username}
                size="35"
                round={true}
              />
            }
            title={review.user.username}
            description={
              <Rate allowHalf disabled defaultValue={review.rating} />
            }
          />
          <div>{review.content}</div>
        </List.Item>
      )}
    />
  );
};

export default FeedbackList;
