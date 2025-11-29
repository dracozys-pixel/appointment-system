# Cloudflare Pages 部署修复指南

## 问题原因

错误信息显示：`Missing entry-point to Worker script or to assets directory`

这是因为 Cloudflare Pages 在部署时使用了错误的部署命令（`npx wrangler deploy`），这是用于 Workers 的，不是用于静态 Pages 的。

## 解决方案

### 方法一：在 Cloudflare Pages 设置中修改（推荐）

1. **进入 Cloudflare Pages 项目设置**
   - 访问你的 Cloudflare Dashboard
   - 进入 `appointment-system` 项目
   - 点击 **"Settings"** 标签

2. **修改构建设置**
   - 找到 **"Builds & deployments"** 部分
   - **Build output directory**: 设置为 `out`
   - **Deploy command**: **留空** 或删除（不要填写任何命令）
   - 保存设置

3. **重新部署**
   - 点击 **"Deployments"** 标签
   - 找到失败的部署，点击右侧的 **"Retry deployment"** 按钮
   - 或者推送新的代码到 GitHub 触发自动部署

### 方法二：使用正确的部署命令

如果必须使用自定义部署命令，应该使用：

```bash
# 不要使用这个
npx wrangler deploy

# 应该使用这个（但通常不需要）
npx wrangler pages deploy out --project-name=appointment-system
```

但实际上，**不需要自定义部署命令**，Cloudflare Pages 会自动检测 `out` 目录并部署。

## 正确的 Cloudflare Pages 配置

### Build settings:
- **Framework preset**: `Next.js (Static HTML Export)` 或 `None`
- **Build command**: `npm run build`
- **Build output directory**: `out` ⚠️ **重要！**
- **Root directory**: `/`（默认）
- **Deploy command**: **留空**（不要填写）

### Node version:
- 选择 `18` 或 `20`

## 验证配置

1. 确保 `next.config.js` 中有：
   ```js
   output: 'export'
   ```

2. 确保构建后生成了 `out` 目录

3. 确保 Cloudflare Pages 设置中的 **Build output directory** 是 `out`

4. 确保 **Deploy command** 是空的

## 重新部署

修改设置后：
1. 点击 **"Retry deployment"** 重新部署失败的构建
2. 或者推送代码到 GitHub 触发新的部署

部署成功后，你会看到绿色的成功状态，并获得访问网址。

