<!--
@Author: tomfarrelly
@Date:   2021-03-02T09:31:57+00:00
@Last modified by:   tomfarrelly
@Last modified time: 2021-03-04T14:03:18+00:00
-->



<template>
  <div>
    <NavBar :loggedIn="loggedIn" v-on:login="setLoggedIn" v-on:logout="setLoggedOut" />
    <b-container>
      <router-view :loggedIn="loggedIn" v-on:login="setLoggedIn" v-on:logout="setLoggedOut"/>
    </b-container>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'

export default {
  name: 'App',
  components: {
    NavBar
  },
  data() {
    return {
      loggedIn: false
    }
  },
  created() {
    if (localStorage.getItem('token')) {
      this.loggedIn = true;
      console.log("APP: ",this.loggedIn);
    }
    else {
      this.loggedIn = false;
    }
  },
  methods: {
    setLoggedIn() {
      this.loggedIn = true;
            // optionally, you could store the token in localStorage here
    },
    setLoggedOut() {
      this.loggedIn = false;
            // optionally, you could trigger the whole logout process here
    }
  }
}
</script>

<style>

</style>
