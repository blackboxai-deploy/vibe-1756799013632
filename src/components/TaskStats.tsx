'use client';

import { TaskStats } from '@/types/task';
import { Progress } from '@/components/ui/progress';

interface TaskStatsProps {
  stats: TaskStats;
}

export default function TaskStatsComponent({ stats }: TaskStatsProps) {
  const { total, completed, active, completionRate } = stats;

  if (total === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <div className="text-lg font-medium mb-2">No tasks yet</div>
        <div className="text-sm">Add your first task above to get started</div>
      </div>
    );
  }

  const getMotivationalMessage = () => {
    if (completionRate === 100) {
      return "🎉 All tasks completed! Great job!";
    } else if (completionRate >= 75) {
      return "🚀 Almost there! Keep it up!";
    } else if (completionRate >= 50) {
      return "📈 Making good progress!";
    } else if (completionRate > 0) {
      return "✨ Good start! Keep going!";
    } else {
      return "💪 Let's get these tasks done!";
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="text-lg font-semibold text-gray-900">
          Progress Overview
        </div>
        <div className="text-2xl font-bold text-gray-900">
          {completionRate}%
        </div>
      </div>

      <Progress 
        value={completionRate} 
        className="h-3 mb-4 bg-gray-200"
      />

      <div className="flex justify-between text-sm text-gray-600 mb-4">
        <div className="flex flex-col items-center">
          <span className="font-medium text-gray-900 text-lg">{total}</span>
          <span>Total</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-medium text-green-600 text-lg">{completed}</span>
          <span>Completed</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-medium text-blue-600 text-lg">{active}</span>
          <span>Active</span>
        </div>
      </div>

      <div className="text-center text-sm font-medium text-gray-700 bg-white rounded-md py-2 px-4">
        {getMotivationalMessage()}
      </div>
    </div>
  );
}