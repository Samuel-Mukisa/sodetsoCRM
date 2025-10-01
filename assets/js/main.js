// Fintech CRM Application Logic
class CRMStore {
  constructor() {
    this.storage = window.localStorage;
    this.initDemoData();
  }

  // Generic CRUD operations
  get(key) {
    const data = this.storage.getItem(key);
    return data ? JSON.parse(data) : [];
  }

  set(key, data) {
    this.storage.setItem(key, JSON.stringify(data));
  }

  add(key, item) {
    const items = this.get(key);
    item.id = Date.now().toString();
    item.createdAt = new Date().toISOString();
    items.push(item);
    this.set(key, items);
    return item;
  }

  update(key, id, updates) {
    const items = this.get(key);
    const index = items.findIndex(item => item.id === id);
    if (index !== -1) {
      items[index] = { ...items[index], ...updates, updatedAt: new Date().toISOString() };
      this.set(key, items);
      return items[index];
    }
    return null;
  }

  delete(key, id) {
    const items = this.get(key);
    const filtered = items.filter(item => item.id !== id);
    this.set(key, filtered);
  }

  // Initialize demo data
  initDemoData() {
    if (this.get('institutions').length === 0) {
      const demoInstitutions = [
        { name: 'ABC Bank', location: 'Nairobi', description: 'Commercial bank', loanPortfolio: 'KES 50M', savings: 'KES 100M', shares: 'KES 20M', productsInterested: 'Loans, Savings', branches: 15, clients: 50000, email: 'info@abcbank.co.ke', phone: '+254700000000', currentSystem: 'Legacy Core Banking' },
        { name: 'XYZ Credit Union', location: 'Mombasa', description: 'Credit union', loanPortfolio: 'KES 20M', savings: 'KES 40M', shares: 'KES 10M', productsInterested: 'Digital Banking', branches: 8, clients: 15000, email: 'contact@xyzcu.co.ke', phone: '+254711111111', currentSystem: 'Manual Systems' }
      ];
      demoInstitutions.forEach(inst => this.add('institutions', inst));
    }

    if (this.get('contacts').length === 0) {
      const demoContacts = [
        { name: 'John Doe', location: 'Nairobi', description: 'Branch Manager', jobTitle: 'Branch Manager', primaryPhone: '+254700000001', secondaryPhone: '+254711111112', personalEmail: 'john.doe@abcbank.co.ke', whatsapp: '+254700000001', marketingChannel: 'Email', institutionName: 'ABC Bank' },
        { name: 'Jane Smith', location: 'Mombasa', description: 'Operations Manager', jobTitle: 'Operations Manager', primaryPhone: '+254711111113', secondaryPhone: '+254722222224', personalEmail: 'jane.smith@xyzcu.co.ke', whatsapp: '+254711111113', marketingChannel: 'WhatsApp', institutionName: 'XYZ Credit Union' }
      ];
      demoContacts.forEach(contact => this.add('contacts', contact));
    }

    if (this.get('activities').length === 0) {
      const demoActivities = [
        { type: 'call', outcome: 'Positive', notes: 'Discussed loan products', institutionName: 'ABC Bank', contactName: 'John Doe', date: new Date().toISOString() },
        { type: 'meeting', outcome: 'Scheduled', notes: 'Product demo scheduled', institutionName: 'XYZ Credit Union', contactName: 'Jane Smith', date: new Date().toISOString() }
      ];
      demoActivities.forEach(activity => this.add('activities', activity));
    }

    if (this.get('tasks').length === 0) {
      const demoTasks = [
        { title: 'Follow up on loan inquiry', description: 'Call ABC Bank about loan products', status: 'pending', priority: 'high', dueDate: new Date(Date.now() + 86400000).toISOString(), assignedTo: 'Sales Team' },
        { title: 'Prepare product demo', description: 'Create demo for XYZ Credit Union', status: 'in-progress', priority: 'medium', dueDate: new Date(Date.now() + 172800000).toISOString(), assignedTo: 'Product Team' }
      ];
      demoTasks.forEach(task => this.add('tasks', task));
    }

    if (this.get('deals').length === 0) {
      const demoDeals = [
        { owner: 'Alice Johnson', name: 'ABC Bank Loan Product', institutionName: 'ABC Bank', stage: 'Proposal', contactName: 'John Doe', description: 'Implementation of new loan management system', expectedRevenue: 500000, leadSource: 'Referral', closingDate: new Date(Date.now() + 2592000000).toISOString() },
        { owner: 'Bob Wilson', name: 'XYZ Digital Banking', institutionName: 'XYZ Credit Union', stage: 'Negotiation', contactName: 'Jane Smith', description: 'Full digital banking transformation', expectedRevenue: 750000, leadSource: 'Website', closingDate: new Date(Date.now() + 5184000000).toISOString() }
      ];
      demoDeals.forEach(deal => this.add('deals', deal));
    }

    if (this.get('tickets').length === 0) {
      const demoTickets = [
        { subject: 'Login issues', priority: 'high', category: 'Technical Support', description: 'Users unable to login to portal', status: 'open', requester: 'ABC Bank', assignedTo: 'Support Team' },
        { subject: 'Feature request', priority: 'medium', category: 'Enhancement', description: 'Request for mobile app', status: 'in-progress', requester: 'XYZ Credit Union', assignedTo: 'Product Team' }
      ];
      demoTickets.forEach(ticket => this.add('tickets', ticket));
    }

    if (this.get('users').length === 0) {
      const demoUsers = [
        { name: 'Admin User', username: 'admin', email: 'admin@crm.com', phone: '+254700000000', employeeId: 'EMP001', jobTitle: 'System Administrator', department: 'IT', role: 'Administrator', manager: '', team: 'IT Team', status: 'active', dateJoined: '2024-01-01', lastLoginDate: new Date().toISOString(), territories: 'Global', specialPermissions: 'Full System Access', notes: 'Primary system administrator' },
        { name: 'Sales Rep', username: 'sales1', email: 'sales@crm.com', phone: '+254711111111', employeeId: 'EMP002', jobTitle: 'Senior Sales Representative', department: 'Sales', role: 'Sales Representative', manager: 'Admin User', team: 'Sales Team', status: 'active', dateJoined: '2024-02-01', lastLoginDate: new Date(Date.now() - 86400000).toISOString(), territories: 'East Africa', specialPermissions: '', notes: 'Experienced sales representative' }
      ];
      demoUsers.forEach(user => this.add('users', user));
    }

    if (this.get('roles').length === 0) {
      const demoRoles = [
        { name: 'Administrator', description: 'Full system access with all permissions', moduleAccess: ['Read', 'Write', 'Edit', 'Delete'], recordAccess: 'All', specialPermissions: 'System Settings, User Management, Audit Logs' },
        { name: 'Manager', description: 'Management level access with team oversight', moduleAccess: ['Read', 'Write', 'Edit', 'Delete'], recordAccess: 'Team', specialPermissions: 'Approve Deals, Team Reports' },
        { name: 'Sales Representative', description: 'Sales focused access for lead and deal management', moduleAccess: ['Read', 'Write', 'Edit'], recordAccess: 'Own', specialPermissions: 'Create Deals, Export Reports' },
        { name: 'Support Agent', description: 'Customer support focused access', moduleAccess: ['Read', 'Write', 'Edit'], recordAccess: 'All', specialPermissions: 'Manage Tickets, Customer Communications' },
        { name: 'Compliance Officer', description: 'Compliance and regulatory focused access', moduleAccess: ['Read', 'Write'], recordAccess: 'All', specialPermissions: 'Compliance Reports, Document Approval' },
        { name: 'Finance Analyst', description: 'Financial reporting and analysis access', moduleAccess: ['Read'], recordAccess: 'Team', specialPermissions: 'Financial Reports, Budget Access' },
        { name: 'Read Only', description: 'View-only access for reporting and analysis', moduleAccess: ['Read'], recordAccess: 'Team', specialPermissions: 'Export Data' }
      ];
      demoRoles.forEach(role => this.add('roles', role));
    }

    if (this.get('teams').length === 0) {
      const demoTeams = [
        { name: 'Sales Team', teamType: 'Sales', teamLead: 'Admin User', members: ['Sales Rep'], territories: 'East Africa, West Africa', description: 'Primary sales team handling client acquisition' },
        { name: 'Support Team', teamType: 'Support', teamLead: 'Admin User', members: [], territories: 'Global', description: 'Customer support and technical assistance' },
        { name: 'Compliance Team', teamType: 'Compliance', teamLead: 'Admin User', members: [], territories: 'Global', description: 'Regulatory compliance and risk management' },
        { name: 'IT Team', teamType: 'Support', teamLead: 'Admin User', members: ['Admin User'], territories: 'Global', description: 'Information technology and system administration' }
      ];
      demoTeams.forEach(team => this.add('teams', team));
    }

    if (this.get('documents').length === 0) {
      const demoDocuments = [
        {
          title: 'ABC Bank Loan Proposal',
          documentType: 'Financial Proposals',
          relatedTo: 'ABC Bank',
          fileName: 'abc_bank_proposal.pdf',
          fileType: 'PDF',
          fileSize: 2457600, // 2.4 MB
          fileStorageLocation: '#',
          versionNumber: '1.0',
          status: 'Approved',
          uploadedBy: 'Admin User',
          uploadDate: new Date().toISOString(),
          lastModifiedBy: 'Admin User',
          modifiedDate: new Date().toISOString(),
          expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 1 year from now
          description: 'Comprehensive loan management system proposal for ABC Bank',
          tags: 'loan, proposal, banking',
          accessPermissions: 'Team',
          signatureStatus: 'Signed',
          signatureDate: new Date().toISOString().split('T')[0],
          signedBy: 'John Doe'
        },
        {
          title: 'XYZ Credit Union KYC Documents',
          documentType: 'KYC Documents',
          relatedTo: 'XYZ Credit Union',
          fileName: 'xyz_kyc_package.pdf',
          fileType: 'PDF',
          fileSize: 1536000, // 1.5 MB
          fileStorageLocation: '#',
          versionNumber: '1.2',
          status: 'Approved',
          uploadedBy: 'Compliance Officer',
          uploadDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week ago
          lastModifiedBy: 'Compliance Officer',
          modifiedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 6 months from now
          description: 'Complete KYC documentation package for XYZ Credit Union',
          tags: 'kyc, compliance, credit union',
          accessPermissions: 'Private',
          signatureStatus: 'Pending',
          signatureDate: null,
          signedBy: null
        },
        {
          title: 'Banking License Application',
          documentType: 'Licenses & Permits',
          relatedTo: 'ABC Bank',
          fileName: 'banking_license.docx',
          fileType: 'DOCX',
          fileSize: 512000, // 512 KB
          fileStorageLocation: '#',
          versionNumber: '2.1',
          status: 'Pending Review',
          uploadedBy: 'Legal Team',
          uploadDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
          lastModifiedBy: 'Legal Team',
          modifiedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          expiryDate: null,
          description: 'Application for new banking license renewal',
          tags: 'license, regulatory, banking',
          accessPermissions: 'Team',
          signatureStatus: 'Unsigned',
          signatureDate: null,
          signedBy: null
        }
      ];
      demoDocuments.forEach(doc => this.add('documents', doc));
    }

    if (this.get('calls').length === 0) {
      const demoCalls = [
        { type: 'inbound', contactId: '1', contactName: 'John Doe', institutionId: '1', institutionName: 'ABC Bank', date: new Date().toISOString(), duration: 15, outcome: 'interested', notes: 'Discussed loan products and digital banking solutions', followUpRequired: true, followUpDate: new Date(Date.now() + 86400000).toISOString(), assignedTo: 'Sales Rep' },
        { type: 'outbound', contactId: '2', contactName: 'Jane Smith', institutionId: '2', institutionName: 'XYZ Credit Union', date: new Date(Date.now() - 86400000).toISOString(), duration: 8, outcome: 'callback-requested', notes: 'Called about mobile banking app, requested callback next week', followUpRequired: true, followUpDate: new Date(Date.now() + 604800000).toISOString(), assignedTo: 'Sales Rep' }
      ];
      demoCalls.forEach(call => this.add('calls', call));
    }

    if (this.get('emails').length === 0) {
      const demoEmails = [
        { type: 'outbound', priority: 'high', contactId: '1', contactName: 'John Doe', contactEmail: 'john.doe@abcbank.co.ke', institutionId: '1', institutionName: 'ABC Bank', subject: 'Proposal for Digital Banking Transformation', body: 'Dear John,\n\nWe are pleased to present our comprehensive digital banking solution...', sendDate: new Date().toISOString(), status: 'sent', responseExpected: true, expectedResponseDate: new Date(Date.now() + 259200000).toISOString(), followUpAction: 'call' },
        { type: 'inbound', priority: 'medium', contactId: '2', contactName: 'Jane Smith', contactEmail: 'jane.smith@xyzcu.co.ke', institutionId: '2', institutionName: 'XYZ Credit Union', subject: 'Re: Mobile Banking App Demo', body: 'Thank you for the demo. We are interested in proceeding...', sendDate: new Date(Date.now() - 172800000).toISOString(), status: 'sent', responseExpected: false }
      ];
      demoEmails.forEach(email => this.add('emails', email));
    }

    if (this.get('whatsapp').length === 0) {
      const demoWhatsapp = [
        { type: 'text', priority: 'normal', contactId: '1', contactName: 'John Doe', contactPhone: '+254700000001', institutionId: '1', institutionName: 'ABC Bank', message: 'Hi John, following up on our call about the loan management system. Are you available for a quick demo?', sendDate: new Date().toISOString(), status: 'delivered', responseExpected: true, expectedResponseDate: new Date(Date.now() + 86400000).toISOString(), followUpAction: 'call' },
        { type: 'text', priority: 'urgent', contactId: '2', contactName: 'Jane Smith', contactPhone: '+254711111113', institutionId: '2', institutionName: 'XYZ Credit Union', message: 'Jane, we have an urgent update regarding your account setup. Please call us back.', sendDate: new Date(Date.now() - 3600000).toISOString(), status: 'read', responseExpected: true, expectedResponseDate: new Date(Date.now() + 7200000).toISOString(), followUpAction: 'call' }
      ];
      demoWhatsapp.forEach(msg => this.add('whatsapp', msg));
    }

    if (this.get('sms').length === 0) {
      const demoSms = [
        { type: 'alert', priority: 'high', contactId: '1', contactName: 'John Doe', contactPhone: '+254700000001', institutionId: '1', institutionName: 'ABC Bank', message: 'URGENT: Your account requires immediate attention. Please contact support.', sendDate: new Date().toISOString(), status: 'delivered', senderId: 'SODESTO', responseExpected: true, expectedResponseDate: new Date(Date.now() + 3600000).toISOString(), followUpAction: 'call' },
        { type: 'marketing', priority: 'normal', contactId: '2', contactName: 'Jane Smith', contactPhone: '+254711111113', institutionId: '2', institutionName: 'XYZ Credit Union', message: 'SODESTO: Special offer - 20% discount on digital banking solutions. Reply YES to learn more.', sendDate: new Date(Date.now() - 86400000).toISOString(), status: 'sent', senderId: 'SODESTO', responseExpected: true, expectedResponseDate: new Date(Date.now() + 604800000).toISOString(), followUpAction: 'email' }
      ];
      demoSms.forEach(sms => this.add('sms', sms));
    }
  }
}

// Global store instance
const store = new CRMStore();

// UI Utilities
function showToast(message, type = 'success') {
  const toastContainer = document.querySelector('.toast-container') || createToastContainer();
  const toast = document.createElement('div');
  toast.className = `toast align-items-center text-white bg-${type} border-0`;
  toast.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">${message}</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
    </div>
  `;
  toastContainer.appendChild(toast);
  const bsToast = new bootstrap.Toast(toast);
  bsToast.show();
  setTimeout(() => toast.remove(), 5000);
}

function createToastContainer() {
  const container = document.createElement('div');
  container.className = 'toast-container position-fixed top-0 end-0 p-3';
  container.style.zIndex = '1080';
  document.body.appendChild(container);
  return container;
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'UGX' }).format(amount);
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-KE');
}

// Dashboard Functions
function buildDashboardCharts() {
  // Pipeline Revenue Chart
  const deals = store.get('deals');
  const stages = ['Lead', 'Qualification', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'];
  const revenueByStage = stages.map(stage => {
    return deals.filter(deal => deal.stage === stage).reduce((sum, deal) => sum + (deal.expectedRevenue || 0), 0);
  });

  const pipelineCtx = document.getElementById('pipelineChart');
  if (pipelineCtx) {
    new Chart(pipelineCtx, {
      type: 'bar',
      data: {
        labels: stages,
        datasets: [{
          label: 'Expected Revenue',
          data: revenueByStage,
          backgroundColor: 'rgba(37,150,190,0.8)',
          borderColor: 'rgba(37,150,190,1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: value => formatCurrency(value)
            }
          }
        }
      }
    });
  }

  // Activities Chart
  const activities = store.get('activities');
  const calls = store.get('calls');
  const emails = store.get('emails');
  const whatsapp = store.get('whatsapp');
  const sms = store.get('sms');
  
  const activityTypes = ['call', 'meeting', 'email', 'whatsapp', 'sms'];
  const activityCounts = [
    activities.filter(a => a.type === 'call').length + calls.length,
    activities.filter(a => a.type === 'meeting').length,
    activities.filter(a => a.type === 'email').length + emails.length,
    whatsapp.length,
    sms.length
  ];

  const activitiesCtx = document.getElementById('activitiesChart');
  if (activitiesCtx) {
    new Chart(activitiesCtx, {
      type: 'doughnut',
      data: {
        labels: activityTypes.map(t => t.charAt(0).toUpperCase() + t.slice(1)),
        datasets: [{
          data: activityCounts,
          backgroundColor: [
            'rgba(37,150,190,0.8)',
            'rgba(54,162,235,0.8)',
            'rgba(255,206,86,0.8)',
            'rgba(75,192,192,0.8)',
            'rgba(153,102,255,0.8)'
          ]
        }]
      },
      options: {
        responsive: true
      }
    });
  }

  // Tasks Status Chart
  const tasks = store.get('tasks');
  const taskStatuses = ['pending', 'in-progress', 'completed'];
  const taskCounts = taskStatuses.map(status => tasks.filter(t => t.status === status).length);

  const tasksCtx = document.getElementById('tasksChart');
  if (tasksCtx) {
    new Chart(tasksCtx, {
      type: 'pie',
      data: {
        labels: taskStatuses.map(s => s.charAt(0).toUpperCase() + s.slice(1).replace('-', ' ')),
        datasets: [{
          data: taskCounts,
          backgroundColor: [
            'rgba(255,193,7,0.8)',
            'rgba(37,150,190,0.8)',
            'rgba(40,167,69,0.8)'
          ]
        }]
      },
      options: {
        responsive: true
      }
    });
  }
}

// Pipeline Board Functions
function buildPipelineBoard() {
  const board = document.getElementById('pipelineBoard');
  if (!board) return;

  const deals = store.get('deals');
  const pipelineStages = store.get('pipelineStages') || [];
  
  // Sort stages by order and use stage names
  const stages = pipelineStages
    .sort((a, b) => (a.order || 999) - (b.order || 999))
    .map(stage => stage.name);

  board.innerHTML = stages.map(stage => `
    <div class="pipeline-column" data-stage="${stage}" ondrop="dropDeal(event)" ondragover="allowDrop(event)">
      <div class="pipeline-column-header">${stage}</div>
      ${deals.filter(deal => deal.stage === stage).map(deal => `
        <div class="deal-card" draggable="true" ondragstart="dragDeal(event)" data-id="${deal.id}">
          <div class="fw-bold">${deal.name}</div>
          <div class="text-muted small">${deal.institutionName}</div>
          <div class="amount">${formatCurrency(deal.expectedRevenue)}</div>
        </div>
      `).join('')}
    </div>
  `).join('');
}

function allowDrop(ev) {
  ev.preventDefault();
  ev.currentTarget.classList.add('drag-over');
}

function dragDeal(ev) {
  ev.dataTransfer.setData("text", ev.target.dataset.id);
}

function dropDeal(ev) {
  ev.preventDefault();
  ev.currentTarget.classList.remove('drag-over');
  const dealId = ev.dataTransfer.getData("text");
  const newStage = ev.currentTarget.dataset.stage;
  
  store.update('deals', dealId, { stage: newStage });
  buildPipelineBoard();
  showToast('Deal moved to ' + newStage);
}

// Form Handlers
function handleInstitutionForm(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const institution = {
    name: formData.get('name'),
    location: formData.get('location'),
    description: formData.get('description'),
    loanPortfolio: formData.get('loanPortfolio'),
    savings: formData.get('savings'),
    shares: formData.get('shares'),
    productsInterested: formData.get('productsInterested'),
    branches: parseInt(formData.get('branches')),
    clients: parseInt(formData.get('clients')),
    email: formData.get('email'),
    phone: formData.get('phone'),
    currentSystem: formData.get('currentSystem')
  };
  
  const editingId = event.target.dataset.editingId;
  if (editingId) {
    store.update('institutions', editingId, institution);
    delete event.target.dataset.editingId;
    bootstrap.Modal.getInstance(document.getElementById('institutionModal')).hide();
    event.target.reset();
    renderInstitutions();
    showToast('Institution updated successfully');
  } else {
    store.add('institutions', institution);
    bootstrap.Modal.getInstance(document.getElementById('institutionModal')).hide();
    event.target.reset();
    renderInstitutions();
    showToast('Institution added successfully');
  }
}

function handleContactForm(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const contact = {
    name: formData.get('name'),
    location: formData.get('location'),
    description: formData.get('description'),
    jobTitle: formData.get('jobTitle'),
    primaryPhone: formData.get('primaryPhone'),
    secondaryPhone: formData.get('secondaryPhone'),
    personalEmail: formData.get('personalEmail'),
    whatsapp: formData.get('whatsapp'),
    marketingChannel: formData.get('marketingChannel'),
    institutionName: formData.get('institutionName')
  };
  
  const editingId = event.target.dataset.editingId;
  if (editingId) {
    store.update('contacts', editingId, contact);
    delete event.target.dataset.editingId;
    bootstrap.Modal.getInstance(document.getElementById('contactModal')).hide();
    event.target.reset();
    renderContacts();
    showToast('Contact updated successfully');
  } else {
    store.add('contacts', contact);
    bootstrap.Modal.getInstance(document.getElementById('contactModal')).hide();
    event.target.reset();
    renderContacts();
    showToast('Contact added successfully');
  }
}

function handleActivityForm(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const activity = {
    type: formData.get('type'),
    title: formData.get('title'),
    startDateTime: formData.get('startDateTime'),
    endDateTime: formData.get('endDateTime'),
    duration: formData.get('duration'),
    communicationChannel: formData.get('communicationChannel'),
    location: formData.get('location'),
    outcome: formData.get('outcome'),
    internalParticipants: formData.get('internalParticipants'),
    externalParticipants: formData.get('externalParticipants'),
    contactName: formData.get('contactName'),
    institutionName: formData.get('institutionName'),
    relatedDeal: formData.get('relatedDeal'),
    notes: formData.get('notes'),
    nextSteps: formData.get('nextSteps'),
    attachments: formData.get('attachments'), // This would need file handling in a real app
    createdBy: 'Current User',
    createdDate: new Date().toISOString(),
    lastModifiedBy: 'Current User',
    modifiedDate: new Date().toISOString()
  };

  store.add('activities', activity);
  showToast('Activity logged successfully');
  window.location.href = 'interactions.html';
}

function handleTaskForm(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const task = {
    title: formData.get('title'),
    description: formData.get('description'),
    taskType: formData.get('taskType'),
    relatedContact: formData.get('relatedContact'),
    relatedDeal: formData.get('relatedDeal'),
    assignedTo: formData.get('assignedTo'),
    createdBy: formData.get('createdBy'),
    priority: formData.get('priority'),
    status: formData.get('status'),
    dueDate: formData.get('dueDate'),
    dueTime: formData.get('dueTime'),
    reminderDateTime: formData.get('reminderDateTime'),
    completionDate: formData.get('completionDate'),
    estimatedHours: formData.get('estimatedHours'),
    actualHours: formData.get('actualHours'),
    blockedBy: formData.get('blockedBy'),
    blocking: formData.get('blocking'),
    subtasks: formData.get('subtasks'),
    comments: formData.get('comments'),
    attachments: formData.get('attachments'), // This would need file handling in a real app
    createdDate: new Date().toISOString()
  };

  store.add('tasks', task);
  showToast('Task created successfully');
  window.location.href = 'interactions.html';
}

function handleDealForm(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const deal = {
    owner: formData.get('owner'),
    name: formData.get('name'),
    institutionName: formData.get('institutionName'),
    stage: 'Lead',
    contactName: formData.get('contactName'),
    description: formData.get('description'),
    expectedRevenue: parseFloat(formData.get('expectedRevenue')),
    leadSource: formData.get('leadSource'),
    closingDate: formData.get('closingDate')
  };
  
  store.add('deals', deal);
  bootstrap.Modal.getInstance(document.getElementById('dealModal')).hide();
  event.target.reset();
  buildPipelineBoard();
  showToast('Deal created successfully');
  window.location.href = 'deals.html';
}

function handleUserForm(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const user = {
    name: formData.get('name'),
    username: formData.get('username'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    employeeId: formData.get('employeeId'),
    jobTitle: formData.get('jobTitle'),
    department: formData.get('department'),
    role: formData.get('role'),
    manager: formData.get('manager'),
    team: formData.get('team'),
    status: formData.get('status') || 'active',
    dateJoined: formData.get('dateJoined'),
    lastLoginDate: formData.get('lastLoginDate'),
    territories: formData.get('territories'),
    specialPermissions: formData.get('specialPermissions'),
    notes: formData.get('notes'),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  // Handle profile photo (simulated)
  const profilePhoto = formData.get('profilePhoto');
  if (profilePhoto && profilePhoto.name) {
    user.profilePhoto = profilePhoto.name; // In a real app, this would be uploaded to a server
  }

  store.add('users', user);
  bootstrap.Modal.getInstance(document.getElementById('userModal')).hide();
  event.target.reset();
  renderUsers();
  showToast('User created successfully');
}

// Render Functions
function renderInstitutions() {
  const tbody = document.querySelector('#institutionsTable tbody');
  if (!tbody) return;
  
  const institutions = store.get('institutions');
  tbody.innerHTML = institutions.map(inst => `
    <tr onclick="window.location.href='institution-detail.html?id=${inst.id}'" style="cursor: pointer;">
      <td>${inst.name}</td>
      <td>${inst.location}</td>
      <td>${inst.loanPortfolio}</td>
      <td>${inst.branches}</td>
      <td>${inst.clients.toLocaleString()}</td>
      <td>${inst.email}</td>
      <td>
        <button class="btn btn-sm btn-outline-brand me-1" onclick="editInstitution('${inst.id}'); event.stopPropagation();">Edit</button>
        <button class="btn btn-sm btn-outline-danger" onclick="deleteInstitution('${inst.id}'); event.stopPropagation();">Delete</button>
      </td>
    </tr>
  `).join('');
}

function renderContacts() {
  const tbody = document.querySelector('#contactsTable tbody');
  if (!tbody) return;
  
  const contacts = store.get('contacts');
  tbody.innerHTML = contacts.map(contact => `
    <tr onclick="window.location.href='contact-detail.html?id=${contact.id}'" style="cursor: pointer;">
      <td>${contact.name}</td>
      <td>${contact.jobTitle}</td>
      <td>${contact.primaryPhone}</td>
      <td>${contact.personalEmail}</td>
      <td>${contact.institutionName}</td>
      <td>
        <button class="btn btn-sm btn-outline-brand me-1" onclick="editContact('${contact.id}'); event.stopPropagation();">Edit</button>
        <button class="btn btn-sm btn-outline-danger" onclick="deleteContact('${contact.id}'); event.stopPropagation();">Delete</button>
      </td>
    </tr>
  `).join('');
}

function renderActivities() {
  const activities = store.get('activities') || [];
  const tbody = document.getElementById('activitiesTableBody');
  if (!tbody) return;
  
  tbody.innerHTML = activities.map(activity => `
    <tr>
      <td><span class="badge bg-${getActivityTypeColor(activity.type)}">${activity.type || 'Note'}</span></td>
      <td>${activity.title || 'N/A'}</td>
      <td>${activity.startDateTime ? new Date(activity.startDateTime).toLocaleString() : 'N/A'}</td>
      <td>${activity.internalParticipants || activity.externalParticipants || 'N/A'}</td>
      <td><span class="badge bg-${getOutcomeColor(activity.outcome)}">${activity.outcome || 'N/A'}</span></td>
      <td>
        <button class="btn btn-sm btn-outline-primary me-1" onclick="editActivity('${activity.id}')">
          <i class="fas fa-edit"></i>
        </button>
        <button class="btn btn-sm btn-outline-danger" onclick="deleteActivity('${activity.id}')">
          <i class="fas fa-trash"></i>
        </button>
      </td>
    </tr>
  `).join('');
}

function getActivityTypeColor(type) {
  const colors = {
    'Call': 'primary',
    'Meeting': 'success',
    'Email': 'info',
    'SMS': 'warning',
    'Note': 'secondary',
    'Site Visit': 'danger'
  };
  return colors[type] || 'secondary';
}

function getOutcomeColor(outcome) {
  const colors = {
    'Positive': 'success',
    'Neutral': 'warning',
    'Negative': 'danger',
    'Scheduled Follow-up': 'info',
    'No Response': 'secondary',
    'Completed': 'success'
  };
  return colors[outcome] || 'secondary';
}

function renderTasks() {
  const tasks = store.get('tasks') || [];
  const tbody = document.getElementById('tasksTableBody');
  if (!tbody) return;
  
  tbody.innerHTML = tasks.map(task => `
    <tr>
      <td>${task.title}</td>
      <td><span class="badge bg-${getTaskTypeColor(task.taskType)}">${task.taskType || 'General'}</span></td>
      <td>${task.assignedTo || 'Unassigned'}</td>
      <td><span class="badge bg-${getPriorityColor(task.priority)}">${task.priority || 'Medium'}</span></td>
      <td><span class="badge bg-${getStatusColor(task.status)}">${task.status || 'Not Started'}</span></td>
      <td>${task.dueDate || 'N/A'}</td>
      <td>
        <button class="btn btn-sm btn-outline-primary me-1" onclick="editTask('${task.id}')">
          <i class="fas fa-edit"></i>
        </button>
        <button class="btn btn-sm btn-outline-danger" onclick="deleteTask('${task.id}')">
          <i class="fas fa-trash"></i>
        </button>
      </td>
    </tr>
  `).join('');
}

function getTaskTypeColor(type) {
  const colors = {
    'Call': 'primary',
    'Email': 'info',
    'Follow-up': 'warning',
    'Document Review': 'secondary',
    'Approval': 'success',
    'Meeting': 'danger',
    'Research': 'dark'
  };
  return colors[type] || 'secondary';
}

function getPriorityColor(priority) {
  const colors = {
    'low': 'success',
    'medium': 'warning',
    'high': 'danger',
    'urgent': 'danger'
  };
  return colors[priority] || 'warning';
}

function getStatusColor(status) {
  const colors = {
    'not-started': 'secondary',
    'in-progress': 'primary',
    'completed': 'success',
    'cancelled': 'danger',
    'on-hold': 'warning'
  };
  return colors[status] || 'secondary';
}

function renderTickets() {
  const tbody = document.querySelector('#ticketsTable tbody');
  if (!tbody) return;
  
  const tickets = store.get('tickets');
  tbody.innerHTML = tickets.map(ticket => `
    <tr>
      <td>${ticket.subject}</td>
      <td><span class="badge bg-${ticket.priority === 'high' ? 'danger' : ticket.priority === 'medium' ? 'warning' : 'secondary'}">${ticket.priority}</span></td>
      <td>${ticket.category}</td>
      <td>${ticket.status}</td>
      <td>${ticket.requester}</td>
      <td>
        <button class="btn btn-sm btn-outline-brand me-1" onclick="editTicket('${ticket.id}')">Edit</button>
        <button class="btn btn-sm btn-outline-danger" onclick="deleteTicket('${ticket.id}')">Delete</button>
      </td>
    </tr>
  `).join('');
}

function renderUsers() {
  const tbody = document.querySelector('#usersTable tbody');
  if (!tbody) return;

  const users = store.get('users');
  tbody.innerHTML = users.map(user => `
    <tr>
      <td>
        ${user.profilePhoto ?
          `<img src="${user.profilePhoto}" alt="Profile" class="rounded-circle" style="width: 32px; height: 32px; object-fit: cover;">` :
          '<i class="fas fa-user-circle text-muted" style="font-size: 32px;"></i>'}
      </td>
      <td>${user.name}</td>
      <td>${user.username || 'N/A'}</td>
      <td>${user.jobTitle || 'N/A'}</td>
      <td>${user.department}</td>
      <td><span class="badge bg-${getRoleColor(user.role)}">${user.role}</span></td>
      <td>${user.team || 'N/A'}</td>
      <td><span class="badge bg-${user.status === 'active' ? 'success' : user.status === 'inactive' ? 'secondary' : 'warning'}">${user.status}</span></td>
      <td>${user.lastLoginDate ? new Date(user.lastLoginDate).toLocaleDateString() : 'Never'}</td>
      <td>
        <button class="btn btn-sm btn-outline-brand me-1" onclick="editUser('${user.id}')">
          <i class="fas fa-edit"></i>
        </button>
        <button class="btn btn-sm btn-outline-danger" onclick="deleteUser('${user.id}')">
          <i class="fas fa-trash"></i>
        </button>
      </td>
    </tr>
  `).join('');
}

function getRoleColor(role) {
  const colors = {
    'Administrator': 'danger',
    'Manager': 'warning',
    'Sales Representative': 'primary',
    'Support Agent': 'info',
    'Compliance Officer': 'secondary',
    'Finance Analyst': 'success',
    'Read Only': 'light'
  };
  return colors[role] || 'secondary';
}

function renderDocuments() {
  const tbody = document.getElementById('documentsTableBody');
  if (!tbody) return;
  
  const documents = store.get('documents') || [];
  tbody.innerHTML = documents.map(doc => `
    <tr>
      <td>
        <div class="fw-bold">${doc.title}</div>
        <small class="text-muted">${doc.description || ''}</small>
      </td>
      <td><span class="badge bg-${getDocumentTypeColor(doc.documentType)}">${doc.documentType}</span></td>
      <td>${doc.relatedTo || 'N/A'}</td>
      <td>
        <i class="fas ${getFileIcon(doc.fileType)} me-2"></i>
        ${doc.fileName || 'N/A'}
        <br><small class="text-muted">${formatFileSize(doc.fileSize)}</small>
      </td>
      <td><span class="badge bg-${getStatusColor(doc.status)}">${doc.status}</span></td>
      <td>${doc.uploadDate ? new Date(doc.uploadDate).toLocaleDateString() : 'N/A'}</td>
      <td>
        <div class="btn-group" role="group">
          <button class="btn btn-sm btn-outline-primary" onclick="viewDocument('${doc.id}')">
            <i class="fas fa-eye"></i>
          </button>
          <button class="btn btn-sm btn-outline-info" onclick="downloadDocument('${doc.id}')">
            <i class="fas fa-download"></i>
          </button>
          <button class="btn btn-sm btn-outline-secondary" onclick="editDocument('${doc.id}')">
            <i class="fas fa-edit"></i>
          </button>
          <button class="btn btn-sm btn-outline-danger" onclick="deleteDocument('${doc.id}')">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

function renderCalls() {
  const tbody = document.getElementById('callsTableBody');
  if (!tbody) return;
  
  const calls = store.get('calls') || [];
  tbody.innerHTML = calls.map(call => `
    <tr>
      <td><span class="badge bg-${call.type === 'inbound' ? 'success' : 'primary'}">${call.type}</span></td>
      <td>${call.contactName}</td>
      <td>${call.institutionName}</td>
      <td>${call.duration} min</td>
      <td><span class="badge bg-${getCallOutcomeColor(call.outcome)}">${call.outcome}</span></td>
      <td>${new Date(call.date).toLocaleString()}</td>
      <td>
        <button class="btn btn-sm btn-outline-primary me-1" onclick="editCall('${call.id}')">
          <i class="fas fa-edit"></i>
        </button>
        <button class="btn btn-sm btn-outline-danger" onclick="deleteCall('${call.id}')">
          <i class="fas fa-trash"></i>
        </button>
      </td>
    </tr>
  `).join('');
}

function renderEmails() {
  const tbody = document.getElementById('emailsTableBody');
  if (!tbody) return;
  
  const emails = store.get('emails') || [];
  tbody.innerHTML = emails.map(email => `
    <tr>
      <td>${email.subject}</td>
      <td>${email.contactName}</td>
      <td>${email.institutionName}</td>
      <td><span class="badge bg-${email.status === 'sent' ? 'success' : 'warning'}">${email.status}</span></td>
      <td>${new Date(email.sendDate).toLocaleString()}</td>
      <td>${email.responseExpected ? 'Yes' : 'No'}</td>
      <td>
        <button class="btn btn-sm btn-outline-primary me-1" onclick="editEmail('${email.id}')">
          <i class="fas fa-edit"></i>
        </button>
        <button class="btn btn-sm btn-outline-danger" onclick="deleteEmail('${email.id}')">
          <i class="fas fa-trash"></i>
        </button>
      </td>
    </tr>
  `).join('');
}

function renderWhatsapp() {
  const tbody = document.getElementById('whatsappTableBody');
  if (!tbody) return;
  
  const whatsapp = store.get('whatsapp') || [];
  tbody.innerHTML = whatsapp.map(msg => `
    <tr>
      <td><span class="badge bg-${msg.type === 'text' ? 'success' : 'info'}">${msg.type}</span></td>
      <td>${msg.contactName}</td>
      <td>${msg.institutionName}</td>
      <td><div style="max-width: 200px; overflow: hidden; text-overflow: ellipsis;">${msg.message}</div></td>
      <td><span class="badge bg-${getWhatsappStatusColor(msg.status)}">${msg.status}</span></td>
      <td>${new Date(msg.sendDate).toLocaleString()}</td>
      <td>
        <button class="btn btn-sm btn-outline-primary me-1" onclick="editWhatsapp('${msg.id}')">
          <i class="fas fa-edit"></i>
        </button>
        <button class="btn btn-sm btn-outline-danger" onclick="deleteWhatsapp('${msg.id}')">
          <i class="fas fa-trash"></i>
        </button>
      </td>
    </tr>
  `).join('');
}

function renderSms() {
  const tbody = document.getElementById('smsTableBody');
  if (!tbody) return;
  
  const sms = store.get('sms') || [];
  tbody.innerHTML = sms.map(msg => `
    <tr>
      <td><span class="badge bg-${getSmsTypeColor(msg.type)}">${msg.type}</span></td>
      <td>${msg.contactName}</td>
      <td>${msg.institutionName}</td>
      <td><div style="max-width: 200px; overflow: hidden; text-overflow: ellipsis;">${msg.message}</div></td>
      <td><span class="badge bg-${getSmsStatusColor(msg.status)}">${msg.status}</span></td>
      <td>${new Date(msg.sendDate).toLocaleString()}</td>
      <td>
        <button class="btn btn-sm btn-outline-primary me-1" onclick="editSms('${msg.id}')">
          <i class="fas fa-edit"></i>
        </button>
        <button class="btn btn-sm btn-outline-danger" onclick="deleteSms('${msg.id}')">
          <i class="fas fa-trash"></i>
        </button>
      </td>
    </tr>
  `).join('');
}

function getCallOutcomeColor(outcome) {
  const colors = {
    'completed': 'success',
    'interested': 'primary',
    'callback-requested': 'warning',
    'no-answer': 'secondary',
    'busy': 'info',
    'wrong-number': 'danger',
    'not-interested': 'danger',
    'follow-up': 'info'
  };
  return colors[outcome] || 'secondary';
}

function getWhatsappStatusColor(status) {
  const colors = {
    'sent': 'primary',
    'delivered': 'info',
    'read': 'success',
    'failed': 'danger'
  };
  return colors[status] || 'secondary';
}

function getSmsTypeColor(type) {
  const colors = {
    'text': 'primary',
    'alert': 'danger',
    'marketing': 'success',
    'transactional': 'info',
    'broadcast': 'warning'
  };
  return colors[type] || 'secondary';
}

function getSmsStatusColor(status) {
  const colors = {
    'draft': 'secondary',
    'sent': 'primary',
    'delivered': 'info',
    'failed': 'danger',
    'pending': 'warning'
  };
  return colors[status] || 'secondary';
}

function getDocumentTypeColor(type) {
  const colors = {
    'Financial Proposals': 'primary',
    'Contracts & Agreements': 'success',
    'KYC Documents': 'warning',
    'Identity Documents': 'info',
    'Proof of Address': 'secondary',
    'Bank Statements': 'dark',
    'Tax Returns': 'danger',
    'Financial Statements': 'primary',
    'Licenses & Permits': 'success',
    'Correspondence': 'info',
    'Presentations': 'warning',
    'Reports': 'secondary',
    'Other': 'dark'
  };
  return colors[type] || 'secondary';
}

function getFileIcon(type) {
  const icons = {
    'pdf': 'fa-file-pdf text-danger',
    'doc': 'fa-file-word text-primary',
    'docx': 'fa-file-word text-primary',
    'xls': 'fa-file-excel text-success',
    'xlsx': 'fa-file-excel text-success',
    'ppt': 'fa-file-powerpoint text-warning',
    'pptx': 'fa-file-powerpoint text-warning',
    'txt': 'fa-file-text',
    'jpg': 'fa-file-image text-info',
    'jpeg': 'fa-file-image text-info',
    'png': 'fa-file-image text-info'
  };
  return icons[type?.toLowerCase()] || 'fa-file';
}

function formatFileSize(bytes) {
  if (!bytes) return 'N/A';
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 Bytes';
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
}

function getStatusColor(status) {
  const colors = {
    'Draft': 'secondary',
    'Pending Review': 'warning',
    'Approved': 'info',
    'Signed': 'success',
    'Expired': 'danger',
    'Archived': 'dark'
  };
  return colors[status] || 'secondary';
}

// CSV Export/Import Functions
function exportToCSV(data, filename) {
  if (data.length === 0) {
    showToast('No data to export');
    return;
  }
  const headers = Object.keys(data[0]);
  const csv = [headers.join(',')].concat(data.map(row => headers.map(h => `"${row[h] || ''}"`).join(','))).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
  showToast(`${filename} exported successfully`);
}

function exportInstitutions() {
  exportToCSV(store.get('institutions'), 'institutions.csv');
}

function exportContacts() {
  exportToCSV(store.get('contacts'), 'contacts.csv');
}

function importInstitutions(input) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    const csv = e.target.result;
    const lines = csv.split('\n').filter(line => line.trim());
    if (lines.length < 2) {
      showToast('Invalid CSV file');
      return;
    }
    const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim());
    const data = lines.slice(1).map(line => {
      const values = line.split(',').map(v => v.replace(/"/g, '').trim());
      const obj = {};
      headers.forEach((h, i) => obj[h] = values[i] || '');
      // Add id if not present
      if (!obj.id) obj.id = Date.now() + Math.random();
      return obj;
    });
    data.forEach(inst => store.add('institutions', inst));
    renderInstitutions();
    showToast(`${data.length} institutions imported`);
  };
  reader.readAsText(file);
  input.value = ''; // Reset input
}

function importContacts(input) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    const csv = e.target.result;
    const lines = csv.split('\n').filter(line => line.trim());
    if (lines.length < 2) {
      showToast('Invalid CSV file');
      return;
    }
    const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim());
    const data = lines.slice(1).map(line => {
      const values = line.split(',').map(v => v.replace(/"/g, '').trim());
      const obj = {};
      headers.forEach((h, i) => obj[h] = values[i] || '');
      // Add id if not present
      if (!obj.id) obj.id = Date.now() + Math.random();
      return obj;
    });
    data.forEach(cont => store.add('contacts', cont));
    renderContacts();
    showToast(`${data.length} contacts imported`);
  };
  reader.readAsText(file);
  input.value = ''; // Reset input
}

// Delete Functions
function deleteInstitution(id) {
  if (confirm('Are you sure you want to delete this institution?')) {
    store.delete('institutions', id);
    renderInstitutions();
    showToast('Institution deleted');
  }
}

function deleteContact(id) {
  if (confirm('Are you sure you want to delete this contact?')) {
    store.delete('contacts', id);
    renderContacts();
    showToast('Contact deleted');
  }
}

function deleteActivity(id) {
  if (confirm('Are you sure you want to delete this activity?')) {
    store.delete('activities', id);
    renderActivities();
    showToast('Activity deleted');
  }
}

function deleteTask(id) {
  if (confirm('Are you sure you want to delete this task?')) {
    store.delete('tasks', id);
    renderTasks();
    showToast('Task deleted');
  }
}

function deleteTicket(id) {
  if (confirm('Are you sure you want to delete this ticket?')) {
    store.delete('tickets', id);
    renderTickets();
    showToast('Ticket deleted');
  }
}

function deleteUser(id) {
  if (confirm('Are you sure you want to delete this user?')) {
    store.delete('users', id);
    renderUsers();
    showToast('User deleted');
  }
}

function viewDocument(id) {
  const documents = store.get('documents') || [];
  const doc = documents.find(d => d.id === id);
  if (!doc) return;

  const details = document.getElementById('documentDetails');
  if (details) {
    details.innerHTML = `
      <div class="row">
        <div class="col-md-8">
          <h6>Document Information</h6>
          <table class="table table-sm">
            <tr><td><strong>Title:</strong></td><td>${doc.title}</td></tr>
            <tr><td><strong>Type:</strong></td><td>${doc.documentType}</td></tr>
            <tr><td><strong>Related To:</strong></td><td>${doc.relatedTo || 'N/A'}</td></tr>
            <tr><td><strong>Status:</strong></td><td>${doc.status}</td></tr>
            <tr><td><strong>Uploaded By:</strong></td><td>${doc.uploadedBy}</td></tr>
            <tr><td><strong>Upload Date:</strong></td><td>${doc.uploadDate ? new Date(doc.uploadDate).toLocaleString() : 'N/A'}</td></tr>
            <tr><td><strong>Expiry Date:</strong></td><td>${doc.expiryDate ? new Date(doc.expiryDate).toLocaleString() : 'N/A'}</td></tr>
            <tr><td><strong>Access:</strong></td><td>${doc.accessPermissions}</td></tr>
            <tr><td><strong>Signature Status:</strong></td><td>${doc.signatureStatus}</td></tr>
          </table>
        </div>
        <div class="col-md-4">
          <h6>File Details</h6>
          <table class="table table-sm">
            <tr><td><strong>File Name:</strong></td><td>${doc.fileName}</td></tr>
            <tr><td><strong>File Type:</strong></td><td>${doc.fileType}</td></tr>
            <tr><td><strong>File Size:</strong></td><td>${formatFileSize(doc.fileSize)}</td></tr>
            <tr><td><strong>Version:</strong></td><td>${doc.versionNumber || '1.0'}</td></tr>
          </table>
        </div>
      </div>
      ${doc.description ? `<div class="mt-3"><strong>Description:</strong><br>${doc.description}</div>` : ''}
      ${doc.tags ? `<div class="mt-2"><strong>Tags:</strong> ${doc.tags}</div>` : ''}
    `;

    new bootstrap.Modal(document.getElementById('documentModal')).show();
  }
}

function downloadDocument(id) {
  const documents = store.get('documents') || [];
  const doc = documents.find(d => d.id === id);
  if (doc && doc.fileStorageLocation && doc.fileStorageLocation !== '#') {
    window.open(doc.fileStorageLocation, '_blank');
  } else {
    showToast('File not available for download', 'warning');
  }
}

function editDocument(id) {
  window.location.href = `create-document.html?edit=${id}`;
}

function deleteDocument(id) {
  if (confirm('Are you sure you want to delete this document?')) {
    store.delete('documents', id);
    renderDocuments();
    showToast('Document deleted successfully');
  }
}

function deleteCall(id) {
  if (confirm('Are you sure you want to delete this call?')) {
    store.delete('calls', id);
    renderCalls();
    showToast('Call deleted successfully');
  }
}

function deleteEmail(id) {
  if (confirm('Are you sure you want to delete this email?')) {
    store.delete('emails', id);
    renderEmails();
    showToast('Email deleted successfully');
  }
}

function deleteWhatsapp(id) {
  if (confirm('Are you sure you want to delete this WhatsApp message?')) {
    store.delete('whatsapp', id);
    renderWhatsapp();
    showToast('WhatsApp message deleted successfully');
  }
}

function deleteSms(id) {
  if (confirm('Are you sure you want to delete this SMS?')) {
    store.delete('sms', id);
    renderSms();
    showToast('SMS deleted successfully');
  }
}

// Edit Functions (placeholders for now)
function editInstitution(id) { window.location.href = 'leads.html?editInstitution=' + id; }
function editContact(id) { window.location.href = 'leads.html?editContact=' + id; }
function editActivity(id) { showToast('Edit functionality coming soon'); }
function editTask(id) { showToast('Edit functionality coming soon'); }
function editTicket(id) {
  window.location.href = `create-ticket.html?edit=${id}`;
}
function editUser(id) {
  window.location.href = `create-user.html?edit=${id}`;
}

function editCall(id) {
  window.location.href = `create-call.html?edit=${id}`;
}

function editEmail(id) {
  window.location.href = `create-email.html?edit=${id}`;
}

function editWhatsapp(id) {
  window.location.href = `create-whatsapp.html?edit=${id}`;
}

function editSms(id) {
  window.location.href = `create-sms.html?edit=${id}`;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  // Set active nav link
  const currentPage = window.location.pathname.split('/').pop();
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });

  // Initialize dashboard if on index page
  if (document.getElementById('pipelineChart')) {
    buildDashboardCharts();
  }

  // Initialize pipeline board if on deals page
  if (document.getElementById('pipelineBoard')) {
    buildPipelineBoard();
  }

  // Initialize tables and lists
  renderInstitutions();
  renderContacts();
  renderActivities();
  renderTasks();
  renderTickets();
  renderUsers();
  renderDocuments();
  renderCalls();
  renderEmails();
  renderWhatsapp();
  renderSms();
});