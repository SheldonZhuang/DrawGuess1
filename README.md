# 🎨 AI 你画我猜

一个有趣的在线游戏，你在画布上作画，AI 负责猜测你画的是什么！

## ✨ 功能特点

- 🖌️ 流畅的 HTML5 Canvas 绘画体验
- 🤖 使用 Qwen2.5-VL-72B-Instruct 视觉模型进行智能识别
- 🎯 简洁美观的用户界面
- 📱 响应式设计，支持各种设备

## 🚀 在线体验

[点击这里开始游戏](#) _(部署后更新链接)_

## 🛠️ 技术栈

- **前端框架**: Next.js 15 + React 19
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **AI 服务**: 硅基流动 API (Qwen/Qwen2.5-VL-72B-Instruct)

## 📦 本地运行

1. 克隆项目
```bash
git clone <your-repo-url>
cd DrawGuess
```

2. 安装依赖
```bash
npm install
```

3. 配置环境变量

创建 `.env.local` 文件并添加你的 API key：
```env
SILICONFLOW_API_KEY=your_api_key_here
SILICONFLOW_API_URL=https://api.siliconflow.cn/v1/chat/completions
```

4. 启动开发服务器
```bash
npm run dev
```

5. 打开浏览器访问 `http://localhost:3000`

## 🎮 如何玩

1. 在白色画布上用鼠标画画
2. 点击 **"让 AI 猜"** 按钮
3. AI 会分析你的画并给出猜测
4. 点击 **"清空画布"** 重新画，或 **"重新开始"** 开始新游戏

## 💡 绘画建议

为了获得更好的识别效果，建议画一些简单清晰的物体：
- 🌞 太阳、⭐ 星星、🌙 月亮
- 🏠 房子、🚗 汽车、✈️ 飞机
- 🐱 猫、🐶 狗、🐟 鱼
- 🍎 苹果、🍌 香蕉、🍕 披萨
- 🌳 树、🌸 花、☁️ 云

## 📝 许可证

MIT License

## 🙏 致谢

- AI 模型由 [硅基流动](https://cloud.siliconflow.cn) 提供
- 使用 [Next.js](https://nextjs.org/) 构建
