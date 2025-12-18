import Appointment from "../models/appointmentModel.js"
import stripe from "stripe"

const stripeWebhooks = async (request, response) => {
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY)
    const sig = request.headers["stripe-signature"]

    let event
    try {
        event = stripeInstance.webhooks.constructEvent(
            request.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        )
    } catch (error) {
        return response.status(400).send(`Webhook Error: ${error.message}`)
    }

    try {
        switch (event.type) {
            case "checkout.session.completed": {
                const session = event.data.object
                const {appointmentId} = session.metadata

                await Appointment.findByIdAndUpdate(appointmentId, {
                    payment: true,
                    paymentLink: ""
                })

                break
            }

            default:
                console.log("Unhandled event type: ", event.type)
        }

        response.json({received: true})
    } catch (error) {
        console.error("webhook processing error: ", error)
        response.status(500).send("Internal Server Error")
    }
}

export default stripeWebhooks
