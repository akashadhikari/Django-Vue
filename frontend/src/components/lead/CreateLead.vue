<template>
  <div>
    <v-layout row justify-center>
      <v-dialog v-model="dialog"
                fullscreen
                transition="dialog-bottom-transition"
                :overlay=false
                scrollable>
        <v-card>
          <v-toolbar style="flex: 0 0 auto;" dark class="primary">
            <v-btn icon @click.native="hideDialog" dark>
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>Create Page</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-menu bottom right offset-y>
                <v-btn slot="activator" dark icon>
                  <v-icon>more_vert</v-icon>
                </v-btn>
                <v-list>
                  <v-list-tile v-for="item in items" :key="item.title" @click="">
                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
            </v-toolbar-items>
          </v-toolbar>
          <v-container grid-list-xl text-xs-center>
            <v-layout row wrap>
              <v-flex xs5 offset-xs3>
                <vue-form
                  :vueFormTitle="vueFormTitle"
                  :form="form"
                  :validator="validator"
                  :btnValue="btnValue"
                  @submit="submit"
                  tableFor="lead"
                ></vue-form>
              </v-flex>
            </v-layout>
          </v-container>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="hideDialog">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
  import VueForm from '../reusuable/VueForm.vue'
  import axios from 'axios'
  export default {
    props: ['data', 'dialog'],
    name: 'lead',
    data () {
      return {
        dialog: false,
        btnValue: 'Create',
        vueFormTitle: 'Create Lead',
        form: [
          { name: 'service', type: 'select', label: 'Service', model: null, items: ['TJP', 'HJP', 'FJP', 'GJP'] },
          { name: 'unit', type: 'text', label: 'Unit', model: '' },
          { name: 'status', type: 'select', label: 'Status', model: null, items: ['APPROVED', 'PENDING'] },
          // { name: 'type', type: 'select', label: 'Type', model: null, items: ['Item1', 'Item2'] },
          { name: 'bulk', type: 'boolean', label: 'Bulk', model: true }
        ],
        validator: {
          'service': [(v) => !!v || 'Service is required'],
          'unit': [(v) => !!v || 'Unit is required', (v) => parseInt(v) > 0 || 'Unit must be a positive integer'],
          'status': [(v) => !!v || 'Status is required'],
          // 'type': [(v) => !!v || 'Type is required'],
          'bulk': []
        }
      }
    },
    methods: {
      hideDialog () {
        this.dialog = false
        this.$emit('closeCreateDialog')
      },
      submit () {
        axios({
          method: 'POST',
          url: 'http://localhost:8000/api/lead/items/',
          headers: { Authorization: 'Token 24204b6977f8ef4b280ae110c6431604605d8a10' },
          data: {
            service: this.form[0].model,
            unit: parseInt(this.form[1].model),
            status: this.form[2].model,
            bulk: this.form[3].model,
            user: 1
          }
        })
        .then((response) => {
          console.log(response)
          let payload = { baseUrl: 'http://localhost:8000/api/lead/items', rowsPerPage: 5, searchvalue: '', ordering: 'service', offset: 0 }
          this.$store.dispatch('getTableData', payload)
          for (let item of this.form) {
            item.model = null
          }
        })
        .catch((error) => {
          console.log(error)
        })
        this.hideDialog()
      }
    },
    components: {VueForm}
  }
</script>

<style scoped>
</style>
