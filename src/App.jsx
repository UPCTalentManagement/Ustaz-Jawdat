import { useState, useRef, useEffect } from "react";

const NAVY="#003261",SKY="#2FB3DF",ORANGE="#FF995D";
const PASS="#1D9E75",PASSBG="#E6F7F2",PASSBD="#9FE1CB";
const FLAG="#B45309",FLAGBG="#FEF3C7",FLAGBD="#F0C040";
const FAIL="#991B1B",FAILBG="#FEE2E2",FAILBD="#F09595";
const BORDER="#E2EAF2",LIGHT="#F7FAFD",MUTED="#5A7A99",TEXT="#0a1929";

const JAWDAT_IMG="data:image/jpeg;base64,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";


const CAMPS=["CX 2025","Nutraceuticals Q1 2026","Skin Care Q2 2026","Skin Care Q3 2026","General / No active campaign"];
const OTYPES=["Flash Card","Flash Card -- Series","Presentation / Deck","Facilitator Guide","E-learning Module","Training Session","Consultation","Other"];
const AUDS=["Pharmacists","Pharmacy Supervisors","Area Managers","District Heads","Executives","HQ Teams","TM Team"];
const CHANS=["WhatsApp -- USE Community","WhatsApp","LinkedIn -- Personal","LinkedIn -- Company Page","Email","In-session","SuccessFactors LMS","Internal document"];
const TRAIN_FORMATS=["In-Person","Virtual"];
const AUD_SIZES=["Small (up to 15)","Medium (16-30)","Large (30+)"];

// Upload config -- image types get image upload, everything else gets text paste with guidance
const PASTE_HINTS={
  "Flash Card":"Paste the card text content -- title, body, product names, and any key points.",
  "Facilitator Guide":"Paste the full guide -- objectives, activity instructions, timing, facilitator scripts, and debrief questions.",
  "E-learning Module":"Paste the narration script and on-screen text in the order they appear.",
  "Training Session":"Paste the session agenda, activity descriptions, timing, and facilitator notes.",
  "Consultation":"Paste the original question and your full response.",
};
const PDF_TYPES=["Presentation / Deck","Facilitator Guide","Training Session","E-learning Module"];
const IMAGE_TYPES=["Flash Card","Consultation"];
const SERIES_TYPE="Flash Card -- Series";
const CHAN_GUIDANCE={
  "WhatsApp -- USE Community":"Mobile readability critical -- scannable on small screen, not too dense, key info visible without scrolling.",
  "WhatsApp":"Mobile readability critical -- scannable on small screen, not too dense.",
  "LinkedIn -- Personal":"Personal, professional, conversational tone. First-person voice.",
  "LinkedIn -- Company Page":"Brand-aligned, professional, authoritative. Represents UPC publicly.",
  "Email":"Check subject line clarity, length, plain text readability, broadcast tone.",
  "In-session":"Works projected or as handout. Font sizes, contrast, visual hierarchy matter.",
  "SuccessFactors LMS":"Structured learning context. Navigation and formal tone apply.",
  "Internal document":"Professional formatting, clear structure, internal stakeholder consumption.",
};
const BRAND_GATE_QUESTIONS=[
  {id:"q1",text:"No placeholder text remaining in the output?"},
  {id:"q2",text:"Correct font used throughout -- and consistent?"},
  {id:"q3",text:"Using the approved template for this output type?"},
  {id:"q4",text:"Only brand colors used -- no random or off-brand colors?"},
  {id:"q5",text:"This is the final version you want reviewed -- not a draft?"},
];

const CRIT=[
  {id:"logic",label:"Follows the Logic",group:"Content Quality"},
  {id:"impact",label:"Maximum Impact",group:"Content Quality"},
  {id:"concision",label:"Less is More",group:"Content Quality"},
  {id:"audience",label:"Built for the Audience",group:"Reach & Relevance"},
  {id:"channel",label:"Channel Integrity",group:"Reach & Relevance"},
  {id:"behavior",label:"Shifting Behavior",group:"Reach & Relevance",note:"USE = United Sales Excellence: Connecting, Questioning, Confirming / Providing, Handling, Closing"},
];

const vicon=v=>v==="Pass"?"v":v==="Flag"?"!":"x";
const vcolor=v=>v==="Pass"?PASS:v==="Flag"?FLAG:FAIL;
const vbg=v=>v==="Pass"?PASSBG:v==="Flag"?FLAGBG:FAILBG;
const vbd=v=>v==="Pass"?PASSBD:v==="Flag"?FLAGBD:FAILBD;

function cverd(run,ovs){
  if(!run)return null;
  let f=0,x=0;
  (run.criteria||[]).forEach(c=>{
    if(ovs?.[c.id]?.overridden)return;
    if(c.verdict==="Flag")f++;
    if(c.verdict==="Fail")x++;
  });
  return x>0?{label:"Fail",f,x}:f>0?{label:"Flag",f,x}:{label:"Pass",f:0,x:0};
}

function buildPrompt(intake,runNum,history){
  const isTraining=intake.otype==="Training Session";
  const isConsult=intake.otype==="Consultation";
  const isSeries=intake.otype==="Flash Card -- Series";
  return `You are Ostaz Jawdat -- United Pharmacy's internal quality reviewer for the Talent Management department. Senior Egyptian L&D professional, years calibrating your eye to the UPC standard.

CHARACTER:
- Warm but precise. Compliment genuinely and specifically -- never generically.
- Feedforward not feedback. Move immediately to what could be better and why.
- Open every review by acknowledging what is working -- always. Not flattery.
- Name the MOST IMPORTANT flag first -- sequence by impact, not rubric order.
- End with ONE clear next step. Not five. One.
- Never say "I have reviewed your output against 6 criteria." Say what you noticed, in the order you noticed it.
- Never lecture. Say the important thing once.
- LANGUAGE: Respond entirely in ${intake.lang==="ar"?"Arabic":"English"}. If Arabic, use natural professional Egyptian Arabic, right to left, warm tone.
- BREVITY: Keep the opening review under 120 words. Be specific, not comprehensive. One flag named clearly, one next step. Do not pad.
- Sound like a person who genuinely cares about this team's work.

CONTEXT:
- Output: ${intake.otype}${isTraining?` | Format: ${intake.trainFormat} | Size: ${intake.audSize}`:""}
- Audience: ${intake.auds.join(", ")}
- Channels: ${intake.chans?.join(", ")||""}
- Campaign: ${intake.camp}
- Run: ${runNum}${runNum>1?" (revised)":""}

${isSeries?`FLASH CARD SERIES: Check whether cards build logically on each other, consistency across the set, and whether the series as a whole serves the campaign -- not just individual cards.`:""}
${isConsult?`CONSULTATION -- dual check: (1) Does this completely answer the question for the pharmacist who asked? (2) Is it accessible and relevant for the full pharmacy team who will receive it? Flag explicitly if it serves one but not the other.`:""}
${isTraining?`TRAINING SESSION -- activity design: ${intake.trainFormat==="Virtual"?"Virtual risks: lectures >15 min without interaction, activities needing physical presence, missing engagement mechanisms.":"In-person risks: logistics, activities that don't scale to room size, energy arc."} Size (${intake.audSize}): are activities logistically feasible? Seniority (${intake.auds.join(", ")}): appropriate level?`:""}

6 CRITERIA (weave naturally -- never list robotically):
1. logic -- Follows the Logic: clear sequence, each element connects
2. impact -- Maximum Impact: every element earns its place
3. concision -- Less is More: nothing unnecessary
4. audience -- Built for the Audience: right depth, UPC-specific, correct level${isConsult?" (primary: pharmacist who asked; secondary: full team)":""}
5. channel -- Channel Integrity: check silently for real problems only. Channels: ${intake.chans.join(", ")}. For WhatsApp: mobile readability, density, phone-readable. For Email: subject line, length, plain text. For LinkedIn Personal vs Company: tone differs. For LMS: structured context.
6. behavior -- Shifting Behavior: from knowing to doing, USE Model applied where relevant. USE Model = United Sales Excellence: a 6-step pharmacist sales conversation (Connecting, Questioning, Confirming -- Discovering Needs; Providing, Handling, Closing -- Covering Needs; with Encouraging at the center). When checking this criterion, verify that the output actually moves the pharmacist toward one of these steps, not just mentions the model name.

STRATEGIC: Campaign "${intake.camp}" -- does this reinforce the campaign's product/theme? If USE skills are applied to the wrong product category, this is a FLAG (not a Fail) -- the output still works, it is just misaligned with the current campaign. Never set overallVerdict to Fail solely because of campaign mismatch.
${intake.auds.length>1?`AUDIENCE SPLIT: Flag if one version can't genuinely serve all levels selected.`:""}

OUTPUT-SPECIFIC CHECKS (weave naturally alongside the 6 criteria):
${(intake.otype==="Flash Card"||intake.otype===SERIES_TYPE)?`FLASH CARD: Product name bold all caps. Active ingredient sentence case bold. Form in normal case. Summary and selling message present. HQ product photo. Reference cited. Company logo AND department logo both present. ${intake.otype===SERIES_TYPE?"SERIES: Consistency across all cards.":""}`:``}
${intake.otype==="Presentation / Deck"?`PRESENTATION: Branding colors. Contrast readable. Visuals relevant and HQ. Slide consistency. Font size discipline. Bullet points intentional. Unifying font.`:``}
${intake.otype==="Training Session"?`TRAINING: Timing realistic. Breaks built in. End time respected. ${intake.trainFormat==="Virtual"?"No lecture blocks over 15 min. Audio/video check flagged.":"Room logistics feasible."}`:``}
${intake.otype==="Consultation"?`CONSULTATION: Answers the pharmacist who asked + accessible for the full team receiving it.`:``}

CONFIDENCE CONTEXT: This team calibrates against personal memory. Your role is to give them the shared external standard they have been missing. Not judging -- calibrating.

HALLUCINATION GUARD: Only flag or comment on things you can directly observe in the uploaded content. Do not invent corrections that are not needed. Do not thank the creator for fixing something in a revised submission unless you can visually confirm the change in the new upload. If you are uncertain whether something is present or absent, say so explicitly rather than asserting. When reviewing images, describe only what you can clearly see.

CORRECTION BLUEPRINT: When you flag something that needs fixing, give a specific actionable blueprint -- not a vague direction. Example: "Product name should be bold all caps at the very top, active ingredient directly below in sentence case bold, reference in 8pt at the bottom right." Specific enough that the creator can act without asking a follow-up question.

HISTORY:
${history.length>0?history.map(m=>(m.role==="user"?"Creator":"Ostaz Jawdat")+": "+m.content).join("\n"):"First message."}

CRITICAL -- always end your response with this JSON block (invisible to the user -- do not mention it):
|||JSON
{"criteria":[{"id":"logic","verdict":"Pass|Flag|Fail","headline":"one line summary","detail":"2-4 specific sentences referencing intake context. Never generic.","revisionAction":null}],"overallVerdict":"Pass|Flag|Fail","nextStep":"one sentence -- the single most important action"}
|||END
Rules: all 6 criteria always present. revisionAction is null if Pass, a specific action string if Flag or Fail. On follow-up messages include the previous JSON unchanged.`;
}

function JawdatAvatar({size=32}){
  return(
    <div style={{width:size,height:size,borderRadius:"50%",flexShrink:0,overflow:"hidden",border:`2px solid ${SKY}`}}>
      <img src={JAWDAT_IMG} alt="Ostaz Jawdat" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
    </div>
  );
}

function Chip({label,on,multi,onClick}){
  return(
    <button onClick={onClick} style={{fontSize:11,fontWeight:700,padding:"5px 13px",borderRadius:20,cursor:"pointer",
      border:`1px solid ${on?(multi?SKY:NAVY):BORDER}`,
      background:on?(multi?SKY:NAVY):"#fff",color:on?"#fff":MUTED,
      transition:"all .15s",fontFamily:"inherit"}}>
      {label}
    </button>
  );
}

function Badge({verdict,overridden}){
  const v=overridden?"Pass":verdict;
  return(
    <span style={{fontSize:9,fontWeight:800,padding:"3px 8px",borderRadius:20,textTransform:"uppercase",letterSpacing:".04em",
      background:vbg(v),color:vcolor(v),border:`1px solid ${vbd(v)}`}}>
      {overridden?"Overridden":`${vicon(verdict)} ${verdict}`}
    </span>
  );
}

function TypingDots(){
  return(
    <div style={{display:"flex",gap:4,alignItems:"center",padding:"12px 16px"}}>
      {[0,1,2].map(i=>(
        <div key={i} style={{width:7,height:7,borderRadius:"50%",background:MUTED,
          animation:`bounce 1.2s ease-in-out ${i*0.15}s infinite`}}/>
      ))}
      <style>{`@keyframes bounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-6px)}}`}</style>
    </div>
  );
}

function CritRow({crit,result,overrideData,onOverride}){
  const [open,setOpen]=useState(result.verdict!=="Pass");
  const [showForm,setShowForm]=useState(false);
  const [reason,setReason]=useState("");
  const isOv=overrideData?.overridden;
  const canOv=result.verdict==="Flag"&&!isOv;
  const idx=CRIT.findIndex(c=>c.id===crit.id)+1;
  return(
    <div style={{border:`0.5px solid ${isOv?PASSBD:vbd(result.verdict)}`,borderRadius:10,marginBottom:8,overflow:"hidden",
      background:isOv?PASSBG:result.verdict==="Pass"?"#F5FBF8":result.verdict==="Flag"?"#FFFDF0":"#FFF5F5"}}>
      <div onClick={()=>setOpen(!open)} style={{display:"flex",alignItems:"center",gap:9,padding:"10px 14px",cursor:"pointer",userSelect:"none"}}>
        <div style={{width:20,height:20,borderRadius:6,background:NAVY,color:"#fff",fontSize:9,fontWeight:900,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{idx}</div>
        <div style={{fontSize:12,fontWeight:800,color:TEXT,flex:1}}>{crit.label}</div>
        <Badge verdict={result.verdict} overridden={isOv}/>
        <span style={{color:MUTED,fontSize:11,marginLeft:4,transform:open?"rotate(180deg)":"none",transition:"transform .2s"}}>v</span>
      </div>
      {open&&(
        <div style={{borderTop:`0.5px solid ${BORDER}`,padding:"10px 14px"}}>
          <div style={{fontSize:11,fontWeight:800,color:TEXT,marginBottom:3}}>{result.headline}</div>
          <div style={{fontSize:11,color:MUTED,fontWeight:600,lineHeight:1.65,marginBottom:result.revisionAction&&!isOv?8:0}}>{result.detail}</div>
          {result.revisionAction&&!isOv&&(
            <div style={{background:FLAGBG,borderLeft:`3px solid ${FLAGBD}`,padding:"7px 10px",fontSize:11,color:"#7a3a00",fontWeight:700,lineHeight:1.6,marginBottom:8}}>
              <strong>Action:</strong> {result.revisionAction}
            </div>
          )}
          {isOv&&(
            <div style={{background:PASSBG,borderLeft:`3px solid ${PASS}`,padding:"7px 10px",fontSize:11,color:"#1a5a40",fontWeight:700,lineHeight:1.6,marginBottom:8}}>
              <strong>Override reason:</strong> {overrideData.reason}
            </div>
          )}
          {canOv&&!showForm&&(
            <button onClick={()=>setShowForm(true)} style={{fontSize:10,fontWeight:700,padding:"4px 12px",borderRadius:20,border:`1px solid ${FLAGBD}`,background:"#fff",color:FLAG,cursor:"pointer",fontFamily:"inherit"}}>Override this flag</button>
          )}
          {canOv&&showForm&&(
            <div style={{marginTop:8}}>
              <div style={{fontSize:10,fontWeight:800,color:FLAG,marginBottom:4}}>Why are you overriding? <span style={{color:MUTED,fontWeight:600}}>(goes into the report for review)</span></div>
              <textarea value={reason} onChange={e=>setReason(e.target.value)}
                placeholder="e.g. Intentional choice -- approved by the medical team..."
                style={{width:"100%",padding:"7px 10px",borderRadius:6,border:`1px solid ${FLAGBD}`,fontFamily:"inherit",fontSize:11,fontWeight:600,color:TEXT,lineHeight:1.5,resize:"vertical",minHeight:54,background:"#fff"}}/>
              <div style={{display:"flex",gap:6,marginTop:5}}>
                <button onClick={()=>{if(reason.trim().length>=10){onOverride(crit.id,reason.trim());setShowForm(false);}}}
                  disabled={reason.trim().length<10}
                  style={{fontSize:10,fontWeight:800,padding:"5px 12px",borderRadius:20,border:"none",background:reason.trim().length>=10?PASS:"#ccc",color:"#fff",cursor:reason.trim().length>=10?"pointer":"not-allowed",fontFamily:"inherit"}}>
                  Confirm override
                </button>
                <button onClick={()=>setShowForm(false)} style={{fontSize:10,fontWeight:700,padding:"5px 12px",borderRadius:20,border:`1px solid ${BORDER}`,background:"#fff",color:MUTED,cursor:"pointer",fontFamily:"inherit"}}>Cancel</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// -- INLINE REPORT RENDERER ----------------------------------------------------
function buildReportHtml(runs,ovs,fv,tF,tO){
  const CRIT_LIST=[
    {id:"logic",label:"Follows the Logic",group:"Content Quality"},
    {id:"impact",label:"Maximum Impact",group:"Content Quality"},
    {id:"concision",label:"Less is More",group:"Content Quality"},
    {id:"audience",label:"Built for the Audience",group:"Reach & Relevance"},
    {id:"channel",label:"Channel Integrity",group:"Reach & Relevance"},
    {id:"behavior",label:"Shifting Behavior",group:"Reach & Relevance",note:"USE = United Sales Excellence: Connecting, Questioning, Confirming / Providing, Handling, Closing"},
  ];
  const css=`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');*{box-sizing:border-box;margin:0;padding:0;}body{font-family:'Nunito',sans-serif;color:#0a1929;background:#fff;padding:28px;font-size:12px;}h1{font-size:20px;font-weight:900;color:#003261;margin-bottom:2px;}h2{font-size:12px;font-weight:800;color:#003261;margin:16px 0 5px;border-bottom:1px solid #E2EAF2;padding-bottom:3px;}h3{font-size:11px;font-weight:800;color:#003261;margin:9px 0 3px;}.tg{display:inline-block;font-size:9px;font-weight:800;padding:2px 8px;border-radius:20px;text-transform:uppercase;}.Pass{background:#E6F7F2;color:#1D9E75;border:1px solid #9FE1CB;}.Flag{background:#FEF3C7;color:#B45309;border:1px solid #F0C040;}.Fail{background:#FEE2E2;color:#991B1B;border:1px solid #F09595;}.ov{background:#E6F7F2;color:#1D9E75;border:1px solid #9FE1CB;}.meta{color:#5A7A99;font-size:10px;font-weight:600;margin-bottom:10px;}.g2{display:grid;grid-template-columns:1fr 1fr;gap:4px 14px;margin-bottom:8px;}.cl{font-size:9px;font-weight:800;text-transform:uppercase;color:#5A7A99;margin-bottom:1px;}.cv{font-size:11px;font-weight:800;color:#003261;}.cb{border:.5px solid #E2EAF2;border-radius:6px;padding:9px;margin-bottom:5px;}.on{background:#E6F7F2;border-left:2px solid #1D9E75;padding:4px 7px;font-size:10px;color:#1a5a40;font-weight:600;margin-top:3px;}.act{color:#B45309;font-size:10px;font-weight:700;margin-top:4px;}.rb{border:1px solid #E2EAF2;border-radius:7px;padding:11px;margin-bottom:10px;}.msg{background:#F7FAFD;border-left:3px solid #2FB3DF;padding:10px 12px;margin-bottom:8px;font-size:11px;line-height:1.6;white-space:pre-wrap;}.ns{background:#FEF3C7;border-radius:6px;padding:8px;font-size:11px;color:#7a3a00;font-weight:700;margin-top:8px;}.ft{margin-top:20px;font-size:9px;color:#5A7A99;border-top:.5px solid #E2EAF2;padding-top:8px;display:flex;justify-content:space-between;}@media print{body{padding:12px;}}`;

  let html = '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Quality Review Report</title><style>'+css+'</style></head><body>';
  html += '<h1>Quality Review Report</h1>';
  html += '<p style="font-size:13px;font-weight:800;color:#003261;margin-bottom:2px">Reviewed by Ostaz Jawdat -- United Pharmacy Quality Companion</p>';
  html += '<p class="meta">Generated '+new Date().toLocaleString("en-GB")+'</p>';
  html += '<h2>Output Details</h2><div class="g2">';
  html += '<div><div class="cl">Output type</div><div class="cv">'+(runs[0]?.intake.otype||'')+(runs[0]?.intake.trainFormat?' -- '+runs[0].intake.trainFormat:'')+'</div></div>';
  html += '<div><div class="cl">Audience</div><div class="cv">'+(runs[0]?.intake.auds?.join(', ')||'')+'</div></div>';
  html += '<div><div class="cl">Channels</div><div class="cv">'+(runs[0]?.intake.chans?.join(', ')||'')+'</div></div>';
  html += '<div><div class="cl">Campaign</div><div class="cv">'+(runs[0]?.intake.camp||'')+'</div></div>';
  if(runs[0]?.intake.audSize) html += '<div><div class="cl">Audience size</div><div class="cv">'+runs[0].intake.audSize+'</div></div>';
  html += '</div><div class="g2">';
  html += '<div><div class="cl">Total runs</div><div class="cv">'+runs.length+'</div></div>';
  html += '<div><div class="cl">Flags raised</div><div class="cv">'+tF+'</div></div>';
  html += '<div><div class="cl">Overridden</div><div class="cv">'+tO+'</div></div>';
  html += '<div><div class="cl">Final verdict</div><div class="cv"><span class="tg '+(fv?.label||'')+'">'+(fv?.label||'')+'</span></div></div>';
  html += '</div>';

  runs.forEach(function(run){
    html += '<h2>Run '+run.runNumber+' -- '+run.runType+' -- '+run.timestamp+'</h2><div class="rb">';
    if(run.jawdatMessage) html += '<div class="msg"><strong>Ostaz Jawdat:</strong><br>'+run.jawdatMessage.replace(/</g,'&lt;').replace(/>/g,'&gt;')+'</div>';
    ['Content Quality','Reach & Relevance'].forEach(function(g){
      html += '<h3>'+g+'</h3>';
      CRIT_LIST.filter(function(c){return c.group===g;}).forEach(function(c){
        var r=run.criteria&&run.criteria.find(function(x){return x.id===c.id;});
        var ov=(run.overrides||{})[c.id];
        if(!r)return;
        var isOv=ov&&ov.overridden;
        var ev=isOv?'Overridden':r.verdict;
        html += '<div class="cb">';
        html += '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:3px">';
        html += '<strong>'+c.label+'</strong>';
        html += '<span class="tg '+(isOv?'ov':r.verdict)+'">'+ev+'</span>';
        html += '</div>';
        html += '<div style="font-weight:700">'+r.headline+'</div>';
        html += '<div style="color:#5A7A99;margin-top:2px;font-size:10px">'+r.detail+'</div>';
        if(r.revisionAction&&!isOv) html += '<div class="act">Action: '+r.revisionAction+'</div>';
        if(isOv) html += '<div class="on">Override: '+ov.reason+'</div>';
        html += '</div>';
      });
    });
    if(run.nextStep) html += '<div class="ns">Next step: '+run.nextStep+'</div>';
    html += '</div>';
  });

  html += '<div class="ft"><span>United Pharmacy -- Talent Management Department -- Ostaz Jawdat Quality Companion</span><span>This report confirms Quality Companion use before submission</span></div>';
  html += '</body></html>';
  return html;
}


function InlineReport({runs,ovs,onBack,onReset}){
  const [copied,setCopied]=useState(false);
  const reportRef=useRef();
  const lR=runs[runs.length-1];
  const fv=cverd(lR,ovs);
  const tF=runs.reduce((a,r)=>a+(r.criteria?.filter(c=>c.verdict!=="Pass").length||0),0);
  const tO=runs.reduce((a,r)=>a+Object.values(r.overrides||{}).filter(o=>o.overridden).length,0);

  function copyReport(){
    const tF=runs.reduce((a,r)=>a+(r.criteria?.filter(c=>c.verdict!=="Pass").length||0),0);
    const tO=runs.reduce((a,r)=>a+Object.values(r.overrides||{}).filter(o=>o.overridden).length,0);
    const lRun=runs[runs.length-1];
    const fv=cverd(lRun,ovs);
    const html=buildReportHtml(runs,ovs,fv,tF,tO);
    // Method 1: data URI anchor download (works when hosted)
    try{
      const blob=new Blob([html],{type:"text/html;charset=utf-8"});
      const url=URL.createObjectURL(blob);
      const a=document.createElement("a");
      a.href=url;
      a.download="ostaz_jawdat_report.html";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setCopied(true);setTimeout(()=>setCopied(false),3000);
      return;
    }catch(e){}
    // Method 2: window.open with print (sandbox fallback)
    try{
      const w=window.open("","_blank");
      if(w){
        w.document.write(html);
        w.document.close();
        setTimeout(()=>w.print(),600);
        setCopied(true);setTimeout(()=>setCopied(false),3000);
        return;
      }
    }catch(e){}
    // Method 3: clipboard (last resort)
    navigator.clipboard&&navigator.clipboard.writeText(html)
      .then(()=>{setCopied(true);setTimeout(()=>setCopied(false),4000);})
      .catch(()=>{setCopied(true);setTimeout(()=>setCopied(false),4000);});
  }

  return(
    <div style={{fontFamily:"'Nunito',sans-serif",background:LIGHT,minHeight:"100vh"}}>
      <div style={{background:NAVY,padding:"13px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:8,flexWrap:"wrap"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <JawdatAvatar size={30}/>
          <div style={{fontSize:13,fontWeight:900,color:"#fff"}}>Ostaz Jawdat - Quality Report</div>
        </div>
        <button onClick={onBack} style={{fontSize:11,fontWeight:700,padding:"5px 14px",borderRadius:20,border:"1px solid rgba(255,255,255,.2)",background:"rgba(255,255,255,.08)",color:"rgba(255,255,255,.7)",cursor:"pointer",fontFamily:"inherit"}}>&lt;- Back to chat</button>
      </div>
      <div style={{padding:"20px 16px 50px"}}>
        <div style={{maxWidth:680,margin:"0 auto"}}>

          {/* Stats */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginBottom:16}}>
            {[["Total runs",runs.length],["Flags raised",tF],["Overridden",tO],["Final verdict",fv?.label]].map(([l,v])=>(
              <div key={l} style={{background:"#fff",border:`0.5px solid ${BORDER}`,borderRadius:10,padding:12,textAlign:"center"}}>
                <div style={{fontSize:20,fontWeight:900,color:TEXT}}>{v}</div>
                <div style={{fontSize:9,fontWeight:800,textTransform:"uppercase",letterSpacing:".08em",color:MUTED,marginTop:2}}>{l}</div>
              </div>
            ))}
          </div>

          {/* Copy button */}
          <div style={{display:"flex",justifyContent:"flex-end",marginBottom:12}}>
            <button onClick={copyReport} style={{fontSize:11,fontWeight:800,padding:"7px 18px",borderRadius:9,border:`1px solid ${BORDER}`,background:"#fff",color:copied?PASS:TEXT,cursor:"pointer",fontFamily:"inherit"}}>
              {copied?"Downloaded!":"Download report"}
            </button>
          </div>

          {/* Report body */}
          <div ref={reportRef} style={{background:"#fff",border:`0.5px solid ${BORDER}`,borderRadius:14,padding:"20px",marginBottom:14}}>

            <div style={{borderBottom:`1px solid ${BORDER}`,paddingBottom:12,marginBottom:14}}>
              <div style={{fontSize:16,fontWeight:900,color:NAVY,marginBottom:2}}>Quality Review Report</div>
              <div style={{fontSize:11,fontWeight:700,color:MUTED}}>Reviewed by Ostaz Jawdat    United Pharmacy Talent Management</div>
              <div style={{fontSize:10,color:MUTED,fontWeight:600,marginTop:2}}>{new Date().toLocaleString("en-GB")}</div>
            </div>

            {/* Output details */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4px 16px",marginBottom:14,padding:"12px",background:LIGHT,borderRadius:8}}>
              {[
                ["Output type",runs[0]?.intake.otype+(runs[0]?.intake.trainFormat?"    "+runs[0].intake.trainFormat:"")],
                ["Audience",runs[0]?.intake.auds.join(", ")],
                ["Channel",runs[0]?.intake.chan],
                ["Campaign",runs[0]?.intake.camp],
                ...(runs[0]?.intake.audSize?[["Audience size",runs[0].intake.audSize]]:[]),
              ].map(([l,v])=>(
                <div key={l}>
                  <div style={{fontSize:9,fontWeight:800,textTransform:"uppercase",letterSpacing:".08em",color:MUTED}}>{l}</div>
                  <div style={{fontSize:11,fontWeight:800,color:NAVY}}>{v}</div>
                </div>
              ))}
            </div>

            {/* Runs */}
            {runs.map(run=>{
              const runOvs=run.overrides||{};
              return(
                <div key={run.runNumber} style={{marginBottom:16,paddingBottom:16,borderBottom:`0.5px solid ${BORDER}`}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12,flexWrap:"wrap"}}>
                    <div style={{fontSize:12,fontWeight:900,color:NAVY}}>Run {run.runNumber} -- {run.runType}</div>
                    <div style={{fontSize:10,color:MUTED,fontWeight:600}}>{run.timestamp}</div>
                    <Badge verdict={run.overallVerdict||"Flag"}/>
                  </div>

                  {/* Jawdat's review summary */}
                  {run.jawdatMessage&&(
                    <div style={{background:LIGHT,border:`0.5px solid ${BORDER}`,borderLeft:`3px solid ${SKY}`,borderRadius:"0 8px 8px 0",padding:"10px 14px",marginBottom:12,fontSize:11,color:TEXT,fontWeight:600,lineHeight:1.65,whiteSpace:"pre-wrap"}}>
                      <div style={{fontSize:9,fontWeight:800,textTransform:"uppercase",letterSpacing:".08em",color:MUTED,marginBottom:5}}>Ostaz Jawdat's review</div>
                      {run.jawdatMessage}
                    </div>
                  )}

                  {/* Criteria table */}
                  {["Content Quality","Reach & Relevance"].map(g=>(
                    <div key={g} style={{marginBottom:10}}>
                      <div style={{fontSize:9,fontWeight:800,textTransform:"uppercase",letterSpacing:".1em",color:MUTED,margin:"8px 0 5px"}}>{g}</div>
                      {CRIT.filter(c=>c.group===g).map(c=>{
                        const r=run.criteria?.find(x=>x.id===c.id);
                        const ov=runOvs[c.id];
                        if(!r)return null;
                        const isOv=ov?.overridden;
                        const effectiveVerdict=isOv?"Pass":r.verdict;
                        return(
                          <div key={c.id} style={{
                            border:`0.5px solid ${vbd(effectiveVerdict)}`,
                            borderRadius:8,padding:"10px 12px",marginBottom:6,
                            background:vbg(effectiveVerdict),
                          }}>
                            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:4}}>
                              <div style={{fontSize:12,fontWeight:800,color:NAVY}}>{c.label}</div>
                              <Badge verdict={r.verdict} overridden={isOv}/>
                            </div>
                            <div style={{fontSize:11,fontWeight:700,color:TEXT,marginBottom:3}}>{r.headline}</div>
                            <div style={{fontSize:10,color:MUTED,fontWeight:600,lineHeight:1.6}}>{r.detail}</div>
                            {r.revisionAction&&!isOv&&(
                              <div style={{marginTop:6,fontSize:10,fontWeight:700,color:FLAG}}>
                                -> Action: {r.revisionAction}
                              </div>
                            )}
                            {isOv&&(
                              <div style={{marginTop:6,fontSize:10,fontWeight:700,color:PASS}}>
                                -> Override reason: {ov.reason}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ))}

                  {run.nextStep&&(
                    <div style={{background:FLAGBG,border:`1px solid ${FLAGBD}`,borderRadius:8,padding:"10px 12px",fontSize:11,color:"#7a3a00",fontWeight:700}}>
                      -> Next step: {run.nextStep}
                    </div>
                  )}
                </div>
              );
            })}

            <div style={{fontSize:10,color:MUTED,fontWeight:600,textAlign:"center",paddingTop:4}}>
              United Pharmacy    Talent Management Department    Ostaz Jawdat Quality Companion    This report confirms the Quality Companion was used before submission
            </div>
          </div>

          <div style={{display:"flex",justifyContent:"flex-end",gap:8}}>
            <button onClick={onReset} style={{background:NAVY,color:"#fff",fontFamily:"inherit",fontSize:12,fontWeight:800,padding:"10px 22px",borderRadius:9,border:"none",cursor:"pointer"}}>Start new review</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// -- MAIN APP ------------------------------------------------------------------
export default function App(){
  const [activeScreen,setActiveScreen]=useState("intake");
  const [otype,setOtype]=useState("");
  const [rtype,setRtype]=useState("New");
  const [auds,setAuds]=useState([]);
  const [chans,setChans]=useState([]);
  const [camp,setCamp]=useState("");
  const [trainFormat,setTrainFormat]=useState("");
  const [audSize,setAudSize]=useState("");
  const [imgB64,setImgB64]=useState("");
  const [imgName,setImgName]=useState("");
  const [imgMime,setImgMime]=useState("");
  const [pdfB64,setPdfB64]=useState("");
  const [pdfName,setPdfName]=useState("");
  const [imgs,setImgs]=useState([]);
  const [otherLabel,setOtherLabel]=useState("");
  const [txt,setTxt]=useState("");
  const [messages,setMessages]=useState([]);
  const [input,setInput]=useState("");
  const [thinking,setThinking]=useState(false);
  const [runs,setRuns]=useState([]);
  const [ovs,setOvs]=useState({});
  const [showCriteria,setShowCriteria]=useState(false);
  const [brandGate,setBrandGate]=useState({q1:null,q2:null,q3:null,q4:null,q5:null});
  const [brandGateDone,setBrandGateDone]=useState(false);
  const [copyMsg,setCopyMsg]=useState("");
  const [lang,setLang]=useState("en");
  const [customCamp,setCustomCamp]=useState("");
  const [followUpImgB64,setFollowUpImgB64]=useState("");
  const [followUpImgMime,setFollowUpImgMime]=useState("");
  const [followUpPdfB64,setFollowUpPdfB64]=useState("");
  const [followUpPdfName,setFollowUpPdfName]=useState("");
  const followUpImgRef=useRef();
  const followUpPdfRef=useRef();
  const imgRef=useRef();
  const pdfRef=useRef();
  const bottomRef=useRef();
  const runNumRef=useRef(1);

  const isTraining=otype==="Training Session";
  const isConsult=otype==="Consultation";
  const isSeries=otype===SERIES_TYPE;
  const isPdf=PDF_TYPES.includes(otype);
  const isImageOnly=IMAGE_TYPES.includes(otype);
  const isOther=otype==="Other";
  const intakeValid=otype&&auds.length>0&&chans.length>0&&camp&&(!isTraining||(trainFormat&&audSize))&&(!isOther||otherLabel.trim().length>0);
  const outputValid=imgB64||pdfB64||imgs.length>0||(txt.trim().length>20);
  const brandGatePassed=brandGateDone&&Object.values(brandGate).every(v=>v===true);
  const brandGateFailed=Object.values(brandGate).some(v=>v===false);
  const currentRun=runs[runs.length-1]||null;
  const finalVerdict=cverd(currentRun,ovs);

  useEffect(()=>{bottomRef.current?.scrollIntoView({behavior:"smooth"});},[messages,thinking]);

  function handleImg(file){
    if(!file)return;
    const reader=new FileReader();
    reader.onload=e=>{setImgB64(e.target.result.split(",")[1]);setImgName(file.name);setImgMime(file.type);setPdfB64("");setPdfName("");setTxt("");};
    reader.readAsDataURL(file);
  }
  function handlePdf(file){
    if(!file)return;
    const reader=new FileReader();
    reader.onload=e=>{setPdfB64(e.target.result.split(",")[1]);setPdfName(file.name);setImgB64("");setImgName("");setImgMime("");setTxt("");};
    reader.readAsDataURL(file);
  }
  function handleImgs(files){
    if(!files||files.length===0)return;
    const arr=Array.from(files);
    Promise.all(arr.map(f=>new Promise(res=>{
      const reader=new FileReader();
      reader.onload=e=>res({b64:e.target.result.split(",")[1],name:f.name,mime:f.type,id:Math.random().toString(36).slice(2)});
      reader.readAsDataURL(f);
    }))).then(newImgs=>{setImgs(prev=>[...prev,...newImgs]);setImgB64("");setImgName("");setImgMime("");setPdfB64("");setPdfName("");setTxt("");});
  }
  function moveImg(id,dir){
    setImgs(prev=>{
      const idx=prev.findIndex(x=>x.id===id);
      if(idx===-1)return prev;
      const next=idx+dir;if(next<0||next>=prev.length)return prev;
      const arr=[...prev];[arr[idx],arr[next]]=[arr[next],arr[idx]];return arr;
    });
  }
  function removeImg(id){setImgs(prev=>prev.filter(x=>x.id!==id));}
  function clearUpload(){setImgB64("");setImgName("");setImgMime("");setPdfB64("");setPdfName("");setImgs([]);}
  function getInputType(){
    if(pdfB64)return"pdf";
    if(imgs.length>0)return"images";
    if(imgB64)return"image";
    return"text";
  }

  function parseResponse(raw){
    const m=raw.match(/\|\|\|JSON\n([\s\S]*?)\|\|\|END/);
    const text=raw.replace(/\|\|\|JSON[\s\S]*?\|\|\|END/,"").trim();
    let structured=null;
    if(m){try{structured=JSON.parse(m[1].trim());}catch(e){}}
    return{text,structured};
  }

  async function callJawdat(apiMessages,intake,isFirst){
    const hist=messages.map(m=>({role:m.role==="jawdat"?"assistant":"user",content:m.text}));
    const sys=buildPrompt(intake,runNumRef.current,hist);
    const res=await fetch("/.netlify/functions/proxy",{
      method:"POST",headers:{"Content-Type":"application/json"},
      body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:2200,system:sys,messages:apiMessages}),
    });
    const data=await res.json();
    if(data.error)throw new Error(data.error.message);
    const raw=data.content?.find(b=>b.type==="text")?.text||"";
    const{text,structured}=parseResponse(raw);
    setMessages(p=>[...p,{role:"jawdat",text}]);
    if(structured&&isFirst){
      const newRun={
        runNumber:runNumRef.current,runType:intake.rtype,
        timestamp:new Date().toLocaleString("en-GB"),
        intake:{...intake},inputType:intake.inputType||"text",
        inputType:imgB64?"image":"text",
        criteria:structured.criteria||[],
        nextStep:structured.nextStep||"",
        overallVerdict:structured.overallVerdict||"Flag",
        jawdatMessage:text,
        overrides:{},
      };
      setRuns(p=>[...p,newRun]);setOvs({});runNumRef.current+=1;setShowCriteria(true);
    }
  }

  async function startReview(){
    const effectiveOtype=otype==="Other"?(otherLabel.trim()||"Other"):otype;
    const intake={otype:effectiveOtype,rtype,auds:[...auds],chans:[...chans],camp,trainFormat:isTraining?trainFormat:"",audSize:isTraining?audSize:"",inputType:getInputType(),lang};
    const userMsg=imgB64?"I've uploaded my output image for your review.":"I've shared my output for your review.";
    setMessages([{role:"user",text:userMsg}]);
    setActiveScreen("chat");setThinking(true);
    try{
      let apiMsgs;
      if(imgB64){
        apiMsgs=[{role:"user",content:[
          {type:"image",source:{type:"base64",media_type:imgMime,data:imgB64}},
          {type:"text",text:"Please review this output."}
        ]}];
      }else{
        apiMsgs=[{role:"user",content:`Please review this output:\n\n${txt}`}];
      }
      await callJawdat(apiMsgs,intake,true);
    }catch(e){
      setMessages(p=>[...p,{role:"jawdat",text:`Something went wrong -- ${e.message}. Try again?`}]);
    }finally{setThinking(false);}
  }

  async function sendFollowUp(){
    if((!input.trim()&&!followUpImgB64&&!followUpPdfB64)||thinking)return;
    const msg=input.trim();setInput("");
    const displayMsg=msg||(followUpImgB64?"[Image attached]":"[PDF attached]");
    setMessages(p=>[...p,{role:"user",text:displayMsg}]);
    setThinking(true);
    const effectiveOtype=otype==="Other"?(otherLabel.trim()||"Other"):otype;
    const intake={otype:effectiveOtype,rtype,auds:[...auds],chans:[...chans],camp,trainFormat:isTraining?trainFormat:"",audSize:isTraining?audSize:"",inputType:getInputType(),lang};
    const aImg=followUpImgB64,aImgM=followUpImgMime,aPdf=followUpPdfB64,aPdfN=followUpPdfName;
    setFollowUpImgB64("");setFollowUpImgMime("");setFollowUpPdfB64("");setFollowUpPdfName("");
    try{
      const hist=[...messages,{role:"user",text:displayMsg}];
      let lastContent;
      if(aImg){lastContent=[{type:"image",source:{type:"base64",media_type:aImgM,data:aImg}},{type:"text",text:msg||"Please review this updated version."}];}
      else if(aPdf){lastContent=[{type:"document",source:{type:"base64",media_type:"application/pdf",data:aPdf}},{type:"text",text:msg||"Please review this updated version."}];}
      else{lastContent=msg;}
      const apiMsgs=[
        ...hist.slice(0,-1).map(m=>({role:m.role==="jawdat"?"assistant":"user",content:m.text})),
        {role:"user",content:lastContent}
      ];
      await callJawdat(apiMsgs,intake,false);
    }catch(e){
      setMessages(p=>[...p,{role:"jawdat",text:`Something went wrong -- ${e.message}.`}]);
    }finally{setThinking(false);}
  }

  function handleOverride(id,reason){
    const nOv={...ovs,[id]:{overridden:true,reason}};
    setOvs(nOv);
    setRuns(p=>{const u=[...p];u[u.length-1]={...u[u.length-1],overrides:nOv};return u;});
  }

  function resetAll(){
    setActiveScreen("intake");setOtype("");setRtype("New");setAuds([]);setChans([]);setCamp("");
    setTrainFormat("");setAudSize("");clearUpload();setTxt("");
    setMessages([]);setInput("");setThinking(false);setRuns([]);setOvs({});
    setShowCriteria(false);runNumRef.current=1;
    setBrandGate({q1:null,q2:null,q3:null,q4:null,q5:null});setBrandGateDone(false);setOtherLabel("");setLang("en");setCustomCamp("");setFollowUpImgB64("");setFollowUpImgMime("");setFollowUpPdfB64("");setFollowUpPdfName("");
  }

  // -- REPORT SCREEN ---------------------------------------------------------
  if(activeScreen==="report") return(
    <InlineReport
      runs={runs} ovs={ovs}
      onBack={()=>setActiveScreen("chat")}
      onReset={resetAll}
    />
  );

  // -- INTAKE SCREEN ---------------------------------------------------------
  if(activeScreen==="intake") return(
    <div style={{fontFamily:"'Nunito',sans-serif",background:LIGHT,minHeight:"100vh"}}>
      <div style={{background:NAVY,padding:"13px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:8}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <JawdatAvatar size={34}/>
          <div>
            <div style={{fontSize:14,fontWeight:900,color:"#fff"}}>Ostaz Jawdat</div>
            <div style={{fontSize:10,color:"rgba(255,255,255,.5)",fontWeight:600}}>Quality Companion    United Pharmacy TM</div>
          </div>
        </div>
        <div style={{fontSize:9,fontWeight:800,letterSpacing:".1em",color:ORANGE,background:"rgba(255,153,93,.12)",border:"1px solid rgba(255,153,93,.3)",borderRadius:20,padding:"3px 9px"}}>Prototype v1</div>
      </div>
      <div style={{padding:"20px 16px 50px"}}>
        <div style={{maxWidth:680,margin:"0 auto"}}>

          {/* Welcome */}
          <div style={{background:"#fff",border:`0.5px solid ${BORDER}`,borderRadius:14,padding:"18px 20px",marginBottom:14,display:"flex",gap:14,alignItems:"flex-start"}}>
            <JawdatAvatar size={52}/>
            <div>
              <div style={{fontSize:13,fontWeight:900,color:NAVY,marginBottom:4}}>Welcome. Tell me about this output first.</div>
              <div style={{fontSize:12,color:MUTED,fontWeight:600,lineHeight:1.65}}>Before I read anything, I need to know who it's for, where it lives, and what campaign it should be serving. That context changes everything about how I read it.</div>
            </div>
          </div>

          {/* Intake form */}
          <div style={{background:"#fff",border:`0.5px solid ${BORDER}`,borderRadius:14,padding:"18px 20px",marginBottom:14}}>

            <div style={{marginBottom:14,display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:8}}>
              <div style={{display:"flex",alignItems:"center",gap:6}}>
                <div style={{fontSize:10,fontWeight:800,textTransform:"uppercase",letterSpacing:".08em",color:MUTED}}>New or revised?</div>
                {["New","Revised"].map(t=><Chip key={t} label={t} on={rtype===t} onClick={()=>setRtype(t)}/>)}
              </div>
              <div style={{display:"flex",alignItems:"center",gap:6}}>
                <div style={{fontSize:10,fontWeight:800,textTransform:"uppercase",letterSpacing:".08em",color:MUTED}}>Output language:</div>
                <button onClick={()=>setLang("en")} style={{fontSize:11,fontWeight:800,padding:"4px 14px",borderRadius:20,border:`1px solid ${lang==="en"?NAVY:BORDER}`,background:lang==="en"?NAVY:"#fff",color:lang==="en"?"#fff":MUTED,cursor:"pointer",fontFamily:"inherit"}}>EN</button>
                <button onClick={()=>setLang("ar")} style={{fontSize:11,fontWeight:800,padding:"4px 14px",borderRadius:20,border:`1px solid ${lang==="ar"?NAVY:BORDER}`,background:lang==="ar"?NAVY:"#fff",color:lang==="ar"?"#fff":MUTED,cursor:"pointer",fontFamily:"inherit",fontFamily:"inherit"}}>{String.fromCharCode(1593,1585,1576,1610)}</button>
              </div>
            </div>

            <div style={{marginBottom:14}}>
              <div style={{fontSize:10,fontWeight:800,textTransform:"uppercase",letterSpacing:".08em",color:MUTED,marginBottom:5}}>Output type *</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                {OTYPES.map(t=><Chip key={t} label={t} on={otype===t} onClick={()=>{setOtype(t);setTrainFormat("");setAudSize("");clearUpload();setTxt("");setBrandGate({q1:null,q2:null,q3:null,q4:null,q5:null});setBrandGateDone(false);setOtherLabel("");setLang("en");setCustomCamp("");setFollowUpImgB64("");setFollowUpImgMime("");setFollowUpPdfB64("");setFollowUpPdfName("");}}/>)}
              </div>
              {isConsult&&<div style={{background:LIGHT,border:`0.5px solid ${BORDER}`,borderRadius:8,padding:"8px 12px",fontSize:11,color:MUTED,fontWeight:600,lineHeight:1.5,marginTop:8}}>Reviewed for both the pharmacist who asked and the full team who will receive it.</div>}
              {otype==="Flash Card -- Series"&&<div style={{background:LIGHT,border:`0.5px solid ${BORDER}`,borderRadius:8,padding:"8px 12px",fontSize:11,color:MUTED,fontWeight:600,lineHeight:1.5,marginTop:8}}>I will check consistency and flow across the full set -- not just individual cards.</div>}
              {otype==="Other"&&(
                <div style={{marginTop:10}}>
                  <div style={{fontSize:10,fontWeight:800,textTransform:"uppercase",letterSpacing:".08em",color:MUTED,marginBottom:5}}>Describe the output type *</div>
                  <input type="text" value={otherLabel} onChange={e=>setOtherLabel(e.target.value)}
                    placeholder="e.g. WhatsApp announcement, competition brief, certificate..."
                    style={{width:"100%",padding:"9px 12px",borderRadius:8,border:`0.5px solid ${BORDER}`,fontFamily:"inherit",fontSize:12,fontWeight:600,color:TEXT,background:"#fff"}}/>
                </div>
              )}
            </div>

            {isTraining&&(
              <>
                <div style={{marginBottom:14}}>
                  <div style={{fontSize:10,fontWeight:800,textTransform:"uppercase",letterSpacing:".08em",color:MUTED,marginBottom:5}}>Session format *</div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:6}}>{TRAIN_FORMATS.map(f=><Chip key={f} label={f} on={trainFormat===f} onClick={()=>setTrainFormat(f)}/>)}</div>
                </div>
                <div style={{marginBottom:14}}>
                  <div style={{fontSize:10,fontWeight:800,textTransform:"uppercase",letterSpacing:".08em",color:MUTED,marginBottom:5}}>Audience size *</div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:6}}>{AUD_SIZES.map(sz=><Chip key={sz} label={sz} on={audSize===sz} onClick={()=>setAudSize(sz)}/>)}</div>
                </div>
              </>
            )}

            <div style={{marginBottom:14}}>
              <div style={{fontSize:10,fontWeight:800,textTransform:"uppercase",letterSpacing:".08em",color:MUTED,marginBottom:5}}>
                Target audience * <span style={{fontSize:9,color:MUTED,textTransform:"none",letterSpacing:0,fontWeight:600}}>(select all that apply)</span>
              </div>
              <div style={{display:"flex",flexWrap:"wrap",gap:6}}>{AUDS.map(a=><Chip key={a} label={a} on={auds.includes(a)} multi onClick={()=>setAuds(p=>p.includes(a)?p.filter(x=>x!==a):[...p,a])}/>)}</div>
              {auds.length>1&&<div style={{background:FLAGBG,border:`1px solid ${FLAGBD}`,borderRadius:8,padding:"9px 12px",fontSize:11,color:FLAG,fontWeight:700,lineHeight:1.5,marginTop:8}}> Multiple audiences -- I'll check whether one version can genuinely serve all levels.</div>}
            </div>

            <div style={{marginBottom:14}}>
              <div style={{fontSize:10,fontWeight:800,textTransform:"uppercase",letterSpacing:".08em",color:MUTED,marginBottom:5}}>Channel * <span style={{fontSize:9,color:MUTED,textTransform:"none",letterSpacing:0,fontWeight:600}}>(select all that apply)</span></div>
              <div style={{display:"flex",flexWrap:"wrap",gap:6}}>{CHANS.map(c=><Chip key={c} label={c} on={chans.includes(c)} multi onClick={()=>setChans(p=>p.includes(c)?p.filter(x=>x!==c):[...p,c])}/>)}</div>
            </div>

            <div>
              <div style={{fontSize:10,fontWeight:800,textTransform:"uppercase",letterSpacing:".08em",color:MUTED,marginBottom:5}}>Active campaign *</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:6}}>{CAMPS.map(c=><Chip key={c} label={c} on={camp===c} onClick={()=>setCamp(c)}/>)}</div>
              <div style={{fontSize:10,color:MUTED,fontWeight:600,fontStyle:"italic",marginTop:4}}>Campaign list managed by TM Head    Updated each quarter</div>
            </div>
          </div>

          {/* Brand gate */}
          {intakeValid&&!brandGateDone&&(
            <div style={{background:"#fff",border:`0.5px solid ${BORDER}`,borderRadius:14,padding:"18px 20px",marginBottom:14}}>
              <div style={{fontSize:13,fontWeight:800,color:NAVY,marginBottom:4}}>Before we start -- a quick brand check.</div>
              <div style={{fontSize:11,color:MUTED,fontWeight:600,lineHeight:1.5,marginBottom:14}}>Five questions. If anything is off, fix it first. Ostaz Jawdat reviews quality -- not brand issues.</div>
              {BRAND_GATE_QUESTIONS.map(q=>(
                <div key={q.id} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 0",borderTop:`0.5px solid ${BORDER}`}}>
                  <div style={{fontSize:12,fontWeight:600,color:TEXT,flex:1,paddingRight:16}}>{q.text}</div>
                  <div style={{display:"flex",gap:8,flexShrink:0}}>
                    <button onClick={()=>setBrandGate(p=>({...p,[q.id]:true}))} style={{fontSize:11,fontWeight:800,padding:"5px 14px",borderRadius:20,border:`1px solid ${brandGate[q.id]===true?PASS:BORDER}`,background:brandGate[q.id]===true?PASSBG:"#fff",color:brandGate[q.id]===true?PASS:MUTED,cursor:"pointer",fontFamily:"inherit"}}>Yes</button>
                    <button onClick={()=>setBrandGate(p=>({...p,[q.id]:false}))} style={{fontSize:11,fontWeight:800,padding:"5px 14px",borderRadius:20,border:`1px solid ${brandGate[q.id]===false?FAILBD:BORDER}`,background:brandGate[q.id]===false?FAILBG:"#fff",color:brandGate[q.id]===false?FAIL:MUTED,cursor:"pointer",fontFamily:"inherit"}}>No</button>
                  </div>
                </div>
              ))}
              {brandGateFailed&&<div style={{marginTop:12,background:FAILBG,border:`1px solid ${FAILBD}`,borderRadius:8,padding:"10px 14px",fontSize:11,color:FAIL,fontWeight:700}}>Fix the items marked No before proceeding.</div>}
              {Object.values(brandGate).every(v=>v===true)&&(
                <div style={{marginTop:12,display:"flex",justifyContent:"flex-end"}}>
                  <button onClick={()=>setBrandGateDone(true)} style={{background:PASS,color:"#fff",fontFamily:"inherit",fontSize:12,fontWeight:800,padding:"10px 22px",borderRadius:9,border:"none",cursor:"pointer"}}>All good -- continue</button>
                </div>
              )}
            </div>
          )}
          {intakeValid&&brandGateDone&&(
            <div style={{background:PASSBG,border:`1px solid ${PASSBD}`,borderRadius:10,padding:"8px 14px",marginBottom:14,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <div style={{fontSize:11,fontWeight:700,color:PASS}}>Brand check passed</div>
              <button onClick={()=>setBrandGateDone(false)} style={{fontSize:10,fontWeight:700,padding:"3px 10px",borderRadius:20,border:`1px solid ${PASSBD}`,background:"#fff",color:PASS,cursor:"pointer",fontFamily:"inherit"}}>Edit</button>
            </div>
          )}
          {/* Output upload */}
          {intakeValid&&brandGateDone&&(
            <div style={{background:"#fff",border:`0.5px solid ${BORDER}`,borderRadius:14,padding:"18px 20px",marginBottom:14}}>
              <div style={{fontSize:13,fontWeight:800,color:NAVY,marginBottom:4}}>Now, share the output with me.</div>
              <div style={{fontSize:11,color:MUTED,fontWeight:600,lineHeight:1.5,marginBottom:14}}>
                {isSeries?"Upload images one at a time or all at once -- then reorder.":"Upload an image, a PDF, or paste the content below."}
              </div>

              {/* Flash Card Series -- sequential image upload */}
              {isSeries&&(<>
                {imgs.length>0&&(
                  <div style={{background:PASSBG,border:`1px solid ${PASSBD}`,borderRadius:10,padding:"12px 14px",marginBottom:12}}>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
                      <div style={{fontSize:12,fontWeight:800,color:PASS}}>{imgs.length} card{imgs.length>1?"s":""} in series</div>
                      <button onClick={clearUpload} style={{fontSize:10,fontWeight:700,padding:"3px 10px",borderRadius:20,border:`1px solid ${PASSBD}`,background:"#fff",color:PASS,cursor:"pointer",fontFamily:"inherit"}}>Clear all</button>
                    </div>
                    {imgs.map((img,i)=>(
                      <div key={img.id} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderTop:i>0?`0.5px solid ${PASSBD}`:"none"}}>
                        <div style={{fontSize:10,fontWeight:800,color:PASS,width:16,textAlign:"center",flexShrink:0}}>{i+1}</div>
                        <img src={`data:${img.mime};base64,${img.b64}`} alt={`Card ${i+1}`} style={{width:40,height:40,borderRadius:5,objectFit:"cover",border:`1px solid ${PASSBD}`,flexShrink:0}}/>
                        <div style={{fontSize:11,fontWeight:700,color:PASS,flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{img.name}</div>
                        <div style={{display:"flex",gap:4,flexShrink:0}}>
                          <button onClick={()=>moveImg(img.id,-1)} disabled={i===0} style={{width:22,height:22,borderRadius:4,border:`1px solid ${i===0?PASSBD:PASS}`,background:"#fff",color:i===0?PASSBD:PASS,cursor:i===0?"not-allowed":"pointer",fontSize:12,fontWeight:800,fontFamily:"inherit"}}>^</button>
                          <button onClick={()=>moveImg(img.id,1)} disabled={i===imgs.length-1} style={{width:22,height:22,borderRadius:4,border:`1px solid ${i===imgs.length-1?PASSBD:PASS}`,background:"#fff",color:i===imgs.length-1?PASSBD:PASS,cursor:i===imgs.length-1?"not-allowed":"pointer",fontSize:12,fontWeight:800,fontFamily:"inherit",transform:"scaleY(-1)"}}>^</button>
                          <button onClick={()=>removeImg(img.id)} style={{width:22,height:22,borderRadius:4,border:`1px solid ${FAILBD}`,background:"#fff",color:FAIL,cursor:"pointer",fontSize:12,fontWeight:800,fontFamily:"inherit"}}>x</button>
                        </div>
                      </div>
                    ))}
                    <div style={{marginTop:8,paddingTop:8,borderTop:`0.5px solid ${PASSBD}`}}>
                      <button onClick={()=>imgRef.current?.click()} style={{fontSize:11,fontWeight:700,padding:"5px 14px",borderRadius:20,border:`1px solid ${PASSBD}`,background:"#fff",color:PASS,cursor:"pointer",fontFamily:"inherit"}}>+ Add more cards</button>
                    </div>
                  </div>
                )}
                {imgs.length===0&&(
                  <div onClick={()=>imgRef.current?.click()} style={{border:`2px dashed ${BORDER}`,borderRadius:10,padding:20,textAlign:"center",background:LIGHT,cursor:"pointer",marginBottom:12}}>
                    <div style={{fontSize:26,color:MUTED,marginBottom:5}}>^</div>
                    <div style={{fontSize:13,fontWeight:800,color:TEXT}}>Upload images</div>
                    <div style={{fontSize:11,color:MUTED,fontWeight:600,marginTop:2}}>Select all at once or add one by one</div>
                  </div>
                )}
                <input ref={imgRef} type="file" accept="image/png,image/jpeg" multiple style={{display:"none"}} onChange={e=>{handleImgs(e.target.files);e.target.value="";}}/>
              </>)}

              {/* All other types -- image + PDF + text */}
              {!isSeries&&(<>
                {/* Uploaded file display */}
                {(imgB64||pdfB64)&&(
                  <div style={{background:PASSBG,border:`1px solid ${PASSBD}`,borderRadius:9,padding:"11px 14px",display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
                    {imgB64&&<img src={`data:${imgMime};base64,${imgB64}`} alt="Output" style={{width:48,height:48,borderRadius:6,objectFit:"cover",border:`1px solid ${PASSBD}`,flexShrink:0}}/>}
                    {pdfB64&&<div style={{width:48,height:48,borderRadius:6,background:NAVY,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:13,color:"#fff",fontWeight:800}}>PDF</div>}
                    <div style={{flex:1}}>
                      <div style={{fontSize:12,fontWeight:800,color:PASS}}>{imgName||pdfName}</div>
                      <div style={{fontSize:10,color:MUTED,fontWeight:600,marginTop:1}}>Ready -- Ostaz Jawdat can read this</div>
                    </div>
                    <button onClick={clearUpload} style={{fontSize:10,fontWeight:700,padding:"3px 10px",borderRadius:20,border:`1px solid ${PASSBD}`,background:"#fff",color:PASS,cursor:"pointer",fontFamily:"inherit"}}>Remove</button>
                  </div>
                )}
                {/* Upload buttons -- always shown when no file uploaded */}
                {!imgB64&&!pdfB64&&(
                  <div style={{display:"flex",gap:8,marginBottom:12}}>
                    <button onClick={()=>imgRef.current?.click()} style={{flex:1,padding:"14px",border:`2px dashed ${BORDER}`,borderRadius:10,background:LIGHT,cursor:"pointer",fontFamily:"inherit",fontSize:12,fontWeight:700,color:MUTED}}>
                      Upload image
                    </button>
                    <button onClick={()=>pdfRef.current?.click()} style={{flex:1,padding:"14px",border:`2px dashed ${BORDER}`,borderRadius:10,background:LIGHT,cursor:"pointer",fontFamily:"inherit",fontSize:12,fontWeight:700,color:MUTED}}>
                      Upload PDF
                    </button>
                  </div>
                )}
                <input ref={imgRef} type="file" accept="image/png,image/jpeg" style={{display:"none"}} onChange={e=>handleImg(e.target.files[0])}/>
                <input ref={pdfRef} type="file" accept="application/pdf" style={{display:"none"}} onChange={e=>handlePdf(e.target.files[0])}/>
                {/* Divider */}
                {!imgB64&&!pdfB64&&(
                  <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
                    <div style={{flex:1,height:.5,background:BORDER}}/>
                    <div style={{fontSize:10,fontWeight:800,color:MUTED,textTransform:"uppercase",letterSpacing:".08em"}}>or paste text</div>
                    <div style={{flex:1,height:.5,background:BORDER}}/>
                  </div>
                )}
                {/* Text paste -- always available */}
                {!imgB64&&!pdfB64&&(
                  <>
                    {PASTE_HINTS[otype]&&(
                      <div style={{background:LIGHT,border:`0.5px solid ${BORDER}`,borderLeft:`3px solid ${SKY}`,borderRadius:"0 8px 8px 0",padding:"9px 13px",fontSize:11,color:MUTED,fontWeight:600,lineHeight:1.5,marginBottom:10}}>
                        <strong style={{color:NAVY}}>What to paste:</strong> {PASTE_HINTS[otype]}
                      </div>
                    )}
                    <textarea value={txt} onChange={e=>setTxt(e.target.value)}
                      placeholder="Paste your output content here..."
                      style={{width:"100%",minHeight:130,padding:"10px 12px",borderRadius:8,border:`0.5px solid ${BORDER}`,fontFamily:"inherit",fontSize:12,fontWeight:600,color:TEXT,lineHeight:1.6,resize:"vertical",background:"#fff"}}/>
                  </>
                )}
              </>)}
            </div>
          )}
          {intakeValid&&brandGatePassed&&outputValid&&(
            <div style={{display:"flex",justifyContent:"flex-end"}}>
              <button onClick={startReview} style={{background:NAVY,color:"#fff",fontFamily:"inherit",fontSize:13,fontWeight:800,padding:"12px 28px",borderRadius:10,border:"none",cursor:"pointer"}}>
                Send to Ostaz Jawdat
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // -- CHAT SCREEN -----------------------------------------------------------
  return(
    <div style={{fontFamily:"'Nunito',sans-serif",background:LIGHT,minHeight:"100vh",display:"flex",flexDirection:"column"}}>
      <div style={{background:NAVY,padding:"11px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:8,flexShrink:0}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <JawdatAvatar size={32}/>
          <div>
            <div style={{fontSize:13,fontWeight:900,color:"#fff"}}>Ostaz Jawdat</div>
            <div style={{display:"flex",alignItems:"center",gap:5}}>
              <div style={{width:6,height:6,borderRadius:"50%",background:PASS}}/>
              <div style={{fontSize:10,color:"rgba(255,255,255,.5)",fontWeight:600}}>Active    {otype}{isTraining&&trainFormat?"    "+trainFormat:""}    {camp}</div>
            </div>
          </div>
        </div>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          {runs.length>0&&<button onClick={()=>setActiveScreen("report")} style={{fontSize:11,fontWeight:700,padding:"5px 14px",borderRadius:20,border:`1px solid ${PASSBD}`,background:PASSBG,color:PASS,cursor:"pointer",fontFamily:"inherit"}}>View report</button>}
          <button onClick={resetAll} style={{fontSize:11,fontWeight:700,padding:"5px 14px",borderRadius:20,border:"1px solid rgba(255,255,255,.2)",background:"rgba(255,255,255,.08)",color:"rgba(255,255,255,.6)",cursor:"pointer",fontFamily:"inherit"}}>New review</button>
        </div>
      </div>

      <div style={{flex:1,overflowY:"auto",padding:"16px 16px 8px"}}>
        <div style={{maxWidth:680,margin:"0 auto"}}>
          {messages.map((m,i)=>(
            <div key={i} style={{display:"flex",gap:10,marginBottom:14,flexDirection:m.role==="jawdat"?"row":"row-reverse"}}>
              {m.role==="jawdat"&&<JawdatAvatar size={32}/>}
              <div style={{maxWidth:"80%"}}>
                <div style={{
                  background:m.role==="jawdat"?"#fff":NAVY,
                  color:m.role==="jawdat"?TEXT:"#fff",
                  border:m.role==="jawdat"?`0.5px solid ${BORDER}`:"none",
                  borderRadius:m.role==="jawdat"?"0 12px 12px 12px":"12px 0 12px 12px",
                  padding:"12px 16px",fontSize:13,fontWeight:600,lineHeight:1.7,whiteSpace:"pre-wrap",direction:lang==="ar"?"rtl":"ltr",textAlign:lang==="ar"&&m.role==="jawdat"?"right":"left",
                }}>{m.text}</div>
                {m.role==="jawdat"&&i===messages.length-1&&!thinking&&runs.length>0&&(
                  <button onClick={()=>setShowCriteria(!showCriteria)} style={{marginTop:6,fontSize:10,fontWeight:700,padding:"3px 12px",borderRadius:20,border:`1px solid ${BORDER}`,background:"#fff",color:MUTED,cursor:"pointer",fontFamily:"inherit"}}>
                    {showCriteria?"Hide":"Show"} criteria breakdown
                  </button>
                )}
              </div>
            </div>
          ))}

          {thinking&&(
            <div style={{display:"flex",gap:10,marginBottom:14}}>
              <JawdatAvatar size={32}/>
              <div style={{background:"#fff",border:`0.5px solid ${BORDER}`,borderRadius:"0 12px 12px 12px"}}>
                <TypingDots/>
              </div>
            </div>
          )}

          {showCriteria&&currentRun&&!thinking&&(
            <div style={{background:"#fff",border:`0.5px solid ${BORDER}`,borderRadius:14,padding:"14px 16px",marginBottom:14}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
                <div style={{fontSize:11,fontWeight:800,color:NAVY}}>Criteria breakdown    Run {currentRun.runNumber}</div>
                <div style={{fontSize:10,fontWeight:800,padding:"3px 10px",borderRadius:20,
                  background:vbg(finalVerdict.label),color:vcolor(finalVerdict.label),border:`1px solid ${vbd(finalVerdict.label)}`}}>
                  {vicon(finalVerdict.label)} {finalVerdict.label}
                </div>
              </div>
              {["Content Quality","Reach & Relevance"].map(g=>(
                <div key={g}>
                  <div style={{fontSize:9,fontWeight:800,textTransform:"uppercase",letterSpacing:".1em",color:MUTED,margin:"10px 0 5px"}}>{g}</div>
                  {CRIT.filter(c=>c.group===g).map(c=>{
                    const r=currentRun.criteria?.find(x=>x.id===c.id);
                    if(!r)return null;
                    return <CritRow key={c.id} crit={c} result={r} overrideData={ovs[c.id]} onOverride={handleOverride}/>;
                  })}
                </div>
              ))}
              {currentRun.nextStep&&<div style={{background:FLAGBG,borderRadius:8,padding:"10px 12px",marginTop:10,fontSize:11,color:"#7a3a00",fontWeight:700}}>-> Next step: {currentRun.nextStep}</div>}
              {<div style={{marginTop:12,display:"flex",gap:8,justifyContent:"flex-end"}}>
                  <button onClick={()=>setActiveScreen("intake")} style={{fontSize:11,fontWeight:800,padding:"8px 18px",borderRadius:9,border:`1px solid ${BORDER}`,background:"#fff",color:TEXT,cursor:"pointer",fontFamily:"inherit"}}>Revise & resubmit</button>
                  <button onClick={()=>setActiveScreen("report")} style={{fontSize:11,fontWeight:800,padding:"8px 18px",borderRadius:9,border:"none",background:PASS,color:"#fff",cursor:"pointer",fontFamily:"inherit"}}>View report</button>
                </div>}
            </div>
          )}
          <div ref={bottomRef}/>
        </div>
      </div>

      <div style={{background:"#fff",borderTop:`0.5px solid ${BORDER}`,padding:"12px 16px",flexShrink:0}}>
        <div style={{maxWidth:680,margin:"0 auto",display:"flex",gap:8,alignItems:"flex-end"}}>
          <textarea value={input} onChange={e=>setInput(e.target.value)}
            onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();sendFollowUp();}}}
            placeholder="Ask Ostaz Jawdat a follow-up question..."
            disabled={thinking} rows={1}
            style={{flex:1,padding:"10px 14px",borderRadius:10,border:`0.5px solid ${BORDER}`,fontFamily:"inherit",fontSize:13,fontWeight:600,color:TEXT,lineHeight:1.5,resize:"none",background:"#fff",outline:"none",opacity:thinking?.6:1}}/>
          <button onClick={sendFollowUp} disabled={!input.trim()||thinking}
            style={{background:input.trim()&&!thinking?NAVY:"#ccc",color:"#fff",border:"none",borderRadius:10,padding:"10px 16px",cursor:input.trim()&&!thinking?"pointer":"not-allowed",fontFamily:"inherit",fontSize:13,fontWeight:800,flexShrink:0}}>--&gt;</button>
        </div>
      </div>
    </div>
  );
}
