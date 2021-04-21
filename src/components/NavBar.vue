<!--
@Author: tomfarrelly
@Date:   2021-03-02T09:39:01+00:00
@Last modified by:   tomfarrelly
@Last modified time: 2021-04-21T02:04:10+01:00
-->



<template>
  <div>
  <b-navbar type="dark" variant="info">
    <b-navbar-nav>

      <b-nav-item to="/">Home</b-nav-item>
      <b-nav-item :to="{name: 'courses_index'}">Courses</b-nav-item>
      <b-nav-item :to="{name: 'lecturers_index'}">Lecturers</b-nav-item>
      <b-nav-item :to="{name: 'enrolments_index'}">Enrolments</b-nav-item>


      <b-nav-item v-if="loggedIn" @click="logout()">LogOut</b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</div>
</template>
<script>
import axios from 'axios';

export default {
  name: 'NavBar',
  props: {
    loggedIn: Boolean,
  },
  methods: {
    logout() {
      let token = localStorage.getItem('token');

      axios.get('http://college.api:8000/api/logout', {
        headers: { Authorization: "Bearer " + token}
      })
      .then(response => {
        console.log(response.data);
        //console.log("LOGGED OUT");
        this.$emit('logout');
      })
      .catch(error => {
        console.log(error)
        console.log(error.response.data)
      })

      localStorage.removeItem('token');

    }
  }

}
</script>
<style>
.navbar {
  margin-bottom: 40px;
}
</style>
