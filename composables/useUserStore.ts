import { acceptHMRUpdate, defineStore } from 'pinia'
import {useUserData} from "~/composables/useAuth"
import { typedUser } from "~/types/common/user"
export const useUserStore = defineStore('user', {
  state: () => {
    return {
      user: {
        loggedIn: false
      }
    }
  },
  actions: {
    async get() {
      const userData = await useUserData();
      const user: typedUser | any = userData.user
      this.user = {loggedIn: true, ...user}
    },
    async set(data: object) {
      try{
        this.user = {loggedIn: true, ...data._doc}
      } catch(err){
        this.user = {
          loggedIn: false
        }
      }
    },
    async login(data: object) {
      try{
        this.user = {loggedIn: true, ...data}
      } catch(err){
        this.user = {
          loggedIn: false
        }
      }
    }
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));