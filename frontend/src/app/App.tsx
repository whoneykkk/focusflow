import React, { useState } from 'react';
import { Sidebar } from './components/layout/sidebar';
import { CalendarHeader } from './components/layout/calendar-header';
import { MonthlyView } from './components/monthly/monthly-view';
import { WeeklyView } from './components/weekly/weekly-view';

export default function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'monthly' | 'weekly'>('monthly');

  return (
    <div className="flex h-full w-full bg-white overflow-hidden" style={{ fontFamily: "'NanumSquare', sans-serif", fontSize: 'clamp(11px, 0.94vw, 14px)' }}>
      {/* Left Sidebar */}
      <div>
      {/*<div className="border-r border-black/10 shrink-0">*/}
        <Sidebar
          currentDate={currentDate}
          onDateChange={setCurrentDate}
          selectedDate={currentDate}
        />
      </div>

      {/* Main Calendar Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <CalendarHeader
          currentDate={currentDate}
          onDateChange={setCurrentDate}
          view={view}
          onViewChange={setView}
        />
        <div className="flex-1 overflow-auto border-l border-black/10">
          {view === 'monthly' ? (
            <MonthlyView currentDate={currentDate} />
          ) : (
            <WeeklyView currentDate={currentDate} />
          )}
        </div>
      </div>
    </div>
  );
}
