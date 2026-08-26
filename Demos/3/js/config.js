// ============================================================
// ADAM REEVES COACH — SITE CONFIGURATION
// This is the ONLY file you need to edit to update site content.
// ============================================================

const SITE_CONFIG = {
  meta: {
    title: "Adam Reeves | Personal Finance Coach",
    description: "Personalized financial coaching to help young professionals budget, eliminate debt, and start investing with confidence. Book a free discovery call.",
    ogImage: "images/og-image.webp",
    ogUrl: "https://adamreevescoach.com",
    language: "en",
    canonicalUrl: "https://adamreevescoach.com",
    gaId: "G-XXXXXXXXXX" // Replace with real GA4 ID
  },

  brand: {
    name: "Adam Reeves",
    tagline: "Financial Coaching for Real Life",
    logoText: "Adam Reeves"
  },

  nav: {
    links: [
      { label: "About", href: "#about" },
      { label: "Services", href: "#services" },
      { label: "How It Works", href: "#how-it-works" },
      { label: "Testimonials", href: "#testimonials" },
      { label: "FAQ", href: "#faq" }
    ],
    ctaText: "Book Free Call",
    ctaLink: "https://calendly.com/thekinganime9/one-on-one-meeting-first-test"
  },

  hero: {
    headline: "Take Control of Your Money. Build Your Future.",
    subtext: "Personalized coaching to help you budget, save, and invest with confidence.",
    primaryCta: { text: "Book a Free Call", href: "https://calendly.com/thekinganime9/one-on-one-meeting-first-test" },
    secondaryCta: { text: "See My Services", href: "#services" },
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    imageAlt: "Adam Reeves, Certified Financial Coach"
  },

  painPoints: {
    sectionTitle: "Does This Sound Familiar?",
    cards: [
      {
        icon: "paycheck",
        title: "Living Paycheck to Paycheck",
        body: "No matter how much you earn, the money disappears. You're always one unexpected expense away from a crisis."
      },
      {
        icon: "investing",
        title: "Confused About Investing",
        body: "Everyone says you should invest, but the options are overwhelming and the jargon makes it feel like it's not for you."
      },
      {
        icon: "debt",
        title: "Stressed About Debt",
        body: "The debt feels endless. You're making minimum payments and watching the balance barely move — if at all."
      }
    ]
  },

  about: {
    sectionTitle: "About Adam",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80",
    imageAlt: "Adam Reeves, Certified Financial Coach",
    bio: "I'm Adam Reeves, a Certified Financial Coach with 8 years of experience helping people break free from the paycheck-to-paycheck cycle. After paying off $45,000 in debt myself, I became obsessed with helping others do the same. My clients range from young professionals just starting out to established earners ready to take their wealth to the next level. My approach is simple: no judgment, no gatekeeping, just a clear plan and consistent accountability.",
    credentials: [
      "Certified Financial Coach (AFC®)",
      "8+ Years Coaching Experience",
      "200+ Clients Helped Nationwide"
    ],
    counters: [
      { target: 200, suffix: "+", label: "Clients Helped" },
      { target: 8, suffix: " Yrs", label: "Experience" },
      { target: 1.5, suffix: "M+", label: "Debt Cleared", prefix: "$" }
    ]
  },

  services: {
    sectionTitle: "Coaching Packages",
    sectionSubtext: "Choose the level of support that matches where you are right now.",
    packages: [
      {
        icon: "lightbulb",
        title: "Budget Breakthrough",
        subtitle: "Starter Package",
        description: "Perfect if you're new to budgeting or constantly overspending. We'll build a realistic budget and a debt payoff roadmap.",
        includes: [
          "Initial financial audit",
          "Custom budget plan",
          "Debt payoff roadmap",
          "2 one-hour sessions"
        ],
        price: "$297",
        highlight: false,
        cta: "Get Started"
      },
      {
        icon: "trending",
        title: "Wealth Builder",
        subtitle: "Growth Package",
        description: "For those ready to start investing but don't know where to begin. We'll cover savings strategy, investment basics, and portfolio planning.",
        includes: [
          "Everything in Starter",
          "Investment roadmap",
          "Portfolio setup guidance",
          "4 sessions + workbook"
        ],
        price: "$497",
        highlight: true,
        badge: "Most Popular",
        cta: "Get Started"
      },
      {
        icon: "target",
        title: "Financial Freedom",
        subtitle: "Freedom Package",
        description: "Total financial transformation. From crushing debt to building wealth, we'll cover it all with hands-on support.",
        includes: [
          "Everything in Growth",
          "8 sessions over 3 months",
          "Unlimited messaging support",
          "Quarterly check-ins"
        ],
        price: "$897",
        highlight: false,
        cta: "Get Started"
      }
    ],
    ctaLink: "https://calendly.com/thekinganime9/one-on-one-meeting-first-test"
  },

  howItWorks: {
    sectionTitle: "How It Works",
    sectionSubtext: "Three steps to a financial life that actually makes sense.",
    steps: [
      {
        number: "01",
        icon: "calendar",
        title: "Book Your Free Call",
        description: "We'll talk about your current situation, your goals, and whether coaching is right for you. Zero pressure."
      },
      {
        number: "02",
        icon: "map",
        title: "Get Your Custom Plan",
        description: "I'll create a personalized roadmap based on your income, expenses, debt, and goals. No cookie-cutter templates."
      },
      {
        number: "03",
        icon: "rocket",
        title: "Execute with Accountability",
        description: "Weekly check-ins, real-time support, and honest feedback to keep you on track. You don't do this alone."
      }
    ]
  },

  testimonials: {
    sectionTitle: "Real Results from Real People",
    sectionSubtext: "Don't take my word for it.",
    items: [
      {
        quote: "Adam helped me pay off $18,000 in credit card debt in 10 months. I didn't think it was possible, but his system works.",
        name: "Jennifer Martinez",
        role: "Marketing Manager",
        rating: 5,
        initials: "JM"
      },
      {
        quote: "I was terrified of investing. Adam broke it down in a way that actually made sense. Now I have a portfolio I understand and feel confident about.",
        name: "Marcus Johnson",
        role: "Software Engineer",
        rating: 5,
        initials: "MJ"
      },
      {
        quote: "Best money I ever spent. Adam's coaching paid for itself in the first month just from the money I stopped wasting.",
        name: "Sarah Kim",
        role: "Teacher",
        rating: 5,
        initials: "SK"
      },
      {
        quote: "I went from living paycheck to paycheck to having a 3-month emergency fund. Adam made it feel achievable instead of overwhelming.",
        name: "David Chen",
        role: "Freelance Designer",
        rating: 5,
        initials: "DC"
      }
    ]
  },

  leadMagnet: {
    title: "Download Free: The 5-Step Budget Reset Guide",
    subtext: "Learn the exact system I use with my clients to take control of spending in under 30 days.",
    buttonText: "Send Me the Free Guide",
    successMessage: "🎉 Check your inbox! Your guide is on its way.",
    formAction: "https://mailchimp.us12.list-manage.com/subscribe/post?u=XXXXX", // Replace with real Mailchimp URL
    emailPlaceholder: "Enter your email address"
  },

  faq: {
    sectionTitle: "Frequently Asked Questions",
    items: [
      {
        question: "How long does coaching typically take?",
        answer: "It depends on your goals. Most clients see major progress in 3–6 months, but some work with me for a year or more to build long-term wealth."
      },
      {
        question: "What makes you different from a financial advisor?",
        answer: "Financial advisors manage investments for people who already have money. I help you get to that point — budgeting, debt payoff, and building your first savings. Think of me as the step before a financial advisor."
      },
      {
        question: "Do you offer refunds?",
        answer: "I offer a 30-day satisfaction guarantee. If you complete your first two sessions and feel like you didn't get value, I'll refund your payment in full."
      },
      {
        question: "Is this online or in-person?",
        answer: "100% online. We meet via Zoom, and you get access to my client portal for tracking progress and messaging between sessions."
      },
      {
        question: "What if I'm deeply in debt — like $50k+?",
        answer: "That's exactly who I work with. I've helped clients tackle six-figure debt. It takes time, but it's absolutely doable with the right plan and accountability."
      },
      {
        question: "What's included in the free discovery call?",
        answer: "We'll review your current financial situation, talk about your goals, and I'll explain how my coaching works. There's no pressure to sign up — it's genuinely just a conversation to see if we're a good fit."
      }
    ]
  },

  booking: {
    sectionTitle: "Ready to Take Control?",
    subtext: "Book your free 30-minute discovery call. No pressure, no sales pitch — just an honest conversation about your financial goals.",
    calendlyUrl: "https://calendly.com/thekinganime9/one-on-one-meeting-first-test",
    backupFormTitle: "Or Send a Message",
    backupFormSubtext: "Prefer to reach out first? I'll get back to you within 24 hours.",
    formEndpoint: "https://script.google.com/macros/s/AKfycbzN5CDUvCKziixkU_T71dmGVg8yKv69frpcW4UbTusqHGp2z0-pk6L4gHcqGURJ_c-Baw/exec" // Replace with real Formspree endpoint
  },

  contact: {
    email: "adam@adamreevescoach.com",
    linkedin: "https://linkedin.com/in/adamreeves"
  },

  footer: {
    tagline: "Financial coaching for real life. No judgment, no gatekeeping — just a clear plan.",
    navLinks: [
      { label: "About", href: "#about" },
      { label: "Services", href: "#services" },
      { label: "Testimonials", href: "#testimonials" },
      { label: "FAQ", href: "#faq" },
      { label: "Book a Call", href: "https://calendly.com/thekinganime9/one-on-one-meeting-first-test" }
    ],
    privacyLink: "/privacy.html",
    copyright: "2025 Adam Reeves. All rights reserved."
  }
};