// ============================================================
// Corner Coffee Shop — CONFIG.JS
// Single source of truth for all site content & settings
// ============================================================

const SITE_CONFIG = {

  brand: {
    name: "Corner Coffee Shop",
    tagline: "Seriously Good Coffee",
    est: "EST. 2019",
    location: "CASABLANCA",
    description: "Dark-roasted obsession. Light-touched craft. We source, we roast, we pull shots like our lives depend on it.",
    whatsapp: "https://wa.me/212600000000",
    whatsappNumber: "+212 600 000 000",
    email: "hello@cornerbrew.ma",
    phone: "+212 522 000 000",
    instagram: "https://instagram.com/cornerbrew",
    facebook: "https://facebook.com/cornerbrew",
    address: "12 Rue des Fleurs, Gauthier, Casablanca 20000",
    mapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.5!2d-7.633333!3d33.588889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDM1JzIwLjAiTiA3wrAzOCcwMC4wIlc!5e0!3m2!1sen!2sma!4v1700000000000!5m2!1sen!2sma",
    googleSheetAction: "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec"
  },

  hero: {
    eyebrow: "EST. 2019 · CASABLANCA",
    headline: ["Seriously", "Good", "Coffee"],
    subline: "Sourced from six origins. Roasted in-house. Served with intent.",
    cta1: { text: "Explore Menu", href: "#menu" },
    cta2: { text: "Our Story", href: "#about" },
  },

  ticker: {
    items: [
      "SPECIALTY COFFEE",
      "SINGLE ORIGIN",
      "FRESH PASTRIES",
      "OPEN 7 DAYS",
      "CASABLANCA",
      "IN-HOUSE ROASTING",
      "POUR OVER · ESPRESSO · COLD BREW",
    ]
  },

  about: {
    sectionNum: "01",
    title: "Why We're\nDifferent",
    body: [
      "We didn't open a coffee shop. We opened a statement.",
      "Every bean is traceable. Every roast is intentional. Every cup is a conversation between farmer, roaster, and you.",
      "No syrups. No shortcuts. Just coffee as it was meant to be — complex, honest, unforgettable.",
      "Corner Brew is where Casablanca's coffee culture grows up."
    ],
    stats: [
      { number: "6", label: "ORIGINS" },
      { number: "3", label: "BREWERS" },
      { number: "1", label: "OBSESSION" }
    ],
    badge: "Founded\n2019",
    photo: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80"
  },

  menu: {
    sectionNum: "04",
    title: "The Menu",
    categories: [
      {
        id: "coffee",
        label: "Coffee",
        items: [
          { name: "Espresso", price: "25", staffPick: false, desc: "Double shot, Yirgacheffe blend" },
          { name: "Cortado", price: "30", staffPick: false, desc: "Equal parts espresso and steamed milk" },
          { name: "Flat White", price: "35", staffPick: true, desc: "Velvety microfoam, intense extraction" },
          { name: "Pour Over", price: "45", staffPick: true, desc: "Single origin, V60 method — daily rotation" },
          { name: "Aeropress", price: "40", staffPick: false, desc: "Full immersion, clean finish" },
          { name: "Batch Brew", price: "28", staffPick: false, desc: "House blend, drip brewed fresh every hour" },
          { name: "Cappuccino", price: "35", staffPick: false, desc: "Classic Italian ratio, textured foam" },
          { name: "Long Black", price: "30", staffPick: false, desc: "Double ristretto over hot water" },
        ]
      },
      {
        id: "cold",
        label: "Cold",
        items: [
          { name: "Cold Brew", price: "40", staffPick: true, desc: "18-hour steep, served over ice" },
          { name: "Iced Latte", price: "38", staffPick: false, desc: "Espresso, milk, ice — nothing else" },
          { name: "Nitro Cold Brew", price: "50", staffPick: true, desc: "Nitrogen-infused, cascading pour" },
          { name: "Iced Matcha", price: "42", staffPick: false, desc: "Ceremonial grade, oat milk" },
          { name: "Cold Brew Tonic", price: "45", staffPick: false, desc: "Cold brew meets sparkling tonic" },
        ]
      },
      {
        id: "food",
        label: "Food",
        items: [
          { name: "Avocado Toast", price: "65", staffPick: false, desc: "Sourdough, smashed avo, chili flakes, seeds" },
          { name: "Shakshuka", price: "70", staffPick: true, desc: "Two eggs, spiced tomato, baguette" },
          { name: "Grain Bowl", price: "75", staffPick: false, desc: "Quinoa, roasted veg, tahini, herbs" },
          { name: "Club Sandwich", price: "68", staffPick: false, desc: "Triple decker, chicken, house sauce" },
          { name: "Cheese Plate", price: "80", staffPick: false, desc: "Selection of 3 cheeses, fruit, crackers" },
        ]
      },
      {
        id: "pastries",
        label: "Pastries",
        items: [
          { name: "Butter Croissant", price: "22", staffPick: false, desc: "Baked fresh every morning" },
          { name: "Almond Croissant", price: "28", staffPick: true, desc: "Twice-baked, frangipane filled" },
          { name: "Banana Bread", price: "25", staffPick: false, desc: "Walnut, dark chocolate chips" },
          { name: "Pain au Chocolat", price: "26", staffPick: false, desc: "Dark chocolate, laminated dough" },
          { name: "Cardamom Bun", price: "30", staffPick: true, desc: "Scandinavian-style, house recipe" },
          { name: "Financier", price: "20", staffPick: false, desc: "Brown butter, almond, pistachio" },
        ]
      }
    ]
  },

  process: {
    sectionNum: "05",
    title: "Bean to Cup",
    steps: [
      {
        num: "01",
        title: "Source",
        lines: ["We partner directly with farmers across Ethiopia, Colombia, Guatemala, Kenya, Yemen, and Brazil.", "Traceability is not a buzzword here — it's the foundation."]
      },
      {
        num: "02",
        title: "Roast",
        lines: ["Our in-house roaster works in small batches, dialing profiles over weeks.", "Light to medium roasts that honour the bean, never mask it."]
      },
      {
        num: "03",
        title: "Brew",
        lines: ["Baristas trained to precision. Recipes documented. Water filtered and temperature-controlled.", "Every variable controlled so every cup is repeatable perfection."]
      }
    ]
  },

  gallery: {
    sectionNum: "06",
    title: "The Space",
    photos: [
      { src: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=900&q=80", label: "BAR", wide: false, tall: true },
      { src: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&q=80", label: "BEANS", wide: false, tall: false },
      { src: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=600&q=80", label: "BREWING", wide: false, tall: false },
      { src: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=1200&q=80", label: "SPACE", wide: true, tall: false },
      { src: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80", label: "POUR", wide: false, tall: false },
      { src: "https://images.unsplash.com/photo-1504630083234-14187a9df0f5?w=600&q=80", label: "CRAFT", wide: false, tall: false },
    ]
  },

  hours: {
    sectionNum: "07",
    title: "Hours & Find Us",
    schedule: [
      { day: "Monday", time: "07:00 – 20:00" },
      { day: "Tuesday", time: "07:00 – 20:00" },
      { day: "Wednesday", time: "07:00 – 20:00" },
      { day: "Thursday", time: "07:00 – 21:00" },
      { day: "Friday", time: "07:00 – 22:00" },
      { day: "Saturday", time: "08:00 – 22:00" },
      { day: "Sunday", time: "09:00 – 19:00" },
    ]
  },

  testimonials: {
    sectionNum: "08",
    title: "What People Say",
    reviews: [
      { quote: "Best pour over I've had outside of Tokyo. The Ethiopian single origin was extraordinary — floral, bright, complex.", name: "Karim B.", stars: 5 },
      { quote: "The space itself is a statement. Dark, focused, no-nonsense. Exactly what Casablanca's coffee scene needed.", name: "Leila M.", stars: 5 },
      { quote: "Nitro cold brew changed my life. I don't say that lightly. This place is something else entirely.", name: "Youssef R.", stars: 5 },
      { quote: "The almond croissant paired with a cortado at 8am is my non-negotiable start to a good day.", name: "Sara A.", stars: 5 },
      { quote: "Finally a coffee shop in Casa that takes the craft seriously. No fake latte art, no sugary syrups. Real coffee.", name: "Adam T.", stars: 5 },
      { quote: "I've been to Blue Bottle in NYC and Onyx in Bentonville. Corner Brew belongs in that conversation.", name: "Nadia K.", stars: 5 },
    ]
  },

  contact: {
    sectionNum: "09",
    title: "Get In Touch",
    formFields: [
      { name: "name", label: "Your Name", type: "text", required: true },
      { name: "email", label: "Email Address", type: "email", required: true },
      { name: "subject", label: "Subject", type: "text", required: false },
      { name: "message", label: "Your Message", type: "textarea", required: true },
    ]
  },

  footer: {
    links: [
      { label: "Menu", href: "#menu" },
      { label: "About", href: "#about" },
      { label: "Gallery", href: "#gallery" },
      { label: "Hours", href: "#hours" },
      { label: "Contact", href: "#contact" },
    ],
    copyright: `© ${new Date().getFullYear()} Corner Coffee Shop. All rights reserved.`
  }
};
