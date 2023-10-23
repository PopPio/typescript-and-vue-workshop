import type {dietList, restaurantStatusList} from "@/constants"

export type Dish = {
    readonly id: string
    name: string
    status: Status
    diet?: Diet
}

export type Restaurant = {
    readonly id: string
    name: string
    address: string
    website: string
    status: Status
    diet?: Diet
}

type Status = typeof restaurantStatusList[number]

// type Diet = 'Vegetarian' | 'Pescetarian' | 'Keto' | ''
type Diet = typeof dietList[number]
