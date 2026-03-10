export interface Project {
  id: string;
  name: string;
  color: string;
  bgColor: string;
  icon: 'check' | 'clock' | 'circle';
  dDay: number;
}

export interface CalendarEvent {
  id: string;
  projectId: string;
  startDate: Date;
  endDate: Date;
}

export interface Schedule {
  id: string;
  title: string;
  time?: string;
  color: string;
  date: Date;
  memo?: string;
  isAllDay?: boolean;
}

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  date: Date;
  isUrgent?: boolean;
  hasArrow?: boolean;
}

export interface StickyNote {
  id: string;
  text: string;
  color: 'yellow' | 'purple';
  date: Date;
}

export interface DayStats {
  date: Date;
  eyeCount?: number;
  chatCount?: number;
  calendarCount?: number;
  moveCount?: number;
}

import { differenceInDays } from 'date-fns';

export interface EventRow {
  event: CalendarEvent;
  row: number;
}

export function getEventsForWeek(weekDays: Date[], events: CalendarEvent[]): EventRow[] {
  const rows: EventRow[] = [];
  const usedRows: boolean[][] = weekDays.map(() => []);
  const weekStart = weekDays[0];
  const weekEnd = weekDays[6];

  events.forEach((event) => {
    if (event.endDate < weekStart || event.startDate > weekEnd) return;

    const startIdx = Math.max(0, differenceInDays(event.startDate, weekStart));
    const endIdx = Math.min(6, differenceInDays(event.endDate, weekStart));

    let row = 0;
    let found = false;
    while (!found) {
      found = true;
      for (let i = startIdx; i <= endIdx; i++) {
        if (usedRows[i][row]) {
          found = false;
          row++;
          break;
        }
      }
    }

    for (let i = startIdx; i <= endIdx; i++) {
      while (usedRows[i].length <= row) usedRows[i].push(false);
      usedRows[i][row] = true;
    }

    rows.push({ event, row });
  });

  return rows;
}

export const projects: Project[] = [
  {
    id: 'byline',
    name: '바이라인',
    color: '#4bb988',
    bgColor: '#e9ffdb',
    icon: 'check',
    dDay: 3,
  },
  {
    id: 'pizza',
    name: '피자',
    color: '#1ca3d2',
    bgColor: '#cbecff',
    icon: 'clock',
    dDay: 3,
  },
  {
    id: 'club',
    name: '동아리 서류 접수',
    color: '#dc4858',
    bgColor: '#ff9e97',
    icon: 'circle',
    dDay: 2,
  },
];

export const calendarEvents: CalendarEvent[] = [
  {
    id: 'ev1',
    projectId: 'byline',
    startDate: new Date(2026, 2, 1),
    endDate: new Date(2026, 2, 4),
  },
  {
    id: 'ev2',
    projectId: 'byline',
    startDate: new Date(2026, 2, 8),
    endDate: new Date(2026, 2, 14),
  },
  {
    id: 'ev3',
    projectId: 'pizza',
    startDate: new Date(2026, 2, 3),
    endDate: new Date(2026, 2, 10),
  },
  {
    id: 'ev4',
    projectId: 'club',
    startDate: new Date(2026, 2, 15),
    endDate: new Date(2026, 2, 17),
  },
];

export const schedules: Schedule[] = [
  {
    id: 'sch1',
    title: '대생미 줌 OT',
    time: '16:00-17:00',
    color: '#368ce2',
    date: new Date(2026, 2, 9),
    memo: '아이패드 충전해두기',
  },
  {
    id: 'sch2',
    title: '컴퓨팅적 사고',
    time: '16:00-17:00',
    color: '#368ce2',
    date: new Date(2026, 2, 10),
    memo: '아이패드 충전해두기',
  },
  {
    id: 'sch3',
    title: 'LMS 점검',
    color: '#ff0000',
    date: new Date(2026, 2, 11),
    memo: '졸업하려면 꼭 챙겨야 함 ㅠㅠ',
    isAllDay: true,
  },
];

export const todos: Todo[] = [
  {
    id: 'todo1',
    text: '보카 DAY1',
    completed: true,
    date: new Date(2026, 2, 9),
  },
  {
    id: 'todo2',
    text: '650+ DAY1',
    completed: false,
    date: new Date(2026, 2, 9),
    isUrgent: true,
    hasArrow: true,
  },
  {
    id: 'todo3',
    text: '보카 DAY2',
    completed: false,
    date: new Date(2026, 2, 10),
    hasArrow: true,
  },
  {
    id: 'todo4',
    text: '650+ DAY2',
    completed: false,
    date: new Date(2026, 2, 10),
    hasArrow: true,
  },
];

export const stickyNotes: StickyNote[] = [
  {
    id: 'note1',
    text: '시험까지 별로 안남았으니까 빼먹지 말고 꼭 하자',
    color: 'yellow',
    date: new Date(2026, 2, 9),
  },
  {
    id: 'note2',
    text: '동아리 접수할 때 구비해야하는 서류 잘 확인하고 지원할 것',
    color: 'purple',
    date: new Date(2026, 2, 11),
  },
];

export const dayStats: DayStats[] = [
  { date: new Date(2026, 2, 3), eyeCount: 3, chatCount: 2 },
  { date: new Date(2026, 2, 4), chatCount: 2 },
  { date: new Date(2026, 2, 10), eyeCount: 2 },
  { date: new Date(2026, 2, 10), eyeCount: 3, chatCount: 2, calendarCount: 3 },
  { date: new Date(2026, 2, 18), eyeCount: 3, chatCount: 2, calendarCount: 3 },
];
