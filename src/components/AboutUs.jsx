import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { features } from "../data/features";

const text = "A Story of Passion for Quality and Style.";
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

function AboutUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="bg-white/80 py-24" id="aboutUs">
      {/* <div className="mx-auto max-w-7xl px-6 lg:px-8"> */}
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid max-w-2xl grid-cols-1 items-start gap-x-16 gap-y-16 sm:gap-y-24 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-4">
            <div className="relative w-full max-w-xl sm:mx-auto">
              <h2 className="text-center text-base leading-7 font-semibold text-[var(--primary)] md:text-start">
                About Us
              </h2>

              <div className="flex justify-center md:justify-start">
                {splittedText.map((current, i) => (
                  <motion.p
                    key={i}
                    ref={ref}
                    variants={pullupVariant}
                    initial="initial"
                    animate={isInView ? "animate" : ""}
                    custom={i}
                    className="pr-1.5 text-xl font-extrabold tracking-tighter text-[var(--textPrimary)] md:text-2xl md:leading-[4rem] xl:text-3xl"
                  >
                    {current == "" ? <span>&nbsp;</span> : current}
                  </motion.p>
                ))}
              </div>
              <p className="text-md mt-4 text-center leading-8 text-[var(--textSecondary)] md:text-start">
                We started with a simple idea: why can't high-quality products
                also be stylish and affordable? From that question, we embarked
                on a journey to find the best materials and designs to offer you
                a unique shopping experience. We believe every piece you own
                should tell a story.
              </p>

              <div className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                {features.map((feature) => (
                  <div
                    key={feature.name}
                    className="relative flex flex-col items-center gap-y-2 text-center md:flex-row md:items-start md:text-start"
                  >
                    <div className="flex basis-full items-start gap-3 font-semibold text-[var(--textPrimary)] md:basis-60">
                      <feature.icon
                        className="size-7 text-[var(--primary)]"
                        aria-hidden="true"
                      />
                      <span className="grow">{feature.name}:</span>
                    </div>
                    <div className="flex-1 text-[var(--textSecondary)] md:pl-2">
                      {feature.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-start justify-center lg:order-first lg:justify-end">
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
