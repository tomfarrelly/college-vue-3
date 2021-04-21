<!--
@Author: tomfarrelly
@Date:   2021-03-02T10:21:12+00:00
@Last modified by:   tomfarrelly
@Last modified time: 2021-04-20T22:45:55+01:00
-->



<template>
  <div>
    <h2>This is the Enrolments Index page</h2>



    <b-row md="12">
      <b-col>
    <button type="button" class="btn btn-success" align="center" @click="getEnrolments()">Get Enrolments</button>
    </b-col>
    <b-col >
    <router-link :to="{ name: 'enrolments_create'}">
      <button type="button" class="btn btn-primary float-right" align="right">Create</button>
    </router-link>
  </b-col>
  </b-row>






    <br><br>

    <b-table striped hover :items="enrolments" :fields="fields">
      <template #cell(id)="data">
        <router-link :to="{ name: 'enrolments_show', params: { id: data.item.id }}">{{ data.item.id }}</router-link>
        
      </template>
    </b-table>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'EnrolmentsIndex',
  components: {
  },
  props: {
    loggedIn: Boolean,
  },
  data() {
    return {
      fields: [
        {
          key: 'id',
          sortable: true,
        },
        'date',
        'time',
        'status',
        'course_id',
        'lecturer_id',
        {
          key: 'id',
          sortable: true,
        }
        ],
      enrolments: []
    }
  },
  mounted(){

    if (this.loggedIn){
      this.getEnrolments()
    }else{
      this.$router.push({ name: 'home' });

    }

    this.getEnrolments();
  },
  methods: {
    getEnrolments() {
      let token = localStorage.getItem('token');

      axios.get('http://college.api:8000/api/enrolments', {
        headers: { Authorization: "Bearer " + token}
      })
      .then(response => {
        console.log(response.data);
        this.enrolments = response.data.data;

      })
      .catch(error => {
        console.log(error)
        console.log(error.response.data)
      })
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
