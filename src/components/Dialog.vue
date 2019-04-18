<template>
<transition v-if="show" name="modal">
   <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">

            <div class="modal-header">
              <h1 class="modal-title">Register or Login</h1>
            </div>
            <div class="modal-body">
              <p v-if="error" class="error">{{error}}</p>
              <label>Username</label>
              <br>
              <input v-model="username">
              <br>
              <label>Password</label>
              <br>
              <input type="password" v-model="password">
	      <br>
	      <label>Name (Not required for Login)</label>
	      <br>
              <input v-model="name">
            </div>
            <div class="modal-footer">
              <button @click="register" type="button">Register</button>
              <button @click="login" type="button">Login</button>
              <button @click="close" type="button">Close</button>
            </div>
          </div>
        </div>
      </div>
</transition>
</template>

<script>
export default {
  name: "Dialog",
  props: {
    show: Boolean,
  },
  data() {
    return {
      user: null,
      username: "",
      password: "",
      name: "",
      error: "",
    }
  },
  methods: {
    async register() {
      try {
	this.error = await this.$store.dispatch("register", {
	  name: this.name,
	  username: this.username,
	  password: this.password,
	});
	if (this.error === "") {
	   this.$emit('escape');
           this.$router.push("/");
	}
      } catch (error) {
	console.log(error);
      }
    },
    async login() {
      try {
	this.error = await this.$store.dispatch("login", {
	  username: this.username,
	  password: this.password,
	});
	if (this.error === "") {
	   this.$emit('escape');
	   this.$router.push("/");
	}
      } catch (error) {
	console.log(error);
      }
    },
    close() {
      this.$emit('escape');
    },
  }
}
</script>

<style scoped>
.error {
  color: #B2261C;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 500px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h1 {
  margin-bottom: 30px;
  font-size: 1.5em;
}

.modal-body {
  margin: 0;
}

.modal-body input {
  margin-bottom: 20px;
  height: 30px;
}

.modal-footer {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}

.modal-default-button {
  float: right;
}

/*
  * The following styles are auto-applied to elements with
  * transition="modal" when their visibility is toggled
  * by Vue.js.
  *
  * You can easily play with the modal transition by editing
  * these styles.
  */
.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
} 
</style>
