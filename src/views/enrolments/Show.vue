<!--
@Author: tomfarrelly
@Date:   2021-03-02T10:56:03+00:00
@Last modified by:   tomfarrelly
@Last modified time: 2021-04-20T22:26:50+01:00
-->



<template>
  <div>
    <router-link :to="{ name: 'enrolments_edit'}">
    <button type="button" class="btn btn-primary " align="right" >Edit</button>
    </router-link>

  <button ype="button" class="btn btn-danger float-right" @click="deleteEnrolments()">Delete </button>
  <br>

  <br>

  <h4>Date: </h4> {{ enrolment.date }} <br>
  <h4>Time: </h4> {{ enrolment.time }}<br>
  <h4>Status: </h4> {{ enrolment.status }}<br>
  <h4>Course: </h4> {{ enrolment.course.title }}<br>
  <h4>Lecturer: </h4> {{ enrolment.lecturer.name }}<br>


  <b-table striped hover :items="enrolment.lecturers">
    <template #cell(id)="data">
      <router-link :to="{ name: 'courses_show', params: { id: data.item.id }}">{{ data.item.date }}</router-link>

    </template>
  </b-table>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'EnrolmentShow',
  components: {
  },
  data() {
    return {
      enrolment: {}
    }
  },
  mounted(){
    let token = localStorage.getItem('token');

    axios.get(`http://college.api:8000/api/enrolments/${this.$route.params.id}`, {
      headers: { Authorization: "Bearer " + token}
    })
    .then(response => {
      console.log(response.data.data);
      this.enrolment = response.data.data;

    })
    .catch(error => {
      console.log(error)
      console.log(error.response.data)
    })
  },
  methods: {
    deleteEnrolments() {
      let token = localStorage.getItem("token");


        axios
          .delete(`http://college.api:8000/api/enrolments/${this.$route.params.id}` , {
            headers: { Authorization: "Bearer " + token }
          })
          .then(response=>{
          this.$router.push({name:'enrolments_index'})
          console.log(response);

        })
          .catch(function(error) {
            console.log(error);
          });


    },
  },
}
</script>
<style>
.home {
  text-align: center;
}
</style>
