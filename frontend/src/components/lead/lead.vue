<template>
    <v-flex xs12>
        <h1 class="pl-2">Lead</h1>
        From
        <v-menu
          class="ml-4"
          lazy
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          :nudge-right="40"
          max-width="290px"
          min-width="290px"
        >
          <v-text-field
            class='date_picker'
            v-model="start_date"
            slot="activator"
            label="Start Date"
            prepend-icon="event"
            readonly
          ></v-text-field>
          <v-date-picker v-model="start_date" no-title scrollable actions>
            <template slot-scope="{ save, cancel }">
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                <v-btn flat color="primary" @click="save">OK</v-btn>
              </v-card-actions>
            </template>
          </v-date-picker>
        </v-menu>
        To
        <v-menu
                  class="ml-4"
                  lazy
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  :nudge-right="40"
                  max-width="290px"
                  min-width="290px"
                >
                  <v-text-field
                    class='date_picker'
                    v-model="end_date"
                    slot="activator"
                    label="End Date"
                    prepend-icon="event"
                    readonly
                  ></v-text-field>
                  <v-date-picker v-model="end_date" no-title scrollable actions>
                    <template slot-scope="{ save, cancel }">
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                        <v-btn flat color="primary" @click="save">OK</v-btn>
                      </v-card-actions>
                    </template>
                  </v-date-picker>
                </v-menu>
        <v-layout row wrap>
          <v-flex xs12 sm6 md6 class="pa-2">
            <stats statsFor="lead" :tabs="stat_fields"></stats>
          </v-flex>
          <v-flex xs12 sm6 md6 class="pa-2">
            <pi-chart chartFor='service' chartOf='lead' chartForUser='1' :tabs="pi_fields" ></pi-chart>
          </v-flex>
        </v-layout>
        <vue-table @onEdit="showEditBox" :headers="headers" tableFor='lead' class="ma-2"></vue-table>
        <v-fab-transition>
          <v-btn
            @click="createDialog = true"
            color="blue"
            dark
            fab
            fixed
            bottom
            right
          >
            <v-icon>add</v-icon>
          </v-btn>
        </v-fab-transition>
        <edit-lead @closeDialog="hideDialog" :dialog="editDialog"></edit-lead>
        <create-lead @closeCreateDialog="hideDialog" @closeDialog="hideDialog" :dialog="createDialog"></create-lead>
    </v-flex>
</template>

<script>
  import PiChart from '../reusuable/PiChart'
  import VueTable from '../reusuable/VueTable'
  import EditLead from './EditLead'
  import CreateLead from './CreateLead'
  import Stats from '../reusuable/Stats'
  import { mapState } from 'vuex'
  export default {
    components: {PiChart, VueTable, EditLead, CreateLead, Stats},
    data () {
      return {
        editDialog: false,
        createDialog: false,
        headers: [
          {text: 'Service', align: 'center', value: 'service'},
          {text: 'Unit', align: 'center', value: 'unit'},
          {text: 'Status', align: 'center', value: 'status'},
          {text: 'Bulk', align: 'center', value: 'bulk'}
        ],
        items: [],
        stat_fields: ['status', 'service', 'unit'],
        pi_fields: ['status', 'service']
      }
    },
    computed: {
      ...mapState({
        start_date: 'start_date',
        end_date: 'end_date'
      })
    },
    methods: {
      hideDialog () {
        this.editDialog = false
        this.createDialog = false
        this.$router.push({name: 'lead'})
      },
      showEditBox (data) {
        this.editDialog = true
        this.data = data
      }
    }
  }
</script>
