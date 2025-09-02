'use client';

import { useState, useEffect } from 'react';
import { Task, TaskFilter } from '@/types/task';
import { 
  createTask, 
  toggleTaskCompletion, 
  updateTaskText, 
  filterTasks, 
  calculateTaskStats, 
  sortTasks,
  saveTasks,
  loadTasks 
} from '@/lib/taskUtils';
import TaskInput from './TaskInput';
import TaskItem from './TaskItem';
import TaskStatsComponent from './TaskStats';
import { Button } from '@/components/ui/button';

const FILTER_OPTIONS: { value: TaskFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
];

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<TaskFilter>('all');
  const [isLoading, setIsLoading] = useState(true);

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const loadedTasks = loadTasks();
    setTasks(loadedTasks);
    setIsLoading(false);
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    if (!isLoading) {
      saveTasks(tasks);
    }
  }, [tasks, isLoading]);

  const handleAddTask = (text: string) => {
    const newTask = createTask(text);
    setTasks(prevTasks => [newTask, ...prevTasks]);
  };

  const handleToggleComplete = (id: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? toggleTaskCompletion(task) : task
      )
    );
  };

  const handleUpdateTask = (id: string, text: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? updateTaskText(task, text) : task
      )
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  const handleClearCompleted = () => {
    setTasks(prevTasks => prevTasks.filter(task => !task.completed));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-lg text-gray-500">Loading tasks...</div>
      </div>
    );
  }

  const sortedTasks = sortTasks(tasks);
  const filteredTasks = filterTasks(sortedTasks, filter);
  const stats = calculateTaskStats(tasks);
  const hasCompletedTasks = tasks.some(task => task.completed);

  return (
    <div className="space-y-6">
      <TaskInput onAddTask={handleAddTask} />

      {tasks.length > 0 && (
        <>
          <TaskStatsComponent stats={stats} />

          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-2">
              {FILTER_OPTIONS.map(option => (
                <Button
                  key={option.value}
                  variant={filter === option.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter(option.value)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                    filter === option.value
                      ? 'bg-gray-900 text-white'
                      : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {option.label}
                  <span className="ml-2 text-xs opacity-75">
                    {option.value === 'all' 
                      ? tasks.length 
                      : option.value === 'active' 
                      ? stats.active 
                      : stats.completed}
                  </span>
                </Button>
              ))}
            </div>

            {hasCompletedTasks && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearCompleted}
                className="px-4 py-2 text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 rounded-lg font-medium transition-colors duration-200"
              >
                Clear Completed
              </Button>
            )}
          </div>
        </>
      )}

      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            {filter === 'active' && tasks.length > 0 
              ? "🎉 No active tasks! Time to relax or add new ones."
              : filter === 'completed' && tasks.length > 0
              ? "No completed tasks yet. Mark some tasks as done!"
              : tasks.length === 0
              ? "Your task list is empty. Add your first task above!"
              : "No tasks match the current filter."}
          </div>
        ) : (
          filteredTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggleComplete={handleToggleComplete}
              onUpdateTask={handleUpdateTask}
              onDeleteTask={handleDeleteTask}
            />
          ))
        )}
      </div>

      {tasks.length > 0 && (
        <div className="text-center pt-8 text-sm text-gray-400 border-t border-gray-100">
          Double-click any active task to edit it
        </div>
      )}
    </div>
  );
}