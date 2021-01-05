<template>
  <div id="app">
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
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.form-wrapper {
  width: 500px;
  margin: 0 auto;
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
