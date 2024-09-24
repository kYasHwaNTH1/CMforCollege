const {z}=require('zod')

const validschema=z.object({
    email:z.string().email().min(10).max(30),
    password:z.string().min(5).max(32)
    .refine((password)=> /[A-Z]/.test(password),{
        message:"Password should contain at least one uppercase letter"
    })
    .refine((password) => /[a-z]/.test(password), {
        message: "Password must include at least one lowercase letter",
      })
      .refine((password) => /\d/.test(password), {
        message: "Password must include at least one number",
      })
      .refine((password) => /[!@#$%^&*(),.?":{}|<>]/.test(password), {
        message: "Password must include at least one special character",
      }),
      firstname:z.string().min(2).max(30),
      lastname:z.string().min(2).max(30)
})
module.exports= validschema