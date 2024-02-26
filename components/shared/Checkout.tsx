"use client";

import { useEffect } from "react";

import { useToast } from "@/components/ui/use-toast";

import { Button } from "../ui/button";
import { createTransaction } from "@/lib/actions/transaction.actions";
import { usePaystackPayment,PaystackConsumer } from 'react-paystack';
import { updateCredits } from "@/lib/actions/user.actions";

const paystackConfig = {
    reference: (new Date()).getTime().toString(),
    email: "d3velopm3nt@gmail.com",
    currency:"ZAR",
    amount: 0, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
};




const Checkout = ({
  plan,
  amount,
  credits,
  buyerId,
}: {
  plan: string;
  amount: number;
  credits: number;
  buyerId: string;
}) => {
  const { toast } = useToast();

// you can call this function anything
const handleSuccess = async (reference?:any) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log(reference);
    await updateCredits(buyerId,credits);
    await createTransaction({
        paystackId: reference.reference,
        transactionId: reference.transaction,
        amount: amount,
        credits: credits,
        buyerId:buyerId,
        plan:plan,
        createdAt: new Date()
    });

    toast({
        title: "Order placed!",
        description: "You will receive an email confirmation",
        duration: 5000,
        className: "success-toast",
      });
    }

// you can call this function anything
const handleClose = () => {
// implementation for  whatever you want to do when the Paystack dialog closed.
console.log('closed')
}

const componentProps = {
    ...paystackConfig,
    text: 'Buy Transformation Credits',
    onSuccess: (ref?:any)  => handleSuccess(ref),
    onClose: () => handleClose()
};

  const initializePayment =  usePaystackPayment(paystackConfig);

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
   
    }

    if (query.get("canceled")) {
      toast({
        title: "Order canceled!",
        description: "Continue to shop around and checkout when you're ready",
        duration: 5000,
        className: "error-toast",
      });
    }
  }, []);



  const onCheckout = async () => {
    const transaction = {
      plan,
      amount,
      credits,
      buyerId,
    };
    paystackConfig.amount = amount * 100;
    //paystackConfig.email = user.user?.emailAddresses[0] as string;

       initializePayment({onSuccess: (ref) => { 
        handleSuccess(ref)
    },
    onClose: handleClose,config: paystackConfig})
  };

  return (
    <form action={onCheckout} method="POST">
      <section>
      

        <PaystackConsumer {...componentProps}>
        {({initializePayment}) => 
           (
            <Button
            type="submit"
            role="link"
            className="w-full rounded-full bg-purple-gradient bg-cover"
            onClick={() => onCheckout}
            >
            Buy Credit
            </Button>
          )
        }
      </PaystackConsumer>
      </section>
    </form>
  );
};

export default Checkout;

