<template>
  <v-container>
    <v-layout justify-center>
      <v-flex xs12 md6 lg6>
        <v-data-table
          :headers="headers"
          :items="courses"
          :search="search"
          sort-by="calories"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>Courses</v-toolbar-title>
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
                              label="Сourse name"
                              :rules="nameRules"
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-text-field v-model="editedItem.id" label="ID" :rules="idRules"></v-text-field>
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
      { text: 'id', value: 'id' },

      { text: 'Actions', value: 'action', sortable: false, align: 'right' }
    ],
    courses: [],
    editedIndex: -1,
    editedItem: {},
    defaultItem: {},
    nameRules: [v => !!v || 'This field is required'],
    idRules: [
      v => !!v || 'this field is required',
      v => (v && parseInt(v, 10) >= 0) || 'Id must be positive number'
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
    if (ls.checkStorage('courses') !== null) this.students = ls.checkStorage('courses')
  },

  methods: {
    initialize () {
      this.courses = [
        {
          name: 'Django',
          id: 12
        },
        {
          name: 'C++',
          id: 3
        },
        {
          name: 'Python',
          id: 6
        },
        {
          name: 'HTML/CSS',
          id: 23
        },
        {
          name: 'Java',
          id: 5
        },
        {
          name: 'JavaScript',
          id: 13
        },
        {
          name: '.NET',
          id: 11
        },
        {
          name: 'Ruby',
          id: 9
        },
        {
          name: 'Swift',
          id: 2
        }
      ]
    },

    editItem (item) {
      this.editedIndex = this.courses.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      const index = this.courses.indexOf(item)
      confirm('Are you sure you want to delete this item?') &&
      this.courses.splice(index, 1)
      this.saveCourses()
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
          Object.assign(this.courses[this.editedIndex], this.editedItem)
          this.saveCourses()
        } else {
          this.courses.push(this.editedItem)
          this.saveCourses()
        }
        this.close()
      }
    },
    saveCourses () {
      ls.saveToStorage('courses', this.courses)
    }
  }
}
</script>
