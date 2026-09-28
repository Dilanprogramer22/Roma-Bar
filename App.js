/* =========================================================
   ROMA BAR: lógica de la página
   Todo lo que normalmente vas a cambiar está en CONFIG
   y en DEFAULT_PRODUCTS, al principio de este archivo.
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
 
    // Nombres internos con los que se guarda información en el navegador
    productsKey: 'romaBar.products.v1',
    ageKey: 'romaBar.ageOk',
    adminKey: 'romaBar.admin',
  };
 
  /* ---------- 2. PRODUCTOS DE LA CARTA: CAMBIAR AQUÍ ----------
     Esta lista es la carta que ven TODOS los visitantes.
     Cada producto lleva: name, price (número, en pesos), desc y img (ruta de la imagen).
     Los de abajo son ejemplos: reemplázalos por los tuyos.
     Si la imagen no existe, se muestra una copa dibujada en su lugar. */
  const DEFAULT_PRODUCTS = [
    { id: 'negroni',  name: 'Negroni Romano',      price: 32000, desc: 'Gin, vermut rojo y Campari, con cáscara de naranja.', img: 'assets/img/coctel1.jpg' },
    { id: 'spritz',   name: 'Aperol Spritz',       price: 30000, desc: 'Aperol, prosecco y soda sobre hielo, con naranja.',   img: 'assets/img/coctel2.jpg' },
    { id: 'margarita',name: 'Margarita de la casa',price: 28000, desc: 'Tequila, triple sec y limón, con borde de sal.',      img: 'assets/img/coctel3.jpg' },
    { id: 'mojito',   name: 'Mojito',              price: 26000, desc: 'Ron blanco, hierbabuena, limón y soda.',              img: 'assets/img/coctel4.jpg' },
    { id: 'oldfash',  name: 'Old Fashioned',       price: 34000, desc: 'Whisky, azúcar, amargo de angostura y naranja.',      img: 'assets/img/coctel5.jpg' },
    { id: 'michelada',name: 'Michelada',           price: 18000, desc: 'Cerveza, limón, sal y salsas, en vaso escarchado.',   img: 'assets/img/coctel6.jpg' },
  ];
 
  /* ---------- 3. UTILIDADES ---------- */
  const $ = (selector, root = document) => root.querySelector(selector);
 
  // Imagen que se muestra si un producto no tiene foto o la ruta está mal
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
 
  /* ---------- 4. ESTADO DE LA CARTA ---------- */
  const isValidProduct = (p) =>
    p && typeof p.name === 'string' && Number.isFinite(p.price);
 
  const cloneDefaults = () => DEFAULT_PRODUCTS.map((p) => ({ ...p }));
 
  function loadProducts() {
    const raw = local.get(CONFIG.productsKey);
    if (!raw) return cloneDefaults();
    try {
      const data = JSON.parse(raw);
      if (Array.isArray(data)) return data.filter(isValidProduct);
    } catch { /* datos dañados: se usa la carta original */ }
    return cloneDefaults();
  }
 
  let products = loadProducts();
  let isAdmin = session.get(CONFIG.adminKey) === '1';
 
  const saveProducts = () => local.set(CONFIG.productsKey, JSON.stringify(products));
 
  /* ---------- 5. DIBUJAR LA CARTA ---------- */
  const grid = $('#menu-grid');
  const emptyMsg = $('#menu-empty');
 
  function buildItem(product) {
    const li = document.createElement('li');
    li.className = 'item';
 
    // Foto dentro del arco
    const figure = document.createElement('figure');
    figure.className = 'item-photo';
    const img = document.createElement('img');
    img.alt = product.name;
    img.loading = 'lazy';
    img.addEventListener('error', () => { img.src = PLACEHOLDER; }, { once: true });
    // CAMBIAR IMAGEN: la ruta de cada producto está en DEFAULT_PRODUCTS (campo img)
    img.src = product.img || PLACEHOLDER;
    figure.append(img);
 
    // Nombre ........ precio
    const head = document.createElement('div');
    head.className = 'item-head';
    const name = document.createElement('h3');
    name.className = 'item-name';
    name.textContent = product.name;
    const leader = document.createElement('span');
    leader.className = 'item-leader';
    leader.setAttribute('aria-hidden', 'true');
    const price = document.createElement('span');
    price.className = 'item-price';
    price.textContent = formatPrice(product.price);
    head.append(name, leader, price);
 
    const desc = document.createElement('p');
    desc.className = 'item-desc';
    desc.textContent = product.desc || '';
 
    const actions = document.createElement('div');
    actions.className = 'item-actions';
    const order = document.createElement('a');
    order.className = 'item-order';
    order.href = whatsappLink(`Hola, quiero pedir un ${product.name} en Roma Bar`);
    order.target = '_blank';
    order.rel = 'noopener';
    order.textContent = 'Pedir por WhatsApp';
    actions.append(order);
 
    if (isAdmin) {
      const remove = document.createElement('button');
      remove.type = 'button';
      remove.className = 'item-remove';
      remove.textContent = 'Eliminar';
      remove.addEventListener('click', () => removeProduct(product));
      actions.append(remove);
    }
 
    li.append(figure, head, desc, actions);
    return li;
  }
 
  function renderMenu() {
    grid.replaceChildren(...products.map(buildItem));
    emptyMsg.hidden = products.length > 0;
  }
 
  /* ---------- 6. PANEL DE ADMINISTRADOR ---------- */
  const adminPanel = $('#admin-panel');
  const adminToggle = $('#admin-toggle');
  const adminStatus = $('#admin-status');
  const addForm = $('#add-form');
 
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
 
  const STORAGE_FULL = 'No se pudo guardar: el navegador no tiene espacio. Usa una foto más pequeña o escribe la ruta de una imagen en assets/img.';
 
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
 
    const product = { id: `p-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, name, price, desc, img };
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
 
  /* ---------- 7. ACCESO ADMINISTRADOR ---------- */
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
 
  /* ---------- 8. VERIFICACIÓN DE EDAD ---------- */
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
 
  /* ---------- 9. LOGO, WHATSAPP Y AÑO ---------- */
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
 
  /* ---------- 10. ARRANQUE ---------- */
  setAdmin(isAdmin);
})();
 
