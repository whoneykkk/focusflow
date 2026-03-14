import React from 'react';
import type { Schedule as ScheduleType } from '../calendar-data';
import { hexToRgba } from '../shared/color-utils';

interface ScheduleProps {
  schedule: ScheduleType;
}

export function Schedule({ schedule }: ScheduleProps) {
  const bgColor = hexToRgba(schedule.color, 0.1);
  return (
    <div
      className="border-l-4 p-2"
      style={{ backgroundColor: bgColor, borderColor: schedule.color, minHeight: 60 }}
    >
      <p className="text-[1em] text-black" style={{ fontWeight: 800 }}>
        {schedule.title}
      </p>
      <p className="text-[0.75em] mt-0.5" style={{ color: schedule.color, fontWeight: 400 }}>
        {schedule.isAllDay ? '하루종일' : schedule.time}
      </p>
      {schedule.memo && (
        <p className="text-[0.75em] text-[#94a3b8] mt-0.5" style={{ fontWeight: 400 }}>
          {schedule.memo}
        </p>
      )}
    </div>
  );
}
