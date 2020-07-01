import React, { useState, useRef, useCallback } from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

//성능을 최적화 하기 위해서 React.memo를 사용하여 컴포넌트 성능을 최적화 시킬 수 있다. (TodoListItem.js)
//즉, 컴포넌트의 props가 바뀌지 않았다면 리렌더링하지 않도록 설정 필요 --> React.memo()
function createBulkTodos() {
  const array = [];
  for (let i = 1; i <= 2500; i++) {
    array.push({
      id: i,
      text: `할일 ${i}`,
      checked: false,
    });
  }
  return array;
}

const App = () => {
  const [todos, setTodos] = useState(createBulkTodos); //createBulkTodos()라고 하면 리렌더링될 때마다 함수가 호출되지만, createBulkTodos 함수 형태로 넣어주면 컴포넌트가 처음 렌더링 될 때만 호출된다.

  //고윳값으로 사용될 id
  //ref 사용해서 변수 담기
  const nextId = useRef(4);

  const onInsert = useCallback((text) => {
    const todo = {
      id: nextId.current,
      text: text,
      checked: false,
    };

    // useState의 함수형 업데이트로 성능 최적화
    // const nextTodos = todos.concat(todo);
    // setTodos(nextTodos);
    setTodos((todos) => todos.concat(todo));
    nextId.current++;
  });

  const onRemove = useCallback((id) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  });

  const onToggle = useCallback((id) => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo,
      ),
    );
  });

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
};

export default App;
