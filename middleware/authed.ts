import cookie from "cookie";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const nuxtApp = useNuxtApp();
  const store = useUserStore(nuxtApp.$pinia);

  if (process.server) {
    const event = nuxtApp.ssrContext?.event

    const cookieHeader = event?.node.req.headers["cookie"] || "";
    const cookies = cookie.parse(cookieHeader);

    console.log(cookies["token"])

    if(!cookies["token"]) return '/login';

    var user = event?.context.user
    await store.set(user)
    //console.log('server =>',store.user)
  };

  if (process.client) {
    if ( !useCookie('token').value ) return '/login';
    //console.log('client =>', store.user)
    if(store.user.loggedIn == false) { await store.get(); }
  }

  if ( !store.user ) return '/login';
});