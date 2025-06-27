"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Building, Mail, MapPin, Phone, Globe, FileText } from "lucide-react";

export default function MentionsLegales() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Building className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Mentions Légales
          </h1>
          <p className="text-xl text-muted-foreground">
            Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
          </p>
        </div>

        <div className="space-y-8">
          {/* Éditeur */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Éditeur du Site
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <strong className="text-foreground">Raison sociale :</strong>{" "}
                  EventConnect
                </div>
                <div>
                  <strong className="text-foreground">Forme juridique :</strong>{" "}
                  Société par actions simplifiée (SAS)
                </div>
                <div>
                  <strong className="text-foreground">Capital social :</strong>{" "}
                  10 000 €
                </div>
                <div>
                  <strong className="text-foreground">Siège social :</strong>{" "}
                  123 Rue de la Paix, 75001 Paris, France
                </div>
                <div>
                  <strong className="text-foreground">SIRET :</strong> 123 456
                  789 00012
                </div>
                <div>
                  <strong className="text-foreground">
                    TVA intracommunautaire :
                  </strong>{" "}
                  FR12345678901
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Coordonnées
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  <span>
                    <strong>E-mail :</strong>{" "}
                    <a
                      href="mailto:contact@eventconnect.fr"
                      className="text-primary hover:underline"
                    >
                      contact@eventconnect.fr
                    </a>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" />
                  <span>
                    <strong>Téléphone :</strong> +33 1 23 45 67 89
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>
                    <strong>Adresse :</strong> 123 Rue de la Paix, 75001 Paris,
                    France
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-primary" />
                  <span>
                    <strong>Site web :</strong>{" "}
                    <a
                      href="https://eventconnect.fr"
                      className="text-primary hover:underline"
                    >
                      https://eventconnect.fr
                    </a>
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Directeur de publication */}
          <Card>
            <CardHeader>
              <CardTitle>Directeur de Publication</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                <strong>Nom :</strong> Jean Dupont
                <br />
                <strong>Fonction :</strong> Directeur Général
                <br />
                <strong>E-mail :</strong>{" "}
                <a
                  href="mailto:directeur@eventconnect.fr"
                  className="text-primary hover:underline"
                >
                  directeur@eventconnect.fr
                </a>
              </p>
            </CardContent>
          </Card>

          {/* Hébergement */}
          <Card>
            <CardHeader>
              <CardTitle>Hébergement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <strong className="text-foreground">Hébergeur :</strong>{" "}
                  Vercel Inc.
                </div>
                <div>
                  <strong className="text-foreground">Adresse :</strong> 340 S
                  Lemon Ave #4133, Walnut, CA 91789, États-Unis
                </div>
                <div>
                  <strong className="text-foreground">Site web :</strong>{" "}
                  <a
                    href="https://vercel.com"
                    className="text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://vercel.com
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Propriété intellectuelle */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Propriété Intellectuelle
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                L'ensemble de ce site relève de la législation française et
                internationale sur le droit d'auteur et la propriété
                intellectuelle. Tous les droits de reproduction sont réservés, y
                compris pour les documents téléchargeables et les
                représentations iconographiques et photographiques.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                La reproduction de tout ou partie de ce site sur un support
                électronique quel qu'il soit est formellement interdite sauf
                autorisation expresse du directeur de la publication.
              </p>
            </CardContent>
          </Card>

          {/* Responsabilité */}
          <Card>
            <CardHeader>
              <CardTitle>Responsabilité</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Les informations contenues sur ce site sont aussi précises que
                possible et le site est périodiquement remis à jour, mais peut
                toutefois contenir des inexactitudes, des omissions ou des
                lacunes.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Si vous constatez une lacune, erreur ou ce qui parait être un
                dysfonctionnement, merci de bien vouloir le signaler par e-mail
                à l'adresse{" "}
                <a
                  href="mailto:contact@eventconnect.fr"
                  className="text-primary hover:underline"
                >
                  contact@eventconnect.fr
                </a>
                , en décrivant le problème de la manière la plus précise
                possible.
              </p>
            </CardContent>
          </Card>

          {/* Liens hypertextes */}
          <Card>
            <CardHeader>
              <CardTitle>Liens Hypertextes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Les liens hypertextes mis en place dans le cadre du présent site
                web en direction d'autres ressources présentes sur le réseau
                Internet ne sauraient engager la responsabilité d'EventConnect.
              </p>
            </CardContent>
          </Card>

          {/* Cookies */}
          <Card>
            <CardHeader>
              <CardTitle>Cookies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Le site peut-être amené à vous demander l'acceptation des
                cookies pour des besoins de statistiques et d'affichage. Un
                cookie ne nous permet pas de vous identifier ; il sert
                uniquement à enregistrer des informations relatives à la
                navigation de votre ordinateur sur notre site.
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
                Tout litige en relation avec l'utilisation du site{" "}
                <a
                  href="https://eventconnect.fr"
                  className="text-primary hover:underline"
                >
                  eventconnect.fr
                </a>{" "}
                est soumis au droit français. En dehors des cas où la loi ne le
                permet pas, il est fait attribution exclusive de juridiction aux
                tribunaux compétents de Paris.
              </p>
            </CardContent>
          </Card>

          {/* CNIL */}
          <Card>
            <CardHeader>
              <CardTitle>
                Commission Nationale de l'Informatique et des Libertés (CNIL)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Conformément aux dispositions de la loi n° 78-17 du 6 janvier
                1978 modifiée, vous disposez d'un droit d'accès, de modification
                et de suppression des données qui vous concernent. Pour exercer
                ce droit, adressez-vous à :
              </p>
              <div className="space-y-2">
                <p className="text-muted-foreground">
                  <strong>EventConnect</strong>
                  <br />
                  123 Rue de la Paix
                  <br />
                  75001 Paris, France
                  <br />
                  E-mail :{" "}
                  <a
                    href="mailto:privacy@eventconnect.fr"
                    className="text-primary hover:underline"
                  >
                    privacy@eventconnect.fr
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
