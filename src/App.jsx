import { useState, useEffect, useRef } from "react";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = "https://boufkkuhljtqrwikoxzp.supabase.co";
const SUPABASE_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvdWZra3VobGp0cXJ3aWtveHpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA5MzE5MzMsImV4cCI6MjA5NjUwNzkzM30.618ZpWLYxR_qwxMnTuEkTtfvVcptqqkSkCkA4Byzcrs";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON);

const REGIONS = [
  { id:"idf", name:"Île-de-France", color:"#1d4ed8", depts:[{n:"75",l:"Paris"},{n:"77",l:"Seine-et-Marne"},{n:"78",l:"Yvelines"},{n:"91",l:"Essonne"},{n:"92",l:"Hauts-de-Seine"},{n:"93",l:"Seine-Saint-Denis"},{n:"94",l:"Val-de-Marne"},{n:"95",l:"Val-d'Oise"}]},
  { id:"ara", name:"Auvergne-Rhône-Alpes", color:"#c2410c", depts:[{n:"01",l:"Ain"},{n:"03",l:"Allier"},{n:"07",l:"Ardèche"},{n:"15",l:"Cantal"},{n:"26",l:"Drôme"},{n:"38",l:"Isère"},{n:"42",l:"Loire"},{n:"43",l:"Haute-Loire"},{n:"63",l:"Puy-de-Dôme"},{n:"69",l:"Rhône"},{n:"73",l:"Savoie"},{n:"74",l:"Haute-Savoie"}]},
  { id:"na", name:"Nouvelle-Aquitaine", color:"#6d28d9", depts:[{n:"16",l:"Charente"},{n:"17",l:"Charente-Maritime"},{n:"19",l:"Corrèze"},{n:"23",l:"Creuse"},{n:"24",l:"Dordogne"},{n:"33",l:"Gironde"},{n:"40",l:"Landes"},{n:"47",l:"Lot-et-Garonne"},{n:"64",l:"Pyrénées-Atlantiques"},{n:"79",l:"Deux-Sèvres"},{n:"86",l:"Vienne"},{n:"87",l:"Haute-Vienne"}]},
  { id:"occ", name:"Occitanie", color:"#b91c1c", depts:[{n:"09",l:"Ariège"},{n:"11",l:"Aude"},{n:"12",l:"Aveyron"},{n:"30",l:"Gard"},{n:"31",l:"Haute-Garonne"},{n:"32",l:"Gers"},{n:"34",l:"Hérault"},{n:"46",l:"Lot"},{n:"48",l:"Lozère"},{n:"65",l:"Hautes-Pyrénées"},{n:"66",l:"Pyrénées-Orientales"},{n:"81",l:"Tarn"},{n:"82",l:"Tarn-et-Garonne"}]},
  { id:"hdf", name:"Hauts-de-France", color:"#065f46", depts:[{n:"02",l:"Aisne"},{n:"59",l:"Nord"},{n:"60",l:"Oise"},{n:"62",l:"Pas-de-Calais"},{n:"80",l:"Somme"}]},
  { id:"ge", name:"Grand Est", color:"#075985", depts:[{n:"08",l:"Ardennes"},{n:"10",l:"Aube"},{n:"51",l:"Marne"},{n:"52",l:"Haute-Marne"},{n:"54",l:"Meurthe-et-Moselle"},{n:"55",l:"Meuse"},{n:"57",l:"Moselle"},{n:"67",l:"Bas-Rhin"},{n:"68",l:"Haut-Rhin"},{n:"88",l:"Vosges"}]},
  { id:"pdl", name:"Pays de la Loire", color:"#92400e", depts:[{n:"44",l:"Loire-Atlantique"},{n:"49",l:"Maine-et-Loire"},{n:"53",l:"Mayenne"},{n:"72",l:"Sarthe"},{n:"85",l:"Vendée"}]},
  { id:"bre", name:"Bretagne", color:"#3730a3", depts:[{n:"22",l:"Côtes-d'Armor"},{n:"29",l:"Finistère"},{n:"35",l:"Ille-et-Vilaine"},{n:"56",l:"Morbihan"}]},
  { id:"nor", name:"Normandie", color:"#0f766e", depts:[{n:"14",l:"Calvados"},{n:"27",l:"Eure"},{n:"50",l:"Manche"},{n:"61",l:"Orne"},{n:"76",l:"Seine-Maritime"}]},
  { id:"bfc", name:"Bourgogne-Franche-Comté", color:"#9a3412", depts:[{n:"21",l:"Côte-d'Or"},{n:"25",l:"Doubs"},{n:"39",l:"Jura"},{n:"58",l:"Nièvre"},{n:"70",l:"Haute-Saône"},{n:"71",l:"Saône-et-Loire"},{n:"89",l:"Yonne"},{n:"90",l:"Territoire de Belfort"}]},
  { id:"cvl", name:"Centre-Val de Loire", color:"#166534", depts:[{n:"18",l:"Cher"},{n:"28",l:"Eure-et-Loir"},{n:"36",l:"Indre"},{n:"37",l:"Indre-et-Loire"},{n:"41",l:"Loir-et-Cher"},{n:"45",l:"Loiret"}]},
  { id:"paca", name:"Provence-Alpes-Côte d'Azur", color:"#6b21a8", depts:[{n:"04",l:"Alpes-de-Haute-Provence"},{n:"05",l:"Hautes-Alpes"},{n:"06",l:"Alpes-Maritimes"},{n:"13",l:"Bouches-du-Rhône"},{n:"83",l:"Var"},{n:"84",l:"Vaucluse"}]},
  { id:"cor", name:"Corse", color:"#3f6212", depts:[{n:"2A",l:"Corse-du-Sud"},{n:"2B",l:"Haute-Corse"}]},
  { id:"dom", name:"DOM-TOM", color:"#0369a1", depts:[{n:"971",l:"Guadeloupe"},{n:"972",l:"Martinique"},{n:"973",l:"Guyane"},{n:"974",l:"La Réunion"},{n:"976",l:"Mayotte"}]},
];

const TEAM_COLORS = {
  FRA:"#002395",BRA:"#009c3b",ARG:"#74acdf",ESP:"#c60b1e",GER:"#1a1a2e",
  ENG:"#CF081F",POR:"#006600",NED:"#FF6600",BEL:"#2a2a00",CRO:"#FF0000",
  SUI:"#CC0000",AUT:"#ED2939",DEN:"#C60C30",SCO:"#003399",TUR:"#E30A17",
  SVK:"#0B4EA2",HUN:"#CE2939",GEO:"#CC0000",SRB:"#C6363C",ROU:"#002B7F",
  URU:"#5EB6E4",COL:"#FCD116",ECU:"#FFD100",VEN:"#CF142B",
  USA:"#3c3b6e",MEX:"#006847",CAN:"#ff0000",PAN:"#DA121A",CRC:"#002B7F",HON:"#0073CF",JAM:"#000000",
  MAR:"#c1272d",SEN:"#00853f",EGY:"#CE1126",NGA:"#008751",RSA:"#007A4D",ALG:"#006233",CIV:"#FF6600",CMR:"#007A5E",GHA:"#006B3F",
  JPN:"#bc002d",KOR:"#CD2E3A",AUS:"#00008B",IRN:"#239f40",KSA:"#165f2b",IRQ:"#CE1126",UZB:"#1EB53A",NZL:"#00247D",
  SP:"#92400e",
};

const ZONES = [
  { id:"special", label:"⭐ Spéciaux", teams:[{name:"Stickers Spéciaux",code:"SP",flag:"✨",stickers:68}]},
  { id:"europe", label:"🌍 Europe", teams:[
    {name:"France",code:"FRA",flag:"🇫🇷",stickers:18},{name:"Espagne",code:"ESP",flag:"🇪🇸",stickers:18},
    {name:"Allemagne",code:"GER",flag:"🇩🇪",stickers:18},{name:"Angleterre",code:"ENG",flag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",stickers:18},
    {name:"Portugal",code:"POR",flag:"🇵🇹",stickers:18},{name:"Pays-Bas",code:"NED",flag:"🇳🇱",stickers:18},
    {name:"Belgique",code:"BEL",flag:"🇧🇪",stickers:18},{name:"Croatie",code:"CRO",flag:"🇭🇷",stickers:18},
    {name:"Suisse",code:"SUI",flag:"🇨🇭",stickers:18},{name:"Autriche",code:"AUT",flag:"🇦🇹",stickers:18},
    {name:"Danemark",code:"DEN",flag:"🇩🇰",stickers:18},{name:"Écosse",code:"SCO",flag:"🏴󠁧󠁢󠁳󠁣󠁴󠁿",stickers:18},
    {name:"Turquie",code:"TUR",flag:"🇹🇷",stickers:18},{name:"Slovaquie",code:"SVK",flag:"🇸🇰",stickers:18},
    {name:"Hongrie",code:"HUN",flag:"🇭🇺",stickers:18},{name:"Géorgie",code:"GEO",flag:"🇬🇪",stickers:18},
    {name:"Serbie",code:"SRB",flag:"🇷🇸",stickers:18},{name:"Roumanie",code:"ROU",flag:"🇷🇴",stickers:18},
  ]},
  { id:"amerique_sud", label:"🌎 Amérique du Sud", teams:[
    {name:"Brésil",code:"BRA",flag:"🇧🇷",stickers:18},{name:"Argentine",code:"ARG",flag:"🇦🇷",stickers:18},
    {name:"Uruguay",code:"URU",flag:"🇺🇾",stickers:18},{name:"Colombie",code:"COL",flag:"🇨🇴",stickers:18},
    {name:"Équateur",code:"ECU",flag:"🇪🇨",stickers:18},{name:"Venezuela",code:"VEN",flag:"🇻🇪",stickers:18},
  ]},
  { id:"concacaf", label:"🌎 CONCACAF", teams:[
    {name:"États-Unis",code:"USA",flag:"🇺🇸",stickers:18},{name:"Mexique",code:"MEX",flag:"🇲🇽",stickers:18},
    {name:"Canada",code:"CAN",flag:"🇨🇦",stickers:18},{name:"Panama",code:"PAN",flag:"🇵🇦",stickers:18},
    {name:"Costa Rica",code:"CRC",flag:"🇨🇷",stickers:18},{name:"Honduras",code:"HON",flag:"🇭🇳",stickers:18},
    {name:"Jamaïque",code:"JAM",flag:"🇯🇲",stickers:18},
  ]},
  { id:"afrique", label:"🌍 Afrique", teams:[
    {name:"Maroc",code:"MAR",flag:"🇲🇦",stickers:18},{name:"Sénégal",code:"SEN",flag:"🇸🇳",stickers:18},
    {name:"Égypte",code:"EGY",flag:"🇪🇬",stickers:18},{name:"Nigeria",code:"NGA",flag:"🇳🇬",stickers:18},
    {name:"Afrique du Sud",code:"RSA",flag:"🇿🇦",stickers:18},{name:"Algérie",code:"ALG",flag:"🇩🇿",stickers:18},
    {name:"Côte d'Ivoire",code:"CIV",flag:"🇨🇮",stickers:18},{name:"Cameroun",code:"CMR",flag:"🇨🇲",stickers:18},
    {name:"Ghana",code:"GHA",flag:"🇬🇭",stickers:18},
  ]},
  { id:"asie", label:"🌏 Asie/Océanie", teams:[
    {name:"Japon",code:"JPN",flag:"🇯🇵",stickers:18},{name:"Corée du Sud",code:"KOR",flag:"🇰🇷",stickers:18},
    {name:"Australie",code:"AUS",flag:"🇦🇺",stickers:18},{name:"Iran",code:"IRN",flag:"🇮🇷",stickers:18},
    {name:"Arabie Saoudite",code:"KSA",flag:"🇸🇦",stickers:18},{name:"Irak",code:"IRQ",flag:"🇮🇶",stickers:18},
    {name:"Ouzbékistan",code:"UZB",flag:"🇺🇿",stickers:18},{name:"Nouvelle-Zélande",code:"NZL",flag:"🇳🇿",stickers:18},
  ]},
];

const ALL_STICKERS = (() => {
  const list = []; let id = 1;
  ZONES.forEach(z => z.teams.forEach(t => {
    for (let i=1; i<=t.stickers; i++) {
      const isSp = z.id==="special";
      list.push({ id:id++, zone:z.id, zoneLabel:z.label, team:t.name, code:t.code, flag:t.flag,
        number:`${t.code}-${String(i).padStart(2,"0")}`,
        rarity: isSp&&i<=20?"foil":isSp?"special":i===t.stickers?"brillant":"normal" });
    }
  }));
  return list;
})();
const TOTAL = ALL_STICKERS.length;

const RARITY = {
  normal:   {label:null, bg:null, color:null},
  brillant: {label:"⭐ Brillant", bg:"#dbeafe", color:"#1d4ed8"},
  special:  {label:"✨ Spécial",  bg:"#fef9c3", color:"#a16207"},
  foil:     {label:"🌈 Foil",    bg:"#f3e8ff", color:"#7c3aed"},
};

const TABS = ["Annonces","Mon album","Messages","Profil"];

const css = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=DM+Serif+Display&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'DM Sans',sans-serif;background:#f5f4f1;color:#0f0f0f}
::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:#d1d5db;border-radius:2px}
input,select,textarea{font-family:'DM Sans',sans-serif;outline:none}
option{background:#fff}
.btn{cursor:pointer;border:none;font-family:'DM Sans',sans-serif;transition:all .15s}
.btn:hover{opacity:.88}
.card{background:#fff;border:1px solid #e8e6e1;border-radius:10px;box-shadow:0 1px 4px rgba(0,0,0,.07),0 4px 16px rgba(0,0,0,.04)}
.listing-card{display:flex;overflow:hidden;transition:box-shadow .15s,transform .15s;cursor:default}
.listing-card:hover{box-shadow:0 4px 20px rgba(0,0,0,.1);transform:translateY(-1px)}
@keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
@keyframes toastIn{from{transform:translateX(110%)}to{transform:translateX(0)}}
@keyframes modalIn{from{opacity:0;transform:scale(.97)}to{opacity:1;transform:scale(1)}}
`;

export default function App() {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authMode, setAuthMode] = useState("login");
  const [setupStep, setSetupStep] = useState(false);
  const [tab, setTab] = useState(0);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [region, setRegion] = useState("");
  const [dept, setDept] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  const [owned, setOwned] = useState(new Set());
  const [doubles, setDoubles] = useState(new Set());
  const [listings, setListings] = useState([]);
  const [messages, setMessages] = useState([]);
  const [allProfiles, setAllProfiles] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [msgText, setMsgText] = useState("");

  const [filterRegion, setFilterRegion] = useState("all");
  const [filterDept, setFilterDept] = useState("all");
  const [zoneFilter, setZoneFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const [showAddListing, setShowAddListing] = useState(false);
  const [newStickerNum, setNewStickerNum] = useState("");
  const [newNote, setNewNote] = useState("");
  const [newWants, setNewWants] = useState("");
  const [newPhoto, setNewPhoto] = useState(null);
  const [posting, setPosting] = useState(false);
  const [avatarUploading, setAvatarUploading] = useState(false);

  const [toast, setToast] = useState(null);
  const showToast = (msg, type="ok") => { setToast({msg,type}); setTimeout(()=>setToast(null),3000); };

  useEffect(()=>{
    supabase.auth.getSession().then(({data:{session}})=>{
      setSession(session);
      if(session) loadAll(session.user.id); else setLoading(false);
    });
    const {data:{subscription}} = supabase.auth.onAuthStateChange((_,s)=>{
      setSession(s);
      if(s) loadAll(s.user.id); else { setLoading(false); setProfile(null); }
    });
    return ()=>subscription.unsubscribe();
  },[]);

  const loadAll = async(uid)=>{
    setLoading(true);
    const {data:p} = await supabase.from("profiles").select("*").eq("id",uid).single();
    if(p){ setProfile(p); await loadCollection(uid); await loadListings(); }
    else setSetupStep(true);
    setLoading(false);
  };

  const loadCollection = async(uid)=>{
    const {data} = await supabase.from("collection").select("*").eq("user_id",uid);
    if(data){ const o=new Set(),d=new Set(); data.forEach(s=>{o.add(s.sticker_number);if(s.is_double)d.add(s.sticker_number);}); setOwned(o);setDoubles(d); }
  };

  const loadListings = async()=>{
    const {data} = await supabase.from("listings").select("*,profiles(username,dept,dept_label,region,avatar_url)").order("created_at",{ascending:false});
    if(data) setListings(data);
  };

  const loadMessages = async()=>{
    if(!session) return;
    const {data} = await supabase.from("messages").select("*").or(`from_id.eq.${session.user.id},to_id.eq.${session.user.id}`).order("created_at",{ascending:true});
    if(data) setMessages(data);
  };

  const loadProfiles = async()=>{
    const {data} = await supabase.from("profiles").select("*").neq("id",session?.user?.id);
    if(data) setAllProfiles(data);
  };

  useEffect(()=>{ if(tab===2){loadMessages();loadProfiles();} },[tab]);
  useEffect(()=>{ if(tab===0) loadListings(); },[tab]);

  const handleLogin = async()=>{
    if(!email||!password){showToast("Remplis tous les champs","err");return;}
    setAuthLoading(true);
    const {error} = await supabase.auth.signInWithPassword({email,password});
    if(error) showToast("Email ou mot de passe incorrect","err");
    setAuthLoading(false);
  };

  const handleRegister = async()=>{
    if(!email||!password){showToast("Remplis tous les champs","err");return;}
    setAuthLoading(true);
    const {error} = await supabase.auth.signUp({email,password});
    if(error) showToast(error.message,"err");
    else { showToast("Compte créé !"); setSetupStep(true); }
    setAuthLoading(false);
  };

  const handleSetup = async()=>{
    if(!username||!region||!dept){showToast("Tous les champs sont requis","err");return;}
    setAuthLoading(true);
    const ri=REGIONS.find(r=>r.id===region); const di=ri?.depts.find(d=>d.n===dept);
    const {error} = await supabase.from("profiles").upsert({id:session.user.id,username,region,dept,dept_label:di?.l||""});
    if(error) showToast(error.message,"err");
    else { await loadAll(session.user.id); setSetupStep(false); showToast("Bienvenue ! 🎉"); }
    setAuthLoading(false);
  };

  const uploadAvatar = async(file)=>{
    setAvatarUploading(true);
    const ext=file.name.split('.').pop();
    const path=`${session.user.id}.${ext}`;
    const {error} = await supabase.storage.from("avatars").upload(path,file,{upsert:true});
    if(!error){
      const {data:{publicUrl}} = supabase.storage.from("avatars").getPublicUrl(path);
      await supabase.from("profiles").update({avatar_url:publicUrl}).eq("id",session.user.id);
      setProfile(p=>({...p,avatar_url:publicUrl})); showToast("Photo mise à jour !");
    }
    setAvatarUploading(false);
  };

  const postListing = async()=>{
    if(!newStickerNum){showToast("Choisis un sticker","err");return;}
    setPosting(true);
    let photoUrl=null;
    if(newPhoto){
      const ext=newPhoto.name.split('.').pop();
      const path=`${session.user.id}_${Date.now()}.${ext}`;
      const {error} = await supabase.storage.from("stickers").upload(path,newPhoto,{upsert:true});
      if(!error){ const {data:{publicUrl}} = supabase.storage.from("stickers").getPublicUrl(path); photoUrl=publicUrl; }
    }
    const {error} = await supabase.from("listings").insert({user_id:session.user.id,sticker_number:newStickerNum,note:newNote,photo_url:photoUrl,wants:newWants});
    if(!error){ showToast("Annonce publiée !"); setShowAddListing(false); setNewStickerNum("");setNewNote("");setNewWants("");setNewPhoto(null); await loadListings(); }
    else showToast(error.message,"err");
    setPosting(false);
  };

  const deleteListing = async(id)=>{ await supabase.from("listings").delete().eq("id",id); await loadListings(); showToast("Annonce supprimée"); };

  const toggleSticker = async(number)=>{
    const isOwned=owned.has(number);
    if(isOwned){ await supabase.from("collection").delete().eq("user_id",session.user.id).eq("sticker_number",number); const no=new Set(owned);no.delete(number);const nd=new Set(doubles);nd.delete(number);setOwned(no);setDoubles(nd); }
    else{ await supabase.from("collection").insert({user_id:session.user.id,sticker_number:number,is_double:false}); const no=new Set(owned);no.add(number);setOwned(no); }
  };

  const sendMessage = async()=>{
    if(!msgText.trim()||!selectedUser) return;
    await supabase.from("messages").insert({from_id:session.user.id,to_id:selectedUser.id,content:msgText.trim()});
    setMsgText(""); await loadMessages();
  };

  const convWith=(uid)=>messages.filter(m=>(m.from_id===session?.user?.id&&m.to_id===uid)||(m.from_id===uid&&m.to_id===session?.user?.id));
  const unread=messages.filter(m=>m.to_id===session?.user?.id&&!m.read).length;
  const pct=Math.round((owned.size/TOTAL)*100);
  const ri=REGIONS.find(r=>r.id===profile?.region);
  const availDepts=region?(REGIONS.find(r=>r.id===region)?.depts||[]):[];
  const filterDepts=filterRegion!=="all"?(REGIONS.find(r=>r.id===filterRegion)?.depts||[]):[];

  const filteredListings=listings.filter(l=>{
    const rOk=filterRegion==="all"||l.profiles?.region===filterRegion;
    const dOk=filterDept==="all"||l.profiles?.dept===filterDept;
    const zOk=activeFilter==="all"||ALL_STICKERS.find(s=>s.number===l.sticker_number)?.zone===activeFilter||(activeFilter==="special"&&l.sticker_number.startsWith("SP"));
    const sOk=search===""||l.sticker_number.toLowerCase().includes(search.toLowerCase())||(l.note||"").toLowerCase().includes(search.toLowerCase());
    return rOk&&dOk&&zOk&&sOk;
  });

  const avatarLetter=(name)=>name?.[0]?.toUpperCase()||"?";
  const avatarColor=(name)=>{const colors=["#1d4ed8","#b91c1c","#065f46","#6d28d9","#92400e","#0369a1"];return colors[(name?.charCodeAt(0)||0)%colors.length];};

  const Avatar=({url,name,size=32})=>{
    const s={width:size,height:size,borderRadius:"50%",flexShrink:0,overflow:"hidden"};
    if(url) return <img src={url} style={{...s,objectFit:"cover"}}/>;
    return <div style={{...s,background:avatarColor(name),display:"flex",alignItems:"center",justifyContent:"center",fontSize:size*0.38,color:"#fff",fontWeight:700}}>{avatarLetter(name)}</div>;
  };

  const StickerThumb=({sticker,photo,size=110})=>{
    const color=TEAM_COLORS[sticker?.code]||"#374151";
    const r=RARITY[sticker?.rarity||"normal"];
    if(photo) return <img src={photo} style={{width:size,flexShrink:0,height:"100%",objectFit:"cover"}}/>;
    return(
      <div style={{width:size,flexShrink:0,background:`linear-gradient(160deg,${color}ee,${color}88)`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:12,position:"relative"}}>
        <div style={{fontSize:38}}>{sticker?.flag||"🃏"}</div>
        <div style={{fontSize:10,fontWeight:700,color:"rgba(255,255,255,.9)",marginTop:5,letterSpacing:.5}}>{sticker?.number}</div>
        {r.label&&<div style={{position:"absolute",top:6,right:6,padding:"2px 6px",background:r.bg,borderRadius:4,fontSize:8,fontWeight:700,color:r.color}}>{r.label}</div>}
      </div>
    );
  };

  // ── LOADING ──
  if(loading) return(
    <div style={{background:"#f5f4f1",minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:12}}>
      <style>{css}</style>
      <div style={{fontFamily:"'DM Serif Display',serif",fontSize:32,color:"#0f0f0f"}}>Stickr</div>
      <div style={{fontSize:13,color:"#8a8a8a"}}>Chargement…</div>
    </div>
  );

  // ── AUTH ──
  if(!session||setupStep) {
    const inp={width:"100%",padding:"10px 14px",background:"#f5f4f1",border:"1.5px solid #e8e6e1",borderRadius:8,fontSize:14,color:"#0f0f0f"};
    return(
      <div style={{background:"#f5f4f1",minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
        <style>{css}</style>
        <div style={{width:"100%",maxWidth:380,animation:"fadeUp .35s ease"}}>
          <div style={{textAlign:"center",marginBottom:28}}>
            <div style={{fontFamily:"'DM Serif Display',serif",fontSize:36,color:"#0f0f0f",letterSpacing:-1}}>Stickr</div>
            <div style={{fontSize:12,color:"#8a8a8a",marginTop:2,letterSpacing:1,textTransform:"uppercase"}}>FIFA World Cup 2026</div>
          </div>
          <div className="card" style={{padding:28}}>
            {setupStep?(
              <>
                <div style={{fontSize:18,fontWeight:700,marginBottom:4}}>Ton profil</div>
                <div style={{fontSize:13,color:"#8a8a8a",marginBottom:20}}>Pour trouver des échangeurs près de chez toi</div>
                <div style={{marginBottom:14}}>
                  <label style={{display:"block",fontSize:11,fontWeight:600,color:"#8a8a8a",marginBottom:5,textTransform:"uppercase",letterSpacing:.5}}>Pseudo</label>
                  <input value={username} onChange={e=>setUsername(e.target.value)} placeholder="Ex: FootFan_69" style={inp}/>
                </div>
                <div style={{marginBottom:14}}>
                  <label style={{display:"block",fontSize:11,fontWeight:600,color:"#8a8a8a",marginBottom:5,textTransform:"uppercase",letterSpacing:.5}}>Région</label>
                  <select value={region} onChange={e=>{setRegion(e.target.value);setDept("");}} style={{...inp,cursor:"pointer"}}>
                    <option value="">-- Choisir --</option>
                    {REGIONS.map(r=><option key={r.id} value={r.id}>{r.name}</option>)}
                  </select>
                </div>
                <div style={{marginBottom:24}}>
                  <label style={{display:"block",fontSize:11,fontWeight:600,color:"#8a8a8a",marginBottom:5,textTransform:"uppercase",letterSpacing:.5}}>Département</label>
                  <select value={dept} onChange={e=>setDept(e.target.value)} disabled={!region} style={{...inp,cursor:"pointer",opacity:region?1:.5}}>
                    <option value="">-- Choisir --</option>
                    {availDepts.map(d=><option key={d.n} value={d.n}>{d.n} – {d.l}</option>)}
                  </select>
                </div>
                <button className="btn" onClick={handleSetup} disabled={authLoading}
                  style={{width:"100%",padding:"13px",background:"#0f0f0f",borderRadius:8,color:"#fff",fontSize:14,fontWeight:600}}>
                  {authLoading?"…":"Créer mon profil →"}
                </button>
              </>
            ):(
              <>
                <div style={{display:"flex",background:"#f5f4f1",borderRadius:8,padding:3,marginBottom:22,gap:3}}>
                  {["login","register"].map(m=>(
                    <button key={m} className="btn" onClick={()=>setAuthMode(m)}
                      style={{flex:1,padding:"9px",borderRadius:6,background:authMode===m?"#fff":"transparent",
                        color:authMode===m?"#0f0f0f":"#8a8a8a",fontSize:13,fontWeight:authMode===m?700:400,
                        boxShadow:authMode===m?"0 1px 3px rgba(0,0,0,.1)":"none"}}>
                      {m==="login"?"Se connecter":"S'inscrire"}
                    </button>
                  ))}
                </div>
                {[{l:"Email",v:email,s:setEmail,p:"ton@email.com",t:"email"},{l:"Mot de passe",v:password,s:setPassword,p:"••••••••",t:"password"}].map(f=>(
                  <div key={f.l} style={{marginBottom:14}}>
                    <label style={{display:"block",fontSize:11,fontWeight:600,color:"#8a8a8a",marginBottom:5,textTransform:"uppercase",letterSpacing:.5}}>{f.l}</label>
                    <input type={f.t} value={f.v} onChange={e=>f.s(e.target.value)} placeholder={f.p}
                      onKeyDown={e=>e.key==="Enter"&&(authMode==="login"?handleLogin():handleRegister())} style={inp}/>
                  </div>
                ))}
                <button className="btn" onClick={authMode==="login"?handleLogin:handleRegister} disabled={authLoading}
                  style={{width:"100%",marginTop:8,padding:"13px",background:"#0f0f0f",borderRadius:8,color:"#fff",fontSize:14,fontWeight:600}}>
                  {authLoading?"…":(authMode==="login"?"Se connecter →":"Créer mon compte →")}
                </button>
              </>
            )}
          </div>
          {toast&&<div style={{marginTop:12,padding:"11px 16px",background:toast.type==="err"?"#fff1f2":"#f0fdf4",border:`1px solid ${toast.type==="err"?"#fecaca":"#bbf7d0"}`,borderRadius:8,fontSize:13,color:toast.type==="err"?"#dc2626":"#16a34a",textAlign:"center"}}>{toast.msg}</div>}
        </div>
      </div>
    );
  }

  // ── APP ──
  return(
    <div style={{background:"#f5f4f1",minHeight:"100vh"}}>
      <style>{css}</style>

      {/* HEADER */}
      <div style={{background:"#fff",borderBottom:"1px solid #e8e6e1",padding:"0 20px",position:"sticky",top:0,zIndex:50,boxShadow:"0 1px 3px rgba(0,0,0,.06)"}}>
        <div style={{maxWidth:960,margin:"0 auto"}}>
          <div style={{display:"flex",alignItems:"center",gap:16,height:56}}>
            <div style={{fontFamily:"'DM Serif Display',serif",fontSize:22,color:"#0f0f0f",letterSpacing:-0.5,flexShrink:0}}>Stickr</div>
            <div style={{flex:1,display:"flex",alignItems:"center",gap:8,background:"#f5f4f1",border:"1.5px solid #e8e6e1",borderRadius:8,padding:"7px 12px",maxWidth:360}}>
              <span style={{fontSize:13,color:"#aaa"}}>🔍</span>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Rechercher un sticker…"
                style={{border:"none",background:"none",fontSize:13,color:"#0f0f0f",width:"100%"}}/>
            </div>
            <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:10}}>
              <div style={{display:"flex",gap:16}}>
                {[{v:owned.size,l:"possédés",c:"#16a34a"},{v:TOTAL-owned.size,l:"manquants",c:"#dc2626"},{v:doubles.size,l:"doubles",c:"#d97706"}].map(s=>(
                  <div key={s.l} style={{textAlign:"center"}}>
                    <div style={{fontSize:17,fontWeight:700,color:s.c,lineHeight:1}}>{s.v}</div>
                    <div style={{fontSize:9,color:"#8a8a8a"}}>{s.l}</div>
                  </div>
                ))}
              </div>
              <div style={{width:1,height:28,background:"#e8e6e1"}}/>
              <Avatar url={profile?.avatar_url} name={profile?.username} size={34}/>
            </div>
          </div>
          <div style={{display:"flex",borderTop:"1px solid #e8e6e1"}}>
            {TABS.map((t,i)=>(
              <button key={t} className="btn" onClick={()=>setTab(i)}
                style={{padding:"10px 16px",fontSize:13,fontWeight:tab===i?700:400,background:"transparent",
                  color:tab===i?"#0f0f0f":"#8a8a8a",borderBottom:tab===i?"2px solid #0f0f0f":"2px solid transparent",position:"relative"}}>
                {t}{i===2&&unread>0&&<span style={{position:"absolute",top:6,right:6,background:"#dc2626",color:"#fff",borderRadius:"50%",width:15,height:15,fontSize:9,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center"}}>{unread}</span>}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* TOAST */}
      {toast&&<div style={{position:"fixed",top:16,right:16,background:toast.type==="err"?"#fff1f2":"#f0fdf4",border:`1px solid ${toast.type==="err"?"#fecaca":"#bbf7d0"}`,padding:"11px 16px",borderRadius:9,fontSize:13,color:toast.type==="err"?"#dc2626":"#16a34a",zIndex:200,animation:"toastIn .3s ease",boxShadow:"0 4px 16px rgba(0,0,0,.1)"}}>{toast.msg}</div>}

      <div style={{maxWidth:960,margin:"0 auto",padding:"20px 20px 80px"}}>

        {/* ══ ANNONCES ══ */}
        {tab===0&&(
          <div style={{animation:"fadeUp .3s ease"}}>

            {/* Modal publier */}
            {showAddListing&&(
              <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.45)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100,padding:16}} onClick={()=>setShowAddListing(false)}>
                <div className="card" style={{padding:24,width:"100%",maxWidth:440,animation:"modalIn .25s ease"}} onClick={e=>e.stopPropagation()}>
                  <div style={{fontSize:17,fontWeight:700,marginBottom:20}}>Publier un double</div>
                  {[
                    {l:"Numéro du sticker",el:<select value={newStickerNum} onChange={e=>setNewStickerNum(e.target.value)} style={{width:"100%",padding:"10px 12px",background:"#f5f4f1",border:"1.5px solid #e8e6e1",borderRadius:8,fontSize:13,color:"#0f0f0f",cursor:"pointer"}}>
                      <option value="">-- Choisir --</option>
                      {doubles.size>0?[...doubles].map(n=><option key={n} value={n}>{n}</option>):ALL_STICKERS.slice(0,30).map(s=><option key={s.number} value={s.number}>{s.number} {s.flag}</option>)}
                    </select>},
                    {l:"Je recherche en échange",el:<input value={newWants} onChange={e=>setNewWants(e.target.value)} placeholder="Ex: FRA-18, ESP-17…" style={{width:"100%",padding:"10px 12px",background:"#f5f4f1",border:"1.5px solid #e8e6e1",borderRadius:8,fontSize:13,color:"#0f0f0f"}}/>},
                    {l:"Note (optionnel)",el:<input value={newNote} onChange={e=>setNewNote(e.target.value)} placeholder="État, remarques…" style={{width:"100%",padding:"10px 12px",background:"#f5f4f1",border:"1.5px solid #e8e6e1",borderRadius:8,fontSize:13,color:"#0f0f0f"}}/>},
                  ].map(f=>(
                    <div key={f.l} style={{marginBottom:14}}>
                      <label style={{display:"block",fontSize:11,fontWeight:600,color:"#8a8a8a",marginBottom:5,textTransform:"uppercase",letterSpacing:.5}}>{f.l}</label>
                      {f.el}
                    </div>
                  ))}
                  <div style={{marginBottom:20}}>
                    <label style={{display:"block",fontSize:11,fontWeight:600,color:"#8a8a8a",marginBottom:5,textTransform:"uppercase",letterSpacing:.5}}>Photo du sticker</label>
                    <label style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",background:"#f5f4f1",border:"1.5px dashed #e8e6e1",borderRadius:8,cursor:"pointer"}}>
                      <span style={{fontSize:18}}>📷</span>
                      <span style={{fontSize:13,color:newPhoto?"#0f0f0f":"#8a8a8a"}}>{newPhoto?newPhoto.name:"Choisir une photo"}</span>
                      <input type="file" accept="image/*" style={{display:"none"}} onChange={e=>setNewPhoto(e.target.files[0])}/>
                    </label>
                  </div>
                  <div style={{display:"flex",gap:8}}>
                    <button className="btn" onClick={()=>setShowAddListing(false)}
                      style={{flex:1,padding:"11px",background:"#f5f4f1",border:"1px solid #e8e6e1",borderRadius:8,color:"#8a8a8a",fontSize:13,fontWeight:600}}>Annuler</button>
                    <button className="btn" onClick={postListing} disabled={posting}
                      style={{flex:2,padding:"11px",background:"#0f0f0f",border:"none",borderRadius:8,color:"#fff",fontSize:13,fontWeight:700}}>
                      {posting?"Publication…":"Publier l'annonce"}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Filtres */}
            <div style={{display:"flex",gap:8,marginBottom:16,flexWrap:"wrap",alignItems:"center"}}>
              {[{id:"all",l:"Toute la France"},
                {id:"near",l:"📍 Près de moi"},
                {id:"special",l:"⭐ Spéciaux"},
                {id:"europe",l:"🌍 Europe"},
                {id:"amerique_sud",l:"🌎 Amériques"},
                {id:"afrique",l:"🌍 Afrique"},
                {id:"asie",l:"🌏 Asie"},
              ].map(f=>(
                <button key={f.id} className="btn" onClick={()=>{ setActiveFilter(f.id); if(f.id==="near"&&profile){setFilterRegion(profile.region);setFilterDept(profile.dept);} else if(f.id==="all"){setFilterRegion("all");setFilterDept("all");} }}
                  style={{padding:"6px 14px",borderRadius:20,fontSize:12,fontWeight:500,border:`1.5px solid ${activeFilter===f.id?"#0f0f0f":"#e8e6e1"}`,background:activeFilter===f.id?"#0f0f0f":"#fff",color:activeFilter===f.id?"#fff":"#3d3d3d",whiteSpace:"nowrap"}}>
                  {f.l}
                </button>
              ))}
              <select value={filterRegion} onChange={e=>{setFilterRegion(e.target.value);setFilterDept("all");}}
                style={{padding:"7px 12px",background:"#fff",border:"1.5px solid #e8e6e1",borderRadius:8,fontSize:12,color:"#3d3d3d",cursor:"pointer"}}>
                <option value="all">Toutes les régions</option>
                {REGIONS.map(r=><option key={r.id} value={r.id}>{r.name}</option>)}
              </select>
              {filterRegion!=="all"&&(
                <select value={filterDept} onChange={e=>setFilterDept(e.target.value)}
                  style={{padding:"7px 12px",background:"#fff",border:"1.5px solid #e8e6e1",borderRadius:8,fontSize:12,color:"#3d3d3d",cursor:"pointer"}}>
                  <option value="all">Tous les dép.</option>
                  {filterDepts.map(d=><option key={d.n} value={d.n}>{d.n} – {d.l}</option>)}
                </select>
              )}
              <button className="btn" onClick={()=>setShowAddListing(true)}
                style={{marginLeft:"auto",padding:"8px 18px",background:"#0f0f0f",borderRadius:8,color:"#fff",fontSize:13,fontWeight:600}}>
                + Publier
              </button>
            </div>

            <div style={{fontSize:12,color:"#8a8a8a",marginBottom:14}}>{filteredListings.length} annonce{filteredListings.length>1?"s":""}</div>

            {filteredListings.length===0?(
              <div className="card" style={{textAlign:"center",padding:"50px 20px"}}>
                <div style={{fontSize:36,marginBottom:10}}>🃏</div>
                <div style={{fontSize:15,fontWeight:700,marginBottom:4}}>Aucune annonce</div>
                <div style={{fontSize:13,color:"#8a8a8a"}}>Sois le premier à publier tes doubles !</div>
              </div>
            ):(
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                {filteredListings.map(l=>{
                  const sticker=ALL_STICKERS.find(s=>s.number===l.sticker_number);
                  const lri=REGIONS.find(r=>r.id===l.profiles?.region);
                  const isMe=l.user_id===session.user.id;
                  const sameDept=l.profiles?.dept===profile?.dept;
                  const r=RARITY[sticker?.rarity||"normal"];
                  return(
                    <div key={l.id} className="card listing-card">
                      <StickerThumb sticker={sticker} photo={l.photo_url}/>
                      <div style={{flex:1,padding:"14px 16px",display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
                        <div>
                          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
                            <div>
                              <div style={{fontSize:15,fontWeight:700,display:"flex",alignItems:"center",gap:6}}>
                                {l.sticker_number}
                                {r.label&&<span style={{padding:"2px 7px",background:r.bg,borderRadius:4,fontSize:10,fontWeight:700,color:r.color}}>{r.label}</span>}
                              </div>
                              <div style={{fontSize:12,color:"#8a8a8a",marginTop:1}}>{sticker?.team}</div>
                            </div>
                            <div style={{padding:"3px 10px",background:"#fef2f2",border:"1px solid #fecaca",borderRadius:6,fontSize:11,fontWeight:600,color:"#dc2626",flexShrink:0}}>Double</div>
                          </div>
                          {l.wants&&<div style={{fontSize:12,color:"#3d3d3d",marginBottom:3}}>Cherche : <span style={{fontWeight:600,color:"#0f0f0f"}}>{l.wants}</span></div>}
                          {l.note&&<div style={{fontSize:12,color:"#8a8a8a",fontStyle:"italic"}}>{l.note}</div>}
                        </div>
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:12,paddingTop:10,borderTop:"1px solid #f0ede8",flexWrap:"wrap",gap:8}}>
                          <div style={{display:"flex",alignItems:"center",gap:8}}>
                            <Avatar url={l.profiles?.avatar_url} name={l.profiles?.username} size={26}/>
                            <div>
                              <div style={{fontSize:12,fontWeight:600,display:"flex",alignItems:"center",gap:4}}>
                                {l.profiles?.username}
                                {sameDept&&<span style={{padding:"1px 6px",background:"#f0fdf4",border:"1px solid #bbf7d0",borderRadius:10,fontSize:9,fontWeight:600,color:"#16a34a"}}>📍 Près de toi</span>}
                              </div>
                              <div style={{fontSize:11,color:lri?.color||"#8a8a8a"}}>{l.profiles?.dept} – {l.profiles?.dept_label}</div>
                            </div>
                          </div>
                          {isMe
                            ? <button className="btn" onClick={()=>deleteListing(l.id)} style={{padding:"5px 12px",background:"#fef2f2",border:"1px solid #fecaca",borderRadius:7,color:"#dc2626",fontSize:11,fontWeight:600}}>Supprimer</button>
                            : <button className="btn" onClick={()=>{setSelectedUser({id:l.user_id,username:l.profiles?.username,avatar_url:l.profiles?.avatar_url,dept:l.profiles?.dept,dept_label:l.profiles?.dept_label,region:l.profiles?.region});setTab(2);}} style={{padding:"6px 16px",background:"#0f0f0f",border:"none",borderRadius:7,color:"#fff",fontSize:12,fontWeight:600}}>Contacter</button>
                          }
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ══ ALBUM ══ */}
        {tab===1&&(
          <div style={{animation:"fadeUp .3s ease"}}>
            <div className="card" style={{padding:"16px 20px",marginBottom:16,display:"flex",alignItems:"center",gap:20,flexWrap:"wrap"}}>
              {[{v:owned.size,l:"Possédés",c:"#16a34a"},{v:TOTAL-owned.size,l:"Manquants",c:"#dc2626"},{v:doubles.size,l:"Doubles",c:"#d97706"}].map((s,i)=>(
                <span key={s.l}>
                  {i>0&&<span style={{color:"#e8e6e1",marginRight:20}}>|</span>}
                  <span style={{fontSize:22,fontWeight:800,color:s.c}}>{s.v}</span>
                  <span style={{fontSize:12,color:"#8a8a8a",marginLeft:5}}>{s.l}</span>
                </span>
              ))}
              <div style={{marginLeft:"auto",minWidth:160}}>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:5}}>
                  <span style={{fontWeight:600}}>Progression</span>
                  <span style={{color:"#8a8a8a"}}>{owned.size} / {TOTAL}</span>
                </div>
                <div style={{height:6,background:"#e8e6e1",borderRadius:3,overflow:"hidden"}}>
                  <div style={{width:`${pct}%`,height:"100%",background:"#0f0f0f",borderRadius:3,transition:"width .5s"}}/>
                </div>
              </div>
            </div>

            <div style={{display:"flex",gap:8,marginBottom:16,flexWrap:"wrap"}}>
              <input placeholder="🔍 Équipe ou numéro…" value={search} onChange={e=>setSearch(e.target.value)}
                style={{flex:1,minWidth:150,padding:"9px 12px",background:"#fff",border:"1.5px solid #e8e6e1",borderRadius:8,fontSize:13,color:"#0f0f0f"}}/>
              <select value={zoneFilter} onChange={e=>setZoneFilter(e.target.value)}
                style={{padding:"9px 12px",background:"#fff",border:"1.5px solid #e8e6e1",borderRadius:8,fontSize:12,color:"#3d3d3d",cursor:"pointer"}}>
                <option value="all">Toutes les zones</option>
                {ZONES.map(z=><option key={z.id} value={z.id}>{z.label}</option>)}
              </select>
            </div>

            {ZONES.filter(z=>zoneFilter==="all"||z.id===zoneFilter).map(z=>{
              const zs=ALL_STICKERS.filter(s=>s.zone===z.id&&(search===""||s.team.toLowerCase().includes(search.toLowerCase())||s.number.toLowerCase().includes(search.toLowerCase())));
              if(!zs.length) return null;
              const zo=zs.filter(s=>owned.has(s.number)).length;
              return(
                <div key={z.id} style={{marginBottom:24}}>
                  <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
                    <div style={{fontSize:14,fontWeight:700,color:"#0f0f0f"}}>{z.label}</div>
                    <div style={{flex:1,height:1,background:"#e8e6e1"}}/>
                    <div style={{fontSize:11,color:"#8a8a8a",fontWeight:600}}>{zo}/{zs.length}</div>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(70px,1fr))",gap:5}}>
                    {zs.map(s=>{
                      const io=owned.has(s.number), id=doubles.has(s.number);
                      const color=TEAM_COLORS[s.code]||"#374151";
                      return(
                        <div key={s.id} onClick={()=>toggleSticker(s.number)}
                          style={{borderRadius:8,border:`1.5px solid ${io?color:"#e8e6e1"}`,background:io?`${color}11`:"#fff",
                            opacity:io?1:.4,padding:"8px 5px",textAlign:"center",cursor:"pointer",position:"relative",
                            boxShadow:io?`0 2px 8px ${color}22`:"none",transition:"all .15s"}}>
                          <div style={{fontSize:18}}>{s.flag}</div>
                          <div style={{fontSize:9,fontWeight:700,color:io?color:"#aaa",marginTop:2,letterSpacing:.3}}>{s.number}</div>
                          {id&&io&&<div style={{position:"absolute",top:2,right:2,background:"#d97706",borderRadius:3,fontSize:7,padding:"1px 3px",color:"#fff",fontWeight:700}}>×2</div>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ══ MESSAGES ══ */}
        {tab===2&&(
          <div style={{animation:"fadeUp .3s ease"}}>
            {!selectedUser?(
              <>
                <div style={{fontSize:16,fontWeight:700,marginBottom:14}}>Messages</div>
                {allProfiles.length===0?(
                  <div className="card" style={{textAlign:"center",padding:"50px 20px"}}>
                    <div style={{fontSize:36,marginBottom:8}}>💬</div>
                    <div style={{fontWeight:600,marginBottom:4}}>Aucun message</div>
                    <div style={{fontSize:13,color:"#8a8a8a"}}>Contacte un collectionneur depuis les annonces</div>
                  </div>
                ):(
                  <div style={{display:"flex",flexDirection:"column",gap:8}}>
                    {allProfiles.map(p=>{
                      const conv=convWith(p.id);
                      const last=conv[conv.length-1];
                      const uc=conv.filter(m=>m.to_id===session.user.id&&!m.read).length;
                      const pri=REGIONS.find(r=>r.id===p.region);
                      return(
                        <div key={p.id} className="card" onClick={()=>setSelectedUser(p)}
                          style={{padding:"12px 16px",display:"flex",alignItems:"center",gap:12,cursor:"pointer",transition:"box-shadow .15s"}}
                          onMouseEnter={e=>e.currentTarget.style.boxShadow="0 4px 16px rgba(0,0,0,.1)"}
                          onMouseLeave={e=>e.currentTarget.style.boxShadow=""}>
                          <Avatar url={p.avatar_url} name={p.username} size={42}/>
                          <div style={{flex:1}}>
                            <div style={{fontSize:14,fontWeight:700}}>{p.username}</div>
                            <div style={{fontSize:11,color:pri?.color||"#8a8a8a"}}>📍 {p.dept} – {p.dept_label}</div>
                            {last&&<div style={{fontSize:11,color:"#8a8a8a",marginTop:2}}>{last.content.slice(0,50)}{last.content.length>50?"…":""}</div>}
                          </div>
                          {uc>0&&<div style={{background:"#dc2626",color:"#fff",borderRadius:"50%",width:20,height:20,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700}}>{uc}</div>}
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            ):(
              <div style={{display:"flex",flexDirection:"column",height:"65vh"}}>
                <div className="card" style={{padding:"10px 14px",marginBottom:12,display:"flex",alignItems:"center",gap:10}}>
                  <button className="btn" onClick={()=>setSelectedUser(null)}
                    style={{padding:"5px 12px",background:"#f5f4f1",border:"1px solid #e8e6e1",borderRadius:7,color:"#8a8a8a",fontSize:12,fontWeight:600}}>← Retour</button>
                  <Avatar url={selectedUser.avatar_url} name={selectedUser.username} size={30}/>
                  <div>
                    <div style={{fontSize:14,fontWeight:700}}>{selectedUser.username}</div>
                    <div style={{fontSize:11,color:"#8a8a8a"}}>📍 {selectedUser.dept} – {selectedUser.dept_label}</div>
                  </div>
                </div>
                <div style={{flex:1,overflowY:"auto",display:"flex",flexDirection:"column",gap:8,padding:"4px 0",marginBottom:10}}>
                  {convWith(selectedUser.id).length===0
                    ? <div style={{textAlign:"center",padding:30,color:"#8a8a8a",fontSize:13}}>Commence la conversation !</div>
                    : convWith(selectedUser.id).map(m=>{
                        const mine=m.from_id===session.user.id;
                        return(
                          <div key={m.id} style={{display:"flex",justifyContent:mine?"flex-end":"flex-start"}}>
                            <div style={{maxWidth:"70%",padding:"9px 14px",borderRadius:mine?"14px 14px 4px 14px":"14px 14px 14px 4px",
                              background:mine?"#0f0f0f":"#fff",color:mine?"#fff":"#0f0f0f",
                              fontSize:13,border:mine?"none":"1px solid #e8e6e1",boxShadow:"0 1px 3px rgba(0,0,0,.05)"}}>
                              {m.content}
                            </div>
                          </div>
                        );
                      })
                  }
                </div>
                <div style={{display:"flex",gap:8}}>
                  <input value={msgText} onChange={e=>setMsgText(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendMessage()}
                    placeholder="Ton message…"
                    style={{flex:1,padding:"11px 14px",background:"#fff",border:"1.5px solid #e8e6e1",borderRadius:9,fontSize:13,color:"#0f0f0f"}}/>
                  <button className="btn" onClick={sendMessage}
                    style={{padding:"11px 18px",background:"#0f0f0f",border:"none",borderRadius:9,color:"#fff",fontSize:13,fontWeight:600}}>Envoyer</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ══ PROFIL ══ */}
        {tab===3&&(
          <div style={{animation:"fadeUp .3s ease",maxWidth:480,margin:"0 auto"}}>
            <div style={{fontSize:16,fontWeight:700,marginBottom:16}}>Mon profil</div>

            <div className="card" style={{padding:20,marginBottom:12}}>
              <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:16}}>
                <Avatar url={profile?.avatar_url} name={profile?.username} size={64}/>
                <div>
                  <div style={{fontSize:20,fontWeight:800,letterSpacing:-0.3}}>{profile?.username}</div>
                  <div style={{fontSize:13,color:ri?.color||"#8a8a8a",marginTop:2}}>📍 {profile?.dept} – {profile?.dept_label}</div>
                  <div style={{fontSize:12,color:"#8a8a8a"}}>{ri?.name}</div>
                </div>
              </div>
              <label style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",background:"#f5f4f1",border:"1.5px dashed #e8e6e1",borderRadius:8,cursor:"pointer"}}>
                <span style={{fontSize:16}}>📷</span>
                <span style={{fontSize:13,color:"#8a8a8a"}}>{avatarUploading?"Envoi…":"Changer ma photo de profil"}</span>
                <input type="file" accept="image/*" style={{display:"none"}} onChange={e=>e.target.files[0]&&uploadAvatar(e.target.files[0])}/>
              </label>
            </div>

            <div className="card" style={{padding:20,marginBottom:12}}>
              <div style={{fontSize:14,fontWeight:700,marginBottom:14}}>Statistiques</div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
                {[{v:owned.size,l:"Possédés",c:"#16a34a"},{v:TOTAL-owned.size,l:"Manquants",c:"#dc2626"},{v:doubles.size,l:"Doubles",c:"#d97706"},{v:pct+"%",l:"Complétion",c:"#0f0f0f"},{v:listings.filter(l=>l.user_id===session.user.id).length,l:"Annonces",c:"#6d28d9"},{v:TOTAL,l:"Total album",c:"#8a8a8a"}].map(s=>(
                  <div key={s.l} style={{background:"#f5f4f1",borderRadius:8,padding:"12px 8px",textAlign:"center"}}>
                    <div style={{fontSize:20,fontWeight:800,color:s.c}}>{s.v}</div>
                    <div style={{fontSize:10,color:"#8a8a8a",marginTop:2}}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card" style={{padding:20,marginBottom:12}}>
              <div style={{fontSize:14,fontWeight:700,marginBottom:12}}>Mes annonces</div>
              {listings.filter(l=>l.user_id===session.user.id).length===0
                ? <div style={{fontSize:13,color:"#8a8a8a",textAlign:"center",padding:"16px 0"}}>Aucune annonce</div>
                : listings.filter(l=>l.user_id===session.user.id).map(l=>{
                    const s=ALL_STICKERS.find(st=>st.number===l.sticker_number);
                    return(
                      <div key={l.id} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:"1px solid #f0ede8"}}>
                        <div style={{fontSize:22}}>{s?.flag||"🃏"}</div>
                        <div style={{flex:1}}>
                          <div style={{fontSize:13,fontWeight:700}}>{l.sticker_number}</div>
                          {l.wants&&<div style={{fontSize:11,color:"#8a8a8a"}}>Cherche : {l.wants}</div>}
                        </div>
                        <button className="btn" onClick={()=>deleteListing(l.id)}
                          style={{padding:"4px 10px",background:"#fef2f2",border:"1px solid #fecaca",borderRadius:6,color:"#dc2626",fontSize:11,fontWeight:600}}>Supprimer</button>
                      </div>
                    );
                  })
              }
            </div>

            <button className="btn" onClick={()=>supabase.auth.signOut()}
              style={{width:"100%",padding:"12px",background:"#f5f4f1",border:"1px solid #e8e6e1",borderRadius:8,color:"#8a8a8a",fontSize:14,fontWeight:500}}>
              Se déconnecter
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
