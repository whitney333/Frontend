import axios from "@/axios"
import { getAuth } from "firebase/auth"
import { useRouter } from "vue-router"

export const currentProfile = async () => {
  const router = useRouter()
  const { currentUser } = getAuth()  

  if (!currentUser) {
    return null
  }

  try{
    // const res = await axios.get(`/v1/user/${currentUser.uid}`)
    // const profile = res.data


    // Uncomment after implement user api
    // if (!profile) {
    //   await router.push('/auth/register/details')
    //   return null
    // }

    // return profile



    return { temp: "temp"}
  } catch(error) {
    console.error("Error fetching profile:", error)
    // If there's an error, redirect to login
    await router.push('/auth/login')
    return null
  }
}