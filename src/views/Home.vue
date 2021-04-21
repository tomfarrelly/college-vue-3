<!--
@Author: tomfarrelly
@Date:   2021-02-15T17:36:49+00:00
@Last modified by:   tomfarrelly
@Last modified time: 2021-04-21T04:09:50+01:00
-->



<template>
  <div class="home">
    This is the Home page

    <br>

    <input type="email" v-model="form.email" />
    <input type="password" v-model="form.password" />
    <button @click="login()" >Submit</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Home',
  components: {
  },
  data() {
    return {
      form: {
        email: "",
        password: ""
      }
    }
  },
  methods: {
    login() {
      axios.post('http://college.api:8000/api/login', {
        email: this.form.email,
        password: this.form.password
      })
      .then(response => {
        console.log(response.data);
        localStorage.setItem('token', response.data.token);
        this.$emit('login');
        this.$router.replace({ name: 'home' });
      })
      .catch(error => {
        console.log(error)
        console.log(error.response.data)
      })
    }
  },
}
</script>
<style>
.home {
  text-align: center;
}
</style>
