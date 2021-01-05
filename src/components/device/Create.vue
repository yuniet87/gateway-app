<template>
  <div>
    <div class="col-md-12 form-wrapper">
      <h2>Create Device</h2>
      <form id="create-post-form" @submit.prevent="createDevice">
        <div class="form-group col-md-12">
          <label for="title"> Vendor </label>
          <input
            type="text"
            id="vendor"
            v-model="vendor"
            name="title"
            class="form-control"
            placeholder="Enter device vendor"
          />
        </div>
        <div class="form-group col-md-12">
          <label for="title"> Created Date </label>
          <datepicker-lite :value-attr="data.createdDate" />
          <!-- <input
            type="text"
            id="createdDate"
            v-model="createdDate"
            name="title"
            class="form-control"
            placeholder="Select created date"
          /> -->
        </div>
        <div class="form-group col-md-12">
          <label for="title"> Status </label>
          <input
            type="text"
            id="isOnline"
            v-model="isOnline"
            name="title"
            class="form-control"
            placeholder="Select status of the device"
          />
        </div>
        <div class="form-group col-md-4 pull-right">
          <button class="btn btn-success" type="submit">Create Device</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import { server } from '../../helpers/helper';
import router from '../../router';
import moment from 'moment';
import DatepickerLite from 'vue3-datepicker-lite';

export default {
  components: {
    DatepickerLite,
  },
  data() {
    return {
      vendor: '',
      createdDate: moment(),
      isOnline: true,
    };
  },
  methods: {
    createDevice() {
      let deviceData = {
        vendor: this.vendor,
        createdDate: this.createdDate,
        isOnline: this.isOnline,
      };
      this.__submitToServer(deviceData);
    },
    __submitToServer(data) {
      axios
        .post(`${server.baseURL}/device/create`, data)
        .then(() => {
          router.push({ name: 'Devices' });
        })
        .catch((err) => {
          console.log(err.response.data.message);
          this.$notify({
            group: 'error',
            type: 'error',
            text: err.response.data.message,
          });
        });
    },
  },
};
</script>
