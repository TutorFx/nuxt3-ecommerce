import {useUserStore} from "~/composables/useUserStore"
import jwt_decode from "jwt-decode";

interface User {
  name?: string;
  email?: string;
  password?: string;
  active?: boolean;
  scope?: string[];
  passwordResetToken?:string;
  passwordResetExpires?: string;
  createdAt?: string;
  _id?: string;
}

export default defineNuxtPlugin(async nuxtApp => {
  const store = useUserStore(nuxtApp.$pinia);

  addRouteMiddleware('user', async () => {

  });
})