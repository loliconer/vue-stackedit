# Overview

[官方可集成版本](https://benweet.github.io/stackedit.js/)

Vue-stackedit 是基于 [stackedit](https://stackedit.io) 开发的一款在线markdown编辑器。

目前市面上已经有很多开源的的在线markdown编辑器了，经过多方调研后发现功能比较齐全且强大的有stackedit和作业部落的mdeditor，但是作业部落的产品并未开源，因此决定采用stackedit。

stackedit是一个完整的网站产品，但是很多情况下，我们只需要其中的编辑器功能，并且希望能方便地集成到自己的产品中，因此决定将其中的编辑器部分剥离出来，单独做成一个库，方便直接在自己的产品中调用。

编辑出来的文件基本可用，但是源文件中的store部分其实很多都不需要，而直接删掉又会报错，其中关联有点复杂，因此直接保留下来，以后有时间再慢慢梳理。强烈欢迎志愿者做贡献。

stackedit是基于Vue.js框架开发的，本项目沿用Vue.js框架，使用vue-cli工具开发，该版本暂不支持Latex公式，有需要的可在`src/extensions/index.js`中添加扩展。

该编辑器依赖`lovue`组件库的一些组件，以及图标库`iconfont.js`，需单独安装。

上传本地图片使用的请求是`lovue`组件库中带的`$fetch.form()`方法，也可以自己定义全局变量`$fetch`。

自带一个Prism主题实现语法高亮。

[Demo](https://stackedit.now.sh/)

# 开发与编译

```bash
git clone https://github.com/loliconer/vue-stackedit.git
cd vue-stackedit
npm install
npm run serve
npm run build
```

# 引用
既可以通过script标签引用，也可以import。

```html
<script src="/dist/vueStackedit.umd.js"></script>
<div id="app">
  <v-editor url="上传本地图片的api" upload-field="上传本地图片请求的字段"></v-editor>
</div>

<script>
Vue.component(vueStackedit.name, vueStackedit)
new Vue({
  methods: {
    setContent() {
      vueStackedit.methods.setContent('hello')
    },
    getContent() {
      console.log(vueStackedit.methods.getContent())
    }
  }
}).$mount('#app')
</script>
```
