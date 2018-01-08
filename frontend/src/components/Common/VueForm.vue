<template>
  <div style="">
    <v-card class="pt-5 pb-5 pr-5 pl-5">
      <v-form v-model="valid" ref="form" lazy-validation>
        <div v-for="field in form">
          <div v-if="field.type === 'text' ">
            <v-flex xs12>
                <v-text-field :label="field.label"
                            v-model="field.model"
                            :rules="validator[field.name]"
                >
                </v-text-field>
            </v-flex>
          </div>
          <div v-if="field.type === 'number' ">
            <v-flex xs12>
                <v-text-field :label="field.label"
                            v-model="field.model"
                            :rules="validator[field.name]"
                >
                </v-text-field>
            </v-flex>
          </div>        
          <div v-if="field.type === 'password' ">
            <v-flex xs12>
              <v-text-field
                name="field.name"
                label="Password"
                hint="At least 8 characters"
                v-model="field.model"
                min="8"
                :append-icon="e1 ? 'visibility' : 'visibility_off'"
                :append-icon-cb="() => (e1 = !e1)"
                :type="e1 ? 'password' : 'text'"
                counter
              ></v-text-field>
            </v-flex>
           </div>         
          <div v-if="field.type === 'select' ">
            <v-flex xs12 sm6>
              <v-select :label="field.label"
                        v-model="field.model"
                        :rules="validator[field.name]"
                        :items="field.items"
              ></v-select>
            </v-flex>
          </div>
          <div v-if="field.type === 'boolean' ">
            <v-flex xs12>
              <v-checkbox :label="field.label"
                          v-model="field.model"
                          :rules="validator[field.name]"
              ></v-checkbox>
            </v-flex>
          </div>
          <div v-if="field.type === 'date' ">
          <v-flex xs12>
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
          </v-flex>  
          </div>
        </div>
        <v-btn @click="submit" color="blue white--text">{{btnValue}}</v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<script>
export default {
  $validator: true,
  props: ['vueFormTitle', 'form', 'validator', 'btnValue', 'btnId', 'tableFor'],
  data: () => ({
    e1: false,
    password: 'Password',
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
  //   handle () {
  //   }
  // }
  }
}
</script>
