<!--
@Author: tomfarrelly
@Date:   2021-03-02T10:21:12+00:00
@Last modified by:   tomfarrelly
@Last modified time: 2021-04-21T04:09:38+01:00
-->



<template>
  <div>
    <h2>This is the Courses Index page</h2>
    <br>

    <b-form-input type="search" v-model="term" v-on:keyup.enter="searchCourse()" placeholder="Search course by title"></b-form-input>


    <br>

    <button type="button" class="btn btn-success" align="center" @click="getCourses()">Get Courses</button>

    <router-link :to="{ name: 'courses_create'}">
    <button type="button" class="btn btn-primary float-right" align="right">Create</button>
    </router-link>










    <br><br>

    <b-table striped hover :items="filteredCourses" :fields="fields">
      <template #cell(title)="data">
        <router-link :to="{ name: 'courses_show', params: { id: data.item.id }}">{{ data.item.title }}</router-link>

      </template>
    </b-table>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CourseIndex',
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
          key: 'title',
          sortable: true,
        },
        'code',
        'points',
        {
          key: 'level',
          sortable: true,
        }
        ],
      courses: [],
      filteredCourses: []
    }
  },
  mounted(){

    if (this.loggedIn){
      this.getCourses()
    }else{
      this.$router.push({ name: 'home' });

    }

    this.getCourses();
  },
  watch: {
    term: function() {
      this.searchCourse();
    }
  },
  methods: {
    getCourses() {
      let token = localStorage.getItem('token');

      axios.get('http://college.api:8000/api/courses', {
        headers: { Authorization: "Bearer " + token}
      })
      .then(response => {
        console.log(response.data);
        this.courses = response.data.data;
        this.filteredCourses = this.courses;
      })
      .catch(error => {
        console.log(error)
        console.log(error.response.data)
      })
    },

    searchCourse() {
      this.filteredCourses = this.courses.filter(course => course.title.toLowerCase().includes(this.term.toLowerCase()));
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
