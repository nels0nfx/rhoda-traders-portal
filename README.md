# Rhoda Traders Employment Portal

A comprehensive employment portal for Rhoda Traders allowing user registration, admin approval, and remote work management.

## 🏢 Features

1. **User Registration System**
   - Application form with personal details, experience, skills
   - Document upload (resume, certificates)
   - Email verification
   - Waiting for admin approval status

2. **Admin Panel**
   - Review and approve/reject applications
   - Manage existing team members
   - Dashboard with statistics
   - User management system
   - Tawk.to live chat integration

3. **Company Information**
   - About Rhoda Traders
   - Company description
   - Mission and values
   - Team structure

4. **Public Pages**
   - Home page with company overview
   - Available positions
   - Team showcase (approved members)
   - Contact information

5. **User Dashboard**
   - Application status tracking
   - Profile management
   - Document management
   - Communication with admin

## 🚀 Technologies Used

- HTML5, CSS3, JavaScript
- Firebase Authentication
- Firebase Firestore Database
- Firebase Storage
- Firebase Hosting

## 📋 Installation and Setup

### Prerequisites

- Node.js and npm
- Firebase CLI (`npm install -g firebase-tools`)

### Setup Instructions

1. **Clone the repository:**
   ```
   git clone https://github.com/nels0nfx/rhoda-traders-portal.git
   cd rhoda-traders-portal
   ```

2. **Install Firebase CLI (if not already installed):**
   ```
   npm install -g firebase-tools
   ```

3. **Login to Firebase:**
   ```
   firebase login
   ```

4. **Initialize Firebase:**
   ```
   firebase init
   ```
   - Select Hosting, Firestore, and Storage
   - Select your Firebase project (rhoda-traders)
   - Use the following configuration:
     - Public directory: `.` (current directory)
     - Configure as a single-page app: `No`
     - Set up automatic builds and deploys with GitHub: `No`
     - Use the existing firestore.rules file
     - Use the existing storage.rules file

5. **Deploy to Firebase:**
   ```
   firebase deploy
   ```

## 🔒 Firebase Security Rules

This project includes security rules for Firestore and Storage to ensure data protection:

- `firestore.rules`: Rules for database access
- `storage.rules`: Rules for file storage access

## 🧩 Project Structure

```
rhoda-traders-portal/
├── css/
│   └── styles.css
├── images/
│   └── logo.jpeg
├── js/
│   ├── main.js
│   └── firebase.js
├── pages/
│   ├── about.html
│   ├── apply.html
│   ├── contact.html
│   ├── job-description.html
│   ├── login.html
│   ├── admin/
│   │   ├── index.html
│   │   └── applications.html
│   └── dashboard/
│       ├── index.html
│       └── reports.html
├── firestore.rules
├── storage.rules
├── firebase.json
└── index.html
```

## 👤 User Roles

1. **Guest**: Can view public pages and apply for positions
2. **Applicant**: Has submitted an application but is not yet approved
3. **Worker**: Approved user who can submit reports and manage shipments
4. **Admin**: Can manage all aspects of the portal

## 🔧 Customization

To customize the portal for your needs:

1. Update the company information in the HTML files
2. Modify the CSS in `css/styles.css` to match your brand colors
3. Update the Firebase configuration in `js/firebase.js` if needed

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For questions or support, please contact:
- Email: [your-email@example.com]
- GitHub: [@nels0nfx](https://github.com/nels0nfx)