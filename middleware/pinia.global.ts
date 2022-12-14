import cookie from "cookie";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const nuxtApp = useNuxtApp();
  const store = useUserStore(nuxtApp.$pinia);

  if (process.server) {
    const event = nuxtApp.ssrContext?.event
    var user = event?.context.user
    await store.set(user)
  };
  if (process.client) {
    if(store.user.loggedIn == false) { await store.get(); }
  }
});