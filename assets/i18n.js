/* ============================================================
   cre8yourself — Mehrsprachigkeit (DE / EN / FR / ES)
   - Deutsch ist die Original-/Fallback-Sprache (steht im HTML).
   - Auto-Erkennung über Browser-/Gerätesprache, Fallback Englisch.
   - Auswahl wird in localStorage gemerkt.
   - Die 42 Designs werden per Bild-Dateiname (Basename) übersetzt,
     damit das HTML der Galerie unangetastet bleibt.
   ============================================================ */
(function () {
  'use strict';

  var SUPPORTED = ['de', 'en', 'fr', 'es'];
  var FALLBACK  = 'en'; // wenn die Landessprache nicht verfügbar ist

  /* ---------- Seiten-Meta (Title + Description) ---------- */
  var META = {
    de: {
      title: 'cre8yourself — One-Line & Linien-Designs für Shirts, Hoodies & mehr',
      desc:  'Alle 42 Designs von cre8yourself auf einen Blick: minimalistische One-Line- und Linien-Motive – Monstera, Bialetti-Espresso, Rennrad, Sonne & mehr – in Schwarz, Weiß und Regenbogen. Auf T-Shirts, Hoodies, Stickern & Tassen.'
    },
    en: {
      title: 'cre8yourself — one-line & line-art designs for shirts, hoodies & more',
      desc:  'All 42 cre8yourself designs at a glance: minimalist one-line and line-art motifs – monstera, Bialetti espresso, road bike, sun & more – in black, white and rainbow. On T-shirts, hoodies, stickers & mugs.'
    },
    fr: {
      title: 'cre8yourself — designs une ligne & art linéaire pour t-shirts, hoodies & plus',
      desc:  'Les 42 designs de cre8yourself en un coup d’œil : motifs minimalistes une ligne et art linéaire – monstera, espresso Bialetti, vélo de route, soleil & plus – en noir, blanc et arc-en-ciel. Sur t-shirts, hoodies, stickers & mugs.'
    },
    es: {
      title: 'cre8yourself — diseños de una línea y arte lineal para camisetas, sudaderas y más',
      desc:  'Los 42 diseños de cre8yourself de un vistazo: motivos minimalistas de una línea y arte lineal – monstera, espresso Bialetti, bici de carreras, sol y más – en negro, blanco y arcoíris. En camisetas, sudaderas, pegatinas y tazas.'
    }
  };

  /* ---------- UI-Texte (DE bleibt als Original im HTML) ---------- */
  var UI = {
    en: {
      'nav.designs': 'Designs',
      'nav.how': 'How it works',
      'nav.shop': 'Shop',
      'hero.eyebrow': 'One-line · Line art · Print on demand',
      'hero.title': 'Clean lines.<br><span class="grad">Bold designs.</span>',
      'hero.lead': 'Hand-drawn one-line and line-art motifs – plants, coffee, cycling and more – in black, white and rainbow. On T-shirts, hoodies, stickers, mugs and more. Pick your favourite motif and put it on the product of your choice in the shop.',
      'cta.toShop': 'Go to shop',
      'hero.ctaDesigns': 'View designs',
      'coll.eyebrow': 'The collection',
      'coll.title': 'All 42 designs at a glance',
      'coll.sub': 'Every motif is available as a print for T-shirts, hoodies, mugs, stickers and more. Click a design to put it on the product of your choice in the shop.',
      'grp.plants': 'Plants & Urban Jungle',
      'grp.plants.sub': 'Botanical monstera and leaf motifs for the urban-jungle look.',
      'grp.coffee': 'Coffee & Espresso',
      'grp.coffee.sub': 'Bialetti, moka pot & co. for everyone who can’t start without coffee.',
      'grp.cycling': 'Cycling & Road Bikes',
      'grp.cycling.sub': 'Road-bike motifs for roadbike fans and frequent riders.',
      'grp.sky': 'Sky, Space & Nature',
      'grp.sky.sub': 'Sun, stars, rockets and mountains as fine line art.',
      'how.eyebrow': 'How it works',
      'how.title': 'From idea to favourite piece',
      'step1.title': 'Discover',
      'step1.desc': 'Find a motif you like here in the gallery.',
      'step2.title': 'Choose product',
      'step2.desc': 'In the shop you put the design on the product you want – shirt, hoodie, mug, sticker.',
      'step3.title': 'Order',
      'step3.desc': 'It’s printed to order for you and delivered straight to your door.',
      'shop.eyebrow': 'Where to buy',
      'shop.title': 'My shop',
      'shop.sub': 'All designs are bundled in my shop – in every colour and on every product. Sales, printing and shipping are handled by <strong>Spreadshirt</strong>.',
      'footer.note': 'Minimalist one-line & line-art designs as print on demand. Sales, printing & shipping are handled by Spreadshirt.'
    },
    fr: {
      'nav.designs': 'Designs',
      'nav.how': 'Comment ça marche',
      'nav.shop': 'Boutique',
      'hero.eyebrow': 'Une ligne · Art linéaire · Impression à la demande',
      'hero.title': 'Lignes claires.<br><span class="grad">Designs forts.</span>',
      'hero.lead': 'Des motifs dessinés à la main en une ligne et en art linéaire – plantes, café, cyclisme et plus – en noir, blanc et arc-en-ciel. Sur t-shirts, hoodies, stickers, mugs et plus. Choisis ton motif préféré et personnalise-le sur le produit de ton choix dans la boutique.',
      'cta.toShop': 'Voir la boutique',
      'hero.ctaDesigns': 'Voir les designs',
      'coll.eyebrow': 'La collection',
      'coll.title': 'Les 42 designs en un coup d’œil',
      'coll.sub': 'Chaque motif est disponible en impression sur t-shirts, hoodies, mugs, stickers et plus. Clique sur un design pour le personnaliser sur le produit de ton choix dans la boutique.',
      'grp.plants': 'Plantes & Urban Jungle',
      'grp.plants.sub': 'Des motifs botaniques de monstera et de feuilles pour un look urban jungle.',
      'grp.coffee': 'Café & Espresso',
      'grp.coffee.sub': 'Bialetti, cafetière moka & co. pour tous ceux qui ne démarrent pas sans café.',
      'grp.cycling': 'Cyclisme & Vélo de route',
      'grp.cycling.sub': 'Des motifs de vélo de route pour les passionnés de roadbike et les grands rouleurs.',
      'grp.sky': 'Ciel, Espace & Nature',
      'grp.sky.sub': 'Soleil, étoiles, fusées et montagnes en art linéaire fin.',
      'how.eyebrow': 'Comment ça marche',
      'how.title': 'De l’idée au vêtement préféré',
      'step1.title': 'Découvrir',
      'step1.desc': 'Trouve un motif qui te plaît ici dans la galerie.',
      'step2.title': 'Choisir le produit',
      'step2.desc': 'Dans la boutique, tu places le design sur le produit voulu – t-shirt, hoodie, mug, sticker.',
      'step3.title': 'Commander',
      'step3.desc': 'Il est imprimé à la commande pour toi et livré directement chez toi.',
      'shop.eyebrow': 'Où acheter',
      'shop.title': 'Ma boutique',
      'shop.sub': 'Tous les designs sont réunis dans ma boutique – dans toutes les couleurs et sur tous les produits. La vente, l’impression et l’expédition sont assurées par <strong>Spreadshirt</strong>.',
      'footer.note': 'Designs minimalistes en une ligne & art linéaire, en impression à la demande. Vente, impression & expédition par Spreadshirt.'
    },
    es: {
      'nav.designs': 'Diseños',
      'nav.how': 'Cómo funciona',
      'nav.shop': 'Tienda',
      'hero.eyebrow': 'Una línea · Arte lineal · Impresión bajo demanda',
      'hero.title': 'Líneas claras.<br><span class="grad">Diseños potentes.</span>',
      'hero.lead': 'Motivos dibujados a mano de una línea y arte lineal – plantas, café, ciclismo y más – en negro, blanco y arcoíris. En camisetas, sudaderas, pegatinas, tazas y más. Elige tu motivo favorito y ponlo en el producto que quieras en la tienda.',
      'cta.toShop': 'Ir a la tienda',
      'hero.ctaDesigns': 'Ver diseños',
      'coll.eyebrow': 'La colección',
      'coll.title': 'Los 42 diseños de un vistazo',
      'coll.sub': 'Cada motivo está disponible como estampado para camisetas, sudaderas, tazas, pegatinas y más. Haz clic en un diseño para ponerlo en el producto que quieras en la tienda.',
      'grp.plants': 'Plantas & Urban Jungle',
      'grp.plants.sub': 'Motivos botánicos de monstera y hojas para el look urban jungle.',
      'grp.coffee': 'Café & Espresso',
      'grp.coffee.sub': 'Bialetti, cafetera moka y compañía para quienes no arrancan sin café.',
      'grp.cycling': 'Ciclismo & Bici de carreras',
      'grp.cycling.sub': 'Motivos de bici de carreras para fans del roadbike y ciclistas habituales.',
      'grp.sky': 'Cielo, Espacio & Naturaleza',
      'grp.sky.sub': 'Sol, estrellas, cohetes y montañas en fino arte lineal.',
      'how.eyebrow': 'Cómo funciona',
      'how.title': 'De la idea a tu prenda favorita',
      'step1.title': 'Descubrir',
      'step1.desc': 'Encuentra aquí en la galería un motivo que te guste.',
      'step2.title': 'Elegir producto',
      'step2.desc': 'En la tienda pones el diseño en el producto que quieras: camiseta, sudadera, taza, pegatina.',
      'step3.title': 'Pedir',
      'step3.desc': 'Se imprime bajo pedido para ti y se entrega directamente en tu casa.',
      'shop.eyebrow': 'Dónde comprar',
      'shop.title': 'Mi tienda',
      'shop.sub': 'Todos los diseños están reunidos en mi tienda, en todos los colores y en todos los productos. La venta, impresión y envío los gestiona <strong>Spreadshirt</strong>.',
      'footer.note': 'Diseños minimalistas de una línea y arte lineal, en impresión bajo demanda. Venta, impresión y envío a cargo de Spreadshirt.'
    }
  };

  /* ---------- Farb-Badges (nach CSS-Klasse) ---------- */
  var BADGE = {
    de: { rainbow: 'Regenbogen', black: 'Schwarz', white: 'Weiß',  green: 'Grün',  line: 'Linienkunst' },
    en: { rainbow: 'Rainbow',    black: 'Black',    white: 'White', green: 'Green', line: 'Line art' },
    fr: { rainbow: 'Arc-en-ciel', black: 'Noir',    white: 'Blanc', green: 'Vert',  line: 'Art linéaire' },
    es: { rainbow: 'Arcoíris',   black: 'Negro',    white: 'Blanco', green: 'Verde', line: 'Arte lineal' }
  };

  /* ---------- CTA in Kachel & Vorschau ---------- */
  var CTA = {
    de: 'Im Shop gestalten →',
    en: 'Customize in the shop →',
    fr: 'Personnaliser dans la boutique →',
    es: 'Personalizar en la tienda →'
  };

  /* ---------- Wiederkehrende Beschreibungen ---------- */
  var MON = {
    en: 'Minimalist monstera-leaf motif in a trendy botanical look. Perfect for plant lovers, interior fans and anyone who wants to wear the urban-jungle style on T-shirts, hoodies or bags.',
    fr: 'Motif de feuille de monstera minimaliste au look botanique tendance. Idéal pour les amoureux des plantes, les fans de déco et tous ceux qui veulent porter le style urban jungle sur t-shirts, hoodies ou sacs.',
    es: 'Motivo minimalista de hoja de monstera con un look botánico de moda. Ideal para amantes de las plantas, fans de la decoración y todos los que quieren llevar el estilo urban jungle en camisetas, sudaderas o bolsas.'
  };
  var CYC = {
    en: 'Stylish road-bike motif in a clean line look. A great gift for road racers, triathletes and anyone who loves their bike more than their car and turns every ride into a new personal best.',
    fr: 'Motif de vélo de route stylé au look linéaire épuré. Idéal comme cadeau pour les coureurs cyclistes, les triathlètes et tous ceux qui aiment leur vélo plus que leur voiture et font de chaque sortie un nouveau record.',
    es: 'Motivo de bici de carreras con un look lineal limpio. Un regalo ideal para ciclistas de carretera, triatletas y todos los que quieren su bici más que su coche y convierten cada salida en un nuevo récord.'
  };
  var BIA = {
    en: 'Stylised Bialetti motif in a retro look for cappuccino and espresso fans. An ideal gift for coffee nerds, café regulars and everyone who can’t start the day without a moka pot.',
    fr: 'Motif Bialetti stylisé au look rétro pour les fans de cappuccino et d’espresso. Cadeau idéal pour les passionnés de café, les habitués des cafés et tous ceux qui ne démarrent pas la journée sans cafetière moka.',
    es: 'Motivo Bialetti estilizado con look retro para fans del capuchino y el espresso. Regalo ideal para amantes del café, clientes de cafeterías y todos los que no arrancan el día sin una cafetera moka.'
  };

  /* ---------- Designs je Bild-Basename ---------- */
  var DESIGN = {
    /* --- Pflanzen --- */
    'mp-359351489': { en: { n: 'Monstera Rainbow Line Art', d: 'Monstera leaf as a minimalist one-line drawing in rainbow colours. For plant lovers and Pride fans. Urban-jungle style on T-shirt, hoodie, mug and more.' },
                      fr: { n: 'Monstera Arc-en-ciel Art Linéaire', d: 'Feuille de monstera en dessin minimaliste d’une seule ligne aux couleurs arc-en-ciel. Pour les amoureux des plantes et les fans de la Pride. Style urban jungle sur t-shirt, hoodie, mug et plus.' },
                      es: { n: 'Monstera Arcoíris Arte Lineal', d: 'Hoja de monstera como dibujo minimalista de una sola línea en colores arcoíris. Para amantes de las plantas y fans del Orgullo. Estilo urban jungle en camiseta, sudadera, taza y más.' } },
    'mp-359351310': { en: { n: 'Monstera Rainbow Filled', d: 'Monstera leaf in bold rainbow colours, modern and vibrant. For plant lovers and Pride fans. Urban-jungle style on T-shirt, hoodie, mug and more.' },
                      fr: { n: 'Monstera Arc-en-ciel Plein', d: 'Feuille de monstera aux couleurs arc-en-ciel vives, moderne et colorée. Pour les amoureux des plantes et les fans de la Pride. Style urban jungle sur t-shirt, hoodie, mug et plus.' },
                      es: { n: 'Monstera Arcoíris Relleno', d: 'Hoja de monstera en intensos colores arcoíris, moderna y llena de color. Para amantes de las plantas y fans del Orgullo. Estilo urban jungle en camiseta, sudadera, taza y más.' } },
    'mp-359342966': { en: { n: 'Monstera Leaf Filled Black', d: 'Monstera leaf as a bold black silhouette in a botanical look. A stylish statement for plant lovers, interior fans and the urban-jungle style. On shirt, hoodie and more.' },
                      fr: { n: 'Feuille de Monstera Pleine Noire', d: 'Feuille de monstera en silhouette noire affirmée au look botanique. Une déclaration stylée pour les amoureux des plantes, les fans de déco et le style urban jungle. Sur t-shirt, hoodie et plus.' },
                      es: { n: 'Hoja de Monstera Rellena Negra', d: 'Hoja de monstera como silueta negra contundente con look botánico. Una declaración con estilo para amantes de las plantas, fans de la decoración y el estilo urban jungle. En camiseta, sudadera y más.' } },
    'mp-359342915': { en: { n: 'Monstera Dark Green', d: 'Monstera leaf in rich dark green, natural and striking. For plant lovers and urban-jungle fans. A favourite botanical motif on T-shirt, hoodie, mug and more.' },
                      fr: { n: 'Monstera Vert Foncé', d: 'Feuille de monstera en vert foncé profond, naturelle et percutante. Pour les amoureux des plantes et les fans d’urban jungle. Motif botanique préféré sur t-shirt, hoodie, mug et plus.' },
                      es: { n: 'Monstera Verde Oscuro', d: 'Hoja de monstera en verde oscuro intenso, natural y llamativa. Para amantes de las plantas y fans del urban jungle. Motivo botánico favorito en camiseta, sudadera, taza y más.' } },
    'mp-359343001': { en: { n: 'Monstera Line Art Black', d: MON.en }, fr: { n: 'Monstera Art Linéaire Noir', d: MON.fr }, es: { n: 'Monstera Arte Lineal Negro', d: MON.es } },
    'mp-356516169': { en: { n: 'Monstera Line Art White', d: MON.en }, fr: { n: 'Monstera Art Linéaire Blanc', d: MON.fr }, es: { n: 'Monstera Arte Lineal Blanco', d: MON.es } },
    'mp-356516254': { en: { n: 'Monstera Leaf White', d: MON.en }, fr: { n: 'Feuille de Monstera Blanche', d: MON.fr }, es: { n: 'Hoja de Monstera Blanca', d: MON.es } },
    'mp-356516255': { en: { n: 'Monstera in Pot White', d: MON.en }, fr: { n: 'Monstera en Pot Blanc', d: MON.fr }, es: { n: 'Monstera en Maceta Blanco', d: MON.es } },
    'mp-356505975': { en: { n: 'Monstera Two Leaves White', d: MON.en }, fr: { n: 'Monstera Deux Feuilles Blanc', d: MON.fr }, es: { n: 'Monstera Dos Hojas Blanco', d: MON.es } },
    'mp-356506061': { en: { n: 'Palm Leaf Line Art White', d: 'Tropical palm leaf as a minimalist one-line drawing in white, ideal for dark shirts. A botanical motif for plant lovers and urban-jungle fans. On T-shirt, hoodie and mug.' },
                      fr: { n: 'Feuille de Palmier Art Linéaire Blanc', d: 'Feuille de palmier tropicale en dessin minimaliste d’une seule ligne en blanc, idéale pour les t-shirts foncés. Motif botanique pour les amoureux des plantes et les fans d’urban jungle. Sur t-shirt, hoodie et mug.' },
                      es: { n: 'Hoja de Palmera Arte Lineal Blanco', d: 'Hoja de palmera tropical como dibujo minimalista de una sola línea en blanco, ideal para camisetas oscuras. Motivo botánico para amantes de las plantas y fans del urban jungle. En camiseta, sudadera y taza.' } },
    'mp-356506009': { en: { n: 'Monstera One Line White', d: MON.en }, fr: { n: 'Monstera Une Ligne Blanc', d: MON.fr }, es: { n: 'Monstera Una Línea Blanco', d: MON.es } },
    'mp-335812829': { en: { n: 'Monstera in Pot Black', d: MON.en }, fr: { n: 'Monstera en Pot Noir', d: MON.fr }, es: { n: 'Monstera en Maceta Negro', d: MON.es } },
    'mp-335692167': { en: { n: 'Monstera Leaf Black', d: MON.en }, fr: { n: 'Feuille de Monstera Noire', d: MON.fr }, es: { n: 'Hoja de Monstera Negra', d: MON.es } },
    'mp-335692108': { en: { n: 'Monstera Two Leaves Black', d: MON.en }, fr: { n: 'Monstera Deux Feuilles Noir', d: MON.fr }, es: { n: 'Monstera Dos Hojas Negro', d: MON.es } },
    'mp-330992747': { en: { n: 'Monstera One Line Black', d: MON.en }, fr: { n: 'Monstera Une Ligne Noir', d: MON.fr }, es: { n: 'Monstera Una Línea Negro', d: MON.es } },
    'mp-330992748': { en: { n: 'Monstera Black', d: MON.en }, fr: { n: 'Monstera Noir', d: MON.fr }, es: { n: 'Monstera Negro', d: MON.es } },
    'mp-322089233': { en: { n: 'Monstera', d: MON.en }, fr: { n: 'Monstera', d: MON.fr }, es: { n: 'Monstera', d: MON.es } },

    /* --- Kaffee --- */
    'mp-359447139': { en: { n: 'Time for Espresso Rainbow', d: 'Bialetti espresso maker as a minimalist one-line drawing in bold rainbow colours. Perfect for coffee lovers, barista fans and espresso junkies. On T-shirt, hoodie, mug and more.' },
                      fr: { n: 'Time for Espresso Arc-en-ciel', d: 'Cafetière espresso Bialetti en dessin minimaliste d’une seule ligne aux couleurs arc-en-ciel vives. Parfait pour les amateurs de café, les fans de baristas et les accros à l’espresso. Sur t-shirt, hoodie, mug et plus.' },
                      es: { n: 'Time for Espresso Arcoíris', d: 'Cafetera espresso Bialetti como dibujo minimalista de una sola línea en intensos colores arcoíris. Perfecta para amantes del café, fans del barista y adictos al espresso. En camiseta, sudadera, taza y más.' } },
    'mp-359447137': { en: { n: 'Bialetti Rainbow Line Art', d: 'Bialetti espresso maker as a minimalist one-line drawing in rainbow colours. For coffee lovers and Pride fans. On T-shirt, hoodie, mug and more.' },
                      fr: { n: 'Bialetti Arc-en-ciel Art Linéaire', d: 'Cafetière espresso Bialetti en dessin minimaliste d’une seule ligne aux couleurs arc-en-ciel. Pour les amateurs de café et les fans de la Pride. Sur t-shirt, hoodie, mug et plus.' },
                      es: { n: 'Bialetti Arcoíris Arte Lineal', d: 'Cafetera espresso Bialetti como dibujo minimalista de una sola línea en colores arcoíris. Para amantes del café y fans del Orgullo. En camiseta, sudadera, taza y más.' } },
    'mp-359447161': { en: { n: 'Bialetti White', d: 'Bialetti espresso maker as a minimalist one-line drawing in white, ideal for dark shirts and hoodies. The favourite motif for coffee lovers, barista fans and espresso junkies.' },
                      fr: { n: 'Bialetti Blanc', d: 'Cafetière espresso Bialetti en dessin minimaliste d’une seule ligne en blanc, idéale pour les t-shirts et hoodies foncés. Le motif préféré des amateurs de café, des fans de baristas et des accros à l’espresso.' },
                      es: { n: 'Bialetti Blanco', d: 'Cafetera espresso Bialetti como dibujo minimalista de una sola línea en blanco, ideal para camisetas y sudaderas oscuras. El motivo favorito de los amantes del café, fans del barista y adictos al espresso.' } },
    'mp-359351230': { en: { n: 'Bialetti Rainbow Filled', d: 'Stylised Bialetti motif in bold rainbow colours for cappuccino and espresso fans. A gift for coffee nerds, café-goers and Pride fans. On T-shirt, hoodie and mug.' },
                      fr: { n: 'Bialetti Arc-en-ciel Plein', d: 'Motif Bialetti stylisé aux couleurs arc-en-ciel vives pour les fans de cappuccino et d’espresso. Cadeau pour les passionnés de café, les habitués des cafés et les fans de la Pride. Sur t-shirt, hoodie et mug.' },
                      es: { n: 'Bialetti Arcoíris Relleno', d: 'Motivo Bialetti estilizado en intensos colores arcoíris para fans del capuchino y el espresso. Regalo para amantes del café, clientes de cafeterías y fans del Orgullo. En camiseta, sudadera y taza.' } },
    'mp-356535497': { en: { n: 'Bialetti Line Art White', d: 'Bialetti moka pot as fine white line art with an espresso cup. A stylish café motif and an ideal gift for espresso, cappuccino and coffee lovers.' },
                      fr: { n: 'Bialetti Art Linéaire Blanc', d: 'Cafetière moka Bialetti en art linéaire blanc fin avec tasse à espresso. Motif café stylé et cadeau idéal pour les amateurs d’espresso, de cappuccino et de café.' },
                      es: { n: 'Bialetti Arte Lineal Blanco', d: 'Cafetera moka Bialetti en fino arte lineal blanco con taza de espresso. Motivo de café con estilo y regalo ideal para amantes del espresso, el capuchino y el café.' } },
    'mp-356506060': { en: { n: 'Bialetti Silhouette White', d: BIA.en }, fr: { n: 'Bialetti Silhouette Blanc', d: BIA.fr }, es: { n: 'Bialetti Silueta Blanco', d: BIA.es } },
    'mp-330941056': { en: { n: 'Bialetti', d: BIA.en }, fr: { n: 'Bialetti', d: BIA.fr }, es: { n: 'Bialetti', d: BIA.es } },
    'mp-322151034': { en: { n: 'Café Moka Pot Black', d: 'Black moka pot in a retro look for espresso and coffee lovers. A stylish café motif and an ideal gift for everyone who can’t start their day without moka.' },
                      fr: { n: 'Cafetière Moka Noir', d: 'Cafetière moka noire au look rétro pour les amateurs d’espresso et de café. Motif café stylé et cadeau idéal pour tous ceux qui ne peuvent pas démarrer leur journée sans moka.' },
                      es: { n: 'Cafetera Moka Negra', d: 'Cafetera moka negra con look retro para amantes del espresso y el café. Motivo de café con estilo y regalo ideal para todos los que no pueden empezar el día sin moka.' } },

    /* --- Radsport --- */
    'mp-359447203': { en: { n: 'Road Bike Rainbow', d: 'Road bike as a minimalist one-line drawing in bold rainbow colours. The gift for road cyclists, cycling fans and bike lovers. On T-shirt, hoodie, jersey and more.' },
                      fr: { n: 'Vélo de Route Arc-en-ciel', d: 'Vélo de route en dessin minimaliste d’une seule ligne aux couleurs arc-en-ciel vives. Le cadeau pour les cyclistes sur route, les fans de cyclisme et les amoureux du vélo. Sur t-shirt, hoodie, maillot et plus.' },
                      es: { n: 'Bici de Carreras Arcoíris', d: 'Bici de carreras como dibujo minimalista de una sola línea en intensos colores arcoíris. El regalo para ciclistas de carretera, fans del ciclismo y amantes de la bici. En camiseta, sudadera, maillot y más.' } },
    'mp-356535817': { en: { n: 'Roadbike Line Art', d: CYC.en }, fr: { n: 'Vélo de Route Art Linéaire', d: CYC.fr }, es: { n: 'Bici de Carreras Arte Lineal', d: CYC.es } },
    'mp-356505973': { en: { n: 'Cycling One Line White', d: CYC.en }, fr: { n: 'Cycling Une Ligne Blanc', d: CYC.fr }, es: { n: 'Cycling Una Línea Blanco', d: CYC.es } },
    'mp-341454752': { en: { n: 'Road Bike Line Art Black', d: CYC.en }, fr: { n: 'Vélo de Route Art Linéaire Noir', d: CYC.fr }, es: { n: 'Bici de Carreras Arte Lineal Negro', d: CYC.es } },
    'mp-322240880': { en: { n: 'Bicycle', d: CYC.en }, fr: { n: 'Vélo', d: CYC.fr }, es: { n: 'Bicicleta', d: CYC.es } },
    'mp-322195445': { en: { n: 'Cycling Roadbike Lettering', d: 'Dynamic road bike with ROADBIKE lettering in a sporty line look. A cool gift for road racers, roadbike fans and anyone who loves speed on the road.' },
                      fr: { n: 'Cycling Roadbike Lettrage', d: 'Vélo de route dynamique avec lettrage ROADBIKE au look linéaire sportif. Cadeau cool pour les coureurs cyclistes, les fans de roadbike et tous ceux qui aiment la vitesse sur la route.' },
                      es: { n: 'Cycling Roadbike Tipografía', d: 'Bici de carreras dinámica con tipografía ROADBIKE en un look lineal deportivo. Un regalo genial para ciclistas de carretera, fans del roadbike y todos los que aman la velocidad en la carretera.' } },
    'mp-322240880-rb': { en: { n: 'Bicycle Rainbow', d: 'Stylish bicycle motif in a clean line look in bold rainbow colours. The gift for cyclists, cycling fans and Pride fans. On T-shirt, hoodie, jersey and more.' },
                      fr: { n: 'Vélo Arc-en-ciel', d: 'Motif de vélo stylé au look linéaire épuré aux couleurs arc-en-ciel vives. Le cadeau pour les cyclistes, les fans de cyclisme et de la Pride. Sur t-shirt, hoodie, maillot et plus.' },
                      es: { n: 'Bicicleta Arcoíris', d: 'Motivo de bicicleta con un look lineal limpio en intensos colores arcoíris. El regalo para ciclistas, fans del ciclismo y del Orgullo. En camiseta, sudadera, maillot y más.' } },
    'mp-322195445-rb': { en: { n: 'Cycling Roadbike Lettering Rainbow', d: 'Dynamic road bike with ROADBIKE lettering in a sporty line look in bold rainbow colours. A cool gift for road racers, roadbike fans and Pride fans. On T-shirt, hoodie, jersey and more.' },
                      fr: { n: 'Cycling Roadbike Lettrage Arc-en-ciel', d: 'Vélo de route dynamique avec lettrage ROADBIKE au look linéaire sportif aux couleurs arc-en-ciel vives. Cadeau cool pour les coureurs cyclistes, les fans de roadbike et de la Pride. Sur t-shirt, hoodie, maillot et plus.' },
                      es: { n: 'Cycling Roadbike Tipografía Arcoíris', d: 'Bici de carreras dinámica con tipografía ROADBIKE en un look lineal deportivo en intensos colores arcoíris. Un regalo genial para ciclistas de carretera, fans del roadbike y del Orgullo. En camiseta, sudadera, maillot y más.' } },
    'mp-322182580': { en: { n: 'Cycling Rainbow Lettering', d: 'Cyclist with CYCLING lettering as dynamic line art in bold rainbow colours. A cool gift for road cyclists, cycling fans and Pride fans. On T-shirt, hoodie, jersey and more.' },
                      fr: { n: 'Cycling Lettrage Arc-en-ciel', d: 'Cycliste avec lettrage CYCLING en art linéaire dynamique aux couleurs arc-en-ciel vives. Cadeau cool pour les cyclistes sur route, les fans de cyclisme et de la Pride. Sur t-shirt, hoodie, maillot et plus.' },
                      es: { n: 'Cycling Tipografía Arcoíris', d: 'Ciclista con tipografía CYCLING en arte lineal dinámico en intensos colores arcoíris. Un regalo genial para ciclistas de carretera, fans del ciclismo y del Orgullo. En camiseta, sudadera, maillot y más.' } },

    /* --- Himmel, Weltall & Natur --- */
    'mp-356506059': { en: { n: 'Sun Horizon Line Art White', d: 'Sun over the horizon as minimalist line art in white. A calm nature motif for sun worshippers and lovers of sea and summer. Ideal on dark shirts, hoodies and mugs.' },
                      fr: { n: 'Soleil Horizon Art Linéaire Blanc', d: 'Soleil au-dessus de l’horizon en art linéaire minimaliste blanc. Motif nature apaisant pour les adorateurs du soleil et les amoureux de la mer et de l’été. Idéal sur t-shirts, hoodies et mugs foncés.' },
                      es: { n: 'Sol Horizonte Arte Lineal Blanco', d: 'Sol sobre el horizonte en arte lineal minimalista blanco. Un motivo natural y tranquilo para amantes del sol, del mar y del verano. Ideal en camisetas, sudaderas y tazas oscuras.' } },
    'mp-332397801': { en: { n: 'Shooting Star Line Art', d: 'Shooting star as minimalist line art – make a wish. A celestial motif for stargazers, romantics and dreamers. On T-shirt, hoodie, mug and more.' },
                      fr: { n: 'Étoile Filante Art Linéaire', d: 'Étoile filante en art linéaire minimaliste – fais un vœu. Motif céleste pour les observateurs d’étoiles, les romantiques et les rêveurs. Sur t-shirt, hoodie, mug et plus.' },
                      es: { n: 'Estrella Fugaz Arte Lineal', d: 'Estrella fugaz en arte lineal minimalista: pide un deseo. Motivo celestial para observadores de estrellas, románticos y soñadores. En camiseta, sudadera, taza y más.' } },
    'mp-332397745': { en: { n: 'Spaceship Line Art', d: 'Spaceship as minimalist line art in a circle. A galactic motif for space fans, would-be astronauts and sci-fi lovers. On T-shirt, hoodie, mug and more.' },
                      fr: { n: 'Vaisseau Spatial Art Linéaire', d: 'Vaisseau spatial en art linéaire minimaliste dans un cercle. Motif galactique pour les fans de l’espace, les apprentis astronautes et les amateurs de science-fiction. Sur t-shirt, hoodie, mug et plus.' },
                      es: { n: 'Nave Espacial Arte Lineal', d: 'Nave espacial en arte lineal minimalista dentro de un círculo. Motivo galáctico para fans del espacio, aspirantes a astronauta y amantes de la ciencia ficción. En camiseta, sudadera, taza y más.' } },
    'mp-332397742': { en: { n: 'Rocket Line Art', d: 'Rocket as minimalist line art, ready for lift-off. A cool space motif for sci-fi fans, little astronauts and dreamers. On T-shirt, hoodie, mug and more.' },
                      fr: { n: 'Fusée Art Linéaire', d: 'Fusée en art linéaire minimaliste, prête à décoller. Motif spatial cool pour les fans de science-fiction, les petits astronautes et les rêveurs. Sur t-shirt, hoodie, mug et plus.' },
                      es: { n: 'Cohete Arte Lineal', d: 'Cohete en arte lineal minimalista, listo para despegar. Un motivo espacial genial para fans de la ciencia ficción, pequeños astronautas y soñadores. En camiseta, sudadera, taza y más.' } },
    'mp-332397742-rb': { en: { n: 'Rocket Rainbow Line Art', d: 'Rocket as minimalist line art in bold rainbow colours, ready for lift-off. A cool space motif for sci-fi fans, little astronauts and Pride fans. On T-shirt, hoodie, mug and more.' },
                      fr: { n: 'Fusée Arc-en-ciel Art Linéaire', d: 'Fusée en art linéaire minimaliste aux couleurs arc-en-ciel vives, prête à décoller. Motif spatial cool pour les fans de science-fiction, les petits astronautes et les fans de la Pride. Sur t-shirt, hoodie, mug et plus.' },
                      es: { n: 'Cohete Arcoíris Arte Lineal', d: 'Cohete en arte lineal minimalista en intensos colores arcoíris, listo para despegar. Un motivo espacial genial para fans de la ciencia ficción, pequeños astronautas y fans del Orgullo. En camiseta, sudadera, taza y más.' } },
    'mp-332397745-rb': { en: { n: 'Spaceship Rainbow Line Art', d: 'Spaceship as minimalist line art in a circle in bold rainbow colours. A galactic motif for space fans, would-be astronauts and Pride fans. On T-shirt, hoodie, mug and more.' },
                      fr: { n: 'Vaisseau Spatial Arc-en-ciel Art Linéaire', d: 'Vaisseau spatial en art linéaire minimaliste dans un cercle aux couleurs arc-en-ciel vives. Motif galactique pour les fans de l’espace, les apprentis astronautes et les fans de la Pride. Sur t-shirt, hoodie, mug et plus.' },
                      es: { n: 'Nave Espacial Arcoíris Arte Lineal', d: 'Nave espacial en arte lineal minimalista dentro de un círculo en intensos colores arcoíris. Motivo galáctico para fans del espacio, aspirantes a astronauta y fans del Orgullo. En camiseta, sudadera, taza y más.' } },
    'mp-330970136': { en: { n: 'Sunrise Mountains Line Art', d: 'Sunrise over the mountains as minimalist line art. A calm nature motif for hikers, mountain and outdoor fans. On T-shirt, hoodie, mug and more.' },
                      fr: { n: 'Lever de Soleil Montagnes Art Linéaire', d: 'Lever de soleil sur les montagnes en art linéaire minimaliste. Motif nature apaisant pour les randonneurs et les fans de montagne et d’outdoor. Sur t-shirt, hoodie, mug et plus.' },
                      es: { n: 'Amanecer Montañas Arte Lineal', d: 'Amanecer sobre las montañas en arte lineal minimalista. Motivo natural y tranquilo para senderistas y fans de la montaña y el aire libre. En camiseta, sudadera, taza y más.' } },
    'mp-322089318': { en: { n: 'Sun Horizon Line Art Black', d: 'Minimalist sun over the horizon as fine line art. A calm boho motif for sun worshippers and lovers of summer and nature. On T-shirt, hoodie, mug and more.' },
                      fr: { n: 'Soleil Horizon Art Linéaire Noir', d: 'Soleil minimaliste au-dessus de l’horizon en art linéaire fin. Motif bohème apaisant pour les adorateurs du soleil et les amis de l’été et de la nature. Sur t-shirt, hoodie, mug et plus.' },
                      es: { n: 'Sol Horizonte Arte Lineal Negro', d: 'Sol minimalista sobre el horizonte en fino arte lineal. Motivo boho y tranquilo para amantes del sol, del verano y de la naturaleza. En camiseta, sudadera, taza y más.' } }
  };

  /* ============================================================
     Logik
     ============================================================ */
  function detect() {
    try {
      var stored = localStorage.getItem('c8y_lang');
      if (stored && SUPPORTED.indexOf(stored) >= 0) return stored;
    } catch (e) {}
    var langs = navigator.languages || [navigator.language || ''];
    for (var i = 0; i < langs.length; i++) {
      var code = (langs[i] || '').toLowerCase().slice(0, 2);
      if (SUPPORTED.indexOf(code) >= 0) return code;
    }
    return FALLBACK;
  }

  function baseOf(src) {
    var file = (src || '').split('/').pop();
    return file.replace(/\.[a-z0-9]+$/i, '');
  }

  function badgeType(b) {
    if (b.classList.contains('badge-rainbow')) return 'rainbow';
    if (b.classList.contains('badge-black'))   return 'black';
    if (b.classList.contains('badge-white'))   return 'white';
    if (b.classList.contains('badge-green'))   return 'green';
    if (b.classList.contains('badge-line'))    return 'line';
    return null;
  }

  // Original-Texte (DE) merken
  var textEls = [].slice.call(document.querySelectorAll('[data-i18n]'));
  var htmlEls = [].slice.call(document.querySelectorAll('[data-i18n-html]'));
  textEls.forEach(function (el) { el._de = el.textContent; });
  htmlEls.forEach(function (el) { el._de = el.innerHTML; });

  var tiles = [].slice.call(document.querySelectorAll('.design-tile'));
  var deDesign = {};
  tiles.forEach(function (t) {
    var img = t.querySelector('.tile-canvas img');
    if (!img) return;
    var base = baseOf(img.getAttribute('src'));
    var nameEl = t.querySelector('.tile-name');
    var descEl = t.querySelector('.tile-desc');
    deDesign[base] = {
      name: nameEl ? nameEl.textContent : (img.getAttribute('alt') || ''),
      desc: descEl ? descEl.textContent : ''
    };
  });

  function apply(lang) {
    if (SUPPORTED.indexOf(lang) < 0) lang = FALLBACK;
    var dict = UI[lang] || null; // null => Deutsch (Original)

    document.documentElement.setAttribute('lang', lang);

    // Meta
    var m = META[lang] || META.de;
    document.title = m.title;
    var md = document.querySelector('meta[name="description"]');
    if (md) md.setAttribute('content', m.desc);

    // UI-Text
    textEls.forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      el.textContent = dict && dict[key] != null ? dict[key] : el._de;
    });
    htmlEls.forEach(function (el) {
      var key = el.getAttribute('data-i18n-html');
      el.innerHTML = dict && dict[key] != null ? dict[key] : el._de;
    });

    // Badges
    var bmap = BADGE[lang] || BADGE.de;
    [].slice.call(document.querySelectorAll('.badge')).forEach(function (b) {
      var ty = badgeType(b);
      if (!ty || bmap[ty] == null) return;
      var dot = b.querySelector('.dot');
      b.textContent = '';
      if (dot) b.appendChild(dot);
      b.appendChild(document.createTextNode(bmap[ty]));
    });

    // CTA in Kacheln + Vorschau
    var cta = CTA[lang] || CTA.de;
    [].slice.call(document.querySelectorAll('.tile-cta')).forEach(function (c) { c.textContent = cta; });
    var pc = document.querySelector('.pop-cta');
    if (pc) pc.textContent = cta;

    // Designs
    tiles.forEach(function (t) {
      var img = t.querySelector('.tile-canvas img');
      if (!img) return;
      var base = baseOf(img.getAttribute('src'));
      var fallback = deDesign[base] || { name: '', desc: '' };
      var tr = (DESIGN[base] && DESIGN[base][lang]) || null;
      var name = tr && tr.n ? tr.n : fallback.name;
      var desc = tr && tr.d ? tr.d : fallback.desc;
      var nameEl = t.querySelector('.tile-name');
      var descEl = t.querySelector('.tile-desc');
      if (nameEl) nameEl.textContent = name;
      if (descEl) descEl.textContent = desc;
      img.alt = name;
    });

    // Umschalter-Label + aktiver Eintrag
    var cur = document.querySelector('.lang-current');
    if (cur) cur.textContent = lang.toUpperCase();
    [].slice.call(document.querySelectorAll('.lang-menu [data-lang]')).forEach(function (btn) {
      btn.setAttribute('aria-current', btn.getAttribute('data-lang') === lang ? 'true' : 'false');
    });
  }

  function setLang(lang) {
    if (SUPPORTED.indexOf(lang) < 0) lang = FALLBACK;
    try { localStorage.setItem('c8y_lang', lang); } catch (e) {}
    apply(lang);
  }

  // Umschalter verdrahten
  var sw = document.querySelector('.lang-switch');
  if (sw) {
    var btn = sw.querySelector('.lang-btn');
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = sw.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    [].slice.call(sw.querySelectorAll('[data-lang]')).forEach(function (item) {
      item.addEventListener('click', function () {
        setLang(item.getAttribute('data-lang'));
        sw.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        var cb = document.getElementById('nav-toggle');
        if (cb) cb.checked = false; // Mobil-Menü schließen
      });
    });
    document.addEventListener('click', function () {
      sw.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { sw.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); }
    });
  }

  apply(detect());
})();
