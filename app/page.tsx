"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  ArrowRight,
  Star,
  TrendingUp,
  Shield,
  Zap,
  Heart,
} from "lucide-react";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("recent");

  const featuredEvents = [
    {
      id: 1,
      title: "Conférence Tech 2024",
      category: "Technologie",
      location: "Paris, France",
      date: "15 Mars 2024",
      time: "14:00",
      participants: 45,
      maxParticipants: 100,
      image: "/images/tech-conference.jpg",
      price: "Gratuit",
    },
    {
      id: 2,
      title: "Meetup Développeurs",
      category: "Développement",
      location: "Lyon, France",
      date: "20 Mars 2024",
      time: "19:00",
      participants: 28,
      maxParticipants: 50,
      image: "/images/meetup.jpg",
      price: "15€",
    },
    {
      id: 3,
      title: "Atelier Design UX",
      category: "Design",
      location: "Bordeaux, France",
      date: "25 Mars 2024",
      time: "10:00",
      participants: 15,
      maxParticipants: 25,
      image: "/images/ux-workshop.jpg",
      price: "25€",
    },
  ];

  const categories = [
    { name: "Technologie", icon: "", count: 45 },
    { name: "Business", icon: "", count: 32 },
    { name: "Art & Culture", icon: "", count: 28 },
    { name: "Sport", icon: "⚽", count: 23 },
    { name: "Musique", icon: "", count: 19 },
    { name: "Gastronomie", icon: "🍽️", count: 15 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-blue-800/20 dark:from-blue-900/30 dark:via-purple-900/30 dark:to-blue-900/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Découvrez des{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                événements incroyables
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Rejoignez EventConnect et participez à des événements
              collaboratifs uniques. Créez des connexions, partagez vos passions
              et vivez des expériences mémorables.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link href="/events" className="flex items-center space-x-2">
                  <span>Explorer les événements</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 px-8 py-3 text-lg font-semibold rounded-xl transition-all duration-300"
              >
                <Link
                  href="/registration"
                  className="flex items-center space-x-2"
                >
                  <span>Créer un événement</span>
                  <Calendar className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Statistiques */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                500+
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                Événements créés
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                10K+
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                Participants
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                50+
              </div>
              <div className="text-gray-600 dark:text-gray-300">Villes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                4.8
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                Note moyenne
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Événements en vedette */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Événements en vedette
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Découvrez les événements les plus populaires et rejoignez une
              communauté passionnée
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredEvents.map((event) => (
              <Card
                key={event.id}
                className="group hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              >
                <div className="relative h-48 bg-gradient-to-br from-blue-400 to-purple-500 rounded-t-lg overflow-hidden">
                  <div className="absolute inset-0 bg-black/20"></div>
                  <Badge className="absolute top-4 left-4 bg-white/90 text-gray-800 dark:bg-gray-800/90 dark:text-white">
                    {event.category}
                  </Badge>
                  <Badge className="absolute top-4 right-4 bg-green-500 text-white">
                    {event.price}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {event.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300">
                    <div className="flex items-center space-x-2 mb-2">
                      <MapPin className="h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {event.date} à {event.time}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4" />
                      <span>
                        {event.participants}/{event.maxParticipants}{" "}
                        participants
                      </span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                    Rejoindre l'événement
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Catégories */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Explorez par catégorie
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Trouvez des événements qui correspondent à vos centres d'intérêt
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <Card
                key={category.name}
                className="text-center hover:shadow-lg transition-all duration-300 cursor-pointer bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600"
              >
                <CardContent className="p-6">
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {category.count} événements
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Fonctionnalités */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Pourquoi choisir EventConnect ?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Une plateforme complète pour tous vos besoins d'événements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Création rapide
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Créez et organisez vos événements en quelques minutes
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Communauté active
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Rejoignez une communauté passionnée et engagée
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Sécurisé et fiable
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Vos données et événements sont protégés
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Prêt à rejoindre l'aventure ?
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            Créez votre compte gratuitement et commencez à organiser des
            événements incroyables
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold rounded-xl"
            >
              <Link
                href="/registration"
                className="flex items-center space-x-2"
              >
                <span>Commencer maintenant</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 text-lg font-semibold rounded-xl"
            >
              <Link
                href="/comment-ca-marche"
                className="flex items-center space-x-2"
              >
                <span>En savoir plus</span>
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
