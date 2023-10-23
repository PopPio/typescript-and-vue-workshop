import { defineStore} from 'pinia'
import type {Dish} from "@/types";

type StateShape = {
    list: Dish[]
}

export const useDishStore = defineStore('DishStore', {
    // Data
    state: (): StateShape => ({
        list: [
            {
                id: '7d9f3f17-964a-4e82-98e5-ecbba4d709a1',
                name: 'Ghost Pepper Poppers',
                status: 'Want to Try',
            },
            {
                id: '5c986b74-fa02-4a22-98f2-b1ff3559e85e',
                name: 'A Little More Chowder Now',
                status: 'Recommended',
            },
            {
                id: 'c113411d-1589-414f-a283-daf7eedb631e',
                name: 'Full Laptop Battery',
                status: 'Do Not Recommend',
            },
        ]
    }),
    // Computed
    getters: {
        // getDishById: (state) => (id: string): Dish | undefined => {
        //     return state.list.find((dish: Dish) => {
        //         return dish.id === id
        //     })
        // },
        getDishById: (state) => {
          return (dishId: string) => {
              return state.list.find((dish: Dish) => dish.id === dishId)
          }
        },
        numberOfDishes: (state): number => {
            return state.list.length
        }
    },
    // Methods
    actions: {
        addDish(payload: Dish) {
            this.list.push(payload)
        },
        updateDish(payload: Dish) {
            console.log('yo yo')
            const index = this.list.findIndex((dish: Dish) => {
                return dish.id === payload.id
            })
            this.list.splice(index, 1, payload)
        },
        deleteDish(payload: Dish) {
            this.list = this.list.filter((dish: Dish) => {
                return dish.id !== payload.id
            })
        }
    }
})