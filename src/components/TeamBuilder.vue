<template>
<div>
  <div v-if="expand">
     <aside class="aside">
        <h5 class="aside-title">Build Your Team</h5>
        <p class="aside-title">select and drag the pokemon into the boxes below</p>
        <div class="add-boxes-grid">
           <div class="add-box" v-for="box in boxes" v-bind:key="box.num" v-on:drop="dropPokemon(box.num)" v-on:dragover.prevent>
              <img class="add-box-sprite" v-bind:src="getSprite(box.entry_number)"/>
           </div>
        </div>
        <p></p>
        <input v-model="title" placeholder="Team Name"></input>
	<p></p>
        <button @click="save">Save</button>
        <button @click="reset">Reset</button>
     </aside>
  </div>
</div>
</template>

<script>
export default {
  name: 'TeamBuilder',
  data() {
    return {
      expand: true,
      title: null,
      boxes: [{
                num: 0,
                entry_number: 0,
            },{
                num: 1,
                entry_number: 0,
            },{
                num: 2,
                entry_number: 0,
            },{
                num: 3,
                entry_number: 0,
            },{
                num: 4,
                entry_number: 0,
            },{
                num: 5,
                entry_number: 0,
        }],
    }
  },
  methods: {
    dropPokemon(num) {
      this.boxes[num].entry_number = this.$store.state.drag;
    },
    getSprite(pokemon) {
      let url = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
      return url + pokemon + ".png"; 
    },
    save() {
      try {
        let user = this.$store.state.user;
        this.$store.dispatch("saveTeam", {
	   boxes: this.boxes,
           owner: user.name,
	   title: this.title,
        });
        alert("Team was saved successfully");
      } 
      catch (error) {
        console.log(error);
        alert("Failed to save team");
      }
    },
    reset() {
      this.boxes = [{
                num: 0,
                entry_number: 0,
            },{
                num: 1,
                entry_number: 0,
            },{
                num: 2,
                entry_number: 0,
            },{
                num: 3,
                entry_number: 0,
            },{
                num: 4,
                entry_number: 0,
            },{
                num: 5,
                entry_number: 0,
        }]; 
    }
  },
}
</script>

<style scoped>
.add-box {
    display: block;
    width: 70px;
    height: 70px;
    text-align: center;
    border: #111111;
    border-style: dashed;
    border-width: 1.5px;
    margin: auto;
    size: 14px;
}

.add-box-display {
    padding: 20px;
}

.add-box-sprite {
    width: 70px;
    height: 70px;
}

.add-boxes-grid {
    display: grid;
    grid-template: 70px / auto auto;
    grid-row-gap: 22px;
}

.aside {
    display: block;
    width: 200px;
    height: 100%;
    padding: 10px;
    top: 10px;
    margin-bottom: 10px;
    border-radius: 8px;
    position: sticky;
    float: left;
    margin-left: 10px;
    background-color: #DDDDDD;
}

@media only screen and (max-width: 600px) {
    .aside {
        width: 20vw;
    }
}

.aside-title {
    text-align: center;
}
</style>

