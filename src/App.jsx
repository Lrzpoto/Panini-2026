import { useState, useEffect } from "react";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = "https://boufkkuhljtqrwikoxzp.supabase.co";
const SUPABASE_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvdWZra3VobGp0cXJ3aWtveHpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA5MzE5MzMsImV4cCI6MjA5NjUwNzkzM30.618ZpWLYxR_qwxMnTuEkTtfvVcptqqkSkCkA4Byzcrs";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON);

// ── RÉGIONS & DÉPARTEMENTS ───────────────────────────────────────
const REGIONS = [
  { id:"idf", name:"Île-de-France", color:"#4a9eff",
    depts:[{n:"75",l:"Paris"},{n:"77",l:"Seine-et-Marne"},{n:"78",l:"Yvelines"},{n:"91",l:"Essonne"},{n:"92",l:"Hauts-de-Seine"},{n:"93",l:"Seine-Saint-Denis"},{n:"94",l:"Val-de-Marne"},{n:"95",l:"Val-d'Oise"}]},
  { id:"ara", name:"Auvergne-Rhône-Alpes", color:"#f97316",
    depts:[{n:"01",l:"Ain"},{n:"03",l:"Allier"},{n:"07",l:"Ardèche"},{n:"15",l:"Cantal"},{n:"26",l:"Drôme"},{n:"38",l:"Isère"},{n:"42",l:"Loire"},{n:"43",l:"Haute-Loire"},{n:"63",l:"Puy-de-Dôme"},{n:"69",l:"Rhône"},{n:"73",l:"Savoie"},{n:"74",l:"Haute-Savoie"}]},
  { id:"na", name:"Nouvelle-Aquitaine", color:"#a78bfa",
    depts:[{n:"16",l:"Charente"},{n:"17",l:"Charente-Maritime"},{n:"19",l:"Corrèze"},{n:"23",l:"Creuse"},{n:"24",l:"Dordogne"},{n:"33",l:"Gironde"},{n:"40",l:"Landes"},{n:"47",l:"Lot-et-Garonne"},{n:"64",l:"Pyrénées-Atlantiques"},{n:"79",l:"Deux-Sèvres"},{n:"86",l:"Vienne"},{n:"87",l:"Haute-Vienne"}]},
  { id:"occ", name:"Occitanie", color:"#f43f5e",
    depts:[{n:"09",l:"Ariège"},{n:"11",l:"Aude"},{n:"12",l:"Aveyron"},{n:"30",l:"Gard"},{n:"31",l:"Haute-Garonne"},{n:"32",l:"Gers"},{n:"34",l:"Hérault"},{n:"46",l:"Lot"},{n:"48",l:"Lozère"},{n:"65",l:"Hautes-Pyrénées"},{n:"66",l:"Pyrénées-Orientales"},{n:"81",l:"Tarn"},{n:"82",l:"Tarn-et-Garonne"}]},
  { id:"hdf", name:"Hauts-de-France", color:"#34d399",
    depts:[{n:"02",l:"Aisne"},{n:"59",l:"Nord"},{n:"60",l:"Oise"},{n:"62",l:"Pas-de-Calais"},{n:"80",l:"Somme"}]},
  { id:"ge", name:"Grand Est", color:"#60a5fa",
    depts:[{n:"08",l:"Ardennes"},{n:"10",l:"Aube"},{n:"51",l:"Marne"},{n:"52",l:"Haute-Marne"},{n:"54",l:"Meurthe-et-Moselle"},{n:"55",l:"Meuse"},{n:"57",l:"Moselle"},{n:"67",l:"Bas-Rhin"},{n:"68",l:"Haut-Rhin"},{n:"88",l:"Vosges"}]},
  { id:"pdl", name:"Pays de la Loire", color:"#fbbf24",
    depts:[{n:"44",l:"Loire-Atlantique"},{n:"49",l:"Maine-et-Loire"},{n:"53",l:"Mayenne"},{n:"72",l:"Sarthe"},{n:"85",l:"Vendée"}]},
  { id:"bre", name:"Bretagne", color:"#818cf8",
    depts:[{n:"22",l:"Côtes-d'Armor"},{n:"29",l:"Finistère"},{n:"35",l:"Ille-et-Vilaine"},{n:"56",l:"Morbihan"}]},
  { id:"nor", name:"Normandie", color:"#2dd4bf",
    depts:[{n:"14",l:"Calvados"},{n:"27",l:"Eure"},{n:"50",l:"Manche"},{n:"61",l:"Orne"},{n:"76",l:"Seine-Maritime"}]},
  { id:"bfc", name:"Bourgogne-Franche-Comté", color:"#fb923c",
    depts:[{n:"21",l:"Côte-d'Or"},{n:"25",l:"Doubs"},{n:"39",l:"Jura"},{n:"58",l:"Nièvre"},{n:"70",l:"Haute-Saône"},{n:"71",l:"Saône-et-Loire"},{n:"89",l:"Yonne"},{n:"90",l:"Territoire de Belfort"}]},
  { id:"cvl", name:"Centre-Val de Loire", color:"#4ade80",
    depts:[{n:"18",l:"Cher"},{n:"28",l:"Eure-et-Loir"},{n:"36",l:"Indre"},{n:"37",l:"Indre-et-Loire"},{n:"41",l:"Loir-et-Cher"},{n:"45",l:"Loiret"}]},
  { id:"paca", name:"Provence-Alpes-Côte d'Azur", color:"#e879f9",
    depts:[{n:"04",l:"Alpes-de-Haute-Provence"},{n:"05",l:"Hautes-Alpes"},{n:"06",l:"Alpes-Maritimes"},{n:"13",l:"Bouches-du-Rhône"},{n:"83",l:"Var"},{n:"84",l:"Vaucluse"}]},
  { id:"cor", name:"Corse", color:"#a3e635",
    depts:[{n:"2A",l:"Corse-du-Sud"},{n:"2B",l:"Haute-Corse"}]},
  { id:"dom", name:"DOM-TOM", color:"#38bdf8",
    depts:[{n:"971",l:"Guadeloupe"},{n:"972",l:"Martinique"},{n:"973",l:"Guyane"},{n:"974",l:"La Réunion"},{n:"976",l:"Mayotte"}]},
];

// ── STICKERS ─────────────────────────────────────────────────────
const ZONES = [
  { id:"special", label:"⭐ Spéciaux", color:"#ffd700",
    teams:[{name:"Stickers Spéciaux",code:"SP",flag:"✨",color:"#ffd700",stickers:68}]},
  { id:"europe", label:"🌍 Europe", color:"#4a9eff",
    teams:[
      {name:"France",code:"FRA",flag:"🇫🇷",color:"#002395",stickers:18},
      {name:"Espagne",code:"ESP",flag:"🇪🇸",color:"#c60b1e",stickers:18},
      {name:"Allemagne",code:"GER",flag:"🇩🇪",color:"#333",stickers:18},
      {name:"Angleterre",code:"ENG",flag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",color:"#CF081F",stickers:18},
      {name:"Portugal",code:"POR",flag:"🇵🇹",color:"#006600",stickers:18},
      {name:"Pays-Bas",code:"NED",flag:"🇳🇱",color:"#FF6600",stickers:18},
      {name:"Belgique",code:"BEL",flag:"🇧🇪",color:"#FFD700",stickers:18},
      {name:"Croatie",code:"CRO",flag:"🇭🇷",color:"#FF0000",stickers:18},
      {name:"Suisse",code:"SUI",flag:"🇨🇭",color:"#FF0000",stickers:18},
      {name:"Autriche",code:"AUT",flag:"🇦🇹",color:"#ED2939",stickers:18},
      {name:"Danemark",code:"DEN",flag:"🇩🇰",color:"#C60C30",stickers:18},
      {name:"Écosse",code:"SCO",flag:"🏴󠁧󠁢󠁳󠁣󠁴󠁿",color:"#003399",stickers:18},
      {name:"Turquie",code:"TUR",flag:"🇹🇷",color:"#E30A17",stickers:18},
      {name:"Slovaquie",code:"SVK",flag:"🇸🇰",color:"#0B4EA2",stickers:18},
      {name:"Hongrie",code:"HUN",flag:"🇭🇺",color:"#CE2939",stickers:18},
      {name:"Géorgie",code:"GEO",flag:"🇬🇪",color:"#FF0000",stickers:18},
      {name:"Serbie",code:"SRB",flag:"🇷🇸",color:"#C6363C",stickers:18},
      {name:"Roumanie",code:"ROU",flag:"🇷🇴",color:"#002B7F",stickers:18},
    ]},
  { id:"amerique_sud", label:"🌎 Amérique du Sud", color:"#4ade80",
    teams:[
      {name:"Brésil",code:"BRA",flag:"🇧🇷",color:"#009c3b",stickers:18},
      {name:"Argentine",code:"ARG",flag:"🇦🇷",color:"#74acdf",stickers:18},
      {name:"Uruguay",code:"URU",flag:"🇺🇾",color:"#5EB6E4",stickers:18},
      {name:"Colombie",code:"COL",flag:"🇨🇴",color:"#FCD116",stickers:18},
      {name:"Équateur",code:"ECU",flag:"🇪🇨",color:"#FFD100",stickers:18},
      {name:"Venezuela",code:"VEN",flag:"🇻🇪",color:"#CF142B",stickers:18},
    ]},
  { id:"concacaf", label:"🌎 CONCACAF", color:"#ff4655",
    teams:[
      {name:"États-Unis",code:"USA",flag:"🇺🇸",color:"#3c3b6e",stickers:18},
      {name:"Mexique",code:"MEX",flag:"🇲🇽",color:"#006847",stickers:18},
      {name:"Canada",code:"CAN",flag:"🇨🇦",color:"#ff0000",stickers:18},
      {name:"Panama",code:"PAN",flag:"🇵🇦",color:"#DA121A",stickers:18},
      {name:"Costa Rica",code:"CRC",flag:"🇨🇷",color:"#002B7F",stickers:18},
      {name:"Honduras",code:"HON",flag:"🇭🇳",color:"#0073CF",stickers:18},
      {name:"Jamaïque",code:"JAM",flag:"🇯🇲",color:"#000",stickers:18},
    ]},
  { id:"afrique", label:"🌍 Afrique", color:"#fb923c",
    teams:[
      {name:"Maroc",code:"MAR",flag:"🇲🇦",color:"#c1272d",stickers:18},
      {name:"Sénégal",code:"SEN",flag:"🇸🇳",color:"#00853f",stickers:18},
      {name:"Égypte",code:"EGY",flag:"🇪🇬",color:"#CE1126",stickers:18},
      {name:"Nigeria",code:"NGA",flag:"🇳🇬",color:"#008751",stickers:18},
      {name:"Afrique du Sud",code:"RSA",flag:"🇿🇦",color:"#007A4D",stickers:18},
      {name:"Algérie",code:"ALG",flag:"🇩🇿",color:"#006233",stickers:18},
      {name:"Côte d'Ivoire",code:"CIV",flag:"🇨🇮",color:"#FF6600",stickers:18},
      {name:"Cameroun",code:"CMR",flag:"🇨🇲",color:"#007A5E",stickers:18},
      {name:"Ghana",code:"GHA",flag:"🇬🇭",color:"#006B3F",stickers:18},
    ]},
  { id:"asie", label:"🌏 Asie / Océanie", color:"#c084fc",
    teams:[
      {name:"Japon",code:"JPN",flag:"🇯🇵",color:"#bc002d",stickers:18},
      {name:"Corée du Sud",code:"KOR",flag:"🇰🇷",color:"#CD2E3A",stickers:18},
      {name:"Australie",code:"AUS",flag:"🇦🇺",color:"#00008B",stickers:18},
      {name:"Iran",code:"IRN",flag:"🇮🇷",color:"#239f40",stickers:18},
      {name:"Arabie Saoudite",code:"KSA",flag:"🇸🇦",color:"#165f2b",stickers:18},
      {name:"Irak",code:"IRQ",flag:"🇮🇶",color:"#CE1126",stickers:18},
      {name:"Ouzbékistan",code:"UZB",flag:"🇺🇿",color:"#1EB53A",stickers:18},
      {name:"Nouvelle-Zélande",code:"NZL",flag:"🇳🇿",color:"#00247D",stickers:18},
    ]},
];

const ALL_STICKERS = (() => {
  const list = []; let id = 1;
  ZONES.forEach(zone => {
    zone.teams.forEach(team => {
      for (let i=1; i<=team.stickers; i++) {
        const isSpec = zone.id==="special";
        list.push({
          id: id++, zone: zone.id, zoneLabel: zone.label, zoneColor: zone.color,
          team: team.name, code: team.code, flag: team.flag, color: team.color,
          number: `${team.code}-${String(i).padStart(2,"0")}`,
          rarity: isSpec && i<=20 ? "foil" : isSpec ? "special" : i===team.stickers ? "brillant" : "normal",
        });
      }
    });
  });
  return list;
})();
const TOTAL = ALL_STICKERS.length;

const RS = {
  normal:   {label:"Normal",    border:"#2a2a3e", bg:"#12121e", glow:"none"},
  brillant: {label:"⭐ Brillant",border:"#4a9eff", bg:"#0a1428", glow:"0 0 10px #4a9eff55"},
  special:  {label:"✨ Spécial", border:"#ffd700", bg:"#1a1400", glow:"0 0 12px #ffd70055"},
  foil:     {label:"🌈 Foil",   border:"#c084fc", bg:"#14001e", glow:"0 0 14px #c084fc66"},
};

const TABS = ["📋 Album","🔄 Doubles","💬 Messages","📍 Échangeurs"];

// ════════════════════════════════════════════════════════════════
export default function PaniniApp() {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [authMode, setAuthMode] = useState("login"); // login | register | setup
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authUsername, setAuthUsername] = useState("");
  const [authRegion, setAuthRegion] = useState("");
  const [authDept, setAuthDept] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  const [tab, setTab] = useState(0);
  const [owned, setOwned] = useState(new Set());
  const [doubles, setDoubles] = useState(new Set());
  const [collectors, setCollectors] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [msgText, setMsgText] = useState("");
  const [filterRegion, setFilterRegion] = useState("all");
  const [filterDept, setFilterDept] = useState("all");
  const [zoneFilter, setZoneFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState(null);
  const [boosterCards, setBoosterCards] = useState([]);
  const [showBooster, setShowBooster] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const showToast = (msg, type="ok") => { setToast({msg,type}); setTimeout(()=>setToast(null),3000); };

  // ── AUTH ──────────────────────────────────────────────────────
  useEffect(() => {
    supabase.auth.getSession().then(({data:{session}}) => {
      setSession(session);
      if (session) loadProfile(session.user.id);
      else setLoading(false);
    });
    const {data:{subscription}} = supabase.auth.onAuthStateChange((_,session) => {
      setSession(session);
      if (session) loadProfile(session.user.id);
      else { setLoading(false); setProfile(null); setOwned(new Set()); setDoubles(new Set()); }
    });
    return () => subscription.unsubscribe();
  }, []);

  const loadProfile = async (uid) => {
    setLoading(true);
    const {data} = await supabase.from("profiles").select("*").eq("id", uid).single();
    if (data) {
      setProfile(data);
      await loadCollection(uid);
    } else {
      setAuthMode("setup");
    }
    setLoading(false);
  };

  const loadCollection = async (uid) => {
    const {data} = await supabase.from("collection").select("*").eq("user_id", uid);
    if (data) {
      const o = new Set(), d = new Set();
      data.forEach(s => { o.add(s.sticker_number); if(s.is_double) d.add(s.sticker_number); });
      setOwned(o); setDoubles(d);
    }
  };

  const loadCollectors = async () => {
    const {data} = await supabase.from("profiles").select(`*, collection(*)`).neq("id", session?.user?.id);
    if (data) setCollectors(data);
  };

  const loadMessages = async () => {
    if (!session) return;
    const {data} = await supabase.from("messages").select("*")
      .or(`from_id.eq.${session.user.id},to_id.eq.${session.user.id}`)
      .order("created_at", {ascending: true});
    if (data) setMessages(data);
  };

  useEffect(() => { if(tab===3) loadCollectors(); }, [tab]);
  useEffect(() => { if(tab===2) loadMessages(); }, [tab]);

  const handleRegister = async () => {
    if (!authEmail || !authPassword) { showToast("Remplis email et mot de passe","err"); return; }
    setAuthLoading(true);
    const {error} = await supabase.auth.signUp({email: authEmail, password: authPassword});
    if (error) showToast(error.message, "err");
    else { showToast("✅ Compte créé ! Vérifie ton email."); setAuthMode("setup"); }
    setAuthLoading(false);
  };

  const handleLogin = async () => {
    if (!authEmail || !authPassword) { showToast("Remplis email et mot de passe","err"); return; }
    setAuthLoading(true);
    const {error} = await supabase.auth.signInWithPassword({email: authEmail, password: authPassword});
    if (error) showToast("Email ou mot de passe incorrect", "err");
    setAuthLoading(false);
  };

  const handleSetupProfile = async () => {
    if (!authUsername || !authRegion || !authDept) { showToast("Tous les champs sont requis","err"); return; }
    setAuthLoading(true);
    const ri = REGIONS.find(r=>r.id===authRegion);
    const di = ri?.depts.find(d=>d.n===authDept);
    const {error} = await supabase.from("profiles").upsert({
      id: session.user.id,
      username: authUsername,
      region: authRegion,
      dept: authDept,
      dept_label: di?.l || "",
    });
    if (error) showToast(error.message,"err");
    else { await loadProfile(session.user.id); showToast("🎉 Profil créé !"); }
    setAuthLoading(false);
  };

  const handleLogout = async () => { await supabase.auth.signOut(); };

  // ── COLLECTION ────────────────────────────────────────────────
  const toggleSticker = async (number) => {
    if (!session) return;
    setSaving(true);
    const isOwned = owned.has(number);
    if (isOwned) {
      await supabase.from("collection").delete().eq("user_id", session.user.id).eq("sticker_number", number);
      const no = new Set(owned); no.delete(number);
      const nd = new Set(doubles); nd.delete(number);
      setOwned(no); setDoubles(nd);
    } else {
      const isDouble = owned.has(number);
      await supabase.from("collection").upsert({user_id: session.user.id, sticker_number: number, is_double: isDouble});
      const no = new Set(owned); no.add(number);
      setOwned(no);
    }
    setSaving(false);
  };

  const openBooster = async () => {
    if (!session) return;
    const pool = ALL_STICKERS.filter(s => !owned.has(s.number));
    const picks = pool.sort(()=>Math.random()-.5).slice(0,7);
    const inserts = [];
    const no = new Set(owned), nd = new Set(doubles);
    picks.forEach(s => {
      const isDouble = no.has(s.number);
      if (isDouble) nd.add(s.number);
      else no.add(s.number);
      inserts.push({user_id: session.user.id, sticker_number: s.number, is_double: isDouble});
    });
    await supabase.from("collection").upsert(inserts);
    setOwned(no); setDoubles(nd);
    setBoosterCards(picks); setShowBooster(true);
    showToast(`🎴 +${picks.length} stickers !`);
  };

  // ── MESSAGERIE ────────────────────────────────────────────────
  const sendMessage = async () => {
    if (!msgText.trim() || !selectedUser) return;
    const {error} = await supabase.from("messages").insert({
      from_id: session.user.id,
      to_id: selectedUser.id,
      content: msgText.trim(),
    });
    if (!error) { setMsgText(""); await loadMessages(); }
  };

  const conversationWith = (uid) => messages.filter(m =>
    (m.from_id===session?.user?.id && m.to_id===uid) ||
    (m.from_id===uid && m.to_id===session?.user?.id)
  );

  const unreadCount = messages.filter(m => m.to_id===session?.user?.id && !m.read).length;

  // ── HELPERS ───────────────────────────────────────────────────
  const pct = Math.round((owned.size/TOTAL)*100);
  const filterDepts = filterRegion!=="all" ? (REGIONS.find(r=>r.id===filterRegion)?.depts||[]) : [];

  const filteredCollectors = collectors.filter(c => {
    const rOk = filterRegion==="all" || c.region===filterRegion;
    const dOk = filterDept==="all" || c.dept===filterDept;
    return rOk && dOk;
  }).sort((a,b) => {
    const as = (a.dept===profile?.dept)?2:(a.region===profile?.region)?1:0;
    const bs = (b.dept===profile?.dept)?2:(b.region===profile?.region)?1:0;
    return bs-as;
  });

  const getCollectorDoubles = (c) => (c.collection||[]).filter(s=>s.is_double).map(s=>s.sticker_number);
  const getCollectorMissing = (c) => {
    const theirOwned = new Set((c.collection||[]).map(s=>s.sticker_number));
    return ALL_STICKERS.filter(s=>!theirOwned.has(s.number)).map(s=>s.number);
  };
  const hasMatch = (c) => getCollectorDoubles(c).some(n => !owned.has(n));

  // ── LOADING ───────────────────────────────────────────────────
  if (loading) return (
    <div style={{background:"#07070f",minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:16}}>
      <div style={{fontSize:48}}>⚽</div>
      <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:20,letterSpacing:3,color:"#ff4655"}}>CHARGEMENT...</div>
    </div>
  );

  // ── AUTH SCREENS ─────────────────────────────────────────────
  if (!session || authMode==="setup") {
    const availDepts = authRegion ? (REGIONS.find(r=>r.id===authRegion)?.depts||[]) : [];
    return (
      <div style={{background:"#07070f",minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@400;600;700&display=swap');*{box-sizing:border-box;margin:0;padding:0}input,select{outline:none}option{background:#1a1a2e}@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}`}</style>
        <div style={{width:"100%",maxWidth:420,animation:"fadeUp .4s ease"}}>
          {/* Logo */}
          <div style={{textAlign:"center",marginBottom:32}}>
            <div style={{width:64,height:64,borderRadius:16,background:"linear-gradient(135deg,#ff4655,#ffd700)",display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:32,marginBottom:12,boxShadow:"0 8px 32px #ff465566"}}>⚽</div>
            <div style={{fontFamily:"'Bebas Neue'",fontSize:28,letterSpacing:4,color:"#fff"}}>PANINI EXCHANGE</div>
            <div style={{fontFamily:"'Bebas Neue'",fontSize:13,letterSpacing:5,color:"#ff4655"}}>FIFA WORLD CUP 2026™</div>
          </div>

          <div style={{background:"#10101a",border:"1px solid #2a2a3e",borderRadius:16,padding:28}}>
            {authMode==="setup" ? (
              <>
                <div style={{fontFamily:"'Bebas Neue'",fontSize:22,color:"#ffd700",marginBottom:20,letterSpacing:2}}>⚽ TON PROFIL</div>
                {[
                  {label:"Pseudo", val:authUsername, set:setAuthUsername, ph:"Ex: FootFan_69"},
                ].map(f=>(
                  <div key={f.label} style={{marginBottom:14}}>
                    <div style={{fontSize:11,color:"#888",marginBottom:5,fontFamily:"'Barlow'",fontWeight:600}}>{f.label.toUpperCase()}</div>
                    <input value={f.val} onChange={e=>f.set(e.target.value)} placeholder={f.ph}
                      style={{width:"100%",padding:"11px 14px",background:"#1a1a2e",border:"1px solid #2a2a3e",borderRadius:8,color:"#fff",fontSize:14,fontFamily:"'Barlow'"}}/>
                  </div>
                ))}
                <div style={{marginBottom:14}}>
                  <div style={{fontSize:11,color:"#888",marginBottom:5,fontFamily:"'Barlow'",fontWeight:600}}>TA RÉGION</div>
                  <select value={authRegion} onChange={e=>{setAuthRegion(e.target.value);setAuthDept("");}}
                    style={{width:"100%",padding:"11px 14px",background:"#1a1a2e",border:"1px solid #2a2a3e",borderRadius:8,color:"#fff",fontSize:14,fontFamily:"'Barlow'"}}>
                    <option value="">-- Choisir --</option>
                    {REGIONS.map(r=><option key={r.id} value={r.id}>{r.name}</option>)}
                  </select>
                </div>
                <div style={{marginBottom:22}}>
                  <div style={{fontSize:11,color:"#888",marginBottom:5,fontFamily:"'Barlow'",fontWeight:600}}>TON DÉPARTEMENT</div>
                  <select value={authDept} onChange={e=>setAuthDept(e.target.value)} disabled={!authRegion}
                    style={{width:"100%",padding:"11px 14px",background:authRegion?"#1a1a2e":"#0a0a12",border:"1px solid #2a2a3e",borderRadius:8,color:"#fff",fontSize:14,fontFamily:"'Barlow'",opacity:authRegion?1:.5}}>
                    <option value="">-- Choisir --</option>
                    {availDepts.map(d=><option key={d.n} value={d.n}>{d.n} – {d.l}</option>)}
                  </select>
                </div>
                <button onClick={handleSetupProfile} disabled={authLoading}
                  style={{width:"100%",padding:"13px",background:"linear-gradient(135deg,#ff4655,#cc2233)",border:"none",borderRadius:10,color:"#fff",fontFamily:"'Bebas Neue'",fontSize:17,letterSpacing:2,cursor:"pointer"}}>
                  {authLoading ? "..." : "C'EST PARTI ! 🚀"}
                </button>
              </>
            ) : (
              <>
                <div style={{display:"flex",marginBottom:24,background:"#1a1a2e",borderRadius:10,padding:4}}>
                  {["login","register"].map(m=>(
                    <button key={m} onClick={()=>setAuthMode(m)}
                      style={{flex:1,padding:"9px",border:"none",borderRadius:8,background:authMode===m?"#ff4655":"transparent",color:authMode===m?"#fff":"#888",fontFamily:"'Bebas Neue'",fontSize:14,letterSpacing:1,cursor:"pointer"}}>
                      {m==="login"?"CONNEXION":"INSCRIPTION"}
                    </button>
                  ))}
                </div>
                {[
                  {label:"Email", val:authEmail, set:setAuthEmail, ph:"ton@email.com", type:"email"},
                  {label:"Mot de passe", val:authPassword, set:setAuthPassword, ph:"••••••••", type:"password"},
                ].map(f=>(
                  <div key={f.label} style={{marginBottom:14}}>
                    <div style={{fontSize:11,color:"#888",marginBottom:5,fontFamily:"'Barlow'",fontWeight:600}}>{f.label.toUpperCase()}</div>
                    <input type={f.type} value={f.val} onChange={e=>f.set(e.target.value)} placeholder={f.ph}
                      onKeyDown={e=>e.key==="Enter"&&(authMode==="login"?handleLogin():handleRegister())}
                      style={{width:"100%",padding:"11px 14px",background:"#1a1a2e",border:"1px solid #2a2a3e",borderRadius:8,color:"#fff",fontSize:14,fontFamily:"'Barlow'"}}/>
                  </div>
                ))}
                <button onClick={authMode==="login"?handleLogin:handleRegister} disabled={authLoading}
                  style={{width:"100%",marginTop:8,padding:"13px",background:"linear-gradient(135deg,#ff4655,#cc2233)",border:"none",borderRadius:10,color:"#fff",fontFamily:"'Bebas Neue'",fontSize:17,letterSpacing:2,cursor:"pointer"}}>
                  {authLoading ? "..." : authMode==="login" ? "SE CONNECTER" : "CRÉER MON COMPTE"}
                </button>
              </>
            )}
          </div>
          {toast&&<div style={{marginTop:16,padding:"12px 16px",background:toast.type==="err"?"#2a0a0a":"#0a2a0a",border:`1px solid ${toast.type==="err"?"#ff4655":"#4ade80"}`,borderRadius:8,fontSize:13,color:"#fff",textAlign:"center"}}>{toast.msg}</div>}
        </div>
      </div>
    );
  }

  // ── APP PRINCIPALE ────────────────────────────────────────────
  const ri = REGIONS.find(r=>r.id===profile?.region);
  const filteredStickers = ALL_STICKERS.filter(s => {
    const zOk = zoneFilter==="all"||s.zone===zoneFilter;
    const sOk = search===""||s.team.toLowerCase().includes(search.toLowerCase())||s.number.toLowerCase().includes(search.toLowerCase());
    return zOk&&sOk;
  });

  return (
    <div style={{fontFamily:"'Barlow',sans-serif",background:"#07070f",minHeight:"100vh",color:"#fff",overflowX:"hidden"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@400;500;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-thumb{background:#ff4655;border-radius:3px}
        .btn{cursor:pointer;border:none;font-family:'Bebas Neue',sans-serif;letter-spacing:1px;transition:all .15s}.btn:hover{opacity:.85;transform:translateY(-1px)}
        .scard{transition:transform .15s,box-shadow .15s;cursor:pointer}.scard:hover{transform:translateY(-2px);box-shadow:0 8px 20px rgba(255,70,85,.2)}
        select,input{outline:none;color:#fff}option{background:#12121e}
        @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes toast{from{transform:translateX(110%)}to{transform:translateX(0)}}
        @keyframes foil{0%{background-position:0% 50%}100%{background-position:200% 50%}}
        .foil{background:linear-gradient(90deg,#c084fc,#ffd700,#4ade80,#4a9eff,#c084fc);background-size:300% 100%;animation:foil 2s linear infinite;-webkit-background-clip:text;-webkit-text-fill-color:transparent}
      `}</style>

      {/* HEADER */}
      <div style={{background:"linear-gradient(135deg,#12001e,#07070f,#001228)",borderBottom:"2px solid #ff4655",padding:"0 14px"}}>
        <div style={{maxWidth:980,margin:"0 auto"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 0 8px",flexWrap:"wrap",gap:8}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <div style={{width:42,height:42,borderRadius:10,background:"linear-gradient(135deg,#ff4655,#ffd700)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>⚽</div>
              <div>
                <div style={{fontFamily:"'Bebas Neue'",fontSize:18,letterSpacing:3,lineHeight:1}}>PANINI EXCHANGE</div>
                <div style={{fontFamily:"'Bebas Neue'",fontSize:11,letterSpacing:3,color:"#ff4655"}}>FIFA WORLD CUP 2026™</div>
              </div>
            </div>
            <div style={{display:"flex",gap:16,alignItems:"center",flexWrap:"wrap"}}>
              {[{v:owned.size,l:"possédés",c:"#4ade80"},{v:TOTAL-owned.size,l:"manquants",c:"#ff4655"},{v:doubles.size,l:"doubles",c:"#ffd700"}].map(s=>(
                <div key={s.l} style={{textAlign:"center"}}>
                  <div style={{fontFamily:"'Bebas Neue'",fontSize:20,color:s.c,lineHeight:1}}>{s.v}</div>
                  <div style={{fontSize:9,color:"#555"}}>{s.l}</div>
                </div>
              ))}
              <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:2}}>
                <div style={{fontSize:11,color:"#aaa",fontFamily:"'Bebas Neue'"}}>{pct}%</div>
                <div style={{width:90,height:6,background:"#1a1a2e",borderRadius:3,overflow:"hidden"}}>
                  <div style={{width:`${pct}%`,height:"100%",background:"linear-gradient(90deg,#ff4655,#ffd700)",borderRadius:3}}/>
                </div>
              </div>
              {/* Profil */}
              <div style={{display:"flex",alignItems:"center",gap:6,background:"#1a1a2e",borderRadius:8,padding:"6px 10px"}}>
                <div style={{fontSize:14}}>👤</div>
                <div>
                  <div style={{fontFamily:"'Bebas Neue'",fontSize:13,letterSpacing:1,lineHeight:1}}>{profile?.username}</div>
                  <div style={{fontSize:9,color:ri?.color||"#888"}}>{profile?.dept} – {profile?.dept_label}</div>
                </div>
                <button className="btn" onClick={handleLogout}
                  style={{marginLeft:6,padding:"3px 8px",background:"#2a1a1a",border:"1px solid #ff465533",borderRadius:5,color:"#ff4655",fontSize:10}}>
                  EXIT
                </button>
              </div>
            </div>
          </div>
          <div style={{display:"flex",gap:2}}>
            {TABS.map((t,i)=>(
              <button key={t} className="btn" onClick={()=>setTab(i)}
                style={{padding:"8px 13px",fontSize:12,background:tab===i?"#ff4655":"transparent",color:tab===i?"#fff":"#777",borderBottom:tab===i?"2px solid #ff4655":"2px solid transparent"}}>
                {t}{i===2&&unreadCount>0&&<span style={{marginLeft:4,background:"#ffd700",color:"#000",borderRadius:"50%",padding:"1px 5px",fontSize:10,fontWeight:700}}>{unreadCount}</span>}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* BOOSTER MODAL */}
      {showBooster&&(
        <div style={{position:"fixed",inset:0,background:"#000b",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100}} onClick={()=>setShowBooster(false)}>
          <div style={{background:"#12121e",border:"2px solid #ffd700",borderRadius:18,padding:24,maxWidth:460,width:"90%",animation:"fadeUp .3s ease"}} onClick={e=>e.stopPropagation()}>
            <div style={{fontFamily:"'Bebas Neue'",fontSize:24,color:"#ffd700",textAlign:"center",marginBottom:14}}>🎴 NOUVEAU BOOSTER</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(95px,1fr))",gap:8}}>
              {boosterCards.map(s=>{const rs=RS[s.rarity];return(
                <div key={s.id} style={{border:`1px solid ${rs.border}`,background:rs.bg,borderRadius:9,padding:10,textAlign:"center",boxShadow:rs.glow}}>
                  <div style={{fontSize:24}}>{s.flag}</div>
                  <div style={{fontFamily:"'Bebas Neue'",fontSize:10,color:rs.border,marginTop:3}}>{s.number}</div>
                  {s.rarity==="foil"?<div className="foil" style={{fontSize:8}}>FOIL</div>:<div style={{fontSize:8,color:"#555"}}>{rs.label}</div>}
                </div>
              );})}
            </div>
            <button className="btn" onClick={()=>setShowBooster(false)} style={{marginTop:16,width:"100%",padding:"11px",background:"#ff4655",borderRadius:9,color:"#fff",fontSize:15}}>FERMER</button>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast&&<div style={{position:"fixed",top:16,right:16,background:toast.type==="err"?"#2a0a0a":"#0a2a0a",border:`1px solid ${toast.type==="err"?"#ff4655":"#4ade80"}`,padding:"11px 16px",borderRadius:9,fontSize:13,zIndex:200,animation:"toast .3s ease",boxShadow:"0 6px 20px #0008"}}>{toast.msg}</div>}
      {saving&&<div style={{position:"fixed",bottom:16,right:16,background:"#1a1a2e",border:"1px solid #ffd70044",padding:"8px 14px",borderRadius:8,fontSize:12,color:"#ffd700",zIndex:200}}>💾 Sauvegarde...</div>}

      <div style={{maxWidth:980,margin:"0 auto",padding:"16px 14px 40px"}}>

        {/* ══ ALBUM ══ */}
        {tab===0&&(
          <div style={{animation:"fadeUp .3s ease"}}>
            <div style={{display:"flex",gap:8,marginBottom:16,flexWrap:"wrap"}}>
              <input placeholder="🔍 Équipe ou numéro..." value={search} onChange={e=>setSearch(e.target.value)}
                style={{flex:1,minWidth:150,padding:"9px 12px",background:"#12121e",border:"1px solid #2a2a3e",borderRadius:8,fontSize:13}}/>
              <select value={zoneFilter} onChange={e=>setZoneFilter(e.target.value)}
                style={{padding:"9px 12px",background:"#12121e",border:"1px solid #2a2a3e",borderRadius:8,fontSize:12}}>
                <option value="all">🌐 Toutes zones</option>
                {ZONES.map(z=><option key={z.id} value={z.id}>{z.label}</option>)}
              </select>
              <button className="btn" onClick={openBooster}
                style={{padding:"9px 16px",background:"linear-gradient(135deg,#ff4655,#cc2233)",borderRadius:8,color:"#fff",fontSize:14}}>
                🎴 BOOSTER (+7)
              </button>
            </div>
            {ZONES.filter(z=>zoneFilter==="all"||z.id===zoneFilter).map(z=>{
              const zs=filteredStickers.filter(s=>s.zone===z.id); if(!zs.length) return null;
              const zo=zs.filter(s=>owned.has(s.number)).length;
              return(
                <div key={z.id} style={{marginBottom:22}}>
                  <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
                    <div style={{fontFamily:"'Bebas Neue'",fontSize:16,color:z.color,letterSpacing:2}}>{z.label}</div>
                    <div style={{flex:1,height:1,background:`${z.color}33`}}/>
                    <div style={{fontFamily:"'Bebas Neue'",fontSize:12,color:"#555"}}>{zo}/{zs.length}</div>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(78px,1fr))",gap:5}}>
                    {zs.map(s=>{
                      const io=owned.has(s.number), id=doubles.has(s.number), rs=RS[s.rarity];
                      return(
                        <div key={s.id} className="scard" onClick={()=>toggleSticker(s.number)}
                          style={{borderRadius:8,border:`1.5px solid ${io?rs.border:"#1a1a2e"}`,background:io?rs.bg:"#0a0a12",
                            opacity:io?1:.35,padding:"9px 6px",textAlign:"center",boxShadow:io?rs.glow:"none",position:"relative"}}>
                          <div style={{fontSize:19}}>{s.flag}</div>
                          <div style={{fontFamily:"'Bebas Neue'",fontSize:10,color:io?rs.border:"#333",marginTop:2,letterSpacing:.5}}>{s.number}</div>
                          {id&&io&&<div style={{position:"absolute",top:2,right:2,background:"#c084fc",borderRadius:3,fontSize:7,padding:"1px 3px",color:"#fff",fontWeight:700}}>×2</div>}
                          {s.rarity==="foil"&&io&&<div className="foil" style={{fontSize:7}}>FOIL</div>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ══ DOUBLES ══ */}
        {tab===1&&(
          <div style={{animation:"fadeUp .3s ease"}}>
            <div style={{fontFamily:"'Bebas Neue'",fontSize:20,color:"#c084fc",marginBottom:4}}>MES DOUBLES À ÉCHANGER</div>
            <div style={{fontSize:13,color:"#666",marginBottom:16}}>{doubles.size} stickers disponibles</div>
            {doubles.size===0?(
              <div style={{textAlign:"center",padding:50,color:"#444"}}>
                <div style={{fontSize:44,marginBottom:10}}>🃏</div>
                <div>Aucun double — ouvre des boosters !</div>
              </div>
            ):(
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(130px,1fr))",gap:10}}>
                {[...doubles].map(num=>{
                  const s=ALL_STICKERS.find(c=>c.number===num); if(!s) return null;
                  const rs=RS[s.rarity];
                  return(
                    <div key={num} style={{background:rs.bg,border:`1.5px solid ${rs.border}`,borderRadius:11,padding:14,display:"flex",flexDirection:"column",alignItems:"center",gap:6,boxShadow:rs.glow}}>
                      <div style={{fontSize:30}}>{s.flag}</div>
                      <div style={{fontFamily:"'Bebas Neue'",fontSize:12,color:rs.border,letterSpacing:1}}>{s.number}</div>
                      <div style={{fontSize:10,color:"#666"}}>{s.team}</div>
                      <button className="btn" onClick={()=>{setTab(3);}}
                        style={{marginTop:4,width:"100%",padding:"7px",background:"linear-gradient(135deg,#6a0dad,#9b30e0)",borderRadius:6,color:"#fff",fontSize:12}}>
                        TROUVER ÉCHANGEUR
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ══ MESSAGES ══ */}
        {tab===2&&(
          <div style={{animation:"fadeUp .3s ease"}}>
            <div style={{fontFamily:"'Bebas Neue'",fontSize:20,color:"#4ade80",marginBottom:16}}>MESSAGERIE</div>
            {!selectedUser?(
              <>
                <div style={{fontSize:13,color:"#666",marginBottom:14}}>Sélectionne un collectionneur pour échanger</div>
                {collectors.length===0?(
                  <div style={{textAlign:"center",padding:40,color:"#444"}}>
                    <div style={{fontSize:40,marginBottom:10}}>💬</div>
                    <div>Aucun autre collectionneur inscrit pour l'instant</div>
                  </div>
                ):(
                  <div style={{display:"flex",flexDirection:"column",gap:8}}>
                    {collectors.map(c=>{
                      const conv=conversationWith(c.id);
                      const last=conv[conv.length-1];
                      const unread=conv.filter(m=>m.to_id===session.user.id&&!m.read).length;
                      const cri=REGIONS.find(r=>r.id===c.region);
                      return(
                        <div key={c.id} onClick={()=>setSelectedUser(c)}
                          style={{background:"#10101a",border:"1px solid #2a2a3e",borderRadius:12,padding:14,display:"flex",alignItems:"center",gap:12,cursor:"pointer",transition:"border-color .2s"}}
                          onMouseEnter={e=>e.currentTarget.style.borderColor="#4ade8044"}
                          onMouseLeave={e=>e.currentTarget.style.borderColor="#2a2a3e"}>
                          <div style={{width:40,height:40,borderRadius:"50%",background:cri?.color+"33",border:`2px solid ${cri?.color||"#333"}55`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>👤</div>
                          <div style={{flex:1}}>
                            <div style={{fontFamily:"'Bebas Neue'",fontSize:15,letterSpacing:1}}>{c.username}</div>
                            <div style={{fontSize:11,color:cri?.color||"#888"}}>{c.dept} – {c.dept_label}</div>
                            {last&&<div style={{fontSize:11,color:"#555",marginTop:2}}>{last.content.slice(0,40)}{last.content.length>40?"...":""}</div>}
                          </div>
                          {unread>0&&<div style={{background:"#ff4655",borderRadius:"50%",width:20,height:20,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700}}>{unread}</div>}
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            ):(
              <div style={{display:"flex",flexDirection:"column",height:"60vh"}}>
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14,background:"#10101a",borderRadius:10,padding:"10px 14px"}}>
                  <button className="btn" onClick={()=>setSelectedUser(null)}
                    style={{background:"#1a1a2e",border:"1px solid #2a2a3e",borderRadius:6,color:"#888",padding:"4px 10px",fontSize:12}}>← RETOUR</button>
                  <div style={{fontFamily:"'Bebas Neue'",fontSize:16,letterSpacing:1}}>💬 {selectedUser.username}</div>
                  <div style={{fontSize:11,color:"#666"}}>{selectedUser.dept} – {selectedUser.dept_label}</div>
                </div>
                <div style={{flex:1,overflowY:"auto",display:"flex",flexDirection:"column",gap:8,marginBottom:12,padding:"4px 0"}}>
                  {conversationWith(selectedUser.id).length===0?(
                    <div style={{textAlign:"center",padding:30,color:"#444",fontSize:13}}>Commence la conversation pour organiser votre échange !</div>
                  ):(
                    conversationWith(selectedUser.id).map(m=>{
                      const mine=m.from_id===session.user.id;
                      return(
                        <div key={m.id} style={{display:"flex",justifyContent:mine?"flex-end":"flex-start"}}>
                          <div style={{maxWidth:"72%",padding:"9px 13px",borderRadius:mine?"12px 12px 4px 12px":"12px 12px 12px 4px",
                            background:mine?"linear-gradient(135deg,#ff4655,#cc2233)":"#1a1a2e",fontSize:13}}>
                            {m.content}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
                <div style={{display:"flex",gap:8}}>
                  <input value={msgText} onChange={e=>setMsgText(e.target.value)}
                    onKeyDown={e=>e.key==="Enter"&&sendMessage()}
                    placeholder="Ton message... Ex: J'ai FRA-03 en double, tu as FRA-18 ?"
                    style={{flex:1,padding:"10px 14px",background:"#1a1a2e",border:"1px solid #2a2a3e",borderRadius:8,color:"#fff",fontSize:13}}/>
                  <button className="btn" onClick={sendMessage}
                    style={{padding:"10px 18px",background:"linear-gradient(135deg,#ff4655,#cc2233)",borderRadius:8,color:"#fff",fontSize:14}}>
                    ENVOYER
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ══ ÉCHANGEURS ══ */}
        {tab===3&&(
          <div style={{animation:"fadeUp .3s ease"}}>
            <div style={{fontFamily:"'Bebas Neue'",fontSize:20,color:"#ffd700",marginBottom:4}}>
              COLLECTIONNEURS PRÈS DE TOI
            </div>
            <div style={{fontSize:12,color:"#555",marginBottom:16}}>
              📍 Tu es dans le {profile?.dept} – {profile?.dept_label} ({ri?.name})
            </div>
            <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:16}}>
              <select value={filterRegion} onChange={e=>{setFilterRegion(e.target.value);setFilterDept("all");}}
                style={{padding:"8px 12px",background:"#12121e",border:"1px solid #2a2a3e",borderRadius:8,fontSize:12}}>
                <option value="all">🌐 Toutes les régions</option>
                {REGIONS.map(r=><option key={r.id} value={r.id}>{r.name}</option>)}
              </select>
              <select value={filterDept} onChange={e=>setFilterDept(e.target.value)} disabled={filterRegion==="all"}
                style={{padding:"8px 12px",background:filterRegion!=="all"?"#12121e":"#0a0a12",border:"1px solid #2a2a3e",borderRadius:8,fontSize:12,opacity:filterRegion!=="all"?1:.5}}>
                <option value="all">Tous les dép.</option>
                {filterDepts.map(d=><option key={d.n} value={d.n}>{d.n} – {d.l}</option>)}
              </select>
              {(filterRegion!=="all"||filterDept!=="all")&&(
                <button className="btn" onClick={()=>{setFilterRegion("all");setFilterDept("all");}}
                  style={{padding:"8px 12px",background:"#1a1a2e",border:"1px solid #ff4655",borderRadius:8,color:"#ff4655",fontSize:12}}>✕ Reset</button>
              )}
              <div style={{marginLeft:"auto",fontSize:12,color:"#555",alignSelf:"center"}}>{filteredCollectors.length} collectionneur{filteredCollectors.length>1?"s":""}</div>
            </div>

            {filteredCollectors.length===0?(
              <div style={{textAlign:"center",padding:50,color:"#444"}}>
                <div style={{fontSize:44,marginBottom:10}}>🔍</div>
                <div>Aucun collectionneur dans cette zone pour l'instant</div>
              </div>
            ):(
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:12}}>
                {filteredCollectors.map(c=>{
                  const cri=REGIONS.find(r=>r.id===c.region)||REGIONS[0];
                  const sameDept=c.dept===profile?.dept;
                  const sameRegion=c.region===profile?.region&&!sameDept;
                  const cDoubles=getCollectorDoubles(c);
                  const match=cDoubles.some(n=>!owned.has(n));
                  return(
                    <div key={c.id} style={{background:"#10101a",border:`1px solid ${sameDept?"#4ade80":sameRegion?cri.color+"88":cri.color+"33"}`,borderRadius:13,padding:16}}>
                      {sameDept&&<div style={{background:"#0a2a0a",border:"1px solid #4ade8044",borderRadius:7,padding:"5px 9px",fontSize:11,color:"#4ade80",marginBottom:10}}>📍 Même département !</div>}
                      {sameRegion&&<div style={{background:cri.color+"11",border:`1px solid ${cri.color}44`,borderRadius:7,padding:"5px 9px",fontSize:11,color:cri.color,marginBottom:10}}>🗺️ Même région</div>}
                      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
                        <div style={{width:40,height:40,borderRadius:"50%",background:cri.color+"33",border:`2px solid ${cri.color}55`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>👤</div>
                        <div style={{flex:1}}>
                          <div style={{fontFamily:"'Bebas Neue'",fontSize:15,letterSpacing:1}}>{c.username}</div>
                          <div style={{fontSize:11,color:cri.color}}>{cri.name}</div>
                          <div style={{fontSize:11,color:"#666"}}>📌 {c.dept} – {c.dept_label}</div>
                        </div>
                        <div style={{textAlign:"right"}}>
                          <div style={{fontFamily:"'Bebas Neue'",fontSize:16,color:"#c084fc"}}>{cDoubles.length}</div>
                          <div style={{fontSize:9,color:"#555"}}>doubles</div>
                        </div>
                      </div>
                      {match&&<div style={{background:"#1a1400",border:"1px solid #ffd70044",borderRadius:7,padding:"6px 10px",marginBottom:10,fontSize:12,color:"#ffd700"}}>⚡ Il a des stickers qu'il te manque !</div>}
                      {cDoubles.length>0&&(
                        <div style={{marginBottom:12}}>
                          <div style={{fontSize:11,color:"#4ade80",marginBottom:5,fontWeight:600}}>✅ SES DOUBLES ({cDoubles.length})</div>
                          <div style={{display:"flex",flexWrap:"wrap",gap:3,maxHeight:60,overflow:"hidden"}}>
                            {cDoubles.slice(0,12).map(d=>(
                              <span key={d} style={{background:"#0a1a0a",border:"1px solid #4ade8033",borderRadius:5,padding:"2px 6px",fontSize:10,color:"#4ade80",fontFamily:"'Bebas Neue'",letterSpacing:.5}}>{d}</span>
                            ))}
                            {cDoubles.length>12&&<span style={{fontSize:10,color:"#555",alignSelf:"center"}}>+{cDoubles.length-12}</span>}
                          </div>
                        </div>
                      )}
                      <button className="btn" onClick={()=>{setSelectedUser(c);setTab(2);}}
                        style={{width:"100%",padding:"10px",background:`linear-gradient(135deg,${cri.color}22,${cri.color}44)`,border:`1px solid ${cri.color}55`,borderRadius:8,color:cri.color,fontSize:13}}>
                        ✉️ CONTACTER POUR ÉCHANGER
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

      </div>

      <div style={{borderTop:"1px solid #1a1a2e",padding:"10px 20px",background:"#07070f"}}>
        <div style={{maxWidth:980,margin:"0 auto",display:"flex",gap:20,justifyContent:"center",flexWrap:"wrap"}}>
          {[{v:`${TOTAL} stickers`,l:"Total album",c:"#aaa"},{v:"68 spéciaux",l:"Foil & Spéciaux",c:"#ffd700"},{v:"48 équipes",l:"6 zones",c:"#4a9eff"},{v:"13 régions",l:"+ DOM-TOM",c:"#4ade80"}].map(s=>(
            <div key={s.l} style={{textAlign:"center"}}>
              <div style={{fontFamily:"'Bebas Neue'",fontSize:15,color:s.c}}>{s.v}</div>
              <div style={{fontSize:9,color:"#444"}}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
