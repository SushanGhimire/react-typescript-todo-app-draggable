import React, { useState, useRef, useEffect } from "react";
import { Todo } from "./model";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Draggable } from "react-beautiful-dnd";

interface Props {
  index: number;
  data: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo: React.FC<Props> = ({ index, data, todos, setTodos }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(data.todo);

  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };
  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setIsEdit((preval) => !preval);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [isEdit]);
  return (
    <Draggable draggableId={data.id.toString()} index={index}>
      {(provided) => (
        <form
          className="todos__single"
          onSubmit={(e) => handleEdit(e, data.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {isEdit ? (
            <>
              <input
                ref={inputRef}
                value={editTodo}
                name="todo"
                onChange={(e) => setEditTodo(e.target.value)}
                className="todos__single--text"
              />
            </>
          ) : (
            <>
              {data.isDone ? (
                <s className="todos__single--text">{data.todo}</s>
              ) : (
                <span className="todos__single--text">{data.todo}</span>
              )}
            </>
          )}
          <div>
            <span
              className="icon"
              onClick={() => {
                if (!data.isDone) {
                  setIsEdit((preval) => !preval);
                }
              }}
            >
              <AiFillEdit />
            </span>
            <span className="icon" onClick={() => handleDelete(data.id)}>
              {" "}
              <AiFillDelete />
            </span>
            <span className="icon" onClick={() => handleDone(data.id)}>
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
