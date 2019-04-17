<template>
  <div class="button-bar">
    <div class="top-buttons">
      <button class="btn-text" :class="{focus: showNavigationBar}" type="button" @click="toggleNavigationBar()" title="切换导航栏">
        <svg><use xlink:href="#editor-nav"></use></svg>
      </button>
      <button class="btn-text" :class="{focus: showPreview}" type="button" @click="togglePreview()" title="切换预览">
        <svg><use xlink:href="#editor-preview"></use></svg>
      </button>
      <button class="btn-text" :class="{focus: !showEditor}" type="button" @click="toggleEditor()" title="阅读模式">
        <svg><use xlink:href="#editor-read"></use></svg>
      </button>
      <button class="btn-text" :class="{focus: scrollSync}" type="button" @click="toggleScrollSync()" title="切换同步滚动">
        <svg><use xlink:href="#editor-sync"></use></svg>
      </button>
    </div>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'

  export default {
    computed: {
      ...mapState(['scrollSync']),
      ...mapState('layout', ['showNavigationBar', 'showPreview', 'showEditor'])
    },
    methods: {
      ...mapMutations(['toggleScrollSync']),
      ...mapMutations('layout', [
        'toggleNavigationBar',
        'togglePreview',
        'toggleEditor'
      ])
    }
  }
</script>
