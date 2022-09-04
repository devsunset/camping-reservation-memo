import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
// import Button from '../common/Button';
import palette from '../../lib/styles/palette';
import SubInfo from '../common/SubInfo';
import Tags from '../common/Tags';
import { Link } from 'react-router-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useNavigate } from 'react-router-dom';

const PostListBlock = styled(Responsive)`
  margin-top: 3rem;
`;

// const WritePostButtonWrapper = styled.div`
//   display: flex;
//   justify-content: flex-end;
//   margin-bottom: 3rem;
// `;

const PostItemBlock = styled.div`
  padding-top: 3rem;
  padding-bottom: 3rem;
  /* 맨 위 포스트는 padding-top 없음 */
  &:first-child {
    padding-top: 0;
  }
  & + & {
    border-top: 1px solid ${palette.gray[2]};
  }

  h2 {
    font-size: 2rem;
    margin-bottom: 0;
    margin-top: 0;
    &:hover {
      color: ${palette.gray[6]};
    }
  }
  p {
    margin-top: 2rem;
  }
`;

const PostItem = ({ post }) => {
  const { publishedDate, user, tags, title, body, _id } = post;

  return (
    <PostItemBlock>
      <h2>
        <Link to={`/@${user.username}/${_id}`}>{title}</Link>
      </h2>
      <SubInfo
        username={user.username}
        publishedDate={new Date(publishedDate)}
      />
      <Tags tags={tags} />
      <p>{body}</p>
    </PostItemBlock>
  );
};

const PostList = ({ posts, loading, error, showWriteButton }) => {
  const navigate = useNavigate();

  // 에러 발생 시
  if (error) {
    return <PostListBlock>에러가 발생했습니다.</PostListBlock>;
  }

  moment.locale('ko-KR');
  const localizer = momentLocalizer(moment);

  let reservation_day = [];

  if (!loading && posts) {
    posts.forEach((item) => {
      console.log(item);

      reservation_day.push({
        title: item.title,
        allDay: true,
        start: new Date(2022, 8, 9),
        end: new Date(2022, 8, 9),
        id: item._id,
        username: item.user.username,
      });
    });
  }

  return (
    <PostListBlock>
      <Calendar
        localizer={localizer}
        longPressThreshold={10}
        events={reservation_day}
        views={['month']}
        selectable
        onSelectSlot={(e) => {
          if (Date.now() - 1 > e.start) {
            alert('과거 날짜 작성 불가. ');
            return;
          }

          alert(
            e.start.getFullYear() +
              '-' +
              (e.start.getMonth() < 10
                ? '0' + (e.start.getMonth() + 1)
                : e.start.getMonth() + 1) +
              '-' +
              (e.start.getDate() < 10
                ? '0' + e.start.getDate()
                : e.start.getDate()),
          );
          navigate(
            '/write?reservation_day=' +
              e.start.getFullYear() +
              '-' +
              (e.start.getMonth() < 10
                ? '0' + (e.start.getMonth() + 1)
                : e.start.getMonth() + 1) +
              '-' +
              (e.start.getDate() < 10
                ? '0' + e.start.getDate()
                : e.start.getDate()),
          );
        }}
        onSelectEvent={(event) => {
          navigate('/@' + event.username + '/' + event.id);
        }}
        style={{ height: 400 }}
      />
      &nbsp;
      <p />
      &nbsp;
      <p />
      {/* <WritePostButtonWrapper>
        {showWriteButton && (
          <Button cyan to="/write">
            새 글 작성하기
          </Button>
        )}
      </WritePostButtonWrapper> */}
      {/*  로딩 중 아니고, 포스트 배열이 존재할 때만 보여줌 */}
      {!loading && posts && (
        <div>
          {posts.map((post) => (
            <PostItem post={post} key={post._id} />
          ))}
        </div>
      )}
    </PostListBlock>
  );
};

export default PostList;
