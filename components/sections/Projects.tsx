'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ExternalLink,
  Github,
  Award,
  TrendingUp,
  Calendar,
} from 'lucide-react';

const projects = [
  {
    title: 'StrideSync',
    description:
      'Android fitness tracking app that monitors steps, calories burned, and distance, with a dedicated profile and settings experience.',
    image:
      'https://raw.githubusercontent.com/chhetri-aryan/Portfolio/master/portfolio/src/assets/img/image.png',
    date: 'Sep 2024 - Nov 2024',
    achievements: [
      'Implemented step, calorie, and distance tracking with persistent local storage',
      'Built a profile management and settings screen for editing user information',
      'Added background service and notification support to keep users informed of daily progress',
    ],
    technologies: [
      'Android Studio',
      'Kotlin',
      'XML',
      'SQL',
      'Background Services',
      'Notifications',
    ],
    demoUrl: '',
    githubUrl: 'https://github.com/chhetri-aryan/StrideSync',
    award: '',
  },
  {
    title: 'Paywave',
    description:
      'Payroll management system built with Laravel to automate employee salary processing, reporting, and analytics.',
    image:
      'https://raw.githubusercontent.com/chhetri-aryan/Portfolio/master/portfolio/src/assets/img/pay.png',
    date: 'Sep 2024 - Oct 2024',
    achievements: [
      'Developed modules to manage employees, payroll cycles, and payment logs',
      'Added gender ratio and payroll analytics dashboards for HR insights',
      'Automated scheduled payroll runs and PDF report generation using task scheduling',
    ],
    technologies: [
      'Laravel',
      'PHP',
      'MySQL',
      'Tailwind CSS',
      'Web Development',
    ],
    demoUrl: '',
    githubUrl: 'https://github.com/chhetri-aryan/Paywave',
    award: '',
  },
  {
    title: 'Sneak',
    description:
      'Single-page ecommerce app for sneaker enthusiasts with seamless product browsing and checkout flow.',
    image:
      'https://raw.githubusercontent.com/chhetri-aryan/Portfolio/master/portfolio/src/assets/img/Screenshot_27-6-2024_141324_.jpeg',
    date: 'Mar 2024 - Apr 2024',
    achievements: [
      'Created product listing, cart, and order management flows for sneakers',
      'Integrated Razorpay API for secure online payments',
      'Built a responsive SPA experience using React, Node.js, Express.js, and Tailwind CSS',
    ],
    technologies: [
      'React.js',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Razorpay API',
      'Tailwind CSS',
    ],
    demoUrl: '',
    githubUrl: 'https://github.com/chhetri-aryan/SNEAK-',
    award: '',
  },
  {
    title: 'AI in Vehicle Counting',
    description:
      'Computer-vision-based system that automatically counts vehicles in video footage for traffic analysis.',
    image:
      'https://raw.githubusercontent.com/chhetri-aryan/Portfolio/master/portfolio/src/assets/img/Screenshot%202024-06-27%20104125.png',
    date: 'May 2023 - Apr 2023',
    achievements: [
      'Implemented vehicle detection and counting using OpenCV and NumPy',
      'Processed video streams to generate accurate traffic counts for each frame/segment',
      'Packaged the pipeline into a reusable Python script for traffic monitoring scenarios',
    ],
    technologies: ['Python', 'OpenCV', 'NumPy', 'Computer Vision'],
    demoUrl: '',
    githubUrl: 'https://github.com/chhetri-aryan/AI-IN-VEHICLE-COUNTING-',
    award: '',
  },
  {
    title: 'Todo',
    description:
      'React-based task management app demonstrating component design, hooks, Redux state management, and responsive UI.',
    image:
      'https://raw.githubusercontent.com/chhetri-aryan/Portfolio/master/portfolio/src/assets/img/Screenshot%202024-06-30%20224233.png',
    date: 'Jun 2024 - Jul 2024',
    achievements: [
      'Implemented add, view, and delete task flows with a clean UI',
      'Managed application state using React hooks and Redux store',
      'Styled the app with Tailwind CSS for a responsive, modern design',
    ],
    technologies: ['React.js', 'Redux', 'Tailwind CSS', 'JavaScript'],
    demoUrl: 'https://todo-red-gamma.vercel.app/',
    githubUrl: 'https://github.com/chhetri-aryan/Todo-List',
    award: '',
  },
];

export default function Projects() {
  return (
    <section id='projects' className='py-20 px-4 sm:px-6 lg:px-8 bg-background'>
      <div className='max-w-7xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className='text-center mb-12'
        >
          <h2 className='text-3xl sm:text-4xl font-bold mb-4 text-foreground'>
            Projects
          </h2>
          <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
            Building innovative solutions across AI/ML, web development, and
            robotics
          </p>
        </motion.div>

        <div className='grid lg:grid-cols-2 gap-8'>
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <Card className='h-full overflow-hidden hover:shadow-lg transition-shadow duration-200 border bg-card'>
                <div className='relative'>
                  <div className='aspect-video bg-gradient-to-br from-blue-100 to-teal-100 dark:from-blue-900 dark:to-teal-900 overflow-hidden'>
                    <img
                      src={project.image}
                      alt={project.title}
                      className='w-full h-full object-contain'
                    />
                  </div>
                  <div className='absolute top-4 left-4'>
                    <Badge variant='secondary' className='bg-background/90'>
                      <Calendar className='w-3 h-3 mr-1' />
                      {project.date}
                    </Badge>
                  </div>
                  {project.award && (
                    <div className='absolute top-4 right-4'>
                      <Badge className='bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg'>
                        <Award className='w-3 h-3 mr-1' />
                        {project.award}
                      </Badge>
                    </div>
                  )}
                </div>

                <CardHeader>
                  <CardTitle className='text-xl flex items-center gap-2 text-foreground'>
                    <TrendingUp className='w-5 h-5 text-blue-600' />
                    {project.title}
                  </CardTitle>
                  <p className='text-muted-foreground leading-relaxed text-sm'>
                    {project.description}
                  </p>
                </CardHeader>

                <CardContent className='space-y-4'>
                  <div className='space-y-2'>
                    <h4 className='font-semibold text-sm text-foreground'>
                      Key Achievements
                    </h4>
                    <ul className='space-y-1'>
                      {project.achievements.map((achievement, achIndex) => (
                        <li key={achIndex} className='flex items-start gap-2'>
                          <div className='w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full mt-2 flex-shrink-0' />
                          <span className='text-xs text-muted-foreground leading-relaxed'>
                            {achievement}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className='space-y-2'>
                    <h4 className='font-semibold text-sm text-foreground'>
                      Tech Stack
                    </h4>
                    <div className='flex flex-wrap gap-1'>
                      {project.technologies.map((tech, index) => (
                        <Badge
                          key={index}
                          variant='secondary'
                          className='text-xs bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300'
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className='flex flex-col gap-2 pt-2'>
                    {project.demoUrl && (
                      <Button
                        size='sm'
                        className='bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white'
                        asChild
                      >
                        <a
                          href={project.demoUrl}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          <ExternalLink className='w-3 h-3 mr-2' />
                          View Live Demo
                        </a>
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button variant='outline' size='sm' asChild>
                        <a
                          href={project.githubUrl}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          <Github className='w-3 h-3 mr-2' />
                          View Source
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
