<template>
<div>
     <p v-if="requesting">Loading</p>
     <div v-else class="pokedex-flex-container">
        <div class="pokedex-flex-element" v-for="pokemon in getPokemonList()" draggable="true" v-on:dragstart="dragPokemon(pokemon.entry_number)">
           <img v-bind:src="getSprite(pokemon.entry_number)"/>
           <p>{{ pokemon.entry_number }}  {{ pokemon.pokemon_species.name }}</p>
        </div>
     </div>
</div>
</template>

<script>
import axios from "axios";

export default {
  name: "PokeList",
  data() {
    return {
      numPokemonGen1: 151,
      numPokemonGen2: 100,
      numPokemonGen3: 135,
      numPokemonGen4: 107,
      numPokemonGen5: 156,
      numPokemonGen6: 72,
      numPokemonGen7: 88,
    }
  },
  created() {
    this.requestPokedex();
  },
  computed: {
    requesting() {
      return this.$store.state.requesting;
    },
  },
  methods: {
    requestPokedex() {
      this.$store.dispatch("requestPokedex");     
    },
    getSprite(pokemon_entry_number) {
      const url = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
      return url + pokemon_entry_number + ".png";
    },
    getPokemonList() {
      let gen = this.$route.params.gen;
      let pokedex = this.$store.state.pokedex;
      let startIndex;
      
      if (gen === 1 || gen === undefined) {
         return pokedex.pokemon_entries.slice(0, this.numPokemonGen1);    
      }
      else if (gen === 2) {
         return pokedex.pokemon_entries.slice(this.numPokemonGen1, this.numPokemonGen1 + this.numPokemonGen2);
      }
      else if (gen === 3) {
         startIndex = this.numPokemonGen1 + this.numPokemonGen2;
         return pokedex.pokemon_entries.slice(startIndex, startIndex + this.numPokemonGen3);
      }
      else if (gen === 4) {
         startIndex = this.numPokemonGen1 + this.numPokemonGen2 + 
                      this.numPokemonGen3;
         return pokedex.pokemon_entries.slice(startIndex, startIndex + this.numPokemonGen4);
      }
      else if (gen === 5) {
         startIndex = this.numPokemonGen1 + this.numPokemonGen2 + 
                      this.numPokemonGen3 + this.numPokemonGen4;
         return pokedex.pokemon_entries.slice(startIndex, startIndex + this.numPokemonGen5);
      }
      else if (gen === 6) {
         startIndex = this.numPokemonGen1 + this.numPokemonGen2 + 
                      this.numPokemonGen3 + this.numPokemonGen4 +
                      this.numPokemonGen5;
         return pokedex.pokemon_entries.slice(startIndex, startIndex + this.numPokemonGen6);
      }      
    },
    dragPokemon(pokemon) {
      this.$store.dispatch("onDragPokemon", pokemon);
    } 
  },
}
</script>

<style scoped>
.pokedex-flex-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
}

.pokedex-flex-element {
    display: block;
    margin: 3px;
    border-radius: 5px;
    text-align: center;
    transition: box-shadow .3s;
    transition: transform .3s;
    height: 130px;
    width: 120px;
    -webkit-filter: grayscale(75%); /* Safari 6.0 - 9.0 */
    filter: grayscale(60%);
}

.pokedex-flex-element:hover {
    transform: scale(1.08);
    box-shadow: 0px 0px 8px #111111;
    -webkit-filter: none;
    filter: none;
}
</style>
