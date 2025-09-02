export interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  completedAt?: Date;
}

export type TaskFilter = 'all' | 'active' | 'completed';

export interface TaskStats {
  total: number;
  completed: number;
  active: number;
  completionRate: number;
}