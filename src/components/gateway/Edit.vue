<template>
  <div>
    <h4 class="text-center mt-20">
      <small>
        <button class="btn btn-success" v-on:click="navigate()">
          View All Gateways
        </button>
      </small>
    </h4>
    <div class="col-md-12 form-wrapper">
      <h2>Edit Gateway</h2>
      <form id="create-post-form" @submit.prevent="editGateway">
        <div class="form-group col-md-12">
          <label for="title"> Serial Number </label>
          <input
            type="text"
            id="serialNumber"
            v-model="gateway.serialNumber"
            name="title"
            class="form-control"
            placeholder="Enter gateway serial number"
          />
        </div>
        <div class="form-group col-md-12">
          <label for="title"> Readable Name </label>
          <input
            type="text"
            id="hrName"
            v-model="gateway.hrName"
            name="title"
            class="form-control"
            placeholder="Enter human-readable name"
          />
        </div>
        <div class="form-group col-md-12">
          <label for="title"> Ipv4 Address </label>
          <input
            type="text"
            id="ipAddress"
            v-model="gateway.ipAddress"
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
            v-model="gateway.devicesIDs"
            name="title"
            class="form-control"
            placeholder="Enter the associated devices"
          />
        </div>
        <div class="form-group col-md-4 pull-right">
          <button class="btn btn-success" type="submit">Edit Gateway</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { server } from '../../helpers/helper';
import axios from 'axios';
import router from '../../router';
export default {
  data() {
    return {
      id: 0,
      gateway: {},
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getGateway();
  },
  methods: {
    editGateway() {
      let gatewayData = {
        serialNumber: this.gateway.serialNumber,
        hrName: this.gateway.hrName,
        ipAddress: this.gateway.ipAddress,
        devicesIDs: this.gateway.devicesIDs,
      };
      axios
        .put(
          `${server.baseURL}/gateway/update?gatewayID=${this.id}`,
          gatewayData
        )
        .then(() => {
          router.push({ name: 'home' });
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getGateway() {
      axios
        .get(`${server.baseURL}/gateway/${this.id}`)
        .then((data) => (this.gateway = data.data));
    },
    navigate() {
      router.go(-1);
    },
  },
};
</script>
