<template>
  <div style="top: 30px;
    position: relative;
    justify-content: center;
    display: flex;
">
     <v-list>
      <v-list-item v-for="(item, i) in anonItems" :key="i" :to="item.to">
       
        <v-list-item-content>
         
            <div class="divstyle">
               <v-list-item-avatar>
          <v-icon color="item.iconColor">{{ item.icon }}</v-icon>
        </v-list-item-avatar>
             <v-list-item-title style="position: relative;
    text-align: center;
    top: 5px;"
            v-html="item.title"
            class="body-2"
          ></v-list-item-title>
          </div>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  

  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  computed: {
    ...mapGetters("authentication", ["isLoggedIn", "isOrgAdmin"]),
    ...mapState("authentication", ["user"]),
    ...mapState(["loading"]),
    formattedUserId() {
      let userId = this.user && this.user.userid;
      if (userId && userId.length > 12)
        userId = `${this.user.userid.substr(0, 10)}..`;

      return userId;
    }
  },
  props: {
    anonItems: Array,
  },
  methods: {
    goGo(to) {
      this.$router.go(to);
    }
  }
};
</script>
<style >
.divstyle {
  border: 20px solid #6ec8b2;
    /* background: #ffffff; */
    width: 150px;
    height: 150px;
    border-radius: 10px;
}

</style>