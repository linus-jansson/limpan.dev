
"use client";

import { sendMessage } from "../api";
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

export function ContactForm({cookiesAccepted}: {cookiesAccepted: boolean}) {
    const turnstileRef = useRef()
    const [showSubmit, setShowSubmit] = useState(false)
    const [formMessage, setFormMessage] = useState<null | string>(null)
    const form = useForm<z.infer<typeof contactSchema>>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            color: "1"
        },
    })

    function onSubmit(values: z.infer<typeof contactSchema>) {
        sendMessage(values)
            .then((res) => {
                console.log(res)
                setFormMessage("Message sent!")
            })
            .catch(() => {
                setFormMessage("Failed to send message")
            })
    }

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
                                        <Input placeholder="Limpan" {...field} />
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
                                        <Input placeholder="Email address" type="email" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Your preferred email address
                                    </FormDescription>
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
                                    <Input placeholder="Whats on your mind?" {...field} />
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
                                <Textarea placeholder="Hello!" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is the message you want to send.
                            </FormDescription>
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
                                    siteKey='0x4AAAAAAAbHUo0eEimYDKYL'
                                    onSuccess={(token) => {
                                        field.onChange(token);
                                        setShowSubmit(true);
                                    }} 
                                />
                            )}
                        />
                    }

                    {formMessage && <FormMessage className="text-primary">{formMessage}</FormMessage>}
                    {showSubmit && <Button 
                        type="submit"
                        className="text-primary-content"
                        disabled={form.formState.isSubmitting || form.formState.isSubmitSuccessful}
                    >Submit</Button>}
                </form>
            </Form>
        </>
    )
}