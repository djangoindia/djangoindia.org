import React from "react";
import Event from "@/components/EventSection/Event";
import event1 from "../../../public/01.svg";
import event2 from "../../../public/02.svg";
import event3 from "../../../public/03.svg";
import Link from "next/link";
import Footer from "@/components/Footer/Footer";

function Page() {
  // Example data for events
  const events = [
    {
      title: "Event 1 is going to start within a week",
      date: "Nov 22",
      imageSrc: event1,
      venue: "Venue 1",
      time: "10:00 AM - 2:00 PM",
    },
    {
      title: "Event 2 is going to start, stay tuned",
      date: "Dec 5",
      imageSrc: event2,
      venue: "Venue 2",
      time: "11:00 AM - 3:00 PM",
    },
    {
      title: "Event 3 is going to start, stay tuned",
      date: "Jan 15",
      imageSrc: event3,
      venue: "Venue 3",
      time: "9:00 AM - 1:00 PM",
    },
    {
      title: "Event 1 is going to start within a week",
      date: "Nov 22",
      imageSrc: event1,
      venue: "Venue 1",
      time: "10:00 AM - 2:00 PM",
    },
    {
      title: "Event 2 is going to start, stay tuned",
      date: "Dec 5",
      imageSrc: event2,
      venue: "Venue 2",
      time: "11:00 AM - 3:00 PM",
    },
    {
      title: "Event 3 is going to start, stay tuned",
      date: "Jan 15",
      imageSrc: event3,
      venue: "Venue 3",
      time: "9:00 AM - 1:00 PM",
    },
    {
      title: "Event 1 is going to start within a week",
      date: "Nov 22",
      imageSrc: event1,
      venue: "Venue 1",
      time: "10:00 AM - 2:00 PM",
    },
    {
      title: "Event 2 is going to start, stay tuned",
      date: "Dec 5",
      imageSrc: event2,
      venue: "Venue 2",
      time: "11:00 AM - 3:00 PM",
    },
    {
      title: "Event 3 is going to start, stay tuned",
      date: "Jan 15",
      imageSrc: event3,
      venue: "Venue 3",
      time: "9:00 AM - 1:00 PM",
    },
    {
      title: "Event 1 is going to start within a week",
      date: "Nov 22",
      imageSrc: event1,
      venue: "Venue 1",
      time: "10:00 AM - 2:00 PM",
    },
    {
      title: "Event 2 is going to start, stay tuned",
      date: "Dec 5",
      imageSrc: event2,
      venue: "Venue 2",
      time: "11:00 AM - 3:00 PM",
    },
    {
      title: "Event 3 is going to start, stay tuned",
      date: "Jan 15",
      imageSrc: event3,
      venue: "Venue 3",
      time: "9:00 AM - 1:00 PM",
    },
    // Add more events as needed
  ];

  return (
    <div>
      <div className="p-4 mb-10 md:mb-20 lg:mb-50">
        <div className="flex flex-col items-center mb-4">
          <h1 className="text-3xl text-center font-bold">All Events</h1>
          <Link href="/">
            <p className="underline mt-2">Back to Home</p>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <div key={index} className="w-full h-auto mb-4">
              <Event
                title={event.title}
                date={event.date}
                imageSrc={event.imageSrc}
                venue={event.venue}
                time={event.time}
              />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Page;
