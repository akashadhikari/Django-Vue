<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">EditCommmunication</span>
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

<script>
import VueForm from '../Common/VueForm'
import Form from '@/utilities/Form'
export default {
  name: 'communication',
  props: ['data', 'dialog'],
  watch: {
    data: function (newVal) {
      this.data = newVal
      this.form = new Form([
        { name: 'name', type: 'text', label: 'Full Name', model: this.data.client_name },
        { name: 'purpose', type: 'select', label: 'Purpose', model: this.data.purpose, items: ['Suspecting', 'Prospecting', 'Approach', 'Job Posting', 'Job Edit', 'Approval', 'Invoicing', 'Payment Follow up', 'Payment Collection', 'General Query', 'Value Proposition', 'Password Reset'] },
        { name: 'medium', type: 'select', label: 'Medium', model: this.data.medium, items: ['Inbound Call', 'Outbound Call', 'Email', 'SMS', 'Visit'] },
        { name: 'medium_status', type: 'boolean', label: 'Status', model: this.data.medium_status },
        { name: 'remarks', type: 'text', label: 'Remarks', model: this.data.remarks },
        { name: 'remainder_date', type: 'date', label: 'Remainder Date', model: this.data.remainder_date }
      ])
    }
  },
  data () {
    return {
      dialog: false,
      btnValue: 'Edit',
      vueFormTitle: 'Edit Communication',
      form: [],
      items: [],
      validator: {
        'name': [(v) => !!v || 'Name is required'],
        'purpose': [(v) => !!v || 'Purpose is required'],
        'medium': [(v) => !!v || 'Medium is required'],
        'medium_status': [(v) => !!v || 'Status is required'],
        'remarks': [(v) => !!v || 'Remarks is required'],
        'remainder_date': [(v) => !!v || 'Date is required']
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
      this.form
        .put('http://localhost:8000/api/communication/items/' + this.data.id + '/',
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
          this.$router.push('/communication')
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
  components: {VueForm, Form}
}
</script>

<style scoped>
</style>
