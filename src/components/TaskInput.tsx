'use client';

import { useState, KeyboardEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface TaskInputProps {
  onAddTask: (text: string) => void;
  disabled?: boolean;
}

export default function TaskInput({ onAddTask, disabled = false }: TaskInputProps) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue) {
      onAddTask(trimmedValue);
      setInputValue('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex gap-3 mb-8">
      <div className="flex-1">
        <Input
          type="text"
          placeholder="Add a new task..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className="h-12 text-base border-2 border-gray-200 focus:border-gray-900 transition-colors duration-200 rounded-lg"
          autoFocus
        />
      </div>
      <Button
        onClick={handleSubmit}
        disabled={disabled || !inputValue.trim()}
        className="h-12 px-6 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Add Task
      </Button>
    </div>
  );
}