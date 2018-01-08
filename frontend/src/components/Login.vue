<template>
  <v-container grid-list-xl text-xs-center>
    <v-layout row wrap v-if="error">
      <v-flex xs5 offset-sm3>
        <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs5 offset-sm3>
        <vue-form
          :vueFormTitle="vueFormTitle"
          :form="form"
          :validator="validator"
          :btnValue="btnValue"
          @submit="onLogin"
          tableFor="Login"
        ></vue-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import VueForm from './Common/VueForm.vue'
export default {
  components: {VueForm},
  data () {
    return {
      btnValue: 'Log In',
      vueFormTitle: 'Log in From Here',
      form: [
        { name: 'username', type: 'text', label: 'Username', model: '' },
        { name: 'password', type: 'password', label: 'Password', model: '' },
        { name: 'boolean', type: 'boolean', label: 'Keep me logged in', model: '' }
      ],
      validator: {
        'username': [(v) => !!v || 'Username is required'],
        'password': [(v) => !!v || 'Password is required'],
        'boolean': []
      }
    }
  },
  computed: {
    token () {
      return this.$store.getters.token
    },
    error () {
      return this.$store.getters.error
    }
  },
  watch: {
    token (value) {
      if (value !== null && value !== undefined) {
        this.$router.push('/createcom2')
      }
    }
  },
  methods: {
    onLogin () {
      this.$store.dispatch('logUserIn', {username: this.form[0].model, password: this.form[1].model})
    },
    onDismissed () {
      console.log('Disimissed Alert')
      this.$store.dispatch('clearError')
    }
    // onSubmit () {
    //   this.form.post('http://localhost:8000/api/users/token-auth/', {
    //     data: {
    //       username: this.form[0].model,
    //       password: this.form[1].model
    //     },
    //     headers: { Authorization: 'Token 24204b6977f8ef4b280ae110c6431604605d8a10' }
    //   }
    //   )
    // }
  }
}
</script>
