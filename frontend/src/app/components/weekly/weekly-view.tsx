import React, { useState } from 'react';
import {
  startOfWeek,
  addDays,
  isSameDay,
  differenceInDays,
} from 'date-fns';
import { projects, calendarEvents, schedules, todos, stickyNotes, getEventsForWeek, type Todo } from '../calendar-data';
import { CalendarDayHeader } from '../shared/calendar-day-header';
import { VerticalGridLines } from '../shared/vertical-grid-lines';
import { DayNumber } from '../shared/day-number';
import { EventLabel } from '../shared/event-label';
import { ScheduleCard } from './schedule-card';
import { TodoItem } from './todo-item';
import { StickyNote } from './sticky-note';

interface WeeklyViewProps {
  currentDate: Date;
}

// em 기준 레이아웃 상수 (14px 기준)
const D = 2;        // 날짜 숫자 행 높이
const EV_GAP = 0.7; // 이벤트 바 상단 여백
const EV_STEP = 2.9; // 이벤트 바 행 높이
const EV_H = '2.1em'; // 이벤트 바 높이
const STACK_TOP = 6.4; // 스택 시작 top

export function WeeklyView({ currentDate }: WeeklyViewProps) {
  const today = new Date();
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const weekEnd = weekDays[6];

  const [todoState, setTodoState] = useState<Record<string, boolean>>(() => {
    const state: Record<string, boolean> = {};
    todos.forEach((t) => {
      state[t.id] = t.completed;
    });
    return state;
  });

  const toggleTodo = (id: string) => {
    setTodoState((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const weekEvents = calendarEvents.filter(
    (ev) => ev.endDate >= weekStart && ev.startDate <= weekEnd
  );
  const eventRows = getEventsForWeek(weekDays, weekEvents);

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <CalendarDayHeader viewType="weekly" />

      {/* Content Area */}
      <div className="flex-1 relative" style={{ minHeight: '50em' }}>
        <VerticalGridLines />

        {/* Date numbers */}
        {weekDays.map((day, i) => (
          <div
            key={i}
            className="absolute px-1 pt-1 z-10"
            style={{ left: `${(i / 7) * 100}%`, width: `${(1 / 7) * 100}%`, top: 0 }}
          >
            <DayNumber day={day} currentDate={currentDate} today={today} />
          </div>
        ))}

        {/* Today highlight column */}
        {weekDays.findIndex((d) => isSameDay(d, today)) >= 0 && (
          <div
            className="absolute top-0 bottom-0"
            style={{
              left: `${(weekDays.findIndex((d) => isSameDay(d, today)) / 7) * 100}%`,
              width: `${(1 / 7) * 100}%`,
            }}
          />
        )}

        {/* Project event bars */}
        {eventRows.map(({ event, row }) => {
          const project = projects.find((p) => p.id === event.projectId);
          if (!project) return null;

          const barStart = event.startDate < weekStart ? weekStart : event.startDate;
          const barEnd = event.endDate > weekEnd ? weekEnd : event.endDate;
          const startIdx = differenceInDays(barStart, weekStart);
          const endIdx = differenceInDays(barEnd, weekStart);
          const span = endIdx - startIdx + 1;

          const leftPct = (startIdx / 7) * 100;
          const widthPct = (span / 7) * 100;
          const endsThisWeek = event.endDate <= weekEnd;

          return (
            <div
              key={event.id}
              className="absolute z-10"
              style={{
                left: `${leftPct}%`,
                width: `${widthPct}%`,
                top: `${D + EV_GAP + row * EV_STEP}em`,
                height: EV_H,
              }}
            >
              <div
                className="h-full rounded-r-[5px] flex items-center justify-end pr-2 gap-[0.5em]"
                style={{ backgroundColor: project.bgColor }}
              >
                {endsThisWeek && <EventLabel project={project} variant="weekly" />}
              </div>
            </div>
          );
        })}

        {/* Schedules + Todos + Sticky Notes (Top-aligned stack) */}
        {weekDays.map((day, dayIdx) => {
          const daySchedules = schedules.filter((schedule) => isSameDay(schedule.date, day));
          const dayTodos: Todo[] = todos.filter((todo) => isSameDay(todo.date, day));
          const dayNotes = stickyNotes.filter((note) => isSameDay(note.date, day));
          const items = [
            ...daySchedules.map((schedule) => ({ type: 'schedule' as const, id: schedule.id, schedule })),
            ...dayTodos.map((todo) => ({ type: 'todo' as const, id: todo.id, todo })),
            ...dayNotes.map((note) => ({ type: 'note' as const, id: note.id, note })),
          ];

          if (items.length === 0) return null;

          const leftPct = (dayIdx / 7) * 100;

          return (
            <div
              key={`day-stack-${dayIdx}`}
              className="absolute z-20"
              style={{
                left: `calc(${leftPct}% + 0.35em)`,
                width: `calc(${(1 / 7) * 100}% - 0.7em)`,
                top: `${D + STACK_TOP}em`,
              }}
            >
              <div className="flex flex-col items-start gap-[0.5em]">
                {items.map((item) => (
                  <div key={item.id} className="w-full">
                    {item.type === 'schedule' ? (
                      <ScheduleCard schedule={item.schedule} />
                    ) : item.type === 'todo' ? (
                      <TodoItem
                        todo={item.todo}
                        isCompleted={todoState[item.todo.id]}
                        onToggle={() => toggleTodo(item.todo.id)}
                      />
                    ) : (
                      <StickyNote note={item.note} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
