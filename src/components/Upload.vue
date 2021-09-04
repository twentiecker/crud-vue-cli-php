<template>
  <div class="container" id="uploadApp">
    <br />
    <h3 align="center">How to upload file using Vue.js with PHP</h3>
    <br />
    <div v-if="successAlert" class="alert alert-success alert-dismissible">
      <a href="#" class="close" aria-label="close" @click="successAlert = false"
        >&times;</a
      >
      {{ successMessage }}
    </div>

    <div v-if="errorAlert" class="alert alert-danger alert-dismissible">
      <a href="#" class="close" aria-label="close" @click="errorAlert = false"
        >&times;</a
      >
      {{ errorMessage }}
    </div>
    <div class="panel panel-default">
      <div class="panel-heading">
        <div class="row">
          <div class="col-md-6">
            <h3 class="panel-title">Upload File</h3>
          </div>
          <div class="col-md-6" align="right"></div>
        </div>
      </div>
      <div class="panel-body">
        <div class="row">
          <div class="col-md-4" align="right">
            <label>Select Image</label>
          </div>
          <div class="col-md-4">
            <input type="file" ref="file" />
          </div>
          <div class="col-md-4">
            <button type="button" @click="uploadImage" class="btn btn-primary">
              Upload Image
            </button>
          </div>
        </div>
        <br />
        <br />
        <div v-html="uploadedImage" align="center"></div>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require("axios");

export default {
  data() {
    return {
      file: "",
      successAlert: false,
      errorAlert: false,
      uploadedImage: "",
    };
  },
  methods: {
    uploadImage: function() {
      let self = this;

      self.file = self.$refs.file.files[0];

      var formData = new FormData();

      formData.append("file", self.file);

      axios
        .post("upload.php", formData, {
          header: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(function(response) {
          if (response.data.image == "") {
            self.errorAlert = true;
            self.successAlert = false;
            self.errorMessage = response.data.message;
            self.successMessage = "";
            self.uploadedImage = "";
          } else {
            self.errorAlert = false;
            self.successAlert = true;
            self.errorMessage = "";
            self.successMessage = response.data.message;
            var image_html =
              "<img src='" +
              response.data.image +
              "' class='img-thumbnail' width='200' />";
            self.uploadedImage = image_html;
            self.$refs.file.value = "";
          }
        });
    },
  },
};
</script>
