const manifestUrl = 'data/manifest.json';
const accessHash = '822f71cc551b8d41e032f7687a4afa309084b470a8c8828b4730c995ffeea9ac';
const accessStorageKey = 'splitapaBetaAccess';

const state = {
  manifest: null,
  databaseByDistrict: new Map(),
  currentDistrictId: '',
  generatedExercises: [],
  sortMode: 'default',
  outputMetaLabel: 'exercises generated',
  outputMetaText: ''
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
  outputTitle: document.getElementById('outputTitle'),
  outputMeta: document.getElementById('outputMeta'),
  workoutList: document.getElementById('workoutList')
};

let appInitialized = false;

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
  init();
}

async function handleAccessSubmit(event) {
  event.preventDefault();

  const candidate = els.accessPassword.value;
  if (!candidate) {
    setAccessError('Enter the beta password.');
    return;
  }

  try {
    const candidateHash = await hashText(candidate);
    if (candidateHash !== accessHash) {
      setAccessError('Wrong password. Please try again.');
      els.accessPassword.select();
      return;
    }

    storeAccess();
    els.accessPassword.value = '';
    unlockApp();
  } catch (error) {
    setAccessError('Access check failed in this browser. Try opening the app in a standard browser tab.');
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
  setStatus('Archive error');
}

function setAskHint(message) {
  if (els.askHint) {
    els.askHint.textContent = message;
  }
}

function normalizeText(value) {
  return String(value || '')
    .toLowerCase()
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
    ? `Matched: ${uniqueValues(parts).join(' / ')}`
    : 'Matched by exercise text';
}

function getInitialDistrictId(manifest) {
  const params = new URLSearchParams(window.location.search);
  const requested = params.get('district') || window.location.hash.replace('#', '');
  const hasRequested = manifest.districts.some((district) => district.id === requested);
  return hasRequested ? requested : manifest.districts[0]?.id;
}

function getDistrictMeta(id) {
  return state.manifest.districts.find((district) => district.id === id);
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

  setStatus(`Loading ${meta.title}`);
  const database = await fetchJson(meta.file);
  state.databaseByDistrict.set(id, database);
  return database;
}

function updateUrl(id) {
  const url = new URL(window.location.href);
  url.searchParams.set('district', id);
  try {
    window.history.replaceState({}, '', url);
  } catch (error) {
    // Embedded contexts can block history updates. The app still works.
  }
}

function renderDistrictControls() {
  els.districtTabs.innerHTML = '';
  els.districtSelect.innerHTML = '';

  state.manifest.districts.forEach((district) => {
    const tab = document.createElement('button');
    tab.type = 'button';
    tab.className = 'district-tab small-label';
    tab.dataset.district = district.id;
    tab.textContent = district.title;
    tab.addEventListener('click', () => selectDistrict(district.id));
    els.districtTabs.appendChild(tab);

    const option = document.createElement('option');
    option.value = district.id;
    option.textContent = district.title;
    els.districtSelect.appendChild(option);
  });
}

function renderSelectedDistrict() {
  const meta = getDistrictMeta(state.currentDistrictId);
  if (!meta) return;

  els.selectedDistrictLabel.textContent = meta.title;
  els.selectedDistrictMeta.textContent = `${meta.exercises} exercises`;
  els.generatorTitle.textContent = `${meta.title} plan`;
  els.generatorCopy.textContent = `${meta.sections} sections available. Generate a complete plan or replace individual exercises after generation.`;
  els.outputTitle.textContent = `${meta.title} workout`;
  els.districtSelect.value = meta.id;

  document.querySelectorAll('.district-tab').forEach((tab) => {
    tab.classList.toggle('active', tab.dataset.district === meta.id);
  });

  if (!state.generatedExercises.length) {
    renderEmptyState(meta);
  }
}

async function selectDistrict(id) {
  state.currentDistrictId = id;
  state.generatedExercises = [];
  updateUrl(id);
  renderSelectedDistrict();

  try {
    await loadDistrict(id);
    setStatus('Archive ready');
  } catch (error) {
    const meta = getDistrictMeta(id);
    showError(`${meta?.title || 'Selected'} archive could not be loaded. Check that this district JSON file is published correctly.`);
    console.error(error);
  }
}

function renderEmptyState(meta = getDistrictMeta(state.currentDistrictId)) {
  els.workoutList.innerHTML = '';
  const empty = document.createElement('div');
  empty.className = 'empty-state';
  empty.textContent = meta
    ? `No workout generated. Select ${meta.title} and press Generate workout.`
    : 'No workout generated.';
  els.outputMeta.textContent = 'No workout generated';
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

function setSortEnabled(enabled) {
  els.sortSelect.disabled = !enabled;
  if (!enabled) {
    state.sortMode = 'default';
    els.sortSelect.value = 'default';
  }
}

function attachWorkoutOrder(exercise, order) {
  return {
    ...exercise,
    workoutOrder: order
  };
}

function sortGeneratedExercises() {
  const direction = state.sortMode;
  state.generatedExercises.sort((a, b) => {
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

async function generateWorkout() {
  let database;
  try {
    database = await loadDistrict(state.currentDistrictId);
  } catch (error) {
    const meta = getDistrictMeta(state.currentDistrictId);
    showError(`${meta?.title || 'Selected'} archive could not be loaded. Check that this district JSON file and its images are published correctly.`);
    console.error(error);
    return;
  }

  const quantity = Number(els.quantitySelect.value) || 2;
  const meta = getDistrictMeta(state.currentDistrictId);
  state.generatedExercises = [];
  state.sortMode = 'default';
  state.outputMetaLabel = 'exercises generated';
  state.outputMetaText = '';
  els.sortSelect.value = 'default';
  if (meta) {
    els.outputTitle.textContent = `${meta.title} workout`;
  }

  asDistrictList(database).forEach((district) => {
    (district.sezioni || []).forEach((section) => {
      const selected = chooseRandom(section.esercizi || [], quantity);
      selected.forEach((exercise) => {
        state.generatedExercises.push(attachWorkoutOrder({
          ...exercise,
          districtId: state.currentDistrictId,
          distretto: district.distretto,
          sezione: section.nome
        }, state.generatedExercises.length));
      });
    });
  });

  renderWorkout();
  document.getElementById('workout').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function clearWorkout() {
  const meta = getDistrictMeta(state.currentDistrictId);
  state.generatedExercises = [];
  state.sortMode = 'default';
  state.outputMetaLabel = 'exercises generated';
  state.outputMetaText = '';
  els.sortSelect.value = 'default';
  if (meta) {
    els.outputTitle.textContent = `${meta.title} workout`;
  }
  renderEmptyState();
  document.getElementById('workout').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

async function handleSmartSearch(event) {
  event.preventDefault();

  const query = els.askInput.value.trim();
  if (!query) {
    setAskHint('Enter a district and movement, for example shoulder flexion.');
    els.askInput.focus();
    return;
  }

  setStatus('Searching archive');
  setAskHint('Searching local archive');

  try {
    const result = await findSmartMatches(query);
    els.outputTitle.textContent = 'Smart results';
    state.generatedExercises = result.matches.map((exercise, index) => attachWorkoutOrder(exercise, index));
    state.sortMode = 'default';
    state.outputMetaLabel = 'smart matches';
    state.outputMetaText = result.total > result.matches.length
      ? `${result.matches.length} of ${result.total} smart matches`
      : `${result.matches.length} smart matches`;
    els.sortSelect.value = 'default';

    if (!result.matches.length) {
      els.workoutList.innerHTML = '';
      const empty = document.createElement('div');
      empty.className = 'empty-state';
      empty.textContent = 'No matching exercise found. Try a broader query such as shoulder mobility or ankle flexion.';
      els.workoutList.appendChild(empty);
      els.outputMeta.textContent = 'No smart match';
      setSortEnabled(false);
      setAskHint('No match. Try a broader query.');
      setStatus('No smart match');
      document.getElementById('workout').scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    renderWorkout();
    setAskHint(describeSmartCriteria(result.criteria));
    setStatus('Smart search ready');
    document.getElementById('workout').scrollIntoView({ behavior: 'smooth', block: 'start' });
  } catch (error) {
    showError('Smart search could not read the local archive. Check that all JSON files are published correctly.');
    setAskHint('Search unavailable');
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
  difficulty.setAttribute('aria-label', `Difficulty ${level} of 5`);

  const label = document.createElement('span');
  label.textContent = 'Difficulty';

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

function replaceExercise(index, nextExercise) {
  if (!state.generatedExercises[index] || !nextExercise) return;
  const order = state.generatedExercises[index].workoutOrder ?? index;
  state.generatedExercises[index] = attachWorkoutOrder(nextExercise, order);
  sortGeneratedExercises();
  renderWorkout();
}

function createReplaceArea(currentExercise, index) {
  const allExercises = getReplacementExercises(currentExercise);

  const area = document.createElement('div');
  area.className = 'replace-area';

  const label = document.createElement('div');
  label.className = 'replace-label';
  label.textContent = 'Choose another exercise from the same district';

  const select = document.createElement('select');
  select.className = 'replace-select';

  const placeholder = document.createElement('option');
  placeholder.value = '';
  placeholder.disabled = true;
  placeholder.selected = true;
  placeholder.textContent = 'Select exercise';
  select.appendChild(placeholder);

  allExercises.forEach((exercise, exerciseIndex) => {
    if (exercise.id === currentExercise.id) return;
    const option = document.createElement('option');
    option.value = String(exerciseIndex);
    option.textContent = `[${exercise.sezione}] ${exercise.nome}`;
    select.appendChild(option);
  });

  const actions = document.createElement('div');
  actions.className = 'replace-actions';

  const confirm = document.createElement('button');
  confirm.type = 'button';
  confirm.className = 'exercise-confirm-button';
  confirm.textContent = 'Confirm';
  confirm.addEventListener('click', () => {
    const next = allExercises[Number(select.value)];
    replaceExercise(index, next);
  });

  const cancel = document.createElement('button');
  cancel.type = 'button';
  cancel.className = 'exercise-cancel-button';
  cancel.textContent = 'Cancel';
  cancel.addEventListener('click', () => {
    area.classList.remove('active');
    select.value = '';
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
  change.textContent = 'Change';

  const replaceArea = createReplaceArea(exercise, index);
  change.addEventListener('click', () => {
    replaceArea.classList.toggle('active');
  });

  header.append(checkbox, name, change);

  const content = document.createElement('div');
  content.className = 'exercise-content';
  const media = document.createElement('div');
  media.className = 'exercise-media placeholder-media';
  media.setAttribute('aria-hidden', 'true');
  content.appendChild(media);

  const blocks = [
    createCopyBlock('Overview', exercise.description),
    createCopyBlock('How to do it', exercise.howToDo),
    createCopyBlock('What to do', exercise.whatToDo),
    createCopyBlock('What not to do', exercise.whatNotToDo),
    !exercise.description && exercise.fullText ? createCopyBlock('Exercise notes', exercise.fullText) : null
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
  els.outputMeta.textContent = state.outputMetaText || `${state.generatedExercises.length} ${state.outputMetaLabel}`;
  setSortEnabled(true);
  setStatus('Workout generated');
}

async function init() {
  if (appInitialized) return;
  appInitialized = true;

  try {
    state.manifest = await fetchJson(manifestUrl);
    renderDistrictControls();
    els.districtSelect.addEventListener('change', () => selectDistrict(els.districtSelect.value));
    els.generateButton.addEventListener('click', generateWorkout);
    els.clearButton.addEventListener('click', clearWorkout);
    els.askForm.addEventListener('submit', handleSmartSearch);
    els.sortSelect.addEventListener('change', handleSortChange);

    const initialDistrict = getInitialDistrictId(state.manifest);
    await selectDistrict(initialDistrict);
  } catch (error) {
    showError('The exercise archive could not be loaded. Publish this folder on a static host or preview it through a local server.');
    console.error(error);
  }
}

setupAccessGate();
