<template>
  <div class="echarts"></div>
</template>

<style>
.echarts {
  width: 200px;
  height: 400px;
}
</style>
<script>
import echarts from 'echarts/lib/echarts'
export default {
  props: {
    options: Object,
    theme: [String, Object],
    initOptions: Object,
    group: String,
    autoResize: Boolean
  },
  watch: {
    options: function (newVal) {
      this.options = newVal
    }
  },
  methods: {
    init () {
      let chart = echarts.init(this.$el, this.theme, this.initOptions)
      chart.setOption(this.options, true)
      if (this.autoResize) {
        this.a = () => {
          chart.resize()
        }
        window.addEventListener('resize', this.a)
      }
    }
  },
  mounted () {
    alert(this.options.legend.data)
    // auto init if `options` is already provided
    if (this.options) {
      this.init()
    }
  }
}
</script>
  