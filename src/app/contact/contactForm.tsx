
"use client";

import { submitContactForm } from "../server-actions";
import { useRef, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { contactSchema } from "@/lib/contactSchema";

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea";

import { Turnstile } from '@marsidev/react-turnstile'
import { z } from "zod";
import { cn } from "@/lib/utils";
import { CF_SITE_KEY } from "@/lib/constants";

export function ContactForm({ cookiesAccepted }: { cookiesAccepted: boolean }) {
    const turnstileRef = useRef()
    const [isSending, setIsSending] = useState(false)
    const [formMessage, setFormMessage] = useState<null | string>(null)
    const [postError, setPostError] = useState<boolean>(false)
    const form = useForm<z.infer<typeof contactSchema>>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            color: "1"
        },
    })

    function onSubmit(values: z.infer<typeof contactSchema>) {
        setIsSending(true);
        setFormMessage("");
        setPostError(false);

        submitContactForm(values)
            .then((res) => {
                if (!res.ok) {
                    setPostError(true);
                    setFormMessage(res.message);
                    return;
                }

                setFormMessage("Message sent!")
            })
            .catch((err) => {
                setPostError(true);
                setFormMessage("Error sending message, try again later");
            })
            .finally(() => setIsSending(false));
    }
    // Disable submit button if form is submitting, submit is successful, or there is an not an error, or cookies not accepted
    const shouldDisableForm = form.formState.isSubmitting ||
        (form.formState.isSubmitSuccessful && !postError) ||
        !cookiesAccepted;

    const captchaAccepted = form.watch('token')?.length > 0;

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" >
                    <div className="flex gap-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Limpan" disabled={shouldDisableForm} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* email */}
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Email address" type="email" disabled={shouldDisableForm} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    {/* subject */}
                    <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Subject</FormLabel>
                                <FormControl>
                                    <Input placeholder="Whats on your mind?" disabled={shouldDisableForm} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* message */}
                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Message (required)</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Hello!" disabled={shouldDisableForm} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {cookiesAccepted &&
                        <FormField
                            control={form.control}
                            name="token"
                            render={({ field }) => (
                                <Turnstile
                                    {...field}
                                    ref={turnstileRef}
                                    siteKey={CF_SITE_KEY}
                                    onSuccess={(token) => {
                                        field.onChange(token);
                                    }}
                                />
                            )}
                        />
                    }

                    {formMessage &&
                        <FormMessage
                            className={cn((!postError) ? 'text-primary' : 'text-error')}
                        >{formMessage}
                        </FormMessage>
                    }

                    <Button
                        type="submit"
                        className="text-primary-content max-w-base"
                        disabled={shouldDisableForm || !captchaAccepted}
                    >Submit</Button>

                    <div>
                        {isSending && <span className="loading loading-dots loading-lg text-primary"></span>}
                    </div>
                </form>
            </Form>
        </>
    )
}