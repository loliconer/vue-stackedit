<template>
  <nav class="ve-nav-bar">
    <div class="bar-left">
      <button class="btn-text" type="button" @click="formatDoc('undo')" title="撤销" :disabled="!canUndo">
        <svg><use xlink:href="#editor-fa-undo"></use></svg>
      </button>
      <button class="btn-text" type="button" @click="formatDoc('redo')" title="重做" :disabled="!canRedo">
        <svg><use xlink:href="#editor-fa-redo"></use></svg>
      </button>
      <button class="btn-text" type="button" v-for="item of items" @click="formatDoc(item.name)" :title="item.title">
        <svg><use :xlink:href="`#editor-${item.icon}`"></use></svg>
      </button>
      <button class="btn-text" type="button" @click="toggleFullscreen" title="切换全屏">
        <svg v-show="!fullscreen"><use xlink:href="#editor-fullscreen"></use></svg>
        <svg v-show="fullscreen"><use xlink:href="#editor-exit-fullscreen"></use></svg>
      </button>
    </div>
  </nav>
</template>
<script>
  import {mapState, mapMutations} from 'vuex'
  import editorSvc from '../services/editorSvc'

  export default {
    data() {
      return {
        items: [
          { name: 'bold', title: '粗体', icon: 'fa-bold', key: 'shift+alt+b' },
          { name: 'italic', title: '斜体', icon: 'fa-italic', key: 'shift+alt+i' },
          { name: 'strikethrough', title: '删除线', icon: 'fa-strikethrough', key: 'shift+alt+d' },
          { name: 'heading', title: '标题', icon: 'fa-header', key: 'shift+alt+h' },
          { name: 'quote', title: '引用', icon: 'fa-quote-left', key: 'shift+alt+q' },
          { name: 'code', title: '代码', icon: 'fa-code', key: 'shift+alt+c' },
          { name: 'olist', title: '有序列表', icon: 'fa-list-ol', key: 'shift+alt+o' },
          { name: 'ulist', title: '无序列表', icon: 'fa-list-ul', key: 'shift+alt+u' },
          { name: 'link', title: '链接', icon: 'fa-link', key: 'shift+alt+l' },
          { name: 'table', title: '表格', icon: 'fa-table', key: 'shift+alt+t' },
          { name: 'hr', title: '分隔线', icon: 'minus', key: 'shift+alt+n' },
          { name: 'image', title: '图片', icon: 'fa-picture', key: 'shift+alt+i' }
        ]
      }
    },
    computed: {
      ...mapState('layout', ['canUndo', 'canRedo', 'fullscreen'])
    },
    methods: {
      ...mapMutations('layout', ['toggleFullscreen']),
      formatDoc(cmd) {
        if (cmd === 'undo') return editorSvc.clEditor.undoMgr.undo()
        if (cmd === 'redo') return editorSvc.clEditor.undoMgr.redo()
        if (cmd === 'fullscreen') return this.toggleFullscreen()
        if (cmd === 'image') return this.$emit('upload-img')

        editorSvc.pagedownEditor.uiManager.doClick(cmd)
      }
    }
  }
</script>
