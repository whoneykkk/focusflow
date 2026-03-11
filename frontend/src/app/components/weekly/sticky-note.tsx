import React from 'react';
import type { StickyNote as StickyNoteType } from '../calendar-data';

interface StickyNoteProps {
  note: StickyNoteType;
}

const NOTE_BACKGROUND_BY_COLOR = {
  purple: '#EBCFFF',
  skyblue: '#B3E5FC',
  green: '#E9FFDB',
  orange: '#FFDBA7',
  yellow: '#FFF6BF',
  salmon: '#FFD4C4',
  red: '#FF9E97',
  pink: '#FFE4ED',
} as const;

const NOTE_CORNER_BY_COLOR = {
  purple: '#7D51AA',
  skyblue: '#368CE2',
  green: '#4BB988',
  orange: '#FF9B3F',
  yellow: '#E9C821',
  salmon: '#F08D72',
  red: '#DC4858',
  pink: '#E289AD',
} as const;

const CUT_SIZE = '1em';

export function StickyNote({ note }: StickyNoteProps) {
  const backgroundColor = NOTE_BACKGROUND_BY_COLOR[note.color];
  const cornerColor = NOTE_CORNER_BY_COLOR[note.color];

  return (
    <div className="relative">
      <div
        className="relative px-[0.75em] pt-[0.75em] pb-[1.5em]"
        style={{
          backgroundColor,
          clipPath: `polygon(0 0, 100% 0, 100% calc(100% - ${CUT_SIZE}), calc(100% - ${CUT_SIZE}) 100%, 0 100%)`,
        }}
      >
        <p className="text-[0.75em] font-normal text-black">{note.text}</p>
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0"
        style={{
          width: CUT_SIZE,
          height: CUT_SIZE,
          backgroundColor: cornerColor,
          clipPath: 'polygon(0 100%, 100% 0, 100% 100%)',
          transform: 'rotate(180deg)',
          transformOrigin: 'center',
        }}
      />
    </div>
  );
}
