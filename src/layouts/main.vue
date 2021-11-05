<template>
  <v-app>
    <nav-app-bar />
    <nav-app-drawer />
    <v-main style="background: #eee">
      <show-info />
      <div>
        <router-view />
      </div>
      <portal-target name="v-main" />
    </v-main>
  </v-app>
</template>

<script>
export default {
  created() {
    this.webSocket();
  },
  methods: {
    webSocket() {
      let usertoken = localStorage.getItem('user-token');
      let socketUrl = this.$root.config.websocetUrl;
      if ("WebSocket" in window) {
        this.$root.websocket = new WebSocket(socketUrl);
        let timer;
        this.$root.websocket.onopen = () => {
          this.$root.websocket.send(
            JSON.stringify({ e: "auth", d: usertoken })
          );
          this.$root.websocketWorking = true;
          timer = setInterval(() => {
            let d = { e: "h" };
            this.$root.websocket.send(JSON.stringify(d));
          }, 30000);
        };
        this.$root.websocket.onmessage = (evt) => {
          this.$root.$emit('websocket', JSON.parse(evt.data));
        }
        this.$root.websocket.onclose = () => {
          console.log("Connection is closed...");
          this.$root.websocketWorking = false;
          clearInterval(timer);
          setTimeout(this.webSocket, 1000);
        };
        this.$root.websocket.onerror = (err) => {
          console.error(
            "Socket encountered error: ",
            err.message,
            "Closing socket"
          );
          this.$root.websocket.close();
        };
      } else {
        console.log("WebSocket NOT supported by your Browser!");
      }
    },
  },
};
</script>