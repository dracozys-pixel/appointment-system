# 部署到 Cloudflare Pages（国内可访问）

Cloudflare Pages 在国内可以正常访问，并且完全免费。

## 部署步骤

### 方法一：通过 GitHub 自动部署（推荐）

1. **确保代码已推送到 GitHub**
   - 你的代码已经在：`https://github.com/dracozys-pixel/appointment-system`

2. **登录 Cloudflare**
   - 访问：https://dash.cloudflare.com/
   - 如果没有账号，点击 "Sign Up" 注册（免费）
   - 可以使用邮箱注册，不需要绑定域名

3. **创建 Pages 项目**
   - 登录后，点击左侧菜单的 **"Workers & Pages"**
   - 点击 **"Create application"** → **"Pages"** → **"Connect to Git"**
   - 授权 Cloudflare 访问你的 GitHub 账号
   - 选择仓库：`dracozys-pixel/appointment-system`

4. **配置构建设置**
   - **Project name**: `appointment-system`（或你喜欢的名称）
   - **Production branch**: `main`
   - **Framework preset**: `Next.js`
   - **Build command**: `npm run build`
   - **Build output directory**: `.next`
   - **Root directory**: `/`（保持默认）

5. **点击 "Save and Deploy"**
   - 等待部署完成（通常 3-5 分钟）

6. **获取网址**
   - 部署完成后，你会得到一个网址，格式类似：
     `https://appointment-system.pages.dev`
   - 这个网址在国内可以正常访问！

### 方法二：使用 Wrangler CLI（命令行）

如果你更喜欢使用命令行：

```bash
# 安装 Wrangler CLI
npm install -g wrangler

# 登录 Cloudflare
wrangler login

# 在项目目录下部署
cd "/Users/ys/Desktop/裁缝裁缝编织变/ss/project"
wrangler pages deploy .next --project-name=appointment-system
```

## 自动部署

- 每次推送代码到 GitHub 的 `main` 分支，Cloudflare Pages 会自动重新部署
- 你可以在 Cloudflare 仪表板中查看部署历史和日志

## 自定义域名（可选）

如果你有自己的域名，可以在 Cloudflare Pages 设置中添加自定义域名：
1. 进入项目设置
2. 点击 "Custom domains"
3. 添加你的域名
4. 按照提示配置 DNS

## 优势

- ✅ **国内可访问**：Cloudflare 在国内访问稳定
- ✅ **完全免费**：无限次部署，无限带宽
- ✅ **自动 HTTPS**：自动配置 SSL 证书
- ✅ **全球 CDN**：访问速度快
- ✅ **自动部署**：GitHub 推送自动触发部署

## 注意事项

- 首次部署可能需要几分钟时间
- 如果构建失败，检查 Cloudflare 的构建日志
- 确保 `package.json` 中有正确的构建脚本

