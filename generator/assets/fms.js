const accessStorageKey = 'splitapaBetaAccess';
const legacyDraftStorageKey = 'splitapaFmsDraft';
const pendingWorkoutStorageKey = 'splitapaPendingWorkoutCode';
const workoutCodePrefix = 'SAPA1-';
const i18n = window.SplitApaI18n;
const language = i18n.getLanguage();
const languageIndex = { en: 1, it: 2, es: 3, fr: 4, de: 5 };

const copyRows = [
  ['pageTitle', 'Split APA FMS Assessment', 'Valutazione FMS Split APA', 'Evaluación FMS Split APA', 'Évaluation FMS Split APA', 'Split APA FMS Bewertung'],
  ['backGenerator', 'Back to generator', 'Torna al generatore', 'Volver al generador', 'Retour au générateur', 'Zurück zum Generator'],
  ['heroEyebrow', 'Movement screening / Guided profile', 'Screening del movimento / Profilo guidato', 'Cribado del movimiento / Perfil guiado', 'Dépistage du mouvement / Profil guidé', 'Bewegungsscreening / Geführtes Profil'],
  ['heroHeading', 'FMS Assessment', 'Valutazione FMS', 'Evaluación FMS', 'Évaluation FMS', 'FMS Bewertung'],
  ['heroLead', 'Record the seven movement patterns, identify priorities, and create three progressive Split APA plans.', 'Registra i sette schemi di movimento, identifica le priorità e crea tre programmi Split APA progressivi.', 'Registra los siete patrones de movimiento, identifica las prioridades y crea tres programas progresivos de Split APA.', 'Consignez les sept schémas de mouvement, identifiez les priorités et créez trois programmes Split APA progressifs.', 'Erfassen Sie die sieben Bewegungsmuster, bestimmen Sie Prioritäten und erstellen Sie drei aufeinander aufbauende Split APA Programme.'],
  ['startAssessment', 'Start assessment', 'Inizia la valutazione', 'Iniciar evaluación', 'Commencer l’évaluation', 'Bewertung starten'],
  ['openGenerator', 'Open generator', 'Apri il generatore', 'Abrir el generador', 'Ouvrir le générateur', 'Generator öffnen'],
  ['overviewAria', 'Assessment overview', 'Panoramica della valutazione', 'Resumen de la evaluación', 'Aperçu de l’évaluation', 'Übersicht der Bewertung'],
  ['testsLabel', 'Tests', 'Test', 'Pruebas', 'Tests', 'Tests'],
  ['scoreLabel', 'Score', 'Punteggio', 'Puntuación', 'Score', 'Punktzahl'],
  ['plansLabel', 'Plans', 'Programmi', 'Programas', 'Programmes', 'Programme'],
  ['protocolEyebrow', 'Assessment protocol / 01', 'Protocollo di valutazione / 01', 'Protocolo de evaluación / 01', 'Protocole d’évaluation / 01', 'Bewertungsprotokoll / 01'],
  ['protocolHeading', 'Score movement quality.', 'Valuta la qualità del movimento.', 'Evalúa la calidad del movimiento.', 'Évaluez la qualité du mouvement.', 'Bewegungsqualität bewerten.'],
  ['protocolCopy', 'Use the standard 0–3 scale. Bilateral tests require both sides and retain the lower score. This tool supports structured observation and does not provide a diagnosis.', 'Utilizza la scala standard 0–3. Nei test bilaterali valuta entrambi i lati e considera il punteggio più basso. Questo strumento supporta un’osservazione strutturata e non formula diagnosi.', 'Utiliza la escala estándar de 0 a 3. Las pruebas bilaterales requieren ambos lados y conservan la puntuación más baja. Esta herramienta facilita una observación estructurada y no establece diagnósticos.', 'Utilisez l’échelle standard de 0 à 3. Les tests bilatéraux exigent l’évaluation des deux côtés et retiennent le score le plus faible. Cet outil soutient une observation structurée et ne pose pas de diagnostic.', 'Verwenden Sie die Standardskala von 0 bis 3. Bei bilateralen Tests werden beide Seiten bewertet und der niedrigere Wert übernommen. Dieses Werkzeug unterstützt eine strukturierte Beobachtung und stellt keine Diagnose.'],
  ['legendAria', 'FMS score legend', 'Legenda dei punteggi FMS', 'Leyenda de puntuación FMS', 'Légende des scores FMS', 'Legende der FMS Punktwerte'],
  ['score3', 'Pattern completed correctly without compensation.', 'Schema completato correttamente senza compensi.', 'Patrón completado correctamente y sin compensaciones.', 'Schéma réalisé correctement sans compensation.', 'Bewegungsmuster korrekt und ohne Kompensation ausgeführt.'],
  ['score2', 'Pattern completed pain-free with compensation.', 'Schema completato senza dolore ma con compensi.', 'Patrón completado sin dolor, pero con compensaciones.', 'Schéma réalisé sans douleur, mais avec compensation.', 'Bewegungsmuster schmerzfrei, jedoch mit Kompensation ausgeführt.'],
  ['score1', 'Pattern cannot be completed as instructed.', 'Schema non completato secondo le istruzioni.', 'El patrón no puede completarse según las instrucciones.', 'Le schéma ne peut pas être réalisé conformément aux consignes.', 'Bewegungsmuster kann nicht wie vorgegeben ausgeführt werden.'],
  ['score0', 'Pain is reported during the movement or clearing test.', 'È presente dolore durante il movimento o il test di esclusione.', 'Se refiere dolor durante el movimiento o la prueba de descarte.', 'Une douleur est signalée pendant le mouvement ou le test de provocation.', 'Während der Bewegung oder des Provokationstests treten Schmerzen auf.'],
  ['bilateralTest', 'Bilateral test', 'Test bilaterale', 'Prueba bilateral', 'Test bilatéral', 'Bilateraler Test'],
  ['singleTest', 'Single-score test', 'Test a punteggio singolo', 'Prueba de puntuación única', 'Test à score unique', 'Test mit Einzelwert'],
  ['focusLabel', 'What it observes', 'Cosa osserva', 'Qué observa', 'Ce qui est observé', 'Beobachtungsschwerpunkt'],
  ['instructionsLabel', 'Test execution', 'Esecuzione del test', 'Ejecución de la prueba', 'Réalisation du test', 'Testdurchführung'],
  ['scoreField', 'Recorded score', 'Punteggio registrato', 'Puntuación registrada', 'Score enregistré', 'Erfasster Wert'],
  ['leftSide', 'Left side', 'Lato sinistro', 'Lado izquierdo', 'Côté gauche', 'Linke Seite'],
  ['rightSide', 'Right side', 'Lato destro', 'Lado derecho', 'Côté droit', 'Rechte Seite'],
  ['painPrompt', 'Pain was reported during the movement or associated clearing test.', 'È stato riferito dolore durante il movimento o il test di esclusione associato.', 'Se refirió dolor durante el movimiento o la prueba de descarte asociada.', 'Une douleur a été signalée pendant le mouvement ou le test de provocation associé.', 'Während der Bewegung oder des zugehörigen Provokationstests wurden Schmerzen angegeben.'],
  ['notesLabel', 'Observation notes', 'Note di osservazione', 'Notas de observación', 'Notes d’observation', 'Beobachtungsnotizen'],
  ['notesPlaceholder', 'Optional notes on compensation, balance, control, or symptoms', 'Note facoltative su compensi, equilibrio, controllo o sintomi', 'Notas opcionales sobre compensaciones, equilibrio, control o síntomas', 'Notes facultatives sur les compensations, l’équilibre, le contrôle ou les symptômes', 'Optionale Hinweise zu Kompensation, Gleichgewicht, Kontrolle oder Symptomen'],
  ['generateAssessment', 'Generate assessment', 'Genera la valutazione', 'Generar evaluación', 'Générer l’évaluation', 'Bewertung erstellen'],
  ['resetAssessment', 'Reset assessment', 'Azzera la valutazione', 'Restablecer evaluación', 'Réinitialiser l’évaluation', 'Bewertung zurücksetzen'],
  ['formIncomplete', 'Complete every score before generating the assessment.', 'Completa tutti i punteggi prima di generare la valutazione.', 'Completa todas las puntuaciones antes de generar la evaluación.', 'Renseignez tous les scores avant de générer l’évaluation.', 'Vervollständigen Sie alle Punktwerte, bevor Sie die Bewertung erstellen.'],
  ['formReset', 'Assessment reset.', 'Valutazione azzerata.', 'Evaluación restablecida.', 'Évaluation réinitialisée.', 'Bewertung zurückgesetzt.'],
  ['loadingPlans', 'Building the movement profile and recommended plans.', 'Elaborazione del profilo motorio e dei programmi consigliati.', 'Elaborando el perfil de movimiento y los programas recomendados.', 'Création du profil de mouvement et des programmes recommandés.', 'Bewegungsprofil und empfohlene Programme werden erstellt.'],
  ['resultsEyebrow', 'Movement profile / 02', 'Profilo motorio / 02', 'Perfil de movimiento / 02', 'Profil de mouvement / 02', 'Bewegungsprofil / 02'],
  ['resultsHeading', 'Assessment report.', 'Rapporto di valutazione.', 'Informe de evaluación.', 'Rapport d’évaluation.', 'Bewertungsbericht.'],
  ['resultsLead', 'Complete every test to generate the movement profile and the three progressive workout codes.', 'Completa tutti i test per generare il profilo motorio e i tre codici di allenamento progressivi.', 'Completa todas las pruebas para generar el perfil de movimiento y los tres códigos de entrenamiento progresivos.', 'Renseignez tous les tests pour générer le profil de mouvement et les trois codes d’entraînement progressifs.', 'Vervollständigen Sie alle Tests, um das Bewegungsprofil und drei progressive Trainingscodes zu erstellen.'],
  ['resultsEmpty', 'No assessment generated. Complete all seven tests and select Generate assessment.', 'Nessuna valutazione generata. Completa tutti e sette i test e seleziona Genera la valutazione.', 'No se ha generado ninguna evaluación. Completa las siete pruebas y selecciona Generar evaluación.', 'Aucune évaluation n’a été générée. Renseignez les sept tests puis sélectionnez Générer l’évaluation.', 'Noch keine Bewertung erstellt. Vervollständigen Sie alle sieben Tests und wählen Sie Bewertung erstellen.'],
  ['footerApp', 'Split APA / FMS-guided movement profile', 'Split APA / Profilo motorio guidato dall’FMS', 'Split APA / Perfil de movimiento guiado por FMS', 'Split APA / Profil de mouvement guidé par le FMS', 'Split APA / FMS gestütztes Bewegungsprofil'],
  ['footerDisclaimer', 'Screening support / Not a diagnosis', 'Supporto allo screening / Non è una diagnosi', 'Apoyo al cribado / No es un diagnóstico', 'Aide au dépistage / Ne constitue pas un diagnostic', 'Screening-Unterstützung / Keine Diagnose'],
  ['finalScore', 'Composite score', 'Punteggio composito', 'Puntuación compuesta', 'Score composite', 'Gesamtwert'],
  ['profileStrong', 'All seven movement patterns were completed without pain, score 1, or side-to-side asymmetry. The screen indicates an acceptable-to-optimal movement baseline under standardized test conditions; preserve movement quality and progress exposure gradually.', 'Tutti e sette gli schemi di movimento sono stati completati senza dolore, punteggi pari a 1 o asimmetrie tra i lati. Lo screening indica una base motoria da accettabile a ottimale nelle condizioni standardizzate del test; preservare la qualità del movimento e aumentare gradualmente l’esposizione.', 'Los siete patrones de movimiento se completaron sin dolor, puntuaciones de 1 ni asimetrías entre lados. El cribado indica una base de movimiento entre aceptable y óptima en condiciones estandarizadas; se recomienda preservar la calidad del movimiento y progresar la exposición de forma gradual.', 'Les sept schémas moteurs ont été réalisés sans douleur, score 1 ni asymétrie entre les côtés. Le dépistage indique une base motrice acceptable à optimale dans les conditions standardisées du test ; il convient de préserver la qualité du mouvement et de progresser graduellement.', 'Alle sieben Bewegungsmuster wurden ohne Schmerzen, Wert 1 oder Seitenasymmetrie ausgeführt. Das Screening zeigt unter standardisierten Testbedingungen eine akzeptable bis optimale Bewegungsbasis; Bewegungsqualität erhalten und Belastung schrittweise steigern.'],
  ['profileMixed', 'The screen identifies pain-free patterns completed with compensation. These findings represent modifiable movement-quality limitations rather than a diagnosis. Prioritize the lowest-scoring patterns, restore available mobility and control, and reassess before increasing complexity or load.', 'Lo screening identifica schemi completati senza dolore ma con compensi. Questi reperti descrivono limitazioni modificabili della qualità del movimento e non costituiscono una diagnosi. Dare priorità agli schemi con punteggio più basso, recuperare mobilità disponibile e controllo, quindi rivalutare prima di aumentare complessità o carico.', 'El cribado identifica patrones completados sin dolor, pero con compensaciones. Estos hallazgos describen limitaciones modificables de la calidad del movimiento y no constituyen un diagnóstico. Deben priorizarse los patrones con menor puntuación, recuperar movilidad y control disponibles y reevaluar antes de aumentar la complejidad o la carga.', 'Le dépistage met en évidence des schémas réalisés sans douleur mais avec compensations. Ces constatations décrivent des limitations modifiables de la qualité du mouvement et ne constituent pas un diagnostic. Il convient de cibler les schémas les moins bien notés, de restaurer la mobilité et le contrôle disponibles, puis de réévaluer avant d’augmenter la complexité ou la charge.', 'Das Screening zeigt schmerzfrei, jedoch mit Kompensationen ausgeführte Muster. Diese Befunde beschreiben veränderbare Einschränkungen der Bewegungsqualität und stellen keine Diagnose dar. Niedrig bewertete Muster priorisieren, verfügbare Beweglichkeit und Kontrolle verbessern und vor höherer Komplexität oder Last erneut testen.'],
  ['profilePriority', 'The screen identifies one or more dysfunctional patterns, relevant side-to-side asymmetries, or both. Do not load a pattern scored 1. Begin with pain-free, low-complexity work directed at the primary limitation, then reassess before introducing speed, external load, or advanced coordination.', 'Lo screening identifica uno o più schemi disfunzionali, asimmetrie rilevanti tra i lati o entrambe le condizioni. Non caricare uno schema con punteggio 1. Iniziare con un lavoro privo di dolore e a bassa complessità, orientato alla limitazione prioritaria, quindi rivalutare prima di introdurre velocità, carico esterno o coordinazione avanzata.', 'El cribado identifica uno o más patrones disfuncionales, asimetrías relevantes entre lados o ambas condiciones. No debe cargarse un patrón con puntuación 1. Se recomienda iniciar con trabajo sin dolor y de baja complejidad dirigido a la limitación prioritaria, y reevaluar antes de introducir velocidad, carga externa o coordinación avanzada.', 'Le dépistage identifie un ou plusieurs schémas dysfonctionnels, des asymétries pertinentes entre les côtés, ou les deux. Un schéma coté 1 ne doit pas être chargé. Commencez par un travail indolore et peu complexe ciblant la limitation prioritaire, puis réévaluez avant d’introduire vitesse, charge externe ou coordination avancée.', 'Das Screening zeigt mindestens ein dysfunktionales Muster, relevante Seitenasymmetrien oder beides. Ein mit 1 bewertetes Muster nicht belasten. Mit schmerzfreier, einfacher Arbeit an der vorrangigen Einschränkung beginnen und vor Geschwindigkeit, externer Last oder komplexer Koordination erneut testen.'],
  ['profilePain', 'Pain was reported during at least one movement or clearing test. This finding takes precedence over the composite score and all other movement-quality findings. Do not train the symptomatic pattern through pain; obtain an appropriate clinical assessment before exercise selection.', 'È stato riferito dolore durante almeno un movimento o test di esclusione. Questo reperto ha priorità sul punteggio composito e su tutti gli altri risultati relativi alla qualità del movimento. Non allenare lo schema sintomatico attraverso il dolore; richiedere una valutazione clinica appropriata prima di selezionare gli esercizi.', 'Se refirió dolor durante al menos un movimiento o una prueba de descarte. Este hallazgo tiene prioridad sobre la puntuación compuesta y sobre cualquier otro resultado de calidad del movimiento. No entrenes el patrón sintomático con dolor; solicita una valoración clínica adecuada antes de seleccionar ejercicios.', 'Une douleur a été signalée pendant au moins un mouvement ou un test de provocation. Cette constatation prévaut sur le score composite et sur tous les autres résultats relatifs à la qualité du mouvement. N’entraînez pas le schéma symptomatique dans la douleur ; demandez une évaluation clinique adaptée avant de sélectionner des exercices.', 'Bei mindestens einer Bewegung oder einem Provokationstest wurden Schmerzen angegeben. Dieser Befund hat Vorrang vor dem Gesamtwert und allen anderen Ergebnissen zur Bewegungsqualität. Das symptomatische Muster nicht unter Schmerzen trainieren; vor der Übungsauswahl eine angemessene klinische Abklärung einholen.'],
  ['scoreContext', 'The composite score is descriptive and is not interpreted in isolation. Clinical priority follows this order: pain or score 0, score 1, relevant asymmetry, then score 2 with compensation.', 'Il punteggio composito è descrittivo e non viene interpretato isolatamente. La priorità clinica segue questo ordine: dolore o punteggio 0, punteggio 1, asimmetria rilevante, quindi punteggio 2 con compensi.', 'La puntuación compuesta es descriptiva y no se interpreta de forma aislada. La prioridad clínica sigue este orden: dolor o puntuación 0, puntuación 1, asimetría relevante y, después, puntuación 2 con compensaciones.', 'Le score composite est descriptif et ne s’interprète pas isolément. La priorité clinique suit cet ordre : douleur ou score 0, score 1, asymétrie pertinente, puis score 2 avec compensations.', 'Der Gesamtwert ist beschreibend und wird nicht isoliert interpretiert. Die klinische Priorität lautet: Schmerz oder Wert 0, Wert 1, relevante Asymmetrie, danach Wert 2 mit Kompensation.'],
  ['focusHeading', 'Recommended focus', 'Priorità consigliate', 'Prioridades recomendadas', 'Priorités recommandées', 'Empfohlene Schwerpunkte'],
  ['painWarning', 'Pain was reported in: {tests}. A score of 0 requires professional clinical assessment before an exercise plan is generated. The automated workout codes are therefore withheld.', 'È stato riferito dolore in: {tests}. Un punteggio pari a 0 richiede una valutazione clinica professionale prima di generare un programma di esercizio. I codici automatici vengono pertanto sospesi.', 'Se refirió dolor en: {tests}. Una puntuación de 0 requiere valoración clínica profesional antes de generar un programa de ejercicio. Por este motivo, no se muestran los códigos automáticos.', 'Une douleur a été signalée pour : {tests}. Un score de 0 nécessite une évaluation clinique professionnelle avant de générer un programme d’exercices. Les codes automatiques ne sont donc pas proposés.', 'Schmerzen wurden angegeben bei: {tests}. Ein Wert von 0 erfordert eine professionelle klinische Abklärung, bevor ein Übungsprogramm erstellt wird. Die automatischen Trainingscodes werden daher nicht ausgegeben.'],
  ['painPriority', 'Score 0 / pain in {tests}: suspend automated exercise selection and obtain an appropriate clinical assessment before training the symptomatic pattern.', 'Punteggio 0 / dolore in {tests}: sospendere la selezione automatica degli esercizi e richiedere una valutazione clinica appropriata prima di allenare lo schema sintomatico.', 'Puntuación 0 / dolor en {tests}: suspender la selección automática de ejercicios y solicitar una valoración clínica adecuada antes de entrenar el patrón sintomático.', 'Score 0 / douleur pour {tests} : suspendre la sélection automatique des exercices et demander une évaluation clinique adaptée avant d’entraîner le schéma symptomatique.', 'Wert 0 / Schmerz bei {tests}: automatische Übungsauswahl aussetzen und vor dem Training des symptomatischen Musters eine angemessene klinische Abklärung einholen.'],
  ['lowPriority', 'Score 1 in {tests}: the pattern was not completed to the required criteria. Avoid loading it; use accessible range, precise motor control, and low-complexity pattern practice, then reassess.', 'Punteggio 1 in {tests}: lo schema non è stato completato secondo i criteri richiesti. Evitare di caricarlo; utilizzare ampiezza accessibile, controllo motorio preciso e pratica a bassa complessità, quindi rivalutare.', 'Puntuación 1 en {tests}: el patrón no se completó según los criterios requeridos. Evita cargarlo; utiliza un rango accesible, control motor preciso y práctica de baja complejidad, y después reevalúa.', 'Score 1 pour {tests} : le schéma n’a pas satisfait aux critères requis. Évitez de le charger ; utilisez une amplitude accessible, un contrôle moteur précis et une pratique peu complexe, puis réévaluez.', 'Wert 1 bei {tests}: Das Muster erfüllte die geforderten Kriterien nicht. Nicht belasten; verfügbare Bewegungsamplitude, präzise motorische Kontrolle und einfache Musterübung einsetzen, danach erneut testen.'],
  ['asymmetryPriority', 'Side-to-side asymmetry in {details}: the lower side determines the recorded score. Work bilaterally, begin with the less proficient side, and avoid reinforcing the dominant strategy.', 'Asimmetria tra i lati in {details}: il lato con il valore più basso determina il punteggio registrato. Lavorare bilateralmente, iniziare dal lato meno efficiente ed evitare di rinforzare la strategia dominante.', 'Asimetría entre lados en {details}: el lado con menor valor determina la puntuación registrada. Trabaja bilateralmente, empieza por el lado menos competente y evita reforzar la estrategia dominante.', 'Asymétrie entre les côtés pour {details} : le côté le moins bien coté détermine le score enregistré. Travaillez bilatéralement, commencez par le côté le moins efficient et évitez de renforcer la stratégie dominante.', 'Seitenasymmetrie bei {details}: Die niedriger bewertete Seite bestimmt den erfassten Wert. Beidseitig arbeiten, mit der weniger kompetenten Seite beginnen und die dominante Strategie nicht weiter verstärken.'],
  ['compensationPriority', 'Score 2 in {tests}: the pattern was completed without pain but with compensation. Preserve symptom-free execution while improving the limiting mobility, stability, or motor-control component.', 'Punteggio 2 in {tests}: lo schema è stato completato senza dolore ma con compensi. Preservare un’esecuzione asintomatica migliorando la componente limitante di mobilità, stabilità o controllo motorio.', 'Puntuación 2 en {tests}: el patrón se completó sin dolor, pero con compensaciones. Mantén una ejecución asintomática mientras mejoras el componente limitante de movilidad, estabilidad o control motor.', 'Score 2 pour {tests} : le schéma a été réalisé sans douleur mais avec compensations. Préservez une exécution asymptomatique tout en améliorant la composante limitante de mobilité, de stabilité ou de contrôle moteur.', 'Wert 2 bei {tests}: Das Muster wurde schmerzfrei, jedoch mit Kompensation ausgeführt. Symptomfreie Ausführung erhalten und die limitierende Komponente aus Beweglichkeit, Stabilität oder motorischer Kontrolle verbessern.'],
  ['recordedObservations', 'Recorded observations: {notes}. Correlate these notes with the standardized scores and the person’s clinical and functional context.', 'Osservazioni registrate: {notes}. Correlare queste note con i punteggi standardizzati e con il contesto clinico e funzionale della persona.', 'Observaciones registradas: {notes}. Correlaciona estas notas con las puntuaciones estandarizadas y con el contexto clínico y funcional de la persona.', 'Observations consignées : {notes}. Mettez ces notes en relation avec les scores standardisés et le contexte clinique et fonctionnel de la personne.', 'Dokumentierte Beobachtungen: {notes}. Diese Angaben mit den standardisierten Werten sowie dem klinischen und funktionellen Kontext der Person abgleichen.'],
  ['maintenancePriority', 'All patterns are pain-free and symmetrical. Maintain mobility and motor control while progressing difficulty gradually.', 'Tutti gli schemi sono privi di dolore e simmetrici. Mantieni mobilità e controllo motorio aumentando gradualmente la difficoltà.', 'Todos los patrones son indoloros y simétricos. Mantén la movilidad y el control motor mientras aumentas la dificultad de forma gradual.', 'Tous les schémas sont indolores et symétriques. Entretenez la mobilité et le contrôle moteur tout en augmentant progressivement la difficulté.', 'Alle Muster sind schmerzfrei und symmetrisch. Beweglichkeit und motorische Kontrolle erhalten und die Schwierigkeit schrittweise steigern.'],
  ['asymmetryTag', 'Asymmetry', 'Asimmetria', 'Asimetría', 'Asymétrie', 'Asymmetrie'],
  ['painTag', 'Pain', 'Dolore', 'Dolor', 'Douleur', 'Schmerz'],
  ['plansHeading', 'Three progressive plans.', 'Tre programmi progressivi.', 'Tres programas progresivos.', 'Trois programmes progressifs.', 'Drei progressive Programme.'],
  ['plansLead', 'Exercises are matched only to the clinically prioritized FMS patterns by body district, joint area, movement tag, and appropriate difficulty. These are screening-guided candidates, not an automatic clinical prescription; verify pain-free execution, dosage, and progression criteria before use.', 'Gli esercizi sono associati esclusivamente agli schemi FMS prioritari in base a distretto corporeo, area articolare, tag di movimento e difficoltà appropriata. Sono proposte guidate dallo screening, non una prescrizione clinica automatica; verificare esecuzione priva di dolore, dosaggio e criteri di progressione prima dell’uso.', 'Los ejercicios se asocian únicamente a los patrones FMS prioritarios según región corporal, área articular, etiqueta de movimiento y dificultad adecuada. Son propuestas guiadas por el cribado, no una prescripción clínica automática; verifica la ejecución sin dolor, la dosificación y los criterios de progresión antes de utilizarlos.', 'Les exercices sont associés uniquement aux schémas FMS prioritaires selon la région corporelle, la zone articulaire, le mouvement et le niveau de difficulté approprié. Il s’agit de propositions guidées par le dépistage, et non d’une prescription clinique automatique ; vérifiez l’exécution indolore, le dosage et les critères de progression avant utilisation.', 'Die Übungen werden ausschließlich den vorrangigen FMS Mustern nach Körperregion, Gelenkbereich, Bewegungsmerkmal und angemessenem Schwierigkeitsgrad zugeordnet. Es handelt sich um screeninggestützte Vorschläge, nicht um eine automatische klinische Verordnung; schmerzfreie Ausführung, Dosierung und Progressionskriterien vor der Anwendung prüfen.'],
  ['foundationLabel', 'Level 01', 'Livello 01', 'Nivel 01', 'Niveau 01', 'Stufe 01'],
  ['foundationTitle', 'Foundation', 'Base', 'Base', 'Fondations', 'Grundlage'],
  ['foundationDescription', 'Initial, low-complexity exposure for the identified priority patterns. Use a pain-free range and controlled execution before adding load.', 'Esposizione iniziale a bassa complessità per gli schemi prioritari identificati. Utilizzare un’ampiezza priva di dolore e un’esecuzione controllata prima di aggiungere carico.', 'Exposición inicial de baja complejidad para los patrones prioritarios identificados. Utiliza un rango sin dolor y una ejecución controlada antes de añadir carga.', 'Exposition initiale peu complexe pour les schémas prioritaires identifiés. Utilisez une amplitude indolore et une exécution contrôlée avant d’ajouter de la charge.', 'Einfache Anfangsbelastung für die identifizierten Prioritätsmuster. Schmerzfreien Bewegungsumfang und kontrollierte Ausführung sichern, bevor Last hinzukommt.'],
  ['intermediateLabel', 'Level 02', 'Livello 02', 'Nivel 02', 'Niveau 02', 'Stufe 02'],
  ['intermediateTitle', 'Progressive', 'Progressivo', 'Progresivo', 'Progressif', 'Aufbau'],
  ['intermediateDescription', 'Progressive control and coordination for the same priority patterns. Use only after the foundation exercises remain consistently pain-free and technically controlled.', 'Controllo e coordinazione progressivi per gli stessi schemi prioritari. Utilizzare solo quando gli esercizi di base risultano costantemente privi di dolore e tecnicamente controllati.', 'Control y coordinación progresivos para los mismos patrones prioritarios. Utilízalo solo cuando los ejercicios de base se mantengan sin dolor y con control técnico constante.', 'Contrôle et coordination progressifs pour les mêmes schémas prioritaires. À utiliser uniquement lorsque les exercices de base restent constamment indolores et techniquement maîtrisés.', 'Progressive Kontrolle und Koordination für dieselben Prioritätsmuster. Erst einsetzen, wenn die Grundlagenübungen dauerhaft schmerzfrei und technisch kontrolliert bleiben.'],
  ['advancedLabel', 'Level 03', 'Livello 03', 'Nivel 03', 'Niveau 03', 'Stufe 03'],
  ['advancedTitle', 'Advanced', 'Avanzato', 'Avanzado', 'Avancé', 'Fortgeschritten'],
  ['advancedDescription', 'Later-stage integration of the same priority patterns at higher complexity. Use only after reassessment confirms adequate pain-free control for progression.', 'Integrazione in fase avanzata degli stessi schemi prioritari a maggiore complessità. Utilizzare solo dopo che la rivalutazione conferma un controllo adeguato e privo di dolore per la progressione.', 'Integración avanzada de los mismos patrones prioritarios con mayor complejidad. Utilízalo solo después de que la reevaluación confirme un control adecuado y sin dolor para progresar.', 'Intégration avancée des mêmes schémas prioritaires avec une complexité supérieure. À utiliser uniquement après qu’une réévaluation confirme un contrôle indolore suffisant pour progresser.', 'Spätere Integration derselben Prioritätsmuster mit höherer Komplexität. Erst verwenden, wenn eine erneute Bewertung eine ausreichende schmerzfreie Kontrolle für die Progression bestätigt.'],
  ['planCoverage', '{count} matched exercises / Targets: {tests}', '{count} esercizi pertinenti / Obiettivi: {tests}', '{count} ejercicios pertinentes / Objetivos: {tests}', '{count} exercices pertinents / Cibles : {tests}', '{count} passende Übungen / Ziele: {tests}'],
  ['copyCode', 'Copy code', 'Copia codice', 'Copiar código', 'Copier le code', 'Code kopieren'],
  ['openPlan', 'Open plan', 'Apri programma', 'Abrir programa', 'Ouvrir le programme', 'Programm öffnen'],
  ['copySuccess', 'Code copied.', 'Codice copiato.', 'Código copiado.', 'Code copié.', 'Code kopiert.'],
  ['copySelected', 'Code selected. Copy it from the field.', 'Codice selezionato. Copialo dal campo.', 'Código seleccionado. Cópialo desde el campo.', 'Code sélectionné. Copiez-le depuis le champ.', 'Code markiert. Kopieren Sie ihn aus dem Feld.'],
  ['planError', 'The exercise archive could not be loaded. Try again from a standard browser tab.', 'Impossibile caricare l’archivio degli esercizi. Riprova da una normale scheda del browser.', 'No se pudo cargar el archivo de ejercicios. Inténtalo de nuevo desde una pestaña estándar del navegador.', 'La base d’exercices n’a pas pu être chargée. Réessayez depuis un onglet standard du navigateur.', 'Das Übungsarchiv konnte nicht geladen werden. Versuchen Sie es in einem normalen Browser-Tab erneut.'],
  ['protocolSource', 'Administration and scoring should follow the official FMS protocol and qualified professional judgment.', 'La somministrazione e il punteggio devono seguire il protocollo FMS ufficiale e il giudizio di un professionista qualificato.', 'La administración y la puntuación deben seguir el protocolo oficial de FMS y el criterio de un profesional cualificado.', 'L’administration et la cotation doivent respecter le protocole FMS officiel et le jugement d’un professionnel qualifié.', 'Durchführung und Bewertung sollten dem offiziellen FMS Protokoll und der Einschätzung qualifizierter Fachkräfte folgen.']
];

const testRows = [
  ['deep-squat.name', 'Deep Squat', 'Squat profondo', 'Sentadilla profunda', 'Squat profond', 'Tiefe Kniebeuge'],
  ['deep-squat.focus', 'Bilateral, symmetrical mobility of the hips, knees, and ankles together with thoracic and shoulder control.', 'Mobilità bilaterale e simmetrica di anche, ginocchia e caviglie, insieme al controllo toracico e delle spalle.', 'Movilidad bilateral y simétrica de caderas, rodillas y tobillos, junto con el control torácico y de los hombros.', 'Mobilité bilatérale et symétrique des hanches, des genoux et des chevilles, associée au contrôle thoracique et des épaules.', 'Bilaterale, symmetrische Beweglichkeit von Hüften, Knien und Sprunggelenken sowie Kontrolle von Brustwirbelsäule und Schultern.'],
  ['deep-squat.instructions', 'Stand with the feet aligned at shoulder width and hold the dowel overhead with the elbows extended. Descend slowly into the deepest controlled squat available while keeping the heels down, knees aligned, torso controlled, and dowel over the feet.', 'Posizionati con i piedi allineati alla larghezza delle spalle e mantieni il bastone sopra la testa con i gomiti estesi. Scendi lentamente nel massimo squat controllato disponibile, mantenendo i talloni a terra, le ginocchia allineate, il tronco controllato e il bastone sopra i piedi.', 'Colócate con los pies alineados a la anchura de los hombros y sostén la pica sobre la cabeza con los codos extendidos. Desciende lentamente hasta la sentadilla más profunda que puedas controlar, manteniendo los talones apoyados, las rodillas alineadas, el tronco controlado y la pica sobre los pies.', 'Placez les pieds alignés à la largeur des épaules et tenez le bâton au-dessus de la tête, coudes tendus. Descendez lentement dans le squat le plus profond possible en gardant le contrôle, les talons au sol, les genoux alignés, le tronc maîtrisé et le bâton au-dessus des pieds.', 'Füße schulterbreit und ausgerichtet positionieren, Stab mit gestreckten Ellbogen über dem Kopf halten. Langsam in die tiefstmögliche kontrollierte Kniebeuge gehen; Fersen am Boden, Knie ausgerichtet, Rumpf kontrolliert und Stab über den Füßen halten.'],
  ['hurdle-step.name', 'Hurdle Step', 'Passo sopra l’ostacolo', 'Paso sobre obstáculo', 'Franchissement de haie', 'Hürdenschritt'],
  ['hurdle-step.focus', 'Single-leg stance control, stepping mechanics, and coordinated mobility and stability of the hips, knees, ankles, and pelvis.', 'Controllo monopodalico, meccanica del passo e coordinazione tra mobilità e stabilità di anche, ginocchia, caviglie e bacino.', 'Control monopodal, mecánica del paso y coordinación entre movilidad y estabilidad de caderas, rodillas, tobillos y pelvis.', 'Contrôle unipodal, mécanique du pas et coordination de la mobilité et de la stabilité des hanches, des genoux, des chevilles et du bassin.', 'Einbeinstand, Schrittmechanik sowie koordinierte Beweglichkeit und Stabilität von Hüften, Knien, Sprunggelenken und Becken.'],
  ['hurdle-step.instructions', 'Stand upright with the dowel across the shoulders and the hurdle set to tibial-tuberosity height. Step one foot over the hurdle, lightly touch the heel beyond it, and return under control without changing trunk or pelvic alignment. Test both sides.', 'Mantieni la posizione eretta con il bastone sulle spalle e l’ostacolo all’altezza della tuberosità tibiale. Supera l’ostacolo con un piede, appoggia leggermente il tallone oltre la barriera e ritorna con controllo senza modificare l’allineamento di tronco e bacino. Valuta entrambi i lati.', 'Mantente erguido con la pica sobre los hombros y el obstáculo a la altura de la tuberosidad tibial. Pasa un pie por encima, toca suavemente con el talón al otro lado y regresa de forma controlada sin alterar la alineación del tronco ni de la pelvis. Evalúa ambos lados.', 'Tenez-vous droit, le bâton sur les épaules et la haie réglée à la hauteur de la tubérosité tibiale. Passez un pied au-dessus, touchez légèrement le sol avec le talon au-delà de la haie, puis revenez avec contrôle sans modifier l’alignement du tronc ni du bassin. Testez les deux côtés.', 'Aufrecht stehen, Stab über den Schultern, Hürde auf Höhe der Tuberositas tibiae. Einen Fuß über die Hürde führen, die Ferse dahinter leicht aufsetzen und kontrolliert zurückkehren, ohne Rumpf- oder Beckenausrichtung zu verändern. Beide Seiten testen.'],
  ['inline-lunge.name', 'In-Line Lunge', 'Affondo in linea', 'Zancada en línea', 'Fente en ligne', 'Ausfallschritt in Linie'],
  ['inline-lunge.focus', 'Deceleration, narrow-base balance, and coordinated hip, knee, ankle, and trunk mobility and stability.', 'Decelerazione, equilibrio su base stretta e coordinazione di mobilità e stabilità di anca, ginocchio, caviglia e tronco.', 'Desaceleración, equilibrio sobre una base estrecha y coordinación de movilidad y estabilidad de cadera, rodilla, tobillo y tronco.', 'Décélération, équilibre sur une base étroite et coordination de la mobilité et de la stabilité de la hanche, du genou, de la cheville et du tronc.', 'Abbremskontrolle, Gleichgewicht auf schmaler Basis und koordinierte Beweglichkeit und Stabilität von Hüfte, Knie, Sprunggelenk und Rumpf.'],
  ['inline-lunge.instructions', 'Place the feet heel-to-toe on the test line using the measured stance. Hold the dowel vertically behind the head, thoracic spine, and sacrum. Lower the rear knee toward the board, then return without losing foot, knee, trunk, or dowel alignment. Test both sides.', 'Disponi i piedi tallone-punta sulla linea usando la distanza misurata. Mantieni il bastone verticale dietro capo, rachide toracico e sacro. Abbassa il ginocchio posteriore verso la tavola e ritorna senza perdere l’allineamento di piedi, ginocchia, tronco o bastone. Valuta entrambi i lati.', 'Coloca los pies en línea, talón con punta, utilizando la distancia medida. Mantén la pica vertical detrás de la cabeza, la columna torácica y el sacro. Baja la rodilla posterior hacia la tabla y vuelve sin perder la alineación de pies, rodillas, tronco o pica. Evalúa ambos lados.', 'Placez les pieds talon-pointe sur la ligne selon la distance mesurée. Maintenez le bâton vertical derrière la tête, le rachis thoracique et le sacrum. Abaissez le genou arrière vers la planche puis revenez sans perdre l’alignement des pieds, des genoux, du tronc ni du bâton. Testez les deux côtés.', 'Füße im gemessenen Abstand Ferse an Zehen auf der Linie positionieren. Stab senkrecht hinter Kopf, Brustwirbelsäule und Kreuzbein halten. Hinteres Knie zur Linie absenken und zurückkehren, ohne die Ausrichtung von Füßen, Knien, Rumpf oder Stab zu verlieren. Beide Seiten testen.'],
  ['shoulder-mobility.name', 'Shoulder Mobility', 'Mobilità della spalla', 'Movilidad del hombro', 'Mobilité de l’épaule', 'Schultermobilität'],
  ['shoulder-mobility.focus', 'Reciprocal shoulder range of motion combining abduction, external rotation, flexion, adduction, internal rotation, and extension.', 'Escursione reciproca delle spalle che combina abduzione, rotazione esterna, flessione, adduzione, rotazione interna ed estensione.', 'Rango recíproco de los hombros que combina abducción, rotación externa, flexión, aducción, rotación interna y extensión.', 'Amplitude réciproque des épaules combinant abduction, rotation externe, flexion, adduction, rotation interne et extension.', 'Reziproker Schulterbewegungsumfang aus Abduktion, Außenrotation, Flexion, Adduktion, Innenrotation und Extension.'],
  ['shoulder-mobility.instructions', 'Make fists with the thumbs enclosed. In one smooth movement, reach one fist down behind the neck and the other up behind the back. Measure the distance between the closest bony points of the fists without walking the hands together. Reverse the arms and repeat.', 'Chiudi i pollici nei pugni. Con un unico movimento fluido porta un pugno dietro il collo dall’alto e l’altro dietro la schiena dal basso. Misura la distanza tra i punti ossei più vicini senza avvicinare gradualmente le mani. Inverti le braccia e ripeti.', 'Cierra los pulgares dentro de los puños. Con un movimiento fluido, lleva un puño por detrás del cuello desde arriba y el otro por detrás de la espalda desde abajo. Mide la distancia entre los puntos óseos más próximos sin acercar las manos progresivamente. Invierte los brazos y repite.', 'Fermez les poings en recouvrant les pouces. En un seul mouvement fluide, amenez un poing derrière la nuque par le haut et l’autre derrière le dos par le bas. Mesurez la distance entre les reliefs osseux les plus proches sans rapprocher progressivement les mains. Inversez les bras et répétez.', 'Daumen in den Fäusten einschließen. In einer fließenden Bewegung eine Faust von oben hinter den Nacken und die andere von unten hinter den Rücken führen. Abstand zwischen den nächstgelegenen knöchernen Punkten messen, ohne die Hände schrittweise anzunähern. Arme wechseln und wiederholen.'],
  ['active-straight-leg-raise.name', 'Active Straight-Leg Raise', 'Sollevamento attivo della gamba tesa', 'Elevación activa de pierna recta', 'Élévation active de la jambe tendue', 'Aktives Anheben des gestreckten Beins'],
  ['active-straight-leg-raise.focus', 'Active hamstring and gastrocnemius flexibility together with independent lower-extremity movement and pelvic control.', 'Flessibilità attiva di ischiocrurali e gastrocnemio, insieme alla dissociazione degli arti inferiori e al controllo del bacino.', 'Flexibilidad activa de isquiotibiales y gastrocnemio, junto con movimiento independiente de las extremidades inferiores y control pélvico.', 'Souplesse active des ischio-jambiers et du gastrocnémien, associée à la dissociation des membres inférieurs et au contrôle du bassin.', 'Aktive Flexibilität von ischiokruraler Muskulatur und Gastrocnemius sowie unabhängige Beinbewegung und Beckenkontrolle.'],
  ['active-straight-leg-raise.instructions', 'Lie supine with the knees extended, arms by the sides, and toes pointing upward. Raise one leg with the knee extended while the opposite knee stays straight and the heel remains in contact with the surface. Measure at end range and test both sides.', 'Sdraiati supino con ginocchia estese, braccia lungo i fianchi e punte dei piedi verso l’alto. Solleva una gamba mantenendo il ginocchio esteso, mentre il ginocchio opposto resta teso e il tallone rimane a contatto con la superficie. Misura a fine corsa e valuta entrambi i lati.', 'Túmbate boca arriba con las rodillas extendidas, los brazos a los lados y los dedos de los pies hacia arriba. Eleva una pierna manteniendo la rodilla extendida, mientras la rodilla contraria permanece recta y el talón sigue en contacto con la superficie. Mide al final del recorrido y evalúa ambos lados.', 'Allongez-vous sur le dos, genoux tendus, bras le long du corps et pointes de pieds orientées vers le haut. Levez une jambe en gardant le genou tendu, tandis que le genou opposé reste en extension et que le talon demeure en contact avec le support. Mesurez en fin d’amplitude et testez les deux côtés.', 'Rückenlage mit gestreckten Knien, Armen neben dem Körper und Zehen nach oben. Ein Bein mit gestrecktem Knie anheben, während das andere Knie gestreckt und die Ferse auf der Unterlage bleibt. In Endstellung messen und beide Seiten testen.'],
  ['trunk-stability-pushup.name', 'Trunk Stability Push-Up', 'Push-up di stabilità del tronco', 'Flexión de brazos con estabilidad del tronco', 'Pompe de stabilité du tronc', 'Rumpfstabilitäts-Liegestütz'],
  ['trunk-stability-pushup.focus', 'Reflex stabilization of the trunk in the sagittal plane during a symmetrical upper-body pushing action.', 'Stabilizzazione riflessa del tronco sul piano sagittale durante una spinta simmetrica degli arti superiori.', 'Estabilización refleja del tronco en el plano sagital durante una acción simétrica de empuje del tren superior.', 'Stabilisation réflexe du tronc dans le plan sagittal lors d’une poussée symétrique des membres supérieurs.', 'Reflexive Rumpfstabilisierung in der Sagittalebene während einer symmetrischen Druckbewegung des Oberkörpers.'],
  ['trunk-stability-pushup.instructions', 'Lie prone with the hands at the protocol position and the feet together. Perform one push-up so the shoulders, trunk, pelvis, and legs rise as a single rigid unit without lumbar extension or delay. Apply the associated spinal-extension clearing test before recording the final score.', 'Sdraiati prono con le mani nella posizione prevista dal protocollo e i piedi uniti. Esegui un push-up sollevando spalle, tronco, bacino e gambe come un’unica unità rigida, senza estensione lombare né ritardi. Esegui il test di esclusione in estensione del rachide prima di registrare il punteggio finale.', 'Túmbate boca abajo con las manos en la posición del protocolo y los pies juntos. Realiza una flexión elevando hombros, tronco, pelvis y piernas como una unidad rígida, sin extensión lumbar ni retrasos. Aplica la prueba de descarte en extensión de la columna antes de registrar la puntuación final.', 'Allongez-vous sur le ventre, les mains à la position prévue par le protocole et les pieds joints. Réalisez une pompe en soulevant les épaules, le tronc, le bassin et les jambes comme une seule unité rigide, sans extension lombaire ni décalage. Effectuez le test de provocation en extension du rachis avant d’enregistrer le score final.', 'Bauchlage, Hände in der protokollgerechten Position, Füße zusammen. Einen Liegestütz ausführen, sodass Schultern, Rumpf, Becken und Beine als starre Einheit anheben, ohne Lendenextension oder Verzögerung. Vor dem Endwert den zugehörigen Wirbelsäulen-Extensionstest durchführen.'],
  ['rotary-stability.name', 'Rotary Stability', 'Stabilità rotatoria', 'Estabilidad rotatoria', 'Stabilité rotatoire', 'Rotationsstabilität'],
  ['rotary-stability.focus', 'Multiplanar trunk stability during coordinated upper- and lower-extremity movement in a narrow quadruped base.', 'Stabilità multiplanare del tronco durante movimenti coordinati degli arti superiori e inferiori su una base quadrupedica stretta.', 'Estabilidad multiplanar del tronco durante movimientos coordinados de las extremidades superiores e inferiores sobre una base cuadrúpeda estrecha.', 'Stabilité multiplanaire du tronc lors de mouvements coordonnés des membres supérieurs et inférieurs sur une base quadrupédique étroite.', 'Multiplanare Rumpfstabilität bei koordinierten Arm- und Beinbewegungen auf schmaler Vierfüßlerbasis.'],
  ['rotary-stability.instructions', 'Begin in quadruped with the hands and knees aligned beside the board. Perform the same-side reach-and-return pattern required by the protocol without trunk rotation or loss of balance; use the diagonal pattern only as the prescribed lower-level attempt. Test both sides and complete the associated flexion clearing test.', 'Parti in quadrupedia con mani e ginocchia allineate accanto alla tavola. Esegui lo schema omolaterale di allungamento e ritorno previsto dal protocollo senza ruotare il tronco né perdere l’equilibrio; usa lo schema diagonale solo come tentativo di livello inferiore previsto. Valuta entrambi i lati ed esegui il test di esclusione in flessione associato.', 'Comienza en cuadrupedia con manos y rodillas alineadas junto a la tabla. Realiza el patrón homolateral de alcance y retorno previsto por el protocolo sin rotar el tronco ni perder el equilibrio; utiliza el patrón diagonal solo como intento de nivel inferior prescrito. Evalúa ambos lados y completa la prueba de descarte en flexión asociada.', 'Commencez à quatre pattes, mains et genoux alignés près de la planche. Réalisez le schéma homolatéral d’extension et de retour prévu par le protocole sans rotation du tronc ni perte d’équilibre ; utilisez le schéma diagonal uniquement comme tentative de niveau inférieur prescrite. Testez les deux côtés et effectuez le test de provocation en flexion associé.', 'Im Vierfüßlerstand Hände und Knie neben der Linie ausrichten. Das protokollgerechte gleichseitige Ausstrecken und Zurückführen ohne Rumpfrotation oder Gleichgewichtsverlust ausführen; das diagonale Muster nur als vorgesehenen niedrigeren Versuch verwenden. Beide Seiten testen und den zugehörigen Flexions-Provokationstest durchführen.']
];

function lookup(rows, key) {
  const row = rows.find((entry) => entry[0] === key);
  return row?.[languageIndex[language]] || row?.[1] || key;
}

function interpolate(value, variables = {}) {
  return String(value).replace(/\{([a-zA-Z]+)\}/g, (match, key) => (
    Object.prototype.hasOwnProperty.call(variables, key) ? String(variables[key]) : match
  ));
}

const tx = (key, variables = {}) => interpolate(lookup(copyRows, key), variables);
const testText = (id, field) => lookup(testRows, `${id}.${field}`);

const tests = [
  {
    id: 'deep-squat', bilateral: false, image: '../assets/fms/deep-squat.webp',
    targets: [
      { districts: ['lower-limb'], areas: ['hip', 'knee', 'ankle'], tags: ['flexion', 'extension', 'dorsiflexion', 'mobility', 'stabilization'] },
      { districts: ['trunk'], areas: ['spine', 'abdomen', 'pelvis'], tags: ['stabilization', 'extension', 'mobility'] }
    ]
  },
  {
    id: 'hurdle-step', bilateral: true, image: '../assets/fms/hurdle-step.webp',
    targets: [
      { districts: ['lower-limb'], areas: ['hip', 'knee', 'ankle'], tags: ['flexion', 'extension', 'abduction', 'stabilization', 'obstacle-clearance'] },
      { districts: ['trunk'], areas: ['abdomen', 'pelvis'], tags: ['stabilization', 'anti-rotation'] }
    ]
  },
  {
    id: 'inline-lunge', bilateral: true, image: '../assets/fms/inline-lunge.webp',
    targets: [
      { districts: ['lower-limb'], areas: ['hip', 'knee', 'ankle'], tags: ['flexion', 'extension', 'dorsiflexion', 'stabilization'] },
      { districts: ['trunk'], areas: ['abdomen', 'pelvis', 'spine'], tags: ['stabilization', 'anti-rotation'] }
    ]
  },
  {
    id: 'shoulder-mobility', bilateral: true, image: '../assets/fms/shoulder-mobility.webp',
    targets: [
      { districts: ['upper-limb'], areas: ['shoulder'], tags: ['flexion', 'extension', 'internal-rotation', 'external-rotation', 'scapular-retraction', 'mobility'] },
      { districts: ['trunk'], areas: ['spine', 'chest'], tags: ['extension', 'rotation', 'mobility'] }
    ]
  },
  {
    id: 'active-straight-leg-raise', bilateral: true, image: '../assets/fms/active-straight-leg-raise.webp',
    targets: [
      { districts: ['lower-limb'], areas: ['hip', 'knee'], tags: ['flexion', 'extension', 'mobility', 'stabilization'] },
      { districts: ['trunk'], areas: ['pelvis', 'abdomen'], tags: ['stabilization', 'posterior-pelvic-tilt'] }
    ]
  },
  {
    id: 'trunk-stability-pushup', bilateral: false, image: '../assets/fms/trunk-stability-pushup.webp',
    targets: [
      { districts: ['trunk'], areas: ['abdomen', 'spine', 'chest'], tags: ['stabilization', 'extension', 'anti-rotation'] },
      { districts: ['upper-limb'], areas: ['shoulder', 'elbow'], tags: ['extension', 'horizontal-adduction', 'scapular-protraction', 'stabilization'] }
    ]
  },
  {
    id: 'rotary-stability', bilateral: true, image: '../assets/fms/rotary-stability.webp',
    targets: [
      { districts: ['trunk'], areas: ['abdomen', 'spine', 'pelvis'], tags: ['rotation', 'anti-rotation', 'stabilization', 'extension', 'flexion'] },
      { districts: ['lower-limb'], areas: ['hip'], tags: ['extension', 'flexion', 'stabilization'] },
      { districts: ['upper-limb'], areas: ['shoulder'], tags: ['flexion', 'stabilization'] }
    ]
  }
];

const districtOrder = ['neck', 'upper-limb', 'trunk', 'lower-limb'];
const clinicalPatternOrder = [
  'active-straight-leg-raise',
  'shoulder-mobility',
  'rotary-stability',
  'trunk-stability-pushup',
  'inline-lunge',
  'hurdle-step',
  'deep-squat'
];
let archivePromise = null;

const els = {
  shell: document.getElementById('fmsShell'),
  form: document.getElementById('fmsForm'),
  list: document.getElementById('fmsTestList'),
  reset: document.getElementById('resetAssessment'),
  message: document.getElementById('formMessage'),
  results: document.getElementById('results'),
  resultsBody: document.getElementById('resultsBody')
};

function hasAccess() {
  try {
    return window.localStorage.getItem(accessStorageKey) === 'true';
  } catch (error) {
    return false;
  }
}

function applyPageCopy() {
  document.documentElement.lang = language;
  document.title = tx('pageTitle');
  document.querySelectorAll('[data-fms]').forEach((element) => {
    element.textContent = tx(element.dataset.fms);
  });
  document.querySelectorAll('[data-fms-placeholder]').forEach((element) => {
    element.setAttribute('placeholder', tx(element.dataset.fmsPlaceholder));
  });
  document.querySelectorAll('[data-fms-aria]').forEach((element) => {
    element.setAttribute('aria-label', tx(element.dataset.fmsAria));
  });
}

function setupSmartHeader() {
  const header = document.querySelector('[data-smart-header]');
  let lastScroll = window.scrollY;
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(() => {
      const current = Math.max(0, window.scrollY);
      const delta = current - lastScroll;
      if (current <= 12 || delta < -4) header.classList.remove('is-hidden');
      else if (delta > 4) header.classList.add('is-hidden');
      lastScroll = current;
      ticking = false;
    });
  }, { passive: true });
}

function createScoreGroup(test, side, label) {
  const group = document.createElement('div');
  group.className = 'fms-score-group';

  const title = document.createElement('span');
  title.className = 'fms-score-group-title small-label';
  title.textContent = label;

  const options = document.createElement('div');
  options.className = 'fms-score-options';
  options.setAttribute('role', 'radiogroup');
  options.setAttribute('aria-label', `${testText(test.id, 'name')} / ${label}`);

  [0, 1, 2, 3].forEach((score) => {
    const option = document.createElement('label');
    option.className = 'fms-score-option';

    const input = document.createElement('input');
    input.type = 'radio';
    input.name = `score-${test.id}-${side}`;
    input.value = String(score);

    const value = document.createElement('span');
    value.textContent = String(score);
    option.append(input, value);
    options.appendChild(option);
  });

  group.append(title, options);
  return group;
}

function createTestCard(test, index) {
  const card = document.createElement('article');
  card.className = 'fms-test-card';
  card.dataset.testId = test.id;

  const head = document.createElement('div');
  head.className = 'fms-test-head';

  const number = document.createElement('div');
  number.className = 'fms-test-index';
  number.textContent = String(index + 1).padStart(2, '0');

  const title = document.createElement('h3');
  title.textContent = testText(test.id, 'name');

  const type = document.createElement('div');
  type.className = 'fms-test-type small-label';
  type.textContent = tx(test.bilateral ? 'bilateralTest' : 'singleTest');
  head.append(number, title, type);

  const main = document.createElement('div');
  main.className = 'fms-test-main';

  const media = document.createElement('div');
  media.className = 'fms-test-media';
  const image = document.createElement('img');
  image.src = test.image;
  image.alt = `${testText(test.id, 'name')} / ${tx('instructionsLabel')}`;
  image.loading = index < 2 ? 'eager' : 'lazy';
  image.decoding = 'async';
  media.appendChild(image);

  const content = document.createElement('div');
  content.className = 'fms-test-content';

  const focus = document.createElement('div');
  focus.className = 'fms-copy-block';
  const focusLabel = document.createElement('span');
  focusLabel.className = 'small-label';
  focusLabel.textContent = tx('focusLabel');
  const focusText = document.createElement('p');
  focusText.textContent = testText(test.id, 'focus');
  focus.append(focusLabel, focusText);

  const instructions = document.createElement('div');
  instructions.className = 'fms-copy-block';
  const instructionsLabel = document.createElement('span');
  instructionsLabel.className = 'small-label';
  instructionsLabel.textContent = tx('instructionsLabel');
  const instructionsText = document.createElement('p');
  instructionsText.textContent = testText(test.id, 'instructions');
  instructions.append(instructionsLabel, instructionsText);

  const scoreArea = document.createElement('div');
  scoreArea.className = 'fms-score-area';
  const scoreLabel = document.createElement('span');
  scoreLabel.className = 'fms-score-label small-label';
  scoreLabel.textContent = tx('scoreField');
  const scoreColumns = document.createElement('div');
  scoreColumns.className = `fms-score-columns${test.bilateral ? '' : ' is-single'}`;
  if (test.bilateral) {
    scoreColumns.append(
      createScoreGroup(test, 'left', tx('leftSide')),
      createScoreGroup(test, 'right', tx('rightSide'))
    );
  } else {
    scoreColumns.append(createScoreGroup(test, 'single', tx('scoreField')));
  }
  scoreArea.append(scoreLabel, scoreColumns);

  const pain = document.createElement('label');
  pain.className = 'fms-pain-row';
  const painInput = document.createElement('input');
  painInput.type = 'checkbox';
  painInput.name = `pain-${test.id}`;
  const painText = document.createElement('span');
  painText.textContent = tx('painPrompt');
  pain.append(painInput, painText);

  const notes = document.createElement('label');
  notes.className = 'fms-notes';
  const notesLabel = document.createElement('span');
  notesLabel.className = 'small-label';
  notesLabel.textContent = tx('notesLabel');
  const notesInput = document.createElement('textarea');
  notesInput.name = `notes-${test.id}`;
  notesInput.placeholder = tx('notesPlaceholder');
  notes.append(notesLabel, notesInput);

  content.append(focus, instructions, scoreArea, pain, notes);
  main.append(media, content);
  card.append(head, main);
  return card;
}

function renderTests() {
  const fragment = document.createDocumentFragment();
  tests.forEach((test, index) => fragment.appendChild(createTestCard(test, index)));
  els.list.replaceChildren(fragment);
}

function readSelectedScore(test, side) {
  const checked = els.form.querySelector(`input[name="score-${test.id}-${side}"]:checked`);
  return checked ? Number(checked.value) : null;
}

function collectResults(markIncomplete = false) {
  let complete = true;
  const results = tests.map((test) => {
    const card = els.list.querySelector(`[data-test-id="${test.id}"]`);
    const left = test.bilateral ? readSelectedScore(test, 'left') : null;
    const right = test.bilateral ? readSelectedScore(test, 'right') : null;
    const single = test.bilateral ? null : readSelectedScore(test, 'single');
    const testComplete = test.bilateral ? left !== null && right !== null : single !== null;
    complete = complete && testComplete;
    if (markIncomplete) card.classList.toggle('is-incomplete', !testComplete);

    const pain = els.form.elements[`pain-${test.id}`].checked;
    const recorded = test.bilateral ? Math.min(left ?? 0, right ?? 0) : (single ?? 0);
    return {
      ...test,
      left,
      right,
      single,
      pain,
      final: pain ? 0 : recorded,
      asymmetry: test.bilateral && left !== null && right !== null && left !== right,
      notes: els.form.elements[`notes-${test.id}`].value.trim()
    };
  });
  return { complete, results };
}

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Unable to load ${url}`);
  return response.json();
}

function flattenArchive(database, districtId) {
  const districts = Array.isArray(database) ? database : [database];
  return districts.flatMap((district) => (
    (district?.sezioni || []).flatMap((section) => (
      (section.esercizi || []).map((exercise) => ({
        ...exercise,
        districtId,
        section: section.nome,
        districtName: district.distretto
      }))
    ))
  ));
}

function loadArchive() {
  if (archivePromise) return archivePromise;
  archivePromise = (async () => {
    const manifest = await fetchJson('../data/manifest.json');
    const archives = await Promise.all(manifest.districts.map(async (district) => {
      const data = await fetchJson(`../${district.file}`);
      return flattenArchive(data, district.id);
    }));
    return archives.flat();
  })();
  return archivePromise;
}

function difficulty(exercise) {
  const value = Number(exercise.difficulty);
  return Number.isFinite(value) ? Math.min(5, Math.max(1, Math.round(value))) : 3;
}

function targetMatchScore(exercise, target) {
  if (!target.districts.includes(exercise.districtId)) return 0;
  const areaMatch = target.areas.includes(exercise.movementDistrict);
  const tags = Array.isArray(exercise.movementTags) ? exercise.movementTags : [];
  const tagMatches = target.tags.filter((tag) => tags.includes(tag)).length;
  if (!areaMatch || !tagMatches) return 0;
  return 12 + tagMatches * 4;
}

function testExerciseScore(exercise, test) {
  return Math.max(0, ...test.targets.map((target, index) => {
    const score = targetMatchScore(exercise, target);
    return score ? score + (test.targets.length - index) * 0.25 : 0;
  }));
}

function priorityWeight(result) {
  if (result.final <= 1) return 9 + (result.asymmetry ? 3 : 0);
  if (result.final === 2) return 5 + (result.asymmetry ? 3 : 0);
  return result.asymmetry ? 4 : 1;
}

function compareExerciseIds(a, b) {
  return String(a.id).localeCompare(String(b.id), 'en', { numeric: true });
}

function sortClinicalFindings(values) {
  return [...values].sort((a, b) => (
    a.final - b.final
    || clinicalPatternOrder.indexOf(a.id) - clinicalPatternOrder.indexOf(b.id)
    || Number(b.asymmetry) - Number(a.asymmetry)
  ));
}

function planFocusResults(results) {
  const focus = results.some((result) => result.final < 3 || result.asymmetry)
    ? results.filter((result) => result.final < 3 || result.asymmetry)
    : results;
  return sortClinicalFindings(focus);
}

function buildPlanExercises(archive, results, tier) {
  const sortedFocus = planFocusResults(results);

  const allowed = archive.filter((exercise) => {
    const level = difficulty(exercise);
    return level >= tier.minDifficulty && level <= tier.maxDifficulty;
  });
  const selected = [];
  const selectedIds = new Set();

  const addExercise = (exercise) => {
    if (!exercise || selectedIds.has(exercise.id) || selected.length >= tier.count) return false;
    selected.push(exercise);
    selectedIds.add(exercise.id);
    return true;
  };

  const candidatesForTest = (result, pool = allowed) => pool
    .map((exercise) => ({
      exercise,
      score: testExerciseScore(exercise, result) * priorityWeight(result),
      distance: Math.abs(difficulty(exercise) - tier.preferredDifficulty)
    }))
    .filter((candidate) => candidate.score > 0 && !selectedIds.has(candidate.exercise.id))
    .sort((a, b) => b.score - a.score || a.distance - b.distance || compareExerciseIds(a.exercise, b.exercise));

  const quotas = new Map(sortedFocus.map((result) => [
    result.id,
    result.final <= 1 ? 3 : (result.asymmetry || result.final === 2 ? 2 : 1)
  ]));
  const maxQuota = Math.max(0, ...quotas.values());
  for (let round = 0; round < maxQuota && selected.length < tier.count; round += 1) {
    sortedFocus.forEach((result) => {
      if (round >= quotas.get(result.id) || selected.length >= tier.count) return;
      addExercise(candidatesForTest(result)[0]?.exercise);
    });
  }

  const aggregate = allowed
    .filter((exercise) => !selectedIds.has(exercise.id))
    .map((exercise) => ({
      exercise,
      score: sortedFocus.reduce((sum, result) => (
        sum + testExerciseScore(exercise, result) * priorityWeight(result)
      ), 0),
      distance: Math.abs(difficulty(exercise) - tier.preferredDifficulty)
    }))
    .filter((candidate) => candidate.score > 0)
    .sort((a, b) => b.score - a.score || a.distance - b.distance || compareExerciseIds(a.exercise, b.exercise));

  aggregate.forEach((candidate) => {
    addExercise(candidate.exercise);
  });

  if (selected.length < tier.count) {
    archive
      .filter((exercise) => {
        const level = difficulty(exercise);
        return !selectedIds.has(exercise.id)
          && level >= tier.fallbackMinDifficulty
          && level <= tier.fallbackMaxDifficulty;
      })
      .map((exercise) => ({
        exercise,
        score: sortedFocus.reduce((sum, result) => (
          sum + testExerciseScore(exercise, result) * priorityWeight(result)
        ), 0),
        distance: Math.abs(difficulty(exercise) - tier.preferredDifficulty)
      }))
      .filter((candidate) => candidate.score > 0)
      .sort((a, b) => (
        b.score - a.score
        || a.distance - b.distance
        || compareExerciseIds(a.exercise, b.exercise)
      ))
      .forEach((candidate) => {
        addExercise(candidate.exercise);
      });
  }

  return selected.sort((a, b) => (
    districtOrder.indexOf(a.districtId) - districtOrder.indexOf(b.districtId)
    || difficulty(a) - difficulty(b)
    || compareExerciseIds(a, b)
  ));
}

function base64UrlEncode(value) {
  const bytes = new TextEncoder().encode(value);
  let binary = '';
  bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
  return window.btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function createWorkoutCode(exercises) {
  const payload = {
    v: 1,
    sort: 'easy-hard',
    items: exercises.map((exercise) => ({ d: exercise.districtId, id: exercise.id }))
  };
  return `${workoutCodePrefix}${base64UrlEncode(JSON.stringify(payload))}`;
}

function formatList(values) {
  try {
    return new Intl.ListFormat(language, { style: 'long', type: 'conjunction' }).format(values);
  } catch (error) {
    return values.join(', ');
  }
}

function profileNarrative(results) {
  if (results.some((result) => result.pain || result.final === 0)) {
    return `${tx('profilePain')} ${tx('scoreContext')}`;
  }
  const hasPriority = results.some((result) => result.final <= 1 || result.asymmetry);
  const allStrong = results.every((result) => result.final === 3 && !result.asymmetry && !result.pain);
  const profile = hasPriority ? tx('profilePriority') : (allStrong ? tx('profileStrong') : tx('profileMixed'));
  return `${profile} ${tx('scoreContext')}`;
}

function resultLabel(result) {
  const name = testText(result.id, 'name');
  if (!result.bilateral) return name;
  return `${name} (${tx('leftSide')} ${result.left} / ${tx('rightSide')} ${result.right})`;
}

function buildPriorities(results) {
  const priorities = [];
  const pain = sortClinicalFindings(results.filter((result) => result.pain || result.final === 0));
  const scoreOne = sortClinicalFindings(results.filter((result) => result.final === 1));
  const asymmetries = sortClinicalFindings(results.filter((result) => result.asymmetry && !result.pain));
  const scoreTwo = sortClinicalFindings(results.filter((result) => result.final === 2 && !result.asymmetry));
  const observations = results.filter((result) => result.notes);

  if (pain.length) {
    priorities.push(tx('painPriority', { tests: formatList(pain.map(resultLabel)) }));
  }
  if (scoreOne.length) {
    priorities.push(tx('lowPriority', { tests: formatList(scoreOne.map(resultLabel)) }));
  }
  if (asymmetries.length) {
    priorities.push(tx('asymmetryPriority', { details: formatList(asymmetries.map(resultLabel)) }));
  }
  if (scoreTwo.length) {
    priorities.push(tx('compensationPriority', { tests: formatList(scoreTwo.map((result) => testText(result.id, 'name'))) }));
  }
  if (observations.length) {
    priorities.push(tx('recordedObservations', {
      notes: formatList(observations.map((result) => (
        `${testText(result.id, 'name')}: ${result.notes.replace(/[.!?]+$/u, '')}`
      )))
    }));
  }
  if (!priorities.length) priorities.push(tx('maintenancePriority'));
  return priorities;
}

function createScoreTable(results) {
  const table = document.createElement('div');
  table.className = 'fms-score-table';
  results.forEach((result) => {
    const cell = document.createElement('div');
    cell.className = 'fms-score-cell';
    const name = document.createElement('span');
    name.textContent = testText(result.id, 'name');
    const score = document.createElement('strong');
    score.textContent = String(result.final);
    const flags = document.createElement('small');
    flags.textContent = result.pain ? tx('painTag') : (result.asymmetry ? tx('asymmetryTag') : '');
    cell.append(name, score, flags);
    table.appendChild(cell);
  });
  return table;
}

function createPlanCard(tier, code, exercises, focusResults) {
  const card = document.createElement('article');
  card.className = 'fms-plan-card';
  const label = document.createElement('div');
  label.className = 'eyebrow small-label';
  label.textContent = tx(`${tier.id}Label`);
  const title = document.createElement('h4');
  title.textContent = tx(`${tier.id}Title`);
  const description = document.createElement('p');
  description.textContent = tx(`${tier.id}Description`);
  const coverage = document.createElement('div');
  coverage.className = 'fms-plan-coverage small-label';
  coverage.textContent = tx('planCoverage', {
    count: exercises.length,
    tests: formatList(focusResults.map((result) => testText(result.id, 'name')))
  });
  const field = document.createElement('textarea');
  field.readOnly = true;
  field.value = code;
  field.setAttribute('aria-label', `${tx(`${tier.id}Title`)} / ${i18n.t('generator.workoutCode')}`);

  const actions = document.createElement('div');
  actions.className = 'fms-plan-actions';
  const copy = document.createElement('button');
  copy.type = 'button';
  copy.textContent = tx('copyCode');
  const open = document.createElement('button');
  open.type = 'button';
  open.textContent = tx('openPlan');
  const status = document.createElement('div');
  status.className = 'fms-plan-status small-label';

  copy.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(code);
      status.textContent = tx('copySuccess');
    } catch (error) {
      field.focus();
      field.select();
      status.textContent = tx('copySelected');
    }
  });
  open.addEventListener('click', () => {
    try {
      window.localStorage.setItem(pendingWorkoutStorageKey, code);
    } catch (error) {
      // The code remains available in the field for manual transfer.
    }
    window.location.href = '../?source=fms';
  });

  actions.append(copy, open);
  card.append(label, title, description, coverage, field, actions, status);
  return card;
}

async function renderAssessment(results) {
  const total = results.reduce((sum, result) => sum + result.final, 0);
  const painResults = results.filter((result) => result.pain || result.final === 0);

  const summary = document.createElement('div');
  summary.className = 'fms-report-summary';

  const totalBox = document.createElement('div');
  totalBox.className = 'fms-total';
  const totalLabel = document.createElement('div');
  totalLabel.className = 'small-label';
  totalLabel.textContent = tx('finalScore');
  const totalValue = document.createElement('strong');
  totalValue.textContent = `${total}/21`;
  totalBox.append(totalLabel, totalValue);

  const narrative = document.createElement('div');
  narrative.className = 'fms-narrative';
  const narrativeTitle = document.createElement('h3');
  narrativeTitle.textContent = tx('focusHeading');
  const narrativeText = document.createElement('p');
  narrativeText.textContent = profileNarrative(results);
  const list = document.createElement('ul');
  list.className = 'fms-priority-list';
  buildPriorities(results).forEach((priority) => {
    const item = document.createElement('li');
    item.textContent = priority;
    list.appendChild(item);
  });
  narrative.append(narrativeTitle, narrativeText, list);
  summary.append(totalBox, narrative);

  const fragment = document.createDocumentFragment();
  fragment.append(summary, createScoreTable(results));

  if (painResults.length) {
    const alert = document.createElement('div');
    alert.className = 'fms-alert';
    alert.textContent = tx('painWarning', {
      tests: formatList(painResults.map((result) => testText(result.id, 'name')))
    });
    fragment.appendChild(alert);
    els.resultsBody.replaceChildren(fragment);
    return;
  }

  const archive = await loadArchive();
  const tiers = [
    { id: 'foundation', minDifficulty: 1, maxDifficulty: 2, fallbackMinDifficulty: 1, fallbackMaxDifficulty: 3, preferredDifficulty: 1.5, count: 8 },
    { id: 'intermediate', minDifficulty: 2, maxDifficulty: 4, fallbackMinDifficulty: 1, fallbackMaxDifficulty: 5, preferredDifficulty: 3, count: 10 },
    { id: 'advanced', minDifficulty: 3, maxDifficulty: 5, fallbackMinDifficulty: 2, fallbackMaxDifficulty: 5, preferredDifficulty: 4.5, count: 12 }
  ];
  const focusResults = planFocusResults(results);

  const plans = document.createElement('section');
  plans.className = 'fms-plans';
  const plansHeading = document.createElement('div');
  plansHeading.className = 'fms-plans-heading';
  const plansTitle = document.createElement('h3');
  plansTitle.textContent = tx('plansHeading');
  const plansLead = document.createElement('p');
  plansLead.textContent = tx('plansLead');
  plansHeading.append(plansTitle, plansLead);

  const grid = document.createElement('div');
  grid.className = 'fms-plan-grid';
  tiers.forEach((tier) => {
    const exercises = buildPlanExercises(archive, results, tier);
    grid.appendChild(createPlanCard(tier, createWorkoutCode(exercises), exercises, focusResults));
  });
  plans.append(plansHeading, grid);
  fragment.appendChild(plans);
  els.resultsBody.replaceChildren(fragment);
}

async function handleSubmit(event) {
  event.preventDefault();
  const { complete, results } = collectResults(true);
  if (!complete) {
    els.message.textContent = tx('formIncomplete');
    els.list.querySelector('.is-incomplete')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  els.message.textContent = tx('loadingPlans');
  try {
    await renderAssessment(results);
    els.message.textContent = '';
    els.results.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } catch (error) {
    els.message.textContent = tx('planError');
    console.error(error);
  }
}

function clearAssessment(announce = false) {
  els.form.reset();
  els.list.querySelectorAll('.is-incomplete').forEach((card) => card.classList.remove('is-incomplete'));
  els.resultsBody.innerHTML = `<div class="empty-state">${tx('resultsEmpty')}</div>`;
  els.message.textContent = announce ? tx('formReset') : '';
  try {
    window.localStorage.removeItem(legacyDraftStorageKey);
  } catch (error) {
    // The form is still cleared when browser storage is unavailable.
  }
}

function resetAssessment() {
  clearAssessment(true);
}

function init() {
  if (!hasAccess()) {
    window.location.replace('../');
    return;
  }

  i18n.apply(document);
  applyPageCopy();
  i18n.mountLanguageSelectors();
  renderTests();
  clearAssessment();
  setupSmartHeader();

  els.form.addEventListener('submit', handleSubmit);
  els.reset.addEventListener('click', resetAssessment);
  window.addEventListener('pagehide', () => clearAssessment());
  window.addEventListener('pageshow', () => clearAssessment());
  els.shell.hidden = false;
}

init();
