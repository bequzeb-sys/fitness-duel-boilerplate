import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// ─── Coach Alexandre IA ──────────────────────────────────────────────────────
// Local fitness coaching responses. No API key needed — runs entirely offline.
// ─────────────────────────────────────────────────────────────────────────────

const messageSchema = z.object({
  message: z.string().min(1).max(2000),
});

const userNameSchema = z
  .string()
  .min(1)
  .max(30)
  .regex(/^[a-zA-ZÀ-ÿ\s']+$/, "Caractères invalides");

// ─── In-memory rate limiting ───────────────────────────────────────────────
// 30 requests per minute per IP. Resets on server restart.
// For production, replace with Redis or Supabase-based rate limiting.
// ─────────────────────────────────────────────────────────────────────────────
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 30;
const WINDOW_MS = 60_000;

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

// ─── Response pool ──────────────────────────────────────────────────────────
const COACH_RESPONSES: Record<string, string[]> = {
  squats: [
    "Les squats, c'est la base de tout ! Garde tes genoux alignés avec tes orteils, descends jusqu'à 90° et pousses fort. Thomas n'a qu'à bien se tenir !",
    "Squats profonds ou rien ! Chaque répétition compte. Contracte tes fessiers en haut du mouvement et tu sentiras la différence dès demain matin.",
    "Tes cuisses sont le moteur de ta puissance ! 3 séries de 15 squats aujourd'hui et Lucas ne pourra plus te regarder dans les yeux.",
    "La forme c'est tout ! Dos droit, pieds à la largeur des épaules, descends comme si tu allais t'asseoir sur une chaise invisible. Engage tes fessiers en premier.",
  ],
  cardio: [
    "Le cardio, c'est le moteur de la performance ! Cours au moins 20 minutes pour brûler les graisses et améliorer ton endurance. Lucas ne pourra pas te suivre !",
    "Allez, en route pour ta session cardio ! 5 minutes de course, 1 minute de repos, répète 4 fois. Tu vas sentir la chaleur monter et tes muscles s'activer.",
    "Le running ne ment jamais. Chaque kilomètre te rapproche du titre LEGENDE. Thomas a peut-être de l'avance, mais l'endurance, ça se construit jour après jour !",
    "Ton coeur est un muscle lui aussi ! Plus tu le fais travailler, plus il devient efficace. 30 minutes de cardio modere et tu seras injouable au prochain defi.",
  ],
  challenge: [
    "Les defis sont le coeur de Fitness Duel ! Chaque combat gagne te rapproche du titre LEGENDE. Lance un defi a Camille maintenant !",
    "C'est l'heure du combat ! Defie Thomas sur les pompes ou lance un defi running a Lucas. Chaque victoire = +XP massif et le respect de Chloe !",
    "Tu veux monter de niveau ? Defie un ami. Un combat de 2 minutes de pompes suffira a montrer qui est le patron sur Fitness Duel !",
    "Les defis ne se gagnent pas tout seuls ! Selectionne un ami, choisis ton epreuve et envoie la notification. C'est maintenant ou jamais.",
  ],
  rest: [
    "La recuperation fait partie de l'entrainement ! Dors 8h, hydrate-toi et etire-toi. Un muscle repose est un muscle qui repousse ses limites !",
    "Pas d'entrainement aujourd'hui ? Parfait ! Laisse tes muscles se reconstruire. Bois beaucoup d'eau, mange des proteines et regarde ton XP grimper en dormant.",
    "Le repos est un outil de champion. Tu as donne a fond hier, aujourd'hui tu recuperes. Etirements legers et hydration maximale. Ton corps te remerciera demain !",
    "Ton corps se construit pendant le repos ! 7-8 heures de sommeil, des proteines a chaque repas et demain tu reviens plus fort que jamais.",
  ],
  xp: [
    "Chaque XP compte ! Tu es a 2150 XP, il ne te manque que 350 XP pour devenir LEGENDE. Vas-y, bats ton record personnel !",
    "Tu veux monter de 350 XP aujourd'hui ? Defie-toi a fond, valide tes seances et lance un defi a Thomas. Chaque XP te rapproche du sommet.",
    "L'XP ne ment pas — plus tu t'entraines, plus tu montes ! Un defi gagne ici, une seance la, et le titre LEGENDE sera tien avant la fin de la semaine.",
    "La progression est ta meilleure alliee. Chaque seance te donne de l'XP, chaque defi gagne te rapproche du podium. Reste constant et les resultats suivront !",
  ],
  diet: [
    "L'entrainement c'est 50%, la nutrition c'est 50% ! Proteines a chaque repas, evite les sucres rapides et bois au moins 2 litres d'eau par jour.",
    "Mange pour performer ! Oeufs, poulet, riz complet, legumes verts — c'est le combo gagnant de tout athlète. Thomas qui mange des chips pendant que tu t'eleves ? Facile.",
    "Hydratation + proteines = gains. 2 litres d'eau par jour minimum et 1.6g de proteines par kg de poids corporel. Camille va se demander comment tu t'eleves aussi vite !",
    "Avant l'entrainement : glucides complexes (riz, pates). Apres : proteines + bons lipides. Simple, efficace, et tes muscles vont adorer ca.",
  ],
  morning: [
    "Le soleil se leve et tu t'eleves deja ? C'est ca la mentalite GUERRIER ! Une seance matinale et toute ta journee sera surbosstee.",
    "Les champions se reveillent avant les autres ! 20 minutes de mobilite matinale, 10 pompes, 10 squats et tu es pret a conquerir la journee.",
    "Le matin, ton cortisol est haut et ta motivation est pure. Profite d'une seance courte mais intense avant que le monde ne te ratrape.",
    "Morning workout = energie pour toute la journee. 15 minutes de body-weight training maintenant et tu seras intenable au travail et avec tes amis !",
  ],
  consistency: [
    "Un jour ne fait pas une carriere. Mais 30 jours d'affilee ? La on parle de resultats ! Reste constant, bats-toi chaque jour un peu plus.",
    "La regularite bat toujours l'intensite ponctuelle. 20 minutes par jour, tous les jours, c'est mieux que 3 heures un seul jour. Construis ta routine champion !",
    "Chaque seance compte ! Meme 10 minutes de mobilite ou d'etirements maintient ta streak active. Thomas va voir ta sequence de jours et il va avoir peur.",
    "La discipline, c'est faire meme quand tu n'as pas envie. C'est ca qui separe les GUERRIER des autres. Tomorrow morning, same time, same place.",
  ],
  friend: [
    "Thomas, Camille, Lucas, Chloe — ils sont tous dans le meme defi que toi ! Verifie leurs dernieres activites et lance-leur un defi ce soir. La competition nourrit la motivation !",
    "Camille a poste un nouveau record de course hier ! Il est temps de montrer qui tu es vraiment. Defi running ou pompes, choix du terrain : a toi !",
    "Lucas et Thomas se sont affrontes hier — et personne ne sait qui a gagne ! Rejoins le match et ramasse l'XP des deux cotes.",
    "Chloe a atteint le niveau GUERRIER la semaine derniere. Le moment parfait pour un defi amical et voir qui est vraiment le patron de Fitness Duel !",
  ],
  default: [
    "Chaque jour est une opportunite de repousser tes limites ! Tu es a 2150 XP, il ne te manque que 350 XP pour le titre LEGENDE. Let's go !",
    "Je sens ta motivation aujourd'hui ! Une seance de 30 minutes, un defi lance a un ami et ton XP va exploser. On y va ?",
    "Chaque repetition te rend plus fort. Chaque defi gagne te rapproche du sommet. Thomas et Lucas te surveillent — montre-leur qui tu es !",
    "Pas d'excuses aujourd'hui ! Si tu as 20 minutes, tu as assez pour une seance complete. Squats, pompes, course — choose ton arme.",
    "Le chemin vers LEGENDE est pave de seances quotidiennes. Tu es a mi-chemin ! Reste concentre, reste affame. On se retrouve au sommet.",
    "Ton corps est ton meilleur outil de guerre. Entraine-le chaque jour comme un champion et les resultats parleront d'eux-memes. Let's go GUERRIER !",
  ],
};

const KEYWORDS: Record<string, (string | string[])[]> = {
  squats: ["squat", "pompe", "push-up", "haltère", "bras", "pectoraux", "musculation", "abdos", "gainage", "planche"],
  cardio: ["course", "cardio", "running", "sprint", "endurance", "km", "marche", "velo", "natation", "footing", "jogging"],
  challenge: ["defi", "combat", "battle", "vs", "affrontement", "match", "duel", "concours", "gagner", "victoire"],
  rest: ["repos", "recuperation", "dodo", "sommeil", "fatigue", "etirement", "etirements", "reposer", "mobilite"],
  xp: ["xp", "experience", "niveau", "level", "progression", "point", "score", "classement", "rang"],
  diet: ["manger", "nutrition", "proteine", "proteines", "regime", "alimentation", ["eau", "boire"], "hydratation", "kcal", "calories", "repas"],
  morning: ["matin", "lever", "reveil", "7h", "8h", "aureole"],
  consistency: ["routine", "quotidien", "chaque jour", "streak", "sequence", "regulier", "reguliere", "constance", "habitude"],
  friend: ["thomas", "camille", "lucas", "chloe", "ami", "amis", "copain", "potes", "amical"],
};

function getRandomResponse(category: string): string {
  const pool = (COACH_RESPONSES[category] ?? COACH_RESPONSES.default)!;
  const fallback = COACH_RESPONSES.default![0] ?? "";
  return pool[Math.floor(Math.random() * pool.length)] ?? fallback;
}

function selectCategory(message: string): string {
  const msgLower = (message ?? "").toLowerCase();
  for (const [cat, keywords] of Object.entries(KEYWORDS)) {
    for (const kw of keywords) {
      if (Array.isArray(kw)) {
        if (kw.every((w) => msgLower.includes(w))) return cat;
      } else {
        if (msgLower.includes(kw)) return cat;
      }
    }
  }
  return "default";
}

export async function POST(req: NextRequest) {
  // Rate limit by IP
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!rateLimit(ip)) {
    return NextResponse.json(
      { code: "RATE_LIMIT", text: "Trop de requetes ! Reviens dans une minute. Laisse tes muscles recuperer. 💪" },
      { status: 429 }
    );
  }

  // Validate X-User-Name header (sanitised — used only in text replacement)
  const rawUserName = req.headers.get("X-User-Name") ?? "Champion";
  const nameResult = userNameSchema.safeParse(rawUserName);
  const userName = nameResult.success ? nameResult.data : "Champion";

  // Validate body
  try {
    const body = await req.json();
    const { message } = messageSchema.parse(body);

    await new Promise((resolve) => setTimeout(resolve, 600 + Math.random() * 400));

    const category = selectCategory(message);
    const raw = getRandomResponse(category);
    // Safe replacement: alphanumeric/space/accent chars only in userName
    const safeName = nameResult.success ? nameResult.data : "Champion";
    const text = raw.replace(/Champion/gi, safeName);

    return NextResponse.json({ text });
  } catch (err) {
    if (err instanceof z.ZodError) {
    return NextResponse.json(
      { code: "INVALID_MESSAGE", text: "Message invalide. Réessaie avec du texte classique." },
      { status: 400 }
    );
    }
    return NextResponse.json(
      { code: "SERVER_ERROR", text: "Je m'étire un peu l'esprit ! Réessaie dans quelques instants." },
      { status: 500 }
    );
  }
}
