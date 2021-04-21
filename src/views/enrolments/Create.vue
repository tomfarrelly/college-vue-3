<!--
@Author: tomfarrelly
@Date:   2021-03-02T10:59:59+00:00
@Last modified by:   tomfarrelly
@Last modified time: 2021-04-21T04:09:42+01:00
-->



<template>
  <div>
    <!-- Date: <input type="date" v-model="form.date" /> <br>
    Time: <input type="time" v-model="form.time" /> <span v-if="errors.time"> {{ errors.time }} </span><br>
    Status: <input type="text" v-model="form.status" /> <br>
    Course Id: <input type="int" v-model="form.course_id" /> <span v-if="errors.course_id"> {{ errors.course_id }} </span><br>
    Lecturer Id: <input type="int" v-model="form.lecturer_id" /> <span v-if="errors.lecturer_id"> {{ errors.lecturer_id }} </span><br> -->
   <b-row>
       <b-col md="12">
        <b-form>
          <p v-if="error.length">
            <b>Please correct the following error(s):</b>
            <ul>
            <li v-for="error in error" :key="error.id">{{ error }}</li>
            </ul>
          </p>

          <b-form-group label="Date">
            <input class="form-control" type="date" v-model="form.date" />
          </b-form-group>

          <b-form-group label="Time">
            <input class="form-control" type="time" v-model="form.time" /> <span v-if="errors.time"> {{ errors.time }} </span><br>
          </b-form-group>

             <b-form-group label="Status">
              <b-row>
                <b-col md="12">
                  <b-button class="ml-2" pill variant="primary" size="sm">
                    <b-form-radio v-model="form.status" value="assigned">Assigned</b-form-radio>
                  </b-button>


                  <b-button class="ml-2" pill variant="primary" size="sm">
                    <b-form-radio v-model="form.status" value="associate">Associate</b-form-radio>
                  </b-button>



                  <b-button class="ml-2" pill variant="primary" size="sm">
                    <b-form-radio v-model="form.status" value="career_break">Career Break</b-form-radio>
                  </b-button>


                  <b-button class="ml-2" pill variant="primary" size="sm">
                    <b-form-radio v-model="form.status" value="interested">Interested</b-form-radio>
                  </b-button>
                </b-col>
              </b-row>
            </b-form-group>

            <!-- <b-form-group label="Status">
              <input class="form-control" type="status" v-model="form.status" /> <span v-if="errors.status"> {{ errors.status }} </span><br>
            </b-form-group>


            <b-form-group label="Course">
              <input class="form-control" type="course" v-model="form.course_id" /> <span v-if="errors.course"> {{ errors.course }} </span><br>
            </b-form-group>

            <b-form-group label="Lecturer">
              <input class="form-control"  type="lecturer" v-model="form.lecturer_id" /> <span v-if="errors.lecturer"> {{ errors.lecturer }} </span><br>
            </b-form-group> -->

           <b-form-group label="Course Name">
              <b-form-select v-model="selectedCourse">
                <option v-for="course in courses" :value="course.id" :key="course.id">{{ course.title }}</option>
              </b-form-select>
            </b-form-group>

            <b-form-group label="Lecturer Name">
              <b-form-select v-model="selectedLecturer">
                <option v-for="lecturer in lecturers" :value="lecturer.id" :key="lecturer.id">{{ lecturer.name }}</option>
              </b-form-select>
            </b-form-group>


            <button type="button" class="btn btn-primary btn-lg btn-block" align="center"  @click="createEnrolment()">Submit</button>

    </b-form>
    </b-col>
  </b-row>
  </div>
</template>

<!-- <input type="text" v-model="form.status" /> <br> -->

<script>
import axios from 'axios';

export default {
  name: 'EnrolmentCreate',
  components: {
  },
  data() {

    return {
      error: [],
      form: {
        date: "",
        time: "",
        status: "",
        course_id: "",
        lecturer_id: "",
      },

      courses: [],
      lecturers: [],
      errors: {},
      selectedCourse: "",
      selectedLecturer: ""
    }
  },
  mounted(){
    this.getCourses();
    this.getLecturers();

  },
  methods: {

    createEnrolment() {
      this.error = [];
        if (!this.form.date) {
        this.error.push("Date is required.");
        }
        if (!this.form.time) {
        this.error.push("Time is required.");
        }
        if (!this.form.status) {
        this.error.push("Status is required.");
        }
        if (!this.form.selectedCourse) {
        this.error.push("Course ID required.");
        }
        if (!this.form.selectedLecturer) {
        this.error.push("Lecturer ID required.");
        }
      let token = localStorage.getItem('token');


      axios.post('http://college.api:8000/api/enrolments', {
        date: this.form.date,
        time: this.form.time,
        status: this.form.status,
        course_id: this.selectedCourse,
        lecturer_id: this.selectedLecturer,

      },
      {
        headers: { Authorization: "Bearer " + token}
      })
      .then(response => {
        console.log(response.data);
        this.$router.push({ name: 'enrolments_index' });
      })
      .catch(error => {
        console.log(error)
        console.log(error.response.data)
        if (error.response.data.errors) {
          this.errors = error.response.data.errors
        }
      })
    },
    getCourses() {
      let token = localStorage.getItem('token');

      axios.get('http://college.api:8000/api/courses', {
        headers: { Authorization: "Bearer " + token}
      })
      .then(response => {
        console.log(response.data);
        this.courses = response.data.data;

      })
      .catch(error => {
        console.log(error)
        console.log(error.response.data)
      })
    },
    getLecturers() {
      let token = localStorage.getItem('token');

      axios.get('http://college.api:8000/api/lecturers', {
        headers: { Authorization: "Bearer " + token}
      })
      .then(response => {
        console.log(response.data);
        this.lecturers = response.data.data;

      })
      .catch(error => {
        console.log(error)
        console.log(error.response.data)
      })
    },
  },
}
</script>
<style>
.home {
  text-align: center;
}
</style>
