<!--
@Author: tomfarrelly
@Date:   2021-03-02T10:59:59+00:00
@Last modified by:   tomfarrelly
@Last modified time: 2021-04-20T23:13:38+01:00
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
        <b-form-group label="Name">
          <input class="form-control" type="text" v-model="form.name" />
        </b-form-group>
        <b-form-group label="Address">
          <input class="form-control" type="text" v-model="form.address" /> <span v-if="errors.address"> {{ errors.address }} </span>
        </b-form-group>
        <b-form-group label="Email">
          <input class="form-control" type="text" v-model="form.email" />
        </b-form-group>
        <b-form-group label="Phone">
          <input class="form-control" type="text" v-model="form.phone" /> <span v-if="errors.phone"> {{ errors.phone }} </span>
        </b-form-group>


        <button  type="button" class="btn btn-success form-control" align="center" @click="createLecturer()">Submit</button>

      </b-form>
    </b-col>
  </b-row>
</div>
</template>
<!-- <template>
  <div>
    <b-modal id="createLecturerModal" ref="createLecturerModal" />
    <b-row>
      <b-form>

        <b-form-group label="Name">
          <b-form-input type="text" v-model="form.name" />
        </b-form-group>

        <b-form-group label="Address">
          <b-form-input type="text" v-model="form.address" />
        </b-form-group>

        <b-form-group label="Phone">
          <b-form-input type="text" v-model="form.phone" />
        </b-form-group>

        <b-form-group label="Email">
          <b-form-input type="text" v-model="form.email" />
        </b-form-group>

        <b-form-group label="">
        <button @click="createLecturer()">Submit</button>
        </b-form-group>

      </b-form>
    </b-row>
  </div>
</template> -->

<script>
import axios from 'axios';

export default {
  name: 'LectureCreate',
  components: {
  },
  data() {

    return {
      error: [],
      form: {
        name: "",
        address: "",
        email: "",
        phone: "",

      },
      errors: {}
    }
  },
  mounted(){

  },
  methods: {
    createLecturer() {
      this.error = [];
        if (!this.form.name) {
        this.error.push("Course title required.");
        }
        if (!this.form.address) {
        this.error.push("Course code is required.");
        }
        if (!this.form.email) {
        this.error.push("Course description is required.");
        }
        if (!this.form.phone) {
        this.error.push("Course points required.");
        }
        if (!this.form.description) {
        this.error.push("Course level required.");
        }
      let token = localStorage.getItem('token');


      axios.post('http://college.api:8000/api/lecturers', {
        name: this.form.name,
        address: this.form.address,
        email: this.form.email,
        phone: this.form.phone,

      },
      {
        headers: { Authorization: "Bearer " + token}
      })
      .then(response => {
        console.log(response.data);
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
  },
}
</script>
<style>
.home {
  text-align: center;
}
</style>
