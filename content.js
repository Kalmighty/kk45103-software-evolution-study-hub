'use strict';

const course = [
  ['Maintenance & Evolution', 'Introduction to Software Maintenance & Evolution', 'Explore why delivered software changes and what makes it easier to maintain.', 'WEEK 1 KK45103.pdf', 'layers'],
  ['Maintenance Framework', 'The Maintenance Framework', 'Follow a change from request and impact analysis to safe deployment.', 'WEEK 2 KK45103.pdf', 'grid'],
  ['Software Change', 'Fundamentals of Software Change', 'Classify changes, trace their effects, and explain why software evolves.', 'Chapter 3 - Fundamentals of Software Change.pptx', 'repeat'],
  ['Maintenance Process', 'The Maintenance Process', 'Compare process models and decide when a change is worth making.', 'Chapter 4 - The Maintenance Process.pptx', 'workflow'],
  ['Program Understanding I', 'Program Understanding — Part 1', 'Build a mental model before touching the code.', 'Chapter 5 - Program Understanding, Part 1.pptx', 'brain'],
  ['Program Understanding II', 'Program Understanding — Part 2', 'Choose tools and techniques that make programs easier to understand.', 'Chapter 6 - Program Understanding, Part 2.pptx', 'code'],
  ['Reuse & Reusability', 'Reuse and Reusability', 'Find, classify, and reuse assets across the software life cycle.', 'lecture-7-Reuse_and_Reusability.pptx', 'blocks'],
  ['Management & Organisation', 'Management and Organisational Issues', 'Organise teams, support maintainers, and transfer system knowledge.', 'lecture-8-Management_and_organisational_issues.pptx', 'users']
];

// Each note includes the lecture reference, a faithful summary, an original example,
// a memory cue and additional explanation. Questions refer to these named concepts.
const notes = [
`Software maintenance|8–15, 21–23|After delivery, teams modify software to fix faults, improve quality or adapt it to a changed environment.|A university updates its registration portal after students report duplicate enrolments.|Delivered product → controlled change.|The slides also present a wider support definition covering pre-delivery planning and post-delivery tasks such as training and help-desk support. Maintenance supports day-to-day operations, modifications and existing functionality.
Maintainability|9, 24–33|If a team can understand, test and update a system with little effort, it is easier to maintain.|A tax calculation isolated in one module is easier to update than the same rule duplicated across services.|Maintenance is the work. Maintainability is the ease.|Quality attributes discussed include correctness, reliability, completeness, efficiency, maintainability, usability, installability, documentation and availability.
Software evolution|34–38, 42–45|Software evolution broadly refers to ongoing change in a software system over time.|Over several years a library system adds digital lending and migrates its database schema.|Evolution is the history of change.|The scientific view asks what changes and why. The engineering view asks how to guide and control change. Requirements, architecture, designs and tests may all evolve, so maintain traceability across them.
Software artefacts|10–12, 44|Software includes programs, documentation and operating procedures. Artefacts are tangible work products.|A booking system includes source code, test cases, an installation guide and instructions for handling a failure.|Program + documentation + procedures.|Artefacts can describe functionality, architecture and design or support the development process, such as project plans and disaster recovery plans.
Maintenance vs new development|16–23|New development can start from a green field. Maintenance works within a delivered system and its existing products, users and constraints.|Building a first booking portal differs from changing a live portal with existing bookings and interfaces.|New build starts fresh. Maintenance inherits.|Maintainers look back at existing artefacts, work with current users and operators, and look ahead to functional changes and problems.
Architecture and quality|19–20, 24–33|Architecture captures system structures, data flow and control flow. Significant non-functional requirements influence architecture.|A new response-time target may require changing how enrolment requests flow between services.|Structure shapes the cost of change.|Identify the quality attributes that matter most. A change in one quality may require architectural decisions and trade-offs with other attributes.
Evolution process|36–41|Change requests go through impact analysis, release planning, implementation and system release.|A campus portal plans a browser compatibility update into the next release after checking affected workflows.|Request → assess → plan → implement → release.|The lecture identifies fault repair, platform adaptation and enhancement. Implementation includes requirements analysis, requirements updating and software development.`,
`Maintenance framework|3–7, 15–16, 38|Use one agreed way of working to plan and carry out maintenance throughout the life of a system.|Teams use the same documented workflow for portal fixes and major upgrades.|Consistency, quality, predictability, efficiency.|The framework relates user requirements, organisational and operational environments, maintenance process, personnel and product. It also supports coordination and risk control.
Change management|9–10, 40–45|Change requests are documented, assessed, approved or rejected, implemented, tested and deployed in a controlled way.|A payroll tax request records the business rule and deadline before technical review.|Request → assess → decide → test → deploy.|Impact analysis identifies affected components, risk and feasibility. Stakeholders weigh importance, time and resources before implementation.
Configuration management|11–12|Track and control versions of code, documentation and settings.|A team knows which version of an enrolment service was used in production and can restore it.|Track, reproduce, control.|Version control supports traceability and rollback. Reproducible configurations help prevent drift between development, test and production.
Documentation and knowledge|13–14|Documentation preserves the current system knowledge and the reasons for past changes.|A new maintainer reads a change log to learn why a validation rule exists.|Record the change and its reason.|System documentation describes architecture. Change logs record who changed what, when and why. User manuals and developer notes serve different readers.
Framework environments|17–25|Organisational changes concern policies and how work is run. Operational changes concern the platforms and dependencies on which software runs.|A new university approval policy is organisational. A replacement database version is operational.|Policy vs platform.|User requirements can involve more work than the user expects. Changes in operating systems, hardware and third-party software may also trigger maintenance.
Product, process and personnel|26–37, 52–53|Product structure, maintenance practices and the people doing the work interact.|A teammate unfamiliar with a legacy portal overlooks a dependency because the documentation is stale.|Product, practice, people.|Engineers apply changes, testers validate them, managers allocate resources and coordinate stakeholders, and users report issues. Domain expertise and consistent programming practice help contain ripple effects.
Testing and rollback|44–50|Test approved changes before deploying them and prepare a return to a stable version.|The team tests enrolment, then restores the previous stable build if the release fails in production.|Validate before release. Plan the return.|Unit tests check components, integration tests check interactions, regression tests protect existing behaviour and UAT checks user needs with realistic tasks.`,
`S-type and E-type systems|5–10|An S-type system is judged against an absolute specification. An E-type system operates in a real-world activity and is judged by users in that changing environment.|A program implementing a fixed arithmetic specification differs from an evolving campus registration service.|S = specification. E = embedded in the real world.|The slides tie change to faults, new requirements and a changing environment. Changes range from small patches to major restructuring.
Corrective change|12–14|Corrective change removes faults. The lecture distinguishes design, logic and coding errors.|Fix a registration page that charges a fee twice.|Something is broken.|A quick corrective patch can restore service under pressure. It can also bypass deeper investigation and leave structural problems behind.
Adaptive change|15–17|Adaptive change keeps software fit when outside rules, hardware or software change.|An invoicing system updates how it computes tax after a regulation changes.|The environment moved.|The lecture uses Malaysia's transition between GST and SST and a later service tax change to illustrate external triggers.
Perfective change|18–21|Perfective change improves or extends a useful system, or removes functionality that no longer fits.|Add a notification feature. Remove a clinic module after the programme it supports moves elsewhere.|Improve what users get.|An enhancement may need data from existing modules and can increase dependencies. The lecture's clinic example illustrates removal as perfective change.
Preventive change|22–23|Preventive change aims to prevent malfunctions or improve maintainability.|Split a tightly coupled payment module before future policy changes become costly.|Prepare for the next change.|Re-engineering, restructuring and improving documentation can reduce future change effort.
Ripple effects and priorities|24–35, 37–39|A local change can affect related modules, documents, tests and perceived quality.|Changing a student identifier affects enrolment, fees and reporting.|Follow dependencies beyond the first edit.|Change categories overlap, but identifying the main trigger helps allocate resources and set priorities. The lecture's payroll case shows corrective work competing with enhancement for the same budget. Slide 31 shows an illustrative distribution of maintenance effort, with perfective work the largest category in that chart.
Change control and support|40–51|Change is requested, assessed, authorised, implemented, verified and released. Ongoing support includes communication and training.|A vendor ships updates to many customers while a bespoke university system follows the institution's needs.|Control the release and support its users.|Bespoke and off-the-shelf systems differ in who controls changes. User training and help can support maintenance without a source-code change.
Lehman's laws|52–65|The laws describe observed patterns of evolution in E-type systems.|A scheduling system that keeps adding functions also budgets for refactoring to control complexity.|Change, complexity, feedback.|I Continuing change · II Increasing complexity · III Self-regulation · IV Conservation of organisational stability · V Conservation of familiarity · VI Continuing growth · VII Declining quality · VIII Feedback systems. Continuing change keeps a system satisfactory. Increasing complexity requires work to contain it. Self-regulation describes statistical regularity. Organisational stability concerns the average work rate. Familiarity limits growth per release. Continuing growth keeps functionality useful. Quality declines unless the system adapts. Feedback operates through multiple levels and loops. These are observations about E-type evolution.`,
`Process and life cycle|5–14, 25–28|A process model represents how activities are organised. A life cycle describes the system's progression over time. Maintenance starts by understanding an existing product.|A team checks existing billing interfaces and constraints before designing a change.|Understand first, then change.|A maintenance-conscious model acknowledges hidden dependencies, existing design constraints and limited tolerance for errors or downtime.
Traditional models|16–23|Code-and-fix starts with code, waterfall orders phases and spiral repeats risk-driven cycles.|A high-risk migration explores risky options in cycles before broader rollout.|Ad hoc, sequential, risk-driven.|Code-and-fix is quick to start but structure can deteriorate. Waterfall gives clear milestones but later changes are costly. Spiral adapts to risk but demands skill in assessing it.
Quick-fix model|29–32, 45|Start from code and patch an identified problem quickly.|A maintainer patches a failed report to restore a morning service.|Speed now, structural cost later.|Fast and cheap under pressure, especially for someone who knows the system. Little analysis and documentation can produce follow-up fixes.
Boehm's model|33–35, 45|Management evaluates intended changes using costs and benefits and decides which ones to fund.|A manager compares the expected operational benefit of improving an old portal with the implementation cost.|Management decides what is worth funding.|Individual change budgets make trade-offs visible. The model depends on management judgement and gives little detail about technical implementation.
Osborne's model|36–37, 45|Start from a real change request and work with the actual condition of the system and its documentation.|A team analyses an old stock system using the artefacts it actually has.|Assess the product as it is.|It builds in maintainability and recognises incomplete documentation. Multiple steps and reviews can be heavy for an urgent patch.
Iterative enhancement|39–42, 45|Start at the highest-level affected document and propagate the change down in a structured cycle.|Update an enrolment requirement, then adjust design, code and tests.|Start high, propagate down.|Each cycle analyses the existing system, characterises the proposed changes, then redesigns and implements. This supports reuse but assumes up-to-date documents and thorough product analysis. Iteration repeats activities; increment adds a portion of capability.
Reuse-oriented model|43–45|Reuse existing products or components at any life-cycle stage, including requirements, design, code and test data.|A maintainer starts with a reusable regression suite while adapting a payment module.|Build on what exists at any level.|This approach needs a useful way to find and classify components. No one maintenance model fits every situation.
Deciding when to change|46|Evaluate whether a desired change is feasible and worth its cost and schedule impact.|Plan a non-urgent report redesign for a later release while funding a production failure first.|Desirable does not guarantee feasible.|Management balances the benefits against resource, cost and schedule constraints.
Process maturity and experience bases|49–54|CMM describes how processes progress from ad hoc work towards quantitative control and continuous improvement. Experience bases capture reusable lessons.|A team records fault diagnoses and revisits trends to improve its review process.|Initial, Repeatable, Defined, Managed, Optimising.|Repeatable means basic tracking. Defined means documented standard processes. Managed uses quantitative control. Optimising uses feedback and piloted innovation. An experience base only helps if knowledge is captured and used within the organisation.`,
`Program comprehension|5–13|Understanding comes before every change. Find what the system does, where the change is needed and how the affected parts work.|Before changing an eligibility rule, trace the current decision and its callers.|WHAT, WHERE, HOW.|Scale, unfamiliar code and lost knowledge increase comprehension effort. The lecture reports that reading and understanding take a substantial share of maintenance effort.
Five kinds of knowledge|14–22, 65|A maintainer needs knowledge of the problem domain, execution effect, cause-effect relation, product-environment relation and decision-support features.|For a fee update, learn the policy, observe the result, trace the calculation, check external rules, and estimate the work.|Domain, result, cause, environment, decision.|Execution effect answers what happens when the program runs. Cause-effect explains why or through which parts. Decision-support features provide information such as size and complexity for planning.
Role-specific knowledge|24–31|Managers, analysts, designers and programmers need different levels of understanding.|A manager estimates effort, an analyst checks the workflow, a designer checks architecture, and a programmer traces statements.|Estimate, analyse, design, implement.|Managers use size and cost information. Analysts need a global and domain view. Designers need architecture and interfaces. Programmers need detailed behaviour and causal relationships. Roles may overlap.
Mental models and cognition|11, 32–37|Read documentation, read code and run the program to construct a mental model. Cognitive structures store knowledge and cognitive processes manipulate it.|Read a user guide, trace the booking function, and reproduce a failed booking.|Read about it, read it, run it.|The model is revised as evidence comes in. The vocabulary problem arises when identifiers fail to convey their intended meaning.
Top-down comprehension|39–43|Start with a hypothesis about the program and verify it using clues in the code.|A maintainer infers what calculate_fee does and checks its branches.|Hypothesise, find beacons, verify.|Names and comments can be beacons that trigger relevant knowledge. Unfamiliar domains and misleading clues make hypotheses harder to check.
Bottom-up comprehension|44–46|Group statements into meaningful chunks and combine those chunks into higher-level understanding.|A maintainer groups several SQL calls as loading an enrolment record.|Statements → chunks → purpose.|Chunking reduces the amount of detail held at once. It is useful when the overall purpose or architecture is initially unclear.
Opportunistic comprehension|47–58|Switch among cues and levels of abstraction as useful evidence becomes available.|Start from an error message, read a helper, check documentation, then return to the caller.|Choose the approach that fits the next useful clue.|The lecture discusses assimilation and switching strategies. Pennington distinguishes understanding the code's control flow from understanding the situation it represents.`,
`Expertise and programming practice|11–21|Domain and language expertise, meaningful names, useful comments and modular decomposition influence understanding.|A module name identifies fee calculations and a comment records a policy exception.|Names signal. Comments explain. Modules contain.|Experts organise knowledge in larger chunks. Good comments add intent, assumptions or rationale. Decomposing around sources of change helps localise edits.
Documentation and presentation|22–29|Current documentation, readable presentation and flexible treatment of requirements make evolving systems easier to understand.|A maintainer compares a stale guide with code, interview notes and observed behaviour.|Layout shows structure. Evidence confirms intent.|Layout supports beacons and chunking. Written requirements still evolve. When documentation is incomplete, consult other people, artefacts and execution evidence.
Book Paradigm and reading tools|30–35|The Book Paradigm presents code as a readable book. Pretty-printers improve formatting and browsers help navigate program entities.|A maintainer follows a linked cross-reference from a chapter-like code view to a definition.|Present, format, navigate.|Book-like presentation can supply a table of contents, navigation and different levels of detail. A tool supports a technique, so check the underlying technique first.
Static vs dynamic analysis|35, 39–41|Static analysis reads program text. Dynamic analysis observes execution on selected runs.|Use a static analyser to list classes and a dynamic analyser to watch one fee calculation path.|Static = structure. Dynamic = observed behaviour.|Static views include rarely executed code but cannot reveal an actual run. Dynamic traces reveal runtime behaviour but omit paths the chosen runs did not take.
Program slicing|35–38, 61|A program slicer restricts attention to code relevant to a selected variable or point. Backward asks what can affect it. Forward asks what it can affect.|Trace earlier assignments to total, or see which later outputs depend on a changed rate.|Backward = what can influence this point. Forward = what this point can influence.|A slice depends on its criterion. The topic's running total example traces the statements that can affect a value at a specific line.
Analysis and transformation tools|40–41|Data-flow analysers trace possible flows, cross-referencers index entity uses, dependency analysers expose relationships and transformation tools change representation.|Look up where a variable is declared and used, then inspect the graph of dependent modules.|Flow, references, links, representation.|Possible paths are not frequencies. A cross-reference index does not directly explain why code uses an entity. Visualisation does not supply business rationale missing from the code.
Choosing maintenance tools|43–50|Evaluate capability, features, costs and benefits, platform, language, ease of use, openness, vendor stability and organisational culture.|Before buying a slicer, try slicing one representative program by hand and check support for the legacy language.|Technique first, tool second.|Check whether the tool supports your real tasks and integrates with the team's environment. Assess usability and adoption alongside technical features.`,
`Reuse and reusability|2–3|Reuse applies existing assets. Reusability is the degree to which an asset can be used in multiple applications.|A validation package used by both admissions and enrolment illustrates reuse and has reusable interfaces.|Reuse is the act. Reusability is the potential.|Verified assets can reduce duplicated engineering, support faster changes and preserve shared knowledge. Generalisation and repository upkeep still require investment.
Compositional and generative reuse|4–5, 17|Composition assembles existing building blocks. Generation produces code from high-level domain specifications.|Wire an existing payment package through an adapter, or generate a report from a 4GL specification.|Assemble blocks or generate from rules.|Composition uses glue code, wrappers and defined interfaces. Generation embeds domain knowledge and works best in well-understood domains.
Reusable life-cycle artefacts|6–7|Requirements, designs, code, tests and knowledge can all be reused.|Reuse a specification and reference design alongside a regression suite and user guide.|Reuse more than code.|A reusable asset may be a requirement, DSSA reference structure, pattern, package, regression data set, design rationale or experience-base entry.
Domain engineering and DSSA|8–9|Domain analysis identifies commonalities and variations. Domain engineering turns this knowledge into assets, including domain-specific software architectures.|A family of university portals shares enrolment rules but varies in approval routes.|Find what varies and what stays.|Define the domain, extract knowledge, model the family, construct assets and catalogue them. A DSSA provides reusable architectural structure and extension points.
Prieto-Díaz classification|10–11|Faceted classification indexes a component on independent dimensions: Action, Object, Medium, System Type, Functional Area and Setting.|Index a component in a bank (Setting) that validates (Action) a record (Object) in a stream (Medium) for accounting (Functional Area), used in a DBMS (System Type).|Operation, entity, medium, system, function, setting.|Action is the operation, Object its subject and Medium the storage or secondary structure. System Type is the application category, Functional Area the business function and Setting the organisational context.
Reuse for and in maintenance|12, 16|Reuse-for-maintenance creates generalised assets. Reuse-in-maintenance retrieves and applies those assets to a change.|Extract a tested fee calculator into a catalogue. Later retrieve it for another course portal.|For = produce. In = consume.|Component repositories need classification, documentation and version control so maintainers can find and safely apply assets.
Barriers and lecture cases|13–15, 18|Reuse faces technical, cultural, organisational, economic and legal barriers.|Teams may overlook components due to poor indexing, reject external work, or lack permission to reuse a licensed package.|Check fit, incentives, cost and rights.|Raytheon: the lecture reports that teams analysed repeated COBOL structures, certified templates and stored them in a central library. It reports 50%+ reuse in new projects and a 40% maintenance productivity gain. NASA SEL: the lecture describes the shift from code copying to a flight dynamics DSSA and a software factory with a component repository. It reports 85%+ integration of reusable components in later builds.`,
`Maintenance management|2–5, 7, 17–18|Maintenance management directs personnel, resources and technical processes. Select maintainers for analytical, diagnostic and problem-solving skills, and provide adequate tools.|A manager budgets time for understanding legacy code and provides analysis and regression tools.|People, resources, process.|Maintenance personnel include managers, analysts, designers, programmers and test engineers. The slides connect productivity to staff capability, tools and environment, programming practices and language experience. Managers need enough maintenance knowledge to budget for code analysis and set realistic deadlines.
Motivation and communication|4, 6–7|Technical supervision, structured promotions, job rotation, career recognition and two-way communication can support maintenance personnel.|Pair a new hire with a senior maintainer and create a clear promotion route.|Guide, rotate, recognise, listen.|Pair inexperienced engineers with senior maintainers. Structured promotions and a career path comparable to development recognise maintenance expertise. Rotation between development and maintenance builds experience on both sides. Managers explain why procedures exist, and maintainers report progress and constraints.
Egoless and chief programmer teams|8|Egoless teams share ownership and peer review. Chief programmer teams centralise technical direction with specialised support.|One team reviews changes collectively. Another relies on a chief to preserve architectural standards.|Shared ownership vs central direction.|Shared review can find faults and improve support, but consensus can be slow. The chief programmer directs architecture with support such as a backup programmer and programming librarian. Clear authority helps in emergencies but creates dependence on the chief.
Temporary and permanent teams|9|Temporary teams are assembled for a short task. Permanent teams carry responsibility across a system's lifetime.|An incident group patches a failure. A standing team owns the service after the incident ends.|Firefight vs sustain.|A permanent team may have a leader and co-leader for technical direction, a user liaison, an administrator and maintenance programmers. Temporary teams can mobilise quickly for a specific task, but rotating leadership can leave gaps in continuity.
Education and training|10–11|Maintenance education raises awareness and recognition through coursework, workshops, training and real system experience.|New hires analyse and test a change in an existing system under supervision.|Explain the work and practise it.|Hands-on experience develops diagnostic skills. Education also helps managers understand maintenance constraints and set attainable deadlines.
Combined organisation|12, 16|Development and maintenance stay combined. Work can be assigned by module, change request, work type or application type.|Assign an enrolment change across modules to one maintainer, or assign billing tasks to its domain team.|Module, change, task, application.|Module ownership builds local skill but risks isolation. Change ownership protects end-to-end integrity but needs broad training. Work-type mode divides work by activity, such as analysis, design, coding or testing. Application-type mode divides it by application domain. Each creates a need for coordination across its groups.
Separate department and escort|13–16|A separate department owns maintenance. An escort temporarily joins from development at release to transfer architecture and diagnostic knowledge.|The release developer helps support staff understand why a legacy integration uses a particular retry strategy.|Build → escort → transfer → stabilise.|Separation clarifies accountability and protects development time but raises coordination and knowledge-loss risks. An escort hands over architectural assumptions and debugging knowledge before the maintenance team takes full control.
Case Study: ACME Financial Systems|15|Lecture 8 presents ACME Financial Systems as a case of staff turnover and undocumented legacy COBOL. The team used senior developers as temporary maintenance escorts.|Application exercise: outline an escort handover for a university payroll release.|Transfer the reasoning, not just the release.|The slide reports an 80% annual turnover baseline, comprehension taking over half of new recruits' time, four-month escort rotations, a 35% drop in comprehension time and a 2.5× increase in bug-fix turnaround speed. These figures describe the ACME case presented in the lecture.`
];

const questionBank = [
`0|A live portal is modified to prevent duplicate enrolment. What discipline does this illustrate?
1|What term means the ease with which maintenance can be carried out?
2|A system gradually changes its requirements, design and architecture over several years. What is this broader phenomenon?
3|Which concept includes installation guides and test cases as well as source code?
4|Which comparison explains why a maintainer must preserve live bookings and existing interfaces?
5|Which concept links significant non-functional requirements to structures and data flows?
6|After impact analysis, what comes next in the system evolution process?|Release planning|System release|Request submission|Retirement
0|Software maintenance, in its narrower definition, involves modifying a product after delivery.|True|False
3|Which trio matches the lecture's description of software?|Programs, documentation and operating procedures|Code, hardware and users|Programs, budgets and contracts|Hardware, diagrams and licences
1|Which quality is directly improved by making rules easier to change?|Maintainability|Correctness|Availability|Installability
6|Which of these is a type of change shown in the system evolution process?|Platform adaptation|Vendor selection|End-user recruitment|Project closure
2|Which view studies the driving factors and laws of software evolution?|Scientific view|Engineering view|Help-desk view|Release scheduling view
5|Which quality attribute concerns whether software is fast and small enough?|Efficiency|Completeness|Installability|Documentation
0|Which activity belongs to the lecture's broader view of maintenance support?|Planning for post-delivery operations|Buying new office space|Changing the university calendar independently of the system|Selecting a project logo
2|Updating tests after requirements change helps maintain consistency between software artefacts.|True|False`,
`0|Which concept provides a structured approach to control maintenance throughout the life cycle?
1|A team logs, assesses and approves proposed changes. What discipline is at work?
2|Which practice controls versions of code, documents and settings across environments?
3|Which area helps preserve why a validation rule was introduced?
4|Which comparison helps classify a policy change and a hardware replacement?
5|Which framework elements explain why stale documents and unfamiliar staff amplify ripple effects?
6|What testing checks whether a new change broke existing behaviour?|Regression testing|Unit testing in isolation|Acceptance sign-off only|Deployment rehearsal
1|Which stage identifies affected components and possible risks?|Impact analysis|Deployment|Request submission|Rollback
2|Reproducing environment settings helps avoid configuration drift.|True|False
3|Which record typically captures who made a change, when and why?|Change log|User manual|Installation binary|Regression test fixture
4|A new operating system changes the constraints on a payroll product. What changed?|Operational environment|Organisational policy|User acceptance criteria only|Release approval authority
5|Who coordinates maintenance resources and stakeholder communication?|Project manager|End user|Tester|System operator only
6|What lets a team return to a stable version after a faulty release?|Rollback plan|Change intake form|User manual|New feature proposal
6|Which test asks end users to validate real-world tasks against business needs?|User acceptance testing|Static analysis|Unit testing|Configuration audit
0|Standardised procedures support consistency and predictability.|True|False`,
`0|What comparison distinguishes a system judged by a fixed specification from one judged in the world where it operates?
1|A bug causes duplicate charges. Which change type removes the fault?|Corrective|Adaptive|Perfective|Preventive
2|An invoicing system changes to comply with a new tax rule. What is the primary change type?|Adaptive|Corrective|Perfective|Preventive
3|A clinic removes a no-longer-needed module. Which category does the lecture use?|Perfective|Corrective|Adaptive|Preventive
4|A team restructures a module solely to make future changes easier. Which category applies?|Preventive|Perfective|Adaptive|Corrective
5|Editing student IDs affects previously untouched reports. What concept explains that effect?
6|Which area covers training and communication even without changing code?
7|Which law says complexity increases unless work is done to reduce it?|Increasing complexity|Conservation of familiarity|Self-regulation|Continuing growth
0|An E-type system is judged only against an absolute specification.|False|True
1|What is a risk of a quick patch made during a failure?|It restores service but leaves deeper structural problems.|It guarantees fault prevention.|It always includes complete analysis.|It automatically improves documentation.
2|A required third-party API is withdrawn. Which type of maintenance moves the system to its replacement?|Adaptive|Corrective|Preventive|Perfective
5|Why distinguish change categories when real changes can overlap?|To clarify the main trigger and prioritise work|To guarantee equal effort in each category|To eliminate impact analysis|To avoid documenting releases
6|Who normally controls changes to a generic off-the-shelf package?|The package supplier|Each customer independently|An unrelated regulator|The application's end users by direct source edits
7|Which law describes evolution as a multi-level, multi-loop system?|Feedback systems|Continuing change|Self-regulation|Declining quality
7|Which law relates per-release growth to the team's ability to stay familiar with the system?|Conservation of familiarity|Continuing growth|Increasing complexity|Declining quality`,
`0|Why does a maintenance-conscious process start by understanding the product?|Existing structures and dependencies constrain feasible changes.|A delivered system has no existing design.|Users never request new requirements.|It allows teams to skip testing.
1|Which traditional model is risk-driven?|Spiral|Waterfall|Code-and-fix|Reuse-oriented maintenance
1|Which traditional model arranges work into ordered phases with clear milestones?|Waterfall|Spiral|Quick-fix|Osborne's model
2|A team goes straight to the code to restore a failing service. What model fits?
3|Which model uses management cost-benefit decisions and individual change budgets?
4|Which model treats incomplete documentation as a practical reality and builds in maintainability?
5|Which model starts at the highest-level affected document and propagates the change down?
6|Which model starts from existing artefacts at any life-cycle stage?
7|A useful report improvement is deferred because it is unaffordable this release. What decision is at issue?
8|At which CMM level are approved, standardised processes documented and tailored?|Defined|Initial|Repeatable|Optimising
8|Which CMM level uses quantitative control of process and product?|Managed|Defined|Initial|Repeatable
8|Which CMM level uses quantitative feedback and piloted innovations for continuous improvement?|Optimising|Defined|Repeatable|Initial
5|Iterative enhancement assumes that affected documentation is up to date.|True|False
6|What does a reuse-oriented process need to find existing assets reliably?|A classification framework|A permanent ban on reuse of test data|Only an incident hotline|A green-field codebase
8|What is the role of a software experience base?|Capture and apply previous maintenance knowledge|Replace all product requirements|Measure the schedule only|Move every change into production automatically`,
`0|Which three questions frame the first stage of a maintenance change?|What, where and how|When, who and how much|Why, when and who|Where, who and how long
1|Which kind of knowledge describes what happens when a program runs on a given input?|Execution effect|Problem domain|Decision-support features|Product-environment relation
1|Which kind of knowledge explains which components bring about an observed result?|Cause-effect relation|Execution effect|Problem domain|Decision-support features
1|Which kind of knowledge concerns external regulations or platforms acting on the product?|Product-environment relation|Execution effect|Cause-effect relation|Decision-support features
1|Which kind of knowledge includes size and complexity information for planning?|Decision-support features|Execution effect|Problem domain|Cause-effect relation
1|Understanding how registration works in the university concerns which kind of knowledge?|Problem domain|Execution effect|Cause-effect relation|Decision-support features
2|Who primarily needs size data to estimate cost and duration?|Manager|Programmer|End user|Designer
2|Who mainly needs architecture and interfaces to fit a change into the existing structure?|Designer|Manager|End user|Support liaison
3|Which activity provides direct evidence of behaviour on a chosen input?|Running the program|Reading only the change history|Estimating effort|Reading only the requirements
3|How does the chapter distinguish cognitive structures from cognitive processes?|Structures store knowledge; processes manipulate it.|Structures run code; processes store files.|Structures are team roles; processes are plans.|Both refer only to data structures.
4|A reader uses a function name to guess its purpose, then checks the implementation. Which strategy fits?
5|A reader groups statements into meaningful blocks before inferring the overall purpose. Which strategy fits?
6|A reader moves between an error message, the guide and a caller as clues become available. Which strategy fits?
5|What technique reduces detailed statements into meaningful units?|Chunking|Release planning|Version control|Configuration drift
4|A beacon supports a hypothesis that still needs verification.|True|False`,
`0|Which area includes meaningful naming, useful comments and decomposition?
0|What makes a comment especially useful?|It records assumptions or design rationale.|It repeats the obvious syntax.|It remains untouched when wrong.|It replaces every meaningful name.
1|Recorded requirements cannot change after they are documented.|False|True
1|What can indentation help readers identify?|Statements that belong together|The cost of a release|Which users requested a change|Every runtime value
2|Which presentation approach gives code book-like navigation and levels of detail?|Book Paradigm|Pretty-printing alone|Dynamic analysis|Program slicing
2|Which tool improves code formatting for reading?|Pretty-printer|Dynamic analyser|Dependency analyser|Program slicer
3|Which tool records the path actually taken on a chosen run?|Dynamic analyser|Static analyser|Pretty-printer|Cross-referencer
3|Which tool can inspect code that never runs in the chosen test?|Static analyser|Dynamic analyser|User interview|Execution trace
4|What slice answers which earlier code might affect a selected value?|Backward slice|Forward slice|Runtime trace|Formatted source listing
4|What slice shows which outputs may be affected by a changed rate?|Forward slice|Backward slice|Static class hierarchy|Change log
5|Which tool indexes where an entity is declared, set and used?|Cross-referencer|Pretty-printer|Dynamic analyser|Transformation tool
5|Which tool exposes relationships as a graph of nodes and arcs?|Dependency analyser|Pretty-printer|Cross-referencer|Regression runner
5|Which tool tracks possible paths through which a variable gets its value?|Data-flow analyser|Pretty-printer|User guide|Change control board
5|Which tool can present the same program as text or graphics?|Transformation tool|Dynamic analyser|Cross-referencer|Regression suite
6|What should the team do before buying a slicer?|Try the slicing technique by hand.|Choose solely by vendor name.|Ignore platform and language support.|Assume the tool will fix the underlying technique.`,
`0|What does reusability describe?|The degree to which an asset can be used in multiple applications|The number of defects in production|The schedule for a single change|The length of a release note
1|A developer connects existing modules with an adapter. Which approach is this?|Compositional|Generative|Preventive|Dynamic
1|A tool generates source code from high-level domain rules. Which approach is this?|Generative|Compositional|Corrective|Manual adaptation
2|Which artefact is reusable alongside code and requirements?|A regression suite|A unique user password|A production outage|A one-time approval deadline
3|What does a DSSA provide?|A reusable reference architecture for a system family|A single customer's live data|A version control password|A one-off support schedule
3|Which activity identifies shared and variable features across a system family?|Domain analysis|Regression testing|Deployment rollback|Quick fixing
4|In “Validate a record”, which facet is Validate?|Action|Object|Medium|Setting
4|In “Validate a record”, which facet is Record?|Object|Action|Medium|Functional Area
4|In a component catalogue, which facet captures a storage medium such as Stream?|Medium|Action|Setting|System Type
4|Which facet captures the difference between a DBMS and a compiler?|System Type|Setting|Object|Functional Area
4|Which facet identifies a business function such as Payroll?|Functional Area|Setting|Medium|Action
4|Which facet represents an organisational context such as a hospital?|Setting|System Type|Object|Action
5|Generalising and cataloguing a repaired module is which activity?|Reuse-for-maintenance|Reuse-in-maintenance|Runtime analysis|Rollback
5|Retrieving and applying a catalogued module for a change is which activity?|Reuse-in-maintenance|Reuse-for-maintenance|Change rejection|System retirement
6|A team rejects sound assets because they were made elsewhere. What kind of barrier is that?|Cultural|Runtime|Platform|Dependency-only`,
`0|Which abilities are particularly important when selecting maintainers?|Analytical and diagnostic ability|Coding speed alone|Sales experience alone|A preference for green-field work
1|Which practice helps engineers avoid feeling stuck and promotes maintainable design?|Job rotation|Eliminating technical supervision|Removing career paths|Centralising all documentation
1|Who should be able to communicate information about procedures and progress?|Management and maintainers in both directions|Management only|Maintainers only|End users only
2|Which team shares code ownership and emphasises peer review?|Egoless team|Chief programmer team|Maintenance escort|Work-type group
2|What is a key risk when one chief controls architectural decisions?|Dependence on one person|No shared ownership of incidents ever|Automatic team rotation|Too much domain specialisation across applications
3|Which team is formed ad hoc for an urgent patch?|Temporary team|Permanent team|Application-type department|Training group
3|Which permanent team role is the primary link to end users?|User liaison|Maintenance administrator|Chief architect|Programming librarian
4|Which delivery strategy directly builds diagnostic skill on large systems?|Hands-on experience|Cash bonuses only|One-way status reporting|Isolated green-field coding only
5|Which combined mode assigns a maintainer specific modules?|Module ownership|Change ownership|Work-type mode|Application-type mode
5|Which combined mode assigns one maintainer a request across all affected modules?|Change ownership|Module ownership|Work-type mode|Application-type mode
5|Which mode divides tasks into analysis, design, coding and testing?|Work-type mode|Application-type mode|Change ownership|Module ownership
5|Which mode divides work by business application domain?|Application-type mode|Work-type mode|Module ownership|Change ownership
6|Which is a benefit of a separate maintenance department?|Clear accountability for the operational system|Guaranteed preservation of developer knowledge|No coordination cost|No risk of perceived status differences
6|Which arrangement temporarily assigns developers to maintenance after release?|Maintenance escort|Permanent firefighting team|Module ownership|Change rejection
7|Which intervention does Lecture 8 describe for the ACME case?|Senior developers served temporary escort rotations.|The team abandoned all legacy systems.|The university rewrote its enrolment portal.|The plant changed its machine servicing schedule.`
];

const processes = {
  1: ['System evolution', 'Change requests', 'Impact analysis', 'Release planning', 'Implementation', 'System release'],
  2: ['Maintenance workflow', 'Change request', 'Impact analysis', 'Approval or rejection', 'If approved: implementation and testing', 'Deployment'],
  5: ['Build a mental model', 'Read documentation', 'Read source code', 'Run the program', 'Refine the mental model'],
  7: ['Domain engineering', 'Domain definition', 'Knowledge extraction', 'Domain modelling', 'Asset construction', 'Repository cataloguing'],
  8: ['Maintenance escort', 'Build', 'Escort', 'Transfer knowledge', 'Stabilise']
};

const comparisons = [
  [[['Concept','Role','Key distinction'],['Maintenance','Modify a delivered product','The work'],['Maintainability','Ease of carrying out maintenance','An attribute'],['Evolution','Ongoing system change','The broader trajectory']], [['Aspect','New development','Maintenance'],['Starting point','Can start with a green field','Existing product and artefacts'],['Constraints','Stated needs and design decisions','Existing users, interfaces and data'],['Focus','Produce a solution','Change it while retaining integrity']]],
  [[['Environment','Trigger','Example'],['Organisational','Policy or work changes','New approval policy'],['Operational','Platform or dependency changes','New operating system']]],
  [[['Change','Trigger','Purpose','Example'],['Corrective','Fault','Restore correct operation','Fix duplicate charge'],['Adaptive','External change','Keep system usable','Match revised tax law'],['Perfective','Improvement opportunity','Add, improve or remove features','Add notifications'],['Preventive','Future maintenance risk','Prevent malfunctions or improve maintainability','Restructure coupled modules']], [['System','Judged against','Evolution driver'],['S-type','Absolute specification','Correctness relative to specification'],['E-type','Users and real-world activity','A changing operating context']]],
  [[['Model','Starting point','Strength','Weakness','When useful'],['Quick-fix','Code','Fast','Little analysis; structural decay','Urgent, well-understood fix'],["Boehm’s",'Management decisions','Explicit cost-benefit choices','Relies on manager judgement','Budget trade-offs'],["Osborne’s",'Real change request','Allows incomplete documents','Many steps and reviews','Legacy work needing maintainability'],['Iterative enhancement','Highest affected document','Structured; supports reuse','Expects current documents','Well-documented product'],['Reuse-oriented','Any life-cycle phase','Uses existing assets','Needs classification','Searchable assets exist']]],
  [[['Strategy','Starts from','Key action'],['Top-down','Hypothesis','Verify via beacons and code'],['Bottom-up','Statements','Group into chunks'],['Opportunistic','Available evidence','Switch as useful cues emerge']]],
  [[['Analysis','Evidence','Limit'],['Static','Program text','Does not observe a real run'],['Dynamic','Chosen executions','Misses unexecuted paths']], [['Slice','Question','Example'],['Backward','What can affect this point?','Earlier assignments to total'],['Forward','What can this point affect?','Later statements using rate']]],
  [[['Type','Mechanism','Constraint'],['Compositional','Assemble existing components','Interfaces and adapters'],['Generative','Generate from specifications','Requires mature domain knowledge']]],
  [[['Team','Ownership','Trade-off'],['Egoless','Shared','Peer review; slower consensus'],['Chief programmer','Central','Clear direction; reliance on one person']], [['Team','Horizon','Trade-off'],['Temporary','Specific urgent task','Quick response; limited continuity'],['Permanent','System lifetime','Continuity; dedicated staffing']], [['Organisation','Structure','Trade-off'],['Combined','Development and maintenance together','Retains development context; coordination depends on mode'],['Separate','Dedicated maintenance department','Accountability; handover and coordination costs']]]
];

const topics = course.map(([short, title, description, source, icon], index) => {
  const id = index + 1;
  const sections = notes[index].split('\n').map((line, n) => {
    const [title, reference, meaning, example, remember, detail] = line.split('|');
    return {id: n + 1, title, reference, meaning, example, remember, detail};
  });
  const quizQuestions = questionBank[index].split('\n').map((line, n) => {
    const [section, prompt, ...choices] = line.split('|');
    const concept = sections[Number(section)];
    return {
      id: id + '-' + (n + 1),
      topic: id, section: concept.id, prompt,
      correct: choices[0] || concept.title,
      choices: choices.length ? choices : [concept.title, ...sections.filter(s => s !== concept).slice(n % (sections.length - 3), n % (sections.length - 3) + 3).map(s => s.title)],
      explanation: concept.meaning + (choices.length ? ' ' + concept.detail : '')
    };
  });
  return {id, short, title, description, source, icon, sections, quizQuestions, compare: comparisons[index], process: processes[id]};
});

const examTerms = [
  ['post-delivery modification, quality attributes, adaptation','ease of maintenance, quality attributes','continuous change, engineering perspective, scientific perspective','program, documentation, operating procedures','green field, existing product, integrity','non-functional requirements, structure, data flow','impact analysis, release planning, system release'],
  ['consistency, quality, predictability, efficiency','change request, impact analysis, approval or rejection','version control, reproducibility, configuration drift','change log, system documentation, developer notes','organisational environment, operational environment','domain expertise, maintainer, ripple effect','regression testing, UAT, rollback'],
  ['absolute specification, E-type system','fault repair, quick patch','external environment, platform adaptation','functional enhancement, removal','structural decay, restructuring','ripple effect, impact, prioritisation','release, bespoke, off-the-shelf, ongoing support','continuing change, increasing complexity, feedback systems'],
  ['life cycle, process model, maintenance-conscious life cycle','code-and-fix, waterfall, spiral','quick-fix, structural decay','cost-benefit analysis, management decision','change request, maintainability, incomplete documentation','highest-level affected document, propagation','requirements, design, test data, classification','cost, feasibility, benefits','CMM, repeatable, defined, managed, optimising, experience base'],
  ['WHAT / WHERE / HOW, program comprehension','problem domain, execution effect, cause-effect relation, product-environment relation, decision-support features','manager, analyst, designer, programmer','mental model, cognitive structures, cognitive processes','hypothesis, beacons','chunking, abstraction','assimilation, program model, situation model'],
  ['expertise, beacons, decomposition','program presentation, documentation, evolving requirements','Book Paradigm, pretty-printer, program browser','static analyser, dynamic analyser, execution path','backward slice, forward slice, slicing criterion','data-flow analyser, cross-referencer, dependency analyser, transformation tool','capability, openness, organisational culture'],
  ['software reuse, software reusability, verified assets','compositional, generative, glue code, 4GL','requirements, architecture, source code, test artefacts','domain analysis, domain engineering, DSSA','Action, Object, Medium, System Type, Functional Area, Setting','reuse-for-maintenance, reuse-in-maintenance, component repository','not-invented-here, interface mismatch, licensing'],
  ['maintenance personnel, analytical skills, diagnostic skills, managerial domain knowledge','technical supervision, structured promotions, job rotation, career recognition, two-way communication','shared ownership, centralised authority','firefighting, maintenance leader, user liaison','awareness, recognition, hands-on experience','module ownership, change ownership, work-type mode, application-type mode','separate department, maintenance escort, knowledge handover','staff turnover, legacy comprehension, knowledge transfer']
];

const definitions = {
  '1:1':'Modification of a software product after delivery to correct faults, improve performance or other quality attributes, or adapt it to a new environment.',
  '1:2':'The ease with which maintenance can be carried out.',
  '2:1':'A structured approach to managing and controlling maintenance activities throughout the lifecycle of a software system.',
  '2:2':'A systematic approach to dealing with change requests that ensures they are reviewed, approved, and applied in a controlled manner.',
  '7:1':'Software reusability is the degree to which a module or artefact possesses attributes that enable it to be used in multiple applications.',
  '7:4':'Domain analysis is the systematic process of identifying, capturing and organising commonalities and variations across a family of systems.',
  '8:7':'Development team members temporarily assigned to the maintenance department upon system release to transfer vital architectural knowledge.'
};

const automotiveCase = {
  title: 'Case Study: Automotive Plant Maintenance Turnaround',
  source: 'TBM Consulting Group, Preventative Maintenance Program Cuts Downtime (maintenance-intervention-cuts-downtime.pdf), pp. 1–3',
  situation: 'A U.S. manufacturer of OEM and aftermarket automotive parts operated this factory around the clock with more than 400 employees. The case summary records two years without a full-time maintenance manager. TBM supplied interim leadership and supported the search for a permanent manager.',
  problems: 'Maintenance had become mostly reactive. Equipment broke down daily, and a machine failure could stop the whole line. Part misalignments, repeated machine adjustments and electrical problems added to the workload. Overtime and the risk of financial penalties put pressure on the factory to ship OEM orders on time.',
  interventions: [
    'TBM assessed maintenance practices and proposed a skills assessment and development plan for all maintenance personnel. Plant leaders reassigned workers across shifts and hired contractors to fill remaining gaps.',
    'The plant began tracking planned and unplanned work and scheduling maintenance and tooling work orders. Managers reviewed the status boards every morning. Safety and quality issues and failures that stopped production came first, followed by preventive maintenance and routine work.',
    'Downtime data identified conveyors as the largest single contributor. A local service provider assessed all 120 conveyor systems and created a repair and maintenance plan. The contractor tackled the most critical issues, and in-house mechanics scheduled the less critical work. The intervention plan also called for outsourcing non-core tooling manufacture and repair.',
    'The plant scheduled weekend work to catch up on overdue preventive maintenance across equipment types. It began oil sampling on press and conveyor gearboxes, finding high levels of iron and other contaminants in several units.',
    'The Total Productive Maintenance (TPM) programme shifted the focus towards proactive work. An accountability chart tracked tradespeople’s hours by task, and the company hired a permanent, full-time maintenance manager.'
  ],
  results: [
    ['Downtime frequency (incidents/month)', '18', '9.4', '−48%'],
    ['Average downtime (minutes/month)', '783', '594', '−24%']
  ],
  outcome: 'TBM also reports that the plant closed over 400 overdue work orders and started the oil sampling programme.',
  connections: [
    'Reactive firefighting resembles Topic 4’s Quick-Fix model when software maintainers patch code directly under pressure with little documentation or ripple-effect analysis. Repairing a fault that has already interrupted service is corrective maintenance (Topic 3).',
    'Scheduled upkeep resembles preventive software maintenance when teams act to prevent faults or improve maintainability. For example, a team might restructure a fragile module before the next feature change.',
    'The skills assessment and development plan parallel matching maintenance personnel to the work and giving inexperienced engineers technical supervision (Topic 8). A temporary team can tackle an urgent incident. A permanent maintenance team provides continuity and technical direction as the system evolves.',
    'Work-order tracking and shared priorities resemble the structured maintenance management in Topics 2 and 8. Log requests, assess impact and urgency, assign responsibility, and reserve time for preventive work.'
  ],
  practice: [
    {
      prompt: 'The plant operated for two years without a full-time maintenance manager and fell into reactive firefighting. Name the classic software maintenance process model in which ad hoc fixes are applied directly to the code with little documentation or ripple-effect analysis.',
      answer: 'The Quick-Fix model.',
      explanation: 'The team patches the code to restore service quickly. Skipping documentation or impact analysis can leave future maintainers unaware of dependencies or side effects.',
      topic: 4, note: 3, label: 'Quick-fix model'
    },
    {
      prompt: 'The intervention plan included a comprehensive skills assessment. State one operational risk of assigning complex legacy maintenance to inexperienced or unmentored engineers.',
      answer: 'An engineer may introduce a regression in a dependent component.',
      explanation: 'A maintainer unfamiliar with the system can miss a hidden dependency. Technical supervision helps a junior engineer trace the impact and choose tests for affected behaviour.',
      topic: 8, note: 2, label: 'Motivation and communication'
    },
    {
      prompt: 'A local contractor assessed all 120 conveyor systems and addressed the most critical issues. State one strategic risk of relying heavily on third-party contractors for core software maintenance.',
      answer: 'Loss of in-house system knowledge.',
      explanation: 'If key diagnostic knowledge stays with a contractor, the organisation can struggle to maintain the system when the relationship ends. The lecture’s handover risks apply here by analogy.',
      topic: 8, note: 7, label: 'Separate department and escort'
    },
    {
      prompt: 'The plant placed failures that stopped production among its highest-priority work. Which software maintenance category matches an immediate repair of a fault that has stopped a service: Corrective, Adaptive, Perfective or Preventive?',
      answer: 'Corrective maintenance.',
      explanation: 'The repair removes a fault that already exists and restores service. The urgency sets its priority, while the reason for the repair determines the category.',
      topic: 3, note: 2, label: 'Corrective change'
    },
    {
      prompt: 'The company hired a permanent maintenance manager to sustain the new maintenance practices. What is the primary objective of a permanent maintenance team in software evolution?',
      answer: 'To oversee the system’s evolution throughout its lifetime.',
      explanation: 'A standing team keeps responsibility and technical direction in place between incidents, supporting planned work as well as urgent fixes.',
      topic: 8, note: 4, label: 'Temporary and permanent teams'
    }
  ]
};
