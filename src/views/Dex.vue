<template>
<div>
  <p v-if="user">Welcome, {{user.name}}</p>
  <TeamBuilder v-if="user"/>
  <PokeList/>
</div>
</template>

<script>
import TeamBuilder from '@/components/TeamBuilder.vue'
import PokeList from '@/components/PokeList.vue'

export default {
  name: "dex",
  components: {
    TeamBuilder,
    PokeList,
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
}
</script>
