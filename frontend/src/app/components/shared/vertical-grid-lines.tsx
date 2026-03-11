import React from 'react';

// 세로 점선: em 단위로 dash 크기가 폰트 크기에 따라 자동 스케일
const DASH_LINE = 'repeating-linear-gradient(to bottom, rgba(0,0,0,0.3) 0, rgba(0,0,0,0.3) 0.2em, transparent 0.2em, transparent 0.45em)';

export function VerticalGridLines() {
  return (
    <>
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="absolute top-0 bottom-0 pointer-events-none"
          style={{
            left: `${(i / 7) * 100}%`,
            width: '0.0625rem',
            backgroundImage: DASH_LINE,
          }}
        />
      ))}
    </>
  );
}
