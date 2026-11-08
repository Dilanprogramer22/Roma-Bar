/* =========================================================
   ROMA BAR: lógica de la página
   Lo que normalmente vas a cambiar está al principio de este
   archivo: CONFIG, CATEGORIES y DEFAULT_PRODUCTS.
   ========================================================= */
(() => {
  'use strict';

  /* ---------- 1. CONFIGURACIÓN: CAMBIAR AQUÍ ---------- */
  const CONFIG = {
    // CAMBIAR AQUÍ: ruta del logo (se usa en el encabezado y en la portada)
    logo: 'assets/img/logo.png',

    // CAMBIAR AQUÍ: número de WhatsApp con código de país, sin +, espacios ni guiones.
    // Ejemplo Colombia: 573001234567
    whatsappNumber: '573001234567',

    // CAMBIAR AQUÍ: mensaje que llega cuando alguien toca el botón general de WhatsApp
    whatsappMessage: 'Hola, quiero hacer un pedido o una reserva en Roma Bar',

    // CAMBIAR AQUÍ: contraseña del administrador.
    // OJO: esto es solo una barrera visual. Como la página está en GitHub Pages,
    // cualquiera que abra el código puede ver esta contraseña. No es seguridad real.
    adminPassword: 'roma2026',

    // Extensión de tus fotos. Si usas .png o .webp, cámbiala aquí: 'png' o 'webp'.
    imageExt: 'jpg',

    // Nombres internos con los que se guarda información en el navegador
    productsKey: 'romaBar.products.v2',
    ageKey: 'romaBar.ageOk',
    adminKey: 'romaBar.admin',
  };

  /* ---------- 2. CATEGORÍAS DE LA CARTA ----------
     photos: true  -> cada producto se muestra con foto en arco.
     photos: false -> se muestra como lista de texto (sin foto). */
  const CATEGORIES = [
    { id: 'clasicos',       name: 'Cócteles clásicos',  photos: true  },
    { id: 'casa',           name: 'Cócteles de la casa', photos: true  },
    { id: 'cervezas',       name: 'Cervezas',           photos: false },
    { id: 'shots-botellas', name: 'Shots y botellas',   photos: false },
    { id: 'sin-alcohol',    name: 'Sin alcohol',        photos: false },
    { id: 'picar',          name: 'Para picar',         photos: true  },
  ];

  /* ---------- 3. PRODUCTOS DE LA CARTA: CAMBIAR AQUÍ ----------
     Esta lista es la carta que ven TODOS los visitantes.
     Campos: id, cat (id de la categoría), name, price (número en pesos), desc.

     FOTOS: no hay que escribir rutas. La foto de cada producto es
         assets/img/<id>.jpg
     Ejemplo: el producto con id 'negroni' usa assets/img/negroni.jpg
     Solo las categorías con photos: true usan foto.
     Los precios y las recetas son ejemplos: ajústalos a los reales. */
  const DEFAULT_PRODUCTS = [
    // --- Cócteles clásicos (con foto) ---
    { id: 'negroni',        cat: 'clasicos', name: 'Negroni',       price: 32000, desc: 'Gin, vermut rojo y Campari, con cáscara de naranja.' },
    { id: 'aperol-spritz',  cat: 'clasicos', name: 'Aperol Spritz', price: 30000, desc: 'Aperol, prosecco y soda sobre hielo, con naranja.' },
    { id: 'margarita',      cat: 'clasicos', name: 'Margarita',     price: 28000, desc: 'Tequila, triple sec y limón, con borde de sal.' },
    { id: 'mojito',         cat: 'clasicos', name: 'Mojito',        price: 26000, desc: 'Ron blanco, hierbabuena, limón y soda.' },
    { id: 'old-fashioned',  cat: 'clasicos', name: 'Old Fashioned', price: 34000, desc: 'Whisky, azúcar, amargo de angostura y naranja.' },
    { id: 'pina-colada',    cat: 'clasicos', name: 'Piña colada',   price: 28000, desc: 'Ron, crema de coco y piña, licuados con hielo.' },
    { id: 'caipirinha',     cat: 'clasicos', name: 'Caipirinha',    price: 26000, desc: 'Cachaça, limón y azúcar machacados con hielo.' },
    { id: 'gin-tonic',      cat: 'clasicos', name: 'Gin tonic',     price: 28000, desc: 'Gin, agua tónica, limón y enebro.' },

    // --- Cócteles de la casa (con foto) ---
    { id: 'roma-negra',     cat: 'casa', name: 'Roma Negra',  price: 34000, desc: 'Ron añejo, café, licor de chocolate y un toque de canela.' },
    { id: 'el-cesar',       cat: 'casa', name: 'El César',    price: 32000, desc: 'Whisky, limón, miel y jengibre.' },
    { id: 'via-appia',      cat: 'casa', name: 'Vía Appia',   price: 30000, desc: 'Gin, uva, limón y albahaca.' },
    { id: 'vesubio',        cat: 'casa', name: 'Vesubio',     price: 32000, desc: 'Tequila, mango, ají y limón, con borde de sal y chile.' },
    { id: 'sangria-jarra',  cat: 'casa', name: 'Sangría en jarra', price: 48000, desc: 'Vino tinto, frutas y licor de naranja. Para 3 o 4 personas.' },

    // --- Cervezas (lista de texto) ---
    { id: 'aguila',         cat: 'cervezas', name: 'Águila',         price: 8000,  desc: 'Botella de 330 ml.' },
    { id: 'club-colombia',  cat: 'cervezas', name: 'Club Colombia',  price: 9000,  desc: 'Botella de 330 ml.' },
    { id: 'corona',         cat: 'cervezas', name: 'Corona',         price: 12000, desc: 'Botella de 355 ml, con limón.' },
    { id: 'michelada',      cat: 'cervezas', name: 'Michelada',      price: 18000, desc: 'Cerveza con limón, sal y salsas, en vaso escarchado.' },
    { id: 'artesanal',      cat: 'cervezas', name: 'Cerveza artesanal', price: 16000, desc: 'Pregunta por las variedades disponibles.' },

    // --- Shots y botellas (lista de texto) ---
    { id: 'shot-tequila',      cat: 'shots-botellas', name: 'Shot de tequila',      price: 12000,  desc: 'Con sal y limón.' },
    { id: 'shot-aguardiente',  cat: 'shots-botellas', name: 'Shot de aguardiente',  price: 7000,   desc: 'Servido frío.' },
    { id: 'media-aguardiente', cat: 'shots-botellas', name: 'Media de aguardiente', price: 50000,  desc: 'Media botella, con hielo y limón.' },
    { id: 'aguardiente-botella', cat: 'shots-botellas', name: 'Botella de aguardiente', price: 90000, desc: 'Botella de 750 ml, con hielo, limón y gaseosa.' },
    { id: 'ron-botella',       cat: 'shots-botellas', name: 'Botella de ron añejo', price: 130000, desc: 'Botella de 750 ml, con hielo y mezclador.' },
    { id: 'whisky-botella',    cat: 'shots-botellas', name: 'Botella de whisky 12 años', price: 280000, desc: 'Botella de 750 ml, con hielo y mezclador.' },

    // --- Sin alcohol (lista de texto) ---
    { id: 'limonada-coco',  cat: 'sin-alcohol', name: 'Limonada de coco', price: 14000, desc: 'Limonada cremosa con coco.' },
    { id: 'mojito-virgen',  cat: 'sin-alcohol', name: 'Mojito sin alcohol', price: 16000, desc: 'Hierbabuena, limón y soda.' },
    { id: 'jugo-natural',   cat: 'sin-alcohol', name: 'Jugo natural',     price: 10000, desc: 'En agua o en leche: lulo, mora, maracuyá o mango.' },
    { id: 'gaseosa',        cat: 'sin-alcohol', name: 'Gaseosa',          price: 6000,  desc: 'Cola, naranja o limón, 350 ml.' },
    { id: 'agua',           cat: 'sin-alcohol', name: 'Agua',             price: 5000,  desc: 'Con gas o sin gas.' },

    // --- Para picar (con foto) ---
    { id: 'nachos',         cat: 'picar', name: 'Nachos',        price: 22000, desc: 'Con queso, guacamole y pico de gallo.' },
    { id: 'patacones',      cat: 'picar', name: 'Patacones',     price: 18000, desc: 'Con hogao y queso.' },
    { id: 'empanadas',      cat: 'picar', name: 'Empanadas',     price: 14000, desc: 'Cinco empanadas con ají.' },
    { id: 'picada-roma',    cat: 'picar', name: 'Picada Roma',   price: 48000, desc: 'Chorizo, chicharrón, papa criolla, arepa y ají. Para 2 o 3 personas.' },
  ];

  /* ---------- 4. UTILIDADES ---------- */
  const $ = (selector, root = document) => root.querySelector(selector);

  // Imagen que se muestra si falta la foto de un producto
  const PLACEHOLDER = 'data:image/svg+xml,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500">' +
    '<rect width="400" height="500" fill="#4a1014"/>' +
    '<g fill="none" stroke="#c19a4b" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">' +
    '<path d="M120 170h160l-80 110z"/><path d="M200 280v90"/><path d="M155 370h90"/></g></svg>'
  );

  // localStorage puede fallar (modo privado, sin espacio): siempre dentro de try/catch
  const local = {
    get(key) { try { return localStorage.getItem(key); } catch { return null; } },
    set(key, value) { try { localStorage.setItem(key, value); return true; } catch { return false; } },
  };
  const session = {
    get(key) { try { return sessionStorage.getItem(key); } catch { return null; } },
    set(key, value) { try { sessionStorage.setItem(key, value); } catch { /* sin sesión */ } },
    remove(key) { try { sessionStorage.removeItem(key); } catch { /* sin sesión */ } },
  };

  const formatPrice = (n) =>
    new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n);

  const whatsappLink = (text) =>
    `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;

  const slugify = (text) =>
    text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'producto';

  const photoOf = (product) =>
    product.img || `assets/img/${product.id}.${CONFIG.imageExt}`;

  /* ---------- 5. ESTADO DE LA CARTA ---------- */
  const isValidProduct = (p) =>
    p && typeof p.name === 'string' && typeof p.id === 'string' && Number.isFinite(p.price);

  const cloneDefaults = () => DEFAULT_PRODUCTS.map((p) => ({ ...p }));

  // Si un producto trae una categoría que ya no existe, pasa a la primera
  const normalize = (p) => ({
    ...p,
    cat: CATEGORIES.some((c) => c.id === p.cat) ? p.cat : CATEGORIES[0].id,
  });

  function loadProducts() {
    const raw = local.get(CONFIG.productsKey);
    if (!raw) return cloneDefaults();
    try {
      const data = JSON.parse(raw);
      if (Array.isArray(data)) return data.filter(isValidProduct).map(normalize);
    } catch { /* datos dañados: se usa la carta original */ }
    return cloneDefaults();
  }

  let products = loadProducts();
  let isAdmin = session.get(CONFIG.adminKey) === '1';

  const saveProducts = () => local.set(CONFIG.productsKey, JSON.stringify(products));

  /* ---------- 6. DIBUJAR LA CARTA ---------- */
  const groups = $('#menu-groups');
  const menuNav = $('#menu-nav');
  const emptyMsg = $('#menu-empty');

  function buildRemoveButton(product) {
    const remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'item-remove';
    remove.textContent = 'Eliminar';
    remove.setAttribute('aria-label', `Eliminar ${product.name}`);
    remove.addEventListener('click', () => removeProduct(product));
    return remove;
  }

  function buildHead(product) {
    const head = document.createElement('div');
    head.className = 'item-head';
    const name = document.createElement('h4');
    name.className = 'item-name';
    name.textContent = product.name;
    const leader = document.createElement('span');
    leader.className = 'item-leader';
    leader.setAttribute('aria-hidden', 'true');
    const price = document.createElement('span');
    price.className = 'item-price';
    price.textContent = formatPrice(product.price);
    head.append(name, leader, price);
    return head;
  }

  function buildDesc(product) {
    const desc = document.createElement('p');
    desc.className = 'item-desc';
    desc.textContent = product.desc || '';
    return desc;
  }

  // Producto con foto en arco
  function buildPhotoItem(product) {
    const li = document.createElement('li');
    li.className = 'item';

    const figure = document.createElement('figure');
    figure.className = 'item-photo';
    const img = document.createElement('img');
    img.alt = product.name;
    img.loading = 'lazy';
    img.addEventListener('error', () => { img.src = PLACEHOLDER; }, { once: true });
    img.src = photoOf(product);
    figure.append(img);

    const actions = document.createElement('div');
    actions.className = 'item-actions';
    const order = document.createElement('a');
    order.className = 'item-order';
    order.href = whatsappLink(`Hola, quiero pedir ${product.name} en Roma Bar`);
    order.target = '_blank';
    order.rel = 'noopener';
    order.textContent = 'Pedir por WhatsApp';
    actions.append(order);
    if (isAdmin) actions.append(buildRemoveButton(product));

    li.append(figure, buildHead(product), buildDesc(product), actions);
    return li;
  }

  // Producto en lista de texto (sin foto)
  function buildListItem(product) {
    const li = document.createElement('li');
    li.className = 'row';
    li.append(buildHead(product), buildDesc(product));
    if (isAdmin) {
      const actions = document.createElement('div');
      actions.className = 'item-actions';
      actions.append(buildRemoveButton(product));
      li.append(actions);
    }
    return li;
  }

  function renderMenu() {
    const navLinks = [];
    const sections = [];

    CATEGORIES.forEach((cat) => {
      const items = products.filter((p) => p.cat === cat.id);
      if (!items.length) return;

      const link = document.createElement('a');
      link.href = `#cat-${cat.id}`;
      link.textContent = cat.name;
      navLinks.push(link);

      const section = document.createElement('section');
      section.className = 'menu-group';
      section.id = `cat-${cat.id}`;
      const title = document.createElement('h3');
      title.className = 'group-title';
      title.textContent = cat.name;
      const list = document.createElement('ul');
      list.className = cat.photos ? 'menu-grid' : 'menu-list';
      list.append(...items.map(cat.photos ? buildPhotoItem : buildListItem));
      section.append(title, list);
      sections.push(section);
    });

    menuNav.replaceChildren(...navLinks);
    groups.replaceChildren(...sections);
    emptyMsg.hidden = products.length > 0;
  }

  /* ---------- 7. PANEL DE ADMINISTRADOR ---------- */
  const adminPanel = $('#admin-panel');
  const adminToggle = $('#admin-toggle');
  const adminStatus = $('#admin-status');
  const addForm = $('#add-form');
  const catSelect = $('#f-cat');

  CATEGORIES.forEach((cat) => {
    const option = document.createElement('option');
    option.value = cat.id;
    option.textContent = cat.photos ? `${cat.name} (con foto)` : cat.name;
    catSelect.append(option);
  });

  function setStatus(message, isError = false) {
    adminStatus.textContent = message;
    adminStatus.classList.toggle('is-error', isError);
  }

  function setAdmin(on) {
    isAdmin = on;
    if (on) session.set(CONFIG.adminKey, '1'); else session.remove(CONFIG.adminKey);
    adminPanel.hidden = !on;
    adminToggle.textContent = on ? 'Cerrar sesión de administrador' : 'Acceso administrador';
    setStatus('');
    renderMenu();
  }

  const STORAGE_FULL = 'No se pudo guardar: el navegador no tiene espacio. Usa una foto más pequeña o deja el campo de foto vacío.';

  function removeProduct(product) {
    if (!window.confirm(`¿Eliminar "${product.name}" de la carta?`)) return;
    const previous = products;
    products = products.filter((p) => p !== product);
    if (!saveProducts()) {
      products = previous;
      setStatus(STORAGE_FULL, true);
      return;
    }
    setStatus(`Se eliminó "${product.name}" de la carta.`);
    renderMenu();
  }

  // Reduce la foto subida para que quepa en localStorage
  function fileToDataUrl(file, maxSide = 700, quality = 0.82) {
    return new Promise((resolve, reject) => {
      const url = URL.createObjectURL(file);
      const image = new Image();
      image.onload = () => {
        const scale = Math.min(1, maxSide / Math.max(image.width, image.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(image.width * scale);
        canvas.height = Math.round(image.height * scale);
        canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
        URL.revokeObjectURL(url);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      image.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error('No se pudo leer la imagen. Prueba con un archivo JPG o PNG.'));
      };
      image.src = url;
    });
  }

  addForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = $('#f-name').value.trim();
    const price = Number($('#f-price').value);
    const desc = $('#f-desc').value.trim();
    const cat = catSelect.value;
    const path = $('#f-img').value.trim();
    const file = $('#f-file').files[0];

    if (!name || !Number.isFinite(price) || price < 0) {
      setStatus('Escribe el nombre y un precio válido.', true);
      return;
    }

    let img = path;
    if (file) {
      try {
        img = await fileToDataUrl(file);
      } catch (error) {
        setStatus(error.message, true);
        return;
      }
    }

    // El id sale del nombre; la foto por defecto será assets/img/<id>.jpg
    let id = slugify(name);
    const base = id;
    let n = 2;
    while (products.some((p) => p.id === id)) id = `${base}-${n++}`;

    const product = { id, cat, name, price, desc };
    if (img) product.img = img;
    products.push(product);
    if (!saveProducts()) {
      products.pop();
      setStatus(STORAGE_FULL, true);
      return;
    }

    addForm.reset();
    setStatus(`Se agregó "${name}" a la carta.`);
    renderMenu();
  });

  $('#reset-menu').addEventListener('click', () => {
    if (!window.confirm('Esto borra los cambios hechos en este navegador y vuelve a la carta original. ¿Continuar?')) return;
    products = cloneDefaults();
    saveProducts();
    setStatus('Se restauró la carta original.');
    renderMenu();
  });

  /* ---------- 8. ACCESO ADMINISTRADOR ---------- */
  const loginDialog = $('#login-dialog');
  const loginForm = $('#login-form');
  const loginError = $('#login-error');
  const passInput = $('#admin-pass');

  adminToggle.addEventListener('click', () => {
    if (isAdmin) {
      setAdmin(false);
      return;
    }
    passInput.value = '';
    loginError.hidden = true;
    loginDialog.showModal();
  });

  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (passInput.value === CONFIG.adminPassword) {
      loginDialog.close();
      setAdmin(true);
      adminPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      loginError.hidden = false;
      passInput.select();
    }
  });

  // Cualquier botón con data-close cierra su ventana
  document.addEventListener('click', (event) => {
    const closer = event.target.closest('[data-close]');
    if (closer) closer.closest('dialog').close();
  });

  /* ---------- 9. VERIFICACIÓN DE EDAD ---------- */
  const ageDialog = $('#age-dialog');
  const ageQuestion = $('#age-question');
  const ageDenied = $('#age-denied');

  // La ventana de edad no se puede cerrar con Escape
  ageDialog.addEventListener('cancel', (event) => event.preventDefault());

  $('#age-yes').addEventListener('click', () => {
    local.set(CONFIG.ageKey, 'yes');
    ageDialog.close();
    document.documentElement.classList.remove('age-locked');
  });

  $('#age-no').addEventListener('click', () => {
    ageQuestion.hidden = true;
    ageDenied.hidden = false;
    $('#age-denied-title').focus();
  });

  if (local.get(CONFIG.ageKey) !== 'yes') {
    document.documentElement.classList.add('age-locked');
    ageDialog.showModal();
  }

  /* ---------- 10. LOGO, WHATSAPP Y AÑO ---------- */
  document.querySelectorAll('.bar-logo').forEach((logo) => {
    logo.addEventListener('error', () => {
      logo.hidden = true;
      const fallback = logo.parentElement.querySelector('.logo-fallback');
      if (fallback) fallback.hidden = false;
    });
    logo.src = CONFIG.logo;
  });

  document.querySelectorAll('[data-whatsapp]').forEach((link) => {
    link.href = whatsappLink(CONFIG.whatsappMessage);
    link.target = '_blank';
    link.rel = 'noopener';
  });

  $('#year').textContent = new Date().getFullYear();

  /* ---------- 11. ARRANQUE ---------- */
  setAdmin(isAdmin);
})();
