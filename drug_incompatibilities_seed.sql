insert into public.drug_incompatibilities
  (drug_a, drug_b, incompatibility_type, severity, mechanism, clinical_note, source)
values
  (
    'Ceftriaxone', 'Calcium gluconate', 'y-site', 'contraindicated',
    'Forms an insoluble ceftriaxone-calcium precipitate',
    'FDA black-box warning: never co-administer, even via separate lines/sites, in neonates ≤28 days. In older patients, separate administration and flush the line between doses.',
    'FDA Drug Safety Communication; Trissel''s IV Compatibility'
  ),
  (
    'Ceftriaxone', 'Calcium chloride', 'y-site', 'contraindicated',
    'Forms an insoluble ceftriaxone-calcium precipitate',
    'Same precipitation risk as calcium gluconate; avoid co-administration, especially in neonates.',
    'FDA Drug Safety Communication'
  ),
  (
    'Phenytoin', 'Dextrose 5% in water (D5W)', 'solution', 'incompatible',
    'Phenytoin precipitates out of solution at physiologic pH in dextrose-containing fluids',
    'Dilute and flush only with normal saline; use an in-line filter.',
    'Trissel''s IV Compatibility'
  ),
  (
    'Furosemide', 'Midazolam', 'y-site', 'incompatible',
    'pH-dependent precipitation',
    'Do not co-infuse via the same line; flush between medications.',
    'Trissel''s IV Compatibility'
  ),
  (
    'Diazepam', 'Normal saline (most diluents)', 'solution', 'incompatible',
    'Diazepam is poorly water-soluble and adsorbs to plastic IV tubing/precipitates when diluted',
    'Give slow IV push undiluted where possible; avoid admixture.',
    'Trissel''s IV Compatibility'
  ),
  (
    'Heparin', 'Vancomycin', 'y-site', 'variable',
    'Reported precipitation in some concentration combinations',
    'Compatibility is concentration-dependent; check current reference before Y-site administration.',
    'Trissel''s IV Compatibility'
  ),
  (
    'Insulin', 'IV fat emulsions / lipid infusions', 'admixture', 'caution',
    'Insulin can adsorb to tubing and lipid emulsion components, altering delivered dose',
    'If co-administered in TPN, verify with pharmacy-approved TPN compatibility data.',
    'Institutional TPN compatibility references'
  ),
  (
    'Amiodarone', 'Sodium bicarbonate', 'y-site', 'incompatible',
    'Precipitation on contact',
    'Administer via separate lines; flush thoroughly between infusions.',
    'Trissel''s IV Compatibility'
  ),
  (
    'Propofol', 'Most other IV medications', 'y-site', 'caution',
    'Propofol is a lipid emulsion; many drugs are physically incompatible or the emulsion can be destabilized',
    'Preferably run on a dedicated line; verify any co-administration individually.',
    'Trissel''s IV Compatibility'
  ),
  (
    'Ondansetron', 'Furosemide', 'y-site', 'incompatible',
    'Precipitation reported at Y-site',
    'Administer separately; flush line between drugs.',
    'Trissel''s IV Compatibility'
  )
on conflict (drug_a_normalized, drug_b_normalized, incompatibility_type) do nothing;
