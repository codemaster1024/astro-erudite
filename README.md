# saynice-site

基于 [Astro](https://astro.build/)、[Tailwind CSS](https://tailwindcss.com/) 和 [shadcn/ui](https://ui.shadcn.com/) 构建的个人博客与内容站。

当前站点用于承载个人写作、技术分享、关于页与相册入口，后续会继续扩展为更完整的个人内容产品。

## 在线地址

- 主站: [https://blog.saynice.cn](https://blog.saynice.cn)
- 相册: [https://photo.saynice.cn](https://photo.saynice.cn)

## 当前功能

- 博客文章与分页列表
- 关于页与个人信息展示
- 相册外链导航
- RSS 输出
- 站内搜索
- 标签页与文章归档能力
- MDX 内容编写

## 技术栈

- Astro 5
- Tailwind CSS 4
- shadcn/ui
- MDX
- TypeScript
- Vercel 部署

## 项目结构

```text
src/
  components/      页面组件与 UI 组件
  content/         博客、作者、项目内容
  layouts/         页面布局
  pages/           路由页面
  styles/          全局样式
  consts.ts        站点信息与导航配置
public/            静态资源
```

## 本地开发

```bash
npm install
npm run dev
```

默认开发地址为 `http://localhost:1234`。

常用命令：

```bash
npm run dev
npm run build
npm run preview
npm run prettier
```

## 内容维护

- 博客文章放在 `src/content/blog/`
- 作者信息放在 `src/content/authors/`
- 项目信息放在 `src/content/projects/`
- 站点标题、导航、社交链接在 `src/consts.ts`

## 部署方式

当前使用 `GitHub + Vercel` 自动部署。

建议分支策略：

- `main`: 保持可发布状态
- `tencent-deploy`: 部署相关与待合并改动
- `feature/*`: 日常功能开发分支

## 后续计划

- 简报 / 周报栏目
- 自动抓取与 AI 摘要接入
- 更完整的项目展示页
- 个人产品与工具页
- 订阅与内容分发能力

## 致谢

本项目仓库名规划为 `saynice-site`，基于 [jktrn/astro-erudite](https://github.com/jktrn/astro-erudite) 二次开发，在原模板基础上做了中文化与个人站定制。
