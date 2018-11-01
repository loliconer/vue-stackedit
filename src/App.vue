<template>
  <div class="v-editor" :class="{fullscreen: fullscreen}">
    <custom-svg/>
    <v-popup title="上传图片" v-model="showUpload" :confirm="uploadImage">
      <template slot="content">
        <div class="v-tab-wrap">
          <v-tab :titles="tabTitles" @select="selectTab"></v-tab>
        </div>
        <div class="up-panel upload-url" v-if="uploadUrl">
          <div class="input-url">
            <label class="label">图片地址：</label>
            <v-input v-model="imageUrl"></v-input>
          </div>
        </div>

        <div class="up-panel upload-file" v-else>
          <div class="input-file">
            <v-upload @select="selectFiles" thumbnail></v-upload>
          </div>
        </div>
      </template>
    </v-popup>

    <div class="ve-head" v-show="showNavigationBar">
      <navigation-bar @do-click="clickNavbar"></navigation-bar>
    </div>
    <div class="ve-body">
      <div class="ve-editor" :class="{expand: !showPreview}" v-show="showEditor">
        <pre class="editor-inner markdown-highlighting"></pre>
      </div>
      <div class="ve-button">
        <button-bar></button-bar>
      </div>
      <div class="ve-preview" :class="{expand: !showEditor}" v-show="showPreview">
        <div class="preview-inner blog"></div>
      </div>
    </div>
  </div>
</template>
<script>
  import './extensions'
  import './services/optional'
  import CustomSvg from './components/Svg.vue'
  import NavigationBar from './components/NavigationBar.vue'
  import ButtonBar from './components/ButtonBar.vue'
  import editorSvc from './services/editorSvc'
  import store from './store'
  import {mapState} from 'vuex'

  export default {
    name: 'v-editor',
    data() {
      return {
        tabTitles: [
          { name: '上传网络图片' },
          { name: '上传本地图片' }
        ],
        showUpload: false,
        imageUrl: '',
        uploadUrl: true,
        files: []
      }
    },
    store,
    components: { CustomSvg, NavigationBar, ButtonBar },
    computed: {
      ...mapState('layout', ['showNavigationBar', 'showPreview', 'showEditor', 'fullscreen'])
    },
    props: {
      url: String,
      uploadField: String
    },
    methods: {
      clickNavbar(cmd) {
        if (cmd === 'image') {
          this.imageUrl = ''
          this.uploadUrl = true
          this.showUpload = true
        }
      },
      selectTab(i) {
        this.uploadUrl = i === 0
      },
      selectFiles(files) {
        this.files = files
      },
      async uploadImage() {
        const form = new FormData()
        for (let i = 0; i < this.files.length; i++) {
          form.append(this.uploadField || 'files', this.files[i])
        }

        if (this.uploadUrl) {
          if (this.imageUrl === '') {
            this.warn('请填写图片地址')
            return false
          }
          this.insertImage(this.imageUrl)
          return true
        }

        const body = await $fetch.form(this.url || 'files', form).catch(this.error)
        if (body === undefined) return

        this.insertImage(body)
        return true
      },
      insertImage(url) {
        store.commit('setUrl', url)
        editorSvc.pagedownEditor.uiManager.doClick('image')
      },
      getContent() {
        return editorSvc.clEditor.getContent()
      },
      setContent(text) {
        editorSvc.clEditor.setContent(text)
      }
    },
    mounted() {
      const editorElt = this.$el.querySelector('.ve-editor .editor-inner')
      const previewElt = this.$el.querySelector('.ve-preview .preview-inner')
      const tocElt = this.$el.querySelector('.ve-head')
      editorSvc.init(editorElt, previewElt, tocElt)
    }
  }
</script>
<style type="text/less" lang="less">
  @import "less/style";
</style>
