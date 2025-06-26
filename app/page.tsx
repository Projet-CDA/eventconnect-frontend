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
    },
    {
      icon: Users,
      title: "Collaborez en équipe",
      description:
        "Invitez des co-organisateurs pour gérer vos événements ensemble. Partagez les responsabilités et collaborez efficacement.",
    },
    {
      icon: MessageSquare,
      title: "Communiquez facilement",
      description:
        "Échangez avec les participants grâce au système de messagerie intégré. Envoyez des notifications et restez tout le monde informé.",
    },
  ];

  const categories = [
    {
      name: "Technologie",
      count: 24,
      icon: Code,
      color: "bg-blue-100 text-blue-700",
    },
    {
      name: "Art & Culture",
      count: 18,
      icon: Palette,
      color: "bg-purple-100 text-purple-700",
    },
    {
      name: "Santé & Bien-être",
      count: 15,
      icon: Heart,
      color: "bg-green-100 text-green-700",
    },
    {
      name: "Business & Entrepreneuriat",
      count: 32,
      icon: Briefcase,
      color: "bg-orange-100 text-orange-700",
    },
    {
      name: "Musique & Divertissement",
      count: 21,
      icon: Music,
      color: "bg-pink-100 text-pink-700",
    },
    {
      name: "Sports & Fitness",
      count: 19,
      icon: Dumbbell,
      color: "bg-red-100 text-red-700",
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
    },
    {
      id: 2,
      content:
        "Ça a complètement changé notre approche de l'organisation d'événements. Nous avons augmenté notre participation de 40% depuis que nous utilisons cette plateforme.",
      author: "Jean-Michel Martin",
      role: "Directeur marketing, StartupLab",
      avatar: "JM",
    },
    {
      id: 3,
      content:
        "La simplicité de la plateforme et la qualité du support client sont exceptionnelles. Je recommande EventConnect à tous les organisateurs d'événements.",
      author: "Sophie Lefort",
      role: "Responsable communication, InnovateNow",
      avatar: "SL",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-violet-50 py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-6">
              <Badge
                variant="outline"
                className="bg-blue-50 text-blue-700 border-blue-200 px-4 py-2"
              >
                Rejoignez des milliers d&apos;organisateurs ✨ Gratuit
              </Badge>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Créez et participez à des événements
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">
                extraordinaires
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              EventConnect vous permet de créer, organiser et participer à des
              événements de toutes sortes, en toute simplicité.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <>
                <Button
                  size="lg"
                  className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 text-lg"
                  asChild
                >
                  <Link href="/events">
                    Découvrir les événements
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg"
                  asChild
                >
                  <Link href="/inscription">Créer un compte</Link>
                </Button>
              </>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Événements à la une
              </h2>
              <p className="text-xl text-gray-600">
                Découvrez les événements les plus populaires de notre plateforme
              </p>
            </div>
            <Button variant="outline" asChild className="hidden md:flex">
              <Link href="/events">
                Voir tous les événements
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredEvents.map((event) => (
              <Card
                key={event.id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer border-0 shadow-lg"
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white/90 text-gray-900 hover:bg-white">
                      {event.category}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge
                      variant="outline"
                      className="bg-white/90 text-gray-900 border-gray-200"
                    >
                      {event.price}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                    {event.description}
                  </p>

                  <div className="space-y-2 text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-3 text-blue-500" />
                      {new Date(event.date).toLocaleDateString("fr-FR", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                      })}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-3 text-blue-500" />
                      {event.time}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-3 text-blue-500" />
                      {event.location}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-3 text-blue-500" />
                      {event.participants} participants /{" "}
                      {event.maxParticipants}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12 md:hidden">
            <Button variant="outline" asChild>
              <Link href="/events">
                Voir tous les événements
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tout ce dont vous avez besoin pour organiser des événements
              mémorables
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simplifiez votre organisation d&apos;événements avec des outils
              puissants et intuitifs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-blue-100 rounded-2xl">
                    <feature.icon className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Explorez nos catégories
            </h2>
            <p className="text-xl text-gray-600">
              Trouvez exactement ce que vous cherchez parmi nos catégories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer border-0 shadow-sm"
              >
                <CardContent className="p-0">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-xl ${category.color}`}>
                      <category.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">
                        {category.name}
                      </h3>
                      <p className="text-gray-500">
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
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ce qu&apos;en disent nos utilisateurs
            </h2>
            <p className="text-xl text-gray-600">
              Découvrez comment EventConnect transforme l&apos;organisation
              d&apos;événements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card
                key={testimonial.id}
                className="p-8 border-0 shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardContent className="p-0">
                  <div className="flex items-center mb-6">
                    <Quote className="h-8 w-8 text-blue-500 mr-3" />
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed italic">
                    &quot;{testimonial.content}&quot;
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-blue-600 font-semibold text-sm">
                        {testimonial.avatar}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {testimonial.author}
                      </p>
                      <p className="text-gray-500 text-sm">
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
      <section className="py-20 bg-gradient-to-r from-blue-600 to-violet-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Prêt à organiser votre prochain événement ?
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Rejoignez des milliers d&apos;organisateurs et de participants qui
            font confiance à EventConnect pour créer des expériences mémorables.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* {!user && ( */}
            <>
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg"
                asChild
              >
                <Link href="/inscription">Créer un compte</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg"
                asChild
              >
                <Link href="/events">Découvrir les événements</Link>
              </Button>
            </>
            {/* )} */}
          </div>
        </div>
      </section>
    </div>
  );
}
