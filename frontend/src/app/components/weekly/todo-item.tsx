import React from 'react';
import { CheckCircleFadedIcon, BrightnessIcon, ArrowForwardIcon } from '../icons';
import type { Todo } from '../calendar-data';

interface TodoItemProps {
  todo: Todo;
  isCompleted: boolean;
  onToggle: () => void;
  onMoveToNext?: () => void;
}

export function TodoItem({ todo, isCompleted, onToggle, onMoveToNext }: TodoItemProps) {
  return (
    <div className="flex items-center gap-[0.3125rem] w-full">
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
        <button onClick={onMoveToNext} className="ml-auto shrink-0">
          <ArrowForwardIcon
            color={todo.isUrgent ? '#FF0000' : '#1C1B1F'}
            size={15}
          />
        </button>
      )}
    </div>
  );
}
