const manifestUrl = 'data/manifest.json';
const accessHash = '822f71cc551b8d41e032f7687a4afa309084b470a8c8828b4730c995ffeea9ac';
const accessStorageKey = 'splitapaBetaAccess';
const pendingWorkoutStorageKey = 'splitapaPendingWorkoutCode';
const i18n = window.SplitApaI18n;
const currentLanguage = i18n.getLanguage();
const ui = (key, variables = {}) => i18n.t(key, variables, currentLanguage);

const state = {
  manifest: null,
  databaseByDistrict: new Map(),
  currentDistrictId: '',
  selectedDistrictIds: [],
  generatedExercises: [],
  sortMode: 'default',
  outputMetaLabel: 'generator.generatedLabel',
  outputMetaText: '',
  outputTotal: null
};

const els = {
  accessScreen: document.getElementById('accessScreen'),
  appShell: document.getElementById('appShell'),
  accessForm: document.getElementById('accessForm'),
  accessPassword: document.getElementById('accessPassword'),
  accessError: document.getElementById('accessError'),
  logoutButton: document.getElementById('logoutButton'),
  status: document.getElementById('appStatus'),
  districtTabs: document.getElementById('districtTabs'),
  districtSelect: document.getElementById('districtSelect'),
  quantitySelect: document.getElementById('quantitySelect'),
  selectedDistrictLabel: document.getElementById('selectedDistrictLabel'),
  selectedDistrictMeta: document.getElementById('selectedDistrictMeta'),
  generatorTitle: document.getElementById('generatorTitle'),
  generatorCopy: document.getElementById('generatorCopy'),
  askForm: document.getElementById('askForm'),
  askInput: document.getElementById('askInput'),
  askHint: document.getElementById('askHint'),
  generateButton: document.getElementById('generateButton'),
  clearButton: document.getElementById('clearButton'),
  sortSelect: document.getElementById('sortSelect'),
  workoutCodeInput: document.getElementById('workoutCodeInput'),
  copyCodeButton: document.getElementById('copyCodeButton'),
  loadCodeButton: document.getElementById('loadCodeButton'),
  codeHint: document.getElementById('codeHint'),
  outputTitle: document.getElementById('outputTitle'),
  outputMeta: document.getElementById('outputMeta'),
  workoutList: document.getElementById('workoutList')
};

let appInitialized = false;
const workoutCodePrefix = 'SAPA1-';
const sortModes = new Set(['default', 'easy-hard', 'hard-easy']);
const quantityOptions = [
  { value: '1', label: ui('generator.quantity.one') },
  { value: '2', label: ui('generator.quantity.many', { count: 2 }) },
  { value: '3', label: ui('generator.quantity.many', { count: 3 }) },
  { value: '4', label: ui('generator.quantity.many', { count: 4 }) },
  { value: '5', label: ui('generator.quantity.many', { count: 5 }) },
  { value: 'all', label: ui('generator.quantity.all') }
];
const smartHeaders = [...document.querySelectorAll('[data-smart-header]')];
let lastScrollY = window.scrollY;
let headerTicking = false;

function showSmartHeaders() {
  smartHeaders.forEach((header) => header.classList.remove('is-hidden'));
}

function updateSmartHeaders() {
  const currentScrollY = Math.max(0, window.scrollY);
  const delta = currentScrollY - lastScrollY;

  smartHeaders.forEach((header) => {
    if (currentScrollY <= 12 || delta < -4) {
      header.classList.remove('is-hidden');
    } else if (delta > 4) {
      header.classList.add('is-hidden');
    }
  });

  lastScrollY = currentScrollY;
  headerTicking = false;
}

function setupSmartHeaders() {
  window.addEventListener('scroll', () => {
    if (headerTicking) return;
    headerTicking = true;
    window.requestAnimationFrame(updateSmartHeaders);
  }, { passive: true });

  window.addEventListener('resize', () => {
    showSmartHeaders();
    lastScrollY = Math.max(0, window.scrollY);
  });
}

const districtAliases = {
  abdomen: ['abs', 'core'],
  ankle: ['ankle'],
  chest: ['thorax', 'rib cage'],
  elbow: ['elbow'],
  foot: ['foot', 'toe', 'toes'],
  forearm: ['forearm'],
  hand: ['hand', 'finger', 'fingers', 'thumb'],
  hip: ['hip'],
  knee: ['knee'],
  neck: ['cervical'],
  'pelvic-floor': ['pelvic floor', 'perineum'],
  pelvis: ['pelvic'],
  shoulder: ['scapula', 'scapular'],
  spine: ['back', 'trunk', 'lumbar', 'thoracic'],
  wrist: ['wrist']
};

const movementAliases = {
  abduction: ['open away'],
  adduction: ['close toward'],
  'anterior-pelvic-tilt': ['anterior tilt', 'pelvic anteversion'],
  'big-toe-flexion': ['big toe flexion', 'hallux flexion'],
  breathing: ['breath', 'respiration'],
  circumduction: ['circle', 'circular movement'],
  contraction: ['contract'],
  dorsiflexion: ['dorsal flexion', 'toe lift'],
  elevation: ['raise', 'lift'],
  eversion: ['evert'],
  extension: ['extend', 'straighten'],
  'external-rotation': ['external rotation', 'outward rotation'],
  'finger-abduction': ['finger abduction', 'spread fingers'],
  'finger-adduction': ['finger adduction', 'close fingers'],
  'finger-extension': ['finger extension', 'extend fingers'],
  'finger-flexion': ['finger flexion', 'bend fingers'],
  flexion: ['bend', 'bending'],
  grip: ['grasp', 'hold'],
  'hip-extension': ['hip extension'],
  'hip-flexion': ['hip flexion'],
  'horizontal-abduction': ['horizontal abduction'],
  'horizontal-adduction': ['horizontal adduction'],
  'internal-rotation': ['internal rotation', 'inward rotation'],
  inversion: ['invert'],
  isometric: ['hold', 'static hold'],
  'lateral-elevation': ['lateral raise'],
  'lateral-flexion': ['side bend', 'side bending'],
  'lateral-shift': ['side shift'],
  mobility: ['mobilization', 'range of motion'],
  opening: ['open'],
  opposition: ['thumb opposition'],
  'plantar-flexion': ['plantar flexion', 'toe point', 'calf raise'],
  'posterior-pelvic-tilt': ['posterior tilt', 'pelvic retroversion'],
  'postural-extension': ['posture extension'],
  pronation: ['pronate'],
  push: ['press'],
  'radial-deviation': ['radial deviation'],
  relaxation: ['relax'],
  release: ['let go'],
  retraction: ['retract'],
  'rib-expansion': ['rib expansion', 'costal expansion'],
  rotation: ['rotate', 'turn'],
  'scapular-depression': ['scapular depression'],
  'scapular-protraction': ['scapular protraction'],
  'scapular-retraction': ['scapular retraction'],
  'selective-control': ['selective control'],
  stabilization: ['stability', 'control'],
  supination: ['supinate'],
  'thumb-adduction': ['thumb adduction'],
  'ulnar-deviation': ['ulnar deviation']
};

const localizedAliases = i18n.searchAliases(currentLanguage);
Object.entries(localizedAliases.districts).forEach(([key, aliases]) => {
  districtAliases[key] = uniqueAliasValues([...(districtAliases[key] || []), ...aliases]);
});
Object.entries(localizedAliases.movements).forEach(([key, aliases]) => {
  movementAliases[key] = uniqueAliasValues([...(movementAliases[key] || []), ...aliases]);
});

function uniqueAliasValues(values) {
  return [...new Set(values.filter(Boolean))];
}

function setAccessError(message) {
  els.accessError.textContent = message;
}

async function hashText(value) {
  if (!window.crypto?.subtle) {
    throw new Error('Secure hashing is not available in this browser.');
  }

  const data = new TextEncoder().encode(value);
  const digest = await window.crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

function hasStoredAccess() {
  try {
    return window.localStorage.getItem(accessStorageKey) === 'true';
  } catch (error) {
    return false;
  }
}

function storeAccess() {
  try {
    window.localStorage.setItem(accessStorageKey, 'true');
  } catch (error) {
    // Private browsing or embedded contexts can block storage. Access still works for this page load.
  }
}

function clearStoredAccess() {
  try {
    window.localStorage.removeItem(accessStorageKey);
  } catch (error) {
    // Storage can be unavailable in some embedded contexts.
  }
}

function unlockApp() {
  els.accessScreen.hidden = true;
  els.appShell.hidden = false;
  setAccessError('');
  window.scrollTo({ top: 0, behavior: 'auto' });
  showSmartHeaders();
  init();
}

async function handleAccessSubmit(event) {
  event.preventDefault();

  const candidate = els.accessPassword.value;
  if (!candidate) {
    setAccessError(ui('access.error.required'));
    return;
  }

  try {
    const candidateHash = await hashText(candidate);
    if (candidateHash !== accessHash) {
      setAccessError(ui('access.error.wrong'));
      els.accessPassword.select();
      return;
    }

    storeAccess();
    els.accessPassword.value = '';
    unlockApp();
  } catch (error) {
    setAccessError(ui('access.error.browser'));
    console.error(error);
  }
}

function lockApp() {
  clearStoredAccess();
  window.location.reload();
}

function setupAccessGate() {
  els.accessForm.addEventListener('submit', handleAccessSubmit);
  els.logoutButton.addEventListener('click', lockApp);

  if (hasStoredAccess()) {
    unlockApp();
    return;
  }

  els.accessScreen.hidden = false;
  els.appShell.hidden = true;
  setTimeout(() => els.accessPassword.focus({ preventScroll: true }), 0);
}

function setStatus(message) {
  els.status.textContent = message;
}

function showError(message) {
  els.workoutList.innerHTML = '';
  const box = document.createElement('div');
  box.className = 'error-state';
  box.textContent = message;
  els.workoutList.appendChild(box);
  setSortEnabled(false);
  setStatus(ui('generator.archiveErrorStatus'));
}

function setAskHint(message) {
  if (els.askHint) {
    els.askHint.textContent = message;
  }
}

function setCodeHint(message) {
  if (els.codeHint) {
    els.codeHint.textContent = message;
  }
}

function normalizeText(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/ß/g, 'ss')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function hasPhrase(text, phrase) {
  const normalizedPhrase = normalizeText(phrase);
  return Boolean(normalizedPhrase) && ` ${text} `.includes(` ${normalizedPhrase} `);
}

function uniqueValues(list) {
  return [...new Set(list.filter(Boolean))];
}

function base64UrlEncode(value) {
  const bytes = new TextEncoder().encode(value);
  let binary = '';
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return window.btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function base64UrlDecode(value) {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
  const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), '=');
  const binary = window.atob(padded);
  const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function findAliasMatches(normalizedQuery, aliasMap) {
  return Object.entries(aliasMap)
    .filter(([key, aliases]) => [key, ...aliases].some((alias) => hasPhrase(normalizedQuery, alias)))
    .map(([key]) => key);
}

function buildSmartCriteria(query) {
  const normalized = normalizeText(query);
  return {
    normalized,
    tokens: normalized.split(' ').filter((token) => token.length > 2),
    districts: findAliasMatches(normalized, districtAliases),
    movements: findAliasMatches(normalized, movementAliases)
  };
}

function movementTagMatches(tag, requestedMovement) {
  if (!tag || !requestedMovement) return false;
  if (tag === requestedMovement) return true;
  if (tag.includes(requestedMovement)) return true;
  return tag.endsWith(`-${requestedMovement}`);
}

function createSearchText(exercise) {
  return normalizeText([
    exercise.nome,
    exercise.sezione,
    exercise.distretto,
    exercise.movementDistrict,
    ...(Array.isArray(exercise.movementTags) ? exercise.movementTags : []),
    exercise.description,
    exercise.howToDo,
    exercise.whatToDo,
    exercise.whatNotToDo,
    exercise.fullText
  ].filter(Boolean).join(' '));
}

function scoreSmartMatch(exercise, criteria) {
  const district = exercise.movementDistrict || '';
  const tags = Array.isArray(exercise.movementTags) ? exercise.movementTags : [];
  const requestedDistricts = criteria.districts;
  const requestedMovements = criteria.movements;

  if (requestedDistricts.length && !requestedDistricts.includes(district)) {
    return 0;
  }

  const movementHits = requestedMovements.filter((movement) =>
    tags.some((tag) => movementTagMatches(tag, movement))
  );

  if (requestedMovements.length && !movementHits.length) {
    return 0;
  }

  const textIndex = createSearchText(exercise);
  let score = 0;

  if (requestedDistricts.includes(district)) {
    score += 70;
  }

  score += movementHits.length * 45;

  criteria.tokens.forEach((token) => {
    if (textIndex.includes(token)) {
      score += 2;
    }
  });

  if (!requestedDistricts.length && !requestedMovements.length && score < 4) {
    return 0;
  }

  return score;
}

async function getAllArchiveExercises() {
  const entries = await Promise.all(
    state.manifest.districts.map(async (district) => ({
      id: district.id,
      database: await loadDistrict(district.id)
    }))
  );

  return entries.flatMap(({ id, database }) => flattenDistrictExercises(database, id));
}

async function findSmartMatches(query) {
  const criteria = buildSmartCriteria(query);
  const exercises = await getAllArchiveExercises();
  const scored = exercises
    .map((exercise, index) => ({
      exercise,
      index,
      score: scoreSmartMatch(exercise, criteria)
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.index - b.index);

  return {
    criteria,
    total: scored.length,
    matches: scored.slice(0, 18).map((item) => item.exercise)
  };
}

function describeSmartCriteria(criteria) {
  const parts = [
    ...criteria.districts.map(formatMovementToken),
    ...criteria.movements.map(formatMovementToken)
  ];

  return parts.length
    ? ui('generator.matched', { criteria: uniqueValues(parts).join(' / ') })
    : ui('generator.matchedText');
}

function normalizeDistrictIds(ids, manifest = state.manifest) {
  const requestedIds = new Set(
    (Array.isArray(ids) ? ids : [ids])
      .flatMap((id) => String(id || '').split(','))
      .map((id) => id.trim())
      .filter(Boolean)
  );

  return (manifest?.districts || [])
    .map((district) => district.id)
    .filter((id) => requestedIds.has(id));
}

function getInitialDistrictIds(manifest) {
  const params = new URLSearchParams(window.location.search);
  const requested = params.get('district') || window.location.hash.replace('#', '');
  const requestedIds = normalizeDistrictIds(requested, manifest);
  return requestedIds.length ? requestedIds : [manifest.districts[0]?.id].filter(Boolean);
}

function getDistrictMeta(id) {
  return state.manifest.districts.find((district) => district.id === id);
}

function getSelectedDistrictIds() {
  const selectedIds = normalizeDistrictIds(state.selectedDistrictIds);
  if (selectedIds.length) return selectedIds;
  return [state.currentDistrictId].filter(Boolean);
}

function getSelectedDistrictMetas() {
  const selectedIds = new Set(getSelectedDistrictIds());
  return state.manifest.districts.filter((district) => selectedIds.has(district.id));
}

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Unable to load ${url}`);
  }
  return response.json();
}

async function loadDistrict(id) {
  if (state.databaseByDistrict.has(id)) {
    return state.databaseByDistrict.get(id);
  }

  const meta = getDistrictMeta(id);
  if (!meta) {
    throw new Error(`Unknown district ${id}`);
  }

  setStatus(ui('generator.loadingDistrict', { district: meta.title }));
  const dataUrl = currentLanguage === 'en'
    ? meta.file
    : meta.file.replace(/^data\//, `data/${currentLanguage}/`);
  const database = await fetchJson(dataUrl);
  state.databaseByDistrict.set(id, database);
  return database;
}

function updateUrl(ids) {
  const url = new URL(window.location.href);
  const selectedIds = normalizeDistrictIds(ids);
  if (selectedIds.length) {
    url.searchParams.set('district', selectedIds.join(','));
  } else {
    url.searchParams.delete('district');
  }
  try {
    window.history.replaceState({}, '', url);
  } catch (error) {
    // Embedded contexts can block history updates. The app still works.
  }
}

function closeFlowSelect(root, focusTrigger = false) {
  if (!root) return;
  root.classList.remove('open');
  const trigger = root.querySelector('.flow-select-trigger');
  if (trigger) {
    trigger.setAttribute('aria-expanded', 'false');
    if (focusTrigger) trigger.focus();
  }
}

function closeOtherFlowSelects(currentRoot) {
  document.querySelectorAll('.flow-select.open').forEach((root) => {
    if (root !== currentRoot) closeFlowSelect(root);
  });
}

function setupFlowSelectTrigger(root, trigger) {
  trigger.addEventListener('click', (event) => {
    event.preventDefault();
    const shouldOpen = !root.classList.contains('open');
    closeOtherFlowSelects(root);
    root.classList.toggle('open', shouldOpen);
    trigger.setAttribute('aria-expanded', String(shouldOpen));
  });
}

function renderSingleFlowSelect(root, {
  options,
  initialValue = '',
  placeholder = ui('generator.selectOption'),
  ariaLabel = 'Options',
  onChange = () => {}
}) {
  root.innerHTML = '';
  root.dataset.value = '';

  const trigger = document.createElement('button');
  trigger.type = 'button';
  trigger.className = 'flow-select-trigger';
  trigger.setAttribute('aria-haspopup', 'listbox');
  trigger.setAttribute('aria-expanded', 'false');
  trigger.textContent = placeholder;
  setupFlowSelectTrigger(root, trigger);

  const menu = document.createElement('div');
  menu.className = 'flow-select-menu';
  menu.setAttribute('role', 'listbox');
  menu.setAttribute('aria-label', ariaLabel);

  const optionButtons = [];
  const setValue = (value, closeMenu = true, notify = true) => {
    const normalizedValue = String(value ?? '');
    const selectedOption = options.find((option) => String(option.value) === normalizedValue) || null;
    root.dataset.value = selectedOption ? normalizedValue : '';
    trigger.textContent = selectedOption ? selectedOption.label : placeholder;

    optionButtons.forEach(({ button, option }) => {
      const active = selectedOption && String(option.value) === normalizedValue;
      button.classList.toggle('active', Boolean(active));
      button.setAttribute('aria-selected', String(Boolean(active)));
      button.dataset.selectedLabel = ui('common.selected');
    });

    if (closeMenu) closeFlowSelect(root);
    if (notify) onChange(selectedOption);
  };

  options.forEach((option) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'flow-select-option';
    button.dataset.value = String(option.value);
    button.setAttribute('role', 'option');
    button.setAttribute('aria-selected', 'false');
    button.dataset.selectedLabel = ui('common.selected');
    button.textContent = option.label;
    button.addEventListener('click', (event) => {
      event.preventDefault();
      setValue(option.value);
    });
    optionButtons.push({ button, option });
    menu.appendChild(button);
  });

  root.append(trigger, menu);
  setValue(initialValue, false, false);
  return { setValue };
}

function renderQuantityControl() {
  renderSingleFlowSelect(els.quantitySelect, {
    options: quantityOptions,
    initialValue: '2',
    placeholder: ui('generator.selectQuantity'),
    ariaLabel: ui('generator.perSectionAria')
  });
}

function renderDistrictControls() {
  els.districtTabs.innerHTML = '';
  els.districtSelect.innerHTML = '';

  const trigger = document.createElement('button');
  trigger.type = 'button';
  trigger.className = 'flow-select-trigger';
  trigger.setAttribute('aria-haspopup', 'listbox');
  trigger.setAttribute('aria-expanded', 'false');
  trigger.textContent = ui('generator.selectDistricts');
  setupFlowSelectTrigger(els.districtSelect, trigger);

  const menu = document.createElement('div');
  menu.className = 'flow-select-menu';
  menu.setAttribute('role', 'listbox');
  menu.setAttribute('aria-label', ui('generator.bodyDistricts'));
  menu.setAttribute('aria-multiselectable', 'true');

  state.manifest.districts.forEach((district) => {
    const tab = document.createElement('span');
    tab.className = 'district-tab small-label';
    tab.dataset.district = district.id;
    tab.textContent = district.title;
    tab.setAttribute('aria-hidden', 'true');
    els.districtTabs.appendChild(tab);

    const option = document.createElement('button');
    option.type = 'button';
    option.className = 'flow-select-option';
    option.setAttribute('role', 'option');
    option.dataset.selectedLabel = ui('common.selected');
    option.dataset.district = district.id;
    option.textContent = district.title;
    option.addEventListener('click', async (event) => {
      event.preventDefault();
      await toggleDistrictSelection(district.id);
    });
    menu.appendChild(option);
  });

  els.districtSelect.append(trigger, menu);
}

async function toggleDistrictSelection(id) {
  const currentIds = getSelectedDistrictIds();
  const nextIds = currentIds.includes(id)
    ? currentIds.filter((currentId) => currentId !== id)
    : [...currentIds, id];

  await selectDistricts(nextIds.length ? nextIds : currentIds);
  els.districtSelect.classList.add('open');
  const trigger = els.districtSelect.querySelector('.flow-select-trigger');
  if (trigger) {
    trigger.setAttribute('aria-expanded', 'true');
  }
}

function renderSelectedDistrict() {
  const metas = getSelectedDistrictMetas();
  if (!metas.length) return;

  const totalExercises = metas.reduce((sum, meta) => sum + (Number(meta.exercises) || 0), 0);
  const totalSections = metas.reduce((sum, meta) => sum + (Number(meta.sections) || 0), 0);
  const selectedLabel = metas.length === 1
    ? metas[0].title
    : ui('generator.districtCount', { count: metas.length });
  const workoutTitle = metas.length === 1
    ? ui('generator.singleWorkout', { district: metas[0].title })
    : ui('generator.multiWorkout');

  els.selectedDistrictLabel.textContent = selectedLabel;
  els.selectedDistrictMeta.textContent = metas.length === 1
    ? ui('generator.singleMeta', { count: metas[0].exercises })
    : ui('generator.multiMeta', { sections: totalSections, exercises: totalExercises });
  els.generatorTitle.textContent = metas.length === 1
    ? ui('generator.singlePlan', { district: metas[0].title })
    : ui('generator.multiPlan');
  els.generatorCopy.textContent = metas.length === 1
    ? ui('generator.singleCopy', { sections: metas[0].sections })
    : ui('generator.multiCopy', { count: metas.length });
  els.outputTitle.textContent = workoutTitle;

  const selectedIds = getSelectedDistrictIds();
  const trigger = els.districtSelect.querySelector('.flow-select-trigger');
  if (trigger) {
    trigger.textContent = selectedLabel;
  }

  els.districtSelect.querySelectorAll('.flow-select-option').forEach((option) => {
    option.classList.toggle('active', selectedIds.includes(option.dataset.district));
    option.setAttribute('aria-selected', String(selectedIds.includes(option.dataset.district)));
  });

  document.querySelectorAll('.district-tab').forEach((tab) => {
    tab.classList.toggle('active', selectedIds.includes(tab.dataset.district));
  });

  if (!state.generatedExercises.length) {
    renderEmptyState();
  }
}

async function selectDistricts(ids) {
  const selectedIds = normalizeDistrictIds(ids);
  state.selectedDistrictIds = selectedIds.length
    ? selectedIds
    : [state.manifest.districts[0]?.id].filter(Boolean);
  state.currentDistrictId = state.selectedDistrictIds[0] || '';
  state.generatedExercises = [];
  state.sortMode = 'default';
  state.outputMetaLabel = 'generator.generatedLabel';
  state.outputMetaText = '';
  state.outputTotal = null;
  els.sortSelect.value = 'default';
  updateUrl(state.selectedDistrictIds);
  renderSelectedDistrict();

  try {
    await Promise.all(state.selectedDistrictIds.map((id) => loadDistrict(id)));
    setStatus(ui('generator.archiveReady'));
  } catch (error) {
    showError(ui('generator.archiveSelectedError'));
    console.error(error);
  }
}

function renderEmptyState(metas = getSelectedDistrictMetas()) {
  els.workoutList.innerHTML = '';
  const empty = document.createElement('div');
  empty.className = 'empty-state';
  const label = metas.length === 1 ? metas[0].title : ui('generator.oneOrMoreDistricts');
  empty.textContent = metas.length
    ? ui('generator.emptyPrompt', { district: label })
    : ui('generator.noWorkout');
  els.outputMeta.textContent = ui('generator.noWorkout');
  els.workoutList.appendChild(empty);
  setSortEnabled(false);
}

function shuffle(list) {
  return list
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
}

function chooseRandom(list, quantity) {
  return shuffle(list).slice(0, Math.min(quantity, list.length));
}

function getDifficultyLevel(exercise) {
  const level = Number(exercise?.difficulty);
  if (!Number.isFinite(level)) return 3;
  return Math.min(5, Math.max(1, Math.round(level)));
}

function createWorkoutCode() {
  if (!state.generatedExercises.length) return '';

  const payload = {
    v: 1,
    sort: state.sortMode,
    items: state.generatedExercises.map((exercise) => ({
      d: exercise.districtId || state.currentDistrictId,
      id: exercise.id
    }))
  };

  return `${workoutCodePrefix}${base64UrlEncode(JSON.stringify(payload))}`;
}

function parseWorkoutCode(rawCode) {
  const code = String(rawCode || '').replace(/\s+/g, '');
  if (!code.startsWith(workoutCodePrefix)) {
    throw new Error('Unsupported workout code.');
  }

  const payload = JSON.parse(base64UrlDecode(code.slice(workoutCodePrefix.length)));
  if (payload?.v !== 1 || !Array.isArray(payload.items) || !payload.items.length) {
    throw new Error('Invalid workout code.');
  }

  payload.items.forEach((item) => {
    if (!item?.d || !item?.id) {
      throw new Error('Invalid workout item.');
    }
  });

  return {
    sort: sortModes.has(payload.sort) ? payload.sort : 'default',
    items: payload.items
  };
}

function updateWorkoutCodeField() {
  const code = createWorkoutCode();
  els.workoutCodeInput.value = code;
  els.copyCodeButton.disabled = !code;
}

function setSortEnabled(enabled) {
  els.sortSelect.disabled = !enabled;
  if (!enabled) {
    state.sortMode = 'default';
    els.sortSelect.value = 'default';
  }
  updateWorkoutCodeField();
}

function attachWorkoutOrder(exercise, order) {
  return {
    ...exercise,
    workoutOrder: order
  };
}

function getDistrictRank(exercise) {
  const districtId = exercise.districtId || state.currentDistrictId;
  const selectedIds = getSelectedDistrictIds();
  const selectedIndex = selectedIds.indexOf(districtId);
  if (selectedIndex >= 0) return selectedIndex;

  const manifestIndex = state.manifest?.districts.findIndex((district) => district.id === districtId) ?? -1;
  return manifestIndex >= 0 ? selectedIds.length + manifestIndex : 999;
}

function sortGeneratedExercises() {
  const direction = state.sortMode;
  state.generatedExercises.sort((a, b) => {
    const districtOrder = getDistrictRank(a) - getDistrictRank(b);
    if (districtOrder !== 0) return districtOrder;

    if (direction === 'easy-hard') {
      return getDifficultyLevel(a) - getDifficultyLevel(b) || (a.workoutOrder ?? 0) - (b.workoutOrder ?? 0);
    }

    if (direction === 'hard-easy') {
      return getDifficultyLevel(b) - getDifficultyLevel(a) || (a.workoutOrder ?? 0) - (b.workoutOrder ?? 0);
    }

    return (a.workoutOrder ?? 0) - (b.workoutOrder ?? 0);
  });
}

function handleSortChange() {
  state.sortMode = els.sortSelect.value;
  sortGeneratedExercises();
  renderWorkout();
}

function asDistrictList(database) {
  if (Array.isArray(database)) return database;
  return database ? [database] : [];
}

function flattenDistrictExercises(database, districtId = '') {
  const results = [];
  asDistrictList(database).forEach((district) => {
    (district.sezioni || []).forEach((section) => {
      (section.esercizi || []).forEach((exercise) => {
        results.push({
          ...exercise,
          districtId,
          distretto: district.distretto,
          sezione: section.nome
        });
      });
    });
  });
  return results;
}

function getAllCurrentDistrictExercises() {
  const database = state.databaseByDistrict.get(state.currentDistrictId) || [];
  return flattenDistrictExercises(database, state.currentDistrictId);
}

function getReplacementExercises(currentExercise) {
  const districtId = currentExercise.districtId || state.currentDistrictId;
  const database = state.databaseByDistrict.get(districtId) || state.databaseByDistrict.get(state.currentDistrictId) || [];
  return flattenDistrictExercises(database, districtId);
}

async function getExercisesFromWorkoutCode(payload) {
  const districtIds = uniqueValues(payload.items.map((item) => item.d));
  await Promise.all(districtIds.map((id) => loadDistrict(id)));

  const exerciseIndex = new Map();
  districtIds.forEach((districtId) => {
    const database = state.databaseByDistrict.get(districtId);
    flattenDistrictExercises(database, districtId).forEach((exercise) => {
      exerciseIndex.set(`${districtId}:${exercise.id}`, exercise);
    });
  });

  const missing = [];
  const exercises = [];
  payload.items.forEach((item) => {
    const exercise = exerciseIndex.get(`${item.d}:${item.id}`);
    if (exercise) {
      exercises.push(attachWorkoutOrder(exercise, exercises.length));
      return;
    }
    missing.push(`${item.d}:${item.id}`);
  });

  return { exercises, missing };
}

function getOutputMetaText() {
  const label = ui(state.outputMetaLabel);
  if (state.outputTotal && state.outputTotal > state.generatedExercises.length) {
    return ui('generator.metaOf', {
      shown: state.generatedExercises.length,
      total: state.outputTotal,
      label
    });
  }

  return ui('generator.metaCount', { count: state.generatedExercises.length, label });
}

async function copyWorkoutCode() {
  const code = createWorkoutCode();
  if (!code) {
    setCodeHint(ui('generator.copyFirst'));
    return;
  }

  els.workoutCodeInput.value = code;
  try {
    await navigator.clipboard.writeText(code);
    setCodeHint(ui('generator.codeCopied'));
  } catch (error) {
    els.workoutCodeInput.focus();
    els.workoutCodeInput.select();
    setCodeHint(ui('generator.codeSelected'));
  }
}

async function loadWorkoutCode() {
  let payload;
  try {
    payload = parseWorkoutCode(els.workoutCodeInput.value);
  } catch (error) {
    setCodeHint(ui('generator.invalidCode'));
    setStatus(ui('generator.codeNotLoaded'));
    return;
  }

  setStatus(ui('generator.loadingCode'));
  setCodeHint(ui('generator.loadingSaved'));

  try {
    const { exercises, missing } = await getExercisesFromWorkoutCode(payload);
    if (!exercises.length) {
      throw new Error('No matching exercises found.');
    }

    state.generatedExercises = exercises;
    state.sortMode = payload.sort;
    state.outputMetaLabel = 'generator.restoredLabel';
    state.outputMetaText = '';
    state.outputTotal = null;
    els.sortSelect.value = state.sortMode;
    els.outputTitle.textContent = ui('generator.restoredWorkout');

    const restoredDistrictIds = normalizeDistrictIds(exercises.map((exercise) => exercise.districtId));
    if (restoredDistrictIds.length) {
      state.selectedDistrictIds = restoredDistrictIds;
      state.currentDistrictId = restoredDistrictIds[0];
      updateUrl(restoredDistrictIds);
      renderSelectedDistrict();
      els.outputTitle.textContent = ui('generator.restoredWorkout');
    }

    renderWorkout();
    setCodeHint(missing.length
      ? ui('generator.missingRestored', { count: missing.length })
      : ui('generator.workoutRestored'));
    document.getElementById('workout').scrollIntoView({ behavior: 'smooth', block: 'start' });
  } catch (error) {
    setCodeHint(ui('generator.codeLoadFailed'));
    setStatus(ui('generator.codeNotLoaded'));
    console.error(error);
  }
}

function takePendingWorkoutCode() {
  try {
    const code = window.localStorage.getItem(pendingWorkoutStorageKey) || '';
    window.localStorage.removeItem(pendingWorkoutStorageKey);
    return code;
  } catch (error) {
    return '';
  }
}

async function generateWorkout() {
  const selectedIds = getSelectedDistrictIds();
  let archives;
  try {
    archives = await Promise.all(selectedIds.map(async (districtId) => ({
      districtId,
      database: await loadDistrict(districtId)
    })));
  } catch (error) {
    showError(ui('generator.archiveSelectedError'));
    console.error(error);
    return;
  }

  const quantityValue = els.quantitySelect.dataset.value || '2';
  const metas = getSelectedDistrictMetas();
  state.generatedExercises = [];
  state.sortMode = 'default';
  state.outputMetaLabel = 'generator.generatedLabel';
  state.outputMetaText = '';
  state.outputTotal = null;
  els.sortSelect.value = 'default';
  els.outputTitle.textContent = metas.length === 1
    ? ui('generator.singleWorkout', { district: metas[0].title })
    : ui('generator.multiWorkout');

  archives.forEach(({ districtId, database }) => {
    asDistrictList(database).forEach((district) => {
      (district.sezioni || []).forEach((section) => {
        const exercises = section.esercizi || [];
        const quantity = quantityValue === 'all' ? exercises.length : Number(quantityValue) || 2;
        const selected = chooseRandom(exercises, quantity);
        selected.forEach((exercise) => {
          state.generatedExercises.push(attachWorkoutOrder({
            ...exercise,
            districtId,
            distretto: district.distretto,
            sezione: section.nome
          }, state.generatedExercises.length));
        });
      });
    });
  });

  renderWorkout();
  document.getElementById('workout').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function clearWorkout() {
  const metas = getSelectedDistrictMetas();
  state.generatedExercises = [];
  state.sortMode = 'default';
  state.outputMetaLabel = 'generator.generatedLabel';
  state.outputMetaText = '';
  state.outputTotal = null;
  els.sortSelect.value = 'default';
  if (metas.length) {
    els.outputTitle.textContent = metas.length === 1
      ? ui('generator.singleWorkout', { district: metas[0].title })
      : ui('generator.multiWorkout');
  }
  renderEmptyState();
  document.getElementById('workout').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

async function handleSmartSearch(event) {
  event.preventDefault();

  const query = els.askInput.value.trim();
  if (!query) {
    setAskHint(ui('generator.searchPrompt'));
    els.askInput.focus();
    return;
  }

  setStatus(ui('generator.searchingStatus'));
  setAskHint(ui('generator.searchingHint'));

  try {
    const result = await findSmartMatches(query);
    els.outputTitle.textContent = ui('generator.smartResults');
    state.generatedExercises = result.matches.map((exercise, index) => attachWorkoutOrder(exercise, index));
    state.sortMode = 'default';
    state.outputMetaLabel = 'generator.smartLabel';
    state.outputMetaText = '';
    state.outputTotal = result.total;
    els.sortSelect.value = 'default';

    if (!result.matches.length) {
      els.workoutList.innerHTML = '';
      const empty = document.createElement('div');
      empty.className = 'empty-state';
      empty.textContent = ui('generator.noMatchCopy');
      els.workoutList.appendChild(empty);
      els.outputMeta.textContent = ui('generator.noSmartMatch');
      setSortEnabled(false);
      setAskHint(ui('generator.noMatchHint'));
      setStatus(ui('generator.noSmartMatch'));
      document.getElementById('workout').scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    renderWorkout();
    setAskHint(describeSmartCriteria(result.criteria));
    setStatus(ui('generator.smartReady'));
    document.getElementById('workout').scrollIntoView({ behavior: 'smooth', block: 'start' });
  } catch (error) {
    showError(ui('generator.searchError'));
    setAskHint(ui('generator.searchUnavailable'));
    console.error(error);
  }
}

function createCopyBlock(title, text) {
  if (!text) return null;

  const block = document.createElement('div');
  block.className = 'exercise-copy-block';

  const blockTitle = document.createElement('div');
  blockTitle.className = 'exercise-copy-title';
  blockTitle.textContent = title;

  const blockText = document.createElement('div');
  blockText.className = 'exercise-copy-text';
  blockText.textContent = text;

  block.append(blockTitle, blockText);
  return block;
}

function formatMovementToken(value) {
  const translated = i18n.token(value, currentLanguage);
  if (translated && translated !== value) return translated;
  return String(value || '')
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function createMovementTag(exercise) {
  if (!exercise.movementDistrict || !Array.isArray(exercise.movementTags) || !exercise.movementTags.length) {
    return null;
  }

  const movement = document.createElement('span');
  movement.className = 'movement-tag';
  const district = formatMovementToken(exercise.movementDistrict);
  const tags = exercise.movementTags.map(formatMovementToken).join(' + ');
  movement.textContent = `${district} / ${tags}`;
  return movement;
}

function createDifficultyTag(exercise) {
  const level = getDifficultyLevel(exercise);
  const difficulty = document.createElement('span');
  difficulty.className = 'difficulty-tag';
  difficulty.setAttribute('aria-label', ui('generator.difficultyAria', { level }));

  const label = document.createElement('span');
  label.textContent = ui('generator.difficulty');

  const stars = document.createElement('span');
  stars.className = 'difficulty-stars';

  const filled = document.createElement('span');
  filled.textContent = '★'.repeat(level);

  const empty = document.createElement('span');
  empty.className = 'difficulty-empty';
  empty.textContent = '☆'.repeat(5 - level);

  stars.append(filled, empty);
  difficulty.append(label, stars);
  return difficulty;
}

function getExerciseMovementLabel(exercise) {
  const area = exercise.movementDistrict ? formatMovementToken(exercise.movementDistrict) : ui('generator.notTagged');
  const movement = Array.isArray(exercise.movementTags) && exercise.movementTags.length
    ? exercise.movementTags.map(formatMovementToken).join(' + ')
    : ui('generator.notTagged');

  return `${ui('generator.area')}: ${area} | ${ui('generator.movement')}: ${movement}`;
}

function createReplaceOptionLabel(exercise) {
  const section = exercise.sezione ? `[${exercise.sezione}]` : `[${ui('generator.unsectioned')}]`;
  const difficulty = `${ui('generator.difficulty')}: ${getDifficultyLevel(exercise)}/5`;
  return `${section} ${exercise.nome} | ${getExerciseMovementLabel(exercise)} | ${difficulty}`;
}

function replaceExercise(index, nextExercise) {
  if (!state.generatedExercises[index] || !nextExercise) return;
  const order = state.generatedExercises[index].workoutOrder ?? index;
  state.generatedExercises[index] = attachWorkoutOrder(nextExercise, order);
  sortGeneratedExercises();
  renderWorkout();
}

function removeExercise(index) {
  if (!state.generatedExercises[index]) return;
  state.generatedExercises.splice(index, 1);
  renderWorkout();
}

function createReplaceArea(currentExercise, index) {
  const allExercises = getReplacementExercises(currentExercise);

  const area = document.createElement('div');
  area.className = 'replace-area';

  const label = document.createElement('div');
  label.className = 'replace-label';
  label.textContent = ui('generator.replaceLabel');

  const select = document.createElement('div');
  select.className = 'flow-select replace-select';
  select.setAttribute('aria-label', ui('generator.replacementAria'));

  const replacementOptions = allExercises
    .map((exercise, exerciseIndex) => ({
      value: String(exerciseIndex),
      label: createReplaceOptionLabel(exercise),
      exercise
    }))
    .filter((option) => option.exercise.id !== currentExercise.id);

  const actions = document.createElement('div');
  actions.className = 'replace-actions';

  const confirm = document.createElement('button');
  confirm.type = 'button';
  confirm.className = 'exercise-confirm-button';
  confirm.textContent = ui('generator.confirm');
  confirm.disabled = true;
  confirm.addEventListener('click', () => {
    if (!select.dataset.value) return;
    const next = allExercises[Number(select.dataset.value)];
    replaceExercise(index, next);
  });

  const cancel = document.createElement('button');
  cancel.type = 'button';
  cancel.className = 'exercise-cancel-button';
  cancel.textContent = ui('generator.cancel');
  cancel.addEventListener('click', () => {
    selection.setValue('', true, false);
    area.classList.remove('active');
  });

  const selection = renderSingleFlowSelect(select, {
    options: replacementOptions,
    placeholder: ui('generator.selectExercise'),
    ariaLabel: ui('generator.replacementsAria'),
    onChange: (option) => {
      confirm.disabled = !option;
    }
  });

  actions.append(confirm, cancel);
  area.append(label, select, actions);
  return area;
}

function createExerciseCard(exercise, index) {
  const card = document.createElement('article');
  card.className = 'exercise-card';

  const header = document.createElement('div');
  header.className = 'exercise-card-header';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'checkbox-done';
  checkbox.setAttribute('aria-label', ui('generator.markCompleted', { exercise: exercise.nome }));
  checkbox.addEventListener('change', () => {
    card.classList.toggle('done', checkbox.checked);
  });

  const name = document.createElement('div');
  name.className = 'exercise-name';

  const tag = document.createElement('span');
  tag.className = 'section-tag';
  tag.textContent = `[${exercise.sezione}]`;

  const movementTag = createMovementTag(exercise);
  const difficultyTag = createDifficultyTag(exercise);
  const metaRow = document.createElement('div');
  metaRow.className = 'exercise-meta-row';
  if (movementTag) {
    metaRow.append(movementTag);
  }
  metaRow.append(difficultyTag);

  const title = document.createElement('span');
  title.textContent = exercise.nome;
  name.append(tag);
  name.append(metaRow);
  name.append(title);

  const change = document.createElement('button');
  change.type = 'button';
  change.className = 'exercise-change-button';
  change.textContent = ui('generator.change');

  const remove = document.createElement('button');
  remove.type = 'button';
  remove.className = 'exercise-remove-button';
  remove.textContent = ui('generator.remove');
  remove.addEventListener('click', () => removeExercise(index));

  const replaceArea = createReplaceArea(exercise, index);
  change.addEventListener('click', () => {
    const active = !replaceArea.classList.contains('active');
    replaceArea.classList.toggle('active', active);
    if (!active) {
      closeFlowSelect(replaceArea.querySelector('.flow-select'));
    }
  });

  const actions = document.createElement('div');
  actions.className = 'exercise-card-actions';
  actions.append(change, remove);

  header.append(checkbox, name, actions);

  const content = document.createElement('div');
  content.className = 'exercise-content';
  const media = document.createElement('div');
  media.className = 'exercise-media placeholder-media';
  media.setAttribute('aria-hidden', 'true');
  content.appendChild(media);

  const blocks = [
    createCopyBlock(ui('generator.overview'), exercise.description),
    createCopyBlock(ui('generator.howTo'), exercise.howToDo),
    createCopyBlock(ui('generator.whatToDo'), exercise.whatToDo),
    createCopyBlock(ui('generator.whatNotToDo'), exercise.whatNotToDo),
    !exercise.description && exercise.fullText ? createCopyBlock(ui('generator.notes'), exercise.fullText) : null
  ].filter(Boolean);

  blocks.forEach((block) => content.appendChild(block));
  card.append(header, content, replaceArea);
  return card;
}

function renderWorkout() {
  els.workoutList.innerHTML = '';

  if (!state.generatedExercises.length) {
    renderEmptyState();
    return;
  }

  sortGeneratedExercises();
  const fragment = document.createDocumentFragment();
  let previousDistrict = '';

  state.generatedExercises.forEach((exercise, index) => {
    if (exercise.distretto !== previousDistrict) {
      const title = document.createElement('div');
      title.className = 'district-title';
      title.textContent = exercise.distretto;
      fragment.appendChild(title);
      previousDistrict = exercise.distretto;
    }

    fragment.appendChild(createExerciseCard(exercise, index));
  });

  els.workoutList.appendChild(fragment);
  els.outputMeta.textContent = state.outputMetaText || getOutputMetaText();
  setSortEnabled(true);
  updateWorkoutCodeField();
  setStatus(ui('generator.workoutGenerated'));
}

async function init() {
  if (appInitialized) return;
  appInitialized = true;

  try {
    state.manifest = await fetchJson(manifestUrl);
    state.manifest.districts.forEach((district) => {
      district.title = i18n.districtGroup(district.id, currentLanguage);
      district.label = district.title;
    });
    renderDistrictControls();
    renderQuantityControl();
    document.addEventListener('click', (event) => {
      document.querySelectorAll('.flow-select.open').forEach((root) => {
        if (!root.contains(event.target)) closeFlowSelect(root);
      });
    });
    document.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape') return;
      const openMenus = [...document.querySelectorAll('.flow-select.open')];
      if (!openMenus.length) return;
      event.preventDefault();
      openMenus.forEach((root, menuIndex) => {
        closeFlowSelect(root, menuIndex === openMenus.length - 1);
      });
    });
    els.generateButton.addEventListener('click', generateWorkout);
    els.clearButton.addEventListener('click', clearWorkout);
    els.askForm.addEventListener('submit', handleSmartSearch);
    els.sortSelect.addEventListener('change', handleSortChange);
    els.copyCodeButton.addEventListener('click', copyWorkoutCode);
    els.loadCodeButton.addEventListener('click', loadWorkoutCode);

    const initialDistricts = getInitialDistrictIds(state.manifest);
    await selectDistricts(initialDistricts);

    const pendingWorkoutCode = takePendingWorkoutCode();
    if (pendingWorkoutCode) {
      els.workoutCodeInput.value = pendingWorkoutCode;
      await loadWorkoutCode();
    }
  } catch (error) {
    showError(ui('generator.archiveLoadError'));
    console.error(error);
  }
}

i18n.apply(document);
i18n.mountLanguageSelectors();
setupSmartHeaders();
setupAccessGate();
