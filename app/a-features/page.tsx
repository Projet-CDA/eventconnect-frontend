import Image from "next/image";
import { Users, Star, Building2, Smile } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="bg-white min-h-screen">
      {/* Header */}
      <section className="text-center pt-20 pb-10">
        <h1 className="text-3xl font-bold mb-2">Notre mission</h1>
        <p className="text-gray-600 mb-6">
          Faciliter la création de liens et d’expériences mémorables à travers
          l’organisation d’événements
        </p>
        <div className="flex justify-center gap-4 mb-8">
          <button className="bg-black text-white px-5 py-2 rounded hover:bg-gray-800 transition">
            Rejoignez-nous
          </button>
          <button className="border border-gray-300 px-5 py-2 rounded hover:bg-gray-100 transition">
            Découvrez les événements
          </button>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-blue-50 py-10">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="flex justify-center mb-1 text-blue-600">
              <Users size={28} />
            </div>
            <div className="text-2xl font-bold">10k+</div>
            <div className="text-xs text-gray-500">Événements organisés</div>
          </div>
          <div>
            <div className="flex justify-center mb-1 text-blue-600">
              <Star size={28} />
            </div>
            <div className="text-2xl font-bold">50k+</div>
            <div className="text-xs text-gray-500">Utilisateurs actifs</div>
          </div>
          <div>
            <div className="flex justify-center mb-1 text-blue-600">
              <Building2 size={28} />
            </div>
            <div className="text-2xl font-bold">100+</div>
            <div className="text-xs text-gray-500">Villes couvertes</div>
          </div>
          <div>
            <div className="flex justify-center mb-1 text-blue-600">
              <Smile size={28} />
            </div>
            <div className="text-2xl font-bold">95%</div>
            <div className="text-xs text-gray-500">Taux de satisfaction</div>
          </div>
        </div>
      </section>

      {/* Histoire */}
      <section className="max-w-5xl mx-auto py-16 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-3">Notre Histoire</h2>
          <p className="text-gray-700 text-sm mb-2">
            Fondée en 2023, EventConnect est née d’une vision : simplifier
            l’organisation d’événements accessible à tous.
          </p>
          <p className="text-gray-700 text-sm mb-2">
            Notre équipe passionnée travaille chaque jour pour offrir la
            meilleure expérience possible pour nos utilisateurs, qu’ils soient
            organisateurs ou participants.
          </p>
          <p className="text-gray-700 text-sm mb-2">
            Aujourd’hui, nous sommes fiers de connecter des milliers de
            personnes à travers des événements qui créent du lien et du sens.
          </p>
        </div>
        <div className="flex-1 flex justify-center">
          <Image
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=640&h=640&q=80"
            alt="Bureau EventConnect"
            width={320}
            height={320}
            className="rounded-xl object-cover shadow-lg"
          />
        </div>
      </section>

      {/* Équipe */}
      <section className="bg-gray-50 py-14">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-xl font-semibold mb-2">Notre Équipe</h2>
          <p className="text-gray-600 mb-8">
            Des passionnés qui travaillent pour votre réussite
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-10">
            {/* Membre 1 */}
            <div className="flex flex-col items-center">
              <Image
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="Marie Laurent"
                width={80}
                height={80}
                className="rounded-full mb-2 object-cover"
              />
              <div className="font-medium">Marie Laurent</div>
              <div className="text-xs text-gray-500">CEO & Co-fondatrice</div>
            </div>
            {/* Membre 2 */}
            <div className="flex flex-col items-center">
              <Image
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Thomas Dubois"
                width={80}
                height={80}
                className="rounded-full mb-2 object-cover"
              />
              <div className="font-medium">Thomas Dubois</div>
              <div className="text-xs text-gray-500">CTO & Co-fondateur</div>
            </div>
            {/* Membre 3 */}
            <div className="flex flex-col items-center">
              <Image
                src="https://randomuser.me/api/portraits/women/65.jpg"
                alt="Sophie Martin"
                width={80}
                height={80}
                className="rounded-full mb-2 object-cover"
              />
              <div className="font-medium">Sophie Martin</div>
              <div className="text-xs text-gray-500">Directrice Marketing</div>
            </div>
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="max-w-4xl mx-auto py-16 text-center">
        <h2 className="text-xl font-semibold mb-2">Nos Valeurs</h2>
        <p className="text-gray-600 mb-8">
          Les principes qui guident nos actions au quotidien
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="font-semibold mb-1">Innovation</div>
            <div className="text-sm text-gray-500">
              Nous poussons constamment les limites pour offrir les meilleures
              solutions à nos utilisateurs.
            </div>
          </div>
          <div>
            <div className="font-semibold mb-1">Communauté</div>
            <div className="text-sm text-gray-500">
              Nous croyons en la force des connexions humaines et au partage
              d’expériences.
            </div>
          </div>
          <div>
            <div className="font-semibold mb-1">Excellence</div>
            <div className="text-sm text-gray-500">
              Nous visons l’excellence dans chaque aspect de notre service.
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
