import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard({ user, setUser }) {
  const [budget, setBudget] = useState(70000);
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [sidebar, setSidebar] = useState(true);
  const [theme, setTheme] = useState({ bg: '#f4f7f6', text: '#333' });
  const [note, setNote] = useState("");
  // Profile state
  const [profile, setProfile] = useState({ username: user.username, email: user.email, password: user.password });

  const totalSpent = expenses.reduce((acc, curr) => acc + Number(curr.amount), 0);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: theme.bg, color: theme.text, fontFamily: 'sans-serif' }}>
      {sidebar && (
        <div style={{ width: '220px', background: '#2c3e50', color: '#fff', padding: '20px' }}>
          <h3 style={{ marginBottom: '30px' }}>Finance Tracker</h3>
          <p onClick={() => setActiveTab("Dashboard")} style={{ cursor: 'pointer', padding: '10px' }}>📊 Dashboard</p>
          <p onClick={() => setActiveTab("Profile")} style={{ cursor: 'pointer', padding: '10px' }}>👤 Profile</p>
          <p onClick={() => setActiveTab("Notepad")} style={{ cursor: 'pointer', padding: '10px' }}>📝 Notepad</p>
          <p onClick={() => setActiveTab("Theme")} style={{ cursor: 'pointer', padding: '10px' }}>⚙️ Theme</p>
          <p onClick={() => window.location.reload()} style={{ cursor: 'pointer', padding: '10px', color: '#e74c3c' }}>🚪 Logout</p>
        </div>
      )}
      
      <div style={{ flex: 1, padding: '30px' }}>
        <button onClick={() => setSidebar(!sidebar)} style={{ marginBottom: '20px' }}>☰ Menu</button>
        
        {/* DASHBOARD TAB */}
        {activeTab === "Dashboard" && (
          <div>
            <h1>Welcome, {user.username}!</h1>
            <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
              {[ { title: "Total Budget", val: budget, color: "#3498db" }, { title: "Remaining", val: budget - totalSpent, color: "#27ae60" }, { title: "Spent Money", val: totalSpent, color: "#e67e22" } ].map((item, i) => (
                <div key={i} style={{ background: item.color, color: '#fff', padding: '20px', borderRadius: '10px', flex: 1, textAlign: 'center' }}>
                  <h4>{item.title}</h4>
                  {item.title === "Total Budget" ? <input type="number" value={budget} onChange={(e) => setBudget(e.target.value)} style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '20px', width: '100px', textAlign: 'center' }} /> : <h2 style={{ margin: 0 }}>{item.val}</h2>}
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '40px' }}>
              <div style={{ width: '300px' }}>
                <h3>Pie Graph 📈</h3>
                <Pie key={totalSpent} data={{ labels: expenses.map(e => e.title), datasets: [{ data: expenses.map(e => e.amount), backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'] }] }} />
              </div>
              <div style={{ flex: 1 }}>
                <h3>Add Expenses</h3>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                  <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" style={{ padding: '8px' }} />
                  <input value={amount} onChange={(e) => setAmount(e.target.value)} type="number" placeholder="Amount" style={{ padding: '8px' }} />
                  <button onClick={() => { setExpenses([...expenses, { id: Date.now(), title, amount }]); setTitle(""); setAmount(""); }} style={{ padding: '8px 20px', background: '#27ae60', color: 'white', border: 'none', cursor: 'pointer' }}>Add</button>
                </div>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {expenses.map(e => (
                    <li key={e.id} style={{ background: '#fff', padding: '10px', marginBottom: '5px', display: 'flex', justifyContent: 'space-between', borderRadius: '5px' }}>
                      {e.title}: {e.amount}
                      <div>
                        <button onClick={() => { setTitle(e.title); setAmount(e.amount); setExpenses(expenses.filter(x => x.id !== e.id)); }} style={{ marginRight: '5px' }}>Edit</button>
                        <button onClick={() => setExpenses(expenses.filter(x => x.id !== e.id))} style={{ color: 'red' }}>Delete</button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* PROFILE TAB */}
        {activeTab === "Profile" && (
          <div style={{ background: '#fff', padding: '20px', borderRadius: '10px' }}>
            <h2>👤 Edit Profile</h2>
            <input value={profile.username} onChange={(e) => setProfile({...profile, username: e.target.value})} placeholder="Username" style={{ display: 'block', margin: '10px 0', padding: '10px', width: '300px' }} />
            <input value={profile.email} onChange={(e) => setProfile({...profile, email: e.target.value})} placeholder="Email" style={{ display: 'block', margin: '10px 0', padding: '10px', width: '300px' }} />
            <input type="password" value={profile.password} onChange={(e) => setProfile({...profile, password: e.target.value})} placeholder="Password" style={{ display: 'block', margin: '10px 0', padding: '10px', width: '300px' }} />
            <button onClick={() => { setUser(profile); alert("Profile Updated! ✅"); }} style={{ padding: '10px 20px', background: '#3498db', color: 'white', border: 'none', cursor: 'pointer' }}>Save Profile</button>
          </div>
        )}

        {/* NOTEPAD TAB */}
        {activeTab === "Notepad" && (
          <div style={{ height: '80vh' }}>
            <h2>📝 Notepad</h2>
            <textarea value={note} onChange={(e) => setNote(e.target.value)} style={{ width: '100%', height: '60%', padding: '20px', fontSize: '18px' }} placeholder="Write here..." />
            <div style={{ marginTop: '10px' }}>
              <button onClick={() => alert("Note Saved! 💾")} style={{ padding: '10px 20px', marginRight: '10px' }}>Save Note</button>
              <button onClick={() => setNote("")} style={{ padding: '10px 20px' }}>New Page</button>
            </div>
          </div>
        )}

        {/* THEME TAB */}
        {activeTab === "Theme" && (
          <div style={{ background: '#fff', padding: '20px', borderRadius: '10px' }}>
            <h2>⚙️ Theme Settings</h2>
            <button onClick={() => setTheme({ bg: '#e6e6fa', text: '#333' })}>Lilac White</button>
            <button onClick={() => setTheme({ bg: '#ffffff', text: '#000000' })} style={{ margin: '0 10px' }}>White Black</button>
            <button onClick={() => setTheme({ bg: '#000000', text: '#ffffff' })}>Black White</button>
          </div>
        )}
      </div>
    </div>
  );
}