"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Users,
  MapPin,
  Clock,
  ArrowRight,
  Sparkles,
  MessageSquare,
  Bell,
  Code,
  Palette,
  Heart,
  Briefcase,
  Music,
  Dumbbell,
  Quote,
  Star,
  Zap,
  Globe,
} from "lucide-react";

export default function Home() {
  const featuredEvents = [
    {
      id: 1,
      title: "Tech Meetup Paris",
      description:
        "Rencontrez des professionnels du secteur tech et découvrez les dernières technologies.",
      date: "2024-03-15",
      time: "19:00",
      location: "La Station F, Paris",
      participants: 150,
      maxParticipants: 200,
      image:
        "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "Tech",
      price: "Gratuit",
    },
    {
      id: 2,
      title: "Festival de musique électronique",
      description:
        "Une soirée de musique live, des créations DJ et de la danse électronique.",
      date: "2024-03-20",
      time: "20:00",
      location: "Parc de la Villette, Paris",
      participants: 500,
      maxParticipants: 800,
      image:
        "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "Musique",
      price: "25€",
    },
    {
      id: 3,
      title: "Atelier cuisine italienne",
      description:
        "Apprenez à préparer des plats italiens authentiques avec un chef professionnel.",
      date: "2024-03-25",
      time: "14:00",
      location: "École de cuisine, Lyon",
      participants: 12,
      maxParticipants: 15,
      image:
        "https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "Cuisine",
      price: "45€",
    },
  ];

  const features = [
    {
      icon: Calendar,
      title: "Créez des événements",
      description:
        "Créez et personnalisez vos événements en quelques clics. Ajoutez des descriptions, des images, des dates et bien d'autres.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Users,
      title: "Collaborez en équipe",
      description:
        "Invitez des co-organisateurs pour gérer vos événements ensemble. Partagez les responsabilités et collaborez efficacement.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: MessageSquare,
      title: "Communiquez facilement",
      description:
        "Échangez avec les participants grâce au système de messagerie intégré. Envoyez des notifications et restez tout le monde informé.",
      gradient: "from-green-500 to-emerald-500",
    },
  ];

  const categories = [
    {
      name: "Technologie",
      count: 24,
      icon: Code,
      color: "from-blue-500 to-blue-600",
    },
    {
      name: "Art & Culture",
      count: 18,
      icon: Palette,
      color: "from-purple-500 to-purple-600",
    },
    {
      name: "Santé & Bien-être",
      count: 15,
      icon: Heart,
      color: "from-green-500 to-green-600",
    },
    {
      name: "Business & Entrepreneuriat",
      count: 32,
      icon: Briefcase,
      color: "from-orange-500 to-orange-600",
    },
    {
      name: "Musique & Divertissement",
      count: 21,
      icon: Music,
      color: "from-pink-500 to-pink-600",
    },
    {
      name: "Sports & Fitness",
      count: 19,
      icon: Dumbbell,
      color: "from-red-500 to-red-600",
    },
  ];

  const testimonials = [
    {
      id: 1,
      content:
        "EventConnect a transformé notre façon d'organiser des événements. L'interface est intuitive et les fonctionnalités sont exactement ce dont nous avions besoin.",
      author: "Marie Dubois",
      role: "Organisatrice d'événements, TechHub",
      avatar: "MD",
      rating: 5,
    },
    {
      id: 2,
      content:
        "Ça a complètement changé notre approche de l'organisation d'événements. Nous avons augmenté notre participation de 40% depuis que nous utilisons cette plateforme.",
      author: "Jean-Michel Martin",
      role: "Directeur marketing, StartupLab",
      avatar: "JM",
      rating: 5,
    },
    {
      id: 3,
      content:
        "La simplicité de la plateforme et la qualité du support client sont exceptionnelles. Je recommande EventConnect à tous les organisateurs d'événements.",
      author: "Sophie Lefort",
      role: "Responsable communication, InnovateNow",
      avatar: "SL",
      rating: 5,
    },
  ];

  const stats = [
    { label: "Événements créés", value: "1,000+", icon: Calendar },
    { label: "Utilisateurs actifs", value: "5,000+", icon: Users },
    { label: "Villes couvertes", value: "50+", icon: Globe },
    { label: "Satisfaction", value: "98%", icon: Star },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-background via-background to-muted/30 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto animate-fade-in">
            <div className="mb-6">
              <Badge
                variant="outline"
                className="bg-primary/10 text-primary border-primary/20 px-4 py-2 hover-glow"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Rejoignez des milliers d&apos;organisateurs ✨ Gratuit
              </Badge>
            </div>

            <h1 className="text-responsive-3xl font-bold text-foreground mb-6 leading-tight">
              Créez et participez à des événements
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/80">
                extraordinaires
              </span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              EventConnect vous permet de créer, organiser et participer à des
              événements de toutes sortes, en toute simplicité.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg hover-glow"
                asChild
              >
                <Link href="/registration">
                  Commencer gratuitement
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-border text-foreground hover:bg-accent px-8 py-4 text-lg hover-lift"
                asChild
              >
                <Link href="/events">Découvrir les événements</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex justify-center mb-3">
                  <div className="p-3 bg-primary/10 rounded-2xl">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div className="animate-slide-up">
              <h2 className="text-responsive-2xl font-bold text-foreground mb-4">
                Événements à la une
              </h2>
              <p className="text-xl text-muted-foreground">
                Découvrez les événements les plus populaires de notre plateforme
              </p>
            </div>
            <Button
              variant="outline"
              asChild
              className="hidden md:flex hover-lift"
            >
              <Link href="/events">
                Voir tous les événements
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredEvents.map((event, index) => (
              <Card
                key={event.id}
                className="overflow-hidden hover-lift border-0 shadow-lg bg-card animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-background/90 text-foreground hover:bg-background">
                      {event.category}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge
                      variant="outline"
                      className="bg-background/90 text-foreground border-border"
                    >
                      {event.price}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-white">
                      <div className="flex items-center text-sm mb-1">
                        <Calendar className="h-4 w-4 mr-2" />
                        {new Date(event.date).toLocaleDateString("fr-FR", {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                        })}
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="h-4 w-4 mr-2" />
                        {event.time}
                      </div>
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-2">
                    {event.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                    {event.description}
                  </p>

                  <div className="space-y-2 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-3 text-primary" />
                      {event.location}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-3 text-primary" />
                      {event.participants} participants /{" "}
                      {event.maxParticipants}
                    </div>
                  </div>

                  <Button className="w-full hover-glow" asChild>
                    <Link href={`/events/${event.id}`}>Voir les détails</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12 md:hidden">
            <Button variant="outline" asChild className="hover-lift">
              <Link href="/events">
                Voir tous les événements
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-responsive-2xl font-bold text-foreground mb-4">
              Tout ce dont vous avez besoin pour organiser des événements
              mémorables
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Simplifiez votre organisation d&apos;événements avec des outils
              puissants et intuitifs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-8 bg-card rounded-2xl shadow-sm hover-lift animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex justify-center mb-6">
                  <div
                    className={`p-4 bg-gradient-to-r ${feature.gradient} rounded-2xl shadow-lg`}
                  >
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-responsive-2xl font-bold text-foreground mb-4">
              Explorez nos catégories
            </h2>
            <p className="text-xl text-muted-foreground">
              Trouvez exactement ce que vous cherchez parmi nos catégories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <Card
                key={index}
                className="p-6 hover-lift transition-all duration-300 cursor-pointer border-0 shadow-sm bg-card animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-0">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`p-3 rounded-xl bg-gradient-to-r ${category.color} shadow-lg`}
                    >
                      <category.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-lg">
                        {category.name}
                      </h3>
                      <p className="text-muted-foreground">
                        {category.count} événements
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-responsive-2xl font-bold text-foreground mb-4">
              Ce qu&apos;en disent nos utilisateurs
            </h2>
            <p className="text-xl text-muted-foreground">
              Découvrez comment EventConnect transforme l&apos;organisation
              d&apos;événements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={testimonial.id}
                className="p-8 border-0 shadow-lg hover-lift bg-card animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    <Quote className="h-8 w-8 text-primary mr-3" />
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed italic">
                    &quot;{testimonial.content}&quot;
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary to-primary/80 rounded-full flex items-center justify-center mr-4">
                      <span className="text-primary-foreground font-semibold text-sm">
                        {testimonial.avatar}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">
                        {testimonial.author}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="animate-fade-in">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/10 rounded-2xl backdrop-blur">
                <Zap className="h-12 w-12 text-primary-foreground" />
              </div>
            </div>
            <h2 className="text-responsive-2xl font-bold mb-4">
              Prêt à organiser votre prochain événement ?
            </h2>
            <p className="text-xl mb-8 text-primary-foreground/80 max-w-2xl mx-auto">
              Rejoignez des milliers d&apos;organisateurs et de participants qui
              font confiance à EventConnect pour créer des expériences
              mémorables.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-background text-primary hover:bg-background/90 px-8 py-4 text-lg hover-glow"
                asChild
              >
                <Link href="/registration">Créer un compte gratuit</Link>
              </Button>
              <Button
                size="lg"
                className="bg-background text-primary hover:bg-background/90 px-8 py-4 text-lg hover-glow"
                asChild
              >
                <Link href="/events">Découvrir les événements</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
