<template>
  <div class="echarts">
    <IEcharts :option="bar" :loading="loading" @ready="onReady" @click="onClick"></IEcharts>
    <button @click="doRandom">Random</button>
  </div>
</template>

<script type="text/babel">
  import IEcharts from 'vue-echarts-v3/src/full.js'
  export default {
    name: 'view',
    components: {
      IEcharts
    },
    props: {
    },
    data: () => ({
      loading: false,
      bar: {
        title: {
          text: 'ECharts Hello World'
        },
        tooltip: {},
        xAxis: {
          data: ['Hardware', 'Software']
        },
        yAxis: {},
        series: [{
          name: 'Sales',
          type: 'bar',
          data: [4, 5]
        }]
      }
    }),
    mounted () {
      this.getDataFromAPI()
    },
    methods: {
      getDataFromAPI () {
        this.$store.dispatch('getStatsData')
      },
      doRandom () {
        // const that = this
        let data = []
        // let min = null
        // let max = null
        for (let i = 0, min = 5, max = 8; i < 2; i++) {
          data.push(Math.floor(Math.random() * (max + 1 - min) + min))
        }
        // that.loading = !that.loading
        console.log('starting')
        console.log(this.$store.state.statsData)
        this.bar.series[0].data = 5
        this.bar.series[0].data = 10
      },
      onReady (instance) {
        console.log(instance)
      },
      onClick (event, instance, echarts) {
        console.log(arguments)
      }
    }
  }
</script>

<style scoped>
  .echarts {
    width: 500px;
    height: 400px;
  }
</style>