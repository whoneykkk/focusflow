import React from 'react';

const DAY_NAMES = ['일', '월', '화', '수', '목', '금', '토'];

interface CalendarDayHeaderProps {
  viewType: 'weekly' | 'monthly';
}

export function CalendarDayHeader({ viewType: _ }: CalendarDayHeaderProps) {
  return (
    <div className="grid grid-cols-7">
      {DAY_NAMES.map((name, i) => {
        const isSunday = i === 0;
        const isSaturday = i === 6;

        const dayNameColor = isSunday
          ? 'text-red-500'
          : isSaturday
          ? 'text-[#0044ff]'
          : 'text-black';

        return (
          <div key={i} className="text-center py-2">
            <span className={`text-[1em] ${dayNameColor}`} style={{ fontWeight: 800 }}>
              {name}
            </span>
          </div>
        );
      })}
    </div>
  );
}
