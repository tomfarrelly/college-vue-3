<!--
@Author: tomfarrelly
@Date:   2021-03-02T10:59:59+00:00
@Last modified by:   tomfarrelly
@Last modified time: 2021-04-21T04:09:36+01:00
-->



<template>
  <div>
    <b-form>

      <p v-if="error.length">
        <b>Please correct the following error(s):</b>
        <ul>
        <li v-for="error in error" :key="error.id">{{ error }}</li>
        </ul>
      </p>
      <b-form-group label="Title">
        <input class="form-control" type="text" v-model="course.title" />
      </b-form-group>
      <b-form-group label="Code">
        <input class="form-control" type="text" v-model="course.code" /> <span v-if="errors.code"> {{ errors.code }} </span>
      </b-form-group>
      <b-form-group label="Description">
        <input class="form-control" type="text" v-model="course.description" />
      </b-form-group>
        <b-form-group label="Points">
          <input class="form-control" type="text" v-model="course.points" /> <span v-if="errors.points"> {{ errors.points }} </span>
        </b-form-group>
        <b-form-group label="Level">
         <input class="form-control" type="text" v-model="course.level" /> <span v-if="errors.level"> {{ errors.level }} </span>
        </b-form-group>
        <button type="button" class="btn btn-primary btn-lg btn-block" align="center" @click="editCourse()">Submit</button>

    </b-form>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CourseEdit',
  components: {
    //CourseEdit
  },
  data() {
    return {
      error: [],
      course: {

        title: "",
        code: "",
        description: "",
        points: "",
        level: "",

      },
      errors: {}
    }
  },
  mounted(){
  //  course(){
            return this.getCourse(this.$route.params.id)
        //  }
  },
  methods: {
    getCourse() {
      let token = localStorage.getItem('token');


      axios.get(`http://college.api:8000/api/courses/${this.$route.params.id}`, {
        headers: { Authorization: "Bearer " + token},
        title: this.course.title,
        code: this.course.code,
        description: this.course.description,
        points: this.course.points,
        level: this.course.level,
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
    editCourse() {
      this.error = [];
      if (!this.course.title) {
      this.error.push("title is required.");
      }
      if (!this.course.code) {
      this.error.push("Code is required.");
      }
      if (!this.course.description) {
      this.error.push("Description is required.");
      }
      if (!this.course.points) {
      this.error.push("Points required.");
      }
      if (!this.course.level) {
      this.error.push("Level required.");
      }
      let token = localStorage.getItem('token');


      axios.put(`http://college.api:8000/api/courses/${this.$route.params.id}`, {
        title: this.course.title,
        code: this.course.code,
        description: this.course.description,
        points: this.course.points,
        level: this.course.level,
      },
      {
        headers: { Authorization: "Bearer " + token}
      })
      .then(response => {
        console.log(response.data);
        this.course = response.data.data;
        this.$router.push({ name: 'courses_index' });
      })
      .catch(error => {
        console.log(error)
        console.log(error.response.data)
        if (error.response.data.errors) {
          this.errors = error.response.data.errors
        }
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
