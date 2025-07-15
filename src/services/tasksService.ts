// src/services/tasksService.ts
import { supabase } from '@/lib/supabase';
import type { Task } from '@/types';

export const tasksService = {
  async fetch() {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },
  async create(text: string) {
    const { data } = await supabase.from('tasks').insert([{ text }]).select().single();
    return data!;
  },
  async toggle(id: string, done: boolean) {
    const { data } = await supabase.from('tasks').update({ done }).eq('id', id).select().single();
    return data!;
  },
  async delete(id: string) {
    await supabase.from('tasks').delete().eq('id', id);
  },
  async clearDone() {
    await supabase.from('tasks').delete().neq('done', false);
  },
};
    const { error } = await supabase.from('tasks').delete().neq('done', false);
    if (error) throw error;
  },
};
