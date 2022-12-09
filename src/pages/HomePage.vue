<template>
  <div class="container-fluid">
    <div v-for="b in blogs" class="row justify-content-center">
      <BlogCardComponent :blog="b" />

    </div>
  </div>
</template>

<script>
import BlogCardComponent from "../components/BlogCardComponent.vue";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { blogsService } from "../services/BlogsService.js"
import { onMounted, computed, reactive, ref } from "vue";
import { AppState } from "../AppState.js";

export default {
  setup() {
    async function getBlogs() {
      try {
        await blogsService.getBlogs();
      } catch (error) {
        logger.log(error)
        Pop.error(error)
      }
    }

    onMounted(() => {
      getBlogs();
    })
    return {
      blogs: computed(() => AppState.blogs)
    };
  },
  components: { BlogCardComponent }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
