<template>
  <div>
    <div class="col-md-12 form-wrapper">
      <h2>Create Gateway</h2>
      <form id="create-post-form" @submit.prevent="createGateway">
        <div class="form-group col-md-12">
          <label for="title"> Serial Number </label>
          <input
            type="text"
            id="serialNumber"
            v-model="serialNumber"
            name="title"
            class="form-control"
            placeholder="Enter gateway serial number"
            required
          />
        </div>
        <div class="form-group col-md-12">
          <label for="title"> Readable Name </label>
          <input
            type="text"
            id="hrName"
            v-model="hrName"
            name="title"
            class="form-control"
            placeholder="Enter human-readable name"
            required
          />
        </div>
        <div class="form-group col-md-12">
          <label for="title"> Ipv4 Address </label>
          <input
            type="text"
            id="ipAddress"
            v-model="ipAddress"
            name="title"
            class="form-control"
            placeholder="Enter ip v4 address"
          />
        </div>
        <div class="form-group col-md-12">
          <label for="title"> Associated Peripheral Devices </label>
          <input
            type="text"
            id="devicesIDs"
            v-model="devicesIDs"
            name="title"
            class="form-control"
            placeholder="Enter the associated devices"
          />
        </div>
        <div class="form-group col-md-4 pull-right">
          <button class="btn btn-success" type="submit">Create Gateway</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import { server } from '../../helpers/helper';
import router from '../../router';
export default {
  data() {
    return {
      serialNumber: '',
      hrName: '',
      ipAddress: '',
      devicesIDs: [],
    };
  },
  methods: {
    createGateway() {
      let gatewayData = {
        serialNumber: this.serialNumber,
        hrName: this.hrName,
        ipAddress: this.ipAddress,
        devicesIDs: this.devicesIDs,
      };
      this.__submitToServer(gatewayData);
    },
    __submitToServer(data) {
      axios
        .post(`${server.baseURL}/gateway/create`, data)
        .then(() => {
          router.push({ name: 'home' });
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
