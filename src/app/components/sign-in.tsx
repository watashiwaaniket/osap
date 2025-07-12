import { signIn } from "next-auth/react"
 
export function SignIn() {
  return (
    <form
      action={async (formData) => {
        "use server"
        //@ts-ignore
        await signIn("resend", formData)
      }}
    >
      <input type="text" name="email" placeholder="Email" />
      <button type="submit">Signin with Resend</button>
    </form>
  )
}