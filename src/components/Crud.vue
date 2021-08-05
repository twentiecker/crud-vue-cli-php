<template>
  <div class="container">
    <br />
    <h3 align="center">
      <strong>Delete or Remove Data From Mysql using Vue.js with PHP</strong>
    </h3>
    <br />
    <div class="panel panel-default">
      <!-- sort and add data -->
      <div class="panel-heading">
        <div class="row">
          <div class="col-md-4" align="left">
            <h3 class="panel-title">Sample Data</h3>
          </div>
          <div class="col-md-3" align="right">
            <h3>Sort by:</h3>
          </div>
          <div class="col-md-3" align="left">
            <b-form-select
              class="form-control"
              v-model="sortby"
              :options="options"
              @change="sortData"
            ></b-form-select>
          </div>
          <div class="col-md-2" align="right">
            <!-- <input
              type="button"
              class="btn btn-success btn-xs"
              @click="openModel"
              value="Add"
            /> -->
            <b-button variant="success" @click="openModel"
              ><b-icon-person-plus></b-icon-person-plus> Add</b-button
            >
          </div>
        </div>
      </div>
      <!-- end of sort and add data -->
      <!-- table of contents -->
      <div class="panel-body mt-3">
        <div class="table-responsive">
          <table class="table table-hover">
            <thead class="table-light">
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Gender</th>
                <th>Hobby</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody class="align-middle">
              <tr v-for="row in allData" :key="row">
                <td>{{ row.first_name }}</td>
                <td>{{ row.last_name }}</td>
                <td>{{ row.gender }}</td>
                <td>{{ row.hobby }}</td>
                <td>
                  <!-- <button
                  type="button"
                  name="edit"
                  class="btn btn-primary btn-xs edit"
                  @click="fetchData(row.id)"
                >
                  <b-icon-person-plus></b-icon-person-plus>
                </button> -->
                  <b-button variant="outline-primary" @click="fetchData(row.id)"
                    ><b-icon-pencil-fill></b-icon-pencil-fill
                  ></b-button>
                </td>
                <td>
                  <!-- <button
                  type="button"
                  name="delete"
                  class="btn btn-danger btn-xs delete"
                  @click="deleteData(row.id)"
                >
                  Delete
                </button> -->
                  <b-button variant="outline-danger" @click="deleteData(row.id)"
                    ><b-icon-trash-fill></b-icon-trash-fill
                  ></b-button>
                </td>
              </tr>
              <tr v-for="row in dummyData" :key="row">
                <td>{{ row.first_name }}</td>
                <td>{{ row.last_name }}</td>
                <td>{{ row.gender }}</td>
                <td>{{ row.hobby }}</td>
                <td>
                  <!-- <button
                  type="button"
                  name="edit"
                  class="btn btn-primary btn-xs edit"
                  @click="fetchData(row.id)"
                >
                  <b-icon-person-plus></b-icon-person-plus>
                </button> -->
                  <b-button variant="outline-primary" @click="fetchData(row.id)"
                    ><b-icon-pencil-fill></b-icon-pencil-fill
                  ></b-button>
                </td>
                <td>
                  <!-- <button
                  type="button"
                  name="delete"
                  class="btn btn-danger btn-xs delete"
                  @click="deleteData(row.id)"
                >
                  Delete
                </button> -->
                  <b-button variant="outline-danger" @click="deleteData(row.id)"
                    ><b-icon-trash-fill></b-icon-trash-fill
                  ></b-button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- end of table of contents -->
    </div>
    <!-- myModel for entri data -->
    <div v-if="myModel">
      <transition name="model">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" @click="myModel = false">
                    <span aria-hidden="true">&times;</span>
                  </button>
                  <h4 class="modal-title">{{ dynamicTitle }}</h4>
                </div>
                <div class="modal-body">
                  <div class="form-group">
                    <label>Enter First Name</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="first_name"
                    />
                  </div>
                  <div class="form-group">
                    <label>Enter Last Name</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="last_name"
                    />
                  </div>
                  <div class="form-group">
                    <label>Enter Gender</label>
                    <input type="text" class="form-control" v-model="gender" />
                  </div>
                  <div class="form-group">
                    <label>Enter Hobby</label>
                    <div>
                      <b-form-select
                        class="form-control"
                        v-model="hobby"
                        :options="options"
                      ></b-form-select>
                    </div>
                  </div>

                  <br />
                  <div align="center">
                    <input type="hidden" v-model="hiddenId" />
                    <input
                      type="button"
                      class="btn btn-success btn-xs"
                      v-model="actionButton"
                      @click="submitData"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <!-- end of myModel for entri data -->
  </div>
</template>

<script>
const axios = require("axios");

export default {
  data() {
    return {
      dummyData: [
        {
          first_name: "Lukman",
          last_name: "Arifandhi",
          gender: "male",
          hobby: "Coding",
        },
        {
          first_name: "Nur",
          last_name: "Agustina",
          gender: "female",
          hobby: "Designing",
        },
        {
          first_name: "Rafanza",
          last_name: "Arziki",
          gender: "male",
          hobby: "Gaming",
        },
        {
          first_name: "Celmira",
          last_name: "Almaviva",
          gender: "female",
          hobby: "Designing",
        },
      ],
      allData: "",
      sortby: null,
      myModel: false,
      options: [
        { value: null, text: "Please select an option" },
        { value: "Gaming", text: "Gaming" },
        { value: "Coding", text: "Coding" },
        { value: "Designing", text: "Designing" },
      ],
      actionButton: "Insert",
      dynamicTitle: "Add Data",
    };
  },
  methods: {
    sortData: function() {
      let self = this;

      axios
        .post("action.php", {
          action: "sortdata",
          sortby: self.sortby,
        })
        .then(function(response) {
          self.allData = response.data;
        });
    },
    fetchAllData: function() {
      let self = this;

      axios
        .post("action.php", {
          action: "fetchall",
        })
        .then(function(response) {
          self.allData = response.data;
        });
    },
    openModel: function() {
      let self = this;

      self.first_name = "";
      self.last_name = "";
      self.gender = "";
      self.hobby = null;
      self.actionButton = "Insert";
      self.dynamicTitle = "Add Data";
      self.myModel = true;
    },
    submitData: function() {
      let self = this;

      if (
        self.first_name != "" &&
        self.last_name != "" &&
        self.gender != "" &&
        self.hobby != null
      ) {
        if (self.actionButton == "Insert") {
          axios
            .post("action.php", {
              action: "insert",
              firstName: self.first_name,
              lastName: self.last_name,
              gender: self.gender,
              hobby: self.hobby,
            })
            .then(function(response) {
              self.myModel = false;
              self.fetchAllData();
              self.first_name = "";
              self.last_name = "";
              self.gender = "";
              self.hobby = null;
              alert(response.data.message);
            });
        }
        if (self.actionButton == "Update") {
          axios
            .post("action.php", {
              action: "update",
              firstName: self.first_name,
              lastName: self.last_name,
              gender: self.gender,
              hobby: self.hobby,
              hiddenId: self.hiddenId,
            })
            .then(function(response) {
              self.myModel = false;
              self.fetchAllData();
              self.first_name = "";
              self.last_name = "";
              self.gender = "";
              self.hobby = null;
              self.hiddenId = "";
              alert(response.data.message);
            });
        }
      } else {
        alert("Fill All Field");
      }
    },
    fetchData: function(id) {
      let self = this;

      axios
        .post("action.php", {
          action: "fetchSingle",
          id: id,
        })
        .then(function(response) {
          self.first_name = response.data.first_name;
          self.last_name = response.data.last_name;
          self.gender = response.data.gender;
          self.hobby = response.data.hobby;
          self.hiddenId = response.data.id;
          self.myModel = true;
          self.actionButton = "Update";
          self.dynamicTitle = "Edit Data";
        });
    },
    deleteData: function(id) {
      let self = this;

      if (confirm("Are you sure you want to remove this data?")) {
        axios
          .post("action.php", {
            action: "delete",
            id: id,
          })
          .then(function(response) {
            self.fetchAllData();
            alert(response.data.message);
          });
      }
    },
  },
  created: function() {
    let self = this;

    self.fetchAllData();
  },
};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
</style>
