'use client';

import { useState, KeyboardEvent, useRef, useEffect } from 'react';
import { Task } from '@/types/task';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onUpdateTask: (id: string, text: string) => void;
  onDeleteTask: (id: string) => void;
}

export default function TaskItem({ 
  task, 
  onToggleComplete, 
  onUpdateTask, 
  onDeleteTask 
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(task.text);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleEditSubmit = () => {
    const trimmedValue = editValue.trim();
    if (trimmedValue && trimmedValue !== task.text) {
      onUpdateTask(task.id, trimmedValue);
    }
    setIsEditing(false);
    setEditValue(task.text);
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setEditValue(task.text);
  };

  const handleEditKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleEditSubmit();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      handleEditCancel();
    }
  };

  const handleDoubleClick = () => {
    if (!task.completed) {
      setIsEditing(true);
    }
  };

  const handleDelete = () => {
    if (showDeleteConfirm) {
      onDeleteTask(task.id);
      setShowDeleteConfirm(false);
    } else {
      setShowDeleteConfirm(true);
      // Auto-hide confirmation after 3 seconds
      setTimeout(() => setShowDeleteConfirm(false), 3000);
    }
  };

  return (
    <div className="group flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-lg hover:border-gray-200 hover:shadow-sm transition-all duration-200">
      <Checkbox
        checked={task.completed}
        onCheckedChange={() => onToggleComplete(task.id)}
        className="w-5 h-5 rounded-full border-2 border-gray-300 data-[state=checked]:border-gray-900 data-[state=checked]:bg-gray-900"
      />
      
      <div className="flex-1 min-w-0">
        {isEditing ? (
          <Input
            ref={inputRef}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleEditKeyDown}
            onBlur={handleEditSubmit}
            className="border-0 p-0 h-auto text-base bg-transparent focus:outline-none focus:ring-0"
          />
        ) : (
          <div
            className={`cursor-pointer text-base leading-relaxed transition-all duration-200 ${
              task.completed
                ? 'text-gray-400 line-through'
                : 'text-gray-900 hover:text-gray-600'
            }`}
            onDoubleClick={handleDoubleClick}
            title={task.completed ? 'Task completed' : 'Double-click to edit'}
          >
            {task.text}
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {!isEditing && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            className={`h-8 px-3 text-sm font-medium rounded-md transition-colors duration-200 ${
              showDeleteConfirm
                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                : 'text-gray-400 hover:text-red-600 hover:bg-red-50'
            }`}
          >
            {showDeleteConfirm ? 'Confirm' : 'Delete'}
          </Button>
        )}
      </div>
    </div>
  );
}