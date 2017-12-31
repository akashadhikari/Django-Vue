<template>
  <v-app class="grey lighten-4 text-xs-center" id="">
    <main>
    <v-navigation-drawer
        disable-route-watcher
        fixed
        v-model="drawerRight"
        right
        app
        temporary
      >
          <v-list dense>
          </v-list>
      </v-navigation-drawer>
    <v-toolbar
      color="blue darken-3"
      dark
      app
      clipped-right
      fixed
      class="nav"
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>CRM </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-layout row align-center style="max-width: 650px">
        <v-text-field
          placeholder="Search..."
          single-line
          append-icon="search"
          :append-icon-cb="() => {}"
          class="white--text"
          hide-details
        ></v-text-field>
      </v-layout>
      <v-spacer></v-spacer>

       <div class="d-flex align-center" style="margin-left: auto">
        <v-btn icon>
          <v-icon>apps</v-icon>
        </v-btn>
         <v-btn router to="/login" icon>
          <v-icon>perm_identity</v-icon>
        </v-btn>
        <v-btn @click.stop="drawerRight = !drawerRight" icon>
          <v-icon>notifications</v-icon>
        </v-btn>
      </div>
    </v-toolbar>
    <v-navigation-drawer
      fixed
      light
      v-model="drawer"
      :stateless="left"
      app
    >
      <v-list dense>
        <template v-for="(item, i) in items">
          <v-layout
            row
            v-if="item.heading"
            align-center
            :key="i"
          >
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-flex>
          </v-layout>
          <v-list-group v-else-if="item.children" v-model="item.model" no-action>
            <v-list-tile slot="item"  @click="">
              <v-list-tile-action>
                <v-icon>{{ item.model ? item.icon : item['icon-alt'] }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
              v-for="(child, i) in item.children"
              :key="i"
              @click=""
              router :to="child.href"
            >
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ child.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile exact router :to="item.href" v-else @click="">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <v-container fill-height flex align-center justify-center>
        <router-view/>
      </v-container>
    </v-content>
  </main>
</v-app>
</template>

<script>
export default {
  name: 'app',
  data: () => ({
    drawer: null,
    drawerRight: false,
    right: false,
    left: null,
    items: [
      { icon: 'home', text: 'Home', href: '/' },
      {
        icon: 'keyboard_arrow_up',
        'icon-alt': 'keyboard_arrow_down',
        text: 'Leads',
        model: true,
        children: [
          { text: 'View Leads', href: '/leads' },
          { text: 'Create Lead' }
        ]
      },
      {
        icon: 'keyboard_arrow_up',
        'icon-alt': 'keyboard_arrow_down',
        text: 'Communication',
        model: false,
        children: [
          { text: 'View Communication', href: '/communications' },
          { text: 'Create Communication' }
        ]
      }
    ]
  }),
  props: {
    source: String
  }
}
</script>

<style scoped>
  .nav{
  }
  #inspire{
    height:auto;
  }
</style>
