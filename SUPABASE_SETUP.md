# Supabase 设置指南 - 实现多设备同步

本指南将帮助你设置 Supabase 数据库，实现预约数据在多设备间的同步。

## 步骤 1：创建 Supabase 项目

1. **访问 Supabase**
   - 打开：https://supabase.com/
   - 点击 **"Start your project"** 或 **"Sign Up"**

2. **注册账号**
   - 使用 GitHub 账号登录（推荐）或邮箱注册
   - 完全免费，有充足的免费额度

3. **创建新项目**
   - 点击 **"New Project"**
   - **Name**: `appointment-system`（或你喜欢的名称）
   - **Database Password**: 设置一个强密码（记住它，后续可能需要）
   - **Region**: 选择离你最近的区域（如 `Southeast Asia (Singapore)`）
   - 点击 **"Create new project"**
   - 等待项目创建完成（约 2 分钟）

## 步骤 2：创建数据库表

1. **进入 SQL Editor**
   - 在 Supabase Dashboard 左侧菜单
   - 点击 **"SQL Editor"**

2. **执行 SQL 脚本**
   - 点击 **"New query"**
   - 复制 `supabase-setup.sql` 文件中的内容
   - 粘贴到 SQL Editor 中
   - 点击 **"Run"** 执行

3. **验证表创建成功**
   - 点击左侧菜单的 **"Table Editor"**
   - 应该能看到 `appointments` 表

## 步骤 3：获取 API 密钥

1. **进入项目设置**
   - 点击左侧菜单的 **"Settings"**（齿轮图标）
   - 点击 **"API"**

2. **复制以下信息**
   - **Project URL**: 类似 `https://xxxxx.supabase.co`
   - **anon public key**: 类似 `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - 这两个值需要配置到项目中

## 步骤 4：配置环境变量

### 方法一：在 Cloudflare Pages 中配置（推荐）

1. **进入 Cloudflare Pages 项目设置**
   - 访问：https://dash.cloudflare.com/
   - 进入 `appointment-system` 项目
   - 点击 **"Settings"** 标签

2. **添加环境变量**
   - 找到 **"Environment variables"** 部分
   - 点击 **"Add variable"**
   - 添加以下两个变量：

   ```
   Name: NEXT_PUBLIC_SUPABASE_URL
   Value: https://你的项目ID.supabase.co
   ```

   ```
   Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
   Value: 你的anon public key
   ```

3. **保存并重新部署**
   - 点击 **"Save"**
   - 回到 **"Deployments"** 标签
   - 点击 **"Retry deployment"** 重新部署

### 方法二：本地开发环境变量

如果需要本地测试，创建 `.env.local` 文件：

```bash
NEXT_PUBLIC_SUPABASE_URL=https://你的项目ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的anon public key
```

**注意**：`.env.local` 文件已经在 `.gitignore` 中，不会被提交到 GitHub。

## 步骤 5：验证配置

1. **访问网站**
   - 打开：https://appointment-system.pages.dev/

2. **测试同步功能**
   - 在一个设备上添加预约
   - 在另一个设备上刷新页面
   - 应该能看到新添加的预约

3. **检查浏览器控制台**
   - 按 F12 打开开发者工具
   - 查看 Console 标签
   - 如果有错误，会显示在这里

## 安全说明

### 当前配置（公开访问）

当前数据库策略设置为**公开访问**，任何人都可以：
- 查看所有预约
- 添加预约
- 修改预约
- 删除预约

### 如果需要更安全的配置

如果你需要限制访问（例如只允许特定用户），可以：

1. **启用 Supabase Auth**
   - 在 Supabase Dashboard 中设置认证
   - 修改数据库策略为需要认证

2. **修改 SQL 策略**
   - 在 SQL Editor 中执行：
   ```sql
   -- 删除公开策略
   DROP POLICY IF EXISTS "Allow public read access" ON appointments;
   DROP POLICY IF EXISTS "Allow public insert access" ON appointments;
   DROP POLICY IF EXISTS "Allow public update access" ON appointments;
   DROP POLICY IF EXISTS "Allow public delete access" ON appointments;
   
   -- 创建需要认证的策略
   CREATE POLICY "Allow authenticated read access" ON appointments
     FOR SELECT USING (auth.role() = 'authenticated');
   ```

## 免费额度

Supabase 免费版提供：
- ✅ 500 MB 数据库空间
- ✅ 2 GB 带宽/月
- ✅ 50,000 月活跃用户
- ✅ 实时订阅功能

对于预约系统来说完全够用！

## 故障排除

### 问题：数据无法同步

1. **检查环境变量**
   - 确认 Cloudflare Pages 中已正确配置环境变量
   - 确认变量名正确（`NEXT_PUBLIC_SUPABASE_URL` 和 `NEXT_PUBLIC_SUPABASE_ANON_KEY`）

2. **检查数据库策略**
   - 在 Supabase Dashboard → Authentication → Policies
   - 确认策略已正确设置

3. **检查浏览器控制台**
   - 查看是否有错误信息
   - 检查网络请求是否成功

### 问题：实时更新不工作

- 实时更新功能需要 Supabase 配置正确
- 如果使用 localStorage（未配置 Supabase），实时更新不会工作
- 但数据仍然可以手动刷新页面查看

## 需要帮助？

如果遇到问题：
- 查看 Supabase 文档：https://supabase.com/docs
- 检查 Supabase Dashboard 中的日志
- 查看浏览器控制台的错误信息

