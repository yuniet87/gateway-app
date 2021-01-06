<template>
  <div class="container-fluid">
    <div class="text-center">
      <h1>Devices List</h1>

      <div v-if="devices.length === 0">
        <h2>No devices found at the moment</h2>
      </div>
    </div>

    <div class="">
      <table class="table table-bordered">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Vendor</th>
            <th scope="col">Created Date</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="device in devices" :key="device._id">
            <td>{{ device.vendor }}</td>
            <td>{{ device.createdDate.substr(0, 10) }}</td>
            <td v-if="device.isOnline">Online</td>
            <td v-else>Offline</td>
            <td>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group" style="margin-bottom: 20px;">
                  <router-link
                    :to="{ name: 'EditDevice', params: { id: device._id } }"
                    class="btn btn-sm btn-outline-secondary"
                    >Edit Device
                  </router-link>
                  <button
                    class="btn btn-sm btn-outline-secondary"
                    v-on:click="deleteDevice(device._id)"
                  >
                    Delete Device
                  </button>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import { server } from '../../helpers/helper';

export default {
  data() {
    return {
      devices: [],
    };
  },
  created() {
    this.fetchDevices();
  },
  methods: {
    fetchDevices() {
      axios.get(`${server.baseURL}/device`).then((data) => {
        this.devices = data.data;
      });
    },
    deleteDevice(id) {
      axios
        .delete(`${server.baseURL}/device/delete?deviceID=${id}`)
        .then(() => {
          window.location.reload();
        });
    },
  },
};
</script>
