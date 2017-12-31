<template>
  <div style="">
    <v-card class="pt-5 pb-5 pr-5 pl-5">
      <h1 class="text-xs-center blue--text pb-3"> {{vueFormTitle }} </h1>
      <v-form v-model="valid" ref="form" lazy-validation>
        <div v-for="field in form">
          <div v-if="field.type === 'text' ">
            <v-text-field :label="field.label"
                          v-model="field.model"
                          :rules="validator[field.name]"
            >
            </v-text-field>
          </div>
          <div v-if="field.type === 'select' ">
              <v-select :label="field.label"
                        v-model="field.model"
                        :rules="validator[field.name]"
                        :items="field.items"
              ></v-select>
          </div>
          <div v-if="field.type === 'boolean' ">
            <v-checkbox :label="field.label"
                        v-model="field.model"
                        :rules="validator[field.name]"
            ></v-checkbox>
          </div>
          <div v-if="field.type === 'date' ">
            <v-menu
              lazy
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              full-width
              :nudge-right="40"
              max-width="290px"
              min-width="290px"
            >
              <v-text-field
                :rules="validator[field.name]"
                v-model="field.model"
                slot="activator"
                :label="field.label"
                prepend-icon="event"
                readonly
              ></v-text-field>
              <v-date-picker v-model="field.model" no-title scrollable actions>
                <template slot-scope="{ save, cancel }">
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                    <v-btn flat color="primary" @click="save">OK</v-btn>
                  </v-card-actions>
                </template>
              </v-date-picker>
            </v-menu>
          </div>
        </div>
        <v-btn @click="submit" color="blue white--text  ">{{btnValue}}</v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<script>
  export default {
    $validator: true,
    props: ['vueFormTitle', 'form', 'validator', 'btnValue', 'btnId', 'tableFor'],
    data: () => ({
      valid: null
    }),
    computed: {
    },
    methods: {
      submit () {
        if (this.$refs.form.validate()) {
          this.$router.push({name: this.tableFor})
          this.$emit('submit')
        }
      }
    }
  }
</script>
