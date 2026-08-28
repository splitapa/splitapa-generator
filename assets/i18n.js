(function () {
  'use strict';

  const storageKey = 'splitapaLanguage';
  const supported = new Set(['en', 'it', 'es', 'fr', 'de']);
  const column = { en: 1, it: 2, es: 3, fr: 4, de: 5 };
  const languages = [
    { code: 'de', label: 'Deutsch' },
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
    { code: 'fr', label: 'Français' },
    { code: 'it', label: 'Italiano' }
  ];

  const messageRows = [
    ['common.language', 'Language', 'Lingua', 'Idioma', 'Langue', 'Sprache'],
    ['common.selected', 'Selected', 'Selezionato', 'Seleccionado', 'Sélectionné', 'Ausgewählt'],
    ['common.homeAria', 'Split APA home', 'Home di Split APA', 'Inicio de Split APA', 'Accueil de Split APA', 'Split APA Startseite'],

    ['home.pageTitle', 'Split APA | Adapted Physical Activity', 'Split APA | Attività fisica adattata', 'Split APA | Actividad física adaptada', 'Split APA | Activité physique adaptée', 'Split APA | Angepasste körperliche Aktivität'],
    ['home.navAria', 'Main navigation', 'Navigazione principale', 'Navegación principal', 'Navigation principale', 'Hauptnavigation'],
    ['home.nav.home', 'Home Page', 'Home', 'Inicio', 'Accueil', 'Startseite'],
    ['home.nav.why', 'Why Split APA', 'Perché Split APA', 'Por qué Split APA', 'Pourquoi Split APA', 'Warum Split APA'],
    ['home.nav.build', 'Build Your Plan', 'Crea il tuo programma', 'Crea tu programa', 'Créez votre programme', 'Programm erstellen'],
    ['home.nav.method', 'Split APA Method', 'Metodo Split APA', 'Método Split APA', 'Méthode Split APA', 'Split APA Methode'],
    ['home.hero.eyebrow', 'Adapted physical activity / Program builder', 'Attività fisica adattata / Creazione programmi', 'Actividad física adaptada / Creación de programas', 'Activité physique adaptée / Création de programmes', 'Angepasste körperliche Aktivität / Programmerstellung'],
    ['home.hero.statement', 'Create adapted physical activity programs.', 'Crea programmi di attività fisica adattata.', 'Crea programas de actividad física adaptada.', 'Créez des programmes d’activité physique adaptée.', 'Erstellen Sie Programme für angepasste körperliche Aktivität.'],
    ['home.hero.copy', 'A simple, fast, and professional way to design personalized APA plans through structure, selection, and clear execution guidance.', 'Un metodo semplice, rapido e professionale per progettare programmi AFA personalizzati attraverso struttura, selezione e indicazioni esecutive chiare.', 'Una forma sencilla, rápida y profesional de diseñar programas de AFA personalizados mediante una estructura definida, una selección precisa e indicaciones de ejecución claras.', 'Une méthode simple, rapide et professionnelle pour concevoir des programmes d’APA personnalisés grâce à une structure définie, une sélection précise et des consignes d’exécution claires.', 'Eine einfache, schnelle und professionelle Methode zur Erstellung individueller APA-Programme mit klarer Struktur, gezielter Auswahl und verständlichen Ausführungshinweisen.'],
    ['home.hero.build', 'Build your plan', 'Crea il tuo programma', 'Crea tu programa', 'Créez votre programme', 'Programm erstellen'],
    ['home.hero.explore', 'Explore the method', 'Scopri il metodo', 'Descubre el método', 'Découvrir la méthode', 'Methode entdecken'],
    ['home.hero.overviewAria', 'Split APA overview', 'Panoramica di Split APA', 'Presentación de Split APA', 'Présentation de Split APA', 'Split APA Überblick'],
    ['home.hero.system', 'System / Split APA', 'Sistema / Split APA', 'Sistema / Split APA', 'Système / Split APA', 'System / Split APA'],
    ['home.hero.status', 'Status / Program design', 'Stato / Progettazione programmi', 'Estado / Diseño de programas', 'Statut / Conception de programmes', 'Status / Programmgestaltung'],
    ['home.hero.signal', '01 / Designed better', '01 / Progettato meglio', '01 / Mejor diseñado', '01 / Mieux conçu', '01 / Besser konzipiert'],
    ['home.hero.apa', 'Adapted physical activity', 'Attività fisica adattata', 'Actividad física adaptada', 'Activité physique adaptée', 'Angepasste körperliche Aktivität'],
    ['home.hero.designed', 'Designed better.', 'Progettato meglio.', 'Mejor diseñado.', 'Mieux conçu.', 'Besser konzipiert.'],
    ['home.hero.designedCopy', 'Build personalized programs with a structured exercise archive and tools dedicated to adapted physical activity.', 'Crea programmi personalizzati con un archivio strutturato di esercizi e strumenti dedicati all’attività fisica adattata.', 'Crea programas personalizados con un archivo estructurado de ejercicios y herramientas dedicadas a la actividad física adaptada.', 'Créez des programmes personnalisés grâce à une base d’exercices structurée et à des outils dédiés à l’activité physique adaptée.', 'Erstellen Sie individuelle Programme mit einem strukturierten Übungsarchiv und Werkzeugen für angepasste körperliche Aktivität.'],
    ['home.hero.benefitsAria', 'Split APA core benefits', 'Vantaggi principali di Split APA', 'Ventajas principales de Split APA', 'Principaux avantages de Split APA', 'Zentrale Vorteile von Split APA'],
    ['home.hero.organized', 'Organized exercises', 'Esercizi organizzati', 'Ejercicios organizados', 'Exercices organisés', 'Strukturierte Übungen'],
    ['home.hero.sheets', 'Custom sheets', 'Schede personalizzate', 'Fichas personalizadas', 'Fiches personnalisées', 'Individuelle Pläne'],
    ['home.hero.approach', 'Adapted approach', 'Approccio adattato', 'Enfoque adaptado', 'Approche adaptée', 'Angepasster Ansatz'],
    ['home.hero.professional', 'Professional method', 'Metodo professionale', 'Método profesional', 'Méthode professionnelle', 'Professionelle Methode'],
    ['home.hero.promiseAria', 'Core promise', 'Promessa essenziale', 'Propuesta esencial', 'Promesse essentielle', 'Zentrales Versprechen'],
    ['home.hero.mode', 'Mode', 'Modalità', 'Modo', 'Mode', 'Modus'],
    ['home.hero.simple', 'Simple', 'Semplice', 'Sencillo', 'Simple', 'Einfach'],
    ['home.hero.flow', 'Flow', 'Flusso', 'Flujo', 'Flux', 'Ablauf'],
    ['home.hero.fast', 'Fast', 'Rapido', 'Rápido', 'Rapide', 'Schnell'],
    ['home.hero.output', 'Output', 'Risultato', 'Resultado', 'Résultat', 'Ergebnis'],
    ['home.hero.pro', 'Pro', 'Professionale', 'Profesional', 'Professionnel', 'Professionell'],

    ['home.why.index', '02 / Why Split APA', '02 / Perché Split APA', '02 / Por qué Split APA', '02 / Pourquoi Split APA', '02 / Warum Split APA'],
    ['home.why.heading', 'Everything you need. One tool.', 'Tutto ciò che serve. Un unico strumento.', 'Todo lo que necesitas. Una sola herramienta.', 'Tout ce dont vous avez besoin. Un seul outil.', 'Alles, was Sie brauchen. Ein Werkzeug.'],
    ['home.why.lead', 'Movement professionals spend time searching, organizing, and selecting exercises. Split APA simplifies the process.', 'I professionisti del movimento dedicano tempo alla ricerca, all’organizzazione e alla selezione degli esercizi. Split APA semplifica il processo.', 'Los profesionales del movimiento dedican tiempo a buscar, organizar y seleccionar ejercicios. Split APA simplifica el proceso.', 'Les professionnels du mouvement consacrent du temps à rechercher, organiser et sélectionner des exercices. Split APA simplifie ce processus.', 'Bewegungsfachkräfte investieren Zeit in die Suche, Strukturierung und Auswahl von Übungen. Split APA vereinfacht diesen Prozess.'],
    ['home.why.problemAria', 'Problem and solution', 'Problema e soluzione', 'Problema y solución', 'Problème et solution', 'Problem und Lösung'],
    ['home.why.problem', 'Less search. More planning.', 'Meno ricerca. Più progettazione.', 'Menos búsqueda. Más planificación.', 'Moins de recherche. Plus de planification.', 'Weniger suchen. Mehr planen.'],
    ['home.why.problemNote', 'A structured workflow for faster, clearer, personalized programs.', 'Un flusso strutturato per programmi personalizzati più rapidi e chiari.', 'Un flujo estructurado para crear programas personalizados con mayor rapidez y claridad.', 'Un processus structuré pour des programmes personnalisés plus rapides et plus clairs.', 'Ein strukturierter Ablauf für schnellere, klarere und individuelle Programme.'],
    ['home.why.solutionAria', 'Split APA solution', 'La soluzione Split APA', 'La solución Split APA', 'La solution Split APA', 'Die Split APA Lösung'],
    ['home.why.archiveLabel', 'Archive', 'Archivio', 'Archivo', 'Base', 'Archiv'],
    ['home.why.archiveTitle', 'Organized archive', 'Archivio organizzato', 'Archivo organizado', 'Base structurée', 'Strukturiertes Archiv'],
    ['home.why.archiveCopy', 'Exercises grouped by area, easy to consult, always ready.', 'Esercizi suddivisi per area, facili da consultare e sempre disponibili.', 'Ejercicios agrupados por áreas, fáciles de consultar y siempre disponibles.', 'Des exercices classés par région, faciles à consulter et toujours disponibles.', 'Nach Regionen gegliederte Übungen, leicht auffindbar und jederzeit verfügbar.'],
    ['home.why.sheetsLabel', 'Sheets', 'Schede', 'Fichas', 'Fiches', 'Pläne'],
    ['home.why.sheetsTitle', 'Customizable sheets', 'Schede personalizzabili', 'Fichas personalizables', 'Fiches personnalisables', 'Anpassbare Pläne'],
    ['home.why.sheetsCopy', 'Create tailored plans in minutes.', 'Crea programmi su misura in pochi minuti.', 'Crea programas a medida en pocos minutos.', 'Créez des programmes sur mesure en quelques minutes.', 'Erstellen Sie in wenigen Minuten passende Programme.'],
    ['home.why.apaTitle', 'Adapted approach', 'Approccio adattato', 'Enfoque adaptado', 'Approche adaptée', 'Angepasster Ansatz'],
    ['home.why.apaCopy', 'Safety, function, and well-being at the center.', 'Sicurezza, funzionalità e benessere al centro.', 'Seguridad, funcionalidad y bienestar en el centro.', 'La sécurité, la fonction et le bien-être au centre.', 'Sicherheit, Funktion und Wohlbefinden im Mittelpunkt.'],
    ['home.audience.label', "Who it's for", 'A chi si rivolge', 'A quién va dirigido', 'À qui s’adresse-t-il ?', 'Für wen es gedacht ist'],
    ['home.audience.heading', 'Built for movement work.', 'Pensato per chi lavora con il movimento.', 'Diseñado para trabajar con el movimiento.', 'Conçu pour les professionnels du mouvement.', 'Für die Arbeit mit Bewegung entwickelt.'],
    ['home.audience.lead', 'For professionals, operators, and organizations offering safe and adapted physical activity.', 'Per professionisti, operatori e organizzazioni che propongono attività fisica sicura e adattata.', 'Para profesionales, técnicos y organizaciones que ofrecen actividad física segura y adaptada.', 'Pour les professionnels, les intervenants et les structures proposant une activité physique sûre et adaptée.', 'Für Fachkräfte, Betreuende und Einrichtungen, die sichere und angepasste körperliche Aktivität anbieten.'],
    ['home.audience.aria', 'Split APA target users', 'Destinatari di Split APA', 'Usuarios de Split APA', 'Publics de Split APA', 'Zielgruppen von Split APA'],
    ['home.audience.clinical', 'Clinical', 'Clinica', 'Clínica', 'Clinique', 'Klinik'],
    ['home.audience.physio', 'Physiotherapists', 'Fisioterapisti', 'Fisioterapeutas', 'Kinésithérapeutes', 'Physiotherapeuten'],
    ['home.audience.physioCopy', 'Assess, design, and propose safe exercises.', 'Valutare, progettare e proporre esercizi sicuri.', 'Evaluar, diseñar y proponer ejercicios seguros.', 'Évaluer, concevoir et proposer des exercices sûrs.', 'Sichere Übungen beurteilen, planen und anleiten.'],
    ['home.audience.movement', 'Movement', 'Movimento', 'Movimiento', 'Mouvement', 'Bewegung'],
    ['home.audience.kinesiologists', 'Kinesiologists', 'Chinesiologi', 'Kinesiólogos', 'Kinésiologues', 'Kinesiologen'],
    ['home.audience.kinesiologistsCopy', 'Create personalized programs quickly.', 'Creare rapidamente programmi personalizzati.', 'Crear rápidamente programas personalizados.', 'Créer rapidement des programmes personnalisés.', 'Individuelle Programme schnell erstellen.'],
    ['home.audience.facilities', 'Facilities', 'Strutture', 'Centros', 'Structures', 'Einrichtungen'],
    ['home.audience.gyms', 'Gyms and sports centers', 'Palestre e centri sportivi', 'Gimnasios y centros deportivos', 'Salles de sport et centres sportifs', 'Fitnessstudios und Sportzentren'],
    ['home.audience.gymsCopy', 'Offer tailored programs for every need.', 'Offrire programmi su misura per ogni esigenza.', 'Ofrecer programas adaptados a cada necesidad.', 'Proposer des programmes adaptés à chaque besoin.', 'Passende Programme für unterschiedliche Bedürfnisse anbieten.'],
    ['home.audience.care', 'Care', 'Assistenza', 'Atención', 'Accompagnement', 'Betreuung'],
    ['home.audience.seniors', 'Senior centers', 'Centri per anziani', 'Centros para mayores', 'Structures pour personnes âgées', 'Senioreneinrichtungen'],
    ['home.audience.seniorsCopy', 'Promote well-being, autonomy, and quality of life.', 'Promuovere benessere, autonomia e qualità della vita.', 'Promover el bienestar, la autonomía y la calidad de vida.', 'Favoriser le bien-être, l’autonomie et la qualité de vie.', 'Wohlbefinden, Selbstständigkeit und Lebensqualität fördern.'],
    ['home.audience.education', 'Education', 'Educazione', 'Educación', 'Éducation', 'Bildung'],
    ['home.audience.educators', 'Educators and operators', 'Educatori e operatori', 'Educadores y técnicos', 'Éducateurs et intervenants', 'Pädagogen und Betreuende'],
    ['home.audience.educatorsCopy', 'Support motor and rehabilitation activities.', 'Supportare attività motorie e riabilitative.', 'Apoyar actividades motrices y de rehabilitación.', 'Soutenir les activités motrices et de réadaptation.', 'Motorische und rehabilitative Aktivitäten unterstützen.'],
    ['home.audience.people', 'People', 'Persone', 'Personas', 'Personnes', 'Menschen'],
    ['home.audience.users', 'End users', 'Utenti finali', 'Usuarios finales', 'Utilisateurs finaux', 'Endnutzer'],
    ['home.audience.usersCopy', 'Follow safe, simple, guided exercises.', 'Svolgere esercizi sicuri, semplici e guidati.', 'Realizar ejercicios seguros, sencillos y guiados.', 'Suivre des exercices sûrs, simples et guidés.', 'Sichere, einfache und angeleitete Übungen durchführen.'],

    ['home.build.index', '03 / Build your plan', '03 / Crea il tuo programma', '03 / Crea tu programa', '03 / Créez votre programme', '03 / Programm erstellen'],
    ['home.build.heading', 'Workout plan generator.', 'Generatore di programmi di esercizio.', 'Generador de programas de ejercicio.', 'Générateur de programmes d’exercices.', 'Generator für Übungsprogramme.'],
    ['home.build.lead', 'Choose a body district and open the generator. The home stays fast while the exercise archive loads only when needed.', 'Scegli uno o più distretti corporei e apri il generatore. La home resta veloce perché l’archivio degli esercizi viene caricato solo quando serve.', 'Elige una o varias regiones corporales y abre el generador. La página de inicio se mantiene rápida porque el archivo de ejercicios solo se carga cuando es necesario.', 'Choisissez une ou plusieurs régions corporelles et ouvrez le générateur. La page d’accueil reste rapide, car la base d’exercices n’est chargée qu’en cas de besoin.', 'Wählen Sie eine oder mehrere Körperregionen und öffnen Sie den Generator. Die Startseite bleibt schnell, da das Übungsarchiv nur bei Bedarf geladen wird.'],
    ['home.build.launcherAria', 'Generator launcher', 'Avvio del generatore', 'Inicio del generador', 'Lancement du générateur', 'Generator starten'],
    ['home.build.flow', 'Flow', 'Flusso', 'Flujo', 'Processus', 'Ablauf'],
    ['home.build.choose', 'Choose', 'Scegli', 'Elegir', 'Choisir', 'Auswählen'],
    ['home.build.archive', 'Archive', 'Archivio', 'Archivo', 'Base', 'Archiv'],
    ['home.build.byDistrict', 'Build by district', 'Crea per distretto', 'Crear por región', 'Créer par région', 'Nach Körperregion erstellen'],
    ['home.build.copy', 'One lightweight app, four body districts, same Split APA workflow with a cleaner and faster experience.', 'Un’unica applicazione leggera, quattro distretti corporei e lo stesso flusso Split APA, in un’esperienza più chiara e veloce.', 'Una aplicación ligera, cuatro regiones corporales y el mismo flujo Split APA, con una experiencia más clara y rápida.', 'Une application légère, quatre régions corporelles et le même processus Split APA, pour une expérience plus claire et plus rapide.', 'Eine schlanke Anwendung, vier Körperregionen und derselbe Split APA Ablauf für eine klarere und schnellere Nutzung.'],
    ['home.build.open', 'Open generator', 'Apri il generatore', 'Abrir el generador', 'Ouvrir le générateur', 'Generator öffnen'],
    ['home.build.mapAria', 'Body district overview', 'Panoramica dei distretti corporei', 'Vista general de las regiones corporales', 'Aperçu des régions corporelles', 'Übersicht der Körperregionen'],
    ['home.build.district', 'District', 'Distretto', 'Región', 'Région', 'Körperregion'],
    ['home.build.neck', 'Neck', 'Collo', 'Cuello', 'Cou', 'Hals'],
    ['home.build.upper', 'Upper limb', 'Arto superiore', 'Miembro superior', 'Membre supérieur', 'Obere Extremität'],
    ['home.build.trunk', 'Trunk', 'Tronco', 'Tronco', 'Tronc', 'Rumpf'],
    ['home.build.lower', 'Lower limb', 'Arto inferiore', 'Miembro inferior', 'Membre inférieur', 'Untere Extremität'],

    ['home.method.index', '04 / Split APA method', '04 / Metodo Split APA', '04 / Método Split APA', '04 / Méthode Split APA', '04 / Split APA Methode'],
    ['home.method.heading', 'The Split APA method.', 'Il metodo Split APA.', 'El método Split APA.', 'La méthode Split APA.', 'Die Split APA Methode.'],
    ['home.method.lead', 'Exercises organized by functional criteria to support adapted and personalized workout plans.', 'Esercizi organizzati secondo criteri funzionali per supportare programmi adattati e personalizzati.', 'Ejercicios organizados según criterios funcionales para facilitar programas adaptados y personalizados.', 'Des exercices organisés selon des critères fonctionnels pour élaborer des programmes adaptés et personnalisés.', 'Nach funktionellen Kriterien geordnete Übungen zur Erstellung angepasster und individueller Programme.'],
    ['home.method.mission', 'From individual needs to practical programs.', 'Dai bisogni individuali a programmi concreti.', 'De las necesidades individuales a programas prácticos.', 'Des besoins individuels aux programmes concrets.', 'Von individuellen Bedürfnissen zu konkreten Programmen.'],
    ['home.method.missionNote', 'A project developed to support movement professionals and practitioners with clear tools for adapted physical activity.', 'Un progetto sviluppato per supportare professionisti del movimento e operatori con strumenti chiari per l’attività fisica adattata.', 'Un proyecto desarrollado para apoyar a profesionales del movimiento y técnicos con herramientas claras para la actividad física adaptada.', 'Un projet conçu pour accompagner les professionnels du mouvement et les praticiens avec des outils clairs dédiés à l’activité physique adaptée.', 'Ein Projekt, das Bewegungsfachkräfte und Praktiker mit klaren Werkzeugen für angepasste körperliche Aktivität unterstützt.'],
    ['home.method.principles', 'Key principles', 'Principi chiave', 'Principios clave', 'Principes clés', 'Grundprinzipien'],
    ['home.method.simplicity', 'Simplicity', 'Semplicità', 'Simplicidad', 'Simplicité', 'Einfachheit'],
    ['home.method.simplicityCopy', 'Intuitive and immediate tools.', 'Strumenti intuitivi e immediati.', 'Herramientas intuitivas e inmediatas.', 'Des outils intuitifs et immédiatement accessibles.', 'Intuitive und unmittelbar nutzbare Werkzeuge.'],
    ['home.method.organization', 'Organization', 'Organizzazione', 'Organización', 'Organisation', 'Struktur'],
    ['home.method.organizationCopy', 'Structured archive and easy consultation.', 'Archivio strutturato e facile da consultare.', 'Archivo estructurado y fácil de consultar.', 'Une base structurée et facile à consulter.', 'Strukturiertes Archiv und einfache Übersicht.'],
    ['home.method.personalization', 'Personalization', 'Personalizzazione', 'Personalización', 'Personnalisation', 'Individualisierung'],
    ['home.method.personalizationCopy', 'Custom programs based on individual needs.', 'Programmi personalizzati in base alle esigenze individuali.', 'Programas personalizados según las necesidades individuales.', 'Des programmes personnalisés selon les besoins individuels.', 'Individuelle Programme nach persönlichen Bedürfnissen.'],
    ['home.method.accessibility', 'Accessibility', 'Accessibilità', 'Accesibilidad', 'Accessibilité', 'Zugänglichkeit'],
    ['home.method.accessibilityCopy', 'Online content available anytime, anywhere.', 'Contenuti online disponibili sempre e ovunque.', 'Contenido en línea disponible en todo momento y lugar.', 'Des contenus en ligne accessibles à tout moment et partout.', 'Online-Inhalte jederzeit und überall verfügbar.'],
    ['home.method.evolution', 'Evolution', 'Evoluzione', 'Evolución', 'Évolution', 'Weiterentwicklung'],
    ['home.method.evolutionCopy', 'The project is constantly updated and improved.', 'Il progetto viene aggiornato e migliorato costantemente.', 'El proyecto se actualiza y mejora de forma continua.', 'Le projet est constamment mis à jour et amélioré.', 'Das Projekt wird kontinuierlich aktualisiert und verbessert.'],
    ['home.method.phases', 'The 4 phases', 'Le 4 fasi', 'Las 4 fases', 'Les 4 phases', 'Die 4 Phasen'],
    ['home.method.analysis', 'Analysis', 'Analisi', 'Análisis', 'Analyse', 'Analyse'],
    ['home.method.analysisCopy', 'Understand needs, goals, abilities, limitations, and priorities to choose suitable exercises.', 'Comprendere esigenze, obiettivi, capacità, limitazioni e priorità per scegliere gli esercizi adeguati.', 'Comprender necesidades, objetivos, capacidades, limitaciones y prioridades para elegir los ejercicios adecuados.', 'Comprendre les besoins, les objectifs, les capacités, les limitations et les priorités afin de choisir les exercices appropriés.', 'Bedürfnisse, Ziele, Fähigkeiten, Einschränkungen und Prioritäten erfassen, um geeignete Übungen auszuwählen.'],
    ['home.method.selection', 'Selection', 'Selezione', 'Selección', 'Sélection', 'Auswahl'],
    ['home.method.selectionCopy', 'Choose exercises from the organized archive by anatomical areas and functional goals.', 'Scegliere gli esercizi dall’archivio organizzato per aree anatomiche e obiettivi funzionali.', 'Elegir ejercicios del archivo organizado por áreas anatómicas y objetivos funcionales.', 'Choisir les exercices dans la base organisée par régions anatomiques et objectifs fonctionnels.', 'Übungen aus dem nach anatomischen Regionen und funktionellen Zielen geordneten Archiv auswählen.'],
    ['home.method.planning', 'Planning', 'Pianificazione', 'Planificación', 'Planification', 'Planung'],
    ['home.method.planningCopy', 'Combine exercises to create clear, effective, and personalized plans.', 'Combinare gli esercizi per creare programmi chiari, efficaci e personalizzati.', 'Combinar ejercicios para crear programas claros, eficaces y personalizados.', 'Combiner les exercices pour créer des programmes clairs, efficaces et personnalisés.', 'Übungen zu klaren, wirksamen und individuellen Programmen zusammenstellen.'],
    ['home.method.application', 'Application', 'Applicazione', 'Aplicación', 'Mise en pratique', 'Anwendung'],
    ['home.method.applicationCopy', 'Put theory into practice and turn the plan into a practical tool for wellness and health goals.', 'Tradurre la teoria in pratica e trasformare il programma in uno strumento concreto per obiettivi di benessere e salute.', 'Llevar la teoría a la práctica y convertir el programa en una herramienta concreta para objetivos de bienestar y salud.', 'Mettre la théorie en pratique et faire du programme un outil concret au service des objectifs de bien-être et de santé.', 'Theorie in die Praxis übertragen und das Programm als konkretes Werkzeug für Wohlbefinden und Gesundheitsziele nutzen.'],
    ['home.cta.heading', 'Design the plan. Then make it practical.', 'Progetta il programma. Poi rendilo concreto.', 'Diseña el programa. Después, llévalo a la práctica.', 'Concevez le programme. Puis passez à la pratique.', 'Programm planen. Dann praktisch umsetzen.'],
    ['home.cta.button', 'Start from the generator', 'Inizia dal generatore', 'Empezar con el generador', 'Commencer avec le générateur', 'Mit dem Generator beginnen'],

    ['access.pageTitle', 'Split APA Generator', 'Generatore Split APA', 'Generador Split APA', 'Générateur Split APA', 'Split APA Generator'],
    ['access.status', 'Protected access / Private beta', 'Accesso protetto / Beta privata', 'Acceso protegido / Beta privada', 'Accès protégé / Bêta privée', 'Geschützter Zugang / Private Beta'],
    ['access.eyebrow', 'Protected preview / Private beta', 'Anteprima protetta / Beta privata', 'Vista previa protegida / Beta privada', 'Aperçu protégé / Bêta privée', 'Geschützte Vorschau / Private Beta'],
    ['access.heading', 'Program access.', 'Accesso al programma.', 'Acceso al programa.', 'Accès au programme.', 'Programmzugang.'],
    ['access.lead', 'Exercise archive and adapted workout generator.', 'Archivio di esercizi e generatore di programmi adattati.', 'Archivo de ejercicios y generador de programas adaptados.', 'Base d’exercices et générateur de programmes adaptés.', 'Übungsarchiv und Generator für angepasste Programme.'],
    ['access.stepsAria', 'Access steps', 'Fasi di accesso', 'Pasos de acceso', 'Étapes d’accès', 'Zugangsschritte'],
    ['access.step1', '01 / Authenticate', '01 / Autenticazione', '01 / Autenticación', '01 / Authentification', '01 / Authentifizierung'],
    ['access.step2', '02 / Build your plan', '02 / Crea il tuo programma', '02 / Crea tu programa', '02 / Créez votre programme', '02 / Programm erstellen'],
    ['access.cardEyebrow', 'Access / 01', 'Accesso / 01', 'Acceso / 01', 'Accès / 01', 'Zugang / 01'],
    ['access.unlockHeading', 'Unlock generator.', 'Sblocca il generatore.', 'Desbloquea el generador.', 'Déverrouillez le générateur.', 'Generator freischalten.'],
    ['access.copy', 'Enter the beta password to load the exercise archive and build your plan.', 'Inserisci la password beta per caricare l’archivio degli esercizi e creare il tuo programma.', 'Introduce la contraseña beta para cargar el archivo de ejercicios y crear tu programa.', 'Saisissez le mot de passe bêta pour charger la base d’exercices et créer votre programme.', 'Geben Sie das Beta-Passwort ein, um das Übungsarchiv zu laden und Ihr Programm zu erstellen.'],
    ['access.password', 'Password', 'Password', 'Contraseña', 'Mot de passe', 'Passwort'],
    ['access.passwordAria', 'Access password', 'Password di accesso', 'Contraseña de acceso', 'Mot de passe d’accès', 'Zugangspasswort'],
    ['access.unlockButton', 'Unlock generator', 'Sblocca il generatore', 'Desbloquear el generador', 'Déverrouiller le générateur', 'Generator freischalten'],
    ['access.backHome', 'Back to Split APA home', 'Torna alla home di Split APA', 'Volver al inicio de Split APA', 'Retour à l’accueil de Split APA', 'Zurück zur Split APA Startseite'],
    ['access.note', 'Beta access / protected preview', 'Accesso beta / Anteprima protetta', 'Acceso beta / Vista previa protegida', 'Accès bêta / Aperçu protégé', 'Beta-Zugang / Geschützte Vorschau'],
    ['access.error.required', 'Enter the beta password.', 'Inserisci la password beta.', 'Introduce la contraseña beta.', 'Saisissez le mot de passe bêta.', 'Geben Sie das Beta-Passwort ein.'],
    ['access.error.wrong', 'Wrong password. Please try again.', 'Password errata. Riprova.', 'Contraseña incorrecta. Inténtalo de nuevo.', 'Mot de passe incorrect. Veuillez réessayer.', 'Falsches Passwort. Bitte versuchen Sie es erneut.'],
    ['access.error.browser', 'Access check failed in this browser. Try opening the app in a standard browser tab.', 'Il controllo di accesso non è riuscito in questo browser. Apri l’applicazione in una normale scheda del browser.', 'La comprobación de acceso ha fallado en este navegador. Abre la aplicación en una pestaña estándar.', 'La vérification de l’accès a échoué dans ce navigateur. Ouvrez l’application dans un onglet standard.', 'Die Zugangsprüfung ist in diesem Browser fehlgeschlagen. Öffnen Sie die Anwendung in einem normalen Browser-Tab.'],

    ['generator.status.loadingArchive', 'Loading archive', 'Caricamento archivio', 'Cargando archivo', 'Chargement de la base', 'Archiv wird geladen'],
    ['generator.logout', 'Log out', 'Esci', 'Cerrar sesión', 'Se déconnecter', 'Abmelden'],
    ['generator.hero.eyebrow', 'Adapted physical activity / Exercise archive', 'Attività fisica adattata / Archivio esercizi', 'Actividad física adaptada / Archivo de ejercicios', 'Activité physique adaptée / Base d’exercices', 'Angepasste körperliche Aktivität / Übungsarchiv'],
    ['generator.hero.heading', 'Program Generator', 'Generatore di programmi', 'Generador de programas', 'Générateur de programmes', 'Programmgenerator'],
    ['generator.hero.lead', 'Create a focused APA workout by body district. Data is loaded externally, keeping the page light and scalable.', 'Crea un programma AFA mirato per uno o più distretti corporei. I dati vengono caricati separatamente, mantenendo la pagina leggera e scalabile.', 'Crea un programa de AFA específico para una o varias regiones corporales. Los datos se cargan por separado para mantener la página ligera y escalable.', 'Créez un programme d’APA ciblé pour une ou plusieurs régions corporelles. Les données sont chargées séparément afin de conserver une page légère et évolutive.', 'Erstellen Sie ein gezieltes APA-Programm für eine oder mehrere Körperregionen. Die Daten werden separat geladen, damit die Seite schlank und skalierbar bleibt.'],
    ['generator.districtOverviewAria', 'Body district overview', 'Panoramica dei distretti corporei', 'Vista general de las regiones corporales', 'Aperçu des régions corporelles', 'Übersicht der Körperregionen'],
    ['generator.controlsAria', 'Generator controls', 'Comandi del generatore', 'Controles del generador', 'Commandes du générateur', 'Generatorsteuerung'],
    ['generator.selectedDistrict', 'Selected district', 'Distretto selezionato', 'Región seleccionada', 'Région sélectionnée', 'Ausgewählte Körperregion'],
    ['generator.archiveSize', 'Archive size', 'Dimensione archivio', 'Tamaño del archivo', 'Taille de la base', 'Archivgröße'],
    ['generator.buildTitle', 'Build your plan', 'Crea il tuo programma', 'Crea tu programa', 'Créez votre programme', 'Programm erstellen'],
    ['generator.buildCopy', 'Choose a body district, then generate a complete workout from the available sections.', 'Scegli uno o più distretti corporei, quindi genera un programma completo dalle sezioni disponibili.', 'Elige una o varias regiones corporales y genera un programa completo a partir de las secciones disponibles.', 'Choisissez une ou plusieurs régions corporelles, puis générez un programme complet à partir des sections disponibles.', 'Wählen Sie eine oder mehrere Körperregionen und erstellen Sie anschließend ein vollständiges Programm aus den verfügbaren Abschnitten.'],
    ['generator.districts', 'Districts', 'Distretti', 'Regiones', 'Régions', 'Körperregionen'],
    ['generator.selectDistrictsAria', 'Select body districts', 'Seleziona i distretti corporei', 'Seleccionar regiones corporales', 'Sélectionner les régions corporelles', 'Körperregionen auswählen'],
    ['generator.perSection', 'Per section', 'Per sezione', 'Por sección', 'Par section', 'Pro Abschnitt'],
    ['generator.perSectionAria', 'Exercises per section', 'Esercizi per sezione', 'Ejercicios por sección', 'Exercices par section', 'Übungen pro Abschnitt'],
    ['generator.ask', 'Ask Split APA', 'Chiedi a Split APA', 'Pregunta a Split APA', 'Interroger Split APA', 'Split APA fragen'],
    ['generator.askPlaceholder', 'Try shoulder flexion or ankle plantar flexion', 'Prova con flessione della spalla o flessione plantare della caviglia', 'Prueba con flexión del hombro o flexión plantar del tobillo', 'Essayez flexion de l’épaule ou flexion plantaire de la cheville', 'Versuchen Sie Schulterflexion oder Plantarflexion des Sprunggelenks'],
    ['generator.find', 'Find exercises', 'Trova esercizi', 'Buscar ejercicios', 'Rechercher des exercices', 'Übungen suchen'],
    ['generator.askHint', 'Local movement search / district + action', 'Ricerca locale del movimento / distretto + azione', 'Búsqueda local de movimiento / región + acción', 'Recherche locale de mouvement / région + action', 'Lokale Bewegungssuche / Körperregion + Aktion'],
    ['generator.generate', 'Generate workout', 'Genera programma', 'Generar programa', 'Générer le programme', 'Programm erstellen'],
    ['generator.clear', 'Clear workout', 'Cancella programma', 'Borrar programa', 'Effacer le programme', 'Programm löschen'],
    ['generator.codeToolsAria', 'Workout code tools', 'Strumenti per il codice del programma', 'Herramientas del código del programa', 'Outils du code du programme', 'Werkzeuge für den Programmcode'],
    ['generator.workoutCode', 'Workout code', 'Codice programma', 'Código del programa', 'Code du programme', 'Programmcode'],
    ['generator.codePlaceholder', 'Generate a workout or paste a saved code', 'Genera un programma o incolla un codice salvato', 'Genera un programa o pega un código guardado', 'Générez un programme ou collez un code enregistré', 'Erstellen Sie ein Programm oder fügen Sie einen gespeicherten Code ein'],
    ['generator.copyCode', 'Copy code', 'Copia codice', 'Copiar código', 'Copier le code', 'Code kopieren'],
    ['generator.loadCode', 'Load code', 'Carica codice', 'Cargar código', 'Charger le code', 'Code laden'],
    ['generator.codeHint', 'Code updates when the plan changes', 'Il codice si aggiorna quando il programma cambia', 'El código se actualiza cuando cambia el programa', 'Le code est actualisé lorsque le programme change', 'Der Code wird bei Änderungen am Programm aktualisiert'],
    ['generator.fms.open', 'Open FMS assessment', 'Apri la valutazione FMS', 'Abrir la evaluación FMS', 'Ouvrir l’évaluation FMS', 'FMS Bewertung öffnen'],
    ['generator.fms.note', 'Seven movement patterns / guided scoring / three recommended plans', 'Sette schemi di movimento / punteggio guidato / tre programmi consigliati', 'Siete patrones de movimiento / puntuación guiada / tres programas recomendados', 'Sept schémas de mouvement / cotation guidée / trois programmes recommandés', 'Sieben Bewegungsmuster / geführte Bewertung / drei empfohlene Programme'],
    ['generator.generatedPlan', 'Generated plan', 'Programma generato', 'Programa generado', 'Programme généré', 'Erstelltes Programm'],
    ['generator.workoutPreview', 'Workout preview', 'Anteprima del programma', 'Vista previa del programa', 'Aperçu du programme', 'Programmvorschau'],
    ['generator.noWorkout', 'No workout generated', 'Nessun programma generato', 'No se ha generado ningún programa', 'Aucun programme généré', 'Kein Programm erstellt'],
    ['generator.sortDifficulty', 'Sort difficulty', 'Ordina per difficoltà', 'Ordenar por dificultad', 'Trier par difficulté', 'Nach Schwierigkeit sortieren'],
    ['generator.sortAria', 'Sort generated exercises by difficulty', 'Ordina gli esercizi generati per difficoltà', 'Ordenar los ejercicios generados por dificultad', 'Trier les exercices générés par difficulté', 'Erstellte Übungen nach Schwierigkeit sortieren'],
    ['generator.sort.default', 'Generated order', 'Ordine di generazione', 'Orden de generación', 'Ordre de génération', 'Erstellungsreihenfolge'],
    ['generator.sort.easyHard', 'Easy to hard', 'Dal più facile al più difficile', 'De menor a mayor dificultad', 'Du plus facile au plus difficile', 'Von leicht nach schwer'],
    ['generator.sort.hardEasy', 'Hard to easy', 'Dal più difficile al più facile', 'De mayor a menor dificultad', 'Du plus difficile au plus facile', 'Von schwer nach leicht'],
    ['generator.footer.app', 'Split APA Generator / Static app', 'Generatore Split APA / Applicazione statica', 'Generador Split APA / Aplicación estática', 'Générateur Split APA / Application statique', 'Split APA Generator / Statische Anwendung'],
    ['generator.footer.data', 'Data loaded from JSON', 'Dati caricati da JSON', 'Datos cargados desde JSON', 'Données chargées depuis JSON', 'Daten aus JSON geladen'],
    ['generator.noscript', 'JavaScript is required to load the exercise archive.', 'JavaScript è necessario per caricare l’archivio degli esercizi.', 'JavaScript es necesario para cargar el archivo de ejercicios.', 'JavaScript est nécessaire pour charger la base d’exercices.', 'JavaScript ist zum Laden des Übungsarchivs erforderlich.'],

    ['generator.quantity.one', '1 exercise', '1 esercizio', '1 ejercicio', '1 exercice', '1 Übung'],
    ['generator.quantity.many', '{count} exercises', '{count} esercizi', '{count} ejercicios', '{count} exercices', '{count} Übungen'],
    ['generator.quantity.all', 'All exercises', 'Tutti gli esercizi', 'Todos los ejercicios', 'Tous les exercices', 'Alle Übungen'],
    ['generator.selectOption', 'Select option', 'Seleziona un’opzione', 'Selecciona una opción', 'Sélectionnez une option', 'Option auswählen'],
    ['generator.selectQuantity', 'Select quantity', 'Seleziona la quantità', 'Selecciona la cantidad', 'Sélectionnez la quantité', 'Anzahl auswählen'],
    ['generator.selectDistricts', 'Select districts', 'Seleziona i distretti', 'Selecciona las regiones', 'Sélectionnez les régions', 'Körperregionen auswählen'],
    ['generator.bodyDistricts', 'Body districts', 'Distretti corporei', 'Regiones corporales', 'Régions corporelles', 'Körperregionen'],
    ['generator.districtCount', '{count} districts', '{count} distretti', '{count} regiones', '{count} régions', '{count} Körperregionen'],
    ['generator.singleMeta', '{count} exercises', '{count} esercizi', '{count} ejercicios', '{count} exercices', '{count} Übungen'],
    ['generator.multiMeta', '{sections} sections / {exercises} exercises', '{sections} sezioni / {exercises} esercizi', '{sections} secciones / {exercises} ejercicios', '{sections} sections / {exercises} exercices', '{sections} Abschnitte / {exercises} Übungen'],
    ['generator.singlePlan', '{district} plan', 'Programma {district}', 'Programa de {district}', 'Programme : {district}', 'Programm: {district}'],
    ['generator.multiPlan', 'Multi-district plan', 'Programma multidistretto', 'Programa multirregional', 'Programme multirégional', 'Programm für mehrere Körperregionen'],
    ['generator.singleWorkout', '{district} workout', 'Programma {district}', 'Programa de {district}', 'Programme : {district}', 'Programm: {district}'],
    ['generator.multiWorkout', 'Multi-district workout', 'Programma multidistretto', 'Programa multirregional', 'Programme multirégional', 'Programm für mehrere Körperregionen'],
    ['generator.singleCopy', '{sections} sections available. Generate a complete plan or replace individual exercises after generation.', '{sections} sezioni disponibili. Genera un programma completo oppure sostituisci i singoli esercizi dopo la generazione.', '{sections} secciones disponibles. Genera un programa completo o sustituye ejercicios individuales después de generarlo.', '{sections} sections disponibles. Générez un programme complet ou remplacez certains exercices après sa création.', '{sections} Abschnitte verfügbar. Erstellen Sie ein vollständiges Programm oder ersetzen Sie anschließend einzelne Übungen.'],
    ['generator.multiCopy', '{count} body districts selected. Generate a grouped plan while keeping each district separated.', '{count} distretti corporei selezionati. Genera un programma raggruppato mantenendo separato ogni distretto.', '{count} regiones corporales seleccionadas. Genera un programa agrupado manteniendo cada región separada.', '{count} régions corporelles sélectionnées. Générez un programme groupé en conservant chaque région séparée.', '{count} Körperregionen ausgewählt. Erstellen Sie ein gruppiertes Programm, in dem jede Körperregion getrennt bleibt.'],
    ['generator.loadingDistrict', 'Loading {district}', 'Caricamento {district}', 'Cargando {district}', 'Chargement : {district}', '{district} wird geladen'],
    ['generator.archiveReady', 'Archive ready', 'Archivio pronto', 'Archivo listo', 'Base prête', 'Archiv bereit'],
    ['generator.archiveErrorStatus', 'Archive error', 'Errore archivio', 'Error del archivo', 'Erreur de la base', 'Archivfehler'],
    ['generator.archiveSelectedError', 'One selected archive could not be loaded. Check that the district JSON files are published correctly.', 'Non è stato possibile caricare uno degli archivi selezionati. Verifica che i file JSON dei distretti siano pubblicati correttamente.', 'No se ha podido cargar uno de los archivos seleccionados. Comprueba que los archivos JSON de las regiones estén publicados correctamente.', 'L’une des bases sélectionnées n’a pas pu être chargée. Vérifiez que les fichiers JSON des régions sont correctement publiés.', 'Eines der ausgewählten Archive konnte nicht geladen werden. Prüfen Sie, ob die JSON-Dateien der Körperregionen korrekt veröffentlicht sind.'],
    ['generator.oneOrMoreDistricts', 'one or more districts', 'uno o più distretti', 'una o varias regiones', 'une ou plusieurs régions', 'eine oder mehrere Körperregionen'],
    ['generator.emptyPrompt', 'No workout generated. Select {district} and press Generate workout.', 'Nessun programma generato. Seleziona {district} e premi Genera programma.', 'No se ha generado ningún programa. Selecciona {district} y pulsa Generar programa.', 'Aucun programme généré. Sélectionnez {district}, puis appuyez sur Générer le programme.', 'Kein Programm erstellt. Wählen Sie {district} und anschließend Programm erstellen.'],
    ['generator.generatedLabel', 'exercises generated', 'esercizi generati', 'ejercicios generados', 'exercices générés', 'erstellte Übungen'],
    ['generator.restoredLabel', 'exercises restored', 'esercizi ripristinati', 'ejercicios restaurados', 'exercices restaurés', 'wiederhergestellte Übungen'],
    ['generator.smartLabel', 'smart matches', 'corrispondenze intelligenti', 'coincidencias inteligentes', 'résultats intelligents', 'intelligente Treffer'],
    ['generator.metaOf', '{shown} of {total} {label}', '{shown} di {total} {label}', '{shown} de {total} {label}', '{shown} sur {total} {label}', '{shown} von {total} {label}'],
    ['generator.metaCount', '{count} {label}', '{count} {label}', '{count} {label}', '{count} {label}', '{count} {label}'],
    ['generator.copyFirst', 'Generate a workout before copying a code.', 'Genera un programma prima di copiare il codice.', 'Genera un programa antes de copiar el código.', 'Générez un programme avant de copier le code.', 'Erstellen Sie ein Programm, bevor Sie den Code kopieren.'],
    ['generator.codeCopied', 'Workout code copied.', 'Codice del programma copiato.', 'Código del programa copiado.', 'Code du programme copié.', 'Programmcode kopiert.'],
    ['generator.codeSelected', 'Code selected. Copy it manually.', 'Codice selezionato. Copialo manualmente.', 'Código seleccionado. Cópialo manualmente.', 'Code sélectionné. Copiez-le manuellement.', 'Code ausgewählt. Kopieren Sie ihn manuell.'],
    ['generator.invalidCode', 'Invalid workout code.', 'Codice programma non valido.', 'Código de programa no válido.', 'Code de programme non valide.', 'Ungültiger Programmcode.'],
    ['generator.codeNotLoaded', 'Code not loaded', 'Codice non caricato', 'Código no cargado', 'Code non chargé', 'Code nicht geladen'],
    ['generator.loadingCode', 'Loading workout code', 'Caricamento codice programma', 'Cargando código del programa', 'Chargement du code du programme', 'Programmcode wird geladen'],
    ['generator.loadingSaved', 'Loading saved workout', 'Caricamento programma salvato', 'Cargando programa guardado', 'Chargement du programme enregistré', 'Gespeichertes Programm wird geladen'],
    ['generator.restoredWorkout', 'Restored workout', 'Programma ripristinato', 'Programa restaurado', 'Programme restauré', 'Wiederhergestelltes Programm'],
    ['generator.missingRestored', '{count} exercise could not be restored.', 'Non è stato possibile ripristinare {count} esercizio.', 'No se ha podido restaurar {count} ejercicio.', '{count} exercice n’a pas pu être restauré.', '{count} Übung konnte nicht wiederhergestellt werden.'],
    ['generator.workoutRestored', 'Workout restored from code.', 'Programma ripristinato dal codice.', 'Programa restaurado desde el código.', 'Programme restauré à partir du code.', 'Programm aus dem Code wiederhergestellt.'],
    ['generator.codeLoadFailed', 'Workout code could not be loaded.', 'Non è stato possibile caricare il codice del programma.', 'No se ha podido cargar el código del programa.', 'Le code du programme n’a pas pu être chargé.', 'Der Programmcode konnte nicht geladen werden.'],
    ['generator.searchPrompt', 'Enter a district and movement, for example shoulder flexion.', 'Inserisci un distretto e un movimento, ad esempio flessione della spalla.', 'Introduce una región y un movimiento, por ejemplo flexión del hombro.', 'Saisissez une région et un mouvement, par exemple flexion de l’épaule.', 'Geben Sie eine Körperregion und eine Bewegung ein, zum Beispiel Schulterflexion.'],
    ['generator.searchingStatus', 'Searching archive', 'Ricerca nell’archivio', 'Buscando en el archivo', 'Recherche dans la base', 'Archiv wird durchsucht'],
    ['generator.searchingHint', 'Searching local archive', 'Ricerca nell’archivio locale', 'Buscando en el archivo local', 'Recherche dans la base locale', 'Lokales Archiv wird durchsucht'],
    ['generator.smartResults', 'Smart results', 'Risultati intelligenti', 'Resultados inteligentes', 'Résultats intelligents', 'Intelligente Ergebnisse'],
    ['generator.noMatchCopy', 'No matching exercise found. Try a broader query such as shoulder mobility or ankle flexion.', 'Nessun esercizio corrispondente. Prova una ricerca più ampia, come mobilità della spalla o flessione della caviglia.', 'No se ha encontrado ningún ejercicio. Prueba una búsqueda más amplia, como movilidad del hombro o flexión del tobillo.', 'Aucun exercice correspondant. Essayez une recherche plus large, comme mobilité de l’épaule ou flexion de la cheville.', 'Keine passende Übung gefunden. Versuchen Sie eine allgemeinere Suche, etwa Schultermobilität oder Sprunggelenkflexion.'],
    ['generator.noSmartMatch', 'No smart match', 'Nessuna corrispondenza intelligente', 'Sin coincidencias inteligentes', 'Aucun résultat intelligent', 'Keine intelligenten Treffer'],
    ['generator.noMatchHint', 'No match. Try a broader query.', 'Nessuna corrispondenza. Prova una ricerca più ampia.', 'Sin coincidencias. Prueba una búsqueda más amplia.', 'Aucun résultat. Essayez une recherche plus large.', 'Kein Treffer. Versuchen Sie eine allgemeinere Suche.'],
    ['generator.smartReady', 'Smart search ready', 'Ricerca intelligente pronta', 'Búsqueda inteligente lista', 'Recherche intelligente prête', 'Intelligente Suche bereit'],
    ['generator.searchError', 'Smart search could not read the local archive. Check that all JSON files are published correctly.', 'La ricerca intelligente non ha potuto leggere l’archivio locale. Verifica che tutti i file JSON siano pubblicati correttamente.', 'La búsqueda inteligente no ha podido leer el archivo local. Comprueba que todos los archivos JSON estén publicados correctamente.', 'La recherche intelligente n’a pas pu lire la base locale. Vérifiez que tous les fichiers JSON sont correctement publiés.', 'Die intelligente Suche konnte das lokale Archiv nicht lesen. Prüfen Sie, ob alle JSON-Dateien korrekt veröffentlicht sind.'],
    ['generator.searchUnavailable', 'Search unavailable', 'Ricerca non disponibile', 'Búsqueda no disponible', 'Recherche indisponible', 'Suche nicht verfügbar'],
    ['generator.matched', 'Matched: {criteria}', 'Corrispondenza: {criteria}', 'Coincidencia: {criteria}', 'Correspondance : {criteria}', 'Treffer: {criteria}'],
    ['generator.matchedText', 'Matched by exercise text', 'Corrispondenza basata sul testo dell’esercizio', 'Coincidencia basada en el texto del ejercicio', 'Correspondance fondée sur le texte de l’exercice', 'Treffer anhand des Übungstextes'],
    ['generator.difficulty', 'Difficulty', 'Difficoltà', 'Dificultad', 'Difficulté', 'Schwierigkeit'],
    ['generator.difficultyAria', 'Difficulty {level} of 5', 'Difficoltà {level} su 5', 'Dificultad {level} de 5', 'Difficulté {level} sur 5', 'Schwierigkeit {level} von 5'],
    ['generator.area', 'Area', 'Area', 'Área', 'Région', 'Bereich'],
    ['generator.movement', 'Movement', 'Movimento', 'Movimiento', 'Mouvement', 'Bewegung'],
    ['generator.notTagged', 'Not tagged', 'Non classificato', 'Sin etiqueta', 'Non catégorisé', 'Nicht kategorisiert'],
    ['generator.unsectioned', 'Unsectioned', 'Senza sezione', 'Sin sección', 'Sans section', 'Ohne Abschnitt'],
    ['generator.replaceLabel', 'Choose another exercise from the same district', 'Scegli un altro esercizio dello stesso distretto', 'Elige otro ejercicio de la misma región', 'Choisissez un autre exercice de la même région', 'Wählen Sie eine andere Übung aus derselben Körperregion'],
    ['generator.replacementAria', 'Replacement exercise', 'Esercizio sostitutivo', 'Ejercicio de sustitución', 'Exercice de remplacement', 'Ersatzübung'],
    ['generator.confirm', 'Confirm', 'Conferma', 'Confirmar', 'Confirmer', 'Bestätigen'],
    ['generator.cancel', 'Cancel', 'Annulla', 'Cancelar', 'Annuler', 'Abbrechen'],
    ['generator.selectExercise', 'Select exercise', 'Seleziona esercizio', 'Selecciona un ejercicio', 'Sélectionnez un exercice', 'Übung auswählen'],
    ['generator.replacementsAria', 'Replacement exercises', 'Esercizi sostitutivi', 'Ejercicios de sustitución', 'Exercices de remplacement', 'Ersatzübungen'],
    ['generator.markCompleted', 'Mark {exercise} as completed', 'Segna {exercise} come completato', 'Marcar {exercise} como completado', 'Marquer {exercise} comme terminé', '{exercise} als abgeschlossen markieren'],
    ['generator.change', 'Change', 'Cambia', 'Cambiar', 'Remplacer', 'Ändern'],
    ['generator.remove', 'Remove', 'Rimuovi', 'Eliminar', 'Supprimer', 'Entfernen'],
    ['generator.overview', 'Overview', 'Descrizione', 'Descripción', 'Description', 'Übersicht'],
    ['generator.howTo', 'How to do it', 'Come eseguirlo', 'Cómo realizarlo', 'Comment l’exécuter', 'Ausführung'],
    ['generator.whatToDo', 'What to do', 'Cosa fare', 'Qué hacer', 'À faire', 'Darauf achten'],
    ['generator.whatNotToDo', 'What not to do', 'Cosa non fare', 'Qué evitar', 'À éviter', 'Zu vermeiden'],
    ['generator.notes', 'Exercise notes', 'Note sull’esercizio', 'Notas del ejercicio', 'Notes sur l’exercice', 'Übungshinweise'],
    ['generator.workoutGenerated', 'Workout generated', 'Programma generato', 'Programa generado', 'Programme généré', 'Programm erstellt'],
    ['generator.archiveLoadError', 'The exercise archive could not be loaded. Publish this folder on a static host or preview it through a local server.', 'Non è stato possibile caricare l’archivio degli esercizi. Pubblica questa cartella su un host statico oppure visualizzala tramite un server locale.', 'No se ha podido cargar el archivo de ejercicios. Publica esta carpeta en un alojamiento estático o visualízala mediante un servidor local.', 'La base d’exercices n’a pas pu être chargée. Publiez ce dossier sur un hébergement statique ou prévisualisez-le via un serveur local.', 'Das Übungsarchiv konnte nicht geladen werden. Veröffentlichen Sie diesen Ordner auf einem statischen Host oder zeigen Sie ihn über einen lokalen Server an.']
  ];

  const tokenRows = [
    ['abdomen', 'Abdomen', 'Addome', 'Abdomen', 'Abdomen', 'Bauch'],
    ['ankle', 'Ankle', 'Caviglia', 'Tobillo', 'Cheville', 'Sprunggelenk'],
    ['chest', 'Chest', 'Torace', 'Tórax', 'Thorax', 'Thorax'],
    ['elbow', 'Elbow', 'Gomito', 'Codo', 'Coude', 'Ellenbogen'],
    ['foot', 'Foot', 'Piede', 'Pie', 'Pied', 'Fuß'],
    ['forearm', 'Forearm', 'Avambraccio', 'Antebrazo', 'Avant-bras', 'Unterarm'],
    ['hand', 'Hand', 'Mano', 'Mano', 'Main', 'Hand'],
    ['hip', 'Hip', 'Anca', 'Cadera', 'Hanche', 'Hüfte'],
    ['knee', 'Knee', 'Ginocchio', 'Rodilla', 'Genou', 'Knie'],
    ['neck', 'Neck', 'Collo', 'Cuello', 'Cou', 'Hals'],
    ['pelvic-floor', 'Pelvic floor', 'Pavimento pelvico', 'Suelo pélvico', 'Plancher pelvien', 'Beckenboden'],
    ['pelvis', 'Pelvis', 'Bacino', 'Pelvis', 'Bassin', 'Becken'],
    ['shoulder', 'Shoulder', 'Spalla', 'Hombro', 'Épaule', 'Schulter'],
    ['spine', 'Spine', 'Colonna vertebrale', 'Columna vertebral', 'Colonne vertébrale', 'Wirbelsäule'],
    ['wrist', 'Wrist', 'Polso', 'Muñeca', 'Poignet', 'Handgelenk'],
    ['abduction', 'Abduction', 'Abduzione', 'Abducción', 'Abduction', 'Abduktion'],
    ['adduction', 'Adduction', 'Adduzione', 'Aducción', 'Adduction', 'Adduktion'],
    ['anterior-pelvic-tilt', 'Anterior pelvic tilt', 'Antiversione del bacino', 'Anteversión pélvica', 'Antéversion du bassin', 'Beckenkippung nach vorn'],
    ['anterior-translation', 'Anterior translation', 'Traslazione anteriore', 'Traslación anterior', 'Translation antérieure', 'Translation nach vorn'],
    ['anti-rotation', 'Anti-rotation', 'Anti-rotazione', 'Antirrotación', 'Anti-rotation', 'Antirotation'],
    ['breathing', 'Breathing', 'Respirazione', 'Respiración', 'Respiration', 'Atmung'],
    ['circumduction', 'Circumduction', 'Circonduzione', 'Circunducción', 'Circumduction', 'Zirkumduktion'],
    ['closed-chain', 'Closed chain', 'Catena cinetica chiusa', 'Cadena cinética cerrada', 'Chaîne cinétique fermée', 'Geschlossene kinetische Kette'],
    ['contraction', 'Contraction', 'Contrazione', 'Contracción', 'Contraction', 'Kontraktion'],
    ['coordination', 'Coordination', 'Coordinazione', 'Coordinación', 'Coordination', 'Koordination'],
    ['diaphragmatic-breathing', 'Diaphragmatic breathing', 'Respirazione diaframmatica', 'Respiración diafragmática', 'Respiration diaphragmatique', 'Zwerchfellatmung'],
    ['dorsiflexion', 'Dorsiflexion', 'Dorsiflessione', 'Flexión dorsal', 'Flexion dorsale', 'Dorsalextension'],
    ['elevation', 'Elevation', 'Elevazione', 'Elevación', 'Élévation', 'Elevation'],
    ['eversion', 'Eversion', 'Eversione', 'Eversión', 'Éversion', 'Eversion'],
    ['extension', 'Extension', 'Estensione', 'Extensión', 'Extension', 'Extension'],
    ['external-rotation', 'External rotation', 'Rotazione esterna', 'Rotación externa', 'Rotation externe', 'Außenrotation'],
    ['finger-abduction', 'Finger abduction', 'Abduzione delle dita', 'Abducción de los dedos', 'Abduction des doigts', 'Fingerabduktion'],
    ['finger-adduction', 'Finger adduction', 'Adduzione delle dita', 'Aducción de los dedos', 'Adduction des doigts', 'Fingeradduktion'],
    ['finger-extension', 'Finger extension', 'Estensione delle dita', 'Extensión de los dedos', 'Extension des doigts', 'Fingerextension'],
    ['finger-flexion', 'Finger flexion', 'Flessione delle dita', 'Flexión de los dedos', 'Flexion des doigts', 'Fingerflexion'],
    ['flexion', 'Flexion', 'Flessione', 'Flexión', 'Flexion', 'Flexion'],
    ['gravity-assisted', 'Gravity assisted', 'Assistito dalla gravità', 'Asistido por la gravedad', 'Assisté par la gravité', 'Schwerkraftunterstützt'],
    ['grip', 'Grip', 'Presa', 'Prensión', 'Préhension', 'Greifen'],
    ['horizontal-abduction', 'Horizontal abduction', 'Abduzione orizzontale', 'Abducción horizontal', 'Abduction horizontale', 'Horizontale Abduktion'],
    ['horizontal-adduction', 'Horizontal adduction', 'Adduzione orizzontale', 'Aducción horizontal', 'Adduction horizontale', 'Horizontale Adduktion'],
    ['internal-rotation', 'Internal rotation', 'Rotazione interna', 'Rotación interna', 'Rotation interne', 'Innenrotation'],
    ['inversion', 'Inversion', 'Inversione', 'Inversión', 'Inversion', 'Inversion'],
    ['isometric', 'Isometric', 'Isometrico', 'Isométrico', 'Isométrique', 'Isometrisch'],
    ['lateral-flexion', 'Lateral flexion', 'Flessione laterale', 'Flexión lateral', 'Inclinaison latérale', 'Lateralflexion'],
    ['lateral-shift', 'Lateral shift', 'Traslazione laterale', 'Desplazamiento lateral', 'Translation latérale', 'Seitverschiebung'],
    ['mobility', 'Mobility', 'Mobilità', 'Movilidad', 'Mobilité', 'Mobilität'],
    ['obstacle-clearance', 'Obstacle clearance', 'Superamento dell’ostacolo', 'Franqueo de obstáculos', 'Franchissement d’obstacle', 'Hindernisüberwindung'],
    ['opposition', 'Opposition', 'Opposizione', 'Oposición', 'Opposition', 'Opposition'],
    ['pelvic-hike', 'Pelvic hike', 'Elevazione del bacino', 'Elevación pélvica', 'Élévation du bassin', 'Beckenhebung'],
    ['plantar-flexion', 'Plantar flexion', 'Flessione plantare', 'Flexión plantar', 'Flexion plantaire', 'Plantarflexion'],
    ['posterior-pelvic-tilt', 'Posterior pelvic tilt', 'Retroversione del bacino', 'Retroversión pélvica', 'Rétroversion du bassin', 'Beckenkippung nach hinten'],
    ['posterior-translation', 'Posterior translation', 'Traslazione posteriore', 'Traslación posterior', 'Translation postérieure', 'Translation nach hinten'],
    ['pronation', 'Pronation', 'Pronazione', 'Pronación', 'Pronation', 'Pronation'],
    ['radial-deviation', 'Radial deviation', 'Deviazione radiale', 'Desviación radial', 'Inclinaison radiale', 'Radialabduktion'],
    ['relaxation', 'Relaxation', 'Rilassamento', 'Relajación', 'Relaxation', 'Entspannung'],
    ['rib-expansion', 'Rib expansion', 'Espansione costale', 'Expansión costal', 'Expansion costale', 'Rippenexpansion'],
    ['rotation', 'Rotation', 'Rotazione', 'Rotación', 'Rotation', 'Rotation'],
    ['scapular-depression', 'Scapular depression', 'Depressione scapolare', 'Descenso escapular', 'Abaissement scapulaire', 'Skapuladepression'],
    ['scapular-elevation', 'Scapular elevation', 'Elevazione scapolare', 'Elevación escapular', 'Élévation scapulaire', 'Skapulaelevation'],
    ['scapular-protraction', 'Scapular protraction', 'Protrazione scapolare', 'Protracción escapular', 'Protraction scapulaire', 'Skapulaprotraktion'],
    ['scapular-retraction', 'Scapular retraction', 'Retrazione scapolare', 'Retracción escapular', 'Rétraction scapulaire', 'Skapularetraktion'],
    ['scapular-upward-rotation', 'Scapular upward rotation', 'Rotazione superiore della scapola', 'Rotación superior escapular', 'Sonnette latérale de la scapula', 'Aufwärtsrotation der Skapula'],
    ['selective-control', 'Selective control', 'Controllo selettivo', 'Control selectivo', 'Contrôle sélectif', 'Selektive Kontrolle'],
    ['soft-tissue-mobilization', 'Soft-tissue mobilization', 'Mobilizzazione dei tessuti molli', 'Movilización de tejidos blandos', 'Mobilisation des tissus mous', 'Weichteilmobilisation'],
    ['stabilization', 'Stabilization', 'Stabilizzazione', 'Estabilización', 'Stabilisation', 'Stabilisation'],
    ['stretch', 'Stretch', 'Allungamento', 'Estiramiento', 'Étirement', 'Dehnung'],
    ['supination', 'Supination', 'Supinazione', 'Supinación', 'Supination', 'Supination'],
    ['thumb-adduction', 'Thumb adduction', 'Adduzione del pollice', 'Aducción del pulgar', 'Adduction du pouce', 'Daumenadduktion'],
    ['toe-abduction', 'Toe abduction', 'Abduzione delle dita del piede', 'Abducción de los dedos del pie', 'Abduction des orteils', 'Zehenabduktion'],
    ['toe-extension', 'Toe extension', 'Estensione delle dita del piede', 'Extensión de los dedos del pie', 'Extension des orteils', 'Zehenextension'],
    ['toe-flexion', 'Toe flexion', 'Flessione delle dita del piede', 'Flexión de los dedos del pie', 'Flexion des orteils', 'Zehenflexion'],
    ['ulnar-deviation', 'Ulnar deviation', 'Deviazione ulnare', 'Desviación cubital', 'Inclinaison ulnaire', 'Ulnarabduktion']
  ];

  const districtGroupRows = [
    ['neck', 'Neck', 'Collo', 'Cuello', 'Cou', 'Hals'],
    ['upper-limb', 'Upper Limb', 'Arto superiore', 'Miembro superior', 'Membre supérieur', 'Obere Extremität'],
    ['trunk', 'Trunk', 'Tronco', 'Tronco', 'Tronc', 'Rumpf'],
    ['lower-limb', 'Lower Limb', 'Arto inferiore', 'Miembro inferior', 'Membre inférieur', 'Untere Extremität']
  ];

  function getLanguage() {
    try {
      const stored = window.localStorage.getItem(storageKey);
      if (supported.has(stored)) return stored;
    } catch (error) {
      // Storage can be blocked in private or embedded contexts.
    }
    return 'en';
  }

  function setLanguage(language) {
    const normalized = supported.has(language) ? language : 'en';
    try {
      window.localStorage.setItem(storageKey, normalized);
    } catch (error) {
      // The current page still uses the selected language for this load.
    }
    document.documentElement.lang = normalized;
    return normalized;
  }

  function lookup(rows, key, language = getLanguage()) {
    const row = rows.find((entry) => entry[0] === key);
    if (!row) return key;
    return row[column[language]] || row[column.en] || key;
  }

  function interpolate(value, variables = {}) {
    return String(value).replace(/\{([a-zA-Z]+)\}/g, (match, key) => (
      Object.prototype.hasOwnProperty.call(variables, key) ? String(variables[key]) : match
    ));
  }

  function t(key, variables = {}, language = getLanguage()) {
    return interpolate(lookup(messageRows, key, language), variables);
  }

  function token(value, language = getLanguage()) {
    return lookup(tokenRows, value, language);
  }

  function districtGroup(value, language = getLanguage()) {
    return lookup(districtGroupRows, value, language);
  }

  function apply(root = document) {
    const language = getLanguage();
    document.documentElement.lang = language;
    root.querySelectorAll('[data-i18n]').forEach((element) => {
      element.textContent = t(element.dataset.i18n, {}, language);
    });
    root.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
      element.setAttribute('placeholder', t(element.dataset.i18nPlaceholder, {}, language));
    });
    root.querySelectorAll('[data-i18n-aria]').forEach((element) => {
      element.setAttribute('aria-label', t(element.dataset.i18nAria, {}, language));
    });
    const titleKey = document.documentElement.dataset.i18nTitle;
    if (titleKey) document.title = t(titleKey, {}, language);
  }

  function closeLanguageSelect(root, focusTrigger = false) {
    root.classList.remove('open');
    const trigger = root.querySelector('.flow-select-trigger');
    if (trigger) {
      trigger.setAttribute('aria-expanded', 'false');
      if (focusTrigger) trigger.focus();
    }
  }

  function mountLanguageSelectors(onChange = () => window.location.reload()) {
    const current = getLanguage();
    document.querySelectorAll('[data-language-select]').forEach((root) => {
      root.classList.add('flow-select', 'language-select');
      root.innerHTML = '';

      const trigger = document.createElement('button');
      trigger.type = 'button';
      trigger.className = 'flow-select-trigger';
      trigger.setAttribute('aria-haspopup', 'listbox');
      trigger.setAttribute('aria-expanded', 'false');
      trigger.setAttribute('aria-label', t('common.language'));
      trigger.textContent = languages.find((language) => language.code === current)?.label || 'English';

      const menu = document.createElement('div');
      menu.className = 'flow-select-menu';
      menu.setAttribute('role', 'listbox');
      menu.setAttribute('aria-label', t('common.language'));

      languages.forEach((language) => {
        const option = document.createElement('button');
        const active = language.code === current;
        option.type = 'button';
        option.className = 'flow-select-option';
        option.classList.toggle('active', active);
        option.dataset.language = language.code;
        option.dataset.selectedLabel = t('common.selected');
        option.setAttribute('role', 'option');
        option.setAttribute('lang', language.code);
        option.setAttribute('aria-selected', String(active));
        option.textContent = language.label;
        option.addEventListener('click', () => {
          if (language.code === current) {
            closeLanguageSelect(root, true);
            return;
          }
          setLanguage(language.code);
          onChange(language.code);
        });
        menu.appendChild(option);
      });

      trigger.addEventListener('click', () => {
        const shouldOpen = !root.classList.contains('open');
        document.querySelectorAll('[data-language-select].open').forEach((other) => {
          if (other !== root) closeLanguageSelect(other);
        });
        root.classList.toggle('open', shouldOpen);
        trigger.setAttribute('aria-expanded', String(shouldOpen));
      });

      root.append(trigger, menu);
    });

    if (!document.documentElement.dataset.languageEventsReady) {
      document.documentElement.dataset.languageEventsReady = 'true';
      document.addEventListener('click', (event) => {
        document.querySelectorAll('[data-language-select].open').forEach((root) => {
          if (!root.contains(event.target)) closeLanguageSelect(root);
        });
      });
      document.addEventListener('keydown', (event) => {
        if (event.key !== 'Escape') return;
        document.querySelectorAll('[data-language-select].open').forEach((root) => closeLanguageSelect(root, true));
      });
    }
  }

  function searchAliases(language = getLanguage()) {
    const districts = {};
    const movements = {};
    tokenRows.slice(0, 15).forEach((row) => {
      districts[row[0]] = [lookup(tokenRows, row[0], language), row[1]];
    });
    tokenRows.slice(15).forEach((row) => {
      movements[row[0]] = [lookup(tokenRows, row[0], language), row[1]];
    });
    return { districts, movements };
  }

  window.SplitApaI18n = {
    languages,
    getLanguage,
    setLanguage,
    t,
    token,
    districtGroup,
    apply,
    mountLanguageSelectors,
    searchAliases
  };
}());
