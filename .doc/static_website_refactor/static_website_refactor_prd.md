# 静态网站重构 PRD
## Static Website Refactor Product Requirements Document

---

## 目标 (Goal)
将现有的单体静态网站 `index.html` (2038行) 重构为模块化、可维护的前端项目结构，提高代码可读性、可维护性和开发效率。

## 原因 (Why)
- **单体文件过大**: 原 `index.html` 文件达 2038 行，难以维护
- **代码耦合度高**: HTML、CSS、JavaScript 混杂在一个文件中
- **功能扩展困难**: 新增功能需要修改整个文件
- **协作开发困难**: 多人修改同一文件易产生冲突
- **调试效率低**: 错误定位困难，代码逻辑不清晰

## 现状分析 (Current State)

### 已完成的拆分工作
✅ **第一阶段拆分完成** (2025年初)
- `index.html` → `legacy-static/index.html` (896行)
- CSS 样式 → `legacy-static/styles.css` (694行)
- JavaScript 功能 → `legacy-static/script.js` (359行)
- 总计减少: 2038 → 1949 行

### 现有项目结构
```
jaysean1.github.io/
├── index.html                  # 原始文件 (2038行)
├── legacy-static/              # 已拆分的模块化版本
│   ├── index.html             # 重构后的HTML (896行)
│   ├── styles.css             # 样式文件 (694行)
│   ├── script.js              # JavaScript功能 (359行)
│   └── README.md              # 说明文档
├── nextjs-portfolio/           # Next.js 现代化版本
└── html/mediapipe/            # 3D手势追踪演示
```

## 需求定义 (What)

### 成功标准
- [ ] 组件化架构: 每个功能模块独立
- [ ] 响应式设计: 移动端和桌面端适配
- [ ] 性能优化: 图片懒加载、代码压缩
- [ ] 可维护性: 清晰的文件结构和代码注释
- [ ] 兼容性: 保持现有功能不变
- [ ] 部署方便: 支持 GitHub Pages 部署

### 功能模块识别
根据代码分析，网站包含以下核心功能模块：

1. **导航模块** (Navigation)
   - 固定导航栏
   - 响应式菜单
   - 平滑滚动导航

2. **首页模块** (Hero)
   - 个人介绍
   - 背景特效
   - 鼠标跟随效果

3. **关于我模块** (About)
   - 个人信息
   - 能力标签页
   - 技能展示

4. **工作经验模块** (Experience)
   - 时间线布局
   - 公司信息
   - 项目展示

5. **成就与专利模块** (Achievements)
   - 数字计数器动画
   - 专利列表
   - 成就展示

6. **联系方式模块** (Contact)
   - 联系信息
   - 社交媒体链接
   - 邮件集成

7. **图片轮播模块** (Testimonials)
   - 无限滚动
   - 图片展示
   - 响应式布局

8. **图片模态框** (Image Modal)
   - 点击放大
   - 键盘导航
   - 关闭功能

## 所需上下文 (All Needed Context)

### 技术栈分析
```yaml
当前技术栈:
  - HTML5: 语义化标签
  - CSS3: 自定义动画、Flexbox、Grid
  - JavaScript: 原生ES6+，无框架依赖
  - Tailwind CSS: 通过CDN引入
  - 外部库:
    - Font Awesome 6.4.0 (图标)
    - ECharts 5.5.0 (图表)
    - Lucide Icons (图标)
    - Google Fonts (Pacifico字体)
  - 分析工具:
    - Google Analytics (G-J4RKB1D6WY)
```

### 当前文件结构
```bash
legacy-static/
├── index.html          # 主HTML文件
├── styles.css          # 样式文件
├── script.js           # JavaScript功能
└── README.md           # 说明文档
```

### 目标文件结构
```bash
legacy-static-refactored/
├── index.html                   # 主HTML文件
├── assets/                      # 静态资源
│   ├── css/
│   │   ├── components/          # 组件样式
│   │   │   ├── navigation.css
│   │   │   ├── hero.css
│   │   │   ├── about.css
│   │   │   ├── experience.css
│   │   │   ├── achievements.css
│   │   │   ├── contact.css
│   │   │   └── testimonials.css
│   │   ├── base/                # 基础样式
│   │   │   ├── reset.css
│   │   │   ├── variables.css
│   │   │   └── typography.css
│   │   └── main.css             # 主样式文件
│   ├── js/
│   │   ├── components/          # 组件JS
│   │   │   ├── navigation.js
│   │   │   ├── hero.js
│   │   │   ├── about.js
│   │   │   ├── experience.js
│   │   │   ├── achievements.js
│   │   │   ├── contact.js
│   │   │   └── testimonials.js
│   │   ├── utils/               # 工具函数
│   │   │   ├── animations.js
│   │   │   ├── modal.js
│   │   │   └── helpers.js
│   │   └── main.js              # 主JS文件
│   └── images/                  # 图片资源
│       ├── hero/
│       ├── about/
│       ├── experience/
│       └── testimonials/
├── components/                  # HTML组件
│   ├── navigation.html
│   ├── hero.html
│   ├── about.html
│   ├── experience.html
│   ├── achievements.html
│   ├── contact.html
│   └── testimonials.html
├── config/                      # 配置文件
│   ├── tailwind.config.js
│   └── site.config.js
├── build/                       # 构建输出
└── README.md                    # 项目说明
```

### 已知问题和限制
```javascript
// 关键问题:
// 1. 图片路径引用 - 需要统一管理
// 2. Tailwind CSS 配置 - 需要外部化
// 3. Google Analytics - 需要配置化
// 4. 响应式图片 - 需要优化
// 5. 浏览器兼容性 - 需要测试
// 6. 性能优化 - 需要压缩和懒加载
```

## 实施方案 (Implementation Blueprint)

### 数据结构和配置

#### 网站配置文件
```javascript
// config/site.config.js
const siteConfig = {
  meta: {
    title: "Personal Resume - Sui Qian",
    description: "Senior Internet Product Manager & Technical Leader",
    keywords: ["Product Manager", "Technical Leader", "Resume"],
    author: "Sui Qian"
  },
  analytics: {
    googleAnalyticsId: "G-J4RKB1D6WY"
  },
  social: {
    email: "contact@example.com",
    linkedin: "https://linkedin.com/in/example",
    github: "https://github.com/example"
  },
  theme: {
    primary: "#2563eb",
    secondary: "#3b82f6",
    background: "#15171a",
    cardBackground: "#23262b",
    textPrimary: "#f4f4f5",
    textSecondary: "#e0e7ef"
  }
};
```

#### Tailwind CSS 配置
```javascript
// config/tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./components/**/*.html",
    "./assets/js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        secondary: '#3b82f6',
        background: '#15171a',
        card: '#23262b',
        'text-primary': '#f4f4f5',
        'text-secondary': '#e0e7ef'
      },
      borderRadius: {
        'button': '4px'
      }
    }
  }
};
```

### 按顺序完成的任务列表

#### 阶段1: 项目结构搭建
```yaml
Task 1: 创建目录结构
  - 创建 legacy-static-refactored 目录
  - 创建 assets/{css,js,images} 子目录
  - 创建 components, config, build 目录
  - 复制现有文件到新结构

Task 2: 配置文件外部化
  - 创建 config/site.config.js
  - 创建 config/tailwind.config.js
  - 将 Tailwind 配置从 HTML 中提取

Task 3: 基础样式拆分
  - 创建 assets/css/base/reset.css
  - 创建 assets/css/base/variables.css
  - 创建 assets/css/base/typography.css
  - 从现有 styles.css 中提取基础样式
```

#### 阶段2: 组件拆分
```yaml
Task 4: HTML 组件拆分
  - 创建 components/navigation.html
  - 创建 components/hero.html
  - 创建 components/about.html
  - 创建 components/experience.html
  - 创建 components/achievements.html
  - 创建 components/contact.html
  - 创建 components/testimonials.html

Task 5: CSS 组件拆分
  - 创建对应的组件CSS文件
  - 从 styles.css 中提取各组件样式
  - 优化选择器和样式层次

Task 6: JavaScript 组件拆分
  - 创建对应的组件JS文件
  - 从 script.js 中提取各组件功能
  - 实现模块化加载
```

#### 阶段3: 功能优化
```yaml
Task 7: 图片资源优化
  - 整理图片资源到 assets/images/
  - 实现图片懒加载
  - 优化图片格式和尺寸

Task 8: 性能优化
  - 代码压缩
  - 资源合并
  - 缓存优化

Task 9: 响应式优化
  - 移动端适配
  - 触摸事件支持
  - 性能监控
```

#### 阶段4: 构建和部署
```yaml
Task 10: 构建系统
  - 创建简单的构建脚本
  - 实现资源合并和压缩
  - 生成最终的部署文件

Task 11: 测试和验证
  - 功能测试
  - 兼容性测试
  - 性能测试

Task 12: 文档完善
  - 更新 README.md
  - 添加组件文档
  - 部署说明
```

### 关键组件伪代码

#### 导航组件
```javascript
// assets/js/components/navigation.js
class Navigation {
  constructor() {
    this.navElement = document.querySelector('nav');
    this.links = this.navElement.querySelectorAll('.nav-link');
    this.init();
  }

  init() {
    this.bindEvents();
    this.updateActiveLink();
  }

  bindEvents() {
    // 滚动监听
    window.addEventListener('scroll', () => {
      this.updateActiveLink();
    });

    // 点击平滑滚动
    this.links.forEach(link => {
      link.addEventListener('click', (e) => {
        this.smoothScroll(e.target.getAttribute('href'));
      });
    });
  }

  smoothScroll(target) {
    // 平滑滚动到目标位置
    const element = document.querySelector(target);
    element.scrollIntoView({ behavior: 'smooth' });
  }

  updateActiveLink() {
    // 根据当前滚动位置更新活跃链接
    // 实现逻辑...
  }
}
```

#### 图片轮播组件
```javascript
// assets/js/components/testimonials.js
class TestimonialsCarousel {
  constructor() {
    this.container = document.querySelector('.testimonials-carousel-container');
    this.rows = this.container.querySelectorAll('.testimonials-row');
    this.init();
  }

  init() {
    this.setupInfiniteScroll();
    this.bindEvents();
  }

  setupInfiniteScroll() {
    // 实现无限滚动逻辑
    this.rows.forEach((row, index) => {
      const direction = index % 2 === 0 ? 'left' : 'right';
      row.style.animationDirection = direction;
    });
  }

  bindEvents() {
    // 鼠标悬停暂停动画
    this.container.addEventListener('mouseenter', () => {
      this.pauseAnimation();
    });

    this.container.addEventListener('mouseleave', () => {
      this.resumeAnimation();
    });
  }
}
```

### 集成点

#### 资源管理
```yaml
CSS 加载顺序:
  1. assets/css/base/reset.css
  2. assets/css/base/variables.css
  3. assets/css/base/typography.css
  4. assets/css/components/*.css
  5. assets/css/main.css

JavaScript 加载顺序:
  1. 外部库 (Tailwind, ECharts, etc.)
  2. config/site.config.js
  3. assets/js/utils/*.js
  4. assets/js/components/*.js
  5. assets/js/main.js
```

#### 构建集成
```bash
# 简单构建脚本
#!/bin/bash
# 合并CSS文件
cat assets/css/base/*.css assets/css/components/*.css > build/styles.min.css

# 合并JavaScript文件
cat assets/js/utils/*.js assets/js/components/*.js assets/js/main.js > build/scripts.min.js

# 压缩文件
# 需要安装: npm install -g clean-css-cli terser
cleancss -o build/styles.min.css build/styles.min.css
terser build/scripts.min.js -o build/scripts.min.js
```

## 验证循环 (Validation Loop)

### 第一级: 语法和样式
```bash
# CSS 验证
npx stylelint "assets/css/**/*.css"

# JavaScript 验证
npx eslint "assets/js/**/*.js"

# HTML 验证
npx html-validate index.html
```

### 第二级: 功能测试
```javascript
// 功能测试清单
const functionalTests = [
  "导航链接正常跳转",
  "图片轮播正常滚动",
  "模态框正常打开关闭",
  "响应式布局适配",
  "数字计数器动画",
  "表单提交功能",
  "图片懒加载",
  "平滑滚动效果"
];

// 手动测试步骤
// 1. 打开网站
// 2. 测试每个功能模块
// 3. 在不同设备上测试
// 4. 检查控制台错误
```

### 第三级: 性能测试
```bash
# 本地服务器启动
python -m http.server 8000

# 或者使用 Node.js
npx serve legacy-static-refactored

# 性能测试工具
# - Chrome DevTools (Lighthouse)
# - WebPageTest
# - GTmetrix
```

## 最终验证清单
- [ ] 所有功能正常工作
- [ ] 无控制台错误
- [ ] 响应式设计正确
- [ ] 图片正确加载
- [ ] 性能指标达标 (Lighthouse > 90)
- [ ] 跨浏览器兼容
- [ ] 代码结构清晰
- [ ] 文档完善

## 反模式避免
- ❌ 避免创建过度复杂的组件结构
- ❌ 避免过度工程化，保持简洁
- ❌ 避免破坏现有功能
- ❌ 避免忽略性能优化
- ❌ 避免缺乏文档说明
- ❌ 避免不兼容的浏览器特性

## 风险评估
- **技术风险**: 低 (使用成熟技术)
- **时间风险**: 中 (需要仔细测试)
- **维护风险**: 低 (结构清晰)
- **兼容风险**: 低 (向后兼容)

## 项目时间估算
- 阶段1: 项目结构搭建 (2-3天)
- 阶段2: 组件拆分 (5-7天)
- 阶段3: 功能优化 (3-4天)
- 阶段4: 构建和部署 (2-3天)
- **总计**: 12-17天

## 成功率评估
**评分: 9/10**

**信心等级**: 高度自信能够一次性成功实现

**理由**:
- 现有代码已经功能完整
- 技术栈简单成熟
- 结构清晰易于拆分
- 有完整的测试计划
- 风险可控

---

*本PRD文档版本: v1.0*
*创建日期: 2025-01-17*
*更新日期: 2025-01-17*