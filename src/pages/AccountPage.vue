<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
    <button @click="toggleForm" class="btn btn-secondary">EDIT</button>
  </div>

  <div v-if="editMode" class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-8">
        <form @submit.prevent="editAccount()">
          <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input v-model="editable.name" type="text" required class="form-control" id="name">
          </div>
          <div class="mb-3">
            <label for="picture" class="form-label">Picture</label>
            <input v-model="editable.picture" type="text" required class="form-control" id="picture">
          </div>
          <div class="mb-3">
            <label for="bio" class="form-label">Bio</label>
            <textarea v-model="editable.bio" required class="form-control" id="bio" rows="3"></textarea>
          </div>
          <button class="btn btn-success mb-1" type="submit">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, watchEffect } from 'vue'
import { AppState } from '../AppState'
import { accountService } from "../services/AccountService.js"

export default {
  setup() {
    const editable = ref({})
    const editMode = ref(false)
    watchEffect(() => {
      if (AppState.account.id) {
        editable.value = { ...AppState.account }
      }
    })

    return {
      editable,
      editMode,
      account: computed(() => AppState.account),

      toggleForm() {
        editMode.value = true
      },

      async editAccount() {
        try {
          await accountService.editAccount(editable.value)
          editable.value = {}
        } catch (error) {
          logger.error(error)
          Pop.error(error.message)
        }
      }
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
