<template>
  <div>
      	 <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="200"
      offset-x
    >
      <template v-slot:activator="{ on, attrs }">

         <v-btn style="position: relative;
    top: 80px;"
              color="success"
              fab
                v-bind="attrs"
          v-on="on"
              x-small
            >
              <v-icon>mdi-filter-variant</v-icon>
            </v-btn>
      </template>

      <v-card>
       

       

       
        <v-card-actions>
        
 <v-switch
      v-model="adult"
      label="`Child`"
    ></v-switch>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
export default {
data(){
    return{
        	 fav: true,
      menu: false,
      message: false,
      hints: true,
      adult:"false"
    }
}
}
</script>

<style>

</style>