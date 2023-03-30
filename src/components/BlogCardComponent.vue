<template>
  <div class="col-10 card p-2 m-2 elevation-5">
    <div class="row p-0 m-0">
      <div class="col-8 m-0">
        <div class="row">
          <div class="col-2">
            <router-link v-if="route.name == 'Home'" :to="{ name: 'Profile', params: { id: blog.creatorId } }">
              <img :src="blog.creator.picture" :alt="blog.creator.name" class="img-fluid"
                :title="`Go to ${blog.creator.name}'s Profile Page'`">
            </router-link>
          </div>
          <div class="col-5">
            <h4 class="p-0">{{ blog.creator.name }}</h4>
          </div>
        </div>
        <h5 class="row">{{ blog.title }}</h5>
        <div class="row body">{{ blog.body }}.</div>
        <!-- NOTE Magical DATE (not fate...) code here! Don't do in model, only in index, thanks Bryan -->
        <div class="row">{{ new Date(blog.createdAt).toLocaleDateString(`en-US`) }}</div>
      </div>
      <div class="col-4 p-0">
        <img :src="blog.imgUrl" alt="" class="img-fluid elevation-3 rounded">
      </div>
    </div>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Blog } from "../models/Blog.js";
import { useRoute } from "vue-router";

export default {
  props: { blog: { type: Blog, required: true } },

  setup() {
    const route = useRoute()
    return {
      route,
    }
  }
};
</script>


<style lang="scss" scoped>
.body {
  text-overflow: ellipsis;
  height: 21vh;
  white-space: normal;
  overflow: hidden;
}
</style>