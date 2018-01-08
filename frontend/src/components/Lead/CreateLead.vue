<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Create Lead</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <vue-form
                :form="form"
                :validator="validator"
                :btnValue="btnValue"
                tableFor="lead"
                @submit="onSubmit"
              ></vue-form>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="dialog">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>

import VueForm from '../Common/VueForm.vue'
import Form from '@/utilities/Form'
export default {
  props: ['data', 'dialog'],
  name: 'lead',
  data () {
    return {
      dialog: false,
      btnValue: 'Create',
      vueFormTitle: 'Create Lead',
      form: new Form([
        { name: 'service', type: 'select', label: 'Service', model: null, items: ['Hardware', 'Software', 'Consulting'] },
        { name: 'income', type: 'number', label: 'Income', model: '' },
        { name: 'discount', type: 'number', label: 'Discount', model: '' },
        { name: 'tax percent', type: 'number', label: 'Tax Percent', model: '' },
        { name: 'unit', type: 'number', label: 'Unit', model: '' },
        // { name: 'type', type: 'select', label: 'Type', model: null, items: ['Item1', 'Item2'] },
        { name: 'bulk', type: 'boolean', label: 'Bulk', model: true },
        { name: 'stage', type: 'number', label: 'Stage', model: '' }
      ]),
      validator: {
        'service': [(v) => !!v || 'Service is required'],
        'income': [(v) => !!v || 'Income is required', (v) => parseInt(v) > 0 || 'Income must be a positive integer'],
        'discount': [(v) => !!v || 'Unit is required', (v) => parseInt(v) > 0 || 'Discount must be a positive integer'],
        'tax Percent': [(v) => !!v || 'Tax Percent is required', (v) => parseInt(v) > 0 || 'Tax Percent must be a positive integer'],
        'unit': [(v) => !!v || 'Unit is required', (v) => parseInt(v) > 0 || 'Unit must be a positive integer'],
        'bulk': [],
        'stage': [(v) => !!v || 'Stage is required', (v) => parseInt(v) > 0 || 'Stage must be a positive integer']
        // 'type': [(v) => !!v || 'Type is required'],
      }
    }
  },
  methods: {
    onSubmit () {
      this.form
        .post('http://127.0.0.1:8000/api/lead/processlist/',
        {
          headers: { Authorization: 'Token 17b7761bf5263f340451e44dff618cdd55fe88b3' },
          data: {
            user: this.$store.user,
            service: this.form[0].model,
            income: this.form[1].model,
            discount: this.form[2].model,
            tax_percent: this.form[3].model,
            unit: this.form[4].model,
            bulk: this.form[5].model,
            stage: this.form[6].model
          }
        }
        )
        .then((response) => {
          let payload = { baseUrl: 'http://127.0.0.1:8000/api/lead/processlist/', rowsPerPage: 5, searchvalue: '', ordering: '', offset: 0 }
          this.$store.dispatch('getTableData', payload)
          window.location.replace('/lead')
        })
        .catch(function (error) {
          console.log(error)
        })
        // this.hideDialog()
    }
  },
  components: {VueForm, Form}
}
</script>

<style scoped>
</style>
