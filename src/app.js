// ==================== HỆ THỐNG FEATURES ====================
const FEATURES = [
    { id: 'lightweight', name: '💡 Light Weight', icon: 'fas fa-feather-alt' },
    { id: 'aimlock', name: '🏯 AimLock', icon: 'fas fa-crosshairs' },
    { id: 'reducelag', name: '⚡ Reduce Lag', icon: 'fas fa-tachometer-alt' },
    { id: 'fixlagspike', name: '📊 Fix Lag Spike', icon: 'fas fa-wave-square' },
    { id: 'antishake', name: '📹 Anti Shake', icon: 'fas fa-video' },
    { id: 'fixovershoot', name: '🎪 Fix Over-shoot', icon: 'fas fa-bullseye' },
    { id: 'sensitivetouch', name: '👆 Sensitive Touch', icon: 'fas fa-fingerprint' },
    { id: 'smoothaim', name: '💧 Smooth Aim', icon: 'fas fa-water' },
    { id: 'reducejitter', name: '📈 Reduce Jitter', icon: 'fas fa-grip-lines' },
    { id: 'cputurbo', name: '⚙️ CPU Turbo', icon: 'fas fa-microchip' },
    { id: 'thermalcontrol', name: '🌡️ Thermal Control', icon: 'fas fa-thermometer-half' },
    { id: 'vpnshield', name: '🛡️ VPN Shield', icon: 'fas fa-shield-alt' },
    { id: 'packetprioritize', name: '🌐 Packet Prioritize', icon: 'fas fa-network-wired' },
    { id: 'hdrplus', name: '☀️ HDR+', icon: 'fas fa-sun' },
    { id: 'colorenhance', name: '🎨 Color Enhance', icon: 'fas fa-palette' },
    { id: 'swipecontrol', name: '👆 Swipe Control', icon: 'fas fa-hand-pointer' },
    { id: 'smoothtouch', name: '✋ Smooth Touch', icon: 'fas fa-hand-peace' },
    { id: 'hyperclick', name: '🖱️ Hyper Click', icon: 'fas fa-mouse' },
    { id: 'screenguard', name: '🔒 Screen Guard', icon: 'fas fa-lock' },
    { id: 'ramcleaner', name: '🧹 RAM Cleaner', icon: 'fas fa-broom' }
];

// ==================== KHỞI TẠO FEATURES ====================
function initializeFeatures() {
    const grid = document.getElementById('featuresGrid');
    grid.innerHTML = '';
    
    FEATURES.forEach(feature => {
        const html = `
            <div class="feature-item">
                <div class="feature-name">
                    <i class="${feature.icon}"></i>
                    <span>${feature.name}</span>
                </div>
                <label class="switch">
                    <input type="checkbox" class="feature-toggle" id="${feature.id}Toggle" onchange="toggleFeature('${feature.id}', this)">
                    <span class="slider"></span>
                </label>
            </div>
        `;
        grid.innerHTML += html;
    });
}

// ==================== TOGGLE FEATURE ====================
function toggleFeature(featureId, checkbox) {
    if (!window.isKeyValid()) {
        checkbox.checked = false;
        return;
    }
    
    const state = checkbox.checked ? 'ON' : 'OFF';
    const feature = FEATURES.find(f => f.id === featureId);
    
    if (checkbox.checked) {
        console.log(`✅ ${feature.name} activated!`);
        // Gửi h5gg nếu có
        try {
            if (typeof h5gg !== 'undefined') {
                h5gg.clearResults();
                console.log(`h5gg: Processing ${feature.name}`);
            }
        } catch (e) {
            console.log(`h5gg not available for ${feature.name}`);
        }
    } else {
        console.log(`❌ ${feature.name} deactivated!`);
    }
    
    showFeatureStatus(feature.name, state);
}

// ==================== HIỂN THỊ TRẠNG THÁI ====================
function showFeatureStatus(feature, state) {
    const statusDiv = document.getElementById('featureStatus');
    if (statusDiv) {
        const statusText = state === 'ON' ? '✅' : '❌';
        statusDiv.innerHTML = `<i class="fas fa-info-circle"></i> ${feature} → ${statusText} ${state}`;
        setTimeout(() => {
            statusDiv.innerHTML = '<i class="fas fa-unlock-alt"></i> Đã kích hoạt! Bật/tắt tính năng bên trên.';
        }, 2000);
    }
}

// ==================== HỆ THỐNG KEY ====================
(function() {
    // Cập nhật đồng hồ realtime
    function updateDateTime() {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        
        document.getElementById('currentDate').innerText = `${day}/${month}/${year}`;
        document.getElementById('currentTime').innerText = `${hours}:${minutes}:${seconds}`;
    }

    setInterval(updateDateTime, 1000);
    updateDateTime();

    // ========== KEY HỢP LỆ ==========
    const KEYS = {
        'SPLOCK1DAY': { type: '1day', days: 1 },
        'SPLOCK30DAYS': { type: '30days', days: 30 },
        'SPLOCK90DAYS': { type: '90days', days: 90 },
        'SPLOCK180DAYS': { type: '180days', days: 180 },
        'SPLOCKVINHVIEN': { type: 'permanent', days: Infinity }
    };

    let activatedKey = null;
    let expiryDate = null;
    let checkInterval = null;

    // DOM Elements
    const featuresContainer = document.getElementById('featuresContainer');
    const globalLockMsg = document.getElementById('globalLockMessage');
    const expiredMessage = document.getElementById('expiredMessage');
    const unlockBtn = document.getElementById('unlockBtn');
    const keyInput = document.getElementById('licenseKey');
    const keyHint = document.getElementById('keyHint');
    const keySection = document.getElementById('keySystem');
    const expiryInfo = document.getElementById('expiryInfo');
    const expiryText = document.getElementById('expiryText');
    
    const key7DaysBtn = document.getElementById('key7DaysBtn');
    const key30DaysBtn = document.getElementById('key30DaysBtn');
    const key90DaysBtn = document.getElementById('key90DaysBtn');
    const key180DaysBtn = document.getElementById('key180DaysBtn');
    const keyPermanentBtn = document.getElementById('keyPermanentBtn');
    
    // Xử lý chọn loại key
    key7DaysBtn.addEventListener('click', function() {
        [key7DaysBtn, key30DaysBtn, key90DaysBtn, key180DaysBtn, keyPermanentBtn].forEach(btn => btn.classList.remove('active'));
        key7DaysBtn.classList.add('active');
        keyInput.placeholder = '🔐 Nhập Key 1 Ngày...';
    });

    key30DaysBtn.addEventListener('click', function() {
        [key7DaysBtn, key30DaysBtn, key90DaysBtn, key180DaysBtn, keyPermanentBtn].forEach(btn => btn.classList.remove('active'));
        key30DaysBtn.classList.add('active');
        keyInput.placeholder = '🔐 Nhập Key 30 Ngày...';
    });

    key90DaysBtn.addEventListener('click', function() {
        [key7DaysBtn, key30DaysBtn, key90DaysBtn, key180DaysBtn, keyPermanentBtn].forEach(btn => btn.classList.remove('active'));
        key90DaysBtn.classList.add('active');
        keyInput.placeholder = '🔐 Nhập Key 90 Ngày...';
    });

    key180DaysBtn.addEventListener('click', function() {
        [key7DaysBtn, key30DaysBtn, key90DaysBtn, key180DaysBtn, keyPermanentBtn].forEach(btn => btn.classList.remove('active'));
        key180DaysBtn.classList.add('active');
        keyInput.placeholder = '🔐 Nhập Key 180 Ngày...';
    });

    keyPermanentBtn.addEventListener('click', function() {
        [key7DaysBtn, key30DaysBtn, key90DaysBtn, key180DaysBtn, keyPermanentBtn].forEach(btn => btn.classList.remove('active'));
        keyPermanentBtn.classList.add('active');
        keyInput.placeholder = '🔐 Nhập Key Vĩnh Viễn...';
    });

    function isValidKey(key) {
        return KEYS.hasOwnProperty(key);
    }

    function calculateExpiry(key, activationTime) {
        const keyInfo = KEYS[key];
        if (keyInfo.days === Infinity) return null;
        const expiry = new Date(activationTime);
        expiry.setDate(expiry.getDate() + keyInfo.days);
        return expiry;
    }

    function formatDate(date) {
        if (!date) return 'Không giới hạn';
        const d = String(date.getDate()).padStart(2, '0');
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const y = date.getFullYear();
        const h = String(date.getHours()).padStart(2, '0');
        const min = String(date.getMinutes()).padStart(2, '0');
        return `${d}/${m}/${y} ${h}:${min}`;
    }

    window.isKeyValid = function() {
        if (!activatedKey) return false;
        if (!expiryDate) return true;
        const now = new Date();
        return now < expiryDate;
    };

    function updateExpiryStatus() {
        if (!activatedKey) return;

        if (window.isKeyValid()) {
            featuresContainer.classList.add('show');
            globalLockMsg.style.display = 'none';
            expiredMessage.style.display = 'none';
            
            if (expiryDate) {
                expiryInfo.style.display = 'block';
                expiryText.innerText = `⏰ Hạn sử dụng: ${formatDate(expiryDate)}`;
            } else {
                expiryInfo.style.display = 'block';
                expiryText.innerText = '♾️ Vĩnh viễn (không giới hạn)';
            }
        } else {
            featuresContainer.classList.remove('show');
            globalLockMsg.style.display = 'none';
            expiredMessage.style.display = 'block';
            unlockBtn.disabled = true;
            keyInput.disabled = true;
            
            document.querySelectorAll('.feature-toggle').forEach(toggle => {
                toggle.checked = false;
            });
        }
    }

    function unlockMenu(key) {
        const now = new Date();
        activatedKey = key;
        expiryDate = calculateExpiry(key, now);
        
        keySection.classList.add('key-success');
        setTimeout(() => keySection.classList.remove('key-success'), 1000);
        
        updateExpiryStatus();
        
        const keyInfo = KEYS[key];
        let typeText = '';
        if (keyInfo.days === 1) typeText = '1 NGÀY';
        else if (keyInfo.days === 30) typeText = '30 NGÀY';
        else if (keyInfo.days === 90) typeText = '90 NGÀY';
        else if (keyInfo.days === 180) typeText = '180 NGÀY';
        else typeText = 'VĨNH VIỄN';
        
        keyHint.innerHTML = `<i class="fas fa-check-circle" style="color:#aaffaa;"></i> ✅ KEY ${typeText} HỢP LỆ - Đã kích hoạt thành công!`;
        keyHint.style.borderLeftColor = '#00ffaa';
        
        unlockBtn.disabled = true;
        keyInput.disabled = true;
        unlockBtn.style.opacity = '0.6';
        keyInput.style.opacity = '0.8';
        
        [key7DaysBtn, key30DaysBtn, key90DaysBtn, key180DaysBtn, keyPermanentBtn].forEach(btn => {
            btn.style.pointerEvents = 'none';
            btn.style.opacity = '0.6';
        });

        if (checkInterval) clearInterval(checkInterval);
        checkInterval = setInterval(updateExpiryStatus, 60000);
    }

    unlockBtn.addEventListener('click', function() {
        const enteredKey = keyInput.value.trim().toUpperCase();
        
        if (isValidKey(enteredKey)) {
            unlockMenu(enteredKey);
        } else {
            keyInput.style.border = '2px solid #ff5555';
            keyHint.innerHTML = `<i class="fas fa-exclamation-triangle" style="color:orange;"></i> ❌ KEY KHÔNG HỢP LỆ - Vui lòng thử lại hoặc liên hệ Zalo.`;
            keyHint.style.borderLeftColor = 'red';
            
            keyInput.style.transform = 'translateX(3px)';
            setTimeout(() => keyInput.style.transform = '', 100);
            setTimeout(() => keyInput.style.transform = 'translateX(-3px)', 120);
            setTimeout(() => keyInput.style.transform = '', 240);
        }
    });

    keyInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            unlockBtn.click();
        }
    });

    // Khởi tạo
    featuresContainer.classList.remove('show');
    globalLockMsg.style.display = 'block';
    expiredMessage.style.display = 'none';
    expiryInfo.style.display = 'none';
    key7DaysBtn.classList.add('active');
    
    // Khởi tạo features grid
    initializeFeatures();
    
    // Debug info
    console.log('🎮 SPLOCK 1.0 - Initialized');
    console.log('📝 Test Keys:');
    console.log('  • SPLOCK1DAY (1 day)');
    console.log('  • SPLOCK30DAYS (30 days)');
    console.log('  • SPLOCK90DAYS (90 days)');
    console.log('  • SPLOCK180DAYS (180 days)');
    console.log('  • SPLOCKVINHVIEN (Permanent)');
})();
