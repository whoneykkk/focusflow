import React from 'react';
import type { StickyNote as StickyNoteType } from '../calendar-data';

interface StickyNoteProps {
  note: StickyNoteType;
}

export function StickyNote({ note }: StickyNoteProps) {
  const isYellow = note.color === 'yellow';

  return (
    <div className="relative">
      <svg width="100%" height="55" viewBox="0 0 164 55" preserveAspectRatio="none">
        <path
          d="M0 55V0H164V40.5L150 55H0Z"
          fill={isYellow ? '#FFF6BF' : '#EBCFFF'}
        />
        <path
          d="M164 40.5L150 55V40.5H164Z"
          fill={isYellow ? '#E9C821' : '#7D51AA'}
        />
      </svg>
      <div className="absolute inset-0 p-[10px] pr-[20px]">
        <p className="text-[10px] text-black" style={{ fontWeight: 400, lineHeight: '15px' }}>
          {note.text}
        </p>
      </div>
    </div>
  );
}
