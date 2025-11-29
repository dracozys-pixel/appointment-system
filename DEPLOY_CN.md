# 国内可访问的部署方案

由于 Vercel 在国内可能无法访问，这里提供几个国内可用的免费部署方案。

## 方案一：Cloudflare Pages（推荐 ⭐）

**优点**：国内访问稳定，完全免费，自动部署

### 部署步骤：

1. **访问 Cloudflare Dashboard**
   - 网址：https://dash.cloudflare.com/
   - 如果没有账号，点击 "Sign Up" 注册（免费，只需邮箱）

2. **创建 Pages 项目**
   - 登录后，点击左侧 **"Workers & Pages"**
   - 点击 **"Create application"** → **"Pages"** → **"Connect to Git"**
   - 授权访问 GitHub，选择仓库：`dracozys-pixel/appointment-system`

3. **配置构建设置**
   - **Framework preset**: `Next.js (Static HTML Export)`
   - **Build command**: `npm run build`
   - **Build output directory**: `out`
   - **Root directory**: `/`（默认）

4. **部署**
   - 点击 **"Save and Deploy"**
   - 等待 3-5 分钟完成部署
   - 获得网址：`https://appointment-system.pages.dev`

✅ **国内可正常访问！**

---

## 方案二：GitHub Pages（免费）

**优点**：完全免费，但访问速度可能较慢

### 部署步骤：

1. **安装 gh-pages 包**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **修改 package.json**
   添加部署脚本：
   ```json
   "scripts": {
     "deploy": "npm run build && gh-pages -d out"
   }
   ```

3. **执行部署**
   ```bash
   npm run deploy
   ```

4. **启用 GitHub Pages**
   - 访问：https://github.com/dracozys-pixel/appointment-system/settings/pages
   - Source 选择：`gh-pages` 分支
   - 保存后访问：`https://dracozys-pixel.github.io/appointment-system/`

---

## 方案三：Gitee Pages（国内平台）

**优点**：国内访问速度快，但需要手动更新

### 部署步骤：

1. **导入 GitHub 仓库到 Gitee**
   - 访问：https://gitee.com/
   - 注册/登录账号
   - 点击 **"+"** → **"导入仓库"**
   - 输入 GitHub 仓库地址：`https://github.com/dracozys-pixel/appointment-system`
   - 点击导入

2. **构建静态文件**
   ```bash
   npm run build
   ```
   生成的文件在 `out` 目录

3. **上传到 Gitee Pages**
   - 在 Gitee 仓库中，点击 **"服务"** → **"Gitee Pages"**
   - 选择部署分支（可以创建一个 `gh-pages` 分支）
   - 或者直接上传 `out` 目录的内容

4. **启用 Pages**
   - 在仓库设置中启用 Gitee Pages
   - 获得网址：`https://你的用户名.gitee.io/appointment-system/`

---

## 方案四：Netlify（备选）

**注意**：Netlify 在国内访问可能也不稳定，但可以尝试

### 部署步骤：

1. 访问：https://www.netlify.com/
2. 使用 GitHub 账号登录
3. 点击 **"Add new site"** → **"Import an existing project"**
4. 选择 GitHub 仓库
5. 配置：
   - Build command: `npm run build`
   - Publish directory: `out`
6. 点击 **"Deploy site"**

---

## 推荐方案对比

| 平台 | 国内访问 | 免费额度 | 自动部署 | 推荐度 |
|------|---------|---------|---------|--------|
| **Cloudflare Pages** | ✅ 稳定 | ✅ 无限 | ✅ 是 | ⭐⭐⭐⭐⭐ |
| GitHub Pages | ⚠️ 较慢 | ✅ 免费 | ✅ 是 | ⭐⭐⭐ |
| Gitee Pages | ✅ 快速 | ✅ 免费 | ⚠️ 需手动 | ⭐⭐⭐⭐ |
| Netlify | ❌ 不稳定 | ✅ 免费 | ✅ 是 | ⭐⭐ |

## 推荐使用 Cloudflare Pages

**原因**：
- ✅ 国内访问稳定
- ✅ 完全免费，无限部署和带宽
- ✅ 自动 HTTPS
- ✅ 全球 CDN，速度快
- ✅ GitHub 推送自动部署

## 更新网站

每次修改代码后：

```bash
git add .
git commit -m "更新描述"
git push
```

Cloudflare Pages 会自动检测并重新部署（约 3-5 分钟）。

