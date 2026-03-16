/**
 * @file Home.tsx
 * @description Main single-page CV layout for Emmanouil Georgiou.
 */

import React from 'react'
import { ThemeProvider } from '../theme/ThemeProvider'
import AppLayout from '../components/layout/AppLayout'
import { HeroSection } from '../components/sections/HeroSection'
import { SkillsSection } from '../components/sections/SkillsSection'
import { ExperienceSection } from '../components/sections/ExperienceSection'
import { ProjectsSection } from '../components/sections/ProjectsSection'
import { EducationSection } from '../components/sections/EducationSection'
import { TestimonialsSection } from '../components/sections/TestimonialsSection'
import { FunFactsSection } from '../components/sections/FunFactsSection'
import { ContactSection } from '../components/sections/ContactSection'

/**
 * Home page component assembling all sections of the CV.
 *
 * Renders the ThemeProvider and AppLayout wrapper and places the main
 * sections (Hero, Skills, Experience, Projects, Education, Testimonials,
 * Fun Facts, Contact) according to the design specification.
 */
const Home: React.FC = () => {
  return (
    <ThemeProvider>
      <AppLayout>
        <HeroSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <EducationSection />
        <TestimonialsSection />
        <FunFactsSection />
        <ContactSection />
      </AppLayout>
    </ThemeProvider>
  )
}

export default Home
