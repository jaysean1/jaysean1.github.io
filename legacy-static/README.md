# Legacy Static Website - Modular Version

## 概述
这是从原始的 `index.html` (2038行) 重构后的模块化静态网站版本。

## 文件结构
```
legacy-static/
├── index.html     # 主HTML文件 (896行)
├── script.js      # JavaScript功能 (359行)
├── styles.css     # CSS样式 (694行)
└── README.md      # 此说明文件
```

## 重构成果
- **总行数**: 从 2038 行减少到 1949 行
- **代码分离**: HTML、CSS、JavaScript 完全分离
- **维护性**: 每个文件职责单一，便于维护
- **兼容性**: 保持与原网站完全相同的功能和样式

## 使用方法
1. 本地开发服务器:
   ```bash
   # Python
   python -m http.server 8000
   
   # Node.js
   npx serve .
   ```

2. 在浏览器中访问 `http://localhost:8000`

## 技术栈
- **HTML5**: 语义化标签
- **CSS3**: 自定义样式和动画
- **JavaScript**: 原生JavaScript，无框架依赖
- **Tailwind CSS**: 通过CDN引入
- **外部库**: 
  - Font Awesome (图标)
  - ECharts (图表)
  - Lucide Icons (图标)
  - Google Fonts (字体)

## 特性
- 响应式设计
- 平滑滚动动画
- 图片轮播
- 动态数字计数器
- 模态框组件
- 深色主题
- Google Analytics 集成

## 下一步重构计划
参考根目录下的 `.doc/static_website_refactor/static_website_refactor_prd.md` 文件。

## 部署
可以直接部署到 GitHub Pages 或任何静态网站托管服务。