import React from 'react';
import { CheckCircleFadedIcon, BrightnessIcon, ArrowForwardIcon } from '../icons';
import type { Todo } from '../calendar-data';

interface TodoItemProps {
  todo: Todo;
  isCompleted: boolean;
  onToggle: () => void;
}

export function TodoItem({ todo, isCompleted, onToggle }: TodoItemProps) {
  return (
    <div className="flex items-center gap-[0.3125rem]">
      <button onClick={onToggle} className="shrink-0">
        {isCompleted ? (
          <CheckCircleFadedIcon size={15} />
        ) : (
          <BrightnessIcon
            color={todo.isUrgent ? '#FF0000' : '#1C1B1F'}
            size={15}
          />
        )}
      </button>
      <span
        className={`text-[1em] whitespace-nowrap ${
          isCompleted
            ? 'text-black/60 line-through'
            : todo.isUrgent
            ? 'text-red-500'
            : 'text-black'
        }`}
        style={{ fontWeight: 400 }}
      >
        {todo.text}
      </span>
      {todo.hasArrow && (
        <ArrowForwardIcon
          color={todo.isUrgent ? '#FF0000' : '#1C1B1F'}
          size={15}
        />
      )}
    </div>
  );
}
