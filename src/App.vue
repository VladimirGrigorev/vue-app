<template>
  <v-app>
    <Navbar/>
    <router-view/>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
  components: {
    Navbar
  },
}
</script>

<style>
.container{
  padding: 0;
  margin: 0;
}
</style>
