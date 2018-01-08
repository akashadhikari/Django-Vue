<template>
  <v-card-text>
    <v-container grid-list-md>
      <v-layout row justify-center>
        <v-card-title>
          <span class="headline">Step 1. Register Client</span>
        </v-card-title>
      </v-layout>
      <v-layout row justify-center>

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
</template>

<script>
import VueForm from '@/components/Common/VueForm.vue'
import Form from '@/utilities/Form'
export default {
  props: ['data'],
  name: 'createcom1',
  data () {
    return {
      btnValue: 'next',
      name: '',
      vueFormTitle: 'Enter Client Info',
      form: new Form([
        { name: 'client_name', type: 'text', label: 'Client Name', model: '' }
      ]),
      validator: {
        'client_name': [(v) => !!v || 'Name is required']
      }
    }
  },
  methods: {
    onSubmit () {
      this.form.post('http://127.0.0.1:8000/api/communication/clientlist/', {
        data: {
          client_name: this.form[0].model,
          user: this.$store.user
        },
        headers: { Authorization: 'Token 17b7761bf5263f340451e44dff618cdd55fe88b3' }
      })
      .then((response) => {
        let payload = { baseUrl: 'http://127.0.0.1:8000/api/communication/clientlist/', rowsPerPage: 5, searchvalue: '', ordering: '', offset: 0 }
        this.$store.dispatch('getTableData', payload)
        this.$router.push('/createcom2')
      })
      .catch(function (error) {
        console.log(error)
      })
    }
  },
  components: {VueForm, Form}
}
</script>