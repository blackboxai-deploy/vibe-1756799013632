import TaskList from '@/components/TaskList';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light text-gray-900 mb-2">
            Tasks
          </h1>
          <p className="text-gray-600 text-lg">
            A minimalist approach to getting things done
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <TaskList />
        </div>

        <div className="text-center mt-8 text-sm text-gray-400">
          Built with focus on simplicity and productivity
        </div>
      </div>
    </main>
  );
}