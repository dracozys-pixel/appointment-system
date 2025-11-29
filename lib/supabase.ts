import { createClient } from '@supabase/supabase-js';
import { Appointment } from './types';

// Supabase 配置
// 这些值需要从 Supabase 项目设置中获取
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// 如果未配置，返回 null（会回退到 localStorage）
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// 数据库表名
export const APPOINTMENTS_TABLE = 'appointments';

// 检查 Supabase 是否可用
export const isSupabaseAvailable = () => {
  return supabase !== null;
};

