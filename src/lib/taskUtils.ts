import { Task, TaskFilter, TaskStats } from '@/types/task';

export const generateTaskId = (): string => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

export const createTask = (text: string): Task => {
  return {
    id: generateTaskId(),
    text: text.trim(),
    completed: false,
    createdAt: new Date(),
  };
};

export const toggleTaskCompletion = (task: Task): Task => {
  return {
    ...task,
    completed: !task.completed,
    completedAt: !task.completed ? new Date() : undefined,
  };
};

export const updateTaskText = (task: Task, newText: string): Task => {
  return {
    ...task,
    text: newText.trim(),
  };
};

export const filterTasks = (tasks: Task[], filter: TaskFilter): Task[] => {
  switch (filter) {
    case 'active':
      return tasks.filter(task => !task.completed);
    case 'completed':
      return tasks.filter(task => task.completed);
    default:
      return tasks;
  }
};

export const calculateTaskStats = (tasks: Task[]): TaskStats => {
  const total = tasks.length;
  const completed = tasks.filter(task => task.completed).length;
  const active = total - completed;
  const completionRate = total === 0 ? 0 : Math.round((completed / total) * 100);

  return {
    total,
    completed,
    active,
    completionRate,
  };
};

export const sortTasks = (tasks: Task[]): Task[] => {
  return [...tasks].sort((a, b) => {
    // Show incomplete tasks first, then completed
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    // Within each group, sort by creation date (newest first)
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
};

// Local storage helpers
const STORAGE_KEY = 'minimalist-tasks';

export const saveTasks = (tasks: Task[]): void => {
  try {
    const serializedTasks = JSON.stringify(tasks);
    localStorage.setItem(STORAGE_KEY, serializedTasks);
  } catch (error) {
    console.error('Failed to save tasks to localStorage:', error);
  }
};

export const loadTasks = (): Task[] => {
  try {
    const serializedTasks = localStorage.getItem(STORAGE_KEY);
    if (serializedTasks) {
      const tasks = JSON.parse(serializedTasks);
      // Convert date strings back to Date objects
      return tasks.map((task: any) => ({
        ...task,
        createdAt: new Date(task.createdAt),
        completedAt: task.completedAt ? new Date(task.completedAt) : undefined,
      }));
    }
  } catch (error) {
    console.error('Failed to load tasks from localStorage:', error);
  }
  return [];
};

export const clearAllTasks = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear tasks from localStorage:', error);
  }
};