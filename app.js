/* ==========================================================================
   5S LabelExpress - Core Application Logic
   ========================================================================== */

// 1. Icon Library (Standard industrial SVG definitions)
const ICONS = {
    none: {
        label: '❌ No Icon',
        svg: ''
    },
    warning: {
        label: '⚠️ Warning',
        svg: `<svg viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm0 3.99L19.53 19H4.47L12 5.99zM13 16h-2v2h2v-2zm0-6h-2v4h2v-4z"/></svg>`
    },
    danger: {
        label: '⚡ High Voltage',
        svg: `<svg viewBox="0 0 24 24"><path d="M7 2v11h3v9l7-12h-4l4-8z"/></svg>`
    },
    firstaid: {
        label: '➕ First Aid',
        svg: `<svg viewBox="0 0 24 24"><path d="M19 10.5h-5.5V5h-3v5.5H5v3h5.5V19h3v-5.5H19v-3z"/></svg>`
    },
    gear: {
        label: '⚙️ Machine',
        svg: `<svg viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>`
    },
    trash: {
        label: '🗑️ Waste Bin',
        svg: `<svg viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>`
    },
    recycle: {
        label: '♻️ Recycle',
        svg: `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.04-.42 1.99-1.07 2.75z"/></svg>` // Question mark (used as info)
    },
    arrow_up: {
        label: '⬆️ Arrow Up',
        svg: `<svg viewBox="0 0 24 24"><path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"/></svg>`
    },
    arrow_down: {
        label: '⬇️ Arrow Down',
        svg: `<svg viewBox="0 0 24 24"><path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"/></svg>`
    },
    arrow_left: {
        label: '⬅️ Arrow Left',
        svg: `<svg viewBox="0 0 24 24"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>`
    },
    arrow_right: {
        label: '➡️ Arrow Right',
        svg: `<svg viewBox="0 0 24 24"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z"/></svg>`
    },
    fire: {
        label: '🔥 Fire hazard',
        svg: `<svg viewBox="0 0 24 24"><path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/></svg>`
    },
    safety_glasses: {
        label: '👓 Safety PPE',
        svg: `<svg viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>`
    }
};

// Google Fonts Material Icons Database
const GOOGLE_ICONS = {
    // Safety
    'safety': {
        'warning': { label: '⚠️ Warning', name: 'warning' },
        'report': { label: '⚠️ Alert Hazard', name: 'report' },
        'error': { label: '🚫 Danger/Stop', name: 'error' },
        'bolt': { label: '⚡ Electric Hazard', name: 'bolt' },
        'local_fire_department': { label: '🔥 Fire Hazard', name: 'local_fire_department' },
        'emergency': { label: '➕ Emergency', name: 'emergency' },
        'medical_services': { label: '➕ First Aid Kit', name: 'medical_services' },
        'masks': { label: '😷 Wear Mask', name: 'masks' },
        'engineering': { label: '👷 Helmet Required', name: 'engineering' },
        'hearing': { label: '🎧 Hearing Protection', name: 'hearing' },
        'visibility': { label: '👓 Eye Protection', name: 'visibility' }
    },
    // Tools
    'tools': {
        'settings': { label: '⚙️ Settings/Gear', name: 'settings' },
        'build': { label: '🔧 Wrench Tool', name: 'build' },
        'construction': { label: '🛠️ Double Tools', name: 'construction' },
        'precision_manufacturing': { label: '🤖 Precision Machining', name: 'precision_manufacturing' },
        'handyman': { label: '🛠️ Technician', name: 'handyman' },
        'hardware': { label: '🔩 Screws/Hardware', name: 'hardware' },
        'plumbing': { label: '🚰 Water/Pipes', name: 'plumbing' },
        'electric_bolt': { label: '🔌 Electrical Wiring', name: 'electric_bolt' }
    },
    // Storage & Logistics
    'storage': {
        'inventory': { label: '📁 Inventory Shelf', name: 'inventory' },
        'inventory_2': { label: '📦 Storage Bin', name: 'inventory_2' },
        'package': { label: '📦 Package Box', name: 'package' },
        'package_2': { label: '📦 Closed Carton', name: 'package_2' },
        'local_shipping': { label: '🚚 Logistics/Shipping', name: 'local_shipping' },
        'shopping_cart': { label: '🛒 Cart', name: 'shopping_cart' },
        'trolley': { label: '🛒 Hand Trolley', name: 'trolley' },
        'pallet': { label: '🪵 Pallet wood', name: 'pallet' },
        'store': { label: '🏪 Store/Warehouse', name: 'store' }
    },
    // Direction & Exit
    'direction': {
        'arrow_forward': { label: '➡️ Arrow Forward', name: 'arrow_forward' },
        'arrow_back': { label: '⬅️ Arrow Back', name: 'arrow_back' },
        'arrow_upward': { label: '⬆️ Arrow Up', name: 'arrow_upward' },
        'arrow_downward': { label: '⬇️ Arrow Down', name: 'arrow_downward' },
        'logout': { label: '🚪 Emergency Exit', name: 'logout' },
        'exit_to_app': { label: '🚪 Exit Door', name: 'exit_to_app' },
        'directions_run': { label: '🏃 Assembly Path', name: 'directions_run' },
        'directions_walk': { label: '🚶 Pedestrian walkway', name: 'directions_walk' }
    },
    // Cleaning & 5S Waste
    'clean': {
        'delete': { label: '🗑️ Trash/Delete', name: 'delete' },
        'delete_outline': { label: '🗑️ Empty Bin', name: 'delete_outline' },
        'recycling': { label: '♻️ Recycle', name: 'recycling' },
        'cleaning_services': { label: '🧹 Broom/Cleaning', name: 'cleaning_services' },
        'mop': { label: '🧹 Mop cleaner', name: 'mop' }
    },
    // Office & Documents
    'admin': {
        'description': { label: '📄 Document File', name: 'description' },
        'folder': { label: '📁 Folder', name: 'folder' },
        'article': { label: '📰 Report Sheet', name: 'article' },
        'print': { label: '🖨️ Printer Machine', name: 'print' },
        'info': { label: 'ℹ️ Information Guide', name: 'info' },
        'help': { label: '❓ Help Center', name: 'help' },
        'home': { label: '🏠 Office Building', name: 'home' },
        'business': { label: '🏭 Factory Site', name: 'business' },
        'person': { label: '👤 Operator Staff', name: 'person' },
        'groups': { label: '👥 Team/Department', name: 'groups' }
    }
};

// Color Guides following 5S / Industrial Safety Standards
const COLOR_GUIDES = {
    blue: {
        title: '🔵 สีน้ำเงิน (ชี้บ่งวัตถุดิบ / ชิ้นส่วน / บังคับปฏิบัติ)',
        use: 'ป้ายชี้บ่ง "วัตถุดิบหลัก (Raw Materials)" หรือ "อะไหล่ประกอบ (Production Parts)" และป้ายบังคับปฏิบัติงานทั่วไป (เช่น บังคับสวมแว่นตาเซฟตี้)',
        textStyle: 'color: #60a5fa;'
    },
    red: {
        title: '🔴 สีแดง (อันตราย / อุปกรณ์ดับเพลิง / หยุด)',
        use: 'ป้ายชี้บ่งถังดับเพลิง/อุปกรณ์ดับเพลิง, พื้นที่อันตรายสูง/ห้ามเข้า, ป้ายหยุด (Stop) หรือพื้นที่สำหรับป้ายแดงสะสาง (Red Tag Area)',
        textStyle: 'color: #f87171;'
    },
    yellow: {
        title: '🟡 สีเหลือง (ระวัง / เตือนอันตราย / เส้นทางเดิน)',
        use: 'ป้ายเตือนระวังสะดุด/ขอบต่างระดับ, เส้นขอบทางเดินรถเข็น/โฟล์คลิฟต์, ป้ายเตือนจุดที่มีชิ้นส่วนเคลื่อนไหว หรือเก็บสารเคมี',
        textStyle: 'color: #fbbf24;'
    },
    orange: {
        title: '🟠 สีส้ม (ของรอตรวจสอบ / เครื่องมือช่าง / ซ่อมบำรุง)',
        use: 'ชิ้นงานที่อยู่ระหว่างรอตรวจสอบคุณภาพ (QC Hold), เครื่องมือหรืออุปกรณ์ประจำแผนก (Tools/Machinery) หรือป้ายแจ้งเตือนอันตรายระดับปานกลาง (Warning)',
        textStyle: 'color: #ff9d3b;'
    },
    green: {
        title: '🟢 สีเขียว (ความปลอดภัย / ปฐมพยาบาล / ทางออก)',
        use: 'ป้ายจุดปฐมพยาบาล/ตู้ยา, ป้ายทางหนีไฟ/ทางออกฉุกเฉิน, อุปกรณ์ความปลอดภัย, จุดรวมพล หรือชิ้นส่วนที่ตรวจสอบผ่านแล้ว (OK)',
        textStyle: 'color: #34d399;'
    },
    black: {
        title: '⚫ สีดำ (ของเสีย / ขยะทั่วไป / เศษวัสดุ)',
        use: 'ป้ายถังขยะทั่วไป, ถังขยะเศษวัสดุรอทิ้ง (Scrap), ขยะอุตสาหกรรมชิ้นใหญ่ หรือจุดคัดแยกวัสดุที่เสียหรือรอการจำหน่ายออก',
        textStyle: 'color: #94a3b8;'
    },
    white: {
        title: '⚪ สีขาว (สำนักงาน / ของทั่วไปที่นอกเหนือจากการผลิต)',
        use: 'ชั้นเก็บของใช้ทั่วไป, อุปกรณ์สำนักงาน (Office Stationeries), ป้ายชื่อแผนก หรือเส้นแบ่งขอบเขตวางอุปกรณ์ทั่วไป',
        textStyle: 'color: #ffffff;'
    }
};

// Bilingual Quick-Fill Dictionary Map
const BILINGUAL_DICTIONARY = {
    // Safety & Fire
    'ถังดับเพลิง': 'FIRE EXTINGUISHER',
    'จุดล้างตาฉุกเฉิน': 'EMERGENCY EYE WASH',
    'อุปกรณ์ปฐมพยาบาล': 'FIRST AID KIT',
    'ทางหนีไฟ': 'FIRE EXIT',
    'จุดรวมพล': 'ASSEMBLY POINT',
    'ระวังไฟฟ้าแรงสูง': 'DANGER HIGH VOLTAGE',
    'เขตห้ามเข้า': 'RESTRICTED AREA',
    'สวมอุปกรณ์ป้องกัน': 'WEAR PPE',
    
    // Waste / Scrap
    'ถังขยะทั่วไป': 'GENERAL WASTE',
    'ถังขยะอันตราย': 'HAZARDOUS WASTE',
    'ถังขยะรีไซเคิล': 'RECYCLE BIN',
    'เศษของเสีย': 'SCRAP / DEFECTIVE',
    'ชิ้นงานเสีย (NG)': 'NG PARTS',
    'ชิ้นงานดี (OK)': 'OK PARTS',
    
    // Storage & Lean
    'วัตถุดิบ': 'RAW MATERIAL',
    'งานระหว่างทำ': 'WORK IN PROGRESS',
    'ของรอตรวจสอบ': 'HOLD FOR INSPECTION',
    'เครื่องมือช่าง': 'TOOLS',
    'ตู้เก็บเครื่องมือ': 'TOOL CABINET',
    'พื้นที่จอดรถเข็น': 'TROLLEY PARKING',
    'ทางเดิน': 'WALKWAY',
    'ตำแหน่งจัดเก็บ': 'STORAGE LOCATION',
    
    // Office / General
    'บอร์ดประชาสัมพันธ์': 'INFORMATION BOARD',
    'เอกสารรับเข้า': 'INCOMING DOCUMENTS',
    'เอกสารส่งออก': 'OUTGOING DOCUMENTS',
    'ของใช้สำนักงาน': 'OFFICE STATIONERIES',
    'เครื่องแต่งกายสำรอง': 'SPARE PPE'
};

function updateColorStandardGuide() {
    if (!colorStandardGuideEl) return;
    let guide = COLOR_GUIDES[state.themeColor];
    if (state.themeColor === 'custom') {
        guide = {
            title: `🎨 สีที่กำหนดเอง (${state.customColor})`,
            use: 'สีที่ปรับแต่งพิเศษนอกเหนือจากสีมาตรฐาน 5ส เช่น เฉดสีเฉพาะของแผนก หรือแบรนด์องค์กร',
            textStyle: `color: ${state.customColor};`
        };
    }
    if (!guide) guide = COLOR_GUIDES.blue;
    colorStandardGuideEl.innerHTML = `
        <strong style="${guide.textStyle}">${guide.title}</strong>
        <div class="guide-use">${guide.use}</div>
    `;
}

// 2. Application State variables
let state = {
    paperSize: 'A4',
    paperOrientation: 'landscape',
    pageMargin: 10, // mm
    labelGap: 2, // mm
    labelWidth: 80, // mm
    labelHeight: 40, // mm
    customSizeActive: false,
    layoutStyle: 'header', // header, solid, border, hazard, redtag
    themeColor: 'blue', // blue, red, yellow, green, black, white, custom
    customColor: '#3b82f6', // custom hex RGB code
    codeType: 'none', // none, qr, barcode
    fontSizeModifier: 100, // %
    fontAlign: 'center', // center, left, right
    selectedIcon: 'none',
    zoom: 80, // %
    labels: [], // parsed objects {title, desc}
    inputMode: 'batch', // batch or single
    singleTitle: '',
    singleDesc: '',
    singleCopiesMode: 'fill', // fill or custom
    singleQty: 10
};

// Sample 5S Data
const SAMPLE_LABELS = `ถังขยะอันตราย | HAZARDOUS WASTE
ถังขยะรีไซเคิล | RECYCLE BIN
วัตถุดิบรอตรวจสอบ | HOLD FOR INSPECTION
วัตถุดิบผ่านการล้าง | CLEANED MATERIAL
พื้นที่จอดรถเข็น | TROLLEY PARKING
ตู้เก็บเครื่องมือ | TOOL CABINET
ถังดับเพลิงเบอร์ 01 | FIRE EXTINGUISHER 01
จุดล้างตาฉุกเฉิน | EMERGENCY EYE WASH
บอร์ดประชาสัมพันธ์ | INFORMATION BOARD
โปรดสวมแว่นตานิรภัย | WEAR SAFETY GLASSES
ป้ายสีแดง | RED TAG AREA`;

// DOM Elements
const paperSizeEl = document.getElementById('paper-size');
const paperOrientationEl = document.getElementById('paper-orientation');
const pageMarginEl = document.getElementById('page-margin');
const labelGapEl = document.getElementById('label-gap');
const customSizeCheckbox = document.getElementById('custom-size-checkbox');
const customSizeInputs = document.getElementById('custom-size-inputs');
const labelWidthEl = document.getElementById('label-width');
const labelHeightEl = document.getElementById('label-height');
const fontSizeEl = document.getElementById('font-size');
const fontSizeValEl = document.getElementById('font-size-val');
const fontAlignEl = document.getElementById('font-align');
const printBtn = document.getElementById('print-btn');
const zoomInBtn = document.getElementById('zoom-in');
const zoomOutBtn = document.getElementById('zoom-out');
const zoomLevelEl = document.getElementById('zoom-level');
const sheetsContainer = document.getElementById('sheets-container');
const statsPerPageEl = document.getElementById('stats-per-page');
const statsTotalPagesEl = document.getElementById('stats-total-pages');
const statsTotalLabelsEl = document.getElementById('stats-total-labels');
const iconSelectorEl = document.getElementById('icon-selector');
const printAlertBoxEl = document.getElementById('print-alert-box');

// Single Mode Elements
const modeBatchContainer = document.getElementById('mode-batch-container');
const modeSingleContainer = document.getElementById('mode-single-container');
const singleTitleEl = document.getElementById('single-title');
const singleDescEl = document.getElementById('single-desc');
const singleCopiesModeEl = document.getElementById('single-copies-mode');
const singleQtyContainerEl = document.getElementById('single-qty-container');
const singleQtyEl = document.getElementById('single-qty');

// Table Row Editor Elements
const labelsListRows = document.getElementById('labels-list-rows');
const addRowBtn = document.getElementById('add-row-btn');
const bulkImportBtn = document.getElementById('bulk-import-btn');
const clearAllRowsBtn = document.getElementById('clear-all-rows-btn');

// Bulk Import Modal Elements
const importModal = document.getElementById('import-modal');
const importTextarea = document.getElementById('import-textarea');
const importCancelBtn = document.getElementById('import-cancel-btn');
const importSubmitBtn = document.getElementById('import-submit-btn');

// Color Guide Element
const colorStandardGuideEl = document.getElementById('color-standard-guide');

// Barcode / QR Code Integration
const codeTypeEl = document.getElementById('code-type');

// Template Manager Elements
const templateNameInput = document.getElementById('template-name-input');
const templateSaveBtn = document.getElementById('template-save-btn');
const templateSelect = document.getElementById('template-select');
const templateLoadBtn = document.getElementById('template-load-btn');
const templateDeleteBtn = document.getElementById('template-delete-btn');
const templateExportBtn = document.getElementById('template-export-btn');
const templateImportBtn = document.getElementById('template-import-btn');
const templateFileInput = document.getElementById('template-file-input');

// Bilingual Dictionary
const quickDictPanel = document.getElementById('quick-dict-panel');

// Custom Color Picker Elements
const customColorPickerEl = document.getElementById('custom-color-picker');
const customColorContainerEl = document.querySelector('.custom-color-container');

// Initialize the Application
function init() {
    setupIconSelector();
    loadStateFromStorage();
    bindEvents();
    
    // Default sample texts on first open if list is empty
    if (state.labels.length === 0) {
        state.labels = parseRawText(SAMPLE_LABELS);
    }
    
    updateInputsFromState();
    updateColorStandardGuide();
    renderTemplateSelect();
    setupBilingualDictionary();
    renderLabelsTable();
    updatePrintStyles();
    calculateAndRender();
}

let activeIconCategory = 'offline';

// Generate the clickable Icon Selector grid and category tabs
function setupIconSelector() {
    // Auto-detect category of selectedIcon on load/setup
    if (state.selectedIcon && state.selectedIcon.startsWith('google:')) {
        const iconName = state.selectedIcon.replace('google:', '');
        let foundCat = null;
        Object.keys(GOOGLE_ICONS).forEach(cat => {
            if (GOOGLE_ICONS[cat][iconName]) {
                foundCat = cat;
            }
        });
        if (foundCat) {
            activeIconCategory = foundCat;
        }
    } else if (state.selectedIcon && state.selectedIcon !== 'none' && !state.selectedIcon.startsWith('google:')) {
        activeIconCategory = 'offline';
    }
    
    // Update tab active classes in DOM based on activeIconCategory
    document.querySelectorAll('.icon-tab').forEach(t => {
        t.classList.remove('active');
        if (t.dataset.cat === activeIconCategory) t.classList.add('active');
    });
    
    // Initial render
    renderIconOptionsGrid();
}

// Render the icons within the selected category
function renderIconOptionsGrid() {
    if (!iconSelectorEl) return;
    iconSelectorEl.innerHTML = '';
    
    // Add "❌ No Icon" option first in every category
    const noneBtn = document.createElement('button');
    noneBtn.type = 'button';
    noneBtn.className = `icon-option ${state.selectedIcon === 'none' ? 'active' : ''}`;
    noneBtn.dataset.icon = 'none';
    noneBtn.title = '❌ No Icon';
    noneBtn.innerHTML = '<span style="font-size:12px;">✖️</span>';
    noneBtn.addEventListener('click', () => {
        document.querySelectorAll('.icon-option').forEach(el => el.classList.remove('active'));
        noneBtn.classList.add('active');
        state.selectedIcon = 'none';
        saveStateToStorage();
        calculateAndRender();
    });
    iconSelectorEl.appendChild(noneBtn);
    
    if (activeIconCategory === 'offline') {
        // Render local SVG icons
        Object.keys(ICONS).forEach(key => {
            if (key === 'none') return;
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = `icon-option ${state.selectedIcon === key ? 'active' : ''}`;
            btn.dataset.icon = key;
            btn.title = ICONS[key].label;
            btn.innerHTML = ICONS[key].svg;
            
            btn.addEventListener('click', () => {
                document.querySelectorAll('.icon-option').forEach(el => el.classList.remove('active'));
                btn.classList.add('active');
                state.selectedIcon = key;
                saveStateToStorage();
                calculateAndRender();
            });
            iconSelectorEl.appendChild(btn);
        });
    } else {
        // Render Google Material Symbols
        const catIcons = GOOGLE_ICONS[activeIconCategory];
        if (catIcons) {
            Object.keys(catIcons).forEach(key => {
                const iconDef = catIcons[key];
                const fullKey = `google:${iconDef.name}`;
                
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = `icon-option ${state.selectedIcon === fullKey ? 'active' : ''}`;
                btn.dataset.icon = fullKey;
                btn.title = iconDef.label;
                btn.innerHTML = `<span class="material-symbols-outlined" style="font-size: 20px;">${iconDef.name}</span>`;
                
                btn.addEventListener('click', () => {
                    document.querySelectorAll('.icon-option').forEach(el => el.classList.remove('active'));
                    btn.classList.add('active');
                    state.selectedIcon = fullKey;
                    saveStateToStorage();
                    calculateAndRender();
                });
                iconSelectorEl.appendChild(btn);
            });
        }
    }
}

// Bind event listeners to DOM
function bindEvents() {
    // Icon category tab clicks
    document.querySelectorAll('.icon-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.icon-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            activeIconCategory = tab.dataset.cat;
            renderIconOptionsGrid();
        });
    });

    // Paper settings
    paperSizeEl.addEventListener('change', (e) => {
        state.paperSize = e.target.value;
        updatePrintStyles();
        calculateAndRender();
        saveStateToStorage();
    });
    
    paperOrientationEl.addEventListener('change', (e) => {
        state.paperOrientation = e.target.value;
        updatePrintStyles();
        calculateAndRender();
        saveStateToStorage();
    });
    
    pageMarginEl.addEventListener('input', (e) => {
        state.pageMargin = Math.max(0, parseInt(e.target.value) || 0);
        calculateAndRender();
        saveStateToStorage();
    });
    
    labelGapEl.addEventListener('input', (e) => {
        state.labelGap = Math.max(0, parseInt(e.target.value) || 0);
        calculateAndRender();
        saveStateToStorage();
    });

    // Preset Sizes
    document.querySelectorAll('.preset-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (state.customSizeActive) return; // Ignore presets if custom size is forced checkbox
            
            document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            state.labelWidth = parseInt(btn.dataset.w);
            state.labelHeight = parseInt(btn.dataset.h);
            
            calculateAndRender();
            saveStateToStorage();
        });
    });

    // Custom Size toggle checkbox
    customSizeCheckbox.addEventListener('change', (e) => {
        state.customSizeActive = e.target.checked;
        if (state.customSizeActive) {
            customSizeInputs.classList.remove('hidden');
            document.querySelectorAll('.preset-btn').forEach(b => b.classList.add('disabled'));
            // Set dimensions from the numeric inputs
            state.labelWidth = parseInt(labelWidthEl.value) || 80;
            state.labelHeight = parseInt(labelHeightEl.value) || 40;
        } else {
            customSizeInputs.classList.add('hidden');
            document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('disabled'));
            // Re-apply active preset size
            const activePreset = document.querySelector('.preset-btn.active');
            if (activePreset) {
                state.labelWidth = parseInt(activePreset.dataset.w);
                state.labelHeight = parseInt(activePreset.dataset.h);
            }
        }
        calculateAndRender();
        saveStateToStorage();
    });

    labelWidthEl.addEventListener('input', (e) => {
        if (state.customSizeActive) {
            state.labelWidth = Math.max(10, parseInt(e.target.value) || 10);
            calculateAndRender();
            saveStateToStorage();
        }
    });

    labelHeightEl.addEventListener('input', (e) => {
        if (state.customSizeActive) {
            state.labelHeight = Math.max(10, parseInt(e.target.value) || 10);
            calculateAndRender();
            saveStateToStorage();
        }
    });

    // Layout Styles Picker
    document.querySelectorAll('.style-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.style-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.layoutStyle = btn.dataset.style;
            calculateAndRender();
            saveStateToStorage();
        });
    });

    // Theme Color Picker Presets
    document.querySelectorAll('.color-bubble').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.color-bubble').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Remove active style from custom color container
            if (customColorContainerEl) {
                customColorContainerEl.classList.remove('active');
            }
            
            state.themeColor = btn.dataset.color;
            updateColorStandardGuide();
            calculateAndRender();
            saveStateToStorage();
        });
    });

    // Custom Color Input Listener
    if (customColorPickerEl) {
        customColorPickerEl.addEventListener('input', (e) => {
            state.customColor = e.target.value;
            state.themeColor = 'custom';
            
            // Highlight custom container and un-highlight presets
            document.querySelectorAll('.color-bubble').forEach(b => b.classList.remove('active'));
            if (customColorContainerEl) {
                customColorContainerEl.classList.add('active');
            }
            
            updateColorStandardGuide();
            calculateAndRender();
            saveStateToStorage();
        });
    }

    // Font settings
    fontSizeEl.addEventListener('input', (e) => {
        state.fontSizeModifier = parseInt(e.target.value) || 100;
        fontSizeValEl.innerText = `${state.fontSizeModifier}%`;
        calculateAndRender();
        saveStateToStorage();
    });

    fontAlignEl.addEventListener('change', (e) => {
        state.fontAlign = e.target.value;
        calculateAndRender();
        saveStateToStorage();
    });

    // Row Editor: Add new row
    addRowBtn.addEventListener('click', () => {
        addLabelRow();
    });

    // Row Editor: Clear all rows
    clearAllRowsBtn.addEventListener('click', () => {
        if (confirm('คุณต้องการลบข้อความป้ายทั้งหมดหรือไม่?')) {
            state.labels = [];
            renderLabelsTable();
            calculateAndRender();
            saveStateToStorage();
        }
    });

    // Bulk Import Modal Trigger
    bulkImportBtn.addEventListener('click', () => {
        importTextarea.value = '';
        importModal.classList.remove('hidden');
        importTextarea.focus();
    });

    importCancelBtn.addEventListener('click', () => {
        importModal.classList.add('hidden');
    });

    importSubmitBtn.addEventListener('click', () => {
        const text = importTextarea.value.trim();
        if (text) {
            const parsed = parseRawText(text);
            state.labels = parsed; // Override or concat? Overriding is usually cleaner for paste/import, like the old batch-input textarea
            renderLabelsTable();
            calculateAndRender();
            saveStateToStorage();
        }
        importModal.classList.add('hidden');
    });

    // Zoom Buttons
    zoomInBtn.addEventListener('click', () => {
        if (state.zoom < 150) {
            state.zoom += 10;
            updateZoom();
        }
    });

    zoomOutBtn.addEventListener('click', () => {
        if (state.zoom > 30) {
            state.zoom -= 10;
            updateZoom();
        }
    });

    // Print Command
    printBtn.addEventListener('click', () => {
        window.print();
    });

    // Tabs switcher
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            state.inputMode = btn.dataset.mode;
            if (state.inputMode === 'batch') {
                modeBatchContainer.classList.remove('hidden');
                modeSingleContainer.classList.add('hidden');
            } else {
                modeBatchContainer.classList.add('hidden');
                modeSingleContainer.classList.remove('hidden');
            }
            
            calculateAndRender();
            saveStateToStorage();
        });
    });

    // Single input changes
    singleTitleEl.addEventListener('input', (e) => {
        state.singleTitle = e.target.value;
        calculateAndRender();
        saveStateToStorage();
    });

    singleDescEl.addEventListener('input', (e) => {
        state.singleDesc = e.target.value;
        calculateAndRender();
        saveStateToStorage();
    });

    singleCopiesModeEl.addEventListener('change', (e) => {
        state.singleCopiesMode = e.target.value;
        if (state.singleCopiesMode === 'custom') {
            singleQtyContainerEl.classList.remove('hidden');
        } else {
            singleQtyContainerEl.classList.add('hidden');
        }
        calculateAndRender();
        saveStateToStorage();
    });

    singleQtyEl.addEventListener('input', (e) => {
        state.singleQty = Math.max(1, parseInt(e.target.value) || 1);
        calculateAndRender();
        saveStateToStorage();
    });

    // Barcode / QR Code Integration
    if (codeTypeEl) {
        codeTypeEl.addEventListener('change', (e) => {
            state.codeType = e.target.value;
            calculateAndRender();
            saveStateToStorage();
        });
    }

    // Template Manager button click events
    if (templateSaveBtn) {
        templateSaveBtn.addEventListener('click', () => {
            const name = templateNameInput.value.trim();
            if (!name) {
                alert('กรุณากรอกชื่อชุดป้ายก่อนบันทึกครับ');
                return;
            }
            saveTemplateToDatabase(name);
            templateNameInput.value = '';
        });
    }

    if (templateLoadBtn) {
        templateLoadBtn.addEventListener('click', () => {
            const name = templateSelect.value;
            if (!name) {
                alert('กรุณาเลือกเทมเพลตที่ต้องการโหลดใช้งานครับ');
                return;
            }
            loadTemplateFromDatabase(name);
        });
    }

    if (templateDeleteBtn) {
        templateDeleteBtn.addEventListener('click', () => {
            const name = templateSelect.value;
            if (!name) {
                alert('กรุณาเลือกเทมเพลตที่ต้องการลบครับ');
                return;
            }
            if (confirm(`คุณต้องการลบชุดแม่แบบป้าย "${name}" ใช่หรือไม่?`)) {
                deleteTemplateFromDatabase(name);
            }
        });
    }

    if (templateExportBtn) {
        templateExportBtn.addEventListener('click', () => {
            exportTemplatesToFile();
        });
    }

    if (templateImportBtn) {
        templateImportBtn.addEventListener('click', () => {
            templateFileInput.click();
        });
    }

    if (templateFileInput) {
        templateFileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;
            importTemplatesFromFile(file);
            templateFileInput.value = '';
        });
    }
}

// Read and parse text values from raw text to labels array
function parseRawText(text) {
    const lines = text.split('\n');
    const result = [];
    lines.forEach(line => {
        const trimmed = line.trim();
        if (!trimmed) return;

        // Supports split by pipe "|" or comma "," or tab "\t"
        let parts = trimmed.split('|');
        if (parts.length === 1) {
            parts = trimmed.split('\t');
        }
        if (parts.length === 1) {
            parts = trimmed.split(',');
        }

        const title = parts[0] ? parts[0].trim() : '';
        const desc = parts[1] ? parts[1].trim() : '';
        result.push({ title, desc });
    });
    return result;
}

// Render dynamic rows in list table
function renderLabelsTable() {
    if (!labelsListRows) return;
    labelsListRows.innerHTML = '';
    
    if (state.labels.length === 0) {
        labelsListRows.innerHTML = `<div style="padding: 1rem; text-align: center; color: var(--text-muted); font-size: 0.8rem; width: 100%;">ยังไม่มีรายการป้าย กดปุ่มด้านล่างเพื่อเพิ่มแถว</div>`;
        return;
    }

    state.labels.forEach((item, index) => {
        const row = document.createElement('div');
        row.className = 'labels-list-row';
        row.dataset.index = index;
        
        row.innerHTML = `
            <div class="col-num">${index + 1}</div>
            <div class="col-title">
                <div class="col-title-container">
                    <input type="text" class="row-title-input" value="${item.title}" placeholder="ข้อความหลักที่ ${index + 1}">
                    <button type="button" class="row-translate-btn" title="แปลอังกฤษด่วน (Bilingual Translate)">🌐</button>
                </div>
            </div>
            <div class="col-desc">
                <input type="text" class="row-desc-input" value="${item.desc}" placeholder="รายละเอียด...">
            </div>
            <div class="col-action">
                <button type="button" class="row-del-btn" title="Delete">🗑️</button>
            </div>
        `;
        
        // Inputs & buttons refs
        const titleInput = row.querySelector('.row-title-input');
        const descInput = row.querySelector('.row-desc-input');
        const delBtn = row.querySelector('.row-del-btn');
        const translateBtn = row.querySelector('.row-translate-btn');
        
        // Input updates
        titleInput.addEventListener('input', (e) => {
            state.labels[index].title = e.target.value;
            calculateAndRender();
            saveStateToStorage();
        });
        
        descInput.addEventListener('input', (e) => {
            state.labels[index].desc = e.target.value;
            calculateAndRender();
            saveStateToStorage();
        });
        
        // Translate button click
        translateBtn.addEventListener('click', () => {
            const currentTitle = state.labels[index].title.trim();
            if (BILINGUAL_DICTIONARY[currentTitle]) {
                state.labels[index].desc = BILINGUAL_DICTIONARY[currentTitle];
                renderLabelsTable();
                calculateAndRender();
                saveStateToStorage();
                
                // Refocus desc of the translated row
                const updatedRow = labelsListRows.querySelector(`[data-index="${index}"]`);
                if (updatedRow) {
                    updatedRow.querySelector('.row-desc-input').focus();
                }
            } else {
                let found = false;
                const keys = Object.keys(BILINGUAL_DICTIONARY);
                for (let k of keys) {
                    if (k.toLowerCase() === currentTitle.toLowerCase()) {
                        state.labels[index].desc = BILINGUAL_DICTIONARY[k];
                        found = true;
                        break;
                    }
                }
                
                if (found) {
                    renderLabelsTable();
                    calculateAndRender();
                    saveStateToStorage();
                    
                    const updatedRow = labelsListRows.querySelector(`[data-index="${index}"]`);
                    if (updatedRow) {
                        updatedRow.querySelector('.row-desc-input').focus();
                    }
                } else {
                    alert(`ไม่พบคำแปลสำเร็จรูปของคำว่า "${currentTitle}" ในคลังคำศัพท์หลัก คุณสามารถพิมพ์คำแปลอังกฤษด้วยตนเองได้ครับ`);
                }
            }
        });
        
        // Enter key navigation
        const handleKeydown = (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                if (index === state.labels.length - 1) {
                    addLabelRow();
                } else {
                    const nextRow = labelsListRows.querySelector(`[data-index="${index + 1}"]`);
                    if (nextRow) {
                        nextRow.querySelector('.row-title-input').focus();
                    }
                }
            }
        };
        titleInput.addEventListener('keydown', handleKeydown);
        descInput.addEventListener('keydown', handleKeydown);
        
        // Delete button click
        delBtn.addEventListener('click', () => {
            state.labels.splice(index, 1);
            renderLabelsTable();
            calculateAndRender();
            saveStateToStorage();
        });
        
        labelsListRows.appendChild(row);
    });
}

// Append new label row
function addLabelRow() {
    state.labels.push({ title: '', desc: '' });
    renderLabelsTable();
    calculateAndRender();
    saveStateToStorage();
    
    // Focus the new input
    const lastRow = labelsListRows.querySelector(`[data-index="${state.labels.length - 1}"]`);
    if (lastRow) {
        lastRow.querySelector('.row-title-input').focus();
    }
}

// Update DOM elements on page reload/setup
function updateInputsFromState() {
    paperSizeEl.value = state.paperSize;
    paperOrientationEl.value = state.paperOrientation;
    pageMarginEl.value = state.pageMargin;
    labelGapEl.value = state.labelGap;
    
    // Sizes
    customSizeCheckbox.checked = state.customSizeActive;
    if (state.customSizeActive) {
        customSizeInputs.classList.remove('hidden');
        labelWidthEl.value = state.labelWidth;
        labelHeightEl.value = state.labelHeight;
        document.querySelectorAll('.preset-btn').forEach(b => b.classList.add('disabled'));
    } else {
        customSizeInputs.classList.add('hidden');
        document.querySelectorAll('.preset-btn').forEach(b => {
            b.classList.remove('active');
            if (parseInt(b.dataset.w) === state.labelWidth && parseInt(b.dataset.h) === state.labelHeight) {
                b.classList.add('active');
            }
        });
    }

    // Styles
    document.querySelectorAll('.style-btn').forEach(b => {
        b.classList.remove('active');
        if (b.dataset.style === state.layoutStyle) b.classList.add('active');
    });

    // Colors Preset Selection
    document.querySelectorAll('.color-bubble').forEach(b => {
        b.classList.remove('active');
        if (b.dataset.color === state.themeColor) b.classList.add('active');
    });

    // Custom Color Input value and active border
    if (customColorPickerEl) {
        customColorPickerEl.value = state.customColor || '#3b82f6';
    }
    if (customColorContainerEl) {
        if (state.themeColor === 'custom') {
            customColorContainerEl.classList.add('active');
        } else {
            customColorContainerEl.classList.remove('active');
        }
    }

    // Fonts & Alignment
    fontSizeEl.value = state.fontSizeModifier;
    fontSizeValEl.innerText = `${state.fontSizeModifier}%`;
    fontAlignEl.value = state.fontAlign;

    // Code Integration
    if (codeTypeEl) {
        codeTypeEl.value = state.codeType || 'none';
    }

    // Input Mode Tabs active classes
    document.querySelectorAll('.tab-btn').forEach(b => {
        b.classList.remove('active');
        if (b.dataset.mode === state.inputMode) b.classList.add('active');
    });

    if (state.inputMode === 'batch') {
        modeBatchContainer.classList.remove('hidden');
        modeSingleContainer.classList.add('hidden');
    } else {
        modeBatchContainer.classList.add('hidden');
        modeSingleContainer.classList.remove('hidden');
    }

    // Populate Single Inputs
    singleTitleEl.value = state.singleTitle || '';
    singleDescEl.value = state.singleDesc || '';
    singleCopiesModeEl.value = state.singleCopiesMode;
    singleQtyEl.value = state.singleQty;

    if (state.singleCopiesMode === 'custom') {
        singleQtyContainerEl.classList.remove('hidden');
    } else {
        singleQtyContainerEl.classList.add('hidden');
    }

    // Zoom
    updateZoom();
}

function updateZoom() {
    zoomLevelEl.innerText = `${state.zoom}%`;
    sheetsContainer.style.transform = `scale(${state.zoom / 100})`;
}

// Dynamically insert Print Stylesheet configurations
function updatePrintStyles() {
    let existingStyle = document.getElementById('dynamic-print-style');
    if (existingStyle) {
        existingStyle.remove();
    }
    
    const styleEl = document.createElement('style');
    styleEl.id = 'dynamic-print-style';
    
    // Write dynamic margin size and page dimensions
    styleEl.innerHTML = `
        @media print {
            @page {
                size: ${state.paperSize} ${state.paperOrientation};
                margin: 0;
            }
        }
    `;
    document.head.appendChild(styleEl);
}

// Core layout calculation and rendering engine
function calculateAndRender() {
    // 1. Get paper dimensions in mm
    let paperW, paperH;
    if (state.paperSize === 'A3') {
        paperW = 420;
        paperH = 297;
    } else { // default A4
        paperW = 297;
        paperH = 210;
    }

    // Adjust for orientation
    if (state.paperOrientation === 'portrait') {
        const temp = paperW;
        paperW = paperH;
        paperH = temp;
    }

    // 2. Set dimensions as CSS variables on document root
    const root = document.documentElement;
    root.style.setProperty('--page-width', `${paperW}mm`);
    root.style.setProperty('--page-height', `${paperH}mm`);
    root.style.setProperty('--page-padding', `${state.pageMargin}mm`);
    root.style.setProperty('--label-width', `${state.labelWidth}mm`);
    root.style.setProperty('--label-height', `${state.labelHeight}mm`);
    root.style.setProperty('--label-gap', `${state.labelGap}mm`);
    root.style.setProperty('--font-size-factor', state.fontSizeModifier / 100);

    // If color theme is custom, calculate brightness contrast and set root properties
    if (state.themeColor === 'custom') {
        const primary = state.customColor || '#3b82f6';
        const contrast = getContrastColor(primary);
        root.style.setProperty('--theme-custom-primary', primary);
        root.style.setProperty('--theme-custom-text', contrast);
        root.style.setProperty('--theme-custom-contrast', primary);
        root.style.setProperty('--theme-custom-desc-text', contrast === '#ffffff' ? '#cbd5e1' : '#475569');
    }

    // 3. Compute how many labels fit per sheet
    const availW = paperW - (state.pageMargin * 2);
    const availH = paperH - (state.pageMargin * 2);

    // Width formula: cols * labelWidth + (cols - 1) * labelGap <= availW
    // cols * (labelWidth + labelGap) - labelGap <= availW
    const cols = Math.floor((availW + state.labelGap) / (state.labelWidth + state.labelGap));
    const rows = Math.floor((availH + state.labelGap) / (state.labelHeight + state.labelGap));

    const clampedCols = Math.max(0, cols);
    const clampedRows = Math.max(0, rows);
    const labelsPerPage = clampedCols * clampedRows;

    root.style.setProperty('--grid-cols', clampedCols);
    root.style.setProperty('--grid-rows', clampedRows);

    // 4. Determine list of labels to render
    let labelsToRender = [];
    if (state.inputMode === 'batch') {
        labelsToRender = [...state.labels];
        if (labelsToRender.length === 0) {
            // Render 1 sample label if empty
            labelsToRender.push({ title: 'ป้ายตัวอย่าง | SAMPLE', desc: 'โปรแกรมจัดวางอัตโนมัติ' });
        }
    } else {
        // Single Mode repeated labels
        let title = state.singleTitle;
        let desc = state.singleDesc;
        
        // If empty, use a placeholder
        if (!title && !desc) {
            title = 'ป้ายซ้ำตัวอย่าง';
            desc = 'ป้ายเดี่ยวซ้ำทั้งหน้า';
        }
        
        let targetCount = 0;
        if (state.singleCopiesMode === 'fill') {
            targetCount = labelsPerPage;
        } else {
            targetCount = state.singleQty;
        }
        
        for (let i = 0; i < targetCount; i++) {
            labelsToRender.push({ title, desc });
        }
    }

    // 5. Generate and layout pages
    sheetsContainer.innerHTML = '';
    
    if (labelsPerPage <= 0) {
        sheetsContainer.innerHTML = '<div class="sheet" style="display:flex; align-items:center; justify-content:center; color:#ef4444; font-weight:bold;">ขนาดป้ายใหญ่เกินขอบเขตหน้ากระดาษ!</div>';
        statsPerPageEl.innerText = '0';
        statsTotalPagesEl.innerText = '0';
        statsTotalLabelsEl.innerText = '0';
        return;
    }

    const totalLabelsCount = labelsToRender.length;
    const totalPages = Math.ceil(totalLabelsCount / labelsPerPage);

    for (let pageIdx = 0; pageIdx < totalPages; pageIdx++) {
        // Create Sheet Element
        const sheet = document.createElement('div');
        sheet.className = 'sheet';
        
        // Create Grid inside Sheet
        const grid = document.createElement('div');
        grid.className = 'sheet-grid';
        
        // Fill Grid with labels belonging to this page
        const startIdx = pageIdx * labelsPerPage;
        const endIdx = Math.min(startIdx + labelsPerPage, totalLabelsCount);
        
        for (let i = startIdx; i < endIdx; i++) {
            const labelData = labelsToRender[i];
            const labelBox = createLabelDOM(labelData);
            grid.appendChild(labelBox);
        }
        
        sheet.appendChild(grid);
        sheetsContainer.appendChild(sheet);
    }

    // 6. Update statistics text
    statsPerPageEl.innerText = labelsPerPage;
    statsTotalPagesEl.innerText = totalPages;
    statsTotalLabelsEl.innerText = state.inputMode === 'batch' ? state.labels.length : labelsToRender.length;

    // 6.5. Smart Print Waste Alert
    if (printAlertBoxEl) {
        const remainder = totalLabelsCount % labelsPerPage;
        if (totalPages > 1 && remainder > 0 && remainder <= Math.ceil(labelsPerPage * 0.25)) {
            printAlertBoxEl.innerHTML = `
                <strong>⚠️ คำเตือน: พบเศษป้ายหน้าสุดท้าย</strong>
                พบป้ายส่วนเกินเพียง ${remainder} ใบ ตกไปอยู่ที่แผ่นที่ ${totalPages} (มีพื้นที่เหลือว่างเยอะมาก)
                เพื่อประหยัดกระดาษตามหลัก Lean/5S แนะนำให้ลดขนาดลงเล็กน้อยเพื่อให้พอดี
                <button type="button" id="auto-fit-btn" class="optimize-btn">⚡ ปรับขนาดอัตโนมัติให้จบใน 1 แผ่น</button>
            `;
            printAlertBoxEl.classList.remove('hidden');

            const autoFitBtn = document.getElementById('auto-fit-btn');
            if (autoFitBtn) {
                autoFitBtn.addEventListener('click', autoOptimizeToFitOnePage);
            }
        } else {
            printAlertBoxEl.classList.add('hidden');
            printAlertBoxEl.innerHTML = '';
        }
    }

    // 7. Dynamic QR Code Rendering using qrcode.js
    if (state.codeType === 'qr') {
        document.querySelectorAll('.qr-container').forEach(el => {
            const txt = el.dataset.text || 'LABEL';
            el.innerHTML = ''; // clear fallback
            try {
                new QRCode(el, {
                    text: txt,
                    width: 90,
                    height: 90,
                    colorDark: "#000000",
                    colorLight: "#ffffff",
                    correctLevel: QRCode.CorrectLevel.M
                });
            } catch(e) {
                console.warn('QR Generation error', e);
            }
        });
    }
}

// Create a DOM node representing one single label box
function createLabelDOM(data) {
    const labelBox = document.createElement('div');
    // Class combinations based on selections
    labelBox.className = `label-box style-${state.layoutStyle} theme-${state.themeColor} align-${state.fontAlign}`;

    const inner = document.createElement('div');
    inner.className = 'label-inner';

    const titleText = data.title || 'LABEL';
    const descText = data.desc || '';

    // Insert SVG icon or Google Material Symbol if selected
    let iconHTML = '';
    if (state.selectedIcon !== 'none') {
        if (state.selectedIcon.startsWith('google:')) {
            const iconName = state.selectedIcon.replace('google:', '');
            iconHTML = `<div class="label-icon"><span class="material-symbols-outlined label-icon-google">${iconName}</span></div>`;
        } else if (ICONS[state.selectedIcon]) {
            iconHTML = `<div class="label-icon">${ICONS[state.selectedIcon].svg}</div>`;
        }
    }

    if (state.layoutStyle === 'redtag') {
        // Red Tag inspection form layout
        let detailRows = '';
        if (descText) {
            const parts = descText.split(/[\/|]/);
            parts.forEach(part => {
                const trimmedPart = part.trim();
                if (!trimmedPart) return;
                
                const colIdx = trimmedPart.indexOf(':');
                if (colIdx !== -1) {
                    const key = trimmedPart.substring(0, colIdx).trim();
                    const val = trimmedPart.substring(colIdx + 1).trim();
                    detailRows += `
                        <tr>
                            <td class="label-cell">${key}</td>
                            <td class="value-cell">${val}</td>
                        </tr>
                    `;
                } else {
                    detailRows += `
                        <tr>
                            <td colspan="2" class="value-cell" style="text-align:center; font-style:italic;">${trimmedPart}</td>
                        </tr>
                    `;
                }
            });
        }

        inner.innerHTML = `
            <div class="label-header">
                🔴 RED TAG / ป้ายแดงสะสาง
            </div>
            <div class="label-body">
                <table class="redtag-table">
                    <tr>
                        <td class="label-cell">ชื่อวัตถุ/สิ่งของ</td>
                        <td class="value-cell" style="font-weight:700; color:#d32f2f;">${titleText}</td>
                    </tr>
                    ${detailRows}
                </table>
            </div>
        `;
    } else if (state.codeType !== 'none') {
        // Render QR Code or Barcode alongside text side-by-side
        let codeHTML = '';
        if (state.codeType === 'qr') {
            codeHTML = `<div class="qr-container" data-text="${titleText}"></div>`;
        } else if (state.codeType === 'barcode') {
            const barcodeSVG = generateBarcodeSVG(titleText);
            codeHTML = `
                <div class="barcode-container">
                    ${barcodeSVG}
                    <div class="barcode-text">${titleText.toUpperCase().replace(/[^A-Z0-9\-\.\ \$\/\+\%]/g, '')}</div>
                </div>
            `;
        }

        if (state.layoutStyle === 'header') {
            inner.innerHTML = `
                <div class="label-header">
                    ${iconHTML}
                    <div class="label-title">${titleText}</div>
                </div>
                <div class="label-body" style="padding:0; flex-direction:row; display:flex;">
                    <div class="label-text-side" style="padding: 2mm 3mm;">
                        ${descText ? `<div class="label-desc">${descText}</div>` : ''}
                    </div>
                    <div class="label-code-side">
                        ${codeHTML}
                    </div>
                </div>
            `;
        } else {
            inner.innerHTML = `
                <div class="label-main-layout">
                    <div class="label-text-side" style="padding: 2mm 3mm;">
                        ${iconHTML}
                        <div class="label-title">${titleText}</div>
                        ${descText ? `<div class="label-desc">${descText}</div>` : ''}
                    </div>
                    <div class="label-code-side">
                        ${codeHTML}
                    </div>
                </div>
            `;
        }
    } else {
        // Standard full width layouts (header, solid, border, hazard)
        if (state.layoutStyle === 'header') {
            inner.innerHTML = `
                <div class="label-header">
                    ${iconHTML}
                    <div class="label-title">${titleText}</div>
                </div>
                <div class="label-body">
                    ${descText ? `<div class="label-desc">${descText}</div>` : ''}
                </div>
            `;
        } else {
            inner.innerHTML = `
                ${iconHTML}
                <div class="label-title">${titleText}</div>
                ${descText ? `<div class="label-desc">${descText}</div>` : ''}
            `;
        }
    }

    labelBox.appendChild(inner);
    return labelBox;
}

// Save options to localStorage for templating persistence
function saveStateToStorage() {
    try {
        const stateCopy = { ...state };
        localStorage.setItem('5s_labelexpress_state', JSON.stringify(stateCopy));
    } catch(err) {
        console.warn('Failed to save state to localStorage', err);
    }
}

// Load options from localStorage
function loadStateFromStorage() {
    try {
        const saved = localStorage.getItem('5s_labelexpress_state');
        if (saved) {
            const parsed = JSON.parse(saved);
            state = { ...state, ...parsed };
            
            // Backward compatibility upgrade: parse rawText if labels array is missing
            if (!parsed.labels && parsed.rawText) {
                state.labels = parseRawText(parsed.rawText);
            }
        }
    } catch(err) {
        console.warn('Failed to load state from localStorage', err);
    }
}

// Calculate contrast text color (black or white) automatically based on brightness
function getContrastColor(hexColor) {
    const hex = hexColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? '#1a1a1a' : '#ffffff';
}

// --- Barcode Code 39 Vector Generator ---
function generateBarcodeSVG(text) {
    const CODE39_MAP = {
        '0': '000110100', '1': '100100001', '2': '001100001', '3': '101100000',
        '4': '000110001', '5': '100110000', '6': '001110000', '7': '000100101',
        '8': '100100100', '9': '001100100', 'A': '100001001', 'B': '001001001',
        'C': '101001000', 'D': '000011001', 'E': '100011000', 'F': '001011000',
        'G': '000001101', 'H': '100001100', 'I': '001001100', 'J': '000011100',
        'K': '100000011', 'L': '001000011', 'M': '101000010', 'N': '000010011',
        'O': '100010010', 'P': '001010010', 'Q': '000000111', 'R': '100000110',
        'S': '001000110', 'T': '000010110', 'U': '110000001', 'V': '011000001',
        'W': '111000000', 'X': '010010001', 'Y': '110010000', 'Z': '011010000',
        '-': '010000101', '.': '110000100', ' ': '011000100', '$': '010101000',
        '/': '010100010', '+': '010001010', '%': '000101010', '*': '010010100'
    };

    let cleanText = text.toUpperCase().replace(/[^A-Z0-9\-\.\ \$\/\+\%]/g, '');
    if (!cleanText) cleanText = 'LABEL';

    const fullText = '*' + cleanText + '*';
    const narrowWidth = 1;
    const wideWidth = 2.5;
    const interGap = 1;

    let currentX = 0;
    let paths = '';

    for (let i = 0; i < fullText.length; i++) {
        const char = fullText[i];
        const pattern = CODE39_MAP[char] || CODE39_MAP['*'];

        for (let j = 0; j < 9; j++) {
            const isBar = (j % 2 === 0);
            const isWide = (pattern[j] === '1');
            const width = isWide ? wideWidth : narrowWidth;

            if (isBar) {
                paths += `<rect x="${currentX}" y="0" width="${width}" height="100" fill="#000000" />`;
            }
            currentX += width;
        }
        currentX += interGap;
    }

    return `
        <svg viewBox="0 0 ${currentX} 100" preserveAspectRatio="none" width="100%" height="100%">
            <rect x="0" y="0" width="${currentX}" height="100" fill="#ffffff" />
            ${paths}
        </svg>
    `;
}

// --- Bilingual Dictionary sidebar populator ---
function setupBilingualDictionary() {
    if (!quickDictPanel) return;
    quickDictPanel.innerHTML = '';

    Object.keys(BILINGUAL_DICTIONARY).forEach(thWord => {
        const enWord = BILINGUAL_DICTIONARY[thWord];
        const item = document.createElement('button');
        item.type = 'button';
        item.className = 'quick-dict-item';

        item.innerHTML = `
            <span class="th-word">${thWord}</span>
            <span class="en-word">${enWord}</span>
        `;

        item.addEventListener('click', () => {
            state.labels.push({ title: thWord, desc: enWord });
            renderLabelsTable();
            calculateAndRender();
            saveStateToStorage();

            const scrollArea = document.querySelector('.table-scroll-area');
            if (scrollArea) {
                scrollArea.scrollTop = scrollArea.scrollHeight;
            }
        });

        quickDictPanel.appendChild(item);
    });
}

// --- Templates Database Management ---
function renderTemplateSelect() {
    if (!templateSelect) return;
    templateSelect.innerHTML = '<option value="" selected>-- เลือกเทมเพลตที่บันทึกไว้ --</option>';

    try {
        const saved = localStorage.getItem('5s_labelexpress_saved_templates');
        if (saved) {
            const templates = JSON.parse(saved);
            Object.keys(templates).forEach(name => {
                const opt = document.createElement('option');
                opt.value = name;
                opt.innerText = name;
                templateSelect.appendChild(opt);
            });
        }
    } catch(err) {
        console.warn('Failed to load templates list', err);
    }
}

function saveTemplateToDatabase(name) {
    try {
        let templates = {};
        const saved = localStorage.getItem('5s_labelexpress_saved_templates');
        if (saved) {
            templates = JSON.parse(saved);
        }

        templates[name] = { ...state };
        localStorage.setItem('5s_labelexpress_saved_templates', JSON.stringify(templates));

        renderTemplateSelect();
        alert(`บันทึกชุดแม่แบบ "${name}" เรียบร้อยแล้วครับ!`);
    } catch(err) {
        console.error('Failed to save template', err);
        alert('เกิดข้อผิดพลาดในการบันทึกเทมเพลต');
    }
}

function loadTemplateFromDatabase(name) {
    try {
        const saved = localStorage.getItem('5s_labelexpress_saved_templates');
        if (saved) {
            const templates = JSON.parse(saved);
            if (templates[name]) {
                state = { ...state, ...templates[name] };
                if (!state.labels) state.labels = [];

                updateInputsFromState();
                updateColorStandardGuide();
                renderLabelsTable();
                updatePrintStyles();
                calculateAndRender();

                alert(`โหลดแม่แบบ "${name}" เรียบร้อยแล้ว!`);
            }
        }
    } catch(err) {
        console.error('Failed to load template', err);
        alert('เกิดข้อผิดพลาดในการโหลดเทมเพลต');
    }
}

function deleteTemplateFromDatabase(name) {
    try {
        const saved = localStorage.getItem('5s_labelexpress_saved_templates');
        if (saved) {
            const templates = JSON.parse(saved);
            if (templates[name]) {
                delete templates[name];
                localStorage.setItem('5s_labelexpress_saved_templates', JSON.stringify(templates));
                renderTemplateSelect();
                alert(`ลบชุดแม่แบบ "${name}" สำเร็จแล้ว!`);
            }
        }
    } catch(err) {
        console.error('Failed to delete template', err);
    }
}

function exportTemplatesToFile() {
    try {
        const saved = localStorage.getItem('5s_labelexpress_saved_templates');
        if (!saved || saved === '{}') {
            alert('ยังไม่มีประวัติเทมเพลตที่บันทึกไว้ให้ส่งออกครับ');
            return;
        }

        const blob = new Blob([saved], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `5s_labelexpress_templates_${new Date().toISOString().slice(0,10)}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    } catch(err) {
        console.error('Export templates error', err);
    }
}

function importTemplatesFromFile(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const importedData = JSON.parse(e.target.result);
            if (typeof importedData !== 'object' || importedData === null) {
                throw new Error('Invalid format');
            }

            let existing = {};
            const saved = localStorage.getItem('5s_labelexpress_saved_templates');
            if (saved) {
                existing = JSON.parse(saved);
            }

            const merged = { ...existing, ...importedData };
            localStorage.setItem('5s_labelexpress_saved_templates', JSON.stringify(merged));
            renderTemplateSelect();

            alert('นำเข้าไฟล์แม่แบบป้ายเรียบร้อยแล้ว!');
        } catch(err) {
            console.error('Import error', err);
            alert('เกิดข้อผิดพลาด: รูปแบบไฟล์ JSON ไม่ถูกต้อง');
        }
    };
    reader.readAsText(file);
}

// --- Smart Print Waste Auto-Optimization Algorithm ---
function autoOptimizeToFitOnePage() {
    // Save original dimensions in case we fail or need to rollback
    const originalWidth = state.labelWidth;
    const originalHeight = state.labelHeight;
    const originalGap = state.labelGap;
    const originalMargin = state.pageMargin;

    // Get total labels to render
    let totalLabelsCount = 0;
    if (state.inputMode === 'batch') {
        totalLabelsCount = state.labels.length || 1;
    } else {
        let labelsPerPage = getLabelsPerPageCapacity(state.labelWidth, state.labelHeight, state.labelGap, state.pageMargin);
        totalLabelsCount = state.singleCopiesMode === 'fill' ? labelsPerPage : state.singleQty;
    }

    let success = false;

    // 1. Try reducing gap first (down to 0.5mm, in 0.5mm steps)
    for (let g = state.labelGap; g >= 0.5; g -= 0.5) {
        let capacity = getLabelsPerPageCapacity(state.labelWidth, state.labelHeight, g, state.pageMargin);
        if (totalLabelsCount <= capacity) {
            state.labelGap = g;
            success = true;
            break;
        }
    }

    // 2. Try reducing margins (down to 3mm, in 1mm steps)
    if (!success) {
        for (let m = state.pageMargin; m >= 3; m -= 1) {
            let capacity = getLabelsPerPageCapacity(state.labelWidth, state.labelHeight, state.labelGap, m);
            if (totalLabelsCount <= capacity) {
                state.pageMargin = m;
                success = true;
                break;
            }
        }
    }

    // 3. Try shrinking width & height together (down to 15% reduction, in 1% steps)
    if (!success) {
        for (let pct = 1; pct <= 15; pct++) {
            const factor = 1 - (pct * 0.01);
            const w = Math.round(originalWidth * factor * 10) / 10;
            const h = Math.round(originalHeight * factor * 10) / 10;
            
            // Try different gaps/margins at this size
            for (let g = state.labelGap; g >= 0.5; g -= 0.5) {
                for (let m = state.pageMargin; m >= 3; m -= 1) {
                    let capacity = getLabelsPerPageCapacity(w, h, g, m);
                    if (totalLabelsCount <= capacity) {
                        state.labelWidth = w;
                        state.labelHeight = h;
                        state.labelGap = g;
                        state.pageMargin = m;
                        success = true;
                        break;
                    }
                }
                if (success) break;
            }
            if (success) break;
        }
    }

    if (success) {
        // Toggle custom size active so inputs reflect the changes
        state.customSizeActive = true;
        updateInputsFromState();
        calculateAndRender();
        saveStateToStorage();
        alert(`⚡ ปรับปรุงขนาดเรียบร้อย! ระบบได้จัดป้ายทั้งหมด ${totalLabelsCount} ใบให้จัดวางภายในกระดาษ 1 แผ่นพอดีแล้วครับ\n(ขนาดปรับเปลี่ยนเป็น: ${state.labelWidth}x${state.labelHeight} มม., ระยะห่างป้าย: ${state.labelGap} มม., ขอบกระดาษ: ${state.pageMargin} มม.)`);
    } else {
        // Rollback
        state.labelWidth = originalWidth;
        state.labelHeight = originalHeight;
        state.labelGap = originalGap;
        state.pageMargin = originalMargin;
        alert('❌ ไม่สามารถบีบป้ายเศษให้จบใน 1 หน้ากระดาษได้ เนื่องจากข้อมูลมีความยาวและจำนวนใบเยอะเกินขีดความสามารถของกระดาษ แนะนำให้พิมพ์ตามปกติครับ');
    }
}

// Helper to compute capacity based on parameters
function getLabelsPerPageCapacity(w, h, gap, margin) {
    let paperW, paperH;
    if (state.paperSize === 'A3') {
        paperW = 420;
        paperH = 297;
    } else {
        paperW = 297;
        paperH = 210;
    }

    if (state.paperOrientation === 'portrait') {
        const temp = paperW;
        paperW = paperH;
        paperH = temp;
    }

    const availW = paperW - (margin * 2);
    const availH = paperH - (margin * 2);

    const cols = Math.floor((availW + gap) / (w + gap));
    const rows = Math.floor((availH + gap) / (h + gap));

    const clampedCols = Math.max(0, cols);
    const clampedRows = Math.max(0, rows);
    return clampedCols * clampedRows;
}

// Run setup
window.addEventListener('DOMContentLoaded', init);
