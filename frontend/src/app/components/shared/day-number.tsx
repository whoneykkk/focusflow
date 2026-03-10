import React from 'react';
import { format, isSameDay, isSameMonth } from 'date-fns';

interface DayNumberProps {
  day: Date;
  currentDate: Date;
  today: Date;
}

export function DayNumber({ day, currentDate, today }: DayNumberProps) {
  const isCurrentMonth = isSameMonth(day, currentDate);
  const dayOfWeek = day.getDay();
  const isSunday = dayOfWeek === 0;
  const isSaturday = dayOfWeek === 6;
  const isToday = isSameDay(day, today);

  const label = !isCurrentMonth ? format(day, 'M/d') : format(day, 'd');
  const color = !isCurrentMonth
    ? 'text-black/40'
    : isSunday
    ? 'text-red-500'
    : isSaturday
    ? 'text-[#0044ff]'
    : 'text-black';

  return (
    <div className="flex justify-center">
      <div className={`relative flex items-center justify-center ${isToday ? 'w-[1.5em] h-[1.5em]' : ''}`}>
        {isToday && <div className="absolute inset-0 rounded-full bg-[#368CE2]/20" />}
        <span className={`text-[1em] relative z-10 ${color}`} style={{ fontWeight: 800 }}>
          {label}
        </span>
      </div>
    </div>
  );
}
