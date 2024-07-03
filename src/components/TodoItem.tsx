import cn from 'classnames';
import { Todo } from '../types/Todo';
import { useEffect, useRef, useState } from 'react';

interface Props {
  todoId: number;
  todoTitle: string;
  isCompleted: boolean;
  handleTodoClick: (id: number) => void;
  deleteTodos: (id: number) => void;
  isSubmitting: Todo | null;
  deletingTodo: number;
  currentTodos: number[];
}

export const TodoItem: React.FC<Props> = ({
  todoId,
  todoTitle,
  isCompleted,
  handleTodoClick,
  deleteTodos,
  isSubmitting,
  deletingTodo,
  currentTodos,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const id = currentTodos.find(currentId => currentId === todoId);

  const handleChange =
    isSubmitting?.id === todoId || deletingTodo === todoId || id;

  const itemRef = useRef<HTMLInputElement>(null);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleEscape = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setIsEditing(false);
    }
  };

  useEffect(() => {
    if (itemRef.current) {
      itemRef.current.focus();
    }
  }, [isEditing]);

  return (
    <div
      key={todoId}
      data-cy="Todo"
      className={cn('todo', { completed: isCompleted })}
      onDoubleClick={handleDoubleClick}
    >
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className="todo__status-label" htmlFor={`todo-${todoId}`}>
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          id={`todo-${todoId}`}
          checked={isCompleted}
          onChange={() => handleTodoClick(todoId)}
        />
      </label>

      {isEditing ? (
        <form action="">
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            id={`todo-${todoId}`}
            defaultValue={todoTitle}
            ref={itemRef}
            onBlur={() => setIsEditing(false)}
            onKeyUp={handleEscape}
          />
        </form>
      ) : (
        <>
          <span data-cy="TodoTitle" className="todo__title" ref={itemRef}>
            {todoTitle}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => deleteTodos(todoId)}
          >
            ×
          </button>
        </>
      )}

      <div
        data-cy="TodoLoader"
        className={cn('modal overlay', {
          'is-active': handleChange,
        })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
