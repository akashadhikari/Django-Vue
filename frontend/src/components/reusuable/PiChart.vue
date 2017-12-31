<template>
  <v-card style="" color="white" light>
    <div>
      <v-tabs style="height:286px" v-model="active">
        <v-tabs-bar class="">
          <v-tabs-item
            v-for="tab in tabs"
            :key="tab"
            :href="'#' + tab"
            ripple
          >
            {{tab}}
          </v-tabs-item>
          <v-tabs-slider color="blue"></v-tabs-slider>
        </v-tabs-bar>
        <v-tabs-items>
          <v-tabs-content
            class="pl-3 pr-3"
            v-for="tab in tabs"
            :key="tab"
            :id="tab"
          >
          <div class="echarts">
            <IEcharts class="echarts" :option="pie"  :loading="loading" @ready="onReady" @click="onClick"></IEcharts>
          </div>
          </v-tabs-content>
        </v-tabs-items>
      </v-tabs>
      <div class="text-xs-center mt-3 white blue--text">
        <v-btn flat @click.native="next" class="blue--text">next tab</v-btn>
      </div>
    </div>
  </v-card>
</template>

<script type="text/babel">
  import IEcharts from 'vue-echarts-v3/src/full.js'
  import { mapState } from 'vuex'
  export default {
    name: 'PieChart',
    components: {
      IEcharts
    },
    props: ['chartFor', 'chartOf', 'chartForUser', 'tabs'],
    data () {
      return {
        active: this.tabs[0],
        loading: false,
        pie: {
          baseOption: {
            title: {
              text: '',
              subtext: '',
              x: 'center'
            },
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
              data: []
            },
            calculable: true,
            series: [
              {
                name: '',
                type: 'pie',
                data: [],
                label: {
                  normal: {
                    show: false
                  }
                }
              }
            ]
          },
          media: [
            {
              option: {
                legend: {
                  right: 'center',
                  bottom: 0,
                  orient: 'horizontal'
                },
                series: [
                  {
                    radius: [0, '50%'],
                    center: ['75%', '50%']
                  }
                ]
              }
            },
            {
              query: {
                minAspectRatio: 1
              },
              option: {
                legend: {
                  right: 'center',
                  bottom: 0,
                  orient: 'horizontal'
                },
                series: [
                  {
                    radius: [0, '50%'],
                    center: ['50%', '50%']
                  }
                ]
              }
            },
            {
              query: {
                maxAspectRatio: 1
              },
              option: {
                legend: {
                  right: 'center',
                  bottom: 0,
                  orient: 'horizontal'
                },
                series: [
                  {
                    radius: [0, '50%'],
                    center: ['50%', '50%']
                  }
                ]
              }
            },
            {
              query: {
                maxWidth: 500
              },
              option: {
                legend: {
                  left: 10,
                  top: '15%',
                  orient: 'vertical'
                },
                series: [
                  {
                    radius: [0, '50%'],
                    center: ['50%', '50%']
                  }
                ]
              }
            }
          ]
        }
      }
    },
    computed: {
      ...mapState({
        pieData: 'pieData',
        pieLegend: 'pieLegend'
      })
    },
    watch: {
      active: function (newVal) {
        this.active = newVal
        this.getDataFromApi()
      },
      pieData: function (newVal) {
        this.pieData = newVal
        this.pie.baseOption.series[0].data = this.pieData
      },
      pieLegend: function (newVal) {
        this.pieLegend = newVal
        this.pie.baseOption.legend.data = this.pieLegend
      }
    },
    mounted () {
      this.getDataFromApi()
    },
    methods: {
      next () {
        this.active = this.tabs[(this.tabs.indexOf(this.active) + 1) % this.tabs.length]
      },
      getDataFromApi () {
        let payload = { field: this.active, chartOf: this.chartOf }
        this.$store.dispatch('getPieData', payload)
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
@media only screen and (min-width: 960px) {
  .echarts {
    width: 390px!important;
    height: 300px!important;
  }
}
@media only screen and (min-width: 1264px) {
  .echarts {
    width: 500px!important;
    height: 300px!important;
  }
}
</style>
