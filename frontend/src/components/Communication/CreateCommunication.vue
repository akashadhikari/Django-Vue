<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Create Commmunication</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <vue-form
                :form="form"
                :validator="validator"
                :btnValue="btnValue"
                tableFor="communication" 
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

<div id="example">
  <p>Original message: "{{ message }}"</p>
  <p>Computed reversed message: "{{ reversedMessage }}"</p>
</div>
var vm = new Vue({
  el: '#example',
  data: {
    message: 'Hello'
  },
  computed: {
    // a computed getter
    reversedMessage: function () {
      // `this` points to the vm instance
      return this.message.split('').reverse().join('')
    }
  }

<script>
import VueForm from '../Common/VueForm.vue'
import Form from '@/utilities/Form'
export default {
  props: ['data', 'dialog'],
  name: 'communication',
  data () {
    return {
      dialog: false,
      btnValue: 'Create',
      vueFormTitle: 'Create Communication',
      form: new Form([
        { name: 'client_name', type: 'text', label: 'Client Name', model: '' },
        { name: 'medium', type: 'select', label: 'Medium', model: null, items: ['Inbound Call', 'Outbound Call', 'Inbound Email', 'Outbound Email'] },
        { name: 'medium_status', type: 'select', label: 'Medium Status', model: null, items: ['Successfull', 'Unsuccessful'] },
        { name: 'contact_person', type: 'text', label: 'Contact Person', model: '' },
        { name: 'remarks', type: 'text', label: 'Remarks', model: '' },
        { name: 'sales_stage', type: 'select', label: 'Sales Stage', model: null, items: ['Suspecting', 'Prospecting', 'Approach'] },
        { name: 'sub_stage', type: 'text', label: 'Sub Stage', model: '' },
        { name: 'remainder_date', type: 'date', label: 'Remainder Date', model: '' }
      ]),
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
  computed: {
    hideDialog () {
      this.dialog = false
      this.$emit('closeDialog')
    }
  },
  methods: {
    onSubmit () {
      this.form
        .post('http://localhost:8001/api/communication/items/',
        {
          data: {
            client_name: this.form[0].model,
            purpose: this.form[1].model,
            medium: this.form[2].model,
            medium_status: this.form[3].model,
            remarks: this.form[4].model,
            remainder_date: this.form[5].model + 'T15:35:51.395547Z',
            user: 1
          },
          headers: { Authorization: 'Token 24204b6977f8ef4b280ae110c6431604605d8a10' }
        }
        )
        .then((response) => {
          this.$router.go('/communication')
          console.log(response)
          let payload = { baseUrl: 'http://localhost:8001/api/communication/items', rowsPerPage: 5, searchvalue: '', ordering: '', offset: 0 }
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
