import { createClient } from '@supabase/supabase-js';
import { Appointment } from './types';

// Supabase 配置
// 优先使用运行时配置（从 config.js），然后是环境变量
const getSupabaseConfig = () => {
  if (typeof window === 'undefined') {
    // 服务端：使用环境变量
    return {
      url: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
    };
  }

  // 客户端：优先使用 window.__SUPABASE_CONFIG__，然后是环境变量
  const runtimeConfig = (window as any).__SUPABASE_CONFIG__;
  return {
    url: runtimeConfig?.url || process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    anonKey: runtimeConfig?.anonKey || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
  };
};

const config = getSupabaseConfig();
const supabaseUrl = config.url;
const supabaseAnonKey = config.anonKey;

// 调试信息
if (typeof window !== 'undefined') {
  console.log('Supabase 配置检查:');
  console.log('- URL:', supabaseUrl ? '✓ 已配置' : '✗ 未配置');
  console.log('- Key:', supabaseAnonKey ? '✓ 已配置' : '✗ 未配置');
  console.log('- 使用 Supabase:', supabaseUrl && supabaseAnonKey ? '是' : '否（将使用 localStorage）');
}

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

