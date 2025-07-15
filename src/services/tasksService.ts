// src/services/tasksService.ts
import { supabase } from '@/lib/supabase';
import type { Task } from '@/types';

export const tasksService = {
  async fetch(): Promise<Task[]> {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data ?? [];
  },

  async create(text: string): Promise<Task> {
    const { data, error } = await supabase
      .from('tasks')
      .insert([{ text }])
      .select()
      .single();

    if (error) throw error;
    return data!;
  },

  async toggle(id: string, done: boolean): Promise<Task> {
    const { data, error } = await supabase
      .from('tasks')
      .update({ done })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data!;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from('tasks').delete().eq('id', id);
    if (error) throw error;
  },

  async clearDone(): Promise<void> {
    const { error } = await supabase.from('tasks').delete().neq('done', false);
    if (error) throw error;
  },
};
