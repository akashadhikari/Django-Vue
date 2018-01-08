<template>
  <div>
    <div v-if="selected.length > 0">
      <div class="text-xs-center">
        <v-btn round color="red" dark @click="remove">
          <v-icon left dark>delete</v-icon>
          Delete
        </v-btn>
      </div>
    </div>
    <v-text-field
      @input="value => getDataFromApi(value, baseUrl)"
      append-icon="search"
      label="Search"
      single-line
      hide-details
      v-model="search"
    ></v-text-field>
    <v-data-table
      :headers="headers"
      :items="items"
      :search="search"
      v-model="selected"
      item-key="id"
      select-all
      class="elevation-1"
      :loading="loading"
      :pagination.sync="pagination"
      :total-items="totalItems"
    >
      <template slot="headerCell" slot-scope="props">
        <v-tooltip bottom>
          <span slot="activator">
            {{ props.header.text }}
          </span>
          <span>
            {{ props.header.text }}
          </span>
        </v-tooltip>
      </template>
      <template slot="items" slot-scope="props">
        <td>
          <v-checkbox
            primary
            hide-details
            v-model="props.selected"
          ></v-checkbox>
        </td>
        <td v-for="(item, key) in props.item" v-if="headers.find(val => val.value === key) ">
          {{ item }}
        </td>
          <v-btn color="transparent" small left fab light style="box-shadow:none" @click="edit(props.item)" slot="activator">
            <v-icon>edit</v-icon>
          </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
  import axios from 'axios'
  import { mapState } from 'vuex'
  export default {
    props: ['headers', 'tableFor'],
    data () {
      return {
        search: '',
        baseUrl: 'http://localhost:8000/api/' + this.tableFor + '/processlist/',
        selected: [],
        pagination: {}
      }
    },
    computed: {
      ...mapState({
        items: 'tableData',
        totalItems: 'totalTableItems',
        loading: 'loading'
      })
    },
    watch: {
      pagination: {
        handler () {
          this.getDataFromApi('', this.baseUrl)
        }
      }
    },
    mounted () {
      this.getDataFromApi('', this.baseUrl)
    },
    methods: {
      remove () {
        var items = []
        for (var item of this.selected) {
          items.push(item.id)
        }
        axios.delete('http://localhost:8000/api/' + this.tableFor + '/items/delete/', {
          data: { ids: items },
          headers: {
            Authorization: 'Token 17b7761bf5263f340451e44dff618cdd55fe88b3'
          }
        })
        .then((response) => {
          console.log(response)
          let payload = { baseUrl: 'http://localhost:8000/api/' + this.tableFor + '/items', rowsPerPage: 5, searchvalue: '', ordering: '', offset: 0 }
          this.$store.dispatch('getTableData', payload)
          this.selected = []
        })
        .catch(function (error) {
          console.log(error)
        })
      },
      getDataFromApi (searchval, baseUrl) {
        this.loading = true
        const { sortBy, descending, page, rowsPerPage } = this.pagination
        let ordering = null
        let offset = null
        if (descending) {
          ordering = '-' + sortBy
        } else {
          ordering = sortBy
        }
        offset = (page - 1) * rowsPerPage
        let searchvalue = null
        if (this.search === '') {
          searchvalue = searchval
        } else {
          searchvalue = this.search
        }
        if (this.totalItems < offset) {
          this.pagination.page = 1
          this.page = 1
        }
        let payload = { baseUrl, searchvalue, ordering, offset, rowsPerPage }
        this.$store.dispatch('getTableData', payload)
      },
      edit (data) {
        this.$emit('onEdit', data)
      }
    }
  }
</script>
