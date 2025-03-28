# Dynamic Form Builder

This project is a **Dynamic Form Builder** application built with Angular. It allows users to create, manage, and interact with dynamic forms. The application supports role-based access control, with separate functionalities for **admin** and **user** roles.

## Features

### Admin Features
- **Form Builder**: Admins can create dynamic forms by dragging and dropping form fields.
- **Form Management**: Admins can save, update, and delete forms.
- **Role-Based Access**: Admin login is restricted to a default admin username and password for security.

### User Features
- **Form Interaction**: Users can view and fill out forms created by the admin.
- **Form Submission**: Users can submit form data, which is saved to the backend.

### Authentication
- **Login**: Role-based login functionality for admin and user accounts.
- **Signup**: Users can create accounts (admin account creation is restricted).
- **Logout**: Secure logout functionality to clear session data.

### Backend Integration
- **REST API**: The application interacts with a mock backend (JSON server) to fetch, save, and delete forms and user data.
- **BehaviorSubject**: Used for state management to keep the application reactive and up-to-date.

## Development Setup

### Prerequisites
- Node.js and npm installed
- Angular CLI installed globally (`npm install -g @angular/cli`)
- JSON Server for mock backend (`npm install -g json-server`)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/dynamic-form-builder.git
   cd dynamic-form-builder

2. Install dependencies:
    npm install

3. Start the JSON server:
    json-server --watch db.json --port 5000

4. Running the Angular development server:
     ng serve
 
Running the Application
Navigate to http://localhost:4200/ in your browser.
Use the default admin credentials to<vscode_annotation details='%5B%7B%22title%22%3A%22hardcoded-credentials%22%2C%22description%22%3A%22Embedding%20credentials%20in%20source%20code%20risks%20unauthorized%20access%22%7D%5D'> log</vscode_annotation> in as an admin:
Username: Sumanth
Password: Sumanth@9
Users can sign up and log in with their credentials.
Testing
Unit Tests
Run the following command to execute unit tests via Karma:
  ng test
End-to-End Tests
Run the following command to execute end-to-end tests:
 ng e2e
 
Project Structure
Key Components
Form Builder: Allows admins to design forms dynamically.
Form List: Displays forms for users to interact with.
Login and Signup: Handles authentication and user management.
Services
AuthService: Manages authentication, role-based access, and session handling.
FormService: Handles CRUD operations for forms and manages state using BehaviorSubject.
Models
FormTemplate: Represents the structure of a form, including fields and metadata.
Future Enhancements
Add validation for form fields during creation.
Implement pagination for form lists.
Enhance security with JWT-based authentication.
Add support for exporting forms as JSON or PDF.
Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

License
This project is licensed under the MIT License. See the LICENSE file for details.


### Key Updates:
1. **Features**: Highlighted admin and user functionalities, authentication, and backend integration.
2. **Setup Instructions**: Detailed steps for setting up the project locally.
3. **Testing**: Included instructions for running unit and end-to-end tests.
4. **Future Enhancements**: Suggested improvements for the project.
