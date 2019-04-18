<template>
  <div id="app">
     <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">Pokedex</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
                
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
           <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                 <router-link class="nav-link" to="/">Home <span class="sr-only">(current)</span></router-link>
              </li>
              <li class="nav-item">
                 <router-link class="nav-link" :to="{ name: 'dex', params: { gen: 1 }}">FRLG</router-link>
              </li>
              <li class="nav-item">
                 <router-link class="nav-link" :to="{ name: 'dex', params: { gen: 2 }}">GHSS</router-link>
              </li>
              <li class="nav-item">
                 <router-link class="nav-link" :to="{ name: 'dex', params: { gen: 3 }}">RSE</router-link>
              </li>
              <li class="nav-item">
                 <router-link class="nav-link" :to="{ name: 'dex', params: { gen: 4 }}">DPP</router-link>
              </li>
              <li class="nav-item">
                 <router-link class="nav-link" :to="{ name: 'dex', params: { gen: 5 }}">BW</router-link>
              </li>
              <li class="nav-item">
                 <router-link class="nav-link" :to="{ name: 'dex', params: { gen: 6 }}">XY</router-link>
              </li>
	      <li class="nav-item">
		 <router-link class="nav-link" to="/team">Team</router-link>
	      </li>
           </ul>
         
           <form @submit.prevent="search" class="form-inline my-2 my-lg-0">
           <input class="form-control mr-sm-2" type="search" v-model="key" placeholder="Pokemon" aria-label="Search">
           <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
           </form>
	   <button v-if="user" class="btn btn-outline-success my-2 my-sm-0 ml-2" @click="logout">Logout</button>
           <button v-else class="btn btn-outline-success my-2 my-sm-0 ml-2" @click="toggleDialog">Register / Login</button>
        </div>
    </nav>
    <router-view />
    <Dialog :show="show" @escape="escape"/>
  </div>
</template>

<script>
import Dialog from '@/components/Dialog.vue';

export default {
  name: "App",
  data() {
    return {
      show: false,
      key: null,
    }
  },
  components: {
    Dialog,
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    toggleDialog() {
      this.show = true;
    },
    escape() {
      this.show = false;
    },
    async logout() {
      try {
	this.error = await this.$store.dispatch("logout");
      } catch (error) {
	console.log(error);
      }
    },
    async search() {
      await this.$store.dispatch("search", this.key);
    }
  }
}
</script>


<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.navbar {
    margin-bottom: 10px;
    background-color: aliceblue!important;
}

.nav-item {
    margin-right: 5px;
    margin-left: 5px;
}

</style>
