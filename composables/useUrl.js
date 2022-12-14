export const useUrl = () => {
  let host = ''
  if(process.server) {
    host = nuxtApp.ssrContext.req.headers.host
  } else {
    host = window.location.host
  }
  return host;
}

export const useUrlSafe = (url) => {
  try { 
    return Boolean(new URL(urlString)); 
  }
  catch(e){ 
    return false; 
  }
}