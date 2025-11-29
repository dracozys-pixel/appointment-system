-- Supabase 数据库表结构
-- 在 Supabase Dashboard 的 SQL Editor 中执行此脚本

-- 创建 appointments 表
CREATE TABLE IF NOT EXISTS appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  date TEXT NOT NULL,
  time_slot TEXT NOT NULL,
  service_type TEXT NOT NULL CHECK (service_type IN ('唇腺活检', '术后拆线')),
  completed BOOLEAN NOT NULL DEFAULT false,
  created_at BIGINT NOT NULL DEFAULT EXTRACT(EPOCH FROM NOW()) * 1000
);

-- 创建索引以提高查询性能
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(date);
CREATE INDEX IF NOT EXISTS idx_appointments_completed ON appointments(completed);
CREATE INDEX IF NOT EXISTS idx_appointments_created_at ON appointments(created_at);

-- 启用 Row Level Security (RLS)
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- 创建策略：允许所有人读取和写入（公开访问）
-- 注意：根据你的需求，可以修改为需要认证的策略
CREATE POLICY "Allow public read access" ON appointments
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert access" ON appointments
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update access" ON appointments
  FOR UPDATE USING (true);

CREATE POLICY "Allow public delete access" ON appointments
  FOR DELETE USING (true);

-- 如果需要更安全的策略（需要认证），可以使用以下策略替代上面的公开策略：
-- CREATE POLICY "Allow authenticated read access" ON appointments
--   FOR SELECT USING (auth.role() = 'authenticated');
--
-- CREATE POLICY "Allow authenticated insert access" ON appointments
--   FOR INSERT WITH CHECK (auth.role() = 'authenticated');
--
-- CREATE POLICY "Allow authenticated update access" ON appointments
--   FOR UPDATE USING (auth.role() = 'authenticated');
--
-- CREATE POLICY "Allow authenticated delete access" ON appointments
--   FOR DELETE USING (auth.role() = 'authenticated');

