<!--
@Author: tomfarrelly
@Date:   2021-03-02T10:56:03+00:00
@Last modified by:   tomfarrelly
@Last modified time: 2021-04-20T22:25:42+01:00
-->



<template>
  <div>
    <router-link :to="{ name: 'lecturers_edit'}">
    <button type="button" class="btn btn-primary " align="right" >Edit</button>
    </router-link>
  
  <button ype="button" class="btn btn-danger float-right" @click="deleteLecturer()">Delete </button>


  <br>

  <h4>Name: </h4> {{ lecturer.name }} <br>
  <h4>Address: </h4> {{ lecturer.address }}<br>
  <h4>Email: </h4> {{ lecturer.email }}<br>
  <h4>Phone: </h4> {{ lecturer.phone }}<br>



  <b-table striped hover :items="lecturer.enrolments">
    <template #cell(name)="data">
      <router-link :to="{ name: 'lecturers_show', params: { id: data.item.id }}">{{ data.item.name }}</router-link>
      <!-- <router-link :to="{ name: 'lecturers_show', params: { id: data.item.id }}"> Edit</router-link> -->
    </template>
    <template #cell(course)="data">
      {{data.item.course.title}}
    </template>
  </b-table>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LecturerShow',
  components: {
  },
  data() {
    return {
      lecturer: {}
    }
  },
  mounted(){
    let token = localStorage.getItem('token');

    axios.get(`http://college.api:8000/api/lecturers/${this.$route.params.id}`, {
      headers: { Authorization: "Bearer " + token}
    })
    .then(response => {
      console.log(response.data.data);
      this.lecturer = response.data.data;

    })
    .catch(error => {
      console.log(error)
      console.log(error.response.data)
    })
  },
  methods: {
    deleteLecturer(){
      let token = localStorage.getItem("token");

  // loop through enrolments and send delete request to delete them

        axios
          .delete(`http://college.api:8000/api/lecturers/${this.$route.params.id}` , {
            headers: { Authorization: "Bearer " + token }
          })
          .then(response=>{
          this.$router.push({name:'lecturers_index'})
          console.log(response);

        })
          .catch(function(error) {
            console.log(error);
          });
    }
  },
}
</script>
<style>
.home {
  text-align: center;
}
</style>
