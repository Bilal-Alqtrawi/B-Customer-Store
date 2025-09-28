import { useState } from "react";
import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    name: "Jane Doe",
    title: "Software Developer",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    quote:
      "This is the best service I have ever used. The quality is outstanding, and the customer support is second to none. Highly recommended!",
  },
  {
    name: "John Smith",
    title: "Marketing Manager",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    quote:
      "Incredible products and an even better team. They delivered beyond our expectations and helped our project succeed.",
  },
  {
    name: "Emily White",
    title: "Graphic Designer",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    quote:
      "The design process was seamless and intuitive. I finally found a platform that understands creative needs. A true game-changer!",
  },
];

function TestimonialCard({ testimonial }) {
  const [flip, setFlip] = useState(false);
  return (
    <div
      className="group h-80 w-full [perspective:1000px]"
      onClick={() => {
        setFlip((f) => !f);
      }}
      onMouseLeave={() => {
        setFlip(false);
      }}
      id="testimonials"
    >
      <div
        className={`relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] ${flip ? "[transform:rotateY(180deg)]" : ""}`}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-xl bg-white p-8 text-center shadow-lg [backface-visibility:hidden]">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="h-28 w-28 rounded-full border-4 border-[var(--primary)] object-cover shadow-md"
          />
          <h3 className="mt-4 text-2xl font-bold text-[var(--textPrimary)]">
            {testimonial.name}
          </h3>
          <p className="text-sm font-medium text-[var(--textSecondary)]">
            {testimonial.title}
          </p>
        </div>

        <div className="absolute inset-0 flex [transform:rotateY(180deg)] flex-col items-center justify-center rounded-xl bg-[var(--primary)] p-8 text-center text-white [backface-visibility:hidden]">
          <FaQuoteLeft className="mb-4 h-8 w-8 text-white/50" />
          <p className="text-lg leading-relaxed italic">
            "{testimonial.quote}"
          </p>
        </div>
      </div>
    </div>
  );
}

function Testimonials() {
  return (
    <section className="bg-[var(--surface)] py-24 sm:py-32">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base leading-7 font-semibold text-[var(--primary)]">
            Testimonials
          </h2>
          <p className="mt-2 text-4xl font-extrabold tracking-tight text-[var(--textPrimary)] sm:text-5xl">
            What Our Customers Say
          </p>
          <p className="mt-6 text-lg leading-8 text-[var(--textSecondary)]">
            We are trusted by thousands of users. Here's a selection of reviews
            from our happy customers.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
