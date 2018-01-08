<template>
  <v-card-text>
    <v-container grid-list-md>
      <v-layout row justify-center>
        <v-card-title>
          <span class="headline">Step 2. Enter Medium Info</span>
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
  name: 'createcom2',
  data () {
    return {
      btnValue: 'next',
      name: '',
      vueFormTitle: 'Enter Medium Info',
      form: new Form([
        { name: 'medium', type: 'select', label: 'Medium', model: null, items: ['Inbound Email', 'Outbound Email', 'Inbound Call', 'Outbound Call'] },
        { name: 'medium_status', type: 'select', label: 'Medium Status', model: null, items: ['Successful', 'Unsuccessful'] },
        { name: 'contact_person', type: 'text', label: 'Contact Person', model: '' },
        { name: 'remarks', type: 'text', label: 'Remarks', model: '' }
      ]),
      validator: {
        'medium': [(v) => !!v || 'Medium is required'],
        'medium_status': [(v) => !!v || 'Status is required'],
        'contact_person': [(v) => !!v || 'Contact Person is required'],
        'remarks': [(v) => !!v || 'Remarks is required']
      }
    }
  },
  methods: {
    onSubmit () {
      this.form.post('http://127.0.0.1:8000/api/communication/detaillist/', {
        data: {
          medium: this.form[0].model,
          medium_status: this.form[1].model,
          contact_person: this.form[2].model,
          remarks: this.form[3].model,
          client: 1,
          user: 1
        },
        headers: { Authorization: 'Token 17b7761bf5263f340451e44dff618cdd55fe88b3' }
      })
      .then((response) => {
        this.$router.push('/createcom3')
      })
      .catch(function (error) {
        console.log(error)
      })
    }
  },
  components: {VueForm, Form}
}
</script>