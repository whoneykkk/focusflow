import React from 'react';
import type { Schedule } from '../calendar-data';

interface ScheduleCardProps {
  schedule: Schedule;
}

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function ScheduleCard({ schedule }: ScheduleCardProps) {
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
