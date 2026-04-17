import { useState, useEffect, useRef, useCallback } from "react";
import {
  CheckCircle,
  Clock,
  Users,
  TrendingUp,
  Star,
  ChevronDown,
  MessageCircle,
  CreditCard,
  ArrowRight,
  Shield,
  Target,
  BarChart3,
  Globe,
  Brain,
  Rocket,
  Lock,
  BookOpen,
  Award,
  Zap,
  Calendar,
  Video,
  HelpCircle,
  Mail,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────
// CONFIG
// ─────────────────────────────────────────────────────────────
const CFG = {
  paystackPublicKey: "pk_live_a245a899498f4211a486ccb80a79aa5d2931bfb2",
  courseName: "AI-Powered Digital Marketing & Business Growth Masterclass",
  courseStartDate: "April 30, 2026",
  courseStartFull: "Wednesday, 30th April 2026",
  whatsappNumber: "2348138932032",
  supportEmail: "support@aimasterclass.ng",
  enrollDeadline: new Date("2026-04-28T23:59:00"),

  // Nigerian pricing
  NG: {
    amountKobo: 3700000,
    currency: "NGN",
    priceDisplay: "₦37,000",
    priceSlash: "₦150,000",
    discount: "61% off",
    saveLabel: "Save ₦113,000 — 61% off",
  },

  // International pricing
  INTL: {
    amountKobo: 150000,
    currency: "USD",
    priceDisplay: "$1,500",
    priceSlash: "$5,000",
    discount: "70% off",
    saveLabel: "Save $3,500 — 70% off",
  },
};

const waMsg = (ref, name) =>
  encodeURIComponent(
    `Hi! I just registered for the ${CFG.courseName}.\n\nName: ${name}\nPayment Ref: ${ref}\n\nPlease confirm my registration. Thank you!`,
  );

// ─────────────────────────────────────────────────────────────
// Hooks
// ─────────────────────────────────────────────────────────────
function usePricing() {
  const [pricing, setPricing] = useState(null);

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((r) => r.json())
      .then((data) => {
        if (data.country_code === "NG") {
          setPricing(CFG.NG);
        } else {
          setPricing(CFG.INTL);
        }
      })
      .catch(() => {
        setPricing(CFG.NG);
      });
  }, []);

  return pricing;
}

function useCountdown(target) {
  const calc = () => {
    const diff = target - Date.now();
    if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 };
    return {
      d: Math.floor(diff / 86400000),
      h: Math.floor((diff % 86400000) / 3600000),
      m: Math.floor((diff % 3600000) / 60000),
      s: Math.floor((diff % 60000) / 1000),
    };
  };
  const [t, setT] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

function useVisible(threshold = 0.1) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVis(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
}

function Reveal({ children, delay = 0 }) {
  const [ref, vis] = useVisible();
  return (
    <div
      ref={ref}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(26px)",
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function usePaystack() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (window.PaystackPop) {
      setReady(true);
      return;
    }
    const s = document.createElement("script");
    s.src = "https://js.paystack.co/v1/inline.js";
    s.async = true;
    s.onload = () => setReady(true);
    document.head.appendChild(s);
  }, []);
  return ready;
}

// ─────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────
const modules = [
  {
    num: 1,
    color: "#0d9488",
    title: "Mindset & AI Foundations",
    lessons: [
      "What AI really is — plain language",
      "How AI reshapes modern business",
      "Why AI won't replace you — but slow competitors",
      "Your course roadmap & success framework",
    ],
  },
  {
    num: 2,
    color: "#7c3aed",
    title: "Building Your Brand Identity",
    lessons: [
      "Defining your niche with Google Gemini",
      "Brand name & tagline with ChatGPT",
      "Logo & visual identity using Looka AI",
      "Colours, style guide & consistency with Khroma",
    ],
  },
  {
    num: 3,
    color: "#0891b2",
    title: "Website & Online Presence",
    lessons: [
      "Website planning with ChatGPT",
      "Launch a website in minutes with Durable AI",
      "Writing homepage copy that converts",
      "SEO basics every business owner must know",
    ],
  },
  {
    num: 4,
    color: "#d97706",
    title: "Organisation & Workflow",
    lessons: [
      "Your AI-powered business HQ in Notion",
      "Content calendars that run themselves",
      "Productivity habits for high-output professionals",
    ],
  },
  {
    num: 5,
    color: "#059669",
    title: "Content Creation & Social Media",
    lessons: [
      "Designing scroll-stopping posts with Canva AI",
      "Automating your social media with Ocoya",
      "Writing captions & hooks that drive action",
      "Repurposing one idea into 10 pieces of content",
    ],
  },
  {
    num: 6,
    color: "#dc2626",
    title: "Video & Short-Form Marketing",
    lessons: [
      "Why video is now non-negotiable for business",
      "Auto-clipping long content with Riverside.fm",
      "Short-form video formula: Hook → Value → CTA",
    ],
  },
  {
    num: 7,
    color: "#be185d",
    title: "Lead Generation & Sales",
    lessons: [
      "Building a sales funnel from scratch",
      "Capturing leads 24/7 with Tidio chatbots",
      "Writing sales copy with ChatGPT",
      "Lead nurturing sequences that convert",
    ],
  },
  {
    num: 8,
    color: "#7c3aed",
    title: "Ads & Growth Marketing",
    lessons: [
      "Paid advertising fundamentals",
      "Creating high-converting ads with AdCreative.ai",
      "Competitor intelligence with SpyFu",
      "Reading ad metrics & scaling what works",
    ],
  },
  {
    num: 9,
    color: "#0d9488",
    title: "Email Marketing & Automation",
    lessons: [
      "Why email is still the highest-ROI channel",
      "Building automated flows in HubSpot",
      "AI-written email sequences that nurture & close",
    ],
  },
  {
    num: 10,
    color: "#059669",
    title: "Productivity & Scaling",
    lessons: [
      "AI-powered scheduling with Motion",
      "Automating repetitive tasks with Zapier",
      "Scaling strategies for solo founders & small teams",
    ],
  },
  {
    num: "★",
    color: "#d97706",
    title: "Bonus: Money & Business Management",
    lessons: [
      "Real-time financial dashboards with LiveFlow",
      "Budgeting & cash flow for business owners",
    ],
  },
];

const testimonials = [
  {
    name: "Adaeze Okonkwo",
    role: "Fashion Brand Owner, Lagos",
    stars: 5,
    text: "Before this course I was posting every day and making zero sales. After Module 7 alone, I set up a chatbot that captured 40 leads in one week. This course paid for itself immediately.",
    avatar: "AO",
    color: "#0d9488",
  },
  {
    name: "Emeka Nwosu",
    role: "Financial Consultant, Abuja",
    stars: 5,
    text: "None of the courses I've taken gave me tools I could use the next day. The AI Masterclass gave me a live website in 30 minutes and a full brand identity by end of day one.",
    avatar: "EN",
    color: "#7c3aed",
  },
  {
    name: "Chidinma Ezike",
    role: "HR Consultant & Coach",
    stars: 5,
    text: "I was terrified of AI. This course changed that completely. The step-by-step format made everything feel simple. My LinkedIn content now gets 10x the engagement it used to.",
    avatar: "CE",
    color: "#dc2626",
  },
  {
    name: "Babatunde Adeyemi",
    role: "Real Estate Professional, Lagos",
    stars: 5,
    text: "The ads module alone was worth everything. I ran my first Facebook ad and got 12 qualified enquiries in 48 hours. Genuinely shocked at how practical this is.",
    avatar: "BA",
    color: "#d97706",
  },
  {
    name: "Ngozi Eze",
    role: "Wellness Business Owner",
    stars: 5,
    text: "I now create a full week of content in 90 minutes. My competitors spend hours doing what I do with AI in minutes. This is a business advantage, not optional.",
    avatar: "NE",
    color: "#059669",
  },
  {
    name: "Tunde Fashola",
    role: "Tech Entrepreneur",
    stars: 5,
    text: "From zero online presence to a live brand, website, and automated email sequence in one weekend. The final project alone is worth more than most agencies charge.",
    avatar: "TF",
    color: "#be185d",
  },
];

const reasons = [
  {
    icon: TrendingUp,
    title: "Your competitors are already using AI",
    body: "Businesses using AI are outpacing those that aren't. Every month you wait is market share handed to someone who moved faster.",
  },
  {
    icon: Clock,
    title: "Stop trading time for money",
    body: "AI handles content, lead capture, and nurturing around the clock — freeing you to focus on strategy and growth.",
  },
  {
    icon: Target,
    title: "Stop guessing. Start converting.",
    body: "Learn exact funnel and sales copy frameworks that turn visitors into paying customers — consistently.",
  },
  {
    icon: Video,
    title: "Live workshops — ask real questions",
    body: "This isn't just recorded content. You attend live workshops where you can ask questions and get real answers from the instructor.",
  },
  {
    icon: BarChart3,
    title: "Real ROI from day one",
    body: "Every module includes tools you deploy immediately. Students consistently report results within the first week of the course.",
  },
  {
    icon: Brain,
    title: "No tech background required",
    body: "If you can use WhatsApp and Google, you have everything you need. Built for busy professionals — not developers.",
  },
];

const faqs = [
  {
    q: "When does the course start?",
    a: `The course officially commences on ${CFG.courseStartFull}. Once you register and your payment is confirmed, you'll receive a confirmation email with everything you need to prepare.`,
  },
  {
    q: "What happens after I pay?",
    a: "You'll receive an email confirming your registration, the course start date, schedule, and details on how to join the live sessions. No course access yet — it all begins on April 30th.",
  },
  {
    q: "Will there be live sessions?",
    a: "Yes! The course includes live workshops where you can ask questions, get feedback on your work, and interact directly with the instructor and other students.",
  },
  {
    q: "Do I need any tech experience?",
    a: "Absolutely not. Every lesson is step-by-step, built specifically for business professionals who are not tech-savvy. If you can use WhatsApp, you're ready.",
  },
  {
    q: "What payment methods are accepted?",
    a: "We accept all Nigerian debit/credit cards, bank transfers, and USSD via Paystack — Nigeria's most trusted payment gateway.",
  },
  {
    q: "Can I join if I already have a business?",
    a: "Yes — and this is where students see the fastest results. You'll apply AI directly to your existing business and see impact within the first week.",
  },
];

// ─────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────
function CountBox({ value, label }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          background: "rgba(255,255,255,0.07)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 12,
          padding: "12px 18px",
          marginBottom: 6,
        }}
      >
        <span
          style={{
            fontSize: 36,
            fontWeight: 800,
            fontFamily: "'Playfair Display',serif",
            color: "#c8f550",
            lineHeight: 1,
          }}
        >
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span
        style={{
          fontSize: 10,
          textTransform: "uppercase",
          letterSpacing: "0.14em",
          color: "rgba(255,255,255,0.4)",
          fontWeight: 600,
        }}
      >
        {label}
      </span>
    </div>
  );
}

function StarRow({ n }) {
  return (
    <div style={{ display: "flex", gap: 2, marginBottom: 10 }}>
      {Array.from({ length: n }).map((_, i) => (
        <Star key={i} size={13} fill="#f59e0b" color="#f59e0b" />
      ))}
    </div>
  );
}

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      onClick={() => setOpen(!open)}
      style={{
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        padding: "17px 0",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 14,
        }}
      >
        <span style={{ fontWeight: 600, fontSize: 15, color: "#f8fafc" }}>
          {q}
        </span>
        <ChevronDown
          size={16}
          color="rgba(255,255,255,0.35)"
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0)",
            transition: "transform 0.3s",
            flexShrink: 0,
          }}
        />
      </div>
      <div
        style={{
          overflow: "hidden",
          maxHeight: open ? 220 : 0,
          transition: "max-height 0.4s ease",
          marginTop: open ? 8 : 0,
        }}
      >
        <p
          style={{
            fontSize: 14,
            color: "rgba(255,255,255,0.55)",
            lineHeight: 1.75,
            margin: 0,
          }}
        >
          {a}
        </p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Payment / Registration Modal
// ─────────────────────────────────────────────────────────────
function PaymentModal({ onClose, pricing }) {
  const paystackReady = usePaystack();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(null);

  const inputStyle = {
    width: "100%",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 10,
    padding: "13px 14px",
    fontSize: 14,
    color: "#f8fafc",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
    transition: "border-color 0.2s",
  };

  const launchPaystack = useCallback(() => {
    if (!name.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!phone.trim() || phone.length < 8) {
      setError("Please enter a valid phone number.");
      return;
    }
    if (!paystackReady || !window.PaystackPop) {
      setError("Payment system loading — please try again.");
      return;
    }
    if (!pricing) {
      setError("Pricing not loaded — please try again.");
      return;
    }
    setError("");
    setLoading(true);

    const handler = window.PaystackPop.setup({
      key: CFG.paystackPublicKey,
      email: email.trim(),
      amount: pricing.amountKobo,
      currency: pricing.currency,
      ref: `AIMC-${Date.now()}-${Math.floor(Math.random() * 9000 + 1000)}`,
      metadata: {
        custom_fields: [
          {
            display_name: "Student Name",
            variable_name: "student_name",
            value: name.trim(),
          },
          {
            display_name: "Phone Number",
            variable_name: "phone_number",
            value: phone.trim(),
          },
          {
            display_name: "Course",
            variable_name: "course",
            value: CFG.courseName,
          },
          {
            display_name: "Course Start",
            variable_name: "course_start",
            value: CFG.courseStartDate,
          },
        ],
      },
      callback: (response) => {
        setLoading(false);
        setSuccess({
          ref: response.reference,
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
        });
      },
      onClose: () => setLoading(false),
    });

    handler.openIframe();
  }, [name, email, phone, paystackReady, pricing]);

  const overlay = {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.92)",
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backdropFilter: "blur(10px)",
  };
  const box = {
    background: "#0d1525",
    border: "1px solid rgba(200,245,80,0.18)",
    borderRadius: 22,
    padding: "36px 30px",
    maxWidth: 460,
    width: "100%",
    position: "relative",
    maxHeight: "92vh",
    overflowY: "auto",
  };

  // ── SUCCESS SCREEN ─────────────────────────────────────────
  if (success) {
    const waLink = `https://wa.me/${CFG.whatsappNumber}?text=${waMsg(success.ref, success.name)}`;
    return (
      <div
        style={overlay}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <div style={box}>
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: 14,
              right: 16,
              background: "none",
              border: "none",
              color: "rgba(255,255,255,0.3)",
              cursor: "pointer",
              fontSize: 22,
            }}
          >
            ✕
          </button>

          <div style={{ textAlign: "center", marginBottom: 22 }}>
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                background: "rgba(200,245,80,0.1)",
                border: "2px solid #c8f550",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
                animation: "aimcPulse 2s infinite",
              }}
            >
              <CheckCircle size={34} color="#c8f550" />
            </div>
            <div
              style={{
                fontSize: 11,
                color: "rgba(255,255,255,0.35)",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                marginBottom: 6,
              }}
            >
              Registration Confirmed ✓
            </div>
            <h3
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: 26,
                fontWeight: 800,
                color: "#f8fafc",
                margin: "0 0 4px",
              }}
            >
              You're registered, {success.name.split(" ")[0]}!
            </h3>
            <p
              style={{
                fontSize: 14,
                color: "rgba(255,255,255,0.45)",
                margin: 0,
              }}
            >
              Payment of {pricing ? pricing.priceDisplay : ""} received.
            </p>
          </div>

          <div
            style={{
              background:
                "linear-gradient(135deg, rgba(200,245,80,0.1) 0%, rgba(13,148,136,0.1) 100%)",
              border: "1px solid rgba(200,245,80,0.22)",
              borderRadius: 16,
              padding: "20px",
              marginBottom: 16,
              textAlign: "center",
            }}
          >
            <Calendar size={28} color="#c8f550" style={{ marginBottom: 10 }} />
            <div
              style={{
                fontSize: 13,
                color: "rgba(255,255,255,0.5)",
                marginBottom: 4,
              }}
            >
              Your course begins on
            </div>
            <div
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: 26,
                fontWeight: 800,
                color: "#c8f550",
                lineHeight: 1.1,
                marginBottom: 8,
              }}
            >
              {CFG.courseStartFull}
            </div>
          </div>

          <div
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 14,
              padding: "16px",
              marginBottom: 16,
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: "rgba(255,255,255,0.6)",
                marginBottom: 10,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              What's waiting for you on April 30
            </div>
            {[
              [Video, "#7c3aed", "Live workshops with the instructor"],
              [HelpCircle, "#0d9488", "Open Q&A sessions — ask anything"],
              [Users, "#be185d", "Private student community access"],
              [BookOpen, "#d97706", "All 10 modules + bonus content"],
            ].map(([Icon, color, text]) => (
              <div
                key={text}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 9,
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: `${color}18`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon size={15} color={color} />
                </div>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.65)" }}>
                  {text}
                </span>
              </div>
            ))}
          </div>

          <div
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 10,
              padding: "10px 14px",
              marginBottom: 16,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 11,
                  color: "rgba(255,255,255,0.3)",
                  textTransform: "uppercase",
                  letterSpacing: "0.07em",
                  marginBottom: 2,
                }}
              >
                Payment Reference
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#c8f550" }}>
                {success.ref}
              </div>
            </div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.25)" }}>
              Save this
            </div>
          </div>

          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 9,
              background: "#25d366",
              color: "#fff",
              fontWeight: 700,
              fontSize: 14,
              padding: "14px 20px",
              borderRadius: 12,
              textDecoration: "none",
              marginBottom: 10,
            }}
          >
            <MessageCircle size={17} /> Confirm on WhatsApp & Join Student Group
          </a>

          <p
            style={{
              textAlign: "center",
              fontSize: 11,
              color: "rgba(255,255,255,0.2)",
              margin: 0,
            }}
          >
            Check your email at{" "}
            <strong style={{ color: "rgba(255,255,255,0.38)" }}>
              {success.email}
            </strong>{" "}
            — including spam/junk.
          </p>

          <style>{`@keyframes aimcPulse { 0%,100%{box-shadow:0 0 0 0 rgba(200,245,80,0.3)} 50%{box-shadow:0 0 0 14px rgba(200,245,80,0)} }`}</style>
        </div>
      </div>
    );
  }

  // ── REGISTRATION FORM ──────────────────────────────────────
  return (
    <div
      style={overlay}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div style={box}>
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 14,
            right: 16,
            background: "none",
            border: "none",
            color: "rgba(255,255,255,0.3)",
            cursor: "pointer",
            fontSize: 22,
          }}
        >
          ✕
        </button>

        <div style={{ textAlign: "center", marginBottom: 22 }}>
          <div
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.3)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: 8,
            }}
          >
            Secure Registration
          </div>
          <h3
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: 24,
              fontWeight: 800,
              color: "#f8fafc",
              margin: "0 0 4px",
            }}
          >
            Register for the Masterclass
          </h3>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "rgba(200,245,80,0.08)",
              border: "1px solid rgba(200,245,80,0.18)",
              borderRadius: 999,
              padding: "5px 14px",
              marginTop: 8,
            }}
          >
            <Calendar size={13} color="#c8f550" />
            <span style={{ fontSize: 13, fontWeight: 700, color: "#c8f550" }}>
              Starts {CFG.courseStartDate}
            </span>
          </div>
        </div>

        <div
          style={{
            background: "rgba(200,245,80,0.05)",
            border: "1px solid rgba(200,245,80,0.12)",
            borderRadius: 12,
            padding: "13px 15px",
            marginBottom: 22,
          }}
        >
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "#c8f550",
              marginBottom: 7,
            }}
          >
            ✅ What's included in your registration:
          </div>
          {[
            "Live workshops starting April 30 — join from anywhere",
            "Open Q&A sessions with the instructor",
            "All 10 modules + bonus content",
            "Private student WhatsApp community",
            "Certificate of completion",
          ].map((item) => (
            <div
              key={item}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 7,
                fontSize: 13,
                color: "rgba(255,255,255,0.6)",
                marginBottom: 5,
              }}
            >
              <CheckCircle
                size={12}
                color="#c8f550"
                style={{ marginTop: 2, flexShrink: 0 }}
              />
              {item}
            </div>
          ))}
        </div>

        {/* Price */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 10,
            marginBottom: 20,
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: 36,
              fontWeight: 800,
              color: "#c8f550",
            }}
          >
            {pricing ? pricing.priceDisplay : "…"}
          </span>
          <span
            style={{
              fontSize: 16,
              color: "rgba(255,255,255,0.25)",
              textDecoration: "line-through",
            }}
          >
            {pricing ? pricing.priceSlash : ""}
          </span>
          <span
            style={{
              fontSize: 12,
              background: "rgba(200,245,80,0.1)",
              color: "#c8f550",
              borderRadius: 999,
              padding: "2px 10px",
              fontWeight: 700,
            }}
          >
            {pricing ? pricing.discount : ""}
          </span>
        </div>

        {[
          {
            label: "Full Name",
            type: "text",
            placeholder: "e.g. Amaka Johnson",
            val: name,
            set: setName,
          },
          {
            label: "Email Address",
            type: "email",
            placeholder: "e.g. amaka@example.com",
            val: email,
            set: setEmail,
          },
          {
            label: "Phone Number",
            type: "tel",
            placeholder: "e.g. 08012345678",
            val: phone,
            set: setPhone,
          },
        ].map(({ label, type, placeholder, val, set }) => (
          <div key={label} style={{ marginBottom: 14 }}>
            <label
              style={{
                fontSize: 12,
                color: "rgba(255,255,255,0.4)",
                display: "block",
                marginBottom: 6,
                textTransform: "uppercase",
                letterSpacing: "0.07em",
              }}
            >
              {label}
            </label>
            <input
              style={inputStyle}
              type={type}
              placeholder={placeholder}
              value={val}
              onChange={(e) => set(e.target.value)}
              onFocus={(e) =>
                (e.target.style.borderColor = "rgba(200,245,80,0.4)")
              }
              onBlur={(e) =>
                (e.target.style.borderColor = "rgba(255,255,255,0.12)")
              }
              onKeyDown={(e) => e.key === "Enter" && launchPaystack()}
            />
          </div>
        ))}

        <p
          style={{
            fontSize: 12,
            color: "rgba(255,255,255,0.3)",
            marginBottom: 16,
            lineHeight: 1.6,
          }}
        >
          <Mail size={11} style={{ display: "inline", marginRight: 4 }} />A
          confirmation email with your course schedule and session details will
          be sent to your email address after payment.
        </p>

        {error && (
          <div
            style={{
              background: "rgba(220,38,38,0.08)",
              border: "1px solid rgba(220,38,38,0.2)",
              borderRadius: 8,
              padding: "9px 12px",
              marginBottom: 14,
              fontSize: 13,
              color: "#fca5a5",
            }}
          >
            {error}
          </div>
        )}

        <button
          onClick={launchPaystack}
          disabled={loading || !pricing}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            background:
              loading || !pricing ? "rgba(200,245,80,0.5)" : "#c8f550",
            color: "#080c14",
            fontWeight: 800,
            fontSize: 16,
            padding: "16px",
            borderRadius: 12,
            border: "none",
            cursor: loading || !pricing ? "not-allowed" : "pointer",
            width: "100%",
            fontFamily: "inherit",
            transition: "all 0.2s",
          }}
        >
          {loading ? (
            <>
              <span>⏳</span> Opening Payment...
            </>
          ) : (
            <>
              <CreditCard size={19} /> Register & Pay{" "}
              {pricing ? pricing.priceDisplay : "…"}
            </>
          )}
        </button>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 16,
            marginTop: 13,
            flexWrap: "wrap",
          }}
        >
          {[
            <>
              <Shield size={11} /> 256-bit Encrypted
            </>,
            <>
              <Lock size={11} /> Powered by Paystack
            </>,
            <>
              <CheckCircle size={11} /> Instant Confirmation
            </>,
          ].map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                fontSize: 11,
                color: "rgba(255,255,255,0.24)",
              }}
            >
              {item}
            </div>
          ))}
        </div>

        {!paystackReady && (
          <p
            style={{
              textAlign: "center",
              fontSize: 11,
              color: "rgba(255,255,255,0.2)",
              marginTop: 8,
            }}
          >
            Loading payment system…
          </p>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────────────────────
export default function LandingPage() {
  const { d, h, m, s } = useCountdown(CFG.enrollDeadline);
  const [activeModule, setActiveModule] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const pricing = usePricing();

  const S = {
    page: {
      fontFamily: "'DM Sans',sans-serif",
      background: "#080c14",
      color: "#f8fafc",
      minHeight: "100vh",
      overflowX: "hidden",
      margin: 0,
      padding: 0,
    },
    wrap: { maxWidth: 1080, margin: "0 auto", padding: "0 24px" },
    sec: { padding: "78px 0" },
    label: {
      display: "inline-block",
      background: "rgba(200,245,80,0.09)",
      color: "#c8f550",
      border: "1px solid rgba(200,245,80,0.2)",
      borderRadius: 999,
      padding: "5px 16px",
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      marginBottom: 20,
    },
    h2: {
      fontFamily: "'Playfair Display',serif",
      fontSize: "clamp(28px,5vw,48px)",
      fontWeight: 800,
      lineHeight: 1.1,
      marginBottom: 14,
    },
    muted: { color: "rgba(248,250,252,0.52)", lineHeight: 1.75, fontSize: 15 },
    card: {
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: 16,
      padding: "22px 20px",
    },
    btn: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      background: "#c8f550",
      color: "#080c14",
      fontWeight: 800,
      fontSize: 16,
      padding: "16px 32px",
      borderRadius: 999,
      border: "none",
      cursor: "pointer",
      textDecoration: "none",
      boxShadow: "0 8px 28px rgba(200,245,80,0.22)",
      transition: "transform 0.2s, box-shadow 0.2s",
      fontFamily: "inherit",
    },
  };

  const open = () => pricing && setShowModal(true);
  const hoverBtn = (e) => {
    e.currentTarget.style.transform = "scale(1.03)";
    e.currentTarget.style.boxShadow = "0 12px 40px rgba(200,245,80,0.36)";
  };
  const leaveBtn = (e) => {
    e.currentTarget.style.transform = "scale(1)";
    e.currentTarget.style.boxShadow = "0 8px 28px rgba(200,245,80,0.22)";
  };

  const priceLabel = pricing ? pricing.priceDisplay : "…";

  return (
    <div style={S.page}>
      {/* Global reset to remove any browser default body margin/border */}
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        html, body { margin: 0; padding: 0; background: #080c14; border: none; outline: none; }
        #root { margin: 0; padding: 0; border: none; }
        @keyframes aimcPulse { 0%,100%{box-shadow:0 0 0 0 rgba(200,245,80,0.3)} 50%{box-shadow:0 0 0 14px rgba(200,245,80,0)} }
      `}</style>
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700&family=DM+Sans:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      {showModal && pricing && (
        <PaymentModal onClose={() => setShowModal(false)} pricing={pricing} />
      )}

      {/* ── NAV ─────────────────────────────────────────────── */}
      <nav
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          padding: "14px 24px",
          position: "sticky",
          top: 0,
          zIndex: 98,
          background: "rgba(8,12,20,0.95)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div
          style={{
            ...S.wrap,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: 21,
              fontWeight: 800,
              color: "#c8f550",
            }}
          >
            AI<span style={{ color: "#fff" }}>Masterclass</span>
          </div>
          <button
            onClick={open}
            style={{
              ...S.btn,
              opacity: pricing ? 1 : 0.6,
              cursor: pricing ? "pointer" : "default",
            }}
            onMouseEnter={hoverBtn}
            onMouseLeave={leaveBtn}
          >
            Register Now — {priceLabel}
          </button>
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <header
        style={{
          padding: "80px 24px 70px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -200,
            left: "50%",
            transform: "translateX(-50%)",
            width: 800,
            height: 600,
            background:
              "radial-gradient(ellipse,rgba(200,245,80,0.07) 0%,transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ ...S.wrap, textAlign: "center", position: "relative" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(200,245,80,0.08)",
              border: "1px solid rgba(200,245,80,0.2)",
              borderRadius: 999,
              padding: "8px 20px",
              marginBottom: 20,
            }}
          >
            <Calendar size={15} color="#c8f550" />
            <span style={{ fontSize: 14, fontWeight: 700, color: "#c8f550" }}>
              Course starts {CFG.courseStartDate} — Register before spots fill
            </span>
          </div>

          <h1
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "clamp(34px,7vw,68px)",
              fontWeight: 800,
              lineHeight: 1.06,
              marginBottom: 20,
            }}
          >
            Turn AI Into Your
            <br />
            <span style={{ color: "#c8f550", fontStyle: "italic" }}>
              Biggest Business Asset
            </span>
          </h1>
          <p
            style={{
              ...S.muted,
              fontSize: "clamp(15px,2vw,18px)",
              maxWidth: 600,
              margin: "0 auto 34px",
            }}
          >
            A live, practical masterclass for business professionals ready to
            use AI for branding, sales, marketing, and scaling. Includes live
            workshops and open Q&amp;A — zero tech background required.
          </p>
          <button
            onClick={open}
            style={{ ...S.btn, fontSize: 18, padding: "19px 44px" }}
            onMouseEnter={hoverBtn}
            onMouseLeave={leaveBtn}
          >
            Secure Your Spot <ArrowRight size={20} />
          </button>
          <p
            style={{
              fontSize: 12,
              color: "rgba(255,255,255,0.28)",
              marginTop: 12,
            }}
          >
            Register today · Confirmation email sent instantly · Course begins
            April 30
          </p>

          {/* Registration deadline countdown */}
          <div style={{ marginTop: 44 }}>
            <div
              style={{
                fontSize: 12,
                color: "rgba(255,255,255,0.38)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: 14,
              }}
            >
              Registration closes in
            </div>
            <div
              style={{
                display: "flex",
                gap: 14,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              {[
                ["d", "Days"],
                ["h", "Hours"],
                ["m", "Mins"],
                ["s", "Secs"],
              ].map(([k, lbl]) => (
                <CountBox key={lbl} value={{ d, h, m, s }[k]} label={lbl} />
              ))}
            </div>
          </div>

          {/* Trust bar */}
          <div
            style={{
              display: "flex",
              gap: 28,
              justifyContent: "center",
              marginTop: 40,
              flexWrap: "wrap",
            }}
          >
            {[
              ["500+", "Professionals Enrolled"],
              ["10", "AI-Powered Modules"],
              ["Live", "Workshops Included"],
              ["April 30", "Start Date"],
            ].map(([val, lbl]) => (
              <div key={lbl} style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontSize: 20,
                    fontWeight: 800,
                    color: "#c8f550",
                    fontFamily: "'Playfair Display',serif",
                  }}
                >
                  {val}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "rgba(255,255,255,0.35)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginTop: 2,
                  }}
                >
                  {lbl}
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ── HOW IT WORKS ─────────────────────────────────────── */}
      <section
        style={{
          padding: "60px 0",
          background: "rgba(200,245,80,0.025)",
          borderTop: "1px solid rgba(200,245,80,0.07)",
          borderBottom: "1px solid rgba(200,245,80,0.07)",
        }}
      >
        <div style={S.wrap}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 44 }}>
              <div style={S.label}>How It Works</div>
              <h2 style={S.h2}>
                Register today.
                <br />
                <span style={{ color: "#c8f550", fontStyle: "italic" }}>
                  Learn live on April 30.
                </span>
              </h2>
            </div>
          </Reveal>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))",
              gap: 16,
            }}
          >
            {[
              {
                step: "01",
                icon: CreditCard,
                color: "#c8f550",
                title: "Register & Pay",
                body: `Fill in your details and pay ${priceLabel} securely via Paystack — card, bank transfer, or USSD.`,
              },
              {
                step: "02",
                icon: Mail,
                color: "#0891b2",
                title: "Get Confirmation Email",
                body: `A confirmation email is sent instantly with your schedule, session links, and how to prepare for April 30.`,
              },
              {
                step: "03",
                icon: Users,
                color: "#7c3aed",
                title: "Join Student Community",
                body: "Send your payment reference on WhatsApp to be added to the private student group before the course begins.",
              },
              {
                step: "04",
                icon: Video,
                color: "#059669",
                title: "Attend Live on April 30",
                body: "Join the live workshops, follow along, ask questions in real time, and start transforming your business.",
              },
            ].map(({ step, icon: Icon, color, title, body }, i) => (
              <Reveal key={step} delay={i * 75}>
                <div
                  style={{
                    ...S.card,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: -8,
                      right: -4,
                      fontSize: 50,
                      fontWeight: 900,
                      color: `${color}12`,
                      fontFamily: "'Playfair Display',serif",
                      lineHeight: 1,
                      userSelect: "none",
                    }}
                  >
                    {step}
                  </div>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      background: `${color}18`,
                      borderRadius: 9,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 12,
                    }}
                  >
                    <Icon size={19} color={color} />
                  </div>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: 15,
                      color: "#f8fafc",
                      marginBottom: 6,
                    }}
                  >
                    {title}
                  </div>
                  <p style={{ ...S.muted, fontSize: 13, margin: 0 }}>{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIVE EXPERIENCE CALLOUT ───────────────────────────── */}
      <section style={{ padding: "60px 24px" }}>
        <div style={{ ...S.wrap, maxWidth: 900 }}>
          <Reveal>
            <div
              style={{
                background:
                  "linear-gradient(135deg, rgba(124,58,237,0.1) 0%, rgba(13,148,136,0.1) 100%)",
                border: "1px solid rgba(124,58,237,0.2)",
                borderRadius: 22,
                padding: "40px 36px",
              }}
            >
              <div style={{ textAlign: "center", marginBottom: 32 }}>
                <div style={S.label}>Live Experience</div>
                <h2 style={S.h2}>
                  This isn't just a course.
                  <br />
                  <span style={{ color: "#c8f550", fontStyle: "italic" }}>
                    It's a live transformation.
                  </span>
                </h2>
                <p style={{ ...S.muted, maxWidth: 520, margin: "0 auto" }}>
                  Starting April 30, you'll learn live alongside other business
                  professionals with direct access to the instructor.
                </p>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
                  gap: 18,
                }}
              >
                {[
                  {
                    icon: Video,
                    color: "#7c3aed",
                    title: "Live Workshops",
                    body: "Real-time sessions where the instructor walks you through each module hands-on.",
                  },
                  {
                    icon: HelpCircle,
                    color: "#0d9488",
                    title: "Open Q&A Sessions",
                    body: "Ask your real business questions and get answers that apply directly to your situation.",
                  },
                  {
                    icon: Users,
                    color: "#be185d",
                    title: "Peer Community",
                    body: "Learn alongside other entrepreneurs and professionals — share wins, ask for feedback, build connections.",
                  },
                  {
                    icon: Rocket,
                    color: "#d97706",
                    title: "Implementation Support",
                    body: "Get help actually applying what you're learning to your business — not just watching videos.",
                  },
                ].map(({ icon: Icon, color, title, body }) => (
                  <div
                    key={title}
                    style={{
                      display: "flex",
                      gap: 14,
                      alignItems: "flex-start",
                    }}
                  >
                    <div
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: 10,
                        background: `${color}18`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={20} color={color} />
                    </div>
                    <div>
                      <div
                        style={{
                          fontWeight: 700,
                          fontSize: 15,
                          color: "#f8fafc",
                          marginBottom: 4,
                        }}
                      >
                        {title}
                      </div>
                      <p style={{ ...S.muted, fontSize: 13, margin: 0 }}>
                        {body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── WHY THIS COURSE ──────────────────────────────────── */}
      <section style={{ ...S.sec, background: "rgba(255,255,255,0.015)" }}>
        <div style={S.wrap}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 46 }}>
              <div style={S.label}>Why This Course</div>
              <h2 style={S.h2}>
                Your competitors are already
                <br />
                <span style={{ color: "#c8f550", fontStyle: "italic" }}>
                  using AI. Are you?
                </span>
              </h2>
            </div>
          </Reveal>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
              gap: 15,
            }}
          >
            {reasons.map(({ icon: Icon, title, body }, i) => (
              <Reveal key={title} delay={i * 50}>
                <div
                  style={{ ...S.card, transition: "border-color 0.2s" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.borderColor =
                      "rgba(200,245,80,0.26)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.07)")
                  }
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      background: "rgba(200,245,80,0.08)",
                      borderRadius: 9,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 12,
                    }}
                  >
                    <Icon size={19} color="#c8f550" />
                  </div>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: 15,
                      color: "#f8fafc",
                      marginBottom: 6,
                    }}
                  >
                    {title}
                  </div>
                  <p style={{ ...S.muted, fontSize: 13, margin: 0 }}>{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── COURSE OUTLINE ───────────────────────────────────── */}
      <section style={S.sec}>
        <div style={S.wrap}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 46 }}>
              <div style={S.label}>Course Outline</div>
              <h2 style={S.h2}>
                10 modules. One complete
                <br />
                <span style={{ color: "#c8f550", fontStyle: "italic" }}>
                  business transformation.
                </span>
              </h2>
              <p style={{ ...S.muted, maxWidth: 480, margin: "0 auto" }}>
                Tap any module to preview what's inside. All sessions are taught
                live starting April 30.
              </p>
            </div>
          </Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {modules.map((mod, i) => (
              <Reveal key={String(mod.num)} delay={i * 28}>
                <div
                  onClick={() => setActiveModule(activeModule === i ? null : i)}
                  style={{
                    background: "rgba(255,255,255,0.025)",
                    border: `1px solid ${activeModule === i ? mod.color + "70" : "rgba(255,255,255,0.065)"}`,
                    borderRadius: 13,
                    overflow: "hidden",
                    cursor: "pointer",
                    transition: "border-color 0.25s",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "14px 18px",
                    }}
                  >
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 7,
                        background: mod.color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 12,
                        fontWeight: 800,
                        color: "#fff",
                        flexShrink: 0,
                      }}
                    >
                      {mod.num}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontWeight: 700,
                          fontSize: 14,
                          color: "#f8fafc",
                        }}
                      >
                        {mod.title}
                      </div>
                      <div
                        style={{
                          fontSize: 11,
                          color: "rgba(255,255,255,0.33)",
                          marginTop: 2,
                        }}
                      >
                        {mod.lessons.length} lessons · Live workshop
                      </div>
                    </div>
                    <ChevronDown
                      size={15}
                      color="rgba(255,255,255,0.3)"
                      style={{
                        transform:
                          activeModule === i ? "rotate(180deg)" : "rotate(0)",
                        transition: "transform 0.3s",
                        flexShrink: 0,
                      }}
                    />
                  </div>
                  <div
                    style={{
                      maxHeight: activeModule === i ? 280 : 0,
                      overflow: "hidden",
                      transition: "max-height 0.4s ease",
                    }}
                  >
                    <div
                      style={{
                        padding: "2px 18px 14px 62px",
                        display: "flex",
                        flexDirection: "column",
                        gap: 7,
                      }}
                    >
                      {mod.lessons.map((l, j) => (
                        <div
                          key={j}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 8,
                            fontSize: 13,
                            color: "rgba(255,255,255,0.58)",
                          }}
                        >
                          <CheckCircle
                            size={12}
                            color={mod.color}
                            style={{ marginTop: 2, flexShrink: 0 }}
                          />
                          {l}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────── */}
      <section style={{ ...S.sec, background: "rgba(255,255,255,0.015)" }}>
        <div style={S.wrap}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 46 }}>
              <div style={S.label}>Student Results</div>
              <h2 style={S.h2}>
                Real professionals.
                <br />
                <span style={{ color: "#c8f550", fontStyle: "italic" }}>
                  Real results.
                </span>
              </h2>
            </div>
          </Reveal>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
              gap: 15,
            }}
          >
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 55}>
                <div
                  style={{
                    ...S.card,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <StarRow n={t.stars} />
                  <p
                    style={{
                      ...S.muted,
                      fontSize: 14,
                      margin: "0 0 auto",
                      lineHeight: 1.7,
                      fontStyle: "italic",
                    }}
                  >
                    "{t.text}"
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      marginTop: 16,
                      paddingTop: 13,
                      borderTop: "1px solid rgba(255,255,255,0.05)",
                    }}
                  >
                    <div
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: "50%",
                        background: t.color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 700,
                        fontSize: 12,
                        color: "#fff",
                        flexShrink: 0,
                      }}
                    >
                      {t.avatar}
                    </div>
                    <div>
                      <div
                        style={{
                          fontWeight: 700,
                          fontSize: 13,
                          color: "#f8fafc",
                        }}
                      >
                        {t.name}
                      </div>
                      <div
                        style={{
                          fontSize: 11,
                          color: "rgba(255,255,255,0.33)",
                        }}
                      >
                        {t.role}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────────────── */}
      <section style={S.sec}>
        <div style={{ ...S.wrap, maxWidth: 600 }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <div style={S.label}>Register Today</div>
              <h2 style={S.h2}>
                One investment.
                <br />
                <span style={{ color: "#c8f550", fontStyle: "italic" }}>
                  A live learning experience.
                </span>
              </h2>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(200,245,80,0.16)",
                borderRadius: 22,
                padding: "34px 28px",
              }}
            >
              {/* Urgency */}
              <div
                style={{
                  background: "rgba(220,38,38,0.07)",
                  border: "1px solid rgba(220,38,38,0.18)",
                  borderRadius: 10,
                  padding: "11px 14px",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 20,
                }}
              >
                <Clock size={14} color="#f87171" />
                <span
                  style={{ fontSize: 13, color: "#f87171", fontWeight: 600 }}
                >
                  Registration closes April 28 — {d}d {h}h {m}m remaining
                </span>
              </div>

              {/* Start date */}
              <div
                style={{
                  background: "rgba(200,245,80,0.06)",
                  border: "1px solid rgba(200,245,80,0.14)",
                  borderRadius: 10,
                  padding: "11px 14px",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 22,
                }}
              >
                <Calendar size={14} color="#c8f550" />
                <span
                  style={{ fontSize: 13, color: "#c8f550", fontWeight: 600 }}
                >
                  Course begins {CFG.courseStartFull}
                </span>
              </div>

              <div style={{ textAlign: "center", marginBottom: 20 }}>
                <div
                  style={{
                    fontFamily: "'Playfair Display',serif",
                    fontSize: 48,
                    fontWeight: 800,
                    color: "#c8f550",
                    lineHeight: 1,
                  }}
                >
                  {priceLabel}
                </div>
                <div
                  style={{
                    fontSize: 15,
                    color: "rgba(255,255,255,0.26)",
                    textDecoration: "line-through",
                    marginTop: 3,
                  }}
                >
                  {pricing ? pricing.priceSlash : ""}
                </div>
                <div
                  style={{
                    display: "inline-block",
                    background: "rgba(200,245,80,0.09)",
                    color: "#c8f550",
                    borderRadius: 999,
                    padding: "3px 12px",
                    fontSize: 11,
                    fontWeight: 700,
                    marginTop: 7,
                  }}
                >
                  {pricing ? pricing.saveLabel : ""}
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "7px 12px",
                  marginBottom: 24,
                }}
              >
                {[
                  "Live workshops from April 30",
                  "Open Q&A sessions",
                  "10 modules + bonus content",
                  "Private student community",
                  "Certificate of completion",
                  "Lifetime access to recordings",
                  "Live brand & website project",
                  "Instructor support",
                ].map((item) => (
                  <div
                    key={item}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 7,
                      fontSize: 13,
                      color: "rgba(255,255,255,0.66)",
                    }}
                  >
                    <CheckCircle size={13} color="#c8f550" /> {item}
                  </div>
                ))}
              </div>

              <button
                onClick={open}
                style={{
                  ...S.btn,
                  width: "100%",
                  fontSize: 17,
                  padding: "18px",
                  boxSizing: "border-box",
                  opacity: pricing ? 1 : 0.6,
                }}
                onMouseEnter={hoverBtn}
                onMouseLeave={leaveBtn}
              >
                <CreditCard size={19} /> Register Now — {priceLabel}
              </button>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 16,
                  marginTop: 13,
                  flexWrap: "wrap",
                }}
              >
                {[
                  <>
                    <Shield size={11} /> Paystack Secured
                  </>,
                  <>
                    <Mail size={11} /> Email Confirmation Sent
                  </>,
                  <>
                    <Calendar size={11} /> Starts April 30
                  </>,
                ].map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      fontSize: 11,
                      color: "rgba(255,255,255,0.24)",
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section
        style={{ padding: "60px 0", background: "rgba(255,255,255,0.015)" }}
      >
        <div style={{ ...S.wrap, maxWidth: 650 }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <div style={S.label}>FAQ</div>
              <h2 style={S.h2}>
                Questions before
                <br />
                <span style={{ color: "#c8f550", fontStyle: "italic" }}>
                  you register?
                </span>
              </h2>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div style={S.card}>
              {faqs.map((f, i) => (
                <FAQItem key={i} {...f} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FINAL BANNER ─────────────────────────────────────── */}
      <section
        style={{
          padding: "60px 24px",
          background:
            "linear-gradient(135deg,rgba(200,245,80,0.055) 0%,rgba(13,148,136,0.055) 100%)",
          borderTop: "1px solid rgba(200,245,80,0.08)",
        }}
      >
        <div style={{ ...S.wrap, textAlign: "center" }}>
          <Reveal>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(220,38,38,0.1)",
                border: "1px solid rgba(220,38,38,0.22)",
                borderRadius: 999,
                padding: "6px 18px",
                marginBottom: 20,
              }}
            >
              <Clock size={14} color="#f87171" />
              <span style={{ fontSize: 13, fontWeight: 700, color: "#f87171" }}>
                Registration closes April 28 — {d}d {h}h left
              </span>
            </div>
            <h2 style={{ ...S.h2, marginBottom: 12 }}>
              April 30 is coming fast.
              <br />
              <span style={{ color: "#c8f550", fontStyle: "italic" }}>
                Secure your place today.
              </span>
            </h2>
            <p style={{ ...S.muted, maxWidth: 440, margin: "0 auto 26px" }}>
              Limited spots available. Register now and join hundreds of
              business professionals transforming their businesses with AI.
            </p>
            <button
              onClick={open}
              style={{ ...S.btn, fontSize: 17, padding: "18px 40px" }}
              onMouseEnter={hoverBtn}
              onMouseLeave={leaveBtn}
            >
              Register Now — {priceLabel} <ArrowRight size={18} />
            </button>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <footer
        style={{
          borderTop: "1px solid rgba(255,255,255,0.05)",
          padding: "34px 24px",
          textAlign: "center",
          background: "#080c14",
        }}
      >
        <div
          style={{
            fontFamily: "'Playfair Display',serif",
            fontSize: 20,
            fontWeight: 800,
            color: "#c8f550",
            marginBottom: 5,
          }}
        >
          AI<span style={{ color: "rgba(255,255,255,0.4)" }}>Masterclass</span>
        </div>
        <p
          style={{
            fontSize: 12,
            color: "rgba(255,255,255,0.2)",
            marginBottom: 14,
          }}
        >
          AI-Powered Digital Marketing & Business Growth Masterclass — Starts
          April 30, 2026
        </p>
        <div
          style={{
            display: "flex",
            gap: 20,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {["Privacy Policy", "Terms of Service", "Contact Support"].map(
            (l) => (
              <a
                key={l}
                href="#"
                style={{
                  fontSize: 12,
                  color: "rgba(255,255,255,0.22)",
                  textDecoration: "none",
                }}
              >
                {l}
              </a>
            ),
          )}
        </div>
        <p
          style={{
            fontSize: 11,
            color: "rgba(255,255,255,0.1)",
            marginTop: 16,
          }}
        >
          © 2026 AI Marketing Masterclass. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
