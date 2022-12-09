<template>
  <div class="container-fluid">
    <!-- NOTE put v-if outside of all you want shown for v-if -->
    <div v-if="author" class="row p-2 text-center">
      <div class="col-3">
        <img :src="author.picture" alt="" class="img-fluid rounded-circle elevation-5">
        <div class="row justify-content-center">
          <button v-if="(author.id == account.id)"
            class="col-2 btn btn-success p-1 m-2 elevation-5 mdi mdi-plus"></button>
          <button v-if="(author.id == account.id)"
            class="col-2 btn btn-primary p-1 m-2 elevation-5 mdi mdi-pen"></button>
        </div>
      </div>
      <div class="col-9">
        <h3>{{ author.name }}</h3>
        <p>{{ author.bio }}</p>
      </div>
    </div>

    <div v-for="b in blogs" class="row">
      <BlogCardComponent :blog="b" />
    </div>

  </div>
</template>


<script>
import { AppState } from '../AppState.js';
import { computed, reactive, onMounted } from 'vue';
import { useRoute } from "vue-router";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { profileService } from "../services/ProfileService.js"
import { blogsService } from "../services/BlogsService.js";
import BlogCardComponent from "../components/BlogCardComponent.vue";

export default {
  setup() {
    const route = useRoute();
    async function getProfileById() {
      try {
        await profileService.getProfileById(route.params.id);
      }
      catch (error) {
        logger.log(error);
        Pop.error(error);
      }
    }
    async function getBlogsByProfileId() {
      try {
        await blogsService.getBlogsByProfileId(route.params.id);
      }
      catch (error) {
        console.error(error);
        Pop.error(error.message);
      }
    }
    onMounted(() => {
      getProfileById();
      getBlogsByProfileId();
    });
    return {
      author: computed(() => AppState.activeProfile),
      blogs: computed(() => AppState.blogs),
      account: computed(() => AppState.account)
    };
  },
  components: { BlogCardComponent }
};
</script>


<style lang="scss" scoped>

</style>