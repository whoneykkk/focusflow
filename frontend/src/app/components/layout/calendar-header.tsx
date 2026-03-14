import React from 'react';
import { format, addMonths, subMonths, addWeeks, subWeeks } from 'date-fns';
import { ChevronLeftIcon, ChevronRightIcon, WeekViewIcon, MonthViewIcon } from '../icons';

interface CalendarHeaderProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
  view: 'monthly' | 'weekly';
  onViewChange: (view: 'monthly' | 'weekly') => void;
}

export function CalendarHeader({ currentDate, onDateChange, view, onViewChange }: CalendarHeaderProps) {
  const handlePrev = () => {
    if (view === 'monthly') {
      onDateChange(subMonths(currentDate, 1));
    } else {
      onDateChange(subWeeks(currentDate, 1));
    }
  };

  const handleNext = () => {
    if (view === 'monthly') {
      onDateChange(addMonths(currentDate, 1));
    } else {
      onDateChange(addWeeks(currentDate, 1));
    }
  };

  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <h2 className="text-[1.5em] text-black whitespace-nowrap" style={{ fontWeight: 800 }}>
        {format(currentDate, 'yyyy')}년 {format(currentDate, 'M')}월
      </h2>

      <div className="flex items-center gap-1">
        <button
          onClick={handlePrev}
          className="p-0.5 hover:bg-gray-100 rounded transition-colors"
        >
          <ChevronLeftIcon size="1.25em" />
        </button>
        <button
          onClick={handleNext}
          className="p-0.5 hover:bg-gray-100 rounded transition-colors"
        >
          <ChevronRightIcon size="1.25em" />
        </button>
      </div>

      {/* View Toggle */}
      <div className="flex items-center bg-[#d9d9d9] rounded-[0.3rem] overflow-hidden h-[1.75rem]">
        <button
          onClick={() => onViewChange('weekly')}
          className={`flex items-center justify-center w-[1.75rem] h-[1.75rem] rounded-[0.3rem] transition-colors ${
            view === 'weekly' ? 'bg-black' : ''
          }`}
        >
          <WeekViewIcon active={view === 'weekly'} />
        </button>
        <button
          onClick={() => onViewChange('monthly')}
          className={`flex items-center justify-center w-[1.75rem] h-[1.75rem] rounded-[0.3rem] transition-colors ${
            view === 'monthly' ? 'bg-black' : ''
          }`}
        >
          <MonthViewIcon active={view === 'monthly'} />
        </button>
      </div>
    </div>
  );
}
