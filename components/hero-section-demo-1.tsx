'use client';

import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';

export default function HeroSectionOne() {
  const router = useRouter();

  return (
    <div className="relative mx-auto my-10 flex max-w-7xl flex-col items-center justify-center">
      <div className="absolute inset-y-0 left-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="absolute inset-y-0 right-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="px-4 py-10 md:py-20">
        <h1 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-slate-700 md:text-4xl lg:text-7xl dark:text-slate-300">
          {'揭开热搜背后的趋势 - 掌握市场先机'.split(' ').map((word, index) => (
            <motion.span
              key={index}
              animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              className="mr-2 inline-block"
              initial={{ opacity: 0, filter: 'blur(4px)', y: 10 }}
              transition={{
                duration: 0.3,
                delay: index * 0.1,
                ease: 'easeInOut',
              }}
            >
              {word}
            </motion.span>
          ))}
        </h1>
        <motion.p
          animate={{
            opacity: 1,
          }}
          className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-neutral-600 dark:text-neutral-400"
          initial={{
            opacity: 0,
          }}
          transition={{
            duration: 0.3,
            delay: 0.8,
          }}
        >
          用HotTrends深入了解市场动态，预测热搜话题，提升你的品牌影响力
        </motion.p>
        <motion.div
          animate={{
            opacity: 1,
          }}
          className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
          initial={{
            opacity: 0,
          }}
          transition={{
            duration: 0.3,
            delay: 1,
          }}
        >
          <button
            className="w-60 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
            onClick={() => router.push('/trends')}
          >
            开始体验
          </button>
          <button className="w-60 transform rounded-lg border border-gray-300 bg-white px-6 py-2 font-medium text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100 dark:border-gray-700 dark:bg-black dark:text-white dark:hover:bg-gray-900">
            Contact Support
          </button>
        </motion.div>
        {/* <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.3,
            delay: 1.2,
          }}
          className="relative z-10 mt-20 rounded-3xl border border-neutral-200 bg-neutral-100 p-4 shadow-md dark:border-neutral-800 dark:bg-neutral-900"
        >
          <div className="w-full overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700">
            <img
              src="https://assets.aceternity.com/pro/aceternity-landing.webp"
              alt="Landing page preview"
              className="aspect-[16/9] h-auto w-full object-cover"
              height={1000}
              width={1000}
            />
          </div>
        </motion.div> */}
      </div>
    </div>
  );
}
