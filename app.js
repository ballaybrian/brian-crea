import { startFirebase, saveDocumentToCloud, deleteDocumentFromCloud, subscribeDocuments } from "./firebase-sync.js";

const LOGO = "data:image/png;base64,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AAAEEAAAAAAggAAAAAAAAQQAAAAACCAAAAAAQAABAAAAAAIIAAAAABBAAAAAAIAAAgAAAAAEEAAAAAAggAAAAAAAAQQAAAAACCAAAAAAQAABAAAAAAIIAAAAABBAAAAAAIAAAgAAAAAEEAAAAAAggAAAAAAAAQQAAAAACCAAAAAAQAABAAAAAAIIAAAAABBAAAAAAIAAAgAAAAAEEAAAAAAggAAAAAAAAQQAAAAACCAAAAAAQAABAAAAAAIIAAAAABBAAAAAAIAAAgAAAAAEEAAAAAAggAAAAAAAAQQAAAAACCAAAAAAQAABAAAAAAIIAAAAABBAAAAAAIAAAgAAAAAEEAAAAAAggAAAAAAAAQQAAAAACCAAAAAAQAABAAAAAAIIAAAAABBAAAAAAIAAAgAAAAAEEAAAAAAggAAAAAAAAQQAAAAACCAAAAAAQAABAAAAAAIIAAAAABBAAAAAAIAAAgAAAAAEEAAAAAAggAAAAAAAAQQAAAAACCAAAAAAQAABAAAAAAIIAAAAABBAAAAAAIAAAgAAAAAEEAAAAAAggAAAAAAAAQQAAAAACCAAAAAAQAABAAAAAAIIAAAAABBAAAAAAIAAAgAAAAAEEAAAAAAggAAAAAAAAQQAAAAACCAAAAAAQAABAAAAAAIIAAAAABBAAAAAAIAAAgAAAAAEEAAAAAAggAAAAAAAAQQAAAAACCAAAAAAQAABAAAAAAIIAAAAABBAAAAAAIAAAgAAAAAEEAAAAAAggAAAAAAAAQQAAAAACCAAAAAAQAABAAAAAAIIAAAAABBAAAAAAIAAAgAAAAAE+H+vjGBD69R78gAAAABJRU5ErkJggg==";
const COMPANY = {
  name:"BALLAY Créa", subtitle:"homme toutes mains", owner:"BALLAY Brian",
  address1:"90 rue du soleil levant", address2:"76230 Bois-Guillaume",
  email:"ballay.brian@gmail.com", phone:"06 34 09 08 20", siret:"89897316900029"
};
const state = { currentType:"devis", currentNumber:"", taskCounter:0, history:[], unsubscribe:null };

function todayISO() { const d=new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`; }
function formatEuro(v) { return Number(v||0).toLocaleString("fr-FR", {style:"currency", currency:"EUR"}); }
function escapeHtml(str) { return String(str||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;").replace(/\n/g,"<br>"); }
function setSyncBadge(text, ok=true) { const b=document.getElementById("syncBadge"); if(!b) return; b.textContent=text; b.style.background=ok?"#eef5ec":"#fcecec"; b.style.color=ok?"#6f876a":"#9f4f4f"; }
function showScreen(id) { document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active")); document.getElementById(id).classList.add("active"); }
function showPanel(id) { document.querySelectorAll(".panel").forEach(p=>p.classList.add("hidden")); document.getElementById(id).classList.remove("hidden"); }
function getNextNumber(type) { const key=type==="devis"?"ballay-counter-devis":"ballay-counter-facture"; let c=parseInt(localStorage.getItem(key)||"0",10)+1; localStorage.setItem(key,String(c)); return `${type==="devis"?"DEV":"FAC"}-${new Date().getFullYear()}-${String(c).padStart(3,"0")}`; }

function updateTotals() {
  let sub=0;
  document.querySelectorAll(".task-row").forEach(row=>{ const qty=parseFloat(row.querySelector(".task-qty").value||0); const price=parseFloat(row.querySelector(".task-price").value||0); const total=qty*price; row.querySelector(".task-total").value=formatEuro(total); sub+=total; });
  document.getElementById("subTotalHt").textContent=formatEuro(sub);
  document.getElementById("totalTtc").textContent=formatEuro(sub);
}

function addTask(data={}) {
  state.taskCounter++;
  const row=document.createElement("div");
  row.className="task-row"; row.dataset.id=state.taskCounter;
  row.innerHTML = `
    <div class="task-head">
      <strong>Prestation ${state.taskCounter}</strong>
      <button class="small-btn danger" type="button" onclick="removeTask(${state.taskCounter})">Supprimer</button>
    </div>
    <div class="grid-2">
      <div style="grid-column:1/-1;">
        <label>Description</label>
        <textarea class="task-desc" placeholder="Ex : Préparation des murs et application de deux couches de peinture">${data.desc || ""}</textarea>
      </div>
      <div><label>Quantité</label><input class="task-qty" type="number" min="0" step="0.01" value="${data.qty || 1}" oninput="updateTotals()"></div>
      <div><label>Unité</label><input class="task-unit" value="${data.unit || "heure"}" placeholder="heure, m², forfait..."></div>
      <div><label>Prix unitaire (€)</label><input class="task-price" type="number" min="0" step="0.01" value="${data.price || 0}" oninput="updateTotals()"></div>
      <div><label>Total (€)</label><input class="task-total" type="text" value="0,00 €" readonly></div>
    </div>`;
  document.getElementById("tasksContainer").appendChild(row); updateTotals();
}

function removeTask(id) { const row=document.querySelector(`.task-row[data-id="${id}"]`); if(row) row.remove(); updateTotals(); }

function collectData() {
  const tasks=[...document.querySelectorAll(".task-row")].map(row=>({
    desc:row.querySelector(".task-desc").value.trim(),
    qty:parseFloat(row.querySelector(".task-qty").value||0),
    unit:row.querySelector(".task-unit").value.trim(),
    price:parseFloat(row.querySelector(".task-price").value||0),
    total:parseFloat(row.querySelector(".task-qty").value||0) * parseFloat(row.querySelector(".task-price").value||0)
  })).filter(t=>t.desc||t.qty||t.price);
  const subTotal=tasks.reduce((sum,t)=>sum+t.total,0);
  return {
    type:state.currentType,
    number:state.currentNumber || document.getElementById("docNumberPill").textContent.replace("N° ",""),
    date:document.getElementById("docDate").value,
    dueDate:document.getElementById("dueDate").value,
    notes:document.getElementById("notes").value.trim(),
    client:{
      name:document.getElementById("clientName").value.trim(),
      phone:document.getElementById("clientPhone").value.trim(),
      email:document.getElementById("clientEmail").value.trim(),
      address:document.getElementById("clientAddress").value.trim()
    },
    tasks, subTotal, total:subTotal
  };
}

function renderPreview() {
  updateTotals();
  const data=collectData();
  const title=data.type==="devis"?"DEVIS":"FACTURE";
  const rows=data.tasks.length ? data.tasks.map(t=>`
    <tr>
      <td>${escapeHtml(t.desc)}<br><span style="color:#777;">${escapeHtml(t.unit || "")}</span></td>
      <td>${t.qty}</td>
      <td class="right">${formatEuro(t.price)}</td>
      <td class="right">${formatEuro(t.total)}</td>
    </tr>`).join("") : '<tr><td colspan="4">Aucune prestation ajoutée.</td></tr>';
  document.getElementById("previewContent").innerHTML = `
    <div class="preview-header">
      <div>
        <div style="font-size:30px;font-weight:700;color:var(--sage-dark);">${title}</div>
        <div><strong>N° :</strong> ${escapeHtml(data.number)}</div>
        <div><strong>Date :</strong> ${escapeHtml(data.date || "")}</div>
        <div><strong>${data.type==="devis"?"Validité":"Échéance"} :</strong> ${escapeHtml(data.dueDate || "")}</div>
      </div>
      <div class="mini-logo">
        <img src="${LOGO}" alt="Logo BALLAY Créa">
        <div><strong>${COMPANY.name}</strong></div><div>${COMPANY.subtitle}</div><div>${COMPANY.owner}</div><div>${COMPANY.address1}</div><div>${COMPANY.address2}</div><div>${COMPANY.email}</div><div>${COMPANY.phone}</div><div><strong>SIRET : ${COMPANY.siret}</strong></div>
      </div>
    </div>
    <div style="margin-bottom:14px;"><strong>Destinataire</strong><br>${escapeHtml(data.client.name || "")}<br>${escapeHtml(data.client.address || "")}<br>${escapeHtml(data.client.email || "")}<br>${escapeHtml(data.client.phone || "")}</div>
    <table><thead><tr><th>Désignation</th><th>Qté</th><th class="right">PU</th><th class="right">Total</th></tr></thead><tbody>${rows}</tbody></table>
    <div style="margin-top:16px;max-width:360px;margin-left:auto;"><table><tr><td>Sous-total</td><td class="right">${formatEuro(data.subTotal)}</td></tr><tr><td><strong>Total à payer</strong></td><td class="right"><strong>${formatEuro(data.total)}</strong></td></tr></table></div>
    <div style="margin-top:18px;"><strong>Notes</strong><br>${escapeHtml(data.notes || "Aucune note.")}</div>
    <div class="legal">TVA non applicable, art. 293B du CGI</div>`;
}

function resetDocument() {
  document.getElementById("clientName").value=""; document.getElementById("clientPhone").value=""; document.getElementById("clientEmail").value=""; document.getElementById("clientAddress").value=""; document.getElementById("notes").value=""; document.getElementById("docDate").value=todayISO(); document.getElementById("dueDate").value=""; document.getElementById("tasksContainer").innerHTML=""; state.taskCounter=0; addTask(); showPanel("clientPanel");
}

async function saveCurrentToHistory() { const data=collectData(); await saveDocumentToCloud(data); alert("Document sauvegardé sur Firebase."); }

function renderHistory() {
  const c=document.getElementById("historyList"); if(!c) return;
  if(!state.history.length) { c.innerHTML="<strong>Aucun document enregistré.</strong>"; return; }
  c.innerHTML = state.history.map((item,index)=>`
    <div class="history-item">
      <div class="history-head">
        <div><strong>${item.number}</strong> — ${item.type==="devis"?"Devis":"Facture"}<br><span>${escapeHtml(item.client?.name || "Sans nom client")}</span><br><span>${escapeHtml(item.date || "")} — ${formatEuro(item.total || 0)}</span></div>
        <div class="history-actions">
          <button class="small-btn primary" onclick="loadFromHistory(${index})">Ouvrir</button>
          <button class="small-btn ghost" onclick="downloadHistoryPdf(${index})">PDF</button>
          <button class="small-btn danger" onclick="deleteHistoryItem(${index})">Supprimer</button>
        </div>
      </div>
    </div>`).join("");
}

function loadFromHistory(index) {
  const data=state.history[index]; if(!data) return;
  state.currentType=data.type || "devis"; state.currentNumber=data.number || "";
  document.getElementById("editorTitle").textContent = state.currentType==="devis"?"Créer un devis":"Créer une facture";
  document.getElementById("docNumberPill").textContent = `N° ${state.currentNumber}`;
  document.getElementById("clientName").value=data.client?.name || ""; document.getElementById("clientPhone").value=data.client?.phone || ""; document.getElementById("clientEmail").value=data.client?.email || ""; document.getElementById("clientAddress").value=data.client?.address || ""; document.getElementById("docDate").value=data.date || todayISO(); document.getElementById("dueDate").value=data.dueDate || ""; document.getElementById("notes").value=data.notes || "";
  document.getElementById("tasksContainer").innerHTML=""; state.taskCounter=0; (data.tasks || []).forEach(addTask); if(!(data.tasks || []).length) addTask();
  updateTotals(); showScreen("editorScreen"); showPanel("previewPanel"); renderPreview();
}

async function deleteHistoryItem(index) {
  const item=state.history[index]; if(!item) return;
  if(!confirm(`Supprimer ${item.number} ?`)) return;
  await deleteDocumentFromCloud(item.number);
}

function generatePdfFromData(data) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF(); const pageWidth=doc.internal.pageSize.getWidth(); let y=18;
  doc.addImage(LOGO, "PNG", pageWidth - 42, 10, 28, 28);
  doc.setFont("helvetica","bold"); doc.setFontSize(22); doc.setTextColor(138,166,133); doc.text(data.type==="devis"?"DEVIS":"FACTURE", 14, y);
  doc.setTextColor(0,0,0); doc.setFontSize(11); doc.setFont("helvetica","normal"); y+=8; doc.text(`N° : ${data.number}`,14,y); y+=6; doc.text(`Date : ${data.date || ""}`,14,y); y+=6; doc.text(`${data.type==="devis"?"Validité":"Échéance"} : ${data.dueDate || ""}`,14,y);
  doc.setFont("helvetica","bold"); doc.setFontSize(16); doc.setTextColor(138,166,133); doc.text(COMPANY.name, pageWidth - 14, 46, {align:"right"});
  doc.setFontSize(10); doc.setTextColor(189,168,117); doc.text(COMPANY.subtitle, pageWidth - 14, 52, {align:"right"});
  doc.setTextColor(0,0,0); doc.setFont("helvetica","normal"); doc.text(COMPANY.owner, pageWidth - 14, 58, {align:"right"}); doc.text(COMPANY.address1, pageWidth - 14, 64, {align:"right"}); doc.text(COMPANY.address2, pageWidth - 14, 70, {align:"right"}); doc.text(COMPANY.email, pageWidth - 14, 76, {align:"right"}); doc.text(COMPANY.phone, pageWidth - 14, 82, {align:"right"}); doc.text(`SIRET : ${COMPANY.siret}`, pageWidth - 14, 88, {align:"right"});
  y=98; doc.setDrawColor(230,220,204); doc.line(14, y, pageWidth - 14, y); y+=10; doc.setFont("helvetica","bold"); doc.setFontSize(12); doc.text("Destinataire",14,y); y+=6; doc.setFont("helvetica","normal");
  [data.client.name, data.client.address, data.client.email, data.client.phone].filter(Boolean).forEach(line=>{ doc.text(line,14,y); y+=6; });
  y+=4; doc.setFillColor(138,166,133); doc.rect(14,y,pageWidth-28,8,"F"); doc.setTextColor(255,255,255); doc.setFont("helvetica","bold"); doc.setFontSize(10); doc.text("Désignation",16,y+5.5); doc.text("Qté",120,y+5.5); doc.text("PU",145,y+5.5); doc.text("Total",178,y+5.5);
  y+=14; doc.setTextColor(0,0,0); doc.setFont("helvetica","normal");
  if(!data.tasks.length) { doc.text("Aucune prestation ajoutée.",16,y); y+=8; } else {
    data.tasks.forEach(task=>{ const lines=doc.splitTextToSize(task.desc || "",95); const rowHeight=Math.max(8, lines.length*5+2); if(y+rowHeight>265) { doc.addPage(); y=20; } doc.text(lines,16,y); doc.text(String(task.qty),120,y); doc.text(formatEuro(task.price),145,y); doc.text(formatEuro(task.total),178,y); y+=rowHeight; doc.setDrawColor(235,235,235); doc.line(14,y-2,pageWidth-14,y-2); y+=2; });
  }
  y+=6; const totalsX=130; doc.setFont("helvetica","bold"); doc.text("Sous-total :",totalsX,y); doc.text(formatEuro(data.subTotal), pageWidth - 14, y, {align:"right"}); y+=8; doc.setFontSize(12); doc.text("Total à payer :", totalsX, y); doc.text(formatEuro(data.total), pageWidth - 14, y, {align:"right"});
  y+=12; doc.setFontSize(10); doc.setFont("helvetica","bold"); doc.text("Notes :",14,y); y+=5; doc.setFont("helvetica","normal"); const noteLines=doc.splitTextToSize(data.notes || "Aucune note.",180); doc.text(noteLines,14,y);
  doc.setFontSize(9); doc.text("TVA non applicable, art. 293B du CGI",14,285); doc.setFont("helvetica","italic"); doc.text("Signature :",120,285); doc.line(145,285,195,285);
  doc.save(`${data.number}.pdf`);
}

async function generatePDF() { const data=collectData(); await saveDocumentToCloud(data); generatePdfFromData(data); }
function downloadHistoryPdf(index) { const data=state.history[index]; if(data) generatePdfFromData(data); }
function goHome() { showScreen("homeScreen"); }
async function openHistory() { showScreen("historyScreen"); renderHistory(); }
async function refreshHistory() { renderHistory(); }

async function initApp() {
  try {
    await startFirebase();
    setSyncBadge("Firebase connecté");
    state.unsubscribe = await subscribeDocuments(docs => { state.history = docs; renderHistory(); });
  } catch(err) {
    console.error(err);
    setSyncBadge("Erreur Firebase", false);
    document.getElementById("historyList").innerHTML = "<strong>Connexion Firebase impossible.</strong><br>Vérifie l'authentification anonyme et Firestore.";
  }
  updateTotals();
}

if("serviceWorker" in navigator) window.addEventListener("load", ()=>navigator.serviceWorker.register("./service-worker.js").catch(()=>{}));
window.startDocument = function(type) { state.currentType=type; state.currentNumber=getNextNumber(type); document.getElementById("editorTitle").textContent = type==="devis"?"Créer un devis":"Créer une facture"; document.getElementById("docNumberPill").textContent = `N° ${state.currentNumber}`; document.getElementById("docDate").value = todayISO(); showScreen("editorScreen"); showPanel("clientPanel"); if(!document.querySelector(".task-row")) addTask(); };
window.goHome = goHome; window.showPanel = showPanel; window.addTask = addTask; window.removeTask = removeTask; window.updateTotals = updateTotals; window.renderPreview = renderPreview; window.resetDocument = resetDocument; window.saveCurrentToHistory = saveCurrentToHistory; window.openHistory = openHistory; window.refreshHistory = refreshHistory; window.loadFromHistory = loadFromHistory; window.deleteHistoryItem = deleteHistoryItem; window.generatePDF = generatePDF; window.downloadHistoryPdf = downloadHistoryPdf;
document.addEventListener("DOMContentLoaded", initApp);
