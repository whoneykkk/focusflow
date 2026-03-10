import React from 'react';
import { EyeIcon, ChatIcon, CalendarSmallIcon, MoveToIcon } from '../icons';

interface DayStatsProps {
  eye?: number;
  chat?: number;
  cal?: number;
  move?: number;
}

export function DayStats({ eye, chat, cal, move }: DayStatsProps) {
  return (
    <div className="flex items-center gap-1.5">
      {move !== undefined && (
        <div className="flex items-center gap-0.5">
          <MoveToIcon size={10} />
          <span className="text-[0.75em] text-black/50">{move}</span>
        </div>
      )}
      {eye !== undefined && (
        <div className="flex items-center gap-0.5">
          <EyeIcon size={10} />
          <span className="text-[0.75em] text-black/50">{eye}</span>
        </div>
      )}
      {chat !== undefined && (
        <div className="flex items-center gap-0.5">
          <ChatIcon size={10} />
          <span className="text-[0.75em] text-black/50">{chat}</span>
        </div>
      )}
      {cal !== undefined && (
        <div className="flex items-center gap-0.5">
          <CalendarSmallIcon size={10} />
          <span className="text-[0.75em] text-black/50">{cal}</span>
        </div>
      )}
    </div>
  );
}
