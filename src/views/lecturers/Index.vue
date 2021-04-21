<!--
@Author: tomfarrelly
@Date:   2021-03-02T10:21:12+00:00
@Last modified by:   tomfarrelly
@Last modified time: 2021-04-20T22:58:47+01:00
-->



<template>
  <div>
  <h2>  This is the Lecturers Index page </h2>

  <br>

  <b-form-input type="search" v-model="term" v-on:keyup.enter="searchLecturer()" placeholder="Search lecturer by title"></b-form-input>
  

    <br>


    <!-- <button @click="getLecturers()">Get Lecturers</button> -->
    <button type="button" class="btn btn-success" align="center" @click="getLecturers()">Get Lecturers</button>

    <router-link :to="{ name: 'lecturers_create'}">
    <button type="button" class="btn btn-primary float-right" align="right" >Create</button>
    </router-link>






    <br><br>

    <b-table striped hover :items="filteredLecturers" :fields="fields">
      <template #cell(name)="data">
        <router-link :to="{ name: 'lecturers_show', params: { id: data.item.id }}">{{ data.item.name }}</router-link>

      </template>
    </b-table>



  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LecturerIndex',
  components: {
  },
  props: {
    loggedIn: Boolean,
  },
  data() {
    return {
      term:"",
      fields: [
        {
          key: 'name',
          sortable: true,
        },
        'address',
        'email',
        'phone',
        {
          key: 'id',
          sortable: true,
        }
        ],
      lecturers: [],
      filteredLecturers: []
    }
  },
  mounted(){

    if (this.loggedIn){
      this.getLecturers()
    }else{
      this.$router.push({ name: 'home' });

    }

    this.getLecturers();
  },
  watch: {
    term: function() {
      this.searchLecturer();
    }
  },
  methods: {
    getLecturers() {
      let token = localStorage.getItem('token');

      axios.get('http://college.api:8000/api/lecturers', {
        headers: { Authorization: "Bearer " + token}
      })
      .then(response => {
        console.log(response.data);
        this.lecturers = response.data.data;
        this.filteredLecturers = this.lecturers;

      })
      .catch(error => {
        console.log(error)
        console.log(error.response.data)
      })
    },

    searchLecturer() {
      this.filteredLecturers = this.lecturers.filter(lecturer => lecturer.name.toLowerCase().includes(this.term.toLowerCase()));
    },

    logout() {
      let token = localStorage.getItem('token');

      axios.get('http://college.api:8000/api/logout', {
        headers: { Authorization: "Bearer " + token}
      })
      .then(response => {
        console.log(response.data);
        console.log("LOGGED OUT");
      })
      .catch(error => {
        console.log(error)
        console.log(error.response.data)
      })

      localStorage.removeItem('token');
    }
  },
}
</script>
<style>
.home {
  text-align: center;
}
</style>
