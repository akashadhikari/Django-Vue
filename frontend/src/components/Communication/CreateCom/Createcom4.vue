<template>
  <v-card-text>
    <v-container grid-list-md>
      <v-layout row justify-center>
        <v-card-title>
          <span class="headline">Step 5. Enter Sales Sub Stage</span>
        </v-card-title>
      </v-layout>
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
</template>

<script>
import VueForm from '@/components/Common/VueForm.vue'
import Form from '@/utilities/Form'
export default {
  props: ['data'],
  name: 'createcom4',
  data () {
    return {
      btnValue: 'finish',
      name: '',
      vueFormTitle: 'Enter Sales Desc',
      form: new Form([
        { name: 'sales_substage', type: 'text', label: 'Sales Sub Stage', model: '' }
      ]),
      validator: {
        'sales_substage': [(v) => !!v || 'Sales Stage is required']
      }
    }
  },
  methods: {
    onSubmit () {
      this.form.post('http://127.0.0.1:8000/api/communication/clientlist/', {
        data: {
          sales_substage: this.form[0].model,
          client: 1,
          user: 1
        },
        headers: { Authorization: 'Token 17b7761bf5263f340451e44dff618cdd55fe88b3' }
      })
      .then((response) => {
        this.$router.push('/communication')
      })
      .catch(function (error) {
        console.log(error)
      })
    }
  },
  components: {VueForm, Form}
}
</script>