<!--
@Author: tomfarrelly
@Date:   2021-03-02T10:59:59+00:00
@Last modified by:   tomfarrelly
@Last modified time: 2021-04-20T23:20:46+01:00
-->



<template>
<div>
  <p v-if="error.length">
    <b>Please correct the following error(s):</b>
  <ul>
    <li v-for="error in error" :key="error.id">{{ error }}</li>
  </ul>
  </p>
  <!-- name: <input type="text" v-model="lecturer.name" /> <br>
  address: <input type="text" v-model="lecturer.address" /> <span v-if="errors.address"> {{ errors.address }} </span><br>
  email: <input type="text" v-model="lecturer.email" /> <br>
  phone: <input type="text" v-model="lecturer.phone" /> <span v-if="errors.phone"> {{ errors.phone }} </span><br> -->

  <b-form-group label="Name">
    <input class="form-control" type="text" v-model="lecturer.name" />
  </b-form-group>
  <b-form-group label="Address">
    <input class="form-control" type="text" v-model="lecturer.address" /> <span v-if="errors.address"> {{ errors.address }} </span>
  </b-form-group>
  <b-form-group label="Email">
    <input class="form-control" type="text" v-model="lecturer.email" />
  </b-form-group>
  <b-form-group label="Phone">
    <input class="form-control" type="text" v-model="lecturer.phone" /> <span v-if="errors.phone"> {{ errors.phone }} </span>
  </b-form-group>


  <button type="button" class="btn btn-success form-control" align="center" @click="editLecturer()">Submit</button>

  <!-- <button @click="editLecturer()">Submit</button> -->


</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LecturerEdit',
  components: {
    //CourseEdit
  },
  data() {
    return {
      error: [],
      lecturer: {

        name: "",
        address: "",
        email: "",
        phone: "",

      },
      errors: {}
    }
  },
  mounted() {
    //  course(){
    return this.getLecturer(this.$route.params.id)
    //  }
  },
  methods: {
    getLecturer() {
      let token = localStorage.getItem('token');


      axios.get(`http://college.api:8000/api/lecturers/${this.$route.params.id}`, {
          headers: {
            Authorization: "Bearer " + token
          },


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
    editLecturer() {
      this.error = [];
         if (!this.lecturer.name) {
         this.error.push("Course title required.");
         }
         if (!this.lecturer.address) {
         this.error.push("Course code is required.");
         }
         if (!this.lecturer.email) {
         this.error.push("Course description is required.");
         }
         if (!this.lecturer.phone) {
         this.error.push("Phone number required.");
         }
      let token = localStorage.getItem('token');


      axios.put(`http://college.api:8000/api/lecturers/${this.$route.params.id}`, {
        name: this.lecturer.name,
        address: this.lecturer.address,
        email: this.lecturer.email,
        phone: this.lecturer.phone,
      },
      {
        headers: { Authorization: "Bearer " + token}
      })
      .then(response => {
        console.log(response.data);
        this.lecturer = response.data.data;
        this.$router.push({ name: 'lecturers_index' });
      })
      .catch(error => {
        console.log(error)
        console.log(error.response.data)
        if (error.response.data.errors) {
          this.errors = error.response.data.errors
        }
      })
    }

    // editLecturer() {
    //   this.error = [];
    //   if (!this.lecturer.name) {
    //     this.errors.push("Course title required.");
    //   }
    //   if (!this.lecturer.address) {
    //     this.errors.push("Course code is required.");
    //   }
    //   if (!this.lecturer.email) {
    //     this.errors.push("Course description is required.");
    //   }
    //   if (!this.lecturer.phone) {
    //     this.errors.push("Course points required.");
    //   }
    //
    //
    //   let token = localStorage.getItem('token');
    //
    //
    //     axios.put(`http://localhost:8000/api/lecturers/${this.id}`, {
    //         name: this.lecturer.name,
    //         address: this.lecturer.address,
    //         phone: this.lecturer.phone,
    //         email: this.lecturer.email
    //       }, {
    //         headers: {
    //           Authorization: "Bearer " + token
    //         }
    //       })
    //       .then(response => {
    //         console.log(response.data);
    //         this.$router.push({
    //           name: 'lecturers_index',
    //
    //         });
    //       })
    //       .catch(error => {
    //         console.log(error)
    //         console.log(error.response.data)
    //         if (error.response.data.errors) {
    //           this.errors = error.response.data.errors
    //         }
    //       })
    //
    // }
  },
}
</script>
<style>
.home {
  text-align: center;
}
</style>
