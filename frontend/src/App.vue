<template>
  <v-app
    light
    id="inspire"
  >
  <app-nav v-if="userIsAuthenticated"></app-nav>
    <v-toolbar color="blue" dense fixed clipped-left app>
      <v-toolbar-title
        :style="$vuetify.breakpoint.width > 1264 && 'width: 300px'"
        class="ml-0 pl-3"
        :class="$vuetify.breakpoint.width <= 1264 && 'pr-3'"
      >
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-icon class="ml-3">fa-youtube</v-icon>CRM
      </v-toolbar-title>
      <v-layout row align-center style="width: 750px">
        <v-text-field
          placeholder="Search..."
          single-line
          append-icon="search"
          :append-icon-cb="() => {}"
          class="white--text"
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <div class="d-flex justify-content: space-between align-right" style="margin-right: auto">
          <div v-if="userIsAuthenticated">
            <v-btn @click.native="onLogout" icon>
              <v-icon>exit_to_app</v-icon>
            </v-btn>
          </div>
          <div v-else >
            <v-btn router to="/login" icon>
             <v-icon>perm_identity</v-icon>
            </v-btn>
          </div>
        </div>
      </v-layout>
    </v-toolbar>
      <v-content>
        <v-container fill-height>
          <v-layout justify-center align-center>
            <router-view/>
          </v-layout>
        </v-container>
      </v-content>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      drawer: false
    }),
    props: {
      source: String
    },
    computed: {
      userIsAuthenticated () {
        return this.$store.getters.token !== null && this.$store.getters.token !== undefined
      }
    },
    methods: {
      goToLogin () {
        this.$router.go('/login')
      },
      onLogout () {
        this.$store.dispatch('logout')
        console.log('Logged Out! Yeah')
        this.$router.go('/')
      }
    }
  }
</script>

<style>
  .input-group__details:after {
    background-color: rgba(255, 255, 255, 0.32) !important;
  }
</style>