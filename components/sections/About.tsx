'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import {Heart, Zap } from 'lucide-react';

export default function About() {
  return (
    <section id='about' className='py-20 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='text-center mb-12'
        >
          <h2 className='text-3xl sm:text-4xl font-bold mb-4 text-foreground'>
            About Me
          </h2>
          <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
            Driven by curiosity and built for problem-solving
          </p>
        </motion.div>

        <div className='grid md:grid-cols-2 gap-12 items-center'>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className='space-y-6'
          >
            <div className='space-y-4'>
              <h3 className='text-2xl font-semibold text-foreground'>
                One word that defines me - “Craft”
              </h3>
              <p className='text-muted-foreground leading-relaxed'>
                I am a full-stack developer at TCS with a strong foundation in
                modern web technologies, data structures, and clean backend
                architecture. I enjoy turning complex requirements into reliable
                systems and user-friendly interfaces that actually ship to
                production.
              </p>
              <p className='text-muted-foreground leading-relaxed'>
                From web apps to Android projects, I love building products
                end-to-end—designing APIs, modelling databases, and polishing
                the UI so that everything feels cohesive and fast. My goal is
                always the same: write code that is easy to maintain, scales
                with users, and genuinely helps people.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className='space-y-6'
          >
            <Card className='border-2 border-blue-100 dark:border-blue-900/20 hover:border-blue-300 dark:hover:border-blue-700 transition-colors bg-background/50 backdrop-blur-sm'>
              <CardContent className='p-6'>
                <div className='flex items-center space-x-3 mb-4'>
                  <div className='p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg'>
                    <Zap className='w-5 h-5 text-blue-600' />
                  </div>
                  <h4 className='font-semibold text-foreground'>
                    Innovation Focus
                  </h4>
                </div>
                <p className='text-sm text-muted-foreground'>
                  Designing robust backends, APIs, and integrations that keep
                  applications fast, secure, and observable, while experimenting
                  with new tools in .NET, React, Python, and cloud platforms.
                </p>
              </CardContent>
            </Card>

            <Card className='border-2 border-teal-100 dark:border-teal-900/20 hover:border-teal-300 dark:hover:border-teal-700 transition-colors bg-background/50 backdrop-blur-sm'>
              <CardContent className='p-6'>
                <div className='flex items-center space-x-3 mb-4'>
                  <div className='p-2 bg-teal-100 dark:bg-teal-900/20 rounded-lg'>
                    <Heart className='w-5 h-5 text-teal-600' />
                  </div>
                  <h4 className='font-semibold text-foreground'>
                    Passion Projects
                  </h4>
                </div>
                <p className='text-sm text-muted-foreground'>
                  From fitness-tracking Android apps like StrideSync to
                  database-driven web tools, I enjoy building side projects that
                  blend real-world use cases with solid engineering practices.
                </p>
              </CardContent>
            </Card>

            <Card className='border-2 border-purple-100 dark:border-purple-900/20 hover:border-purple-300 dark:hover:border-purple-700 transition-colors bg-background/50 backdrop-blur-sm'>
              <CardContent className='p-6'>
                <div className='flex items-center space-x-3 mb-4'>
                  <div className='p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg'>
                  </div>
                  <h4 className='font-semibold text-foreground'>
                    Continuous Learning
                  </h4>
                </div>
                <p className='text-sm text-muted-foreground'>
                  Constantly refining my skills in full-stack development,
                  system design, and cloud services, and exploring areas like
                  AI/ML and performance optimization to become a stronger
                  backend engineer.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
