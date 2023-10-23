<script setup lang="ts">
import NewDishForm from '../components/NewDishForm.vue'
import DishCard from '../components/DishCard.vue'
import SideMenu from '../components/SideMenu.vue'
import {computed, onMounted, ref} from 'vue'
import type { Dish } from '@/types'
import {useRoute} from 'vue-router'
import {useDishStore} from '@/stores/DishStore'
import EditDishForm from "@/components/EditDishForm.vue";

const dishStore = useDishStore()
const filterText = ref<string>('')
// const dishList = ref<Dish[]>([
//   {
//     id: '7d9f3f17-964a-4e82-98e5-ecbba4d709a1',
//     name: 'Ghost Pepper Poppers',
//     status: 'Want to Try',
//   },
//   {
//     id: '5c986b74-fa02-4a22-98f2-b1ff3559e85e',
//     name: 'A Little More Chowder Now',
//     status: 'Recommended',
//   },
//   {
//     id: 'c113411d-1589-414f-a283-daf7eedb631e',
//     name: 'Full Laptop Battery',
//     status: 'Do Not Recommend',
//   },
// ])
const dishList = dishStore.list

type ShowFormState = '' | 'new' | 'edit'

const showForm = ref<ShowFormState>('')


const filteredDishList = computed((): Dish[] => {
  return dishList.filter((dish: Dish) => {
    if (dish.name) {
      return dish.name.toLowerCase().includes(filterText.value.toLowerCase())
    } else {
      return dishList
    }
  })
})
const numberOfDishes = computed((): number => {
  return filteredDishList.value.length
})

const addDish = (payload: Dish) => {
  dishStore.addDish(payload)
  hideForm()
}
const hideForm = () => {
  showForm.value = ''
}
const dishToEdit = ref<Dish | null>(null)
const editDish = (payload: Dish) => {
  dishToEdit.value = payload
  showForm.value = 'edit'
}
const updateDish = (payload: Dish) => {
  // console.log(payload.name)
  dishStore.updateDish(payload)
  hideForm()
}



const updateFilterText = (event: KeyboardEvent) => {
  // console.log(event.target as HTMLInputElement)
  console.log(event.code)
  // if (event.code === 'Enter') {
  filterText.value = (event.target as HTMLInputElement).value
  // }
}

onMounted(() => {
  const route = useRoute()
  if (route.query.new) {
    showForm.value = 'new'
  } else if (route.query.edit) {
    showForm.value = 'edit'
  }
})
</script>

<template>
  <main class="section">
    <div class="columns">
      <!-- Side Menu -->
      <SideMenu />

      <!-- Main Content -->
      <div class="column">
        <h1 class="title">Dishes</h1>

        <!-- CTA Bar -->
        <nav v-if="showForm === ''" class="level">
          <div class="level-left">
            <div class="level-item">
              <p class="subtitle is-5">
                <strong>{{ numberOfDishes }}</strong> dishes
              </p>
            </div>

            <p class="level-item">
              <button @click="showForm = 'new'" class="button is-success">New</button>
            </p>

            <div class="level-item is-hidden-tablet-only">
              <div class="field has-addons">
                <p class="control">
                  <input class="input" type="text" placeholder="Dish name"
                         :value="filterText"
                         @keyup.enter="updateFilterText" />
                </p>
                <p class="control">
                  <button class="button">Search</button>
                </p>
              </div>
            </div>
          </div>
        </nav>

        <!-- New Dish Form -->
        <NewDishForm v-if="showForm === 'new'" @add-new-dish="addDish" @cancel-new-dish="hideForm" />

        <!-- New Dish Form -->
        <EditDishForm v-else-if="showForm === 'edit' && dishToEdit" @edit-dish="updateDish" @cancel-edit-dish="hideForm" :dish="dishToEdit" />

        <!-- Display Results -->
        <div v-else class="columns is-multiline">
          <div v-for="item in filteredDishList" class="column is-full" :key="`item-${item}`">
            <DishCard :dish="item" @edit-dish="editDish" @delete-dish="dishStore.deleteDish" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style></style>
