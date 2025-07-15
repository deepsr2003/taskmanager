// src/pages/TaskBoard.tsx
import { useState } from 'react';
import { Trash2, Plus, Edit3, CheckSquare, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Squares } from '@/components/ui/squares-background';

export type Task = {
  id: string;
  text: string;
  done: boolean;
};

export default function TaskBoard() {
  // ---------- state ----------
  const [tasks, setTasks] = useState<Task[]>(() => {
    // tiny demo seed
    return [
      { id: crypto.randomUUID(), text: 'Design wireframes', done: false },
      { id: crypto.randomUUID(), text: 'Ship MVP', done: true },
    ];
  });

  const [newText, setNewText] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  // ---------- CRUD ----------
  const addTask = () => {
    if (!newText.trim()) return;
    setTasks([...tasks, { id: crypto.randomUUID(), text: newText.trim(), done: false }]);
    setNewText('');
  };

  const deleteTask = (id: string) =>
    setTasks(tasks.filter((t) => t.id !== id));

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

  // ---------- derived ----------
  const todo = tasks.filter((t) => !t.done);
  const done = tasks.filter((t) => t.done);

  // ---------- render ----------
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

      <main className="relative z-0 max-w-4xl mx-auto p-6 space-y-8">
        {/* Header */}
        <h1 className="text-4xl font-extrabold text-white drop-shadow">Task Board</h1>

        {/* Add new */}
        <div className="flex gap-2">
          <Input
            placeholder="New task..."
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTask()}
            className="rounded-base border-2 border-black focus:ring-2 focus:ring-black"
          />
          <Button onClick={addTask} className="aspect-square">
            <Plus />
          </Button>
        </div>

        {/* TODO section */}
        <section>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold text-white">To-Do</h2>
            <Button variant="neutral" size="sm" onClick={() => setTasks([])}>
              <Trash2 size={16} />
            </Button>
          </div>

          <ul className="space-y-2">
            {todo.map((task) => (
              <li
                key={task.id}
                className="flex items-center gap-2 p-3 rounded-base border-2 border-black bg-white shadow-[4px_4px_0_#000]"
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

                <Button
                  variant="ghost"
                  size="sm"
                  className="p-1 h-auto"
                  onClick={() => startEdit(task)}
                >
                  <Edit3 size={16} />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="p-1 h-auto"
                  onClick={() => deleteTask(task.id)}
                >
                  <Trash2 size={16} />
                </Button>
              </li>
            ))}
          </ul>
        </section>

        {/* DONE section */}
        <section>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold text-white">Done</h2>
            <Button variant="neutral" size="sm" onClick={clearDone}>
              <Trash2 size={16} />
            </Button>
          </div>

          <ul className="space-y-2">
            {done.map((task) => (
              <li
                key={task.id}
                className="flex items-center gap-2 p-3 rounded-base border-2 border-black bg-slate-200 shadow-[4px_4px_0_#000] opacity-80"
              >
                <button onClick={() => toggleDone(task.id)}>
                  <CheckSquare className="w-5 h-5 text-green-700" />
                </button>
                <span className="flex-1 line-through text-slate-600">{task.text}</span>

                <Button
                  variant="ghost"
                  size="sm"
                  className="p-1 h-auto"
                  onClick={() => deleteTask(task.id)}
                >
                  <Trash2 size={16} />
                </Button>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
