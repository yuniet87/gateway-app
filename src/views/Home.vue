<template>
  <div class="container-fluid">
    <div class="text-center">
      <h1>Gateway App</h1>
      <p>Built with Nest.js, Vue.js and MongoDB</p>
      <div v-if="gateways.length === 0">
        <h2>No gateways found at the moment</h2>
      </div>
    </div>

    <div class="">
      <table class="table table-bordered">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Serial Number</th>
            <th scope="col">Readable Name</th>
            <th scope="col">Ipv4 Address</th>
            <th scope="col">Associated Peripheral Devices</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="gateway in gateways" :key="gateway._id">
            <td>{{ gateway.serialNumber }}</td>
            <td>{{ gateway.hrName }}</td>
            <td>{{ gateway.ipAddress }}</td>
            <td>
              <div v-for="item in gateway.devicesIDs" :key="item">
                {{ item.vendor }}
              </div>
            </td>
            <td>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group" style="margin-bottom: 20px;">
                  <router-link
                    :to="{ name: 'Edit', params: { id: gateway._id } }"
                    class="btn btn-sm btn-outline-secondary"
                    >Edit Gateway
                  </router-link>
                  <button
                    class="btn btn-sm btn-outline-secondary"
                    v-on:click="deleteGateway(gateway._id)"
                  >
                    Delete Gateway
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
import { server } from '../helpers/helper';

export default {
  data() {
    return {
      gateways: [],
    };
  },
  created() {
    this.fetchGateways();
  },
  methods: {
    fetchGateways() {
      axios.get(`${server.baseURL}/gateway`).then((data) => {
        this.gateways = data.data;
      });
    },
    deleteGateway(id) {
      axios
        .delete(`${server.baseURL}/gateway/delete?gatewayID=${id}`)
        .then(() => {
          window.location.reload();
        });
    },
  },
};
</script>
