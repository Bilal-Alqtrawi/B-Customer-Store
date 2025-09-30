import { motion } from "motion/react";
import { TypeAnimation } from "react-type-animation";
import Button from "../ui/Button";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

function Hero() {
  return (
    <div className="relative h-screen w-full">
      <div className="absolute inset-0 bg-gradient-to-tr from-gray-50 via-purple-100 to-amber-200"></div>

      <motion.div
        className="relative z-10 container mx-auto flex h-full items-center justify-center px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 items-center gap-8 pt-24 text-center md:grid-cols-2 md:pt-0 md:text-left">
          <motion.div
            className="intro order-2 md:order-1"
            variants={containerVariants}
          >
            <motion.h1
              className="text-4xl font-extrabold tracking-tight text-gray-800 sm:text-5xl md:text-6xl"
              variants={itemVariants}
            >
              <span className="block">Welcome to</span>
              <TypeAnimation
                sequence={[
                  "B-Customer-Store",
                  2000,
                  "the Best Deals",
                  2000,
                  "Modern Electronics",
                  2000,
                  "Fast Delivery",
                  2000,
                ]}
                wrapper="span"
                speed={50}
                className="block text-[var(--background-btn)]"
                repeat={Infinity}
              />
            </motion.h1>
            <motion.p
              className="mt-3 text-lg text-gray-600 md:text-xl"
              variants={itemVariants}
            >
              Your one-stop shop for everything you need.
            </motion.p>
            <motion.div variants={itemVariants} className="mt-8">
              <Button
                as="Link"
                to="/products"
                variant="primary"
                size="lg"
                className="flex items-center hover:scale-105 hover:shadow-xl"
              >
                <ShoppingBagIcon className="size-5" />
                <span>Shop Now</span>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="order-1 md:order-2"
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img
              src="/image.jpg"
              alt="B-Customer-Store E-commerce"
              className="mx-auto w-full max-w-md rounded-2xl object-cover shadow-2xl"
            />
          </motion.div>
        </div>
      </motion.div>

      <div className="custom-shape-divider-bottom absolute bottom-[-1px] left-0 w-full overflow-hidden leading-[0]">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-[calc(100%+1.3px )] relative block h-[100px] md:h-[180px]"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.83,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.81C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className="fill-white"
          ></path>
        </svg>
      </div>
    </div>
  );
}

export default Hero;
