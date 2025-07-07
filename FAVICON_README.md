# Configuration des Favicons - EventConnect

Ce projet utilise Next.js 13+ avec l'App Router pour gérer automatiquement les favicons et les icônes de l'application.

## Fichiers créés

### Icônes générées dynamiquement

- `app/icon.tsx` - Favicon principal (32x32)
- `app/apple-icon.tsx` - Apple Touch Icon (180x180)
- `app/icon-192.tsx` - Icône PWA (192x192)
- `app/icon-512.tsx` - Icône PWA (512x512)

### Configuration

- `app/layout.tsx` - Métadonnées des icônes mises à jour
- `public/manifest.json` - Configuration PWA
- `app/favicon.ico` - Fichier ICO (à remplacer par une vraie image)

## Personnalisation

### 1. Changer les couleurs

Modifiez le gradient dans chaque fichier d'icône :

```tsx
background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
```

### 2. Changer le texte

Remplacez "EC" par votre logo ou texte dans chaque fichier d'icône.

### 3. Utiliser une image personnalisée

Si vous voulez utiliser une image au lieu du texte généré :

1. Placez votre image dans le dossier `public/`
2. Modifiez les fichiers d'icônes pour utiliser `ImageResponse` avec une image :

```tsx
import { ImageResponse } from "next/og";

export default function Icon() {
  return new ImageResponse(
    (
      <img
        src="https://votre-domaine.com/votre-logo.png"
        alt="EventConnect"
        style={{ width: "100%", height: "100%" }}
      />
    ),
    { ...size }
  );
}
```

### 4. Remplacer le favicon.ico

Le fichier `app/favicon.ico` doit être remplacé par une vraie image ICO :

- Taille recommandée : 16x16, 32x32, ou 48x48 pixels
- Outils en ligne : https://realfavicongenerator.net/, https://favicon.io/

## URLs des icônes

Une fois le projet déployé, les icônes seront disponibles aux URLs suivantes :

- `/icon.png` - Favicon principal
- `/apple-icon.png` - Apple Touch Icon
- `/icon-192.png` - Icône PWA 192x192
- `/icon-512.png` - Icône PWA 512x512
- `/favicon.ico` - Favicon ICO

## Support des navigateurs

- **Chrome, Firefox, Safari** : Utilisent `/icon.png` et `/favicon.ico`
- **iOS Safari** : Utilise `/apple-icon.png`
- **Android Chrome** : Utilise les icônes du manifest.json pour l'installation PWA

## Déploiement

Les icônes sont générées automatiquement par Next.js lors du build. Assurez-vous que votre plateforme de déploiement supporte le runtime Edge pour la génération d'images.
