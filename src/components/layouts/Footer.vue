<template>
  <div>
    <v-footer dark class="grey--text pt-5">
      <v-row no-gutters>
        <v-col cols="12" align="center" justify="center" class="ma-auto">
          <v-btn
            v-for="link in links"
            :key="link.caption"
            color="white"
            text
            class="my-2"
            :to="link.to"
            >{{ link.caption }}</v-btn
          >
        </v-col>

        <v-col cols="12">&nbsp;</v-col>

        <v-col
          cols="6"
          align="end"
          justify="end"
          class="ma-auto text--grey caption"
        >
          
          
        </v-col>
      </v-row>
    </v-footer>
  </div>
</template>

<script>
export default {
  components: {
   
  },

  data() {
    return {
     
      links: [
        { caption: "Home", to: "/" },
        { caption: "Contact Us", to: "/contact-us" },
      ]
    };
  }
};
</script>
