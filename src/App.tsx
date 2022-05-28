import React, { useState } from "react";
import InputField from "./components/InputField";
import { Todo } from "./components/model";
import TodoList from "./components/TodoList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo !== "") {
      setTodos([...todos, { id: Date.now(), todo: todo, isDone: false }]);
      setTodo("");
    }
  };

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (destination === null) return;
    if (
      destination?.droppableId === source?.droppableId &&
      destination?.index === source?.index
    )
      return;

    let add;
    let active = todos;
    let complete = completedTodos;
    if (source.droppableId === "Todoslist") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    if (destination?.droppableId === "Todoslist") {
      active.splice(destination?.index, 0, add);
    } else {
      if (destination !== undefined) {
        complete.splice(destination?.index, 0, add);
      }
    }

    setCompletedTodos(complete);
    setTodos(active);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="App">
        <span className="heading">Vatizfy</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
