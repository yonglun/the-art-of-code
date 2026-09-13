# The Art of Code — 读书札记

[English](README.md) · [中文](README.zh-CN.md) · [日本語](README.ja.md)

> 这是中文版本。GitHub 默认打开英文版 `README.md`。

这是一个为 Sandrine Banas《The Art of Code》制作的中、英、日三语读书笔记网站。项目将提供的十章内容整理成一间安静的数字阅读室：编辑风格的阅读页面、响应式导航、单色动态插画，以及第一章“优美代码八个维度”的具体说明。

**在线网站：** [yonglun.me/the-art-of-code](https://yonglun.me/the-art-of-code)

## 网站截图

### 首页

![The Art of Code 首页](docs/assets/homepage.png)

### 第一章

![The Art of Code 第一章](docs/assets/chapter-one.png)

## 主要功能

- 支持中文、英文和日文界面及章节笔记；首次访问默认使用英文。
- 十个阅读页面，包含概要、阅读随想、三条带走的内容和札记提炼。
- 第一章具体解释叙事、简单性、意图清晰性、表达力、纯粹性、可持续性、持久性和创造力，并附实践例子。
- 每章都有原创 Canvas 插画：首页和第一章使用抽象莫比乌斯绸带，其余章节使用不同的参数化构图。
- 插画支持仅在可见区域播放、暂停/播放、减少动态效果偏好，以及小屏幕自适应线条密度。
- 阅读页面底部固定上一章、下一章和返回画廊导航，并适配手机安全区域。
- 支持搜索、主题筛选、章节地图、键盘焦点管理和本地阅读进度保存。

## 本地运行

```sh
npm install
npm run dev
```

打开 Vite 输出的本地地址。构建生产版本：

```sh
npm run build
npm run preview
```

这是一个静态 Vite 网站。章节使用类似 `#chapter/aesthetics` 的片段地址，不需要服务端路由重写。

## 测试

运行 Node 回归测试：

```sh
node --test tests/*.test.js
```

测试覆盖插画几何与动画、小画布线条密度、三语八维数据，以及默认英文语言。

## 项目结构

```text
src/
├── App.jsx                    # 应用外壳、地址导航、语言和进度状态
├── content.js                 # 三语章节笔记和八维介绍
├── siteCopy.js                # 三语界面文案和插画文案
├── components/
│   ├── Artwork.jsx            # Canvas 生命周期、可见性和动效控制
│   ├── Gallery.jsx            # 章节地图、搜索和筛选
│   └── Reader.jsx             # 阅读页面和八维介绍
└── art/
    ├── drawings.js            # 插画分发和章节构图
    └── mobius.js              # 首页/第一章抽象绸带
docs/assets/                   # README 使用的截图
tests/                         # Node 回归测试
```

## 内容与版权说明

读书笔记基于本项目提供的十个章节文件整理。本站是独立读书伴侣，不是书籍的复刻。概要、随想、实践例子和提炼句均为编辑整理；需要时会明确标注为本站解释。书籍信息见 [Manning 上的 The Art of Code](https://www.manning.com/books/the-art-of-code)。

本项目采用 [MIT 许可证](LICENSE) 授权。
