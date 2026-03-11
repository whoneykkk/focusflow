import React from 'react';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
} from 'date-fns';
import { projects } from '../calendar-data';
import { DDayBadge } from '../icons';

interface SidebarProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
  selectedDate: Date;
}

export function Sidebar({ currentDate, onDateChange, selectedDate }: SidebarProps) {
  const today = new Date();

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const calEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });
  const days = eachDayOfInterval({ start: calStart, end: calEnd });

  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <div className="w-[200px] shrink-0 px-3 pt-4">
      {/* Mini Calendar Header */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-[1em] text-black" style={{ fontWeight: 700 }}>
          {format(currentDate, 'yyyy')}년 {format(currentDate, 'M')}월
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onDateChange(subMonths(currentDate, 1))}
            className="p-0.5 hover:bg-gray-100 rounded"
          >
            <svg width="0.75em" height="0.75em" viewBox="0 0 10 10" fill="none">
              <path d="M3.97925 5L7.04175 8.0625C7.14591 8.16666 7.19626 8.28819 7.19279 8.42708C7.18932 8.56597 7.1355 8.6875 7.03133 8.79166C6.92716 8.89583 6.80564 8.94791 6.66675 8.94791C6.52786 8.94791 6.40633 8.89583 6.30216 8.79166L3.09383 5.59375C3.0105 5.51041 2.948 5.41666 2.90633 5.3125C2.86466 5.20833 2.84383 5.10416 2.84383 5C2.84383 4.89583 2.86466 4.79166 2.90633 4.6875C2.948 4.58333 3.0105 4.48958 3.09383 4.40625L6.30216 1.19791C6.40633 1.09375 6.5296 1.0434 6.67196 1.04687C6.81432 1.05034 6.93758 1.10416 7.04175 1.20833C7.14591 1.3125 7.198 1.43402 7.198 1.57291C7.198 1.7118 7.14591 1.83333 7.04175 1.9375L3.97925 5Z" fill="#1C1B1F" />
            </svg>
          </button>
          <button
            onClick={() => onDateChange(addMonths(currentDate, 1))}
            className="p-0.5 hover:bg-gray-100 rounded"
          >
            <svg width="0.75em" height="0.75em" viewBox="0 0 10 10" fill="none" style={{ transform: 'rotate(180deg)' }}>
              <path d="M3.97925 5L7.04175 8.0625C7.14591 8.16666 7.19626 8.28819 7.19279 8.42708C7.18932 8.56597 7.1355 8.6875 7.03133 8.79166C6.92716 8.89583 6.80564 8.94791 6.66675 8.94791C6.52786 8.94791 6.40633 8.89583 6.30216 8.79166L3.09383 5.59375C3.0105 5.51041 2.948 5.41666 2.90633 5.3125C2.86466 5.20833 2.84383 5.10416 2.84383 5C2.84383 4.89583 2.86466 4.79166 2.90633 4.6875C2.948 4.58333 3.0105 4.48958 3.09383 4.40625L6.30216 1.19791C6.40633 1.09375 6.5296 1.0434 6.67196 1.04687C6.81432 1.05034 6.93758 1.10416 7.04175 1.20833C7.14591 1.3125 7.198 1.43402 7.198 1.57291C7.198 1.7118 7.14591 1.83333 7.04175 1.9375L3.97925 5Z" fill="#1C1B1F" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mini Calendar Grid */}
      <div className="grid grid-cols-7 gap-0">
        {dayNames.map((name) => (
          <div key={name} className="text-[0.8em] text-center text-black/60 py-0.5" style={{ fontWeight: 700 }}>
            {name}
          </div>
        ))}
      </div>
      {/* 날짜 행 - 4~6주 변동에도 Projects 위치 고정 */}
      <div className="grid grid-cols-7 gap-0 mb-6" style={{ height: '8.5em', alignContent: 'start' }}>
        {days.map((day) => {
          const isCurrentMonth = isSameMonth(day, currentDate);
          const isToday = isSameDay(day, today);
          const dayOfWeek = day.getDay();
          const isSunday = dayOfWeek === 0;
          const isSaturday = dayOfWeek === 6;

          return (
            <div
              key={day.toISOString()}
              className="relative flex items-center justify-center py-[1px]"
            >
              {isToday && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[1.3em] h-[1.3em] rounded-full bg-[#368CE2]/20" />
                </div>
              )}
              <span
                className={`text-[0.8em] relative z-10 ${
                  !isCurrentMonth
                    ? 'text-black/30'
                    : isSunday
                    ? 'text-red-500'
                    : isSaturday
                    ? 'text-blue-600'
                    : 'text-black'
                }`}
                style={{ fontWeight: 700 }}
              >
                {format(day, 'd')}
              </span>
            </div>
          );
        })}
      </div>

      {/* Projects */}
      <div>
        <p className="text-[1em] text-black mb-2" style={{ fontWeight: 700}}>
          프로젝트
        </p>
        <div className="flex flex-col gap-2">
          {projects.map((project) => (
            <div key={project.id} className="flex items-center gap-[0.5em]">
              <span className="text-[1em] text-black" style={{ fontWeight: 400}}>
                {project.name}
              </span>
              <DDayBadge dDay={project.dDay} color={project.color} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
