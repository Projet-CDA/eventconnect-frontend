"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { ArrowRight } from "lucide-react";

export default function CommentCaMarchePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col items-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-2 mt-4">
          Comment fonctionne EventConnect&nbsp;?
        </h1>
        <p className="text-gray-600 text-center max-w-xl mb-6">
          Découvrez comment notre plateforme simplifie l&apos;organisation et la
          participation à des événements collaboratifs.
        </p>
        <Button asChild className="mb-8">
          <Link href="/inscription">Commencer maintenant</Link>
        </Button>
      </header>

      {/* Steps */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Step 1 */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="flex-1 order-2 md:order-1">
            <h2 className="text-lg font-semibold mb-2">
              1. Créez votre compte
            </h2>
            <p className="text-gray-600 mb-2">
              Inscrivez-vous gratuitement en quelques clics et personnalisez
              votre profil pour commencer à organiser ou participer à des
              événements.
            </p>
          </div>
          <div className="flex-1 order-1 md:order-2">
            <img
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80"
              alt="Créer un compte"
              className="rounded-lg shadow-md w-full object-cover h-56 md:h-64"
            />
          </div>
        </div>
        {/* Step 2 */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="flex-1">
            <img
              src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80"
              alt="Explorer ou créer des événements"
              className="rounded-lg shadow-md w-full object-cover h-56 md:h-64"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold mb-2">
              2. Explorez ou créez des événements
            </h2>
            <p className="text-gray-600 mb-2">
              Parcourez les événements disponibles ou créez le vôtre. Ajoutez
              tous les détails nécessaires&nbsp;: description, date, lieu,
              capacité.
            </p>
          </div>
        </div>
        {/* Step 3 */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="flex-1 order-2 md:order-1">
            <h2 className="text-lg font-semibold mb-2">
              3. Gérez et participez
            </h2>
            <p className="text-gray-600 mb-2">
              Invitez des participants, communiquez avec eux, et profitez
              d&apos;outils de gestion simples et efficaces pour vos événements.
            </p>
            <Button asChild variant="outline" className="mt-2">
              <Link href="/events">
                Explorer les événements <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="flex-1 order-1 md:order-2">
            <img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
              alt="Gérer et participer"
              className="rounded-lg shadow-md w-full object-cover h-56 md:h-64"
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-xl font-bold text-center mb-8">
          Questions fréquentes
        </h2>
        <Accordion type="single" collapsible className="space-y-2">
          <AccordionItem value="q1">
            <AccordionTrigger>
              Est-ce gratuit d&apos;utiliser EventConnect&nbsp;?
            </AccordionTrigger>
            <AccordionContent>
              Oui, l&apos;inscription et l&apos;utilisation de base de la
              plateforme sont entièrement gratuites. Des options premium sont
              disponibles pour les organisateurs qui souhaitent des
              fonctionnalités avancées.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q2">
            <AccordionTrigger>
              Comment puis-je organiser mon premier événement&nbsp;?
            </AccordionTrigger>
            <AccordionContent>
              Après votre inscription, cliquez sur &quot;Créer un
              événement&quot;, renseignez les informations nécessaires et
              publiez. Notre interface intuitive vous guide à chaque étape.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q3">
            <AccordionTrigger>
              Puis-je modifier mon événement après sa publication&nbsp;?
            </AccordionTrigger>
            <AccordionContent>
              Oui, vous pouvez modifier les détails de votre événement à tout
              moment. Les participants seront automatiquement notifiés des
              changements importants.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </main>
  );
}
