import { Suspense } from "react";
import PaymentForm from "@/components/payments/PaymentForm";
import PaymentFormSkeleton from "@/components/ui/PaymentFormSkeleton";
import { eventsApi } from "@/lib/api";

export async function generateMetadata({ params: { eventId } }) {
  try {
    const response = await eventsApi.getById(eventId, { cache: "force-cache" });
    const eventInfo = response.success ? response.data : null;

    if (!eventInfo) {
      return {
        title: "Eventry - Payment",
        description: "Complete your event registration payment.",
      };
    }

    return {
      title: `Payment - ${eventInfo.name} | Eventry`,
      description: `Complete your registration payment for ${eventInfo.name}. Secure and fast checkout process.`,
      robots: {
        index: false, // Don't index payment pages
        follow: false,
      },
    };
  } catch (error) {
    return {
      title: "Eventry - Payment",
      description: "Complete your event registration payment.",
    };
  }
}

const PaymentPage = ({ params: { eventId } }) => {
  return (
    <section className="container">
      <div className="bg-[#242526] p-6 rounded-lg max-w-xl mx-auto my-12">
        <h2 className="mb-8 text-xl font-bold">Payment Details</h2>
        <Suspense fallback={<PaymentFormSkeleton />}>
          <PaymentForm eventId={eventId} />
        </Suspense>
      </div>
    </section>
  );
};

export default PaymentPage;
