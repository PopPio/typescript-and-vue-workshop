<script setup lang="ts">
import {onMounted, ref} from 'vue'
import { v4 as uuidv4 } from 'uuid'
import type {Dish} from "@/types";

type PropTypes = {
  dish: Dish
}
const props = defineProps<PropTypes>()
defineEmits<{
  (e: 'edit-dish', dish: Dish): void,
  (e: 'cancel-edit-dish'): void,
}>()
const editDish = ref<Dish>( {
  id: props.dish.id,
  name: props.dish.name,
  status: props.dish.status,
  diet: props.dish.diet,
})

const elNameInput = ref<HTMLInputElement | null>(null)

onMounted(() => {
  elNameInput.value?.focus()
})
</script>

<template>
  <form @submit.prevent>
    <div class="field">
      <div class="field">
        <label for="name" class="label">Edit Name</label>
        <div class="control">
          <input
            v-model="editDish.name"
            type="text"
            class="input is-large"
            placeholder="Mystery Flavored Shrimp"
            required
            ref="elNameInput"
          />
        </div>
      </div>
      <div class="field">
        <div class="buttons">
          <button @click="$emit('edit-dish', editDish)" class="button is-success">Edit</button>
          <button @click="$emit('cancel-edit-dish')" class="button is-light">Cancel</button>
        </div>
      </div>
    </div>
  </form>
</template>

<style></style>
