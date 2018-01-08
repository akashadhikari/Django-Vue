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
            <figure><chart :options="pie" auto-resize></chart></figure>
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
  import ECharts from './ECharts'
  import { mapState } from 'vuex'

  export default {
    name: 'PieChart',
    components: {
      chart: ECharts
    },
    props: ['chartFor', 'chartOf', 'chartForUser', 'tabs'],
    data () {
      return {
        active: this.tabs[0],
        loading: false,
        pie: {
          title: {
            text: '',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: []
          },
          series: [
            {
              name: '',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: [],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
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
        this.pie.series[0].data = this.pieData
      },
      pieLegend: function (newVal) {
        this.pieLegend = newVal
        this.pie.legend.data = this.pieLegend
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
<style>
figure  .echarts {

}
figure{
    width: 100%;
}
figure .echarts{
  width: 39vw;
  min-width: 0;
  height: 250px;
}
@media (min-width:980px){
  figure  .echarts{
      width: 39vw;
      height: 250px;
    }
}
@media (max-width:600px){
  figure  .echarts{
      width: 83vw;
      height: 250px
    }
}

</style>