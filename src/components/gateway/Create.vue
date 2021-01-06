<template>
  <div>
    <v-snackbar
      v-model="snackbar.value"
      color="red"
      rounded="pill"
      right
      absolute
      top
    >
      {{ snackbar.text }}
      <v-btn color="white" text @click="snackbar.value = false">
        Close
      </v-btn>
    </v-snackbar>
    <div class="col-md-12 form-wrapper">
      <h2>Create Gateway</h2>
      <v-container fill-height fluid>
        <v-col align="center" justify="center">
          <form id="create-post-form" @submit.prevent="createGateway">
            <div class="form-group col-md-4">
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
            <div class="form-group col-md-4">
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
            <div class="form-group col-md-4">
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
            <div class="form-group col-md-4">
              <label for="title"> Associated Peripheral Devices </label>
              <v-autocomplete
                v-model="model"
                :items="items"
                :loading="isLoading"
                :search-input.sync="search"
                @focus="searchDevices"
                placeholder="Start typing to Search"
                label="Select Devices"
                item-text="vendor"
                item-value="_id"
                color="white"
                prepend-icon="mdi-database-search"
                filled
                chips
                hide-no-data
                multiple
                clearable
                solo-inverted
                deletable-chips
                dense
              ></v-autocomplete>
            </div>
            <div class="form-group col-md-4 pull-right">
              <button class="btn btn-success" type="submit">
                Create Gateway
              </button>
            </div>
          </form>
        </v-col>
      </v-container>
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
      devices: [],
      isLoading: false,
      model: null,
      search: null,
      snackbar: {
        value: false,
        text: '',
      },
    };
  },
  computed: {
    items() {
      return this.devices.map((device) => {
        const vendor = device.vendor;
        return Object.assign({}, device, { vendor });
      });
    },
  },
  watch: {
    async search() {
      if (this.items.length > 0) return;
      if (this.isLoading) return;
      this.isLoading = true;

      await axios
        .get(`${server.baseURL}/device`)
        .then((res) => {
          this.devices = res.data;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally((this.isLoading = false));
    },
  },
  methods: {
    async searchDevices() {
      await axios
        .get(`${server.baseURL}/device`)
        .then((res) => {
          this.devices = res.data;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally((this.isLoading = false));
    },
    createGateway() {
      let gatewayData = {
        serialNumber: this.serialNumber,
        hrName: this.hrName,
        ipAddress: this.ipAddress,
        devicesIDs: this.model,
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
          this.snackbar.value = true;
          this.snackbar.text = err.response.data.message;
        });
    },
  },
};
</script>
