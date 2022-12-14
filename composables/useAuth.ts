export const useUserData = async () => {
  if(useCookie('token').value == null) return { user: null };
  try {
    return await $fetch('/api/user')
  } catch (error) {
    return { user: null }
  }
}