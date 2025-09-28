import {
  CheckBadgeIcon,
  CubeTransparentIcon,
  ShieldCheckIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

const features = [
  {
    name: "Unmatched Quality",
    description:
      "We source the finest materials to ensure our products are built to last and exceed your expectations.",
    icon: CheckBadgeIcon,
  },
  {
    name: "Innovative Designs",
    description:
      "Our team stays ahead of the trends to bring you unique and modern products you won't find anywhere else.",
    icon: CubeTransparentIcon,
  },
  {
    name: "Fast & Reliable Shipping",
    description:
      "Your order is delivered to your doorstep in the fastest time possible, with tracking on every package.",
    icon: TruckIcon,
  },
  {
    name: "Exceptional Customer Support",
    description:
      "Our dedicated support team is here to help you around the clock with any questions or concerns.",
    icon: ShieldCheckIcon,
  },
];

const text = "A Story of Passion for Quality and Style.";

function AboutUs() {
  const splittedText = text.split(" ");
  const pullupVariant = {
    initial: { y: 20, opacity: 0 },
    animate: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
      },
    }),
  };
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="bg-white/80 py-24" id="aboutUs">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 items-start gap-x-16 gap-y-16 sm:gap-y-24 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-4">
            <div className="relative w-full max-w-xl lg:mx-auto">
              <h2 className="text-base leading-7 font-semibold text-[var(--primary)]">
                About Us
              </h2>

              <div className="flex">
                {splittedText.map((current, i) => (
                  <motion.p
                    key={i}
                    ref={ref}
                    variants={pullupVariant}
                    initial="initial"
                    animate={isInView ? "animate" : ""}
                    custom={i}
                    // className="pr-2 text-center text-xl font-bold tracking-tighter sm:text-4xl md:text-3xl md:leading-[4rem]"
                    className="pr-1.5 text-xl font-extrabold tracking-tighter text-[var(--textPrimary)] md:text-3xl md:leading-[4rem]"
                  >
                    {current == "" ? <span>&nbsp;</span> : current}
                  </motion.p>
                ))}
              </div>
              <p className="text-md mt-4 leading-8 text-[var(--textSecondary)]">
                We started with a simple idea: why can't high-quality products
                also be stylish and affordable? From that question, we embarked
                on a journey to find the best materials and designs to offer you
                a unique shopping experience. We believe every piece you own
                should tell a story.
              </p>

              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative flex items-start">
                    <div className="flex w-60 items-start gap-3 font-semibold text-[var(--textPrimary)]">
                      <feature.icon
                        className="size-7 text-[var(--primary)]"
                        aria-hidden="true"
                      />
                      <span>{feature.name}:</span>
                    </div>
                    <div className="flex-1 pl-2 text-[var(--textSecondary)]">
                      {feature.description}
                    </div>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="flex items-start justify-end lg:order-first">
            <div className="w-full max-w-lg lg:max-w-full">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
                alt="Our team working in a creative workshop"
                className="h-[32rem] w-full rounded-2xl bg-gray-50 object-cover shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
