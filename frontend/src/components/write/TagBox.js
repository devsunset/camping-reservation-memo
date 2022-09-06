import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const TagBoxBlock = styled.div`
  width: 100%;
  border-top: 1px solid ${palette.gray[2]};
  padding-top: 2rem;

  h1 {
    color: ${palette.gray[8]};
    margin: 0rem;
    padding: 1rem;
  }
`;

const TagForm = styled.form`
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  margin-left: 1rem;
  width: 100%;
  input,
  button {
    outline: none;
    border: none;
    font-size: 1rem;
  }

  input {
    padding-left: 0.5rem;
    flex: 1;
  }
  button {
    cursor: pointer;
    padding-right: 1rem;
    padding-left: 1rem;
    border: none;
    background: ${palette.gray[8]};
    color: white;
    font-weight: bold;
    &:hover {
      background: ${palette.gray[6]};
    }
  }
`;

const Tag = styled.div`
  margin-right: 0.5rem;
  color: ${palette.gray[6]};
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
`;

const TagListBlock = styled.div`
  display: flex;
  margin-top: 0.5rem;
`;

// React.memo를 사용하여 tag 값이 바뀔 때만 리렌더링되도록 처리
const TagItem = React.memo(({ tag, onRemove, onChangeTags }) => (
  // <Tag onClick={() => onRemove(tag)}>#{tag}</Tag>
  <Tag>
    <h1>일정 : {tag}</h1>
  </Tag>
));

// React.memo를 사용하여 tags 값이 바뀔 때만 리렌더링되도록 처리
const TagList = React.memo(({ tags, onRemove }) => (
  <TagListBlock>
    {tags.map((tag) => (
      <TagItem key={tag} tag={tag} onRemove={onRemove} />
    ))}
  </TagListBlock>
));

const TagBox = ({ tags, onChangeTags }) => {
  const [input, setInput] = useState('');
  const [localTags, setLocalTags] = useState([]);

  const insertTag = useCallback(
    (tag) => {
      if (!tag) return; // 공백이라면 추가하지 않음
      if (localTags.includes(tag)) return; // 이미 존재한다면 추가하지 않음
      const nextTags = [...localTags, tag];
      setLocalTags(nextTags);
      onChangeTags(nextTags);
    },
    [localTags, onChangeTags],
  );

  const onRemove = useCallback(
    (tag) => {
      const nextTags = localTags.filter((t) => t !== tag);
      setLocalTags(nextTags);
      onChangeTags(nextTags);
    },
    [localTags, onChangeTags],
  );

  const onChange = useCallback((e) => {
    setInput(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      insertTag(input.trim()); // 앞뒤 공백 없앤 후 등록
      setInput(''); // input 초기화
    },
    [input, insertTag],
  );

  const search = useLocation().search;
  const reservation_day = new URLSearchParams(search).get('reservation_day');

  const checkValidDate = (value) => {
    let result = true;
    try {
      let date = value.split('-');
      let y = parseInt(date[0], 10),
        m = parseInt(date[1], 10),
        d = parseInt(date[2], 10);

      let dateRegex =
        /^(?=\d)(?:(?:31(?!.(?:0?[2469]|11))|(?:30|29)(?!.0?2)|29(?=.0?2.(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))(?:\x20|$))|(?:2[0-8]|1\d|0?[1-9]))([-.\/])(?:1[012]|0?[1-9])\1(?:1[6-9]|[2-9]\d)?\d\d(?:(?=\x20\d)\x20|$))?(((0?[1-9]|1[012])(:[0-5]\d){0,2}(\x20[AP]M))|([01]\d|2[0-3])(:[0-5]\d){1,2})?$/;
      result = dateRegex.test(d + '-' + m + '-' + y);
    } catch (err) {
      result = false;
    }
    return result;
  };

  const navigate = useNavigate();

  // tags 값이 바뀔 때
  useEffect(() => {
    if (
      reservation_day !== undefined &&
      reservation_day !== null &&
      reservation_day !== ''
    ) {
      if (!checkValidDate(reservation_day)) {
        alert('잘못된 접근 입니다.');
        navigate('/');
      }
      insertTag(reservation_day);
    } else {
      if (tags.length === 0) {
        alert('잘못된 접근 입니다.');
        navigate('/');
      }
    }
    setLocalTags(tags);
  }, [tags]);

  return (
    <TagBoxBlock>
      {/* <h1>&nbsp;&nbsp;&nbsp;&nbsp;Schedule</h1> */}
      <TagForm onSubmit={onSubmit}>
        <input
          type="hidden"
          placeholder="Schedule"
          value={input}
          onChange={onChange}
        />
        {/* <button type="submit">추가</button> */}
      </TagForm>
      <TagList tags={localTags} onRemove={onRemove} />
    </TagBoxBlock>
  );
};

export default TagBox;
