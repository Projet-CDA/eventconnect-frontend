"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  FileText,
  Shield,
  AlertTriangle,
  Users,
  Calendar,
  Mail,
} from "lucide-react";

export default function ConditionsUtilisation() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <FileText className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Conditions d'Utilisation
          </h1>
          <p className="text-xl text-muted-foreground">
            Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
          </p>
        </div>

        <div className="space-y-8">
          {/* Introduction */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Introduction
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Bienvenue sur EventConnect. Ces conditions d'utilisation
                régissent votre utilisation de notre plateforme de gestion
                d'événements collaboratifs.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                En accédant à EventConnect, vous acceptez d'être lié par ces
                conditions. Si vous n'acceptez pas ces conditions, veuillez ne
                pas utiliser notre service.
              </p>
            </CardContent>
          </Card>

          {/* Définitions */}
          <Card>
            <CardHeader>
              <CardTitle>Définitions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <strong className="text-foreground">"Service"</strong> : La
                  plateforme EventConnect
                </div>
                <div>
                  <strong className="text-foreground">"Utilisateur"</strong> :
                  Toute personne utilisant le Service
                </div>
                <div>
                  <strong className="text-foreground">"Événement"</strong> :
                  Toute activité créée sur la plateforme
                </div>
                <div>
                  <strong className="text-foreground">"Contenu"</strong> : Toute
                  information publiée sur la plateforme
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Utilisation du service */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Utilisation du Service
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Vous pouvez utiliser EventConnect pour :
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                <li>Créer et organiser des événements</li>
                <li>Participer à des événements existants</li>
                <li>
                  Partager du contenu et interagir avec d'autres utilisateurs
                </li>
                <li>
                  Utiliser les fonctionnalités de recherche et de filtrage
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                Vous devez avoir au moins 13 ans pour utiliser le Service. Si
                vous avez moins de 18 ans, vous devez avoir l'autorisation de
                vos parents.
              </p>
            </CardContent>
          </Card>

          {/* Compte utilisateur */}
          <Card>
            <CardHeader>
              <CardTitle>Compte Utilisateur</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Pour utiliser certaines fonctionnalités, vous devez créer un
                compte. Vous êtes responsable de :
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                <li>Maintenir la confidentialité de vos identifiants</li>
                <li>Toutes les activités effectuées sous votre compte</li>
                <li>Fournir des informations exactes et à jour</li>
                <li>Notifier immédiatement toute utilisation non autorisée</li>
              </ul>
            </CardContent>
          </Card>

          {/* Règles de conduite */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Règles de Conduite
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Vous vous engagez à ne pas :
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                <li>Publier du contenu illégal, offensant ou inapproprié</li>
                <li>Harceler, intimider ou menacer d'autres utilisateurs</li>
                <li>
                  Utiliser le Service à des fins commerciales non autorisées
                </li>
                <li>Tenter de pirater ou de compromettre la sécurité</li>
                <li>Violer les droits de propriété intellectuelle</li>
                <li>Spammer ou envoyer du contenu non sollicité</li>
                <li>Utiliser des bots ou des scripts automatisés</li>
              </ul>
            </CardContent>
          </Card>

          {/* Contenu utilisateur */}
          <Card>
            <CardHeader>
              <CardTitle>Contenu Utilisateur</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Vous conservez vos droits sur le contenu que vous publiez. En
                publiant du contenu, vous :
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                <li>Nous accordez une licence d'utilisation mondiale</li>
                <li>Garantissez que vous avez les droits nécessaires</li>
                <li>
                  Acceptez que le contenu soit visible par d'autres utilisateurs
                </li>
                <li>Reconnaissez que nous pouvons modérer le contenu</li>
              </ul>
            </CardContent>
          </Card>

          {/* Propriété intellectuelle */}
          <Card>
            <CardHeader>
              <CardTitle>Propriété Intellectuelle</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                EventConnect et son contenu original sont protégés par les
                droits d'auteur, marques déposées et autres lois sur la
                propriété intellectuelle. Vous ne pouvez pas reproduire,
                distribuer ou créer des œuvres dérivées sans notre autorisation
                écrite.
              </p>
            </CardContent>
          </Card>

          {/* Limitation de responsabilité */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Limitation de Responsabilité
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                EventConnect est fourni "en l'état" sans garanties. Nous ne
                sommes pas responsables :
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                <li>Des dommages indirects ou accessoires</li>
                <li>De la perte de données ou d'informations</li>
                <li>Des actions des autres utilisateurs</li>
                <li>Des événements créés par les utilisateurs</li>
                <li>Des interruptions de service</li>
              </ul>
            </CardContent>
          </Card>

          {/* Résiliation */}
          <Card>
            <CardHeader>
              <CardTitle>Résiliation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Nous pouvons suspendre ou résilier votre compte à tout moment
                pour violation de ces conditions. Vous pouvez également
                supprimer votre compte à tout moment via les paramètres de votre
                profil.
              </p>
            </CardContent>
          </Card>

          {/* Modifications */}
          <Card>
            <CardHeader>
              <CardTitle>Modifications des Conditions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Nous nous réservons le droit de modifier ces conditions à tout
                moment. Les modifications prendront effet immédiatement après
                leur publication. Votre utilisation continue du Service
                constitue votre acceptation des nouvelles conditions.
              </p>
            </CardContent>
          </Card>

          {/* Droit applicable */}
          <Card>
            <CardHeader>
              <CardTitle>Droit Applicable</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Ces conditions sont régies par le droit français. Tout litige
                sera soumis à la compétence exclusive des tribunaux français.
              </p>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle>Nous Contacter</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Pour toute question concernant ces conditions d'utilisation :
              </p>
              <div className="space-y-2">
                <p className="text-muted-foreground">
                  <strong>E-mail :</strong>{" "}
                  <a
                    href="mailto:legal@eventconnect.fr"
                    className="text-primary hover:underline"
                  >
                    legal@eventconnect.fr
                  </a>
                </p>
                <p className="text-muted-foreground">
                  <strong>Adresse :</strong> EventConnect, Paris, France
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
