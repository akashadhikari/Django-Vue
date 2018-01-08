<template>
  <v-card-text>
    <v-container grid-list-md>
      <v-layout row justify-center>
        <v-card-title>
          <span class="headline">Step 3. Enter Sales Info</span>
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
  name: 'createcom3',
  data () {
    return {
      btnValue: 'next',
      name: '',
      vueFormTitle: 'Enter Sales Info',
      form: new Form([
        { name: 'sales_stage', type: 'text', label: 'Sales Stage', model: '' },
        { name: 'sub_stage', type: 'text', label: 'Sub Stage', model: '' }
      ]),
      validator: {
        'sales_stage': [(v) => !!v || 'Sales Stage is required'],
        'sub_stage': [(v) => !!v || 'Sub Stage is required']
      }
    }
  },
  methods: {
    onSubmit () {
      this.form.post('http://127.0.0.1:8000/api/communication/saleslist/', {
        data: {
          sales_stage: this.form[0].model,
          sub_stage: this.form[1].model,
          client: 1,
          user: 1
        },
        headers: { Authorization: 'Token 17b7761bf5263f340451e44dff618cdd55fe88b3' }
      })
      .then((response) => {
        this.$router.push('/createcom4')
      })
      .catch(function (error) {
        console.log(error)
      })
    }
  },
  components: {VueForm, Form}
}
</script>