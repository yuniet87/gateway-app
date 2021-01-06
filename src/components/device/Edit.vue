<template>
  <div>
    <h4 class="text-center mt-20">
      <small>
        <button class="btn btn-success" v-on:click="navigate()">
          View All Devices
        </button>
      </small>
    </h4>
    <div class="col-md-12 form-wrapper">
      <h2>Edit Device</h2>
      <v-container fill-height fluid>
        <v-col align="center" justify="center">
          <form id="create-post-form" @submit.prevent="editDevice">
            <div class="form-group col-md-4">
              <label for="title"> Vendor </label>
              <input
                type="text"
                id="vendor"
                v-model="device.vendor"
                name="title"
                class="form-control"
                placeholder="Enter device vendor"
              />
            </div>
            <div class="form-group col-md-4">
              <label for="title"> Created Date </label>
              <v-menu
                v-model="menupicker.value"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    :value="date"
                    label="Picker in menu"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="date" @input="menupicker.value = false">
                </v-date-picker>
              </v-menu>
            </div>
            <div class="form-group col-md-4">
              <label for="title"> Status </label>
              <v-checkbox
                v-model="device.isOnline"
                v-if="device.isOnline"
                label="Online"
              ></v-checkbox>
              <v-checkbox
                v-model="device.isOnline"
                v-else
                label="Offline"
              ></v-checkbox>
            </div>
            <div class="form-group col-md-4 pull-right">
              <button class="btn btn-success" type="submit">
                Edit Device
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
import moment from 'moment';

export default {
  data() {
    return {
      id: 0,
      date: '',
      menupicker: {
        value: false,
      },
      device: {},
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getDevice();
  },
  methods: {
    editDevice() {
      let deviceData = {
        vendor: this.device.vendor,
        createdDate: moment(this.date).toISOString(),
        isOnline: this.device.isOnline,
      };
      axios
        .put(`${server.baseURL}/device/update?deviceID=${this.id}`, deviceData)
        .then(() => {
          router.push({ name: 'Devices' });
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getDevice() {
      axios.get(`${server.baseURL}/device/${this.id}`).then((data) => {
        this.device = data.data;
        this.date = data.data.createdDate.substr(0, 10);
      });
    },
    navigate() {
      router.go(-1);
    },
  },
};
</script>
