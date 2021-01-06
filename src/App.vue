<template>
  <v-app>
    <v-main>
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/create">Add Gateway</router-link> |
        <router-link to="/devices">Devices</router-link> |
        <router-link to="/devices/create">Add Devices</router-link>
      </div>
      <router-view />
      <notifications
        group="error"
        position="top center"
        :max="3"
        :width="400"
        classes="n-light"
      />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  components: {},

  data: () => ({
    //
  }),
};
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.n-light {
  margin: 10px;
  margin-bottom: 0;
  border-radius: 3px;
  font-size: 15px;
  padding: 10px 20px;
  border: 1px solid #f3144c;
  background: #0f79e4;
  color: #f36689;
}
</style>
