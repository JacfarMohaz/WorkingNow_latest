# User Management Section

## Overview
The User Management section provides comprehensive user administration capabilities for the WorkingNow SaaS system. This section is accessible only to administrators and includes two main pages with full CRUD operations.

## Features

### 📌 Sidebar Navigation
- **User Management** dropdown menu in the dashboard sidebar
- Collapsible design with smooth animations
- Dark/light mode compatible styling
- Two sub-pages: User Configuration and Add User

### 🧭 User Configuration Page (`/dashboard/users/config`)

#### Stats Dashboard
- **Total Users**: Shows count of all registered users
- **Active Users**: Displays currently active accounts
- **Deleted Users**: Shows soft-deleted accounts

#### Search Functionality
- Real-time search across user names, emails, and roles
- Responsive search bar with icon

#### User Management Table
- **Columns**: Name, Email, Role, Status, Created Date, Actions
- **Status Badges**: Active (green), Inactive (yellow), Deleted (red)
- **Action Buttons**:
  - ✅ Activate/Deactivate toggle
  - 🔁 Reset Password (mock functionality)
  - 🗑 Delete User (soft delete)
  - 🔄 Restore User (for deleted users)

### 🧭 Add User Page (`/dashboard/users/add`)

#### User Creation Form
- **Fields**: Full Name, Email, Phone, Role, Password
- **Role Options**: Finance Head, Finance Team, Procurement Head, Procurement Team, Program Manager Head, Program Manager Team, HR Manager, Donor
- **Password Field**: Toggle visibility with eye icon
- **Validation**: Required fields and email uniqueness check

#### User Management Table
- **Search Bar**: Filter existing users
- **Columns**: Name, Email, Phone, Role, Status, Created Date, Actions
- **Action Buttons**:
  - ✏️ Edit User (populates form for editing)
  - 🗑 Delete User (permanent deletion)

## Technical Implementation

### Components Used
- **shadcn/ui**: Card, Input, Button, Badge, Label
- **Lucide React**: Icons for actions and navigation
- **Tailwind CSS**: Responsive design and dark/light mode
- **React Hooks**: useState, useMemo for state management

### State Management
- **Mock Data**: Comprehensive user data for demonstration
- **Local State**: All operations use React state (no backend required)
- **Real-time Updates**: Immediate UI updates for all actions

### Responsive Design
- **Desktop**: Full table layout with all columns
- **Mobile**: Responsive tables with horizontal scroll
- **Breakpoints**: Optimized for all screen sizes

### Dark/Light Mode
- **Automatic**: Follows system theme preference
- **Consistent**: All components support both themes
- **Accessible**: High contrast ratios maintained

## Usage Instructions

### For Administrators
1. **Access**: Navigate to Dashboard → User Management
2. **User Configuration**: View stats and manage existing users
3. **Add User**: Create new accounts and edit existing ones
4. **Search**: Use search bars to quickly find specific users
5. **Actions**: Click action buttons to perform user operations

### User Operations
- **Create**: Fill form and submit to add new user
- **Edit**: Click edit button, modify form, save changes
- **Delete**: Click delete button, confirm action
- **Activate/Deactivate**: Toggle user status
- **Reset Password**: Send password reset email (mock)

## Security Features
- **Admin Only**: Access restricted to administrator role
- **Soft Delete**: Users are marked as deleted, not permanently removed
- **Validation**: Form validation prevents invalid data
- **Confirmation**: Delete actions require user confirmation

## Future Enhancements
- **Backend Integration**: Connect to real API endpoints
- **Bulk Operations**: Select multiple users for batch actions
- **User Permissions**: Granular role-based access control
- **Audit Log**: Track all user management activities
- **Email Notifications**: Real password reset functionality

## File Structure
```
src/app/dashboard/users/
├── config/
│   └── page.tsx          # User Configuration page
├── add/
│   └── page.tsx          # Add User page
└── page.tsx              # Redirect to config page

src/components/ui/
└── badge.tsx             # Badge component for status display
```

## Dependencies
- Next.js 15.3.4
- React 19.0.0
- Tailwind CSS 3.4.17
- shadcn/ui components
- Lucide React icons
- TypeScript 5.x 