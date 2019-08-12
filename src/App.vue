<template>
  <v-app>
    <div>
      <v-tabs  >
        <v-tab class="ma-0" :to="`/`">Students</v-tab>
        <v-tab class="ma-0" :to="`/courses`">Courses</v-tab>
      </v-tabs>
      <router-view />
    </div>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    //
  })
}
</script>
