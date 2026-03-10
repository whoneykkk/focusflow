import React, { useState } from 'react';
import {
  startOfWeek,
  addDays,
  isSameDay,
  differenceInDays,
} from 'date-fns';
import { projects, calendarEvents, schedules, todos, stickyNotes, getEventsForWeek, type Todo } from '../calendar-data';
import { EventLabel } from '../shared/event-label';
import { CalendarDayHeader } from '../shared/calendar-day-header';
import { VerticalGridLines } from '../shared/vertical-grid-lines';
import { DayNumber } from '../shared/day-number';
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
const SC_TOP = 6.4; // 스케줄 카드 기본 top
const SC_ALLDAY = 1.4; // 종일 스케줄 추가 offset
const TD_TOP = 12;  // 투두 기본 top
const TD_STEP = 1.8; // 투두 행 간격
const NT_YELLOW = 16; // 노란 스티커 top
const NT_OTHER = 24;  // 기타 스티커 top

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
                className="h-full rounded-r-[5px] flex items-center justify-end pr-2 gap-[5px]"
                style={{ backgroundColor: project.bgColor }}
              >
                {endsThisWeek && <EventLabel project={project} textSize="md" />}
              </div>
            </div>
          );
        })}

        {/* Schedule Cards */}
        {schedules.map((schedule) => {
          const dayIdx = weekDays.findIndex((d) => isSameDay(d, schedule.date));
          if (dayIdx < 0) return null;

          const leftPct = (dayIdx / 7) * 100;

          return (
            <div
              key={schedule.id}
              className="absolute z-20"
              style={{
                left: `calc(${leftPct}% + 0.35em)`,
                width: `calc(${(1 / 7) * 100}% - 0.7em)`,
                top: `${D + SC_TOP + (schedule.isAllDay ? SC_ALLDAY : 0)}em`,
              }}
            >
              <ScheduleCard schedule={schedule} />
            </div>
          );
        })}

        {/* Todos */}
        {(() => {
          const todosGrouped: Record<number, Todo[]> = {};
          todos.forEach((todo) => {
            const dayIdx = weekDays.findIndex((d) => isSameDay(d, todo.date));
            if (dayIdx >= 0) {
              if (!todosGrouped[dayIdx]) todosGrouped[dayIdx] = [];
              todosGrouped[dayIdx].push(todo);
            }
          });

          return Object.entries(todosGrouped).map(([dayIdxStr, dayTodos]) => {
            const dayIdx = parseInt(dayIdxStr);
            const leftPct = (dayIdx / 7) * 100;

            return dayTodos.map((todo, i) => (
              <div
                key={todo.id}
                className="absolute z-20"
                style={{
                  left: `calc(${leftPct}% + 0.35em)`,
                  top: `${D + TD_TOP + i * TD_STEP}em`,
                }}
              >
                <TodoItem
                  todo={todo}
                  isCompleted={todoState[todo.id]}
                  onToggle={() => toggleTodo(todo.id)}
                />
              </div>
            ));
          });
        })()}

        {/* Sticky Notes */}
        {stickyNotes.map((note) => {
          const dayIdx = weekDays.findIndex((d) => isSameDay(d, note.date));
          if (dayIdx < 0) return null;

          const leftPct = (dayIdx / 7) * 100;
          const isYellow = note.color === 'yellow';

          return (
            <div
              key={note.id}
              className="absolute z-20"
              style={{
                left: `calc(${leftPct}% + 0.35em)`,
                width: `calc(${(1 / 7) * 100}% - 0.7em)`,
                top: `${D + (isYellow ? NT_YELLOW : NT_OTHER)}em`,
              }}
            >
              <StickyNote note={note} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
