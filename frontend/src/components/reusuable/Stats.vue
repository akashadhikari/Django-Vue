<template>
  <v-container fluid class="pa-0">
    <v-layout>
      <v-flex>
        <v-card style="" color="blue" class="white--text" dark>
          <div>
            <v-tabs style="height:286px" v-model="active">
              <v-tabs-bar class="blue" dark>
                <v-tabs-item
                  v-for="tab in tabs"
                  :key="tab"
                  :href="'#' + tab"
                  ripple
                >
                  {{tab}}
                </v-tabs-item>
                <v-tabs-slider color="white"></v-tabs-slider>
              </v-tabs-bar>
              <v-tabs-items>
                <v-tabs-content
                  class="pl-3 pr-3"
                  v-for="tab in tabs"
                  :key="tab"
                  :id="tab"
                >
                  <v-card class="blue" flat v-for="(value, key) in stats" v-if="key!='item'" :key="key">
                    <br>
                    <v-btn @click="getNewData(active, k )" class="mt-0 mb-0" flat v-for="(v, k) in value" :key="k">
                      <h1 v-if="statsFor=='lead'" class="text-xs-center headline" style="font-weight:300"> {{k}} : {{v}} </h1>
                      <h1 v-if="statsFor=='communication'" class="text-xs-center subheading"> {{k}} : {{v.successful}}/{{v.total}} </h1>
                    </v-btn>
                  </v-card>
                </v-tabs-content>
              </v-tabs-items>
            </v-tabs>
            <div class="text-xs-center mt-3 blue">
              <v-btn flat dark @click.native="next">next tab</v-btn>
            </div>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    props: ['tabs', 'statsFor'],
    data () {
      return {
        active: this.tabs[0],
        start_date: '',
        end_date: '',
        statsFilter: '',
        statFiltersByTime: ['All', 'Today', 'Yesterday', 'This Week', 'This Month', 'This Year']
      }
    },
    computed: {
      ...mapState({
        stats: 'statsData'
      })
    },
    watch: {
      active: function (newVal) {
        this.active = newVal
        this.getDataFromApi()
      }
    },
    mounted () {
      this.getDataFromApi()
    },
    methods: {
      getNewData (active, k) {
        let payload = { baseUrl: 'http://localhost:8000/api/' + this.statsFor + '/items', rowsPerPage: 5, searchvalue: '', ordering: '', offset: 0, field: active, value: k }
        this.$store.dispatch('getTableData', payload)
      },
      next () {
        this.active = this.tabs[(this.tabs.indexOf(this.active) + 1) % this.tabs.length]
      },
      getDataFromApi () {
        let payload = { field: this.active, statsFor: this.statsFor }
        this.$store.dispatch('getStatsData', payload)
      }
    }
  }
</script>

<style scoped>
  .date_picker{
    width:130px;
  }
</style>
