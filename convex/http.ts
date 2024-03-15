import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";
//import type { WebhookEvent } from "@clerk/backend";
import { WebhookEvent } from '@clerk/nextjs/server'
import { Webhook } from "svix";

const ensureEnvironmentVariable = (name: string) => {
    const value = process.env[name];
    if (value === undefined) {
        throw new Error(`missing environment variable ${name}`);
    }
    return value;
}

const webhookSecret = ensureEnvironmentVariable("CLERK_WEBHOOK_SECRET");

const validateRequest = async (
    req: Request
): Promise<WebhookEvent | undefined> => {
    const payloadString = await req.text();

    const svixHeaders = {
        "svix-id": req.headers.get("svix-id")!,
        "svix-timestamp": req.headers.get("svix-timestamp")!,
        "svix-signature": req.headers.get("svix-signature")!,
    };
    const wh = new Webhook(webhookSecret);
    let evt: Event | null = null;
    try {
        evt = wh.verify(payloadString, svixHeaders) as Event;
    } catch (_) {
        console.log("error verifying");
        return;
    }

    return evt as unknown as WebhookEvent;
}

const handleClerkWebhook = httpAction(async (ctx, request) => {
    const event = await validateRequest(request);
    if (!event) {
        return new Response("Error occured", {
            status: 400,
        });
    }
    switch (event.type) {
        case "user.created": {
            await ctx.runMutation(internal.users.createUser, {
                userId: event.data.id,
                email: event.data.email_addresses[0]?.email_address
            });
            break;
        }
        default: {
            console.log("ignored Clerk webhook event", event.type);
        }
    }
    return new Response(null, {
        status: 200,
    });
});

const http = httpRouter();
http.route({
    path: "/clerk-users-webhook",
    method: "POST",
    handler: handleClerkWebhook,
});





export default http;