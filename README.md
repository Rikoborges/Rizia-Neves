# Rizia Neves – Site Vitrine

Site vitrine pour **Rizia Neves**, spécialiste en tresses africaines à Valence (Drôme, France).

---

## Aperçu

Site one-page en HTML/CSS/JS pur, sans framework ni dépendances externes.  
Conçu pour être rapide, accessible et bien référencé localement sur Google.

---

## Structure des fichiers

```
rizia-neves/
├── index.html          # Page principale
├── style.css           # Styles (variables CSS, responsive)
├── script.js           # Menu burger, modal RGPD, bandeau cookies
├── sitemap.xml         # Pour Google Search Console
├── robots.txt          # Instructions aux robots d'indexation
└── images/
    ├── rizia.webp      # Photo hero (section principale)
    ├── Tresse classique.webp
    ├── Cotidiane.webp
    ├── tresse decore.webp
    └── Tranca.webp
```

---

## Sections du site

| Section | Description |
|---|---|
| **Hero** | Photo plein écran avec titre et bouton WhatsApp |
| **À propos** | Présentation + statistiques (6 ans, 100+ clientes, 98%) |
| **Galerie** | 3 modèles de tresses avec photos |
| **Services** | Tresses individuelles, box braids, coiffures personnalisées |
| **Contact** | Boutons WhatsApp et Instagram |
| **Footer** | Liens sociaux + lien politique de confidentialité |

---

## Contacts & Réseaux

- **WhatsApp** : +33 7 45 55 34 61
- **Instagram** : [@rizianeves92](https://www.instagram.com/rizianeves92/)

---

## SEO Local

Le site est optimisé pour les recherches locales à Valence :

- Balises `<title>` et `<meta description>` avec mots-clés ciblés
- Données structurées **Schema.org** (`HairSalon`) pour la fiche Google
- Balises de géolocalisation (Drôme, 26000)
- **Open Graph** pour les partages WhatsApp / Facebook
- `sitemap.xml` et `robots.txt` inclus

### Après mise en ligne

1. Créer une fiche **Google Business Profile** → [business.google.com](https://business.google.com)
2. Soumettre le sitemap dans **Google Search Console** → [search.google.com/search-console](https://search.google.com/search-console)
3. Demander aux clientes de laisser un **avis Google**

---

## RGPD

Une modale de politique de confidentialité est intégrée, accessible depuis le footer.  
Un bandeau d'information cookies s'affiche à la première visite (mémorisé via `localStorage`).

---

## Modifications rapides

### Changer le numéro WhatsApp
Dans `index.html`, remplacer toutes les occurrences de `33745553461` par le nouveau numéro (format international sans `+` ni espaces).

### Changer la photo hero
Remplacer le fichier `images/rizia.webp` en gardant le même nom, ou modifier la ligne dans `style.css` :
```css
background-image: ..., url('/images/rizia.webp');
```

### Ajuster la position de la photo hero (desktop)
Dans `style.css`, modifier la valeur de `background-position` dans `.hero` :
```css
background-position: center 10%; /* 0% = tout en haut, 50% = centre */
```

---

## Compatibilité

- Navigateurs modernes (Chrome, Firefox, Safari, Edge)
- Responsive : mobile, tablette, desktop
- Pas de JavaScript requis pour la navigation de base
