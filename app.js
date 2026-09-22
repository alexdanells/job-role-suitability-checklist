// ── Navigation ────────────────────────────────────────────

const STANDARDS = {
  'AI & Automation': [
    { id: 'l4-applied-ai',            label: 'Level 4 AI & Automation Practitioner' },
  ],
  'Data': [
    { id: 'l4-data-analyst',          label: 'Level 4 Data Analyst' },
    { id: 'l3-data-technician',       label: 'Level 3 Data Technician' },
  ],
  'Digital Marketing': [
    { id: 'l3-multichannel-marketer', label: 'Level 3 Multi-channel Marketer' },
  ],
  'Cyber Security': [
    { id: 'l3-cyber-security',        label: 'Level 3 Cyber Security Technician' },
  ],
  'Accountancy': [
    { id: 'l3-asst-accountant',       label: 'Level 3 Assistant Accountant' },
    { id: 'l4-prof-accounting',       label: 'Level 4 Professional Accounting Technician' },
  ],
};

// Categories kept in the data above (so their checklists still resolve
// via findStandard/CHECKLISTS) but hidden from the nav for now.
const HIDDEN_CATEGORIES = ['Digital Marketing', 'Cyber Security', 'Accountancy'];
const NAV_CATEGORIES = Object.keys(STANDARDS).filter(c => !HIDDEN_CATEGORIES.includes(c));

const STANDARD_META = {
  'l4-data-analyst':          { version: 'v1.1', code: 'ST0118', url: 'https://skillsengland.education.gov.uk/apprenticeship-standards/st0118-v1-1' },
  'l3-data-technician':       { version: 'v1.2', code: 'ST0795', url: 'https://skillsengland.education.gov.uk/apprenticeships/st0795-v1-2' },
  'l3-multichannel-marketer': { version: 'v1.1', code: 'ST1031', url: 'https://skillsengland.education.gov.uk/apprenticeships/st1031-v1-1' },
  'l3-cyber-security':        { version: 'v1.1', code: 'ST0865', url: 'https://skillsengland.education.gov.uk/apprenticeships/st0865-v1-1' },
  'l3-asst-accountant':       { version: 'v1.2', code: 'ST0002', url: 'https://skillsengland.education.gov.uk/apprenticeships/st0002-v1-2' },
  'l4-prof-accounting':       { version: 'v1.2', code: 'ST0003', url: 'https://skillsengland.education.gov.uk/apprenticeships/st0003-v1-2' },
  'l4-applied-ai':            { version: 'v2.1', code: 'ST1512', url: 'https://skillsengland.education.gov.uk/apprenticeships/st1512-v2-1' },
};

// ── Level 4 Data Analyst ──────────────────────────────────

const DA_SKILL_GROUPS = [
  { id: 'security-compliance',   short: 'Data Security',      title: 'Data Security & Compliance',              skills: ['S1','S3'],        description: 'The apprentice will need to handle data securely and responsibly, following your organisation\'s policies and legal requirements such as GDPR. This includes using data systems with appropriate access controls, understanding which data can and cannot be shared, and correctly classifying different types of data.', example: 'e.g. logging into a database or CRM with role-based access, handling customer records in line with your data protection policy, labelling files as confidential or restricted.' },
  { id: 'data-collection',       short: 'Data Collection',    title: 'Data Collection & Sourcing',               skills: ['S2','S8'],        description: 'The apprentice will need to gather data from multiple sources — such as internal databases, spreadsheets, or external platforms — and understand how to combine these datasets safely. This covers the full journey from identifying where data lives to preparing it for analysis.', example: 'e.g. pulling monthly sales data from a database, combining CRM exports with finance reports, downloading datasets from a third-party portal.' },
  { id: 'data-quality',          short: 'Data Quality',       title: 'Data Cleaning & Quality',                  skills: ['S4','S6'],        description: 'The apprentice will need to work with real-world data that may contain errors, gaps, or inconsistencies — and know how to identify, fix, or escalate these issues. They\'ll also work across different data formats such as structured tables, spreadsheets, and unstructured text.', example: 'e.g. removing duplicate customer records, identifying a report with missing values and flagging it to a manager, working with both a database and a CSV export.' },
  { id: 'analysis-statistics',   short: 'Analysis & Stats',   title: 'Analysis & Statistical Methods',           skills: ['S10','S13'],      description: 'The apprentice will need to apply analytical techniques to real data — from calculating trends and averages through to more advanced methods such as forecasting, pattern recognition, or time series analysis. Complexity can grow as the apprenticeship progresses.', example: 'e.g. producing a monthly performance trend report, identifying a seasonal pattern in sales data, running a basic regression, forecasting next quarter\'s demand.' },
  { id: 'predictive-analytics',  short: 'Predictive Analysis',title: 'Predictive & Forward-Looking Analysis',    skills: ['S11'],            description: 'The apprentice will need some exposure to using data to make predictions or support future planning. This doesn\'t require complex machine learning — it could be forecasting models in Excel, trend lines in a BI tool, or scenario planning with data.', example: 'e.g. building a revenue forecast, modelling the impact of a pricing change, predicting stock levels based on historical demand.' },
  { id: 'data-governance',       short: 'Data Governance',    title: 'Data Architecture & Governance',           skills: ['S9'],             description: 'The apprentice will need to understand how your organisation structures and governs its data — including where data is stored, who is responsible for it, and how it moves across systems. They don\'t need to design the architecture, but should work within it day-to-day.', example: 'e.g. knowing which system is the source of truth for customer data, understanding the difference between a data warehouse and operational databases, following a data governance or retention policy.' },
  { id: 'reporting-visualisation',short: 'Reporting & Viz',   title: 'Reporting & Data Visualisation',           skills: ['S14'],            description: 'The apprentice will need to regularly turn data into visual outputs that communicate findings clearly to others — such as dashboards, charts, graphs, or written reports. This is a core part of the role and a significant element of the End Point Assessment.', example: 'e.g. building and maintaining a Power BI or Tableau dashboard, producing a weekly performance report in Excel, creating charts for a management presentation.' },
  { id: 'stakeholder-comms',     short: 'Stakeholder Comms',  title: 'Stakeholder Engagement & Communication',   skills: ['S5','S7','S12'],  description: 'The apprentice will need to work with colleagues or clients to understand what they need from data, and present findings back in a clear and appropriate way — adapting their communication style for both technical and non-technical audiences.', example: 'e.g. meeting with a department head to agree what metrics to track, presenting a data summary to a senior leadership team, writing a plain-English summary of analysis findings.' },
];

const DA_SKILL_SHORT = { S1:'Secure data use & GDPR', S2:'Data analysis lifecycle', S3:'Data classification', S4:'Dataset analysis', S5:'UX & domain context', S6:'Quality risk management', S7:'Customer requirements analysis', S8:'Data sourcing & combination', S9:'Organisational data architecture', S10:'Statistical methods', S11:'Predictive analytics', S12:'Stakeholder communication', S13:'Analytical techniques (mining, forecasting)', S14:'Data visualisation & reporting', S15:'Tool selection & application' };
const DA_SKILL_FULL  = { S1:'Use data systems securely to meet requirements and in line with organisational procedures and legislation including principles of Privacy by Design', S2:'Implement the stages of the data analysis lifecycle', S3:'Apply principles of data classification within data analysis activity', S4:'Analyse data sets taking account of different data structures and database designs', S5:'Assess the impact on user experience and domain context on data analysis activity', S6:'Identify and escalate quality risks in data analysis with suggested mitigation or resolutions as appropriate', S7:'Undertake customer requirements analysis and implement findings in data analytics planning and outputs', S8:'Identify data sources and the risks and challenges to combination within data analysis activity', S9:'Apply organisational architecture requirements to data analysis activities', S10:'Apply statistical methodologies to data analysis tasks', S11:'Apply predictive analytics in the collation and use of data', S12:'Collaborate and communicate with a range of internal and external stakeholders using appropriate styles and behaviours to suit the audience', S13:'Use a range of analytical techniques such as data mining, time series forecasting and modelling techniques to identify and predict trends and patterns in data', S14:'Collate and interpret qualitative and quantitative data and convert into infographics, reports, tables, dashboards and graphs', S15:'Select and apply the most appropriate data tools to achieve the optimum outcome' };

const DA_TOOLS = [
  { id: 'excel',       label: 'Microsoft Excel' },   { id: 'gsheets',    label: 'Google Sheets' },
  { id: 'powerbi',    label: 'Power BI' },            { id: 'tableau',    label: 'Tableau' },
  { id: 'looker',     label: 'Looker / Looker Studio' },{ id: 'sql',      label: 'SQL' },
  { id: 'python',     label: 'Python' },              { id: 'r-lang',     label: 'R' },
  { id: 'azure',      label: 'Microsoft Azure' },     { id: 'aws',        label: 'AWS' },
  { id: 'gcp',        label: 'Google Cloud (GCP)' },  { id: 'databricks', label: 'Databricks' },
  { id: 'snowflake',  label: 'Snowflake' },           { id: 'salesforce', label: 'Salesforce / CRM' },
  { id: 'sap',        label: 'SAP' },
];

const DA_DEMO_STATE = {
  meta: { employer: 'Meridian Analytics Ltd', apprentice: 'Jamie Williams', completer: 'Sarah Ahmed', job_title: 'Head of Analytics', date: '2026-05-29' },
  sections: {
    'security-compliance':    { exposure: 'significant', frequency: 'daily',     comment: '' },
    'data-collection':        { exposure: 'significant', frequency: 'often',     comment: '' },
    'data-quality':           { exposure: 'moderate',    frequency: 'often',     comment: 'The team works primarily with clean, pre-processed data from our data warehouse. Jamie will have regular exposure to data quality issues through ad hoc analysis and reporting tasks, and will be involved in our quarterly data audit process.' },
    'analysis-statistics':    { exposure: 'moderate',    frequency: 'sometimes', comment: 'Statistical methods are applied on a project basis rather than daily. Jamie will support the senior analyst on monthly trend analysis and will lead a customer segmentation project in their second quarter.' },
    'predictive-analytics':   { exposure: 'limited',     frequency: 'rarely',    comment: 'The team does not currently use predictive modelling as standard. Jamie will work with our external data science partners on a demand forecasting project planned for Q4, providing structured exposure.' },
    'data-governance':        { exposure: 'moderate',    frequency: 'sometimes', comment: 'Data governance is managed centrally. Jamie will work within the established framework and attend the quarterly data governance review meetings.' },
    'reporting-visualisation':{ exposure: 'significant', frequency: 'daily',     comment: '' },
    'stakeholder-comms':      { exposure: 'significant', frequency: 'often',     comment: '' },
  },
  tools: ['excel','powerbi','sql','python','azure'], tools_other: 'SharePoint',
  tools_access: 'Database and data warehouse access requires a formal IT request signed off by the line manager (3–5 business days). Power BI and Excel granted on day one.',
  additional_info: 'Jamie will join the weekly analytics stand-up every Monday and present findings to the commercial team monthly. A data warehouse migration in Q3 will provide additional exposure to data architecture.',
};

// ── Level 3 Data Technician ───────────────────────────────

const DT_SKILL_GROUPS = [
  { id: 'dt-security',    short: 'Data Security',    title: 'Data Security & Compliance',        skills: ['S12'],           description: 'The apprentice will need to store, manage and distribute data in compliance with your organisation\'s data security standards and applicable legislation such as GDPR. This includes understanding how data should be handled, shared and retained.', example: 'e.g. saving files in the correct secure location, following data retention policies, ensuring data is only shared with authorised recipients.' },
  { id: 'dt-collection',  short: 'Data Collection',  title: 'Data Collection & Sourcing',         skills: ['S1','S2'],       description: 'The apprentice will need to source and migrate data from identified sources, then collect, format and save datasets in appropriate formats for further use.', example: 'e.g. downloading data from a company database or online portal, receiving exports from other departments, converting files into a consistent format.' },
  { id: 'dt-preparation', short: 'Data Preparation', title: 'Data Preparation & Cleaning',        skills: ['S5','S16'],      description: 'The apprentice will need to manipulate, link and clean raw data — removing duplicates, correcting errors, parsing fields to a standard format, and testing data integrity before use.', example: 'e.g. removing duplicate rows from a spreadsheet, standardising phone number formats, checking all required fields are populated, testing a dataset\'s reliability before analysis.' },
  { id: 'dt-blending',    short: 'Data Blending',    title: 'Data Blending & Integration',        skills: ['S4'],            description: 'The apprentice will need to blend datasets from multiple different sources and present them in a format appropriate for the task in hand.', example: 'e.g. combining CRM data with finance system data, merging survey results with customer records, producing a single dataset from several departmental reports.' },
  { id: 'dt-quality',     short: 'Data Quality',     title: 'Data Quality & Auditing',            skills: ['S8','S9'],       description: 'The apprentice will need to apply cross-checking techniques to identify faults or errors in data, and audit data results to confirm accuracy and reliability.', example: 'e.g. reconciling figures between two reports to spot discrepancies, running validation checks on a new dataset, auditing a data extract against the source system.' },
  { id: 'dt-analysis',    short: 'Analysis & Stats', title: 'Analysis & Trend Identification',    skills: ['S6','S7'],       description: 'The apprentice will need to use tools and basic statistical methods to identify trends and patterns in data, supporting informed decision-making.', example: 'e.g. using Excel charts or a BI tool to spot a sales trend, applying a simple average or percentage to highlight performance, using a basic algorithm to flag unusual values.' },
  { id: 'dt-comms',       short: 'Communication',    title: 'Communication & Reporting',          skills: ['S3','S10','S11','S13'], description: 'The apprentice will need to summarise and explain data findings to different audiences — including non-technical stakeholders — producing clear documentation and communicating in a way that aids understanding.', example: 'e.g. writing a short data summary for a manager, producing a report using a standard template, presenting findings verbally to a team, adapting the technical level for different recipients.' },
  { id: 'dt-teamwork',    short: 'Team & Projects',  title: 'Team Working & Project Support',     skills: ['S17','S18'],     description: 'The apprentice will need to work as part of a team — often across different functions — and manage their own workload effectively, prioritising tasks within the context of a wider project.', example: 'e.g. contributing to a project team alongside IT and operations colleagues, managing multiple data tasks to agreed deadlines, attending project meetings and reporting progress.' },
  { id: 'dt-cpd',         short: 'CPD Support',      title: 'Professional Development Support',   skills: ['S14','S15'],     description: 'The apprentice will need your support to review their own development and keep up to date with new technologies and trends in data. This means providing access to relevant resources, time for learning, and encouragement to explore new tools.', example: 'e.g. time to attend webinars or online learning, access to industry publications, support to attend professional events or complete relevant certifications.' },
];

const DT_SKILL_SHORT = { S1:'Data sourcing & migration', S2:'Data collection & formatting', S3:'Data summarisation', S4:'Data blending & presentation', S5:'Data manipulation & linking', S6:'Trend & pattern identification', S7:'Statistical methods', S8:'Cross-checking & fault identification', S9:'Data auditing', S10:'Communicating data findings', S11:'Technical documentation', S12:'Data security & distribution', S13:'Explaining data to audiences', S14:'Own development review', S15:'Technology awareness', S16:'Data cleaning & integrity testing', S17:'Multi-functional team working', S18:'Project prioritisation' };
const DT_SKILL_FULL  = { S1:'Source and migrate data from already identified different sources', S2:'Collect, format and save datasets', S3:'Summarise and explain gathered data', S4:'Blend data sets from multiple sources and present in format appropriate to the task', S5:'Manipulate and link different data sets as required', S6:'Use tools and techniques to identify trends and patterns in data', S7:'Apply basic statistical methods and algorithms to identify trends and patterns in data', S8:'Apply cross checking techniques for identifying faults and data results for data project requirements', S9:'Audit data results', S10:'Demonstrate the different ways of communicating meaning from data in line with audience requirements', S11:'Produce clear and consistent technical documentation using standard organisational templates', S12:'Store, manage and distribute in compliance with data security standards and legislation', S13:'Explain data and results to different audiences in a way that aids understanding', S14:'Review own development needs', S15:'Keep up to date with developments in technologies, trends and innovation using a range of sources', S16:'Clean data (remove duplicates, typos, out of date data, parse data) and test data integrity', S17:'Operate as part of a multi-functional team', S18:'Prioritise within the context of a project' };

const DT_TOOLS = [
  { id: 'excel',       label: 'Microsoft Excel' },   { id: 'gsheets',    label: 'Google Sheets' },
  { id: 'powerbi',    label: 'Power BI' },            { id: 'tableau',    label: 'Tableau' },
  { id: 'looker',     label: 'Looker / Looker Studio' },{ id: 'sql',      label: 'SQL' },
  { id: 'python',     label: 'Python' },              { id: 'r-lang',     label: 'R' },
  { id: 'azure',      label: 'Microsoft Azure' },     { id: 'aws',        label: 'AWS' },
  { id: 'gcp',        label: 'Google Cloud (GCP)' },  { id: 'sharepoint', label: 'SharePoint' },
  { id: 'mysql',      label: 'MySQL / PostgreSQL' },  { id: 'sap',        label: 'SAP' },
];

const DT_DEMO_STATE = {
  meta: { employer: 'Lakefield Systems Ltd', apprentice: 'Jordan Price', completer: 'Nina Okafor', job_title: 'Data & Systems Manager', date: '2026-05-29' },
  sections: {
    'dt-security':    { exposure: 'significant', frequency: 'daily',     comment: '' },
    'dt-collection':  { exposure: 'significant', frequency: 'often',     comment: '' },
    'dt-preparation': { exposure: 'significant', frequency: 'often',     comment: '' },
    'dt-blending':    { exposure: 'moderate',    frequency: 'sometimes', comment: 'Data blending across multiple systems occurs on a monthly basis when producing the board report pack. Jordan will be involved in this process from month two and will lead on it from month four.' },
    'dt-quality':     { exposure: 'significant', frequency: 'often',     comment: '' },
    'dt-analysis':    { exposure: 'moderate',    frequency: 'often',     comment: 'Analysis is primarily descriptive at this stage. Jordan will have the opportunity to apply more statistical approaches as they develop, particularly during the quarterly business review process.' },
    'dt-comms':       { exposure: 'significant', frequency: 'daily',     comment: '' },
    'dt-teamwork':    { exposure: 'significant', frequency: 'daily',     comment: '' },
    'dt-cpd':         { exposure: 'significant', frequency: 'often',     comment: '' },
  },
  tools: ['excel','sql','powerbi','sharepoint'], tools_other: '',
  tools_access: 'SQL database access is provided on day one. Power BI access requires a licence request through IT (up to five working days).',
  additional_info: 'Jordan will join the weekly data team meeting and contribute to at least one internal reporting project per quarter.',
};

// ── Level 3 Multi-channel Marketer ────────────────────────

const MCM_SKILL_GROUPS = [
  { id: 'mcm-planning',    short: 'Campaign Planning',  title: 'Campaign Planning & Briefing',         skills: ['S1','S2'],        description: 'The apprentice will need to develop or interpret marketing briefs and coordinate marketing activities using appropriate tactics to acquire and retain customers, managing delivery against agreed timelines and resources.', example: 'e.g. receiving a brief from a client or senior marketer and breaking it into deliverables, planning a product launch campaign across channels, tracking delivery against the specification.' },
  { id: 'mcm-content',     short: 'Content & Copy',     title: 'Content Creation & Copywriting',       skills: ['S3','S5','S7'],   description: 'The apprentice will need to contribute to creating engaging content — writing persuasive copy, proofreading to ensure accuracy and brand alignment, and generating creative ideas for video, images and other formats both online and offline.', example: 'e.g. writing a product email that drives click-throughs, proofreading a social post before it goes live, brainstorming creative concepts for a campaign.' },
  { id: 'mcm-design',      short: 'Design & Assets',    title: 'Design & Asset Production',            skills: ['S8','S10'],       description: 'The apprentice will need to use design software to create marketing assets to a technical specification, and ensure that both digital and offline assets are organised, coordinated and legally compliant.', example: 'e.g. designing a social media graphic in Canva or Adobe, organising a digital asset library, ensuring campaign materials include the required legal disclaimers.' },
  { id: 'mcm-research',    short: 'Research & Insight', title: 'Audience Research & Insight',          skills: ['S4','S9'],        description: 'The apprentice will need to use research and survey tools to gather audience insight, and contribute to researching external suppliers when procurement of marketing services is needed.', example: 'e.g. running a customer satisfaction survey using an online tool, analysing platform audience data, researching print suppliers for a campaign.' },
  { id: 'mcm-delivery',    short: 'Campaign Delivery',  title: 'Multi-channel Campaign Delivery',      skills: ['S6','S11'],       description: 'The apprentice will need to build and implement campaigns across multiple channels — both digital and offline — and publish content through a website content management system.', example: 'e.g. scheduling posts across social media platforms, publishing a new landing page via WordPress, coordinating an email and social campaign to go live simultaneously.' },
  { id: 'mcm-tools',       short: 'Digital Tools',      title: 'Digital Tools & Technology',           skills: ['S12','S13'],      description: 'The apprentice will need to use a range of digital tools and software packages to support day-to-day marketing activity, including spreadsheets for planning and budgeting, and other platforms for communications, reporting and project management.', example: 'e.g. maintaining a campaign budget tracker in Excel, using a project management tool to track deliverables, sending stakeholder updates via email platforms.' },
  { id: 'mcm-data',        short: 'Data & Reporting',   title: 'Data Analysis & Marketing Insight',    skills: ['S14','S18'],      description: 'The apprentice will need to identify and use data and technologies to achieve marketing objectives, and use data analysis tools to record, interpret and analyse customer or campaign data.', example: 'e.g. pulling analytics from Google Analytics, analysing email open rates to refine future campaigns, using a CRM to segment customer data.' },
  { id: 'mcm-optimisation',short: 'Optimisation',       title: 'Campaign Optimisation & Evaluation',   skills: ['S15','S16','S17'],description: 'The apprentice will need to monitor campaigns against budget, review their effectiveness regularly, and measure and evaluate delivery to identify areas for improvement.', example: 'e.g. pausing underperforming paid ads to reallocate spend, producing a post-campaign report with recommendations, comparing conversion rates between different channels.' },
];

const MCM_SKILL_SHORT = { S1:'Brief development & measurement', S2:'Marketing activity planning', S3:'Creative content development', S4:'Audience research & insight', S5:'Copywriting', S6:'Multi-channel campaign delivery', S7:'Proofreading & brand alignment', S8:'Design & asset creation', S9:'Supplier research & procurement', S10:'Asset organisation & compliance', S11:'CMS publishing', S12:'Spreadsheets & project planning', S13:'Marketing technology & tools', S14:'Data & technology for objectives', S15:'Budget monitoring', S16:'Campaign review & optimisation', S17:'Campaign measurement & evaluation', S18:'Customer & campaign data analysis' };
const MCM_SKILL_FULL  = { S1:'Develop or interpret briefs for external or internal stakeholders and measure delivery in-line with the specification and agreed timelines', S2:'Plan and coordinate a marketing activity using marketing tactics to acquire and retain one or more customer segments using available resources', S3:'Contribute to the generation of innovative and creative approaches across video, images, and other formats, both online and offline, to support campaign development', S4:'Use research/survey software to gather audience insight and/or evaluation to support the project', S5:'Use copywriting techniques to write persuasive text/copy to meet a communications objective ensuring it is in-line with organisational brand guidelines', S6:'Build and implement multi-channel campaigns across a variety of platforms, either offline or digital media', S7:'Proofread marketing copy ensuring it is accurate, persuasive and is on brand', S8:'Use software to design and create marketing assets to meet the technical specification', S9:'Contribute to the research of external suppliers to support recommendations and procurement of marketing goods and services', S10:'Organise offline and digital assets ensuring they are co-ordinated and legally compliant', S11:'Use a website content management system to publish text, images, and video/animated content', S12:'Create and maintain spreadsheets to support marketing activities such as project/budget planning and organisation of marketing assets', S13:'Use technology and software packages to support day to day activities, e.g., stakeholder communications, development of briefs, data analysis, report writing, presentations and project management', S14:'Identify and use data and technologies to achieve marketing objectives', S15:'Monitor and amend campaigns to meet budget requirements including time and monetary costs', S16:'Review campaigns regularly to ensure effectiveness, to optimise the results', S17:'Measure and evaluate campaign delivery to identify areas for improvement', S18:'Use data analysis tools to record, interpret and analyse customer or campaign data' };

const MCM_TOOLS = [
  { id: 'ga4',          label: 'Google Analytics (GA4)' },   { id: 'meta-ads',   label: 'Meta Ads Manager' },
  { id: 'google-ads',   label: 'Google Ads' },               { id: 'hubspot',    label: 'HubSpot' },
  { id: 'mailchimp',    label: 'Mailchimp / email platform' },{ id: 'hootsuite',  label: 'Hootsuite / Sprout Social' },
  { id: 'canva',        label: 'Canva' },                     { id: 'adobe',      label: 'Adobe Creative Suite' },
  { id: 'wordpress',    label: 'WordPress / CMS' },           { id: 'semrush',    label: 'SEMrush / Moz (SEO)' },
  { id: 'salesforce',   label: 'Salesforce / CRM' },          { id: 'excel',      label: 'Excel / Google Sheets' },
  { id: 'asana',        label: 'Asana / Trello / Monday' },   { id: 'linkedin',   label: 'LinkedIn Ads' },
];

const MCM_DEMO_STATE = {
  meta: { employer: 'Brightpath Media Ltd', apprentice: 'Riley Mason', completer: 'Tom Davenport', job_title: 'Marketing Manager', date: '2026-05-29' },
  sections: {
    'mcm-planning':     { exposure: 'significant', frequency: 'often',     comment: '' },
    'mcm-content':      { exposure: 'significant', frequency: 'daily',     comment: '' },
    'mcm-design':       { exposure: 'moderate',    frequency: 'often',     comment: 'Design work is primarily handled by a freelance designer, however Riley will use Canva for social assets and assist with briefing the designer, with meaningful involvement in the design process.' },
    'mcm-research':     { exposure: 'moderate',    frequency: 'sometimes', comment: 'Formal audience research occurs quarterly. Riley will lead the next survey project and will have regular access to platform analytics to inform campaign decisions.' },
    'mcm-delivery':     { exposure: 'significant', frequency: 'daily',     comment: '' },
    'mcm-tools':        { exposure: 'significant', frequency: 'daily',     comment: '' },
    'mcm-data':         { exposure: 'moderate',    frequency: 'often',     comment: 'Data analysis beyond standard platform reporting is currently handled by a senior team member. Riley will shadow this work and progressively take ownership of campaign reporting within the first three months.' },
    'mcm-optimisation': { exposure: 'significant', frequency: 'often',     comment: '' },
  },
  tools: ['ga4','meta-ads','canva','wordpress','mailchimp','excel','hubspot'], tools_other: '',
  tools_access: 'Most tools are cloud-based and access is granted on day one. Google Ads requires a manager-level invitation from the current account holder (1–2 days).',
  additional_info: 'Riley will own social media scheduling from day one and take on email marketing within the first month. The team runs bi-weekly campaign reviews which Riley will attend and present at.',
};

// ── Level 3 Cyber Security Technician ────────────────────

const CS_SKILL_GROUPS = [
  { id: 'cs-policy',      short: 'Policy & Compliance',  title: 'Security Policy & Compliance',              skills: ['S1','S2','S18','S19','S22'], description: 'The apprentice will need to follow information security procedures, maintain security controls, review and comment on policies and guidelines, perform compliance checks, and keep up to date with legislation and industry standards relevant to cyber security in the organisation.', example: 'e.g. following the incident response procedure, completing a compliance checklist, reviewing a draft security policy, attending briefings on updated legislation.' },
  { id: 'cs-training',    short: 'Security Training',    title: 'Security Awareness & Training',             skills: ['S3','S4'],                  description: 'The apprentice will need to develop information security training and awareness resources, and monitor how effective these are across the organisation.', example: 'e.g. creating a phishing awareness guide for staff, producing a secure password poster, tracking completion of mandatory security training.' },
  { id: 'cs-stakeholder', short: 'Stakeholder Mgmt',     title: 'Stakeholder & Escalation Management',       skills: ['S5','S8','S21'],            description: 'The apprentice will need to handle and assess security requests from internal and external stakeholders, know when and how to escalate information security events, and communicate effectively in multi-disciplinary teams using both technical and non-technical language.', example: 'e.g. assessing whether a user\'s request for elevated access is valid, escalating a suspected incident to the security operations team, explaining a technical issue to a non-technical colleague.' },
  { id: 'cs-technical',   short: 'Technical Controls',   title: 'Technical Security Controls',               skills: ['S6','S9','S10'],            description: 'The apprentice will need to install and maintain technical security controls, review and modify access rights to digital systems and data, and maintain an inventory of systems, services, devices and data storage.', example: 'e.g. configuring firewall rules, granting or revoking user access during an onboarding/offboarding, maintaining a register of IT assets and their security status.' },
  { id: 'cs-monitoring',  short: 'Monitoring & Reports', title: 'Security Monitoring & Reporting',           skills: ['S7','S16','S17','S20'],     description: 'The apprentice will need to monitor and report information security events, document incidents whilst preserving evidence, translate audit requirements, and draft clear reports of findings in standard formats appropriate for the intended audience.', example: 'e.g. reviewing event logs in a SIEM tool, documenting a phishing incident with screenshots and timestamps, writing a monthly security report for the IT manager.' },
  { id: 'cs-vulnerability',short: 'Risk & Vulnerability',title: 'Vulnerability & Risk Assessment',           skills: ['S11','S12','S14','S15'],   description: 'The apprentice will need to scope and evaluate cyber security vulnerability assessments, carry out digital information risk assessments, and identify and categorise threats, vulnerabilities and risks in preparation for response or escalation.', example: 'e.g. running a vulnerability scan on company systems, producing a risk register entry for a new exposure, classifying a threat as high, medium or low risk.' },
  { id: 'cs-threat',      short: 'Threat Intelligence',  title: 'Threat Intelligence',                       skills: ['S13'],                      description: 'The apprentice will need to perform routine threat intelligence gathering tasks by consulting external sources, building an up-to-date awareness of the threat landscape relevant to the organisation.', example: 'e.g. reviewing threat feeds from the NCSC or CISA, monitoring vendor security bulletins for relevant advisories, summarising newly identified threats for the security team.' },
];

const CS_SKILL_SHORT = { S1:'Security procedures', S2:'Security controls maintenance', S3:'Security training development', S4:'Training effectiveness monitoring', S5:'Security request handling', S6:'Technical security controls', S7:'Security event monitoring', S8:'Event escalation', S9:'Access rights management', S10:'Asset inventory management', S11:'Vulnerability assessment scoping', S12:'Vulnerability assessment evaluation', S13:'Threat intelligence gathering', S14:'Digital risk assessment', S15:'Threat & vulnerability categorisation', S16:'Incident documentation', S17:'Security reporting', S18:'Policy review & comment', S19:'Compliance checking', S20:'Audit & log analysis', S21:'Multi-team communication', S22:'Legislation & standards awareness' };
const CS_SKILL_FULL  = { S1:'Follow information security procedures', S2:'Maintain information security controls', S3:'Develop information security training and awareness resources', S4:'Monitor the effectiveness of information security training and awareness', S5:'Handle and assess the validity of security requests from a range of internal and external stakeholders', S6:'Follow technical procedures to install and maintain technical security controls', S7:'Monitor and report information security events', S8:'Recognise when and how to escalate information security events in accordance with relevant procedures and standards', S9:'Review and modify access rights to digital information systems, services, devices or data', S10:'Maintain an inventory of digital information systems, services, devices and data storage', S11:'Scope cyber security vulnerability assessments', S12:'Evaluate the results of a cyber security vulnerability assessment', S13:'Perform routine threat intelligence gathering tasks through consulting external sources', S14:'Undertake digital information risk assessments', S15:'Identify and categorise threats, vulnerabilities and risks in preparation for response or escalation', S16:'Document cyber security event information whilst preserving evidence', S17:'Draft information management reports using standard formats appropriate to the recipients', S18:'Review and comment upon cyber security policies, procedures, standards and guidelines', S19:'Perform cyber security compliance checks', S20:'Translate audit requirements and collate relevant information from log files, incident reports and other data sources', S21:'Communication skills to co-operate as part of a multi-functional, multi-disciplinary team using a range of technical and non-technical language to provide an effective interface between internal or external users and suppliers', S22:'Keep up-to-date with legislation and industry standards related to the implementation of cyber security in an organisation' };

const CS_TOOLS = [
  { id: 'splunk',      label: 'Splunk / SIEM tool' },        { id: 'sentinel',    label: 'Microsoft Sentinel' },
  { id: 'defender',    label: 'Microsoft Defender' },         { id: 'crowdstrike', label: 'CrowdStrike / EDR tool' },
  { id: 'nessus',      label: 'Nessus / vulnerability scanner' },{ id: 'qualys',  label: 'Qualys' },
  { id: 'burp',        label: 'Burp Suite' },                 { id: 'kali',        label: 'Kali Linux / pen test tools' },
  { id: 'active-dir',  label: 'Active Directory / Azure AD' },{ id: 'okta',        label: 'Okta / IAM platform' },
  { id: 'palo-alto',   label: 'Palo Alto / Fortinet / firewall' },{ id: 'wireshark',label: 'Wireshark / network analysis' },
  { id: 'jira',        label: 'Jira / ticketing system' },    { id: 'misp',        label: 'Threat intel platform (MISP etc.)' },
];

const CS_DEMO_STATE = {
  meta: { employer: 'Castleton Financial Services', apprentice: 'Sam Adekunle', completer: 'Chris Renton', job_title: 'IT Security Manager', date: '2026-05-29' },
  sections: {
    'cs-policy':       { exposure: 'significant', frequency: 'daily',     comment: '' },
    'cs-training':     { exposure: 'moderate',    frequency: 'sometimes', comment: 'Security training is managed centrally on an annual cycle. Sam will contribute to the next refresh of training materials and monitor completion rates. We are planning to increase the frequency of awareness campaigns during the programme.' },
    'cs-stakeholder':  { exposure: 'significant', frequency: 'often',     comment: '' },
    'cs-technical':    { exposure: 'significant', frequency: 'daily',     comment: '' },
    'cs-monitoring':   { exposure: 'significant', frequency: 'daily',     comment: '' },
    'cs-vulnerability':{ exposure: 'moderate',    frequency: 'often',     comment: 'Formal vulnerability assessments are run quarterly by an external provider. Sam will shadow and assist with these and conduct internal self-assessments monthly, providing regular hands-on exposure.' },
    'cs-threat':       { exposure: 'moderate',    frequency: 'sometimes', comment: 'Threat intelligence gathering is not yet a structured process. Sam will own this activity and establish a regular cadence of reviewing NCSC and vendor bulletins, producing a monthly threat summary for the team.' },
  },
  tools: ['sentinel','defender','active-dir','jira','nessus'], tools_other: 'Proofpoint (email security)',
  tools_access: 'SIEM and endpoint tools are accessible from day one with read permissions. Full Active Directory admin access requires line manager approval and IT ticket (typically 3 days).',
  additional_info: 'Sam will join the incident response team from month two. The organisation is working towards Cyber Essentials Plus certification during the programme, which will provide significant exposure to compliance and audit activities.',
};

// ── Checklist config map ──────────────────────────────────

const CHECKLISTS = {
  'l4-data-analyst': {
    stateKey: 'jrsc_l4-data-analyst',
    skillGroups: DA_SKILL_GROUPS, tools: DA_TOOLS,
    skillShort: DA_SKILL_SHORT,   skillFull: DA_SKILL_FULL,
    demoState: DA_DEMO_STATE,
    jobTitleHint: 'e.g. Data Manager, Head of Analytics, Insight Lead',
  },
  'l3-data-technician': {
    stateKey: 'jrsc_l3-data-technician',
    skillGroups: DT_SKILL_GROUPS, tools: DT_TOOLS,
    skillShort: DT_SKILL_SHORT,   skillFull: DT_SKILL_FULL,
    demoState: DT_DEMO_STATE,
    jobTitleHint: 'e.g. Data Manager, IT Manager, Business Intelligence Lead',
  },
  'l3-multichannel-marketer': {
    stateKey: 'jrsc_l3-multichannel-marketer',
    skillGroups: MCM_SKILL_GROUPS, tools: MCM_TOOLS,
    skillShort: MCM_SKILL_SHORT,   skillFull: MCM_SKILL_FULL,
    demoState: MCM_DEMO_STATE,
    jobTitleHint: 'e.g. Marketing Manager, Digital Marketing Manager, Head of Marketing',
  },
  'l3-cyber-security': {
    stateKey: 'jrsc_l3-cyber-security',
    skillGroups: CS_SKILL_GROUPS, tools: CS_TOOLS,
    skillShort: CS_SKILL_SHORT,   skillFull: CS_SKILL_FULL,
    demoState: CS_DEMO_STATE,
    jobTitleHint: 'e.g. IT Manager, Head of Security, Security Operations Manager',
  },
};

// ── Rating options ────────────────────────────────────────

const EXPOSURE_OPTIONS = [
  { value: 'limited',     label: 'Limited',     color: 'red'   },
  { value: 'moderate',    label: 'Moderate',    color: 'amber' },
  { value: 'significant', label: 'Significant', color: 'green' },
];

const FREQUENCY_OPTIONS = [
  { value: 'rarely',    label: 'Rarely',    color: 'red'   },
  { value: 'sometimes', label: 'Sometimes', color: 'amber' },
  { value: 'often',     label: 'Often',     color: 'green' },
  { value: 'daily',     label: 'Daily',     color: 'green' },
];

// ── State ─────────────────────────────────────────────────

function todayISO() {
  const d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
}

function defaultState() {
  return { meta: { employer:'', apprentice:'', completer:'', job_title:'', date: todayISO() }, sections:{}, tools:[], tools_other:'', tools_access:'', additional_info:'' };
}

function loadStateFor(key) {
  try { const s = JSON.parse(localStorage.getItem(key)); if (s) return s; } catch {}
  return defaultState();
}

function saveStateFor(key, state) {
  localStorage.setItem(key, JSON.stringify(state));
}

// ── Suitability logic ─────────────────────────────────────

function needsComment(sec) {
  if (!sec) return false;
  return ['limited','moderate'].includes(sec.exposure) || ['rarely','sometimes'].includes(sec.frequency);
}

function getSectionStatus(sec) {
  if (!sec || !sec.exposure || !sec.frequency) return 'incomplete';
  if (needsComment(sec) && !sec.comment?.trim()) return 'incomplete';
  if (sec.exposure === 'limited' && sec.frequency === 'rarely') return 'concern';
  if (sec.exposure === 'limited' || sec.frequency === 'rarely') return 'review';
  if (sec.exposure === 'moderate' || sec.frequency === 'sometimes') return 'review';
  return 'suitable';
}

function getOverallVerdict(state, skillGroups) {
  const statuses = skillGroups.map(g => getSectionStatus(state.sections[g.id]));
  if (statuses.includes('incomplete')) return 'incomplete';
  if (statuses.includes('concern')) return 'not-recommended';
  if (statuses.includes('review')) return 'review-required';
  return 'suitable';
}

function completedCount(state, skillGroups) {
  return skillGroups.filter(g => {
    const s = state.sections[g.id];
    if (!s || !s.exposure || !s.frequency) return false;
    if (needsComment(s) && !s.comment?.trim()) return false;
    return true;
  }).length;
}

// ── Active checklist config ───────────────────────────────

let activeConfig = null;

// ── Nav ───────────────────────────────────────────────────

let activeCategory = NAV_CATEGORIES[0];
let activeId       = STANDARDS[activeCategory][0].id;

function buildNav() { renderCategoryRow(); renderStandardRow(); }

function renderCategoryRow() {
  const row = document.getElementById('nav-categories');
  row.innerHTML = '';
  NAV_CATEGORIES.forEach(group => {
    const btn = document.createElement('button');
    btn.className = 'nav-tab' + (group === activeCategory ? ' active' : '');
    btn.textContent = group;
    btn.addEventListener('click', () => { activeCategory = group; activeId = STANDARDS[group][0].id; renderCategoryRow(); renderStandardRow(); renderContent(); });
    row.appendChild(btn);
  });
}

function renderStandardRow() {
  const row = document.getElementById('nav-standards');
  row.innerHTML = '';
  STANDARDS[activeCategory].forEach(({ id, label }) => {
    const btn = document.createElement('button');
    btn.className = 'nav-tab' + (id === activeId ? ' active' : '');
    btn.textContent = label;
    btn.addEventListener('click', () => { activeId = id; renderStandardRow(); renderContent(); });
    row.appendChild(btn);
  });
}

// ── Content router ────────────────────────────────────────

function findStandard(id) {
  for (const standards of Object.values(STANDARDS)) {
    const found = standards.find(s => s.id === id);
    if (found) return found;
  }
  return null;
}

function renderContent() {
  const existing = document.getElementById('section-sidebar');
  if (existing) existing.remove();
  if (window._sidebarObserver) { window._sidebarObserver.disconnect(); window._sidebarObserver = null; }

  const app = document.getElementById('app');
  const standard = findStandard(activeId);
  if (!standard) return;

  const config = CHECKLISTS[activeId];
  if (config) {
    activeConfig = config;
    renderChecklist(app, activeId, standard.label, config);
  } else {
    const smeta = STANDARD_META[activeId] || {};
    app.innerHTML = `
      <div class="welcome">
        <h2>${standard.label}</h2>
        <p>The checklist for this standard is being developed. Please check back soon.</p>
        ${smeta.url ? `<p style="margin-top:0.75rem"><a href="${smeta.url}" target="_blank" rel="noopener" class="standard-link-inline">View official standard on Skills England ↗</a></p>` : ''}
      </div>`;
  }
}

// ── Generic checklist renderer ────────────────────────────

function renderChecklist(app, standardId, title, config, overrideState = null, isDemo = false) {
  const state = overrideState || loadStateFor(config.stateKey);
  const smeta = STANDARD_META[standardId] || {};
  const done  = completedCount(state, config.skillGroups);
  const total = config.skillGroups.length;
  const meta  = state.meta || {};

  const levelBadge = title.match(/^Level\s+\d+/)?.[0] || 'Standard';

  app.innerHTML = `
    <div class="checklist-header">
      <span class="level-badge">${levelBadge}</span>
      <h2>${title}${smeta.version ? ` <span class="version-tag">(${smeta.version})</span>` : ''}</h2>
      <p>Work through each section below to assess whether the apprentice's role provides sufficient exposure across the required skill areas. Your responses will determine whether the apprenticeship is recommended to proceed.</p>
      ${smeta.url ? `<a href="${smeta.url}" target="_blank" rel="noopener" class="standard-link">View official standard on Skills England ↗</a>` : ''}
    </div>

    ${isDemo
      ? `<div class="demo-bar demo-bar-active"><span class="demo-active-label">Demo mode — this is an example completed form</span><button class="btn-demo-exit" id="btn-demo">Exit Demo</button></div>`
      : `<div class="demo-bar"><button class="btn-demo" id="btn-demo">View Example Completed Form</button><span class="demo-hint">See how a completed checklist looks before you begin</span></div>`
    }

    <div class="meta-card">
      <div class="meta-card-header">Checklist Details</div>
      <div class="meta-grid">
        <div class="meta-field"><label class="meta-label" for="meta-employer">Employer Name</label><input type="text" id="meta-employer" class="text-input" placeholder="e.g. Acme Ltd" value="${meta.employer || ''}" /></div>
        <div class="meta-field"><label class="meta-label" for="meta-apprentice">Apprentice Name <span class="optional">(optional)</span></label><input type="text" id="meta-apprentice" class="text-input" placeholder="Leave blank if not yet known" value="${meta.apprentice || ''}" /></div>
        <div class="meta-field"><label class="meta-label" for="meta-date">Date of Completion</label><input type="date" id="meta-date" class="text-input" value="${meta.date || todayISO()}" /></div>
        <div class="meta-field"><label class="meta-label" for="meta-completer">Completed by</label><input type="text" id="meta-completer" class="text-input" placeholder="Full name" value="${meta.completer || ''}" /></div>
        <div class="meta-field"><label class="meta-label" for="meta-title">Job Title</label><input type="text" id="meta-title" class="text-input" placeholder="${config.jobTitleHint}" value="${meta.job_title || ''}" /></div>
      </div>
    </div>

    <div class="rating-guide" id="rating-guide">
      <button class="rating-guide-toggle" id="rating-guide-toggle">
        <span>How to complete this form</span>
        <span class="rating-guide-chevron">−</span>
      </button>
      <div class="rating-guide-body" id="rating-guide-body">
        <div class="rating-guide-cols">
          <div class="rating-guide-col">
            <h4>Level of exposure</h4>
            <ul>
              <li class="guide-red"><strong>Limited</strong> — The role touches this occasionally or only in a narrow context. Significant support or additional project work will be needed to build the required competence.</li>
              <li class="guide-amber"><strong>Moderate</strong> — The role provides meaningful but not core exposure. The apprentice will encounter this regularly enough to develop with guidance.</li>
              <li class="guide-green"><strong>Significant</strong> — This is a core part of the role. The apprentice will have regular, substantive hands-on exposure that directly builds the required skills.</li>
            </ul>
          </div>
          <div class="rating-guide-col">
            <h4>How often will the apprentice encounter this?</h4>
            <ul>
              <li class="guide-red"><strong>Rarely</strong> — Less than once a month; only on specific projects or occasional tasks.</li>
              <li class="guide-amber"><strong>Sometimes</strong> — A few times a month.</li>
              <li class="guide-green"><strong>Often</strong> — Several times a week.</li>
              <li class="guide-green"><strong>Daily</strong> — Every working day, or near-daily.</li>
            </ul>
            <p class="rating-guide-note">Where exposure is <strong>Limited</strong> or <strong>Moderate</strong>, or frequency is <strong>Rarely</strong> or <strong>Sometimes</strong>, a written explanation is required.</p>
          </div>
        </div>
      </div>
    </div>

    <div class="form-progress">
      <div class="progress-text"><span id="progress-done">${done}</span> of ${total} sections completed</div>
      <div class="progress-bar-track"><div class="progress-bar-fill" id="progress-bar" style="width:${(done/total)*100}%"></div></div>
    </div>

    <div id="skill-sections"></div>

    <div class="section-card" id="tools-card">
      <div class="section-card-header" id="tools-header">
        <div class="section-header-left"><span class="section-num">${total+1}</span><h3>Tools, Systems &amp; Technologies</h3></div>
        <span class="section-toggle" id="tools-toggle">+</span>
      </div>
      <div class="section-card-body collapsed" id="tools-body">
        <p class="tools-intro">Select all the tools and platforms the apprentice will have access to in their role. This helps us tailor programme delivery to the technologies they use day-to-day.</p>
        <div class="tools-grid" id="tools-grid"></div>
        <div class="tools-other-wrap">
          <label class="field-label" for="tools-other">Any other tools or systems not listed above:</label>
          <input type="text" id="tools-other" class="text-input" placeholder="e.g. other platforms used in the role..." value="${state.tools_other || ''}" />
        </div>
        <div class="tools-other-wrap">
          <label class="field-label" for="tools-access">System access &amp; permissions</label>
          <p class="field-hint">Does the apprentice need to make a formal request to gain access to any of these systems? If so, please describe the process or any restrictions that may apply.</p>
          <textarea id="tools-access" class="comment-textarea" rows="3" placeholder="e.g. Database access requires IT approval. CRM access is granted on day one...">${state.tools_access || ''}</textarea>
        </div>
      </div>
    </div>

    <div class="section-card additional-card" id="additional-card">
      <div class="section-card-header">
        <div class="section-header-left"><span class="section-num">${total+2}</span><h3>Additional Information</h3></div>
      </div>
      <div class="section-card-body">
        <div class="section-description"><p>Is there anything else you'd like to share that may be relevant to this assessment? This could include information about team routines, the apprentice's existing knowledge, working patterns, planned projects, or anything else that gives us a fuller picture of the role.</p></div>
        <div class="rating-area"><textarea id="additional-info" class="comment-textarea" rows="5" placeholder="e.g. The apprentice will join the team's weekly review every Monday...">${state.additional_info || ''}</textarea></div>
      </div>
    </div>

    <div class="form-actions">
      <button class="btn-reset" id="btn-reset">Clear &amp; Start Again</button>
      <div class="form-actions-right">
        <button class="btn-pdf" id="btn-pdf" disabled>Save as PDF</button>
        <button class="btn-summary" id="btn-summary">View Suitability Summary</button>
      </div>
    </div>

    <div id="results-panel"></div>
  `;

  renderSkillSections(state, config);
  renderToolsGrid(state, config);

  const headerEl = document.querySelector('.site-header');
  if (headerEl) document.documentElement.style.setProperty('--header-h', headerEl.offsetHeight + 'px');

  const metaFields = { 'meta-employer':'employer', 'meta-apprentice':'apprentice', 'meta-date':'date', 'meta-completer':'completer', 'meta-title':'job_title' };
  Object.entries(metaFields).forEach(([elId, key]) => {
    document.getElementById(elId).addEventListener('input', e => {
      if (!state.meta) state.meta = {};
      state.meta[key] = e.target.value;
      saveStateFor(config.stateKey, state);
    });
  });

  document.getElementById('tools-access').addEventListener('input',  e => { state.tools_access    = e.target.value; saveStateFor(config.stateKey, state); });
  document.getElementById('additional-info').addEventListener('input',e => { state.additional_info = e.target.value; saveStateFor(config.stateKey, state); });
  document.getElementById('tools-other').addEventListener('input',   e => { state.tools_other     = e.target.value; saveStateFor(config.stateKey, state); });

  if (!isDemo) buildSidebar(state, config);

  document.getElementById('btn-demo').addEventListener('click', () => {
    if (!isDemo) {
      activeConfig = config;
      renderChecklist(document.getElementById('app'), standardId, title, config, config.demoState, true);
    } else {
      renderContent();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  document.getElementById('rating-guide-toggle').addEventListener('click', () => {
    const body    = document.getElementById('rating-guide-body');
    const chevron = document.querySelector('.rating-guide-chevron');
    const collapsed = body.classList.toggle('collapsed');
    chevron.textContent = collapsed ? '+' : '−';
  });

  document.getElementById('tools-header').addEventListener('click', () => {
    const body = document.getElementById('tools-body');
    const toggle = document.getElementById('tools-toggle');
    const collapsed = body.classList.toggle('collapsed');
    toggle.textContent = collapsed ? '+' : '−';
  });

  document.getElementById('btn-summary').addEventListener('click', () => {
    const missing = config.skillGroups.filter(g => {
      const s = state.sections[g.id];
      return s && s.exposure && s.frequency && needsComment(s) && !s.comment?.trim();
    });
    if (missing.length > 0) {
      missing.forEach(g => {
        const card = document.getElementById('card-' + g.id);
        const area = document.getElementById('comment-area-' + g.id);
        if (card) { card.querySelector('.section-card-body').classList.remove('collapsed'); card.querySelector('.section-toggle').textContent = '−'; }
        if (area) area.classList.add('comment-error');
      });
      document.getElementById('card-' + missing[0].id).scrollIntoView({ behavior:'smooth', block:'center' });
      return;
    }
    renderResults(state, config, standardId);
    setTimeout(() => document.getElementById('results-panel').scrollIntoView({ behavior:'smooth' }), 50);
  });

  document.getElementById('btn-reset').addEventListener('click', () => {
    if (confirm('This will clear all your answers and cannot be undone. Are you sure?')) {
      localStorage.removeItem(config.stateKey);
      renderContent();
    }
  });

  document.getElementById('btn-pdf').addEventListener('click', () => window.print());
}

// ── Section rendering ─────────────────────────────────────

function renderSkillSections(state, config) {
  const container = document.getElementById('skill-sections');
  config.skillGroups.forEach((group, idx) => {
    container.appendChild(buildSectionCard(group, state, config, idx + 1));
  });
}

function buildSectionCard(group, state, config, num) {
  const sec    = state.sections[group.id] || {};
  const status = getSectionStatus(sec);
  const isOpen = !(sec.exposure && sec.frequency);

  const card = document.createElement('div');
  card.className = 'section-card' + (status !== 'incomplete' ? ' status-' + status : '');
  card.id = 'card-' + group.id;

  const skillsLine = group.skills.map(s =>
    `<span class="skill-item" title="${config.skillFull[s] || ''}">${s}: ${config.skillShort[s] || s}</span>`
  ).join('');

  card.innerHTML = `
    <div class="section-card-header">
      <div class="section-header-left">
        <span class="section-num">${num}</span>
        <div><h3>${group.title}</h3><div class="skills-line">${skillsLine}</div></div>
      </div>
      <div class="section-header-right">
        <span class="section-status-dot status-dot-${status}"></span>
        <span class="section-toggle">${isOpen ? '−' : '+'}</span>
      </div>
    </div>
    <div class="section-card-body ${isOpen ? '' : 'collapsed'}">
      <div class="section-description">
        <p>${group.description}</p>
        <p class="section-example">${group.example}</p>
      </div>
      <div class="rating-area">
        <div class="rating-group">
          <span class="rating-label">Level of exposure in this role</span>
          <div class="rating-options" id="exposure-${group.id}">
            ${EXPOSURE_OPTIONS.map(o => `<button class="rating-btn color-${o.color}${sec.exposure === o.value ? ' selected' : ''}" data-group="${group.id}" data-type="exposure" data-value="${o.value}">${o.label}</button>`).join('')}
          </div>
        </div>
        <div class="rating-group">
          <span class="rating-label">How often will the apprentice encounter this?</span>
          <div class="rating-options" id="frequency-${group.id}">
            ${FREQUENCY_OPTIONS.map(o => `<button class="rating-btn color-${o.color}${sec.frequency === o.value ? ' selected' : ''}" data-group="${group.id}" data-type="frequency" data-value="${o.value}">${o.label}</button>`).join('')}
          </div>
        </div>
      </div>
      <div class="comment-area${needsComment(sec) ? '' : ' hidden'}" id="comment-area-${group.id}">
        <label class="field-label" for="comment-${group.id}">Please explain how exposure in this area will be achieved or supported <span class="required-marker">— required</span></label>
        <textarea id="comment-${group.id}" class="comment-textarea" rows="3" placeholder="Describe how the apprentice will develop in this area, or any plans to increase their exposure during the programme..." data-group="${group.id}">${sec.comment || ''}</textarea>
      </div>
    </div>
  `;

  card.querySelector('.section-card-header').addEventListener('click', () => {
    const body = card.querySelector('.section-card-body');
    const toggle = card.querySelector('.section-toggle');
    const collapsed = body.classList.toggle('collapsed');
    toggle.textContent = collapsed ? '+' : '−';
  });

  card.querySelectorAll('.rating-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const { group: gid, type, value } = btn.dataset;
      card.querySelectorAll(`#${type}-${gid} .rating-btn`).forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      if (!state.sections[gid]) state.sections[gid] = {};
      state.sections[gid][type] = value;
      saveStateFor(config.stateKey, state);
      document.getElementById('comment-area-' + gid).classList.toggle('hidden', !needsComment(state.sections[gid]));
      const st = getSectionStatus(state.sections[gid]);
      card.className = 'section-card' + (st !== 'incomplete' ? ' status-' + st : '');
      card.querySelector('.section-status-dot').className = 'section-status-dot status-dot-' + st;
      const s = state.sections[gid];
      if (s.exposure && s.frequency && (!needsComment(s) || s.comment?.trim())) {
        card.querySelector('.section-card-body').classList.add('collapsed');
        card.querySelector('.section-toggle').textContent = '+';
      }
      updateProgress(state, config);
    });
  });

  const ta = card.querySelector('.comment-textarea');
  if (ta) {
    ta.addEventListener('input', () => {
      if (!state.sections[group.id]) state.sections[group.id] = {};
      state.sections[group.id].comment = ta.value;
      saveStateFor(config.stateKey, state);
      const area = document.getElementById('comment-area-' + group.id);
      if (area) area.classList.remove('comment-error');
      const st = getSectionStatus(state.sections[group.id]);
      card.className = 'section-card' + (st !== 'incomplete' ? ' status-' + st : '');
      card.querySelector('.section-status-dot').className = 'section-status-dot status-dot-' + st;
      const s = state.sections[group.id];
      if (s.exposure && s.frequency && s.comment?.trim()) {
        card.querySelector('.section-card-body').classList.add('collapsed');
        card.querySelector('.section-toggle').textContent = '+';
      }
      updateProgress(state, config);
    });
  }

  return card;
}

function updateProgress(state, config) {
  const done  = completedCount(state, config.skillGroups);
  const total = config.skillGroups.length;
  const el  = document.getElementById('progress-done');
  const bar = document.getElementById('progress-bar');
  const pdf = document.getElementById('btn-pdf');
  if (el)  el.textContent = done;
  if (bar) bar.style.width = `${(done / total) * 100}%`;
  if (pdf) pdf.disabled = done < total;
  updateSidebar(state, config);
}

function renderToolsGrid(state, config) {
  const grid = document.getElementById('tools-grid');
  config.tools.forEach(tool => {
    const checked = (state.tools || []).includes(tool.id);
    const lbl = document.createElement('label');
    lbl.className = 'tool-chip' + (checked ? ' checked' : '');
    lbl.innerHTML = `<input type="checkbox" value="${tool.id}"${checked ? ' checked' : ''}><span>${tool.label}</span>`;
    lbl.querySelector('input').addEventListener('change', e => {
      state.tools = e.target.checked ? [...(state.tools || []), tool.id] : state.tools.filter(t => t !== tool.id);
      lbl.classList.toggle('checked', e.target.checked);
      saveStateFor(config.stateKey, state);
    });
    grid.appendChild(lbl);
  });
}

// ── Sidebar ───────────────────────────────────────────────

function buildSidebar(state, config) {
  const existing = document.getElementById('section-sidebar');
  if (existing) existing.remove();
  if (window._sidebarObserver) { window._sidebarObserver.disconnect(); window._sidebarObserver = null; }

  const sidebar = document.createElement('aside');
  sidebar.className = 'section-sidebar';
  sidebar.id = 'section-sidebar';
  sidebar.innerHTML = `<div class="sidebar-heading">Sections</div><nav id="sidebar-nav"></nav>`;
  document.body.appendChild(sidebar);
  updateSidebar(state, config);

  const progressEl = document.querySelector('.form-progress');
  if (progressEl) {
    window._sidebarObserver = new IntersectionObserver(([entry]) => {
      const sb = document.getElementById('section-sidebar');
      if (!sb) { window._sidebarObserver.disconnect(); return; }
      sb.classList.toggle('visible', !entry.isIntersecting && entry.boundingClientRect.top < 0);
    });
    window._sidebarObserver.observe(progressEl);
  }
}

function updateSidebar(state, config) {
  const nav = document.getElementById('sidebar-nav');
  if (!nav || !config) return;
  const total = config.skillGroups.length;
  const done  = completedCount(state, config.skillGroups);

  const items = config.skillGroups.map((g, idx) => {
    const st = getSectionStatus(state.sections[g.id] || {});
    return `<button class="sidebar-item" data-target="card-${g.id}"><span class="sidebar-dot status-dot-${st}"></span><span class="sidebar-num">${idx+1}</span><span class="sidebar-label">${g.short}</span></button>`;
  }).join('');

  nav.innerHTML = `${items}
    <div class="sidebar-divider"></div>
    <button class="sidebar-item sidebar-extra" data-target="tools-card"><span class="sidebar-dot sidebar-dot-neutral"></span><span class="sidebar-num">${total+1}</span><span class="sidebar-label">Tools &amp; Tech</span></button>
    <button class="sidebar-item sidebar-extra" data-target="additional-card"><span class="sidebar-dot sidebar-dot-neutral"></span><span class="sidebar-num">${total+2}</span><span class="sidebar-label">Additional Info</span></button>
    <div class="sidebar-footer">
      <div class="sidebar-progress-text">${done} of ${total} complete</div>
      <div class="sidebar-progress-track"><div class="sidebar-progress-fill" style="width:${(done/total)*100}%"></div></div>
    </div>`;

  nav.querySelectorAll('.sidebar-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.dataset.target);
      if (!target) return;
      const headerH = document.querySelector('.site-header')?.offsetHeight || 0;
      const metaH   = document.querySelector('.meta-card')?.offsetHeight   || 0;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - headerH - metaH - 12, behavior: 'smooth' });
    });
  });
}

// ── Results ───────────────────────────────────────────────

function renderResults(state, config, standardId) {
  const panel   = document.getElementById('results-panel');
  const verdict = getOverallVerdict(state, config.skillGroups);
  const smeta   = STANDARD_META[standardId] || {};

  const cfgMap = {
    suitable:          { label:'Suitable',         cls:'verdict-suitable',         msg:'Based on the information provided, this role appears to provide sufficient exposure across all required skill areas. The apprenticeship is recommended to proceed.' },
    'review-required': { label:'Review Required',  cls:'verdict-review',           msg:'One or more skill areas show limited or infrequent exposure. Please review the highlighted sections. A conversation with your Tess Group advisor is recommended before confirming enrolment.' },
    'not-recommended': { label:'Not Recommended',  cls:'verdict-not-recommended',  msg:'One or more skill areas show very limited and infrequent exposure. In its current form, this role may not provide the breadth of experience required by this standard. Please speak with your Tess Group advisor to explore options.' },
    incomplete:        { label:'Incomplete',        cls:'verdict-incomplete',       msg:'Not all sections have been completed. Please complete every section to receive a full suitability assessment.' },
  };
  const vd = cfgMap[verdict];

  const icon = { suitable:'✓', review:'!', concern:'✕', incomplete:'—' };
  const rows = config.skillGroups.map(g => {
    const sec = state.sections[g.id] || {};
    const st  = getSectionStatus(sec);
    const exp  = sec.exposure  ? sec.exposure.charAt(0).toUpperCase()  + sec.exposure.slice(1)  : '—';
    const freq = sec.frequency ? sec.frequency.charAt(0).toUpperCase() + sec.frequency.slice(1) : '—';
    return `<tr class="result-row result-row-${st}"><td class="result-icon result-icon-${st}">${icon[st]}</td><td class="result-section">${g.title}</td><td class="result-value">${exp}</td><td class="result-value">${freq}</td><td class="result-comment">${sec.comment ? `<em>${sec.comment}</em>` : ''}</td></tr>`;
  }).join('');

  const toolLabels = (state.tools || []).map(id => config.tools.find(t => t.id === id)?.label).filter(Boolean);
  const toolsStr   = [...toolLabels, ...(state.tools_other ? [state.tools_other] : [])].join(', ') || 'None recorded';
  const m = state.meta || {};
  const standardLabel = smeta.code ? `${findStandard(standardId)?.label || ''} (${smeta.code} ${smeta.version || ''})` : (findStandard(standardId)?.label || '');

  panel.innerHTML = `
    <div class="results-panel-inner">
      <h2 class="results-title">Suitability Summary</h2>
      <div class="results-meta">
        <div class="results-meta-row"><span class="results-meta-label">Employer</span><span>${m.employer || '—'}</span></div>
        <div class="results-meta-row"><span class="results-meta-label">Apprentice</span><span>${m.apprentice || 'Not specified'}</span></div>
        <div class="results-meta-row"><span class="results-meta-label">Completed by</span><span>${m.completer || '—'}${m.job_title ? `, ${m.job_title}` : ''}</span></div>
        <div class="results-meta-row"><span class="results-meta-label">Date</span><span>${m.date || '—'}</span></div>
        <div class="results-meta-row"><span class="results-meta-label">Standard</span><span>${standardLabel}</span></div>
      </div>
      <div class="verdict-banner ${vd.cls}"><span class="verdict-label">${vd.label}</span><p class="verdict-msg">${vd.msg}</p></div>
      <div class="results-table-wrap">
        <table class="results-table">
          <thead><tr><th></th><th>Skill Area</th><th>Exposure</th><th>Frequency</th><th>Notes</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
      <div class="results-tools"><strong>Tools &amp; Technologies:</strong> ${toolsStr}</div>
      ${state.tools_access  ? `<div class="results-tools"><strong>System access notes:</strong> ${state.tools_access}</div>`  : ''}
      ${state.additional_info ? `<div class="results-tools"><strong>Additional information:</strong> ${state.additional_info}</div>` : ''}
      <p class="results-footer">This checklist is for guidance and internal assessment only. Final enrolment decisions rest with The Tess Group in consultation with the employer and apprentice.</p>
    </div>
  `;
}

// ── Boot ──────────────────────────────────────────────────

buildNav();
renderContent();
