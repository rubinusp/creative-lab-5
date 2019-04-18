<template>
<div>
   <p>Teams</p>
   <div v-for="team in teams">
     <p>{{team.title}}</p>
     <p>{{team.pokemons}}</p>
   </div>
</div>
</template>

<script>
export default {
  name: "team",
  created() {
    getTeams();
  },
  computed: {
    teams() {
      return this.$store.state.teams;
    }
  },    
  methods: {
    getTeams() {
      this.$store.dispatch("getTeams");
    },
  },
}
</script>
