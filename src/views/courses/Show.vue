<!--
@Author: tomfarrelly
@Date:   2021-03-02T10:56:03+00:00
@Last modified by:   tomfarrelly
@Last modified time: 2021-04-20T23:06:05+01:00
-->



<template>
  <div>

  <!-- <br>
  <router-link :to="{ name: 'courses_edit'}">Edit</router-link>
  <br>
  <button @click="deleteCourse()">Delete </button> -->

  <router-link :to="{ name: 'courses_edit'}">
  <button type="button" class="btn btn-primary " align="right" >Edit</button>
  </router-link>

<button ype="button" class="btn btn-danger float-right" @click="deleteCourse()">Delete </button>

  <br>

  <h4>Title: </h4> {{ course.title }} <br>
  <h4>Code: </h4> {{ course.code }}<br>
  <h4>Description: </h4> {{ course.description }}<br>
  <h4>Points: </h4> {{ course.points }}<br>
  <h4>Level: </h4> {{ course.level }}<br>

  <b-table striped hover :items="course.enrolments">
    <template #cell(title)="data">
      <router-link :to="{ name: 'courses_show', params: { id: data.item.id }}">{{ data.item.title }}</router-link>
      <router-link :to="{ name: 'courses_edit', params: { id: data.item.id }}"> Edit</router-link>
    </template>
    <template #cell(time)="data">
      {{data.item.time | moment("HH:mm")}}
    </template>
    <template #cell(lecturer)="data">
      {{data.item.lecturer.name}}
    </template>


  </b-table>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CourseShow',
  components: {
  },
  data() {
    return {
      course: {}
    }
  },
  mounted(){

    let token = localStorage.getItem('token');

    axios.get(`http://college.api:8000/api/courses/${this.$route.params.id}`, {
      headers: { Authorization: "Bearer " + token}
    })
    .then(response => {
      console.log(response.data.data);
      this.course = response.data.data;

    })
    .catch(error => {
      console.log(error)
      console.log(error.response.data)
    })
  },
  methods: {
  //   deleteCourse(){
  //     let token = localStorage.getItem("token");
  //
  // // loop through enrolments and send delete request to delete them
  //
  //       axios
  //         .delete(`http://college.api:8000/api/courses/${this.$route.params.id}` , {
  //           headers: { Authorization: "Bearer " + token }
  //         })
  //         .then(response=>{
  //         this.$router.push({name:'courses_index'})
  //         console.log(response);
  //
  //       })
  //         .catch(function(error) {
  //           console.log(error);
  //         });
  //   }
    deleteCourse() {
      let token = localStorage.getItem('token');
      let listOfDeleteRequests = this.course.enrolments.map((current) => axios.delete(`college.api:8000/api/enrolments/${current.id}`
        , {headers: {Authorization: "Bearer " + token}}
      ));

      Promise.all(listOfDeleteRequests)
        .then((response) => {
          axios.delete("college.api:8000/api/courses/" + this.course.id, {
              headers: {
                Authorization: "Bearer " + token
              }
            })
            .then((response) => {
              console.log(response.data);
              this.$router.replace({
                name: 'courses_index'
              })
            })
            .catch((error) => {
              console.log(error);
              console.log(response.data);
            });
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
