import { useState, useEffect } from "react";

// ─── Helpers ────────────────────────────────────────────────────────────────
const today = () => new Date().toISOString().slice(0, 10);
const fmt = (n) => "₹" + Number(n).toLocaleString("en-IN");
const fmtL = (n) =>
  n >= 1e7 ? "₹" + (n / 1e7).toFixed(2) + " Cr"
  : n >= 1e5 ? "₹" + (n / 1e5).toFixed(1) + " L"
  : "₹" + Number(n).toLocaleString("en-IN");
const uid = () => Date.now() + Math.random().toString(36).slice(2, 6);

// ─── Seed Data ───────────────────────────────────────────────────────────────
const SEED_SALES = [
  { id: "s1", customer: "Rajesh Kumar", project: "Villa Block A – Unit 3", amount: 4500000, paid: 1800000, date: "2026-01-10", status: "Active", phone: "9876543210" },
  { id: "s2", customer: "Meena Sharma", project: "Commercial Plot – Sec 7", amount: 2200000, paid: 2200000, date: "2026-02-18", status: "Completed", phone: "9123456780" },
  { id: "s3", customer: "Arjun Patel", project: "Row House – Phase 2", amount: 3100000, paid: 620000, date: "2026-03-05", status: "Active", phone: "9988776655" },
  { id: "s4", customer: "Lakshmi Devi", project: "Apartment – Tower B/12", amount: 5800000, paid: 2900000, date: "2026-03-20", status: "Active", phone: "9001122334" },
];

const SEED_COLLECTIONS = [
  { id: "c1", customer: "Rajesh Kumar", amount: 900000, date: "2026-02-15", mode: "Bank Transfer", ref: "TXN-2034", saleId: "s1" },
  { id: "c2", customer: "Meena Sharma", amount: 1100000, date: "2026-02-25", mode: "Cheque", ref: "CHQ-8812", saleId: "s2" },
  { id: "c3", customer: "Arjun Patel", amount: 620000, date: "2026-03-30", mode: "UPI", ref: "UPI-9921", saleId: "s3" },
  { id: "c4", customer: "Lakshmi Devi", amount: 1450000, date: "2026-04-01", mode: "NEFT", ref: "NEFT-5510", saleId: "s4" },
];
const SEED_INVENTORY = [
  { id: "i1", item: "Cement (OPC 53)", unit: "Bags", qty: 1240, threshold: 300, cost: 380, category: "Raw Material" },
  { id: "i2", item: "Steel Rods (12mm)", unit: "MT", qty: 18, threshold: 5, cost: 58000, category: "Raw Material" },
  { id: "i3", item: "River Sand", unit: "CFT", qty: 4500, threshold: 1000, cost: 45, category: "Raw Material" },
  { id: "i4", item: "Red Bricks", unit: "Nos", qty: 32000, threshold: 5000, cost: 8, category: "Raw Material" },
  { id: "i5", item: "PVC Pipes (4\")", unit: "Mtrs", qty: 320, threshold: 100, cost: 110, category: "Plumbing" },
  { id: "i6", item: "Vitrified Tiles", unit: "Sqft", qty: 2800, threshold: 500, cost: 75, category: "Finishing" },
  { id: "i7", item: "Diesel", unit: "Ltrs", qty: 450, threshold: 100, cost: 92, category: "Fuel" },
];

const SEED_EMPLOYEES = [
  { id: "e1", name: "Suresh Kumar", role: "Site Engineer", phone: "9876500001", type: "Staff" },
  { id: "e2", name: "Ramu", role: "Mason", phone: "9876500002", type: "Labour" },
  { id: "e3", name: "Selvam", role: "Electrician", phone: "9876500003", type: "Labour" },
  { id: "e4", name: "Prakash", role: "Plumber", phone: "9876500004", type: "Labour" },
  { id: "e5", name: "Mani", role: "Helper", phone: "9876500005", type: "Labour" },
];
import { useState, useEffect } from "react";

// ─── Helpers ────────────────────────────────────────────────────────────────
const today = () => new Date().toISOString().slice(0, 10);
const fmt = (n) => "₹" + Number(n).toLocaleString("en-IN");
const fmtL = (n) =>
  n >= 1e7 ? "₹" + (n / 1e7).toFixed(2) + " Cr"
  : n >= 1e5 ? "₹" + (n / 1e5).toFixed(1) + " L"
  : "₹" + Number(n).toLocaleString("en-IN");
const uid = () => Date.now() + Math.random().toString(36).slice(2, 6);

// ─── Seed Data ───────────────────────────────────────────────────────────────
const SEED_SALES = [
  { id: "s1", customer: "Rajesh Kumar", project: "Villa Block A – Unit 3", amount: 4500000, paid: 1800000, date: "2026-01-10", status: "Active", phone: "9876543210" },
  { id: "s2", customer: "Meena Sharma", project: "Commercial Plot – Sec 7", amount: 2200000, paid: 2200000, date: "2026-02-18", status: "Completed", phone: "9123456780" },
  { id: "s3", customer: "Arjun Patel", project: "Row House – Phase 2", amount: 3100000, paid: 620000, date: "2026-03-05", status: "Active", phone: "9988776655" },
  { id: "s4", customer: "Lakshmi Devi", project: "Apartment – Tower B/12", amount: 5800000, paid: 2900000, date: "2026-03-20", status: "Active", phone: "9001122334" },
];

const SEED_COLLECTIONS = [
  { id: "c1", customer: "Rajesh Kumar", amount: 900000, date: "2026-02-15", mode: "Bank Transfer", ref: "TXN-2034", saleId: "s1" },
  { id: "c2", customer: "Meena Sharma", amount: 1100000, date: "2026-02-25", mode: "Cheque", ref: "CHQ-8812", saleId: "s2" },
  { id: "c3", customer: "Arjun Patel", amount: 620000, date: "2026-03-30", mode: "UPI", ref: "UPI-9921", saleId: "s3" },
  { id: "c4", customer: "Lakshmi Devi", amount: 1450000, date: "2026-04-01", mode: "NEFT", ref: "NEFT-5510", saleId: "s4" },
];

const SEED_INVENTORY = [
  { id: "i1", item: "Cement (OPC 53)", unit: "Bags", qty: 1240, threshold: 300, cost: 380, category: "Raw Material" },
  { id: "i2", item: "Steel Rods (12mm)", unit: "MT", qty: 18, threshold: 5, cost: 58000, category: "Raw Material" },
  { id: "i3", item: "River Sand", unit: "CFT", qty: 4500, threshold: 1000, cost: 45, category: "Raw Material" },
  { id: "i4", item: "Red Bricks", unit: "Nos", qty: 32000, threshold: 5000, cost: 8, category: "Raw Material" },
  { id: "i5", item: "PVC Pipes (4\")", unit: "Mtrs", qty: 320, threshold: 100, cost: 110, category: "Plumbing" },
  { id: "i6", item: "Vitrified Tiles", unit: "Sqft", qty: 2800, threshold: 500, cost: 75, category: "Finishing" },
  { id: "i7", item: "Diesel", unit: "Ltrs", qty: 450, threshold: 100, cost: 92, category: "Fuel" },
];

const SEED_EMPLOYEES = [
  { id: "e1", name: "Suresh Kumar", role: "Site Engineer", phone: "9876500001", type: "Staff" },
  { id: "e2", name: "Ramu", role: "Mason", phone: "9876500002", type: "Labour" },
  { id: "e3", name: "Selvam", role: "Electrician", phone: "9876500003", type: "Labour" },
  { id: "e4", name: "Prakash", role: "Plumber", phone: "9876500004", type: "Labour" },
  { id: "e5", name: "Mani", role: "Helper", phone: "9876500005", type: "Labour" },
];

const SEED_VEHICLES = [
  { id: "v1", name: "JCB 3DX", regNo: "TN-01-AB-1234", type: "JCB", operator: "Karthik" },
  { id: "v2", name: "Hitachi ZX200", regNo: "TN-02-CD-5678", type: "Excavator", operator: "Murugan" },
  { id: "v3", name: "TATA Tipper", regNo: "TN-03-EF-9012", type: "Tipper", operator: "Balu" },
  { id: "v4", name: "Concrete Mixer", regNo: "TN-04-GH-3456", type: "Mixer", operator: "Senthil" },
];

const SEED_EMP_ATT = [
  { id: "ea1", employeeId: "e1", date: today(), status: "Present", inTime: "08:00", outTime: "17:00", wages: 1200 },
  { id: "ea2", employeeId: "e2", date: today(), status: "Present", inTime: "07:30", outTime: "17:30", wages: 650 },
  { id: "ea3", employeeId: "e3", date: today(), status: "Absent", inTime: "", outTime: "", wages: 0 },
];

const SEED_VEH_ATT = [
  { id: "va1", vehicleId: "v1", date: today(), status: "Active", startHr: "07:00", endHr: "17:00", hours: 10, fuelUsed: 45, site: "Villa Block A" },
  { id: "va2", vehicleId: "v2", date: today(), status: "Active", startHr: "08:00", endHr: "16:00", hours: 8, fuelUsed: 38, site: "Phase 2" },
  { id: "va3", vehicleId: "v3", date: today(), status: "Idle", startHr: "", endHr: "", hours: 0, fuelUsed: 0, site: "" },
];

// ─── TABS ────────────────────────────────────────────────────────────────────
const TABS = [
  { id: "dashboard", label: "Dashboard", icon: "⬛" },
  { id: "sales", label: "Sales", icon: "📋" },
  { id: "collections", label: "Collections", icon: "💰" },
  { id: "inventory", label: "Inventory", icon: "📦" },
  { id: "employees", label: "Employees", icon: "👷" },
  { id: "vehicles", label: "Vehicles", icon: "🚧" },
];

// ─── STATUS COLORS ───────────────────────────────────────────────────────────
const statusColor = {
  Active: { bg: "rgba(251,191,36,0.12)", color: "#fbbf24" },
  Completed: { bg: "rgba(34,197,94,0.12)", color: "#22c55e" },
  Present: { bg: "rgba(34,197,94,0.12)", color: "#22c55e" },
  Absent: { bg: "rgba(239,68,68,0.12)", color: "#ef4444" },
  "Half Day": { bg: "rgba(251,191,36,0.12)", color: "#fbbf24" },
  Idle: { bg: "rgba(107,114,128,0.15)", color: "#9ca3af" },
  Maintenance: { bg: "rgba(239,68,68,0.12)", color: "#ef4444" },
  "On Leave": { bg: "rgba(168,85,247,0.12)", color: "#a855f7" },
};

// ═══════════════════════════════════════════════════════════════════════════════
export default function ShasthaInfracon() {
  const [tab, setTab] = useState("dashboard");
  const [sales, setSales] = useState(SEED_SALES);
  const [collections, setCollections] = useState(SEED_COLLECTIONS);
  const [inventory, setInventory] = useState(SEED_INVENTORY);
  const [employees, setEmployees] = useState(SEED_EMPLOYEES);
  const [vehicles, setVehicles] = useState(SEED_VEHICLES);
  const [empAtt, setEmpAtt] = useState(SEED_EMP_ATT);
  const [vehAtt, setVehAtt] = useState(SEED_VEH_ATT);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const [toast, setToast] = useState(null);
  const [attDate, setAttDate] = useState(today());

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };
  const openModal = (type, data = {}) => { setModal(type); setForm(data); };
  const closeModal = () => { setModal(null); setForm({}); };
  const setF = (k, v) => setForm(p => ({ ...p, [k]: v }));

  // ── KPIs
  const totalSales = sales.reduce((a, x) => a + x.amount, 0);
  const totalCollected = collections.reduce((a, x) => a + x.amount, 0);
  const totalPending = sales.reduce((a, x) => a + (x.amount - x.paid), 0);
  const invValue = inventory.reduce((a, i) => a + i.qty * i.cost, 0);
  const lowStock = inventory.filter(i => i.qty <= i.threshold);
  const presentToday = empAtt.filter(a => a.date === today() && a.status === "Present").length;
  const activeVehicles = vehAtt.filter(a => a.date === today() && a.status === "Active").length;

  // ── ACTIONS
  const saveSale = () => {
    if (!form.customer || !form.project || !form.amount) return showToast("Fill required fields", "error");
    if (form.id) {
      setSales(p => p.map(s => s.id === form.id ? { ...s, ...form, amount: +form.amount, paid: +form.paid } : s));
      showToast("Sale updated!");
    } else {
      setSales(p => [{ ...form, id: uid(), amount: +form.amount, paid: +(form.paid || 0), date: form.date || today(), status: "Active" }, ...p]);
      showToast("Sale added!");
    }
    closeModal();
  };

  const saveCollection = () => {
    if (!form.customer || !form.amount) return showToast("Fill required fields", "error");
    const amt = +form.amount;
    setCollections(p => [{ ...form, id: uid(), amount: amt, date: form.date || today() }, ...p]);
    setSales(p => p.map(s => s.customer === form.customer ? { ...s, paid: Math.min(s.amount, s.paid + amt) } : s));
    showToast("Payment recorded!");
    closeModal();
  };

  const saveInventory = () => {
    if (!form.item || !form.qty) return showToast("Fill required fields", "error");
    if (form.id) {
      setInventory(p => p.map(i => i.id === form.id ? { ...i, ...form, qty: +form.qty, cost: +form.cost, threshold: +form.threshold } : i));
      showToast("Item updated!");
    } else {
      setInventory(p => [...p, { ...form, id: uid(), qty: +form.qty, cost: +(form.cost || 0), threshold: +(form.threshold || 50) }]);
      showToast("Item added!");
    }
    closeModal();
  };

  const useStock = () => {
    if (!form.itemId || !form.useQty) return;
    setInventory(p => p.map(i => i.id === form.itemId ? { ...i, qty: Math.max(0, i.qty - +form.useQty) } : i));
    showToast("Stock usage recorded!", "info");
    closeModal();
  };

  const saveEmployee = () => {
    if (!form.name || !form.role) return showToast("Fill required fields", "error");
    if (form.id) {
      setEmployees(p => p.map(e => e.id === form.id ? { ...e, ...form } : e));
      showToast("Employee updated!");
    } else {
      setEmployees(p => [...p, { ...form, id: uid() }]);
      showToast("Employee added!");
    }
    closeModal();
  };

  const saveVehicle = () => {
    if (!form.name || !form.type) return showToast("Fill required fields", "error");
    if (form.id) {
      setVehicles(p => p.map(v => v.id === form.id ? { ...v, ...form } : v));
      showToast("Vehicle updated!");
    } else {
      setVehicles(p => [...p, { ...form, id: uid() }]);
      showToast("Vehicle added!");
    }
    closeModal();
    const markEmpAtt = (empId, status) => {
    const existing = empAtt.find(a => a.employeeId === empId && a.date === attDate);
    const emp = employees.find(e => e.id === empId);
    const wages = status === "Present" ? (emp?.type === "Staff" ? 1200 : 650) : status === "Half Day" ? (emp?.type === "Staff" ? 600 : 325) : 0;
    if (existing) {
      setEmpAtt(p => p.map(a => a.id === existing.id ? { ...a, status, wages } : a));
    } else {
      setEmpAtt(p => [...p, { id: uid(), employeeId: empId, date: attDate, status, inTime: "08:00", outTime: "17:00", wages }]);
    }
    showToast(Marked ${status}, "info");
  };

  const markVehAtt = (vehId, status) => {
    const existing = vehAtt.find(a => a.vehicleId === vehId && a.date === attDate);
    if (existing) {
      setVehAtt(p => p.map(a => a.id === existing.id ? { ...a, status } : a));
    } else {
      setVehAtt(p => [...p, { id: uid(), vehicleId: vehId, date: attDate, status, startHr: "07:00", endHr: "17:00", hours: 10, fuelUsed: 0, site: "" }]);
    }
    showToast(Vehicle ${status}, "info");
  };

  const getEmpStatus = (empId) => empAtt.find(a => a.employeeId === empId && a.date === attDate)?.status || "—";
  const getVehStatus = (vehId) => vehAtt.find(a => a.vehicleId === vehId && a.date === attDate)?.status || "—";

  // ── Summary for attendance date
  const dayEmpAtt = empAtt.filter(a => a.date === attDate);
  const dayVehAtt = vehAtt.filter(a => a.date === attDate);

  return (
    <div style={{ fontFamily: "'Barlow', sans-serif", minHeight: "100vh", background: "#080c14", color: "#dde3f0" }}>
      <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@300;400;500;600;700;800;900&family=Barlow+Condensed:wght@600;700;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet" />

      <style>{`
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:5px;}
        ::-webkit-scrollbar-track{background:#0d1220;}
        ::-webkit-scrollbar-thumb{background:#f59e0b;border-radius:3px;}
        .inp{background:#0d1523!important;color:#dde3f0!important;border:1px solid #1e2d45!important;border-radius:8px!important;padding:10px 14px!important;font-family:Barlow!important;font-size:13px!important;width:100%;outline:none!important;transition:border-color .2s!important;}
        .inp:focus{border-color:#f59e0b!important;box-shadow:0 0 0 3px rgba(245,158,11,.12)!important;}
        .inp::placeholder{color:#3d5070!important;}
        select.inp option{background:#0d1523;}
        .btn{cursor:pointer;border:none;border-radius:8px;font-family:Barlow;font-size:13px;font-weight:700;padding:10px 20px;transition:all .18s;letter-spacing:.3px;}
        .btn-amber{background:linear-gradient(135deg,#f59e0b,#d97706);color:#000;}
        .btn-amber:hover{transform:translateY(-1px);box-shadow:0 4px 18px rgba(245,158,11,.4);}
        .btn-outline{background:transparent;color:#f59e0b;border:1px solid #f59e0b!important;}
        .btn-outline:hover{background:rgba(245,158,11,.08);}
        .btn-ghost{background:#0d1523;color:#7a90b0;border:1px solid #1e2d45!important;}
        .btn-ghost:hover{background:#111b2e;}
        .btn-sm{padding:6px 14px;font-size:12px;}
        .btn-danger{background:rgba(239,68,68,.12);color:#ef4444;border:1px solid rgba(239,68,68,.25)!important;}
        .btn-danger:hover{background:rgba(239,68,68,.2);}
        .btn-green{background:rgba(34,197,94,.12);color:#22c55e;border:1px solid rgba(34,197,94,.25)!important;}
        .btn-green:hover{background:rgba(34,197,94,.2);}
        .btn-yellow{background:rgba(251,191,36,.1);color:#fbbf24;border:1px solid rgba(251,191,36,.25)!important;}
        .btn-yellow:hover{background:rgba(251,191,36,.18);}
        .card{background:#0b1628;border:1px solid #162035;border-radius:16px;padding:20px;}
        .badge{display:inline-block;padding:3px 11px;border-radius:20px;font-size:11px;font-weight:700;letter-spacing:.3px;}
        .trow{padding:13px 16px;border-bottom:1px solid #101d30;transition:background .12s;display:grid;align-items:center;}
        .trow:hover{background:#0d1a2e;}
        .overlay{position:fixed;inset:0;background:rgba(0,0,0,.75);backdrop-filter:blur(6px);z-index:200;display:flex;align-items:center;justify-content:center;padding:16px;}
        .modal{background:#0b1628;border:1px solid #1e2d45;border-radius:20px;padding:28px;width:100%;max-width:460px;max-height:90vh;overflow-y:auto;}
        .modal h3{font-size:17px;font-weight:800;margin-bottom:20px;color:#f59e0b;}
        .field{margin-bottom:14px;}
        .field label{display:block;font-size:11px;font-weight:700;color:#5a7090;margin-bottom:6px;letter-spacing:.5px;text-transform:uppercase;}
        .progress{height:5px;background:#0d1523;border-radius:3px;overflow:hidden;}
        .progress-fill{height:100%;border-radius:3px;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px);}to{opacity:1;transform:translateY(0);}}
        @keyframes toastIn{from{opacity:0;transform:translateX(60px);}to{opacity:1;transform:translateX(0);}}
        .anim{animation:fadeUp .35s ease forwards;}
        .tab-btn{cursor:pointer;display:flex;align-items:center;gap:8px;padding:10px 18px;border-radius:10px;font-size:13px;font-weight:700;border:none;transition:all .18s;font-family:Barlow;letter-spacing:.3px;white-space:nowrap;}
        .kpi-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:14px;margin-bottom:24px;}
        .section-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:18px;}
        .section-header h2{font-family:'Barlow Condensed',sans-serif;font-size:22px;font-weight:800;letter-spacing:.5px;}
        .att-btn-group{display:flex;gap:6px;}
        .chip{display:inline-flex;align-items:center;gap:5px;padding:4px 11px;border-radius:20px;font-size:11px;font-weight:700;}
      `}</style>

      {/* Toast */}
      {toast && (
        <div style={{ position: "fixed", top: 18, right: 18, zIndex: 999, background: toast.type === "error" ? "#7f1d1d" : toast.type === "info" ? "#1e3a5f" : "#14532d", color: "white", padding: "12px 20px", borderRadius: 12, fontWeight: 700, fontSize: 13, animation: "toastIn .3s ease", boxShadow: "0 8px 32px rgba(0,0,0,.5)", border: 1px solid ${toast.type === "error" ? "#ef4444" : toast.type === "info" ? "#3b82f6" : "#22c55e"} }}>
          {toast.type === "error" ? "❌" : toast.type === "info" ? "ℹ️" : "✅"} {toast.msg}
        </div>
      )}

      {/* Header */}
      <div style={{ background: "#060a12", borderBottom: "1px solid #111e32", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1300, margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 58 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ background: "linear-gradient(135deg,#f59e0b,#92400e)", borderRadius: 10, width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🏗</div>
            <div>
              <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 18, fontWeight: 900, color: "#f59e0b", letterSpacing: 1 }}>SHASTHA INFRACON</div>
              <div style={{ fontSize: 9, color: "#3d5070", letterSpacing: 2, textTransform: "uppercase" }}>Construction Management System</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 4, overflowX: "auto" }}>
            {TABS.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} className="tab-btn"
                style={{ background: tab === t.id ? "rgba(245,158,11,.12)" : "transparent", color: tab === t.id ? "#f59e0b" : "#4a6380", border: tab === t.id ? "1px solid rgba(245,158,11,.3)" : "1px solid transparent" }}>
                <span>{t.icon}</span>{t.label}
              </button>
            ))}
          </div>
          <div style={{ fontFamily: "JetBrains Mono", fontSize: 11, color: "#3d5070" }}>{new Date().toLocaleDateString("en-IN", { weekday: "short", day: "2-digit", month: "short", year: "numeric" })}</div>
        </div>
      </div>

      <div style={{ maxWidth: 1300, margin: "0 auto", padding: "24px 20px" }}>

        {/* ═══ DASHBOARD ═══════════════════════════════════════════════════════ */}
        {tab === "dashboard" && (
          <div className="anim">
            <div style={{ marginBottom: 22 }}>
              <h1 style={{ fontFamily: "'Barlow Condensed'", fontSize: 28, fontWeight: 900, letterSpacing: 1 }}>Business Overview</h1>
              <p style={{ color: "#3d5070", fontSize: 13, marginTop: 4 }}>All key metrics for Shastha Infracon at a glance</p>
            </div>
            <div className="kpi-grid">
              {[
                { label: "Total Sales Value", val: fmtL(totalSales), sub: ${sales.length} projects, icon: "📊", c: "#3b82f6" },
                { label: "Amount Collected", val: fmtL(totalCollected), sub: ${Math.round(totalCollected / totalSales * 100)}% recovered, icon: "💰", c: "#22c55e" },
                { label: "Pending Receivables", val: fmtL(totalPending), sub: "Outstanding balance", icon: "⏳", c: "#f59e0b" },
                { label: "Inventory Value", val: fmtL(invValue), sub: ${lowStock.length} low stock alerts, icon: "📦", c: "#a855f7" },
                { label: "Staff Present Today", val: ${presentToday} / ${employees.length}, sub: "Attendance today", icon: "👷", c: "#06b6d4" },
                { label: "Active Vehicles", val: ${activeVehicles} / ${vehicles.length}, sub: "On-site today", icon: "🚧", c: "#f97316" },
              ].map((k, i) => (
                <div key={i} className="card" style={{ animationDelay: ${i * .07}s, position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: -16, right: -16, width: 72, height: 72, background: radial-gradient(circle,${k.c}25,transparent 70%), borderRadius: "50%" }} />
                  <div style={{ fontSize: 22, marginBottom: 8 }}>{k.icon}</div>
                  <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 26, fontWeight: 800, color: k.c }}>{k.val}</div>
                  <div style={{ fontSize: 12, color: "#9aabb8", marginTop: 2, fontWeight: 600 }}>{k.label}</div>
                  <div style={{ fontSize: 11, color: "#3d5070", marginTop: 3 }}>{k.sub}</div>
                </div>
              ))}
            </div>

            {/* Recent Sales + Low Stock */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
              <div className="card">
                <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 16, fontWeight: 800, marginBottom: 14, color: "#f59e0b" }}>RECENT SALES</div>
                {sales.slice(0, 4).map(s => {
                  const pct = Math.round(s.paid / s.amount * 100);
                  return (
                    <div key={s.id} style={{ marginBottom: 14 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                        <div style={{ fontSize: 13, fontWeight: 700 }}>{s.customer}</div>
                        <span className="badge" style={{ background: statusColor[s.status]?.bg, color: statusColor[s.status]?.color }}>{s.status}</span>
                      </div>
                      <div style={{ fontSize: 11, color: "#3d5070", marginBottom: 5 }}>{s.project}</div>
                      <div className="progress"><div className="progress-fill" style={{ width: ${pct}%, background: pct === 100 ? "#22c55e" : "#f59e0b" }} /></div>
                      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4, fontSize: 11, color: "#5a7090" }}>
                        <span>Collected: {fmt(s.paid)}</span><span>{pct}% paid</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="card">
                <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 16, fontWeight: 800, marginBottom: 14, color: "#ef4444" }}>⚠ LOW STOCK ALERTS</div>
                {lowStock.length === 0 && <div style={{ color: "#3d5070", fontSize: 13 }}>All items adequately stocked ✅</div>}
                {lowStock.map(i => (
                  <div key={i.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #0d1a2e" }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700 }}>{i.item}</div>
                      <div style={{ fontSize: 11, color: "#3d5070" }}>Min: {i.threshold} {i.unit}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ color: "#ef4444", fontWeight: 800, fontSize: 15 }}>{i.qty}</div>
                      <div style={{ fontSize: 10, color: "#3d5070" }}>{i.unit}</div>
                    </div>
                  </div>
                ))}
                <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {[
                    { label: "Present Today", val: dayEmpAtt.filter(a => a.status === "Present").length, c: "#22c55e" },
                    { label: "Absent Today", val: dayEmpAtt.filter(a => a.status === "Absent").length, c: "#ef4444" },
                    { label: "Vehicles Active", val: dayVehAtt.filter(a => a.status === "Active").length, c: "#f59e0b" },
                    { label: "Vehicles Idle", val: dayVehAtt.filter(a => a.status === "Idle").length, c: "#6b7280" },
                  ].map((s, i) => (
                    <div key={i} style={{ background: "#0d1523", borderRadius: 10, padding: "10px 14px" }}>
                      <div style={{ fontSize: 20, fontWeight: 800, color: s.c }}>{s.val}</div>
                      <div style={{ fontSize: 11, color: "#3d5070" }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═══ SALES ══════════════════════════════════════════════════════════ */}
        {tab === "sales" && (
          <div className="anim">
            <div className="section-header">
              <h2>Sales Management</h2>
              <button className="btn btn-amber" onClick={() => openModal("addSale")}>+ Add Sale</button>
            </div>
            {/* Summary Strip */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 20 }}>
              {[
                { label: "Total Sales", val: fmtL(totalSales), c: "#3b82f6" },
                { label: "Collected", val: fmtL(totalCollected), c: "#22c55e" },
                { label: "Pending", val: fmtL(totalPending), c: "#f59e0b" },
              ].map((k, i) => (
                <div key={i} className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 20px" }}>
                  <div style={{ fontSize: 12, color: "#5a7090", fontWeight: 700 }}>{k.label}</div>
                  <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 22, fontWeight: 800, color: k.c }}>{k.val}</div>
                </div>
              ))}
            </div>
            <div className="card" style={{ padding: 0, overflow: "hidden" }}>
              <div className="trow" style={{ gridTemplateColumns: "2fr 2fr 1.2fr 1.2fr 1fr 80px", background: "#070d1a", borderBottom: "1px solid #162035" }}>
                {["Customer", "Project", "Sale Value", "Collected", "Status", "Action"].map(h => (
                  <div key={h} style={{ fontSize: 10, fontWeight: 800, color: "#3d5070", letterSpacing: 1, textTransform: "uppercase" }}>{h}</div>
                ))}
              </div>
              {sales.map(s => {
                const pct = Math.round(s.paid / s.amount * 100);
                return (
                  <div key={s.id} className="trow" style={{ gridTemplateColumns: "2fr 2fr 1.2fr 1.2fr 1fr 80px" }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 13 }}>{s.customer}</div>
                      <div style={{ fontSize: 11, color: "#3d5070" }}>{s.phone}</div>
                    </div>
                    <div style={{ fontSize: 12, color: "#9aabb8" }}>{s.project}</div>
                    <div style={{ fontFamily: "JetBrains Mono", fontSize: 13, fontWeight: 600 }}>{fmt(s.amount)}</div>
                    <div>
                      <div style={{ fontFamily: "JetBrains Mono", fontSize: 13, fontWeight: 600, color: "#22c55e" }}>{fmt(s.paid)}</div>
                      <div className="progress" style={{ marginTop: 4 }}>
                        <div className="progress-fill" style={{ width: ${pct}%, background: pct === 100 ? "#22c55e" : "#f59e0b" }} />
                      </div>
                    </div>
                    <span className="badge" style={{ background: statusColor[s.status]?.bg, color: statusColor[s.status]?.color }}>{s.status}</span>
                    <button className="btn btn-ghost btn-sm" onClick={() => openModal("addSale", { ...s })}>Edit</button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ═══ COLLECTIONS ════════════════════════════════════════════════════ */}
        {tab === "collections" && (
          <div className="anim">
            <div className="section-header">
              <h2>Payment Collections</h2>
              <button className="btn btn-amber" onClick={() => openModal("addCollection")}>+ Record Payment</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 20 }}>
              {[
                { label: "Total Collected", val: fmtL(totalCollected), c: "#22c55e" },
                { label: "This Month", val: fmtL(collections.filter(c => c.date.startsWith("2026-04")).reduce((a, x) => a + x.amount, 0)), c: "#3b82f6" },
                { label: "Transactions", val: collections.length, c: "#a855f7" },
              ].map((k, i) => (
                <div key={i} className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 20px" }}>
                  <div style={{ fontSize: 12, color: "#5a7090", fontWeight: 700 }}>{k.label}</div>
                  <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 22, fontWeight: 800, color: k.c }}>{k.val}</div>
                </div>
              ))}
            </div>
            <div className="card" style={{ padding: 0, overflow: "hidden" }}>
              <div className="trow" style={{ gridTemplateColumns: "2fr 1.5fr 1.5fr 1.2fr 1.5fr", background: "#070d1a", borderBottom: "1px solid #162035" }}>
                {["Customer", "Amount", "Date", "Mode", "Reference"].map(h => (
                  <div key={h} style={{ fontSize: 10, fontWeight: 800, color: "#3d5070", letterSpacing: 1, textTransform: "uppercase" }}>{h}</div>
                ))}
              </div>
              {collections.map(c => (
                <div key={c.id} className="trow" style={{ gridTemplateColumns: "2fr 1.5fr 1.5fr 1.2fr 1.5fr" }}>
                  <div style={{ fontWeight: 700, fontSize: 13 }}>{c.customer}</div>
                  <div style={{ fontFamily: "JetBrains Mono", fontSize: 14, fontWeight: 700, color: "#22c55e" }}>{fmt(c.amount)}</div>
                  <div style={{ fontSize: 12, color: "#9aabb8" }}>{c.date}</div>
                  <span className="badge" style={{ background: "rgba(59,130,246,.1)", color: "#3b82f6" }}>{c.mode}</span>
                  <div style={{ fontFamily: "JetBrains Mono", fontSize: 11, color: "#4a6380" }}>{c.ref}</div>
                </div>
              ))}
            </div>
          </div>
        )}
{/* ═══ INVENTORY ══════════════════════════════════════════════════════ */}
        {tab === "inventory" && (
          <div className="anim">
            <div className="section-header">
              <h2>Inventory Management</h2>
              <div style={{ display: "flex", gap: 10 }}>
                <button className="btn btn-outline btn-sm" onClick={() => openModal("useStock")}>Use Stock</button>
                <button className="btn btn-amber" onClick={() => openModal("addInventory")}>+ Add Item</button>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 20 }}>
              {[
                { label: "Inventory Value", val: fmtL(invValue), c: "#a855f7" },
                { label: "Total Items", val: inventory.length, c: "#3b82f6" },
                { label: "Low Stock", val: lowStock.length, c: "#ef4444" },
              ].map((k, i) => (
                <div key={i} className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 20px" }}>
                  <div style={{ fontSize: 12, color: "#5a7090", fontWeight: 700 }}>{k.label}</div>
                  <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 22, fontWeight: 800, color: k.c }}>{k.val}</div>
                </div>
              ))}
            </div>
            <div className="card" style={{ padding: 0, overflow: "hidden" }}>
              <div className="trow" style={{ gridTemplateColumns: "2.5fr 1fr 1fr 1fr 1fr 1fr 80px", background: "#070d1a", borderBottom: "1px solid #162035" }}>
                {["Item", "Category", "Qty", "Unit", "Rate", "Value", "Action"].map(h => (
                  <div key={h} style={{ fontSize: 10, fontWeight: 800, color: "#3d5070", letterSpacing: 1, textTransform: "uppercase" }}>{h}</div>
                ))}
              </div>
              {inventory.map(i => {
                const isLow = i.qty <= i.threshold;
                return (
                  <div key={i.id} className="trow" style={{ gridTemplateColumns: "2.5fr 1fr 1fr 1fr 1fr 1fr 80px" }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 13 }}>{i.item}</div>
                      {isLow && <span style={{ fontSize: 10, color: "#ef4444", fontWeight: 700 }}>⚠ Low Stock</span>}
                    </div>
                    <span className="badge" style={{ background: "rgba(168,85,247,.1)", color: "#a855f7", fontSize: 10 }}>{i.category}</span>
                    <div style={{ fontFamily: "JetBrains Mono", fontWeight: 700, color: isLow ? "#ef4444" : "#dde3f0" }}>{i.qty}</div>
                    <div style={{ fontSize: 12, color: "#5a7090" }}>{i.unit}</div>
                    <div style={{ fontFamily: "JetBrains Mono", fontSize: 12 }}>{fmt(i.cost)}</div>
                    <div style={{ fontFamily: "JetBrains Mono", fontSize: 12, color: "#a855f7" }}>{fmtL(i.qty * i.cost)}</div>
                    <button className="btn btn-ghost btn-sm" onClick={() => openModal("addInventory", { ...i })}>Edit</button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ═══ EMPLOYEES ══════════════════════════════════════════════════════ */}
        {tab === "employees" && (
          <div className="anim">
            <div className="section-header">
              <h2>Employee Attendance</h2>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <input type="date" className="inp" value={attDate} onChange={e => setAttDate(e.target.value)} style={{ width: 155, padding: "8px 12px" }} />
                <button className="btn btn-amber" onClick={() => openModal("addEmployee")}>+ Add Employee</button>
              </div>
            </div>
            {/* Day Summary */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 20 }}>
              {[
                { label: "Present", val: dayEmpAtt.filter(a => a.status === "Present").length, c: "#22c55e" },
                { label: "Absent", val: dayEmpAtt.filter(a => a.status === "Absent").length, c: "#ef4444" },
                { label: "Half Day", val: dayEmpAtt.filter(a => a.status === "Half Day").length, c: "#fbbf24" },
                { label: "Wages Today", val: fmt(dayEmpAtt.reduce((a, x) => a + (x.wages || 0), 0)), c: "#06b6d4" },
              ].map((k, i) => (
                <div key={i} className="card" style={{ padding: "12px 16px" }}>
                  <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 24, fontWeight: 800, color: k.c }}>{k.val}</div>
                  <div style={{ fontSize: 11, color: "#3d5070", fontWeight: 700 }}>{k.label}</div>
                </div>
              ))}
            </div>
            <div className="card" style={{ padding: 0, overflow: "hidden" }}>
              <div className="trow" style={{ gridTemplateColumns: "2fr 1.5fr 1.2fr 1.2fr 1fr", background: "#070d1a", borderBottom: "1px solid #162035" }}>
                {["Employee", "Role / Type", "Status", "Wages", "Mark Attendance"].map(h => (
                  <div key={h} style={{ fontSize: 10, fontWeight: 800, color: "#3d5070", letterSpacing: 1, textTransform: "uppercase" }}>{h}</div>
                ))}
              </div>
              {employees.map(e => {
                const status = getEmpStatus(e.id);
                const attRec = empAtt.find(a => a.employeeId === e.id && a.date === attDate);
                return (
                  <div key={e.id} className="trow" style={{ gridTemplateColumns: "2fr 1.5fr 1.2fr 1.2fr 1fr" }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 13 }}>{e.name}</div>
                      <div style={{ fontSize: 11, color: "#3d5070" }}>{e.phone}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600 }}>{e.role}</div>
                      <span className="badge" style={{ background: e.type === "Staff" ? "rgba(59,130,246,.1)" : "rgba(245,158,11,.1)", color: e.type === "Staff" ? "#3b82f6" : "#f59e0b", fontSize: 10 }}>{e.type}</span>
                    </div>
                    <span className="badge" style={{ background: statusColor[status]?.bg || "rgba(55,65,81,.2)", color: statusColor[status]?.color || "#6b7280" }}>{status}</span>
                    <div style={{ fontFamily: "JetBrains Mono", fontSize: 13, color: "#22c55e" }}>{attRec ? fmt(attRec.wages) : "—"}</div>
                    <div className="att-btn-group">
                      <button className="btn btn-green btn-sm" onClick={() => markEmpAtt(e.id, "Present")} title="Present">P</button>
                      <button className="btn btn-danger btn-sm" onClick={() => markEmpAtt(e.id, "Absent")} title="Absent">A</button>
                      <button className="btn btn-yellow btn-sm" onClick={() => markEmpAtt(e.id, "Half Day")} title="Half Day">H</button>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Attendance History */}
            <div style={{ marginTop: 24 }}>
              <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 18, fontWeight: 800, marginBottom: 14 }}>Attendance History</div>
              <div className="card" style={{ padding: 0, overflow: "hidden" }}>
                <div className="trow" style={{ gridTemplateColumns: "2fr 1.5fr 1fr 1fr 1fr", background: "#070d1a", borderBottom: "1px solid #162035" }}>
                  {["Employee", "Date", "Status", "In Time", "Wages"].map(h => (
                    <div key={h} style={{ fontSize: 10, fontWeight: 800, color: "#3d5070", letterSpacing: 1, textTransform: "uppercase" }}>{h}</div>
                  ))}
                </div>
                {[...empAtt].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 15).map(a => {
                  const emp = employees.find(e => e.id === a.employeeId);
                  return (
                    <div key={a.id} className="trow" style={{ gridTemplateColumns: "2fr 1.5fr 1fr 1fr 1fr" }}>
                      <div style={{ fontWeight: 600, fontSize: 13 }}>{emp?.name || "—"}</div>
                      <div style={{ fontSize: 12, color: "#5a7090" }}>{a.date}</div>
                      <span className="badge" style={{ background: statusColor[a.status]?.bg, color: statusColor[a.status]?.color }}>{a.status}</span>
                      <div style={{ fontFamily: "JetBrains Mono", fontSize: 12, color: "#5a7090" }}>{a.inTime || "—"}</div>
                      <div style={{ fontFamily: "JetBrains Mono", fontSize: 13, color: "#22c55e" }}>{a.wages ? fmt(a.wages) : "—"}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ═══ VEHICLES ═══════════════════════════════════════════════════════ */}
        {tab === "vehicles" && (
          <div className="anim">
            <div className="section-header">
              <h2>Vehicle & Operator Attendance</h2>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <input type="date" className="inp" value={attDate} onChange={e => setAttDate(e.target.value)} style={{ width: 155, padding: "8px 12px" }} />
                <button className="btn btn-amber" onClick={() => openModal("addVehicle")}>+ Add Vehicle</button>
              </div>
            </div>
            {/* Day Summary */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 20 }}>
              {[
                { label: "Active", val: dayVehAtt.filter(a => a.status === "Active").length, c: "#22c55e" },
                { label: "Idle", val: dayVehAtt.filter(a => a.status === "Idle").length, c: "#6b7280" },
                { label: "In Maintenance", val: dayVehAtt.filter(a => a.status === "Maintenance").length, c: "#ef4444" },
                { label: "Total Hours Logged", val: dayVehAtt.reduce((a, x) => a + (x.hours || 0), 0) + " hrs", c: "#f59e0b" },
              ].map((k, i) => (
                <div key={i} className="card" style={{ padding: "12px 16px" }}>
                  <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 24, fontWeight: 800, color: k.c }}>{k.val}</div>
                  <div style={{ fontSize: 11, color: "#3d5070", fontWeight: 700 }}>{k.label}</div>
                </div>
              ))}
            </div>

            {/* Vehicle Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 16, marginBottom: 24 }}>
              {vehicles.map(v => {
                const status = getVehStatus(v.id);
                const attRec = vehAtt.find(a => a.vehicleId === v.id && a.date === attDate);
                const vIcon = v.type === "JCB" ? "🚜" : v.type === "Excavator" ? "⛏" : v.type === "Tipper" ? "🚛" : "🔩";
                return (
                  <div key={v.id} className="card" style={{ borderColor: status === "Active" ? "rgba(34,197,94,.25)" : status === "Maintenance" ? "rgba(239,68,68,.25)" : "#162035" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                        <div style={{ fontSize: 28 }}>{vIcon}</div>
                        <div>
                          <div style={{ fontWeight: 800, fontSize: 15 }}>{v.name}</div>
                          <div style={{ fontSize: 11, color: "#3d5070" }}>{v.regNo}</div>
                        </div>
                      </div>
                      <span className="badge" style={{ background: statusColor[status]?.bg || "rgba(55,65,81,.2)", color: statusColor[status]?.color || "#6b7280" }}>{status}</span>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 14 }}>
                      <div style={{ background: "#0d1523", borderRadius: 8, padding: "8px 12px" }}>
                        <div style={{ fontSize: 10, color: "#3d5070", fontWeight: 700 }}>OPERATOR</div>
                        <div style={{ fontSize: 13, fontWeight: 700, marginTop: 2 }}>{v.operator}</div>
                      </div>
                      <div style={{ background: "#0d1523", borderRadius: 8, padding: "8px 12px" }}>
                        <div style={{ fontSize: 10, color: "#3d5070", fontWeight: 700 }}>TYPE</div>
                        <div style={{ fontSize: 13, fontWeight: 700, marginTop: 2 }}>{v.type}</div>
                      </div>
                      {attRec && (
                        <>
                          <div style={{ background: "#0d1523", borderRadius: 8, padding: "8px 12px" }}>
                            <div style={{ fontSize: 10, color: "#3d5070", fontWeight: 700 }}>HOURS</div>
                            <div style={{ fontSize: 13, fontWeight: 700, color: "#f59e0b", marginTop: 2 }}>{attRec.hours || 0} hrs</div>
                          </div>
                          <div style={{ background: "#0d1523", borderRadius: 8, padding: "8px 12px" }}>
                            <div style={{ fontSize: 10, color: "#3d5070", fontWeight: 700 }}>FUEL USED</div>
                            <div style={{ fontSize: 13, fontWeight: 700, color: "#06b6d4", marginTop: 2 }}>{attRec.fuelUsed || 0} L</div>
                          </div>
                        </>
                      )}
                    </div>
                    {attRec?.site && <div style={{ fontSize: 11, color: "#5a7090", marginBottom: 10 }}>📍 {attRec.site}</div>}
                    <div className="att-btn-group">
                      <button className="btn btn-green btn-sm" onClick={() => markVehAtt(v.id, "Active")}>Active</button>
                      <button className="btn btn-ghost btn-sm" onClick={() => markVehAtt(v.id, "Idle")}>Idle</button>
                      <button className="btn btn-danger btn-sm" onClick={() => markVehAtt(v.id, "Maintenance")}>Maint.</button>
                      <button className="btn btn-outline btn-sm" onClick={() => openModal("logVehicle", { vehicleId: v.id, vehicleName: v.name, ...attRec })}>Log</button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Vehicle Attendance History */}
            <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 18, fontWeight: 800, marginBottom: 14 }}>Vehicle Log History</div>
            <div className="card" style={{ padding: 0, overflow: "hidden" }}>
              <div className="trow" style={{ gridTemplateColumns: "2fr 1.5fr 1fr 1fr 1fr 1.5fr", background: "#070d1a", borderBottom: "1px solid #162035" }}>
                {["Vehicle", "Date", "Status", "Hours", "Fuel (L)", "Site"].map(h => (
                  <div key={h} style={{ fontSize: 10, fontWeight: 800, color: "#3d5070", letterSpacing: 1, textTransform: "uppercase" }}>{h}</div>
                ))}
              </div>
              {[...vehAtt].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 20).map(a => {
                const veh = vehicles.find(v => v.id === a.vehicleId);
                return (
                  <div key={a.id} className="trow" style={{ gridTemplateColumns: "2fr 1.5fr 1fr 1fr 1fr 1.5fr" }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 13 }}>{veh?.name || "—"}</div>
                      <div style={{ fontSize: 11, color: "#3d5070" }}>{veh?.operator}</div>
                    </div>
                    <div style={{ fontSize: 12, color: "#5a7090" }}>{a.date}</div>
                    <span className="badge" style={{ background: statusColor[a.status]?.bg, color: statusColor[a.status]?.color }}>{a.status}</span>
                    <div style={{ fontFamily: "JetBrains Mono", fontSize: 13, color: "#f59e0b" }}>{a.hours || "—"}</div>
                    <div style={{ fontFamily: "JetBrains Mono", fontSize: 13, color: "#06b6d4" }}>{a.fuelUsed || "—"}</div>
                    <div style={{ fontSize: 12, color: "#5a7090" }}>{a.site || "—"}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* ═══ MODALS ══════════════════════════════════════════════════════════ */}
      {modal && (
        <div className="overlay" onClick={e => e.target === e.currentTarget && closeModal()}>
          <div className="modal">

            {/* ADD / EDIT SALE */}
            {modal === "addSale" && (
              <>
                <h3>{form.id ? "✏ Edit Sale" : "➕ New Sale"}</h3>
                {[
                  { label: "Customer Name *", key: "customer", placeholder: "Full name" },
                  { label: "Phone Number", key: "phone", placeholder: "10-digit mobile" },
                  { label: "Project / Unit *", key: "project", placeholder: "e.g. Villa Block A – Unit 3" },
                  { label: "Sale Amount (₹) *", key: "amount", placeholder: "e.g. 4500000", type: "number" },
                  { label: "Amount Paid (₹)", key: "paid", placeholder: "0", type: "number" },
                  { label: "Sale Date", key: "date", type: "date" },
                ].map(f => (
                  <div className="field" key={f.key}>
                    <label>{f.label}</label>
                    <input className="inp" type={f.type || "text"} placeholder={f.placeholder} value={form[f.key] || ""} onChange={e => setF(f.key, e.target.value)} />
                  </div>
                ))}
                <div className="field">
                  <label>Status</label>
                  <select className="inp" value={form.status || "Active"} onChange={e => setF("status", e.target.value)}>
                    <option>Active</option><option>Completed</option><option>On Hold</option>
                  </select>
                </div>
                <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
                  <button className="btn btn-amber" style={{ flex: 1 }} onClick={saveSale}>{form.id ? "Update Sale" : "Add Sale"}</button>
                  <button className="btn btn-ghost" onClick={closeModal}>Cancel</button>
                </div>
              </>
            )}

            {/* RECORD COLLECTION */}
            {modal === "addCollection" && (
              <>
                <h3>💰 Record Payment</h3>
                <div className="field">
                  <label>Customer *</label>
                  <select className="inp" value={form.customer || ""} onChange={e => setF("customer", e.target.value)}>
                    <option value="">Select Customer</option>
                    {sales.map(s => <option key={s.id} value={s.customer}>{s.customer} ({s.project})</option>)}
                  </select>
                </div>
                {[
                  { label: "Amount Received (₹) *", key: "amount", type: "number", placeholder: "Enter amount" },
                  { label: "Payment Date", key: "date", type: "date" },
                  { label: "Reference / Cheque No.", key: "ref", placeholder: "e.g. TXN-1234" },
                ].map(f => (
                  <div className="field" key={f.key}>
                    <label>{f.label}</label>
                    <input className="inp" type={f.type || "text"} placeholder={f.placeholder} value={form[f.key] || ""} onChange={e => setF(f.key, e.target.value)} />
                  </div>
                ))}
                <div className="field">
                  <label>Payment Mode</label>
                  <select className="inp" value={form.mode || "Bank Transfer"} onChange={e => setF("mode", e.target.value)}>
                    {["Bank Transfer", "Cheque", "UPI", "NEFT", "RTGS", "Cash"].map(m => <option key={m}>{m}</option>)}
                  </select>
                </div>
                <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
                  <button className="btn btn-amber" style={{ flex: 1 }} onClick={saveCollection}>Record Payment</button>
                  <button className="btn btn-ghost" onClick={closeModal}>Cancel</button>
                </div>
              </>
            )}

            {/* ADD / EDIT INVENTORY */}
            {modal === "addInventory" && (
              <>
                <h3>{form.id ? "✏ Edit Item" : "📦 Add Inventory Item"}</h3>
                {[
                  { label: "Item Name *", key: "item", placeholder: "e.g. Cement (OPC 53)" },
                  { label: "Unit *", key: "unit", placeholder: "e.g. Bags, MT, CFT" },
                  { label: "Quantity *", key: "qty", type: "number", placeholder: "Current stock" },
                  { label: "Min. Threshold (Alert)", key: "threshold", type: "number", placeholder: "Low stock alert level" },
                  { label: "Cost per Unit (₹)", key: "cost", type: "number", placeholder: "Unit price" },
                ].map(f => (
                  <div className="field" key={f.key}>
                    <label>{f.label}</label>
                    <input className="inp" type={f.type || "text"} placeholder={f.placeholder} value={form[f.key] || ""} onChange={e => setF(f.key, e.target.value)} />
                  </div>
                ))}
                <div className="field">
                  <label>Category</label>
                  <select className="inp" value={form.category || "Raw Material"} onChange={e => setF("category", e.target.value)}>
                    {["Raw Material", "Plumbing", "Electrical", "Finishing", "Fuel", "Tools", "Other"].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
                  <button className="btn btn-amber" style={{ flex: 1 }} onClick={saveInventory}>{form.id ? "Update Item" : "Add Item"}</button>
                  <button className="btn btn-ghost" onClick={closeModal}>Cancel</button>
                </div>
              </>
            )}

            {/* USE STOCK */}
            {modal === "useStock" && (
              <>
                <h3>📤 Record Stock Usage</h3>
                <div className="field">
                  <label>Select Item *</label>
                  <select className="inp" value={form.itemId || ""} onChange={e => setF("itemId", e.target.value)}>
                    <option value="">Choose item</option>
                    {inventory.map(i => <option key={i.id} value={i.id}>{i.item} (Available: {i.qty} {i.unit})</option>)}
                  </select>
                </div>
                <div className="field">
                  <label>Quantity Used *</label>
                  <input className="inp" type="number" placeholder="Enter qty" value={form.useQty || ""} onChange={e => setF("useQty", e.target.value)} />
                </div>
                <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
                  <button className="btn btn-amber" style={{ flex: 1 }} onClick={useStock}>Deduct Stock</button>
                  <button className="btn btn-ghost" onClick={closeModal}>Cancel</button>
                </div>
              </>
            )}

            {/* ADD EMPLOYEE */}
            {modal === "addEmployee" && (
              <>
                <h3>{form.id ? "✏ Edit Employee" : "👷 Add Employee"}</h3>
                {[
                  { label: "Full Name *", key: "name", placeholder: "Employee name" },
                  { label: "Role *", key: "role", placeholder: "e.g. Mason, Engineer, Helper" },
                  { label: "Phone", key: "phone", placeholder: "10-digit mobile" },
                ].map(f => (
                  <div className="field" key={f.key}>
                    <label>{f.label}</label>
                    <input className="inp" type="text" placeholder={f.placeholder} value={form[f.key] || ""} onChange={e => setF(f.key, e.target.value)} />
                  </div>
                ))}
                <div className="field">
                  <label>Type</label>
                  <select className="inp" value={form.type || "Labour"} onChange={e => setF("type", e.target.value)}>
                    <option>Labour</option><option>Staff</option><option>Operator</option><option>Contractor</option>
                  </select>
                </div>
                <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
                  <button className="btn btn-amber" style={{ flex: 1 }} onClick={saveEmployee}>{form.id ? "Update" : "Add Employee"}</button>
                  <button className="btn btn-ghost" onClick={closeModal}>Cancel</button>
                </div>
              </>
            )}

            {/* ADD VEHICLE */}
            {modal === "addVehicle" && (
              <>
                <h3>{form.id ? "✏ Edit Vehicle" : "🚧 Add Vehicle / Machine"}</h3>
                {[
                  { label: "Vehicle / Machine Name *", key: "name", placeholder: "e.g. JCB 3DX" },
                  { label: "Registration Number", key: "regNo", placeholder: "e.g. TN-01-AB-1234" },
                  { label: "Operator Name", key: "operator", placeholder: "Operator's name" },
                ].map(f => (
                  <div className="field" key={f.key}>
                    <label>{f.label}</label>
                    <input className="inp" type="text" placeholder={f.placeholder} value={form[f.key] || ""} onChange={e => setF(f.key, e.target.value)} />
                  </div>
                ))}
                <div className="field">
                  <label>Type *</label>
                  <select className="inp" value={form.type || "JCB"} onChange={e => setF("type", e.target.value)}>
                    {["JCB", "Excavator", "Tipper", "Mixer", "Crane", "Roller", "Loader", "Other"].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
                  <button className="btn btn-amber" style={{ flex: 1 }} onClick={saveVehicle}>{form.id ? "Update" : "Add Vehicle"}</button>
                  <button className="btn btn-ghost" onClick={closeModal}>Cancel</button>
                </div>
              </>
            )}

            {/* LOG VEHICLE HOURS */}
            {modal === "logVehicle" && (
              <>
                <h3>🔧 Log Vehicle Hours — {form.vehicleName}</h3>
                {[
                  { label: "Start Time", key: "startHr", type: "time" },
                  { label: "End Time", key: "endHr", type: "time" },
                  { label: "Hours Worked", key: "hours", type: "number", placeholder: "Total hours" },
                  { label: "Fuel Used (Litres)", key: "fuelUsed", type: "number", placeholder: "Diesel consumed" },
                  { label: "Site / Location", key: "site", placeholder: "e.g. Villa Block A" },
                ].map(f => (
                  <div className="field" key={f.key}>
                    <label>{f.label}</label>
                    <input className="inp" type={f.type || "text"} placeholder={f.placeholder} value={form[f.key] || ""} onChange={e => setF(f.key, e.target.value)} />
                  </div>
                ))}
                <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
                  <button className="btn btn-amber" style={{ flex: 1 }} onClick={() => {
                    const existing = vehAtt.find(a => a.vehicleId === form.vehicleId && a.date === attDate);
                    if (existing) {
                      setVehAtt(p => p.map(a => a.id === existing.id ? { ...a, ...form, hours: +form.hours, fuelUsed: +form.fuelUsed } : a));
                    } else {
                      setVehAtt(p => [...p, { ...form, id: uid(), date: attDate, status: "Active", hours: +form.hours, fuelUsed: +form.fuelUsed }]);
                    }
                    showToast("Vehicle log saved!");
                    closeModal();
                  }}>Save Log</button>
                  <button className="btn btn-ghost" onClick={closeModal}>Cancel</button>
                </div>
              </>
            )}

          </div>
        </div>
      )}
    </div>
  );
}
