<template>
  <v-navigation-drawer
    fixed
    :clipped="$vuetify.breakpoint.width > 1264"
    v-model="drawer"
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
            <a href="#!" class="body-2 black--text">CRM</a>
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
      <v-subheader class="mt-3 grey--text text--darken-1">Counterparts</v-subheader>
      <v-list>
        <v-list-tile v-for="item in items2" :key="item.text" avatar @click="">
          <v-list-tile-avatar>
            <img :src="`https://randomuser.me/api/portraits/men/${item.picture}.jpg`" alt=""/>
          </v-list-tile-avatar>
          <v-list-tile-title v-text="item.text"></v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    items: [
      { icon: 'home', text: 'Home', href: '/' },
      {
        icon: 'people_outline',
        'icon-alt': 'people',
        text: 'Communication',
        model: false,
        children: [
          { text: 'View Communication', href: '/communication' },
          { text: 'Create Communication', href: '/createcom1' }
        ]
      },
      {
        icon: 'format_align_right',
        'icon-alt': 'format_align_left',
        text: 'Leads',
        model: true,
        children: [
          { text: 'View Leads', href: '/lead' },
          { text: 'Create Lead', href: '/createlead' }
        ]
      }
    ],
    items2: [
      { picture: 28, text: 'Puskar' },
      { picture: 38, text: 'Alok' },
      { picture: 48, text: 'Akash' },
      { picture: 58, text: 'Nokia' },
      { picture: 78, text: 'MKBHD' }
    ]
  })
}
</script>
<style>
  .input-group__details:after {
    background-color: rgba(255, 255, 255, 0.32) !important;
  }
</style>