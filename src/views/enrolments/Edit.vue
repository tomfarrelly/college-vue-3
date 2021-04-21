<!--
@Author: tomfarrelly
@Date:   2021-03-02T10:59:59+00:00
@Last modified by:   tomfarrelly
@Last modified time: 2021-04-21T02:03:19+01:00
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

           <b-form-group label="Date">
             <input class="form-control" type="date" v-model="enrolment.date" />
           </b-form-group>

           <b-form-group label="Time">
             <input class="form-control" type="time" v-model="enrolment.time" /> <span v-if="errors.time"> {{ errors.time }} </span><br>
           </b-form-group>

              <b-form-group label="Status">
               <b-row>
                 <b-col md="12">
                   <b-button class="ml-2" pill variant="primary" size="sm">
                     <b-form-radio v-model="enrolment.status" value="assigned">Assigned</b-form-radio>
                   </b-button>


                   <b-button class="ml-2" pill variant="primary" size="sm">
                     <b-form-radio v-model="enrolment.status" value="associate">Associate</b-form-radio>
                   </b-button>



                   <b-button class="ml-2" pill variant="primary" size="sm">
                     <b-form-radio v-model="enrolment.status" value="career_break">Career Break</b-form-radio>
                   </b-button>


                   <b-button class="ml-2" pill variant="primary" size="sm">
                     <b-form-radio v-model="enrolment.status" value="interested">Interested</b-form-radio>
                   </b-button>
                 </b-col>
               </b-row>
             </b-form-group>



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


             <button type="button" class="btn btn-primary btn-lg btn-block" align="center"  @click="editEnrolment()">Submit</button>

     </b-form>
     </b-col>
   </b-row>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'EnrolmentEdit',
  components: {
    
  },
  data() {
    return {
      error: [],
      enrolment: {

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
    getEnrolment() {
      let token = localStorage.getItem('token');


      axios.get(`http://college.api:8000/api/enrolments/${this.$route.params.id}`, {
        headers: { Authorization: "Bearer " + token},
        date: this.enrolment.date,
        time: this.enrolment.time,
        status: this.enrolment.status,
        course_id: this.enrolment.course_id,
        lecturer_id: this.enrolment.lecturer_id,

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
    editEnrolment() {
      this.error = [];
        if (!this.enrolment.date) {
        this.error.push("Date is required.");
        }
        if (!this.enrolment.time) {
        this.error.push("Time is required.");
        }
        if (!this.enrolment.status) {
        this.error.push("Status is required.");
        }
        if (!this.enrolment.course_id) {
        this.error.push("Course ID required.");
        }
        if (!this.enrolment.lecturer_id) {
        this.error.push("Lecturer ID required.");
        }
      let token = localStorage.getItem('token');


      axios.put(`http://college.api:8000/api/enrolments/${this.$route.params.id}`, {
        date: this.enrolment.date,
        time: this.enrolment.time,
        status: this.enrolment.status,
        course_id: this.enrolment.course_id,
        lecturer_id: this.enrolment.lecturer_id,
      },
      {
        headers: { Authorization: "Bearer " + token}
      })
      .then(response => {
        console.log(response.data);
        this.enrolment = response.data.data;
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
