<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Edit Lead</span>
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
  name: 'lead',
  props: ['data'],
  watch: {
    data: function (newVal) {
      this.data = newVal
      this.form = new Form([
        { name: 'service', type: 'select', label: 'Service', model: this.data.service, items: ['Hardware', 'software'] },
        { name: 'income', type: 'number', label: 'Income', model: this.data.income },
        { name: 'discount', type: 'number', label: 'Discount', model: this.data.discount },
        { name: 'taxPercent', type: 'number', label: 'Tax Percent', model: this.data.taxPercent },
        { name: 'unit', type: 'text', label: 'Unit', model: this.data.unit },
        // { name: 'type', type: 'select', label: 'Type', model: null, items: ['Item1', 'Item2'] },
        { name: 'bulk', type: 'boolean', label: 'Bulk', model: this.data.bulk },
        { name: 'stage', type: 'number', label: 'Stage', model: this.data.stage },
        { name: 'createdDate', type: 'date', label: 'Created Date', model: this.data.createdDate }
      ])
    }
  },
  data () {
    return {
      dialog: false,
      btnValue: 'Edit',
      vueFormTitle: 'Edit Lead',
      form: [],
      validator: {
        'service': [(v) => !!v || 'Service is required'],
        'income': [(v) => !!v || 'Income is required', (v) => parseInt(v) > 0 || 'Income must be a positive integer'],
        'discount': [(v) => !!v || 'Unit is required', (v) => parseInt(v) > 0 || 'Discount must be a positive integer'],
        'taxPercent': [(v) => !!v || 'Tax Percent is required', (v) => parseInt(v) > 0 || 'Tax Percent must be a positive integer'],
        'grandTotal': [(v) => !!v || 'Grand Total is required', (v) => parseInt(v) > 0 || 'Grand Total must be a positive integer'],
        'unit': [(v) => !!v || 'Unit is required', (v) => parseInt(v) > 0 || 'Unit must be a positive integer'],
        'status': [(v) => !!v || 'Status is required'],
        // 'bulk': [(v) => !!v || 'Service is required'],
        'stage': [(v) => !!v || 'Stage is required', (v) => parseInt(v) > 0 || 'Stage must be a positive integer'],
        'createdDate': [(v) => !!v || 'Created Date is required']
        // 'type': [(v) => !!v || 'Type is required'],
        // 'bulk': []
      }
    }
  },
  computed: {
    hideDialog () {
      this.dialog = false
      this.$emit('closeDialog')
    }
  },
  methods: {
    onSubmit () {
      this.form.put('http://localhost:8000/api/lead/processlist/' + this.data.id + '/',
        {
          data: {
            user: 1,
            service: this.form[0].model,
            income: this.form[1].model,
            discount: this.form[2].model,
            tax_percent: this.form[3].model,
            unit: this.form[4].model,
            bulk: this.form[5].model,
            stage: this.form[6].model
          },
          headers: { Authorization: 'Token 17b7761bf5263f340451e44dff618cdd55fe88b3' }
        }
      )
      .then((response) => {
        this.$router.push('/lead')
        console.log(response)
        let payload = { baseUrl: 'http://localhost:8000/api/lead/processlist', rowsPerPage: 5, searchvalue: '', ordering: 'service', offset: 0 }
        this.$store.dispatch('getTableData', payload)
      })
      .catch(function (error) {
        console.log(error)
      })
      this.hideDialog()
    }
  },
  components: {VueForm, Form}
}
</script>

<style scoped>
</style>

