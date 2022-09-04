import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import Button from '../common/Button';
import palette from '../../lib/styles/palette';
import SubInfo from '../common/SubInfo';
import Tags from '../common/Tags';
import { Link } from 'react-router-dom';
import Calendar from '@toast-ui/react-calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';

const PostListBlock = styled(Responsive)`
  margin-top: 3rem;
`;

const WritePostButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 3rem;
`;

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
  // 에러 발생 시
  if (error) {
    return <PostListBlock>에러가 발생했습니다.</PostListBlock>;
  }

  return (
    <PostListBlock>
      <Calendar
        height="300px"
        calendars={[
          {
            id: '0',
            name: 'Private',
            bgColor: '#9e5fff',
            borderColor: '#9e5fff',
          },
          {
            id: '1',
            name: 'Company',
            bgColor: '#00a9ff',
            borderColor: '#00a9ff',
          },
        ]}
        disableDblClick={true}
        disableClick={false}
        isReadOnly={false}
        month={{
          startDayOfWeek: 0,
        }}
        schedules={[
          {
            id: '1',
            calendarId: '0',
            title: 'TOAST UI Calendar Study',
            category: 'time',
            dueDateClass: '',
            start: '2022-09-28T12:00:00',
            end: '2022-09-28T13:30:00',
          },
          {
            id: '2',
            calendarId: '0',
            title: 'Practice',
            category: 'milestone',
            dueDateClass: '',
            start: '2022-09-28T12:00:00',
            end: '2022-09-28T13:30:00',
            isReadOnly: true,
          },
          {
            id: '3',
            calendarId: '0',
            title: 'FE Workshop',
            category: 'allday',
            dueDateClass: '',
            start: '2022-09-28T12:00:00',
            end: '2022-09-28T13:30:00',
            isReadOnly: true,
          },
          {
            id: '4',
            calendarId: '0',
            title: 'Report',
            category: 'time',
            dueDateClass: '',
            start: '2022-09-28T12:00:00',
            end: '2022-09-28T13:30:00',
          },
        ]}
        scheduleView
        taskView
        template={{
          milestone(schedule) {
            return `<span style="color:#fff;background-color: ${schedule.bgColor};">${schedule.title}</span>`;
          },
          milestoneTitle() {
            return 'Milestone';
          },
          allday(schedule) {
            return `${schedule.title}<i class="fa fa-refresh"></i>`;
          },
          alldayTitle() {
            return 'All Day';
          },
        }}
        // theme={myTheme}
        timezones={[
          {
            timezoneOffset: 540,
            displayLabel: 'GMT+09:00',
            tooltip: 'Seoul',
          },
          {
            timezoneOffset: -420,
            displayLabel: 'GMT-08:00',
            tooltip: 'Los Angeles',
          },
        ]}
        useDetailPopup
        useCreationPopup
        view={'month'} // You can also set the `defaultView` option.
        week={{
          showTimezoneCollapseButton: true,
          timezonesCollapsed: true,
        }}
      />
      <WritePostButtonWrapper>
        {showWriteButton && (
          <Button cyan to="/write">
            새 글 작성하기
          </Button>
        )}
      </WritePostButtonWrapper>
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
