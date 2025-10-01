# Fintech CRM System

A comprehensive Customer Relationship Management (CRM) system designed specifically for fintech companies to manage financial institutions, contacts, sales pipeline, customer support, and user administration.

## Features

### 🏢 Leads Management
- **Financial Institutions**: Track banks, credit unions, and other financial entities
  - Institution details: Name, location, loan portfolio, savings, shares, products interested in
  - Contact information: Branches, clients, email, phone numbers
  - Current systems and requirements
- **Contacts**: Manage key personnel within institutions
  - Personal details: Name, job title, location, phones, email
  - Marketing channels and communication preferences

### 📞 Interactions Tracking
- **Activities**: Log all customer interactions
  - Types: Calls, meetings, emails, WhatsApp, SMS
  - Outcomes and detailed notes
  - Link to specific institutions and contacts
- **Tasks**: Manage follow-up actions and deadlines
  - Priority levels and assignment
  - Status tracking and due dates

### 💼 Sales Pipeline
- **Deal Management**: Track sales opportunities through the pipeline
  - Drag-and-drop pipeline board with stages
  - Revenue forecasting and deal values
  - Lead sources and closing dates
- **Pipeline Analytics**: Visual representation of sales progress

### 🎧 Customer Support
- **Ticket System**: Comprehensive support ticket management
  - Priority levels and categories
  - Status workflow and assignment
  - Requester tracking and resolution times

### 👥 User Management
- **Role-Based Access**: Different permission levels
  - Administrators, Sales Representatives, Support Agents, Read-Only users
- **Department Organization**: Group users by department
- **Permission Matrix**: Clear role definitions and capabilities

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **UI Framework**: Bootstrap 5.3.2
- **Icons**: Font Awesome 6.4.2
- **Charts**: Chart.js for data visualization
- **Storage**: Browser localStorage (demo purposes)
- **Design**: Custom responsive design with brand color scheme

## Color Scheme

- Primary Brand Color: `rgba(37, 150, 190)`
- Consistent theming across all components

## File Structure

```
fintech-crm/
├── index.html              # Main dashboard
├── leads.html              # Institutions and contacts management
├── interactions.html       # Activities and tasks
├── deals.html              # Sales pipeline
├── support.html            # Customer support tickets
├── users.html              # User management
├── assets/
│   ├── css/
│   │   └── style.css       # Main stylesheet
│   └── js/
│       └── main.js         # Core application logic
└── README.md               # This file
```

## Getting Started

1. **Clone or Download** the project files
2. **Open** `index.html` in a modern web browser
3. **Seed Demo Data** using the button on the dashboard
4. **Navigate** through different modules using the sidebar

## Demo Data

The application includes comprehensive demo data for testing:
- Sample financial institutions (ABC Bank, XYZ Credit Union)
- Contact persons with various roles
- Activity logs and task assignments
- Sales deals in different pipeline stages
- Support tickets with various priorities
- User accounts with different roles

## Key Features

### Dashboard Analytics
- Real-time statistics and KPIs
- Interactive charts for pipeline revenue, activities distribution, and task status
- Recent activities and ticket timelines

### Responsive Design
- Mobile-friendly interface
- Adaptive layouts for different screen sizes
- Touch-friendly interactions

### Data Persistence
- All data stored locally in browser
- Automatic saving of all changes
- Demo data seeding capability

### Form Validation
- Required field validation
- Input type checking
- User-friendly error messages

## Browser Compatibility

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Future Enhancements

- Backend API integration
- Advanced reporting and analytics
- Email integration
- File attachments for tickets
- Advanced user permissions
- Data export/import functionality
- Mobile app version

## License

This project is for demonstration purposes. Modify and use according to your needs.

## Support

For questions or issues, please check the code comments or create an issue in the repository.