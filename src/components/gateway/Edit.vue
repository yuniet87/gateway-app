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
      <v-container fill-height fluid>
        <v-col align="center" justify="center">
          <form id="create-post-form" @submit.prevent="editGateway">
            <div class="form-group col-md-4">
              <label for="title"> Serial Number </label>
              <input
                type="text"
                id="serialNumber"
                v-model="gateway.serialNumber"
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
                v-model="gateway.hrName"
                name="title"
                class="form-control"
                placeholder="Enter human-readable name"
              />
            </div>
            <div class="form-group col-md-4">
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
            <div class="form-group col-md-4">
              <label for="title"> Associated Peripheral Devices </label>
              <v-autocomplete
                v-model="gateway.devicesIDs"
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
                Edit Gateway
              </button>
            </div>
          </form>
        </v-col>
      </v-container>
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
      isLoading: false,
      devices: [],
      search: null,
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getGateway();
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
      axios.get(`${server.baseURL}/gateway/${this.id}`).then((data) => {
        this.gateway = data.data;
        console.log(data.data.devicesIDs);
        this.devices = data.data.devicesIDs;
      });
    },
    navigate() {
      router.go(-1);
    },
  },
};
</script>
