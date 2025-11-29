# 环境变量配置

## Cloudflare Pages 环境变量配置

请在 Cloudflare Pages 项目设置中添加以下环境变量：

### 变量 1：
- **Name**: `NEXT_PUBLIC_SUPABASE_URL`
- **Value**: `https://ruayptievsmskgmubwgm.supabase.co`

### 变量 2：
- **Name**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ1YXlwdGlldnNtc2tnbXVid2dtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0MTQ0MjksImV4cCI6MjA3OTk5MDQyOX0.cYVA1DDsfpG22kiRTQZ8rJUy0dgN9yEAZNGub3_n608`

## 配置步骤

1. 访问 Cloudflare Dashboard
2. 进入 `appointment-system` 项目
3. 点击 "Settings" 标签
4. 找到 "Environment variables" 部分
5. 添加上述两个变量
6. 保存并重新部署

## 安全提示

⚠️ **重要**：anon key 是公开的，但建议：
- 不要将 API key 提交到公开的 GitHub 仓库
- 如果已经提交，可以在 Supabase Dashboard 中重新生成新的 key
- 考虑设置 Row Level Security (RLS) 策略来保护数据

