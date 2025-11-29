# 故障排除指南 - 多设备同步问题

## 问题：无法多设备同步

### 检查清单

#### 1. 确认 Supabase 数据库表已创建

1. **访问 Supabase Dashboard**
   - https://supabase.com/dashboard
   - 进入你的项目

2. **检查表是否存在**
   - 点击左侧菜单 **"Table Editor"**
   - 应该能看到 `appointments` 表
   - 如果不存在，执行 `supabase-setup.sql` 脚本

3. **检查表结构**
   - 表应该有以下字段：
     - `id` (UUID)
     - `name` (TEXT)
     - `phone` (TEXT)
     - `date` (TEXT)
     - `time_slot` (TEXT)
     - `service_type` (TEXT)
     - `completed` (BOOLEAN)
     - `created_at` (BIGINT)

#### 2. 确认环境变量已配置

1. **在 Cloudflare Pages 中检查**
   - 进入项目 Settings → Environment variables
   - 确认两个变量都存在：
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

2. **确认值正确**
   - URL 应该是：`https://ruayptievsmskgmubwgm.supabase.co`
   - Key 应该是完整的 JWT token

3. **重新部署**
   - 环境变量修改后，必须重新部署才能生效
   - 点击 Deployments → Retry deployment

#### 3. 检查浏览器控制台

1. **打开开发者工具**（F12）
2. **查看 Console 标签**
3. **查找以下信息**：
   - `Supabase 可用: true` 或 `false`
   - 如果有错误，会显示红色错误信息

常见错误：
- `Error fetching appointments`: 数据库连接问题
- `Missing API key`: 环境变量未配置
- `Table not found`: 数据库表未创建

#### 4. 检查网络请求

1. **打开开发者工具**（F12）
2. **查看 Network 标签**
3. **刷新页面**
4. **查找对 Supabase 的请求**：
   - URL 应该包含 `ruayptievsmskgmubwgm.supabase.co`
   - 状态码应该是 `200`（成功）

如果看到 `401` 或 `403`：
- API key 可能不正确
- 数据库策略可能有问题

如果看到 `404`：
- 表可能不存在
- 表名可能不正确

#### 5. 测试 Supabase 连接

在浏览器控制台（F12 → Console）中执行：

```javascript
// 检查环境变量
console.log('URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log('Key:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '已配置' : '未配置');

// 测试 Supabase 连接
fetch('https://ruayptievsmskgmubwgm.supabase.co/rest/v1/appointments?select=*', {
  headers: {
    'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ1YXlwdGlldnNtc2tnbXVid2dtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0MTQ0MjksImV4cCI6MjA3OTk5MDQyOX0.cYVA1DDsfpG22kiRTQZ8rJUy0dgN9yEAZNGub3_n608',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ1YXlwdGlldnNtc2tnbXVid2dtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0MTQ0MjksImV4cCI6MjA3OTk5MDQyOX0.cYVA1DDsfpG22kiRTQZ8rJUy0dgN9yEAZNGub3_n608'
  }
})
.then(r => r.json())
.then(data => console.log('数据:', data))
.catch(err => console.error('错误:', err));
```

如果这个请求成功，说明 Supabase 配置正确。

#### 6. 检查数据库策略

1. **在 Supabase Dashboard 中**
2. **点击 Authentication → Policies**
3. **确认 `appointments` 表有以下策略**：
   - Allow public read access
   - Allow public insert access
   - Allow public update access
   - Allow public delete access

#### 7. 静态导出的环境变量问题

**重要**：Next.js 静态导出时，环境变量需要在构建时注入。

如果环境变量在运行时不可用，可能需要：

1. **检查构建日志**
   - 在 Cloudflare Pages Deployments 中查看构建日志
   - 确认环境变量在构建时可用

2. **使用运行时配置**
   - 如果静态导出不支持环境变量，可能需要改用服务端渲染
   - 或者使用其他方式注入配置

## 快速诊断步骤

1. ✅ Supabase 表已创建？
2. ✅ 环境变量已配置？
3. ✅ 已重新部署？
4. ✅ 浏览器控制台无错误？
5. ✅ 网络请求成功？

## 如果仍然无法解决

请提供以下信息：
1. 浏览器控制台的错误信息（截图）
2. Network 标签中的请求状态（截图）
3. Supabase Dashboard 中表的数据（截图）
4. Cloudflare Pages 的构建日志（如果有错误）

