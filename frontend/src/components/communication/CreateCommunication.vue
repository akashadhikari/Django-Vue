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
                  tableFor="communication"
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
    name: 'communication',
    data () {
      return {
        btnValue: 'Create',
        vueFormTitle: 'Create Communication',
        form: [
          { name: 'name', type: 'text', label: 'Full Name', model: '' },
          { name: 'purpose', type: 'select', label: 'Purpose', model: null, items: ['Suspecting', 'Prospecting', 'Approach', 'Job Posting', 'Job Edit', 'Approval', 'Invoicing', 'Payment Follow up', 'Payment Collection', 'General Query', 'Value Proposition', 'Password Reset'] },
          { name: 'medium', type: 'select', label: 'Medium', model: null, items: ['Inbound Call', 'Outbound Call', 'Email', 'SMS', 'Visit'] },
          { name: 'medium_status', type: 'boolean', label: 'Status', model: '' },
          { name: 'remarks', type: 'text', label: 'Remarks', model: '' },
          { name: 'remainder_date', type: 'date', label: 'Remainder Date', model: '' }
        ],
        validator: {
          'name': [(v) => !!v || 'Name is required'],
          'purpose': [(v) => !!v || 'Purpose is required'],
          'medium': [(v) => !!v || 'Medium is required'],
          'medium_status': [(v) => !!v || 'Status is required'],
          'remarks': [(v) => !!v || 'Remarks is required'],
          'remainder_date': [(v) => !!v || 'Date is required']
        },
        items: []
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
          url: 'http://localhost:8000/api/communication/items/',
          headers: { Authorization: 'Token 24204b6977f8ef4b280ae110c6431604605d8a10' },
          data: {
            client_name: this.form[0].model,
            purpose: this.form[1].model,
            medium: this.form[2].model,
            medium_status: this.form[3].model,
            remarks: this.form[4].model,
            remainder_date: this.form[5].model + 'T15:35:51.395547Z',
            user: 1
          }
        })
        .then((response) => {
          console.log(response)
          let payload = { baseUrl: 'http://localhost:8000/api/communication/items', rowsPerPage: 5, searchvalue: '', ordering: '', offset: 0 }
          this.$store.dispatch('getTableData', payload)
        })
        .catch(function (error) {
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
