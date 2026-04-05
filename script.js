@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;800&display=swap');

:root {
    --bg: #030712;
    --card: rgba(255, 255, 255, 0.03);
    --border: rgba(255, 255, 255, 0.06);
    --text: #f3f4f6;
    --muted: #9ca3af;
    --accent: #ef4444;
    --sidebar-w: 220px;
}

* { 
    margin: 0; 
    padding: 0; 
    box-sizing: border-box; 
    -webkit-tap-highlight-color: transparent; 
}

body { 
    min-height: 100vh; 
    background: var(--bg); 
    color: var(--text); 
    font-family: 'Sora', sans-serif; 
    overflow-x: hidden; 
    line-height: 1.4; 
}

#bg-canvas { 
    position: fixed; 
    inset: 0; 
    z-index: 0; 
}

.page-wrap { 
    position: relative; 
    z-index: 1; 
    margin-left: var(--sidebar-w); 
    padding: 30px; 
    transition: 0.3s ease; 
}

.sidebar { 
    position: fixed; 
    inset: 0 auto 0 0; 
    width: var(--sidebar-w); 
    background: rgba(3, 7, 18, 0.95); 
    backdrop-filter: blur(15px); 
    border-right: 1px solid var(--border); 
    z-index: 2000; 
    transition: 0.3s ease; 
}

.sidebar-logo { 
    display: flex; 
    align-items: center; 
    gap: 10px; 
    padding: 25px 20px; 
    border-bottom: 1px solid var(--border); 
}

.logo-icon { 
    width: 32px; 
    height: 32px; 
    background: var(--accent); 
    border-radius: 8px; 
    display: grid; 
    place-items: center; 
    color: #fff; 
}

.logo-text { 
    font-weight: 800; 
    font-size: 16px; 
}

.sidebar-nav { 
    padding: 15px 10px; 
    display: flex; 
    flex-direction: column; 
    gap: 5px; 
}

.nav-item { 
    display: flex; 
    align-items: center; 
    gap: 10px; 
    padding: 10px 15px; 
    border-radius: 8px; 
    color: var(--muted); 
    text-decoration: none; 
    font-size: 13px; 
    transition: 0.2s; 
}

.nav-item:hover, .nav-item.active { 
    background: rgba(239, 68, 68, 0.1); 
    color: var(--accent); 
}

.sidebar-footer { 
    position: absolute; 
    bottom: 0; 
    width: 100%; 
    padding: 15px; 
    font-size: 10px; 
    color: #4b5563; 
    text-align: center; 
}

.sidebar-toggle { 
    display: none; 
    position: fixed; 
    top: 15px; 
    left: 15px; 
    z-index: 3000; 
    background: var(--accent); 
    border: none; 
    color: #fff; 
    width: 45px; 
    height: 45px; 
    border-radius: 12px; 
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(239, 68, 68, 0.4);
    transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.important-section { 
    background: rgba(239, 68, 68, 0.05); 
    border: 1px solid rgba(239, 68, 68, 0.2); 
    border-radius: 12px; 
    padding: 15px; 
    margin-bottom: 20px; 
    text-align: center; 
}

.label-warn { 
    display: block; 
    font-size: 10px; 
    font-weight: 800; 
    color: var(--accent); 
    margin-bottom: 10px; 
    letter-spacing: 2px; 
}

.image-container-vip { 
    display: grid; 
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); 
    gap: 10px; 
}

.image-container-vip img { 
    width: 100%; 
    height: 150px; 
    object-fit: cover; 
    border-radius: 8px; 
    border: 1px solid var(--accent); 
}

.peler { 
    background: var(--card); 
    border: 1px solid var(--border); 
    border-radius: 10px; 
    padding: 12px; 
    margin-bottom: 15px; 
    text-align: center; 
    font-weight: 800; 
    font-size: 14px; 
    color: var(--accent); 
}

.info-grid { 
    display: grid; 
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); 
    gap: 10px; 
}

.list { 
    background: var(--card); 
    border: 1px solid var(--border); 
    border-radius: 10px; 
    padding: 12px; 
}

.list span { font-size: 9px; color: var(--muted); text-transform: uppercase; }

.text, .map, .link { color: #fff; font-size: 13px; font-weight: 600; display: flex; align-items: center; gap: 8px; }
.text i, .map i, .link i { color: var(--accent); }

.image-container { 
    display: grid; 
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); 
    gap: 8px; 
}

.image-container img { width: 100%; height: 130px; object-fit: cover; border-radius: 8px; border: 1px solid var(--border); }

summary { 
    background: var(--card); 
    border: 1px solid var(--border); 
    border-radius: 8px; 
    padding: 12px; 
    cursor: pointer; 
    font-size: 12px; 
    font-weight: 700; 
    color: var(--muted); 
    text-align: center; 
    list-style: none; 
}

footer { margin-top: 30px; padding: 20px; text-align: center; font-size: 10px; color: var(--muted); opacity: 0.4; }

@media (max-width: 768px) {
    .sidebar { transform: translateX(-100%); visibility: hidden; }
    .sidebar.open { transform: translateX(0); visibility: visible; }
    .sidebar-toggle { display: flex; align-items: center; justify-content: center; }
    .page-wrap { margin-left: 0; padding: 80px 15px 20px; }
    .sidebar.open ~ .sidebar-toggle { left: 235px; }
}

#loading-overlay { 
    position: fixed; 
    inset: 0; 
    background: var(--bg); 
    display: flex; 
    justify-content: center; 
    align-items: center; 
    z-index: 9999; 
}

.loading-spinner { 
    width: 35px; 
    height: 35px; 
    border: 2px solid rgba(239, 68, 68, 0.1); 
    border-top-color: var(--accent); 
    border-radius: 50%; 
    animation: spin 0.6s linear infinite; 
}

@keyframes spin { to { transform: rotate(360deg); } }
