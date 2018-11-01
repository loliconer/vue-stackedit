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

    <div class="bottom-buttons">
      <!--<button class="btn-text" type="button" @click="toggleStatusBar()">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24">
          <path d="M19,15.023l-14,0l0,-10l14,0m0,-2l-14,0c-1.104,0 -2,0.896 -2,2l0,10c0,1.105 0.896,2 2,2l14,0c1.105,0 2,-0.895 2,-2l0,-10c0,-1.104 -0.895,-2 -2,-2Z"/>
          <rect x="3" y="18.977" width="18" height="2"/>
        </svg>
      </button>-->
    </div>
  </div>
</template>

<script>
  import {mapState, mapGetters, mapActions} from 'vuex'

  export default {
    computed: {
      ...mapGetters('data', [
        'layoutSettings'
      ]),
      ...mapState(['scrollSync']),
      ...mapState('layout', ['showNavigationBar', 'showPreview', 'showEditor'])
    },
    methods: {
      ...mapActions(['toggleScrollSync']),
      ...mapActions('data', [
        'toggleStatusBar',
        'toggleFocusMode'
      ]),
      ...mapActions('layout', [
        'toggleNavigationBar',
        'togglePreview',
        'toggleEditor'
      ])
    }
  }
</script>
