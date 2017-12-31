<template>
  <v-container grid-list-xl text-xs-center>
    <v-layout row wrap>
      <v-flex xs5 offset-xs3>
        <vue-form
          :vueFormTitle="vueFormTitle"
          :form="form"
          :validator="validator"
          :btnValue="btnValue"
          @submit="submit"
          tableFor="Login"
        ></vue-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import VueForm from './reusuable/VueForm.vue'
  import axios from 'axios'
  export default {
    components: {VueForm},
    data () {
      return {
        btnValue: 'Take me in',
        vueFormTitle: 'Log in From Here',
        form: [
          { name: 'username', type: 'text', label: 'Username', model: '' },
          { name: 'password', type: 'text', label: 'Remarks', model: '' },
          { name: 'boolean', type: 'boolean', label: 'Keep me logged in', model: '' }
        ],
        validator: {
          'username': [(v) => !!v || 'Username is required'],
          'password': [(v) => !!v || 'Purpose is required'],
          'boolean': []
        }
      }
    },
    methods: {
      submit () {
        axios.post('http://localhost:8000/api/users/token-auth/', {
          username: this.form[0].model,
          password: this.form[1].model
        })
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
      }
    }
  }
</script>
