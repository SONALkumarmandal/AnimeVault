const {zod, z} = require("zod")

const loginSchema = z.object({
    email:z
    .string({required_error:"Email is required"})
    .trim()
    .email({message:"Invalid email address"})
    .min(3,{message:"email must be at least of 3 chars"})
    .max(255,{message:"email must not be more than 255 chars"}),

    password:z
    .string({required_error:"Password is required"})
    .min(6,{message:"Password should be more than 5 letters is required"})
    .max(1024,"Password can't be greater than 1024 chars")
});

const signupSchema = loginSchema.extend({
  name: z
    .string({ required_error: "name is required" })
    .min(2, { message: "name must be at least of 2 characters" })
    .max(255, { message: "name must not be more than 255 characters" }),

    email: z
      .string({ required_error: "email is required" }).email(),
  
    password: z
      .string({ required_error: "password is required" })
      .trim()
      .min(5, { message: "password must be at least of 5 characters" })
      .max(20, { message: "password must not be more than 20 characters" }),

      userId: z
      .string({ required_error: "userId is required" })
      .trim()
      .min(3, { message: "userId must be at lest of 3 chars. " })
      .max(255, { message: "userId must not be more than 255 characters" }),
  
  });

  module.exports={signupSchema,loginSchema};