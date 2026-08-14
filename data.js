/**
 * data.js
 * -------------------------------------------------------------------------
 * Clinical anatomy data for a 3D animated heart model.
 *
 * Each entry represents one anatomical structure and includes:
 *   - id            unique slug (use for DOM ids / lookups)
 *   - name          display name
 *   - latin         Latin/clinical term (optional, shown in tooltips)
 *   - category      one of HEART_CATEGORIES (for color-coding / filtering)
 *   - position      {x, y, z} anchor point for a label/hotspot marker,
 *                   normalized roughly to a unit heart centered at origin
 *                   (scale to match your actual 3D model's bounding box)
 *   - color         hex color used for the marker + category highlight
 *   - points        array of short clinical/functional facts (bullet points)
 *
 * Orientation convention used for `position` (anatomical, as viewed from
 * the front / anterior view of the model):
 *   +x = patient's LEFT   (viewer's right)
 *   -x = patient's RIGHT  (viewer's left)
 *   +y = superior (up, toward base/great vessels)
 *   -y = inferior (down, toward apex)
 *   +z = anterior (toward viewer)
 *   -z = posterior (away from viewer)
 *
 * Usage:
 *   import { HEART_PARTS, HEART_CATEGORIES } from './data.js';
 *   HEART_PARTS.forEach(part => spawnLabel(part));
 * -------------------------------------------------------------------------
 */

// ---------------------------------------------------------------------------
// Category legend — used to color-code chambers, valves, vessels, etc.
// ---------------------------------------------------------------------------
export const HEART_CATEGORIES = {
  chamber:     { label: 'Chambers',           color: '#e2574c' },
  valve:       { label: 'Valves',             color: '#f2a541' },
  vessel:      { label: 'Great Vessels',      color: '#2dd4bf' },
  conduction:  { label: 'Conduction System',  color: '#7c9cff' },
  coronary:    { label: 'Coronary Vessels',   color: '#e35bd8' },
  layer:       { label: 'Wall / Layers',      color: '#8fa0bc' },
  structure:   { label: 'Support Structures', color: '#9cd67a' },
};

// ---------------------------------------------------------------------------
// Main dataset
// ---------------------------------------------------------------------------
export const HEART_PARTS = [

  // ===================== CHAMBERS =====================
  {
    id: 'right-atrium',
    name: 'Right Atrium',
    latin: 'Atrium dextrum',
    category: 'chamber',
    position: { x: -0.55, y: 0.55, z: 0.35 },
    color: HEART_CATEGORIES.chamber.color,
    points: [
      'Receives deoxygenated blood from the superior and inferior vena cava.',
      'Also receives blood from the coronary sinus (cardiac venous return).',
      'Contains the sinoatrial (SA) node in its upper wall — the heart\'s natural pacemaker.',
      'Empties into the right ventricle through the tricuspid valve.',
    ],
  },
  {
    id: 'right-ventricle',
    name: 'Right Ventricle',
    latin: 'Ventriculus dexter',
    category: 'chamber',
    position: { x: -0.4, y: -0.15, z: 0.45 },
    color: HEART_CATEGORIES.chamber.color,
    points: [
      'Pumps deoxygenated blood into the pulmonary trunk toward the lungs.',
      'Thinner-walled than the left ventricle (pumps against lower pulmonary pressure).',
      'Contains trabeculae carneae and papillary muscles anchoring the tricuspid valve.',
      'Forms most of the anterior surface of the heart.',
    ],
  },
  {
    id: 'left-atrium',
    name: 'Left Atrium',
    latin: 'Atrium sinistrum',
    category: 'chamber',
    position: { x: 0.35, y: 0.55, z: -0.3 },
    color: HEART_CATEGORIES.chamber.color,
    points: [
      'Receives oxygenated blood from the four pulmonary veins.',
      'Forms most of the posterior (base) surface of the heart.',
      'Empties into the left ventricle through the mitral (bicuspid) valve.',
      'Common site for thrombus formation in atrial fibrillation.',
    ],
  },
  {
    id: 'left-ventricle',
    name: 'Left Ventricle',
    latin: 'Ventriculus sinister',
    category: 'chamber',
    position: { x: 0.3, y: -0.2, z: 0.15 },
    color: HEART_CATEGORIES.chamber.color,
    points: [
      'Pumps oxygenated blood into the aorta and out to the systemic circulation.',
      'Has the thickest myocardial wall (up to ~3x the right ventricle) to generate high pressure.',
      'Forms the apex of the heart.',
      'Ejection fraction (normal ~55-70%) is the key clinical measure of its pumping function.',
    ],
  },

  // ===================== VALVES =====================
  {
    id: 'tricuspid-valve',
    name: 'Tricuspid Valve',
    latin: 'Valva tricuspidalis',
    category: 'valve',
    position: { x: -0.42, y: 0.18, z: 0.35 },
    color: HEART_CATEGORIES.valve.color,
    points: [
      'Atrioventricular valve between the right atrium and right ventricle.',
      'Has three leaflets (anterior, posterior, septal).',
      'Prevents backflow of blood into the right atrium during ventricular systole.',
      'Anchored by chordae tendineae to papillary muscles.',
    ],
  },
  {
    id: 'pulmonary-valve',
    name: 'Pulmonary Valve',
    latin: 'Valva trunci pulmonalis',
    category: 'valve',
    position: { x: -0.25, y: 0.65, z: 0.3 },
    color: HEART_CATEGORIES.valve.color,
    points: [
      'Semilunar valve between the right ventricle and pulmonary trunk.',
      'Has three cusps; opens during systole, closes during diastole.',
      'Prevents backflow of blood into the right ventricle.',
      'Closure produces the pulmonic component of the second heart sound (S2).',
    ],
  },
  {
    id: 'mitral-valve',
    name: 'Mitral Valve',
    latin: 'Valva mitralis (bicuspidalis)',
    category: 'valve',
    position: { x: 0.32, y: 0.15, z: -0.1 },
    color: HEART_CATEGORIES.valve.color,
    points: [
      'Atrioventricular valve between the left atrium and left ventricle.',
      'Only valve in the heart with two leaflets (anterior and posterior).',
      'Prolapse or regurgitation here is one of the most common valvular disorders.',
      'Anchored by chordae tendineae to anterolateral and posteromedial papillary muscles.',
    ],
  },
  {
    id: 'aortic-valve',
    name: 'Aortic Valve',
    latin: 'Valva aortae',
    category: 'valve',
    position: { x: 0.1, y: 0.6, z: -0.05 },
    color: HEART_CATEGORIES.valve.color,
    points: [
      'Semilunar valve between the left ventricle and the aorta.',
      'Has three cusps (left, right, posterior/non-coronary).',
      'Coronary arteries originate just above the right and left coronary cusps.',
      'Closure produces the aortic component of the second heart sound (S2).',
    ],
  },

  // ===================== GREAT VESSELS =====================
  {
    id: 'superior-vena-cava',
    name: 'Superior Vena Cava',
    latin: 'Vena cava superior',
    category: 'vessel',
    position: { x: -0.3, y: 0.95, z: 0.2 },
    color: HEART_CATEGORIES.vessel.color,
    points: [
      'Returns deoxygenated blood from the head, neck, and upper limbs to the right atrium.',
      'Common site for central venous catheter placement.',
      'Lacks valves — flow is driven by pressure gradients and respiration.',
    ],
  },
  {
    id: 'inferior-vena-cava',
    name: 'Inferior Vena Cava',
    latin: 'Vena cava inferior',
    category: 'vessel',
    position: { x: -0.35, y: -0.35, z: 0.25 },
    color: HEART_CATEGORIES.vessel.color,
    points: [
      'Returns deoxygenated blood from the lower body and abdomen to the right atrium.',
      'Largest vein in the body.',
      'Passes through the diaphragm at the caval opening (T8 level).',
    ],
  },
  {
    id: 'pulmonary-trunk',
    name: 'Pulmonary Trunk / Arteries',
    latin: 'Truncus pulmonalis',
    category: 'vessel',
    position: { x: -0.15, y: 0.85, z: 0.15 },
    color: HEART_CATEGORIES.vessel.color,
    points: [
      'Carries deoxygenated blood from the right ventricle to the lungs.',
      'Splits into left and right pulmonary arteries beneath the aortic arch.',
      'The only artery in the body that carries deoxygenated blood.',
    ],
  },
  {
    id: 'pulmonary-veins',
    name: 'Pulmonary Veins',
    latin: 'Venae pulmonales',
    category: 'vessel',
    position: { x: 0.5, y: 0.7, z: -0.35 },
    color: HEART_CATEGORIES.vessel.color,
    points: [
      'Four veins (two per lung) returning oxygenated blood to the left atrium.',
      'The only veins in the body that carry oxygenated blood.',
      'A frequent focal source of ectopic electrical activity in atrial fibrillation.',
    ],
  },
  {
    id: 'aorta',
    name: 'Aorta',
    latin: 'Aorta',
    category: 'vessel',
    position: { x: 0.05, y: 1.0, z: -0.1 },
    color: HEART_CATEGORIES.vessel.color,
    points: [
      'The largest artery in the body; distributes oxygenated blood to the systemic circulation.',
      'Ascending aorta, arch, descending (thoracic and abdominal) segments.',
      'Gives rise to the coronary arteries at the aortic root, just above the aortic valve.',
    ],
  },

  // ===================== CONDUCTION SYSTEM =====================
  {
    id: 'sa-node',
    name: 'Sinoatrial (SA) Node',
    latin: 'Nodus sinuatrialis',
    category: 'conduction',
    position: { x: -0.5, y: 0.7, z: 0.3 },
    color: HEART_CATEGORIES.conduction.color,
    points: [
      'The heart\'s primary pacemaker, located in the right atrial wall near the SVC opening.',
      'Sets the intrinsic heart rate (~60–100 bpm at rest).',
      'Generates the electrical impulse that initiates each cardiac cycle.',
    ],
  },
  {
    id: 'av-node',
    name: 'Atrioventricular (AV) Node',
    latin: 'Nodus atrioventricularis',
    category: 'conduction',
    position: { x: -0.15, y: 0.25, z: 0.15 },
    color: HEART_CATEGORIES.conduction.color,
    points: [
      'Located in the interatrial septum near the coronary sinus opening.',
      'Delays the impulse (~0.1s) to allow atrial contraction to complete before ventricular contraction.',
      'Acts as a backup pacemaker (~40–60 bpm) if the SA node fails.',
    ],
  },
  {
    id: 'bundle-of-his',
    name: 'Bundle of His',
    latin: 'Fasciculus atrioventricularis',
    category: 'conduction',
    position: { x: -0.05, y: 0.0, z: 0.1 },
    color: HEART_CATEGORIES.conduction.color,
    points: [
      'Carries the impulse from the AV node into the interventricular septum.',
      'Divides into left and right bundle branches.',
      'Damage here can cause bundle branch block, visible on ECG as QRS widening.',
    ],
  },
  {
    id: 'purkinje-fibers',
    name: 'Purkinje Fibers',
    latin: 'Rami subendocardiales',
    category: 'conduction',
    position: { x: 0.15, y: -0.6, z: 0.2 },
    color: HEART_CATEGORIES.conduction.color,
    points: [
      'Fast-conducting fibers spreading through the ventricular myocardium from the apex upward.',
      'Trigger near-simultaneous contraction of both ventricles.',
      'Conduct impulses up to 4 m/s — the fastest conduction velocity in the heart.',
    ],
  },

  // ===================== CORONARY VESSELS =====================
  {
    id: 'lad-artery',
    name: 'Left Anterior Descending Artery',
    latin: 'Ramus interventricularis anterior',
    category: 'coronary',
    position: { x: 0.05, y: 0.1, z: 0.55 },
    color: HEART_CATEGORIES.coronary.color,
    points: [
      'Branch of the left coronary artery running down the anterior interventricular groove.',
      'Supplies the anterior left ventricle and most of the interventricular septum.',
      'Nicknamed "the widow-maker" — proximal occlusion causes large anterior MI.',
    ],
  },
  {
    id: 'circumflex-artery',
    name: 'Left Circumflex Artery',
    latin: 'Ramus circumflexus',
    category: 'coronary',
    position: { x: 0.4, y: 0.1, z: -0.25 },
    color: HEART_CATEGORIES.coronary.color,
    points: [
      'Branch of the left coronary artery running in the left atrioventricular groove.',
      'Supplies the lateral and posterior walls of the left ventricle.',
      'Occlusion often produces ECG changes in leads I, aVL, V5–V6.',
    ],
  },
  {
    id: 'rca',
    name: 'Right Coronary Artery',
    latin: 'Arteria coronaria dextra',
    category: 'coronary',
    position: { x: -0.45, y: 0.15, z: 0.3 },
    color: HEART_CATEGORIES.coronary.color,
    points: [
      'Runs in the right atrioventricular groove.',
      'Supplies the right atrium, right ventricle, and (in most people) the SA and AV nodes.',
      'Occlusion commonly causes inferior MI and can cause bradyarrhythmias.',
    ],
  },

  // ===================== WALL LAYERS =====================
  {
    id: 'pericardium',
    name: 'Pericardium',
    latin: 'Pericardium',
    category: 'layer',
    position: { x: 0.0, y: -0.9, z: 0.5 },
    color: HEART_CATEGORIES.layer.color,
    points: [
      'Double-walled sac enclosing the heart: fibrous (outer) and serous (inner) layers.',
      'The serous layer has parietal and visceral (epicardium) sub-layers, separated by pericardial fluid.',
      'Reduces friction during heartbeats and anchors the heart within the mediastinum.',
      'Inflammation (pericarditis) or fluid buildup (tamponade) are key clinical conditions here.',
    ],
  },
  {
    id: 'epicardium',
    name: 'Epicardium',
    latin: 'Epicardium (visceral pericardium)',
    category: 'layer',
    position: { x: 0.2, y: -0.7, z: 0.45 },
    color: HEART_CATEGORIES.layer.color,
    points: [
      'Outermost layer of the heart wall; also the inner layer of the serous pericardium.',
      'Contains coronary vessels and a variable layer of epicardial fat.',
    ],
  },
  {
    id: 'myocardium',
    name: 'Myocardium',
    latin: 'Myocardium',
    category: 'layer',
    position: { x: 0.25, y: -0.4, z: 0.3 },
    color: HEART_CATEGORIES.layer.color,
    points: [
      'Middle, muscular layer responsible for contraction; thickest in the left ventricle.',
      'Composed of cardiac muscle cells (cardiomyocytes) connected by intercalated discs.',
      'Ischemia or infarction of this layer defines a myocardial infarction ("heart attack").',
    ],
  },
  {
    id: 'endocardium',
    name: 'Endocardium',
    latin: 'Endocardium',
    category: 'layer',
    position: { x: 0.15, y: -0.25, z: 0.1 },
    color: HEART_CATEGORIES.layer.color,
    points: [
      'Innermost layer lining the chambers and valves.',
      'Continuous with the inner lining (endothelium) of blood vessels.',
      'Site of infection in infective endocarditis.',
    ],
  },
  {
    id: 'interventricular-septum',
    name: 'Interventricular Septum',
    latin: 'Septum interventriculare',
    category: 'layer',
    position: { x: 0.0, y: -0.15, z: 0.0 },
    color: HEART_CATEGORIES.layer.color,
    points: [
      'Muscular wall separating the left and right ventricles.',
      'Membranous (upper) and muscular (lower, thicker) portions.',
      'Congenital defects here (VSD) are among the most common heart defects.',
    ],
  },

  // ===================== SUPPORT STRUCTURES =====================
  {
    id: 'papillary-muscles',
    name: 'Papillary Muscles',
    latin: 'Musculi papillares',
    category: 'structure',
    position: { x: 0.25, y: -0.45, z: 0.05 },
    color: HEART_CATEGORIES.structure.color,
    points: [
      'Muscular projections from the ventricular wall that anchor the chordae tendineae.',
      'Contract slightly before the ventricles to pre-tension the AV valve leaflets.',
      'Rupture (often post-MI) causes acute, severe valve regurgitation.',
    ],
  },
  {
    id: 'chordae-tendineae',
    name: 'Chordae Tendineae',
    latin: 'Chordae tendineae',
    category: 'structure',
    position: { x: 0.28, y: -0.05, z: -0.05 },
    color: HEART_CATEGORIES.structure.color,
    points: [
      'Fibrous "heart strings" connecting papillary muscles to the AV valve leaflets.',
      'Prevent the mitral and tricuspid valves from prolapsing back into the atria during systole.',
    ],
  },
  {
    id: 'apex',
    name: 'Apex of the Heart',
    latin: 'Apex cordis',
    category: 'structure',
    position: { x: 0.2, y: -1.05, z: 0.3 },
    color: HEART_CATEGORIES.structure.color,
    points: [
      'The pointed inferolateral tip of the heart, formed mainly by the left ventricle.',
      'Normally located at the 5th intercostal space, midclavicular line.',
      'The apex beat (point of maximal impulse) is palpated here on clinical exam.',
    ],
  },
];

// ---------------------------------------------------------------------------
// Convenience helpers
// ---------------------------------------------------------------------------

/** Look up a single part by its id. */
export function getPartById(id) {
  return HEART_PARTS.find(part => part.id === id) || null;
}

/** Get all parts belonging to a given category key (e.g. 'valve'). */
export function getPartsByCategory(category) {
  return HEART_PARTS.filter(part => part.category === category);
}

/** Flat list of {id, name} pairs — handy for building a menu/legend UI. */
export function getPartIndex() {
  return HEART_PARTS.map(({ id, name, category }) => ({ id, name, category }));
}

export default HEART_PARTS;
