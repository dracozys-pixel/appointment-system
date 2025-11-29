# 部署指南 - 预约登记系统

本项目可以免费部署到 Vercel，获得一个可用的网址。

## 方法一：通过 GitHub + Vercel（推荐）

### 步骤 1：将代码推送到 GitHub

1. 在 GitHub 上创建一个新仓库（https://github.com/new）
   - 仓库名称可以填写：`appointment-system` 或任何你喜欢的名称
   - 选择 Public（公开）或 Private（私有）
   - **不要**勾选 "Initialize this repository with a README"

2. 在终端执行以下命令（将 `YOUR_USERNAME` 和 `YOUR_REPO_NAME` 替换为你的实际信息）：

```bash
cd "/Users/ys/Desktop/裁缝裁缝编织变/ss/project"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### 步骤 2：在 Vercel 上部署

1. 访问 https://vercel.com
2. 点击 **"Sign Up"** 或 **"Login"**，使用 GitHub 账号登录
3. 登录后，点击 **"Add New..."** → **"Project"**
4. 在 "Import Git Repository" 页面，选择你刚才创建的 GitHub 仓库
5. 点击 **"Import"**
6. 在配置页面：
   - **Framework Preset**: 选择 "Next.js"（应该自动识别）
   - **Root Directory**: 保持默认（`./`）
   - **Build Command**: 保持默认（`npm run build`）
   - **Output Directory**: 保持默认（`.next`）
   - **Install Command**: 保持默认（`npm install`）
7. 点击 **"Deploy"**
8. 等待部署完成（通常 1-2 分钟）
9. 部署成功后，你会看到一个网址，例如：`https://your-project-name.vercel.app`

### 步骤 3：访问你的网站

部署完成后，你可以：
- 直接访问 Vercel 提供的网址
- 每次推送代码到 GitHub，Vercel 会自动重新部署
- 在 Vercel 仪表板中查看部署历史和日志

---

## 方法二：使用 Vercel CLI（快速部署）

如果你已经安装了 Node.js，可以使用命令行直接部署：

### 步骤 1：安装 Vercel CLI

```bash
npm install -g vercel
```

### 步骤 2：登录 Vercel

```bash
vercel login
```

### 步骤 3：部署项目

在项目目录下执行：

```bash
cd "/Users/ys/Desktop/裁缝裁缝编织变/ss/project"
vercel
```

按照提示操作：
- 选择是否链接到现有项目（首次部署选择 No）
- 确认项目设置
- 等待部署完成

部署完成后，你会得到一个网址。

---

## 方法三：使用 Netlify（备选方案）

如果你不想使用 Vercel，也可以使用 Netlify：

1. 访问 https://www.netlify.com
2. 使用 GitHub 账号登录
3. 点击 "Add new site" → "Import an existing project"
4. 选择你的 GitHub 仓库
5. 配置：
   - Build command: `npm run build`
   - Publish directory: `.next`
6. 点击 "Deploy site"

---

## 注意事项

1. **免费额度**：
   - Vercel 免费版提供：
     - 无限次部署
     - 100GB 带宽/月
     - 自动 HTTPS
     - 全球 CDN
   - 对于个人项目完全够用

2. **数据存储**：
   - 当前系统使用浏览器 localStorage 存储数据
   - 数据只保存在用户的浏览器中
   - 如果需要跨设备同步，后续可以考虑添加数据库

3. **自定义域名**（可选）：
   - Vercel 免费版支持添加自定义域名
   - 在项目设置中点击 "Domains" 添加你的域名

---

## 更新网站

每次修改代码后，只需：

1. 提交更改：
```bash
git add .
git commit -m "更新描述"
git push
```

2. Vercel 会自动检测到更改并重新部署（通常 1-2 分钟）

---

## 需要帮助？

如果遇到问题，可以：
- 查看 Vercel 文档：https://vercel.com/docs
- 检查部署日志：在 Vercel 仪表板中查看 "Deployments" → 选择部署 → 查看日志

