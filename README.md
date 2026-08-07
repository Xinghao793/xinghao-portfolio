# 王星皓 · 个人经历网站

从零搭建的个人求职网站，浅色杂志 editorial 风格，多页面结构，支持实习日志检索和 AI 助手占位。

## 本地运行

```bash
npm install
npm run dev
```

打开 http://localhost:3000 即可预览。

## 页面结构

- `/` 首页
- `/about` 关于我
- `/experience` 中信证券实习经历
- `/journal` 实习日志（支持搜索、类型与标签筛选）
- `/journal/[id]` 单篇日志
- `/skills` 技能能力
- `/awards` 荣誉活动
- `/contact` 联系我

## 内容如何迭代

所有内容都放在 `content/` 目录，修改后刷新即可：

- `content/profile.json` 个人资料与自我介绍
- `content/experience.json` 实习经历
- `content/skills.json` 技能能力
- `content/awards.json` 荣誉活动
- `content/journals.json` 实习日志（自动生成）

新增实习日志时，把新的 `.docx` 放进原日志文件夹，运行：

```bash
python scripts/extract_journals.py
python scripts/build_journals_json.py
```

脚本会按文件名解析日期与类型，并生成结构化 JSON。
日志源文件默认读取 `C:\Users\LENOVO\Desktop\日志`，中间文件输出到 `work/journals-md`（已被 Git 忽略），最终数据写入 `content/journals.json`。

## AI 助手

当前是占位版本，聊天气泡与固定问答已经可用。

二期接入 DeepSeek：

1. 在 [DeepSeek 开放平台](https://platform.deepseek.com) 创建 API Key。
2. 在部署环境配置环境变量 `DEEPSEEK_API_KEY`。
3. 在 `app/api/chat/route.ts` 中调用 `deepseek-chat`，用 `content/` 下的个人资料与日志作为知识库。

## 部署

推荐 GitHub + Vercel：

1. 在 GitHub 新建仓库 `xinghao-portfolio` 并推送。
2. 在 Vercel 导入该仓库，框架选择 Next.js，使用默认配置。
3. 部署完成后，把线上链接放进简历。
