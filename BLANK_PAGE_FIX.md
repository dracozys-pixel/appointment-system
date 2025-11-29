# 解决 Cloudflare Pages 显示空白页面的问题

## 问题症状
访问 `https://appointment-system.pages.dev/` 显示空白页面或无法加载。

## 可能的原因和解决方案

### 1. 检查 Build output directory 设置（最重要！）

在 Cloudflare Pages 设置中：

1. **进入 Settings 标签**
2. **找到 "Builds & deployments" 部分**
3. **确认 "Build output directory" 设置为：`out`**
   - ⚠️ 如果显示 `.next` 或其他值，改为 `out`
   - ⚠️ 如果该字段为空，填写 `out`

### 2. 检查构建日志

1. **点击 "Deployments" 标签**
2. **点击最新的部署**
3. **查看 "Build log"**
4. **确认构建成功，并且生成了 `out` 目录**

### 3. 清除缓存并重新部署

1. **在 Settings 中**
2. **找到 "Build cache" 部分**
3. **点击 "Clear cache"**
4. **回到 "Deployments" 标签**
5. **点击 "Retry deployment" 重新部署**

### 4. 验证文件结构

构建成功后，`out` 目录应该包含：
- `index.html`
- `_next/` 目录（包含静态资源）
- `404.html`

### 5. 检查浏览器控制台

如果页面仍然空白：

1. **打开浏览器开发者工具**（F12）
2. **查看 Console 标签**，看是否有错误
3. **查看 Network 标签**，检查资源是否加载失败

常见错误：
- `404` 错误：资源路径问题
- `CORS` 错误：跨域问题
- `Failed to fetch`：网络问题

## 正确的 Cloudflare Pages 配置

确保以下设置正确：

```
Framework preset: None 或 Next.js (Static HTML Export)
Build command: npm run build
Build output directory: out
Root directory: /
Deploy command: (留空)
```

## 如果仍然无法解决

1. **删除项目并重新创建**
   - 在 Cloudflare Dashboard 中删除当前项目
   - 重新创建 Pages 项目
   - 确保选择正确的配置

2. **检查 GitHub 仓库**
   - 确认代码已推送到 GitHub
   - 确认 `next.config.js` 中有 `output: 'export'`

3. **联系支持**
   - 在 Cloudflare Dashboard 中点击 "Support"
   - 提供构建日志和错误信息

