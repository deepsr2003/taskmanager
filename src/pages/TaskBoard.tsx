// src/pages/TaskBoard.tsx
import { useState, useRef } from 'react';
import { Trash2, Plus, Edit3, CheckSquare, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Squares } from '@/components/ui/squares-background';

type Task = {
  id: string;
  text: string;
  done: boolean;
};

export default function TaskBoard() {
  const [tasks, setTasks] = useState<Task[]>(() => [
    { id: crypto.randomUUID(), text: 'Design wireframes', done: false },
    { id: crypto.randomUUID(), text: 'Ship MVP', done: true },
  ]);

  const [tab, setTab] = useState<'todo' | 'done'>('todo');
  const [newText, setNewText] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  const scrollRef = useRef<HTMLDivElement>(null);

  /* ---------- helpers ---------- */
  const addTask = () => {
    if (!newText.trim()) return;
    setTasks([...tasks, { id: crypto.randomUUID(), text: newText.trim(), done: false }]);
    setNewText('');
  };
  const deleteTask = (id: string) => setTasks(tasks.filter((t) => t.id !== id));
  const toggleDone = (id: string) =>
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  const startEdit = (task: Task) => {
    setEditingId(task.id);
    setEditText(task.text);
  };
  const saveEdit = () => {
    setTasks(tasks.map((t) => (t.id === editingId ? { ...t, text: editText.trim() } : t)));
    setEditingId(null);
  };
  const clearDone = () => setTasks(tasks.filter((t) => !t.done));

  const todo = tasks.filter((t) => !t.done);
  const done = tasks.filter((t) => t.done);

  const switchTab = (target: 'todo' | 'done') => {
    setTab(target);
    if (target === 'todo') scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* ---------- render ---------- */
  return (
    <div className="relative min-h-screen">
      <Squares
        className="fixed inset-0 -z-10"
        direction="diagonal"
        speed={1}
        borderColor="#334155"
        hoverFillColor="#475569"
        squareSize={40}
      />

      {/* sticky header */}
      <header className="sticky top-0 z-20 backdrop-blur-sm">
          <div className="max-w-3xl mx-auto p-4 flex justify-between items-center">
    <h1 className="text-2xl font-bold text-white drop-shadow">Task Board</h1>
    <Button variant="neutral" onClick={signOut}>
      Logout
    </Button>
  </div>
        <div className="max-w-3xl mx-auto p-4">
          <div className="flex gap-2">
            <Button
              onClick={() => switchTab('todo')}
              variant={tab === 'todo' ? 'reverse' : 'default'}
              className="flex-1 bg-white"
            >
              To-Do
            </Button>
            <Button
              onClick={() => switchTab('done')}
              variant={tab === 'done' ? 'reverse' : 'default'}
              className="flex-1 bg-white"
            >
              Done
            </Button>
          </div>
        </div>
      </header>

      {/* scrollable content */}
      <main
        ref={scrollRef}
        className="max-w-3xl mx-auto p-4 h-[calc(100vh-88px)] overflow-y-auto space-y-6"
      >
        {/* TO-DO PANEL */}
        {tab === 'todo' && (
          <section className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="New task..."
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addTask()}
                className="rounded-base border-2 border-black bg-white text-black placeholder-slate-500 focus:ring-2 focus:ring-black"
              />
              <Button onClick={addTask} className="aspect-square bg-white">
                <Plus />
              </Button>
            </div>

            <ul className="space-y-2">
              {todo.map((task) => (
                <li
                  key={task.id}
                  className="flex items-center gap-2 p-3 rounded-base border-2 border-black bg-white text-black shadow-[4px_4px_0_#000]"
                >
                  <button onClick={() => toggleDone(task.id)}>
                    <Square className="w-5 h-5" />
                  </button>

                  {editingId === task.id ? (
                    <Input
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onBlur={saveEdit}
                      onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
                      className="flex-1 h-8"
                    />
                  ) : (
                    <span className="flex-1 font-medium">{task.text}</span>
                  )}

                  <Button variant="ghost" size="sm" onClick={() => startEdit(task)}>
                    <Edit3 size={16} />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => deleteTask(task.id)}>
                    <Trash2 size={16} />
                  </Button>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* DONE PANEL */}
        {tab === 'done' && (
          <section className="space-y-4">
            <div className="flex justify-end">
              <Button variant="neutral" size="sm" onClick={clearDone} className="bg-white">
                <Trash2 size={16} className="mr-1" />
                Clear Done
              </Button>
            </div>

            <ul className="space-y-2">
              {done.map((task) => (
                <li
                  key={task.id}
                  className="flex items-center gap-2 p-3 rounded-base border-2 border-black bg-white text-black shadow-[4px_4px_0_#000] opacity-80"
                >
                  <button onClick={() => toggleDone(task.id)}>
                    <CheckSquare className="w-5 h-5 text-green-700" />
                  </button>
                  <span className="flex-1 line-through">{task.text}</span>
                  <Button variant="ghost" size="sm" onClick={() => deleteTask(task.id)}>
                    <Trash2 size={16} />
                  </Button>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
}
