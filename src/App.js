import React, { useState, useRef, useCallback } from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

const App = () => {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: '리액트의 기초 알아보기',
      checked: true,
    },
    {
      id: 2,
      text: '컴포넌트 스타일링 해보기 ',
      checked: true,
    },
    {
      id: 3,
      text: '일정관리 앱 만들기 ',
      checked: false,
    },
  ]);

  //고윳값으로 사용될 id
  //ref 사용해서 변수 담기
  const nextId = useRef(4);

  const onInsert = useCallback(
    (text) => {
      const todo = {
        id: nextId.current,
        text: text,
        checked: false,
      };

      const nextTodos = todos.concat(todo);
      setTodos(nextTodos);
      nextId.current++;
    },
    [todos],
  );

  const onRemove = useCallback(
    (id) => {
      const nextTodos = todos.filter((todo) => todo.id !== id);
      setTodos(nextTodos);
    },
    [todos],
  );

  const onToggle = useCallback(
    (id) => {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, checked: !todo.checked } : todo,
        ),
      );
    },
    [todos],
  );

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
};

export default App;
