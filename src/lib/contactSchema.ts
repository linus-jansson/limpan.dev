import zod from "zod";

export const contactSchema = zod.object({
    name: zod.string().max(64).optional(),
    email: zod.string().email().max(128).optional(),
    subject: zod.string().max(256).optional(),
    message: zod.string().max(4096),
    token: zod.string(),
    color: zod.string(),
});