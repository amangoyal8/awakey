
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { ArrowRight, Users, Target, BarChart, Award, ChartBar, LineChart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const EmployerLanding = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-b from-background to-muted/50 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
                For Employers
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-tight">
                Build a <span className="text-primary font-normal">High-Performing</span> Sales Team
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground font-light">
                Increase quota attainment, reduce turnover, and build a sustainable sales organization.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Button asChild size="lg" className="px-6 py-6 font-medium rounded-md">
                  <Link to="/signup">
                    Find Top Talent
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild className="px-6 py-6 font-medium rounded-md">
                  <Link to="/login">Sign In</Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:block relative">
              <div className="aspect-square w-full max-w-md mx-auto rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
                  alt="High-performing sales team"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three Pillars Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-light mb-4">A Complete Sales Talent Solution</h2>
            <p className="text-muted-foreground text-lg">
              We address the entire sales talent lifecycle, from hiring to long-term retention
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12 max-w-6xl mx-auto">
            {/* Pillar 1: Hiring & Onboarding */}
            <div className="space-y-4">
              <div className="h-1 w-16 bg-primary"></div>
              <h3 className="text-2xl font-medium">Right Hiring & Onboarding</h3>
              <p className="text-muted-foreground">
                Find the perfect fit through skill-based assessment and targeted training from day one.
              </p>
              <ul className="space-y-3 mt-6">
                <li className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                    <Target className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm">AI-powered skill matching</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                    <Target className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm">Personalized onboarding journeys</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                    <Target className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm">Cultural and skill fit indicators</span>
                </li>
              </ul>
            </div>

            {/* Pillar 2: Performance */}
            <div className="space-y-4">
              <div className="h-1 w-16 bg-primary"></div>
              <h3 className="text-2xl font-medium">Performance Optimization</h3>
              <p className="text-muted-foreground">
                Set meaningful KPIs and provide timely coaching to ensure consistent goal achievement.
              </p>
              <ul className="space-y-3 mt-6">
                <li className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                    <ChartBar className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm">Smart KPI tracking and analysis</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                    <ChartBar className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm">AI-driven coaching recommendations</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                    <ChartBar className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm">Behavioral nudges for improvement</span>
                </li>
              </ul>
            </div>

            {/* Pillar 3: Retention */}
            <div className="space-y-4">
              <div className="h-1 w-16 bg-primary"></div>
              <h3 className="text-2xl font-medium">Sustainable Retention</h3>
              <p className="text-muted-foreground">
                Keep top performers motivated with the right incentives and clear advancement paths.
              </p>
              <ul className="space-y-3 mt-6">
                <li className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                    <Award className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm">Personalized growth trajectories</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                    <Award className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm">Skill development tracking</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                    <Award className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm">Data-backed advancement recommendations</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-light mb-4">Measured Success</h2>
            <p className="text-muted-foreground text-lg">
              Our platform delivers measurable improvements for organizations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-8 bg-background rounded-xl shadow-sm">
              <div className="text-4xl font-light text-primary mb-2">+27%</div>
              <p className="text-lg">Average increase in sales performance</p>
            </div>

            <div className="text-center p-8 bg-background rounded-xl shadow-sm">
              <div className="text-4xl font-light text-primary mb-2">-35%</div>
              <p className="text-lg">Reduction in sales team turnover</p>
            </div>

            <div className="text-center p-8 bg-background rounded-xl shadow-sm">
              <div className="text-4xl font-light text-primary mb-2">40%</div>
              <p className="text-lg">Faster time to full productivity</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6 text-primary-foreground">
            <h2 className="text-3xl font-light">Ready to Transform Your Sales Team?</h2>
            <p className="text-xl opacity-90 font-light">
              Join forward-thinking companies already growing with our platform
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Button size="lg" variant="secondary" asChild className="px-6 py-6 font-medium rounded-md">
                <Link to="/signup">
                  Start Building Your Team
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EmployerLanding;
