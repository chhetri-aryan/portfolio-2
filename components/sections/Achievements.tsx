'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trophy, Award, ExternalLink } from 'lucide-react';
import { title } from 'node:process';

const achievements = [
  {
    title: 'Byte Bash Hackathon',
    position: '3rd Place',
    description: 'Sustainable Development Solution',
    icon: Trophy,
    color: 'yellow'
  },
  // {
  //   title: 'SpaceCode Hackathon',
  //   position: '3rd Place',
  //   description: 'AI-Powered Pulsar Detection',
  //   icon: Award,
  //   color: 'blue'
  // },
  // {
  //   title: 'KrackHack 2.0 (GDG)',
  //   position: '3rd Place',
  //   description: 'Dealora Marketplace project',
  //   icon: Award,
  //   color: 'teal'
  // }
];

const certifications = [
  {
    title: 'C# for .NET Developers',
    description: 'Comprehensive course on C# programming and .NET development.',
    link: 'https://coursera.org/share/496cd48bef9813e41ab33c42f4a8a58c'
  },

  {
    title: 'Building React Application using ASP.NET MVC5',
    description: 'Course on integrating React with ASP.NET MVC5 for dynamic web applications.',
    link: 'https://coursera.org/share/ddca89ceb215707fd255c2d44d2c0247'
  },
  {
    title: "Crash Course on Python",
    description: "Introductory course covering Python programming basics and fundamentals.",
    link: "https://coursera.org/share/126bc3330d2017fc2b91e664b640ac49"
  },

    {
    title: "Programming with JavaScript",
    description: "Introductory course covering JavaScript programming basics and fundamentals.",
    link: "https://coursera.org/share/b16c9a7d51029cb06cfdfd44e154ea3c"
  } 

];

export default function Achievements() {
  return (
    <section id="achievements" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">Achievements</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Recognition for innovation and technical excellence
          </p>
        </motion.div>

        <div className="space-y-12">
          {/* Hackathon Achievements */}
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-2xl font-semibold mb-6 flex items-center gap-2 text-foreground"
            >
              <Trophy className="w-6 h-6 text-yellow-600" />
              Hackathon Wins
            </motion.h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-300 border-2 hover:border-yellow-200 dark:hover:border-yellow-800 bg-background/50 backdrop-blur-sm">
                    <CardHeader className="text-center">
                      <div className="mx-auto w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mb-4">
                        <achievement.icon className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-lg text-foreground">{achievement.title}</CardTitle>
                      <Badge className="mx-auto bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                        {achievement.position}
                      </Badge>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-sm text-muted-foreground">
                        {achievement.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-2xl font-semibold mb-6 flex items-center gap-2 text-foreground"
            >
              <Award className="w-6 h-6 text-blue-600" />
              Certifications
            </motion.h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-200 dark:hover:border-blue-800 bg-background/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-foreground">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center">
                          <Award className="w-5 h-5 text-white" />
                        </div>
                        {cert.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {cert.description}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" asChild className="w-full bg-background/50 backdrop-blur-sm">
                        <a href={cert.link} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Certificate
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}