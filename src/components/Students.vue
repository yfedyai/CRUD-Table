<template>
  <v-container>
    <v-layout justify-center>
      <v-flex xs12 md6 lg6>
        <v-data-table
          :headers="headers"
          :items="students"
          :search="search"
          sort-by="calories"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>Students</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-flex xs3 md3 lg2>
                <v-text-field
                  v-model="search"
                  append-icon="search"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
              </v-flex>
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on }">
                  <v-btn class="ml-5" color="primary" dark v-on="on">New Item</v-btn>
                </template>
                <v-form ref="form">
                  <v-card>
                    <v-card-title>
                      <span class="headline">{{ formTitle }}</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container grid-list-md>
                        <v-layout wrap>
                          <v-flex xs12 sm6 md4>
                            <v-text-field
                              v-model="editedItem.name"
                              label="Student name"
                              :rules="nameRules"
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-text-field
                              v-model="editedItem.email"
                              label="Email"
                              :rules="emailRules"
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-select
                              :items="['active','inactive']"
                              v-model="editedItem.status"
                              label="Status"
                              :rules="nameRules"
                            ></v-select>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                      <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-form>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.action="{item}">
            <v-icon small class="mr-2" @click="editItem(item)">edit</v-icon>
            <v-icon small @click="deleteItem(item)">delete</v-icon>
          </template>
          <template v-slot:item.status="{ item }">
            <v-chip :color="getColor(item.status)" dark>{{ item.status }}</v-chip>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ls from '@/api/localStorageService'

export default {
  data: () => ({
    dialog: false,
    search: '',
    headers: [
      { text: 'Name', value: 'name', align: 'left' },
      { text: 'email', value: 'email' },
      { text: 'status', value: 'status' },
      { text: 'Actions', value: 'action', sortable: false, align: 'right' }
    ],
    students: [],
    editedIndex: -1,
    editedItem: {},
    defaultItem: {},
    nameRules: [
      v => !!v || 'This field is required'
    ],
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid'
    ]
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    }
  },

  created () {
    this.initialize()
  },
  mounted () {
    if (ls.checkStorage('students') !== null) this.students = ls.checkStorage('students')
  },

  methods: {
    initialize () {
      this.students = [
        {
          name: 'Max',
          email: 'serega@mail.ru',
          status: 'active'
        },
        {
          name: 'Vlad',
          email: 'vlad@gmail.com',
          status: 'active'
        },
        {
          name: 'Dima',
          email: 'dima@ukr.net',
          status: 'active'
        },
        {
          name: 'Bill',
          email: 'edward@mail.ru',
          status: 'active'
        },
        {
          name: 'Yaroslab',
          email: 'yarik@mail.ru',
          status: 'active'
        },
        {
          name: 'Fedya',
          email: 'fedya@mail.ru',
          status: 'inactive'
        },
        {
          name: 'John',
          email: 'john@gmail.com',
          status: 'inactive'
        },
        {
          name: 'Alex',
          email: 'alex@gmail.com',
          status: 'inactive'
        }
      ]
    },

    editItem (item) {
      this.editedIndex = this.students.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      const index = this.students.indexOf(item)
      confirm('Are you sure you want to delete this item?') &&
        this.students.splice(index, 1)
      this.saveStudents()
    },

    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    save () {
      if (this.$refs.form.validate()) {
        if (this.editedIndex > -1) {
          Object.assign(this.students[this.editedIndex], this.editedItem)
          this.saveStudents()
        } else {
          this.students.push(this.editedItem)
          this.saveStudents()
        }
        this.close()
      }
    },

    saveStudents () {
      ls.saveToStorage('students', this.students)
    },
    getColor (status) {
      if (status === 'active') return 'green'
      else if (status === 'inactive') return 'red'
    }
  }
}
</script>
