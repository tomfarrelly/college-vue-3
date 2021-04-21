<!--
@Author: tomfarrelly
@Date:   2021-03-02T10:59:59+00:00
@Last modified by:   tomfarrelly
@Last modified time: 2021-04-20T23:10:40+01:00
-->



<template>
  <div>

      <b-row>
        <b-col md="12">
          <b-form>

            <p v-if="error.length">
              <b>Please correct the following error(s):</b>
              <ul>
              <li v-for="error in error" :key="error.id">{{ error }}</li>
              </ul>
            </p>
            <b-form-group label="Title">
              <input class="form-control" type="text" v-model="form.title" />
            </b-form-group>
            <b-form-group label="Code">
              <input class="form-control" type="text" v-model="form.code" /> <span v-if="errors.code"> {{ errors.code }} </span>
            </b-form-group>
            <b-form-group label="Description">
              <input class="form-control" type="text" v-model="form.description" />
            </b-form-group>
              <b-form-group label="Points">
                <input class="form-control" type="text" v-model="form.points" /> <span v-if="errors.points"> {{ errors.points }} </span>
              </b-form-group>
              <b-form-group label="Level">
               <input class="form-control" type="text" v-model="form.level" /> <span v-if="errors.level"> {{ errors.level }} </span>
              </b-form-group>
              <button type="button" class="btn btn-primary btn-lg btn-block" align="center" @click="createCourse()">Submit</button>

        </b-form>
      </b-col>
    </b-row>
  </div>
</template>





<script>
import axios from 'axios';

export default {
  name: 'CourseCreate',
  components: {
  },
  data() {
    return {
      error: [],
      form: {
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

  },
  methods: {
    createCourse() {
      this.error = [];
        if (!this.form.title) {
        this.error.push("title is required.");
        }
        if (!this.form.code) {
        this.error.push("Code is required.");
        }
        if (!this.form.description) {
        this.error.push("Description is required.");
        }
        if (!this.form.points) {
        this.error.push("Points required.");
        }
        if (!this.form.level) {
        this.error.push("Level required.");
        }
      let token = localStorage.getItem('token');


      axios.post('http://college.api:8000/api/courses', {
        title: this.form.title,
        code: this.form.code,
        description: this.form.description,
        points: this.form.points,
        level: this.form.level,
      },
      {
        headers: { Authorization: "Bearer " + token}
      })
      .then(response => {
        console.log(response.data);
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
