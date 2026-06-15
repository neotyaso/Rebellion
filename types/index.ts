

export interface Course {
    id: string;
    name: string;
    room: string;
    dayOfWeek: '月' | '火' | '水' | '木' | '金'; 
    period: number;   
    color: string;
}

export interface TimetableData {
  [day: string]: {
    [period: number]: Course | null; 
  };
}