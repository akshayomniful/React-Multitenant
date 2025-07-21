# RBAC Multi-Tenant Application: Role Functionality Breakdown

This application implements a comprehensive Role-Based Access Control (RBAC) system across multiple tenants. Let's break down each role and how they function within the system:

## Role Overview

The application has three primary roles:

1. **Admin**
2. **Editor**
3. **Viewer**

Each role has specific permissions that determine what actions they can perform and what resources they can access within their tenant.

## 1. Admin Role

**Permission Definition**: `{ action: 'manage', subject: 'all' }`

### What Admins Can Do:

- **Full System Access**: Admins have complete access to all features and functionality within their tenant
- **User Management**: Can view, create, edit, and delete users (in the Settings page)
- **Role Management**: Can assign and modify roles for users in their tenant
- **Article Management**: Full CRUD (Create, Read, Update, Delete) operations on all articles
- **Settings Access**: Can access and modify tenant settings and configurations
- **Multi-step Form**: Can access all steps of the multi-step form

### Admin-Specific UI Elements:

- **Settings Page**: Only admins can access this page
- **User Management Panel**: Only visible to admins
- **Role Configuration**: Only admins can modify role permissions
- **All Action Buttons**: Edit, Delete, View buttons for all resources

### Admin Workflow Example:

1. Admin logs in and sees the full dashboard with all navigation options
2. They can access the Settings page to manage tenant configuration
3. They can create, edit, and delete any article regardless of who created it
4. They can access all steps of the multi-step form
5. They can see and manage all users within their tenant

## 2. Editor Role

**Permission Definitions**:
```
{ action: 'read', subject: 'Article' }
{ action: 'create', subject: 'Article' }
{ action: 'update', subject: 'Article' }
{ action: 'delete', subject: 'Article', conditions: { authorId: '${user.id}' } }
{ action: 'read', subject: 'Dashboard' }
{ action: 'access', subject: 'form-step-1' }
{ action: 'access', subject: 'form-step-2' }
```

### What Editors Can Do:

- **Article Management**: 
  - Can view all articles in their tenant
  - Can create new articles
  - Can edit any article in their tenant
  - Can only delete articles they authored
- **Dashboard Access**: Can view the dashboard and its analytics
- **Multi-step Form**: Can access steps 1 and 2, but not step 3 (admin-only)

### Editor-Specific UI Elements:

- **Create Article Button**: Visible to editors
- **Edit Button**: Visible for all articles
- **Delete Button**: Only visible for articles they authored
- **Form Steps**: Can see and interact with steps 1 and 2

### Editor Workflow Example:

1. Editor logs in and sees the dashboard with limited navigation options
2. They cannot access the Settings page (not in sidebar)
3. They can view all articles in their tenant
4. They can create new articles and edit existing ones
5. They can only delete articles they created
6. In the multi-step form, they can access steps 1 and 2, but not step 3

## 3. Viewer Role

**Permission Definitions**:
```
{ action: 'read', subject: 'Article' }
{ action: 'read', subject: 'Dashboard' }
{ action: 'access', subject: 'form-step-1' }
```

### What Viewers Can Do:

- **Read-Only Access**: Can only view content, not modify it
- **Article Viewing**: Can view all articles in their tenant
- **Dashboard Access**: Can view the dashboard with limited information
- **Multi-step Form**: Can only access step 1

### Viewer-Specific UI Elements:

- **View Button**: Can only see view buttons for articles
- **No Edit/Delete Buttons**: These actions are hidden
- **No Create Button**: Cannot create new articles
- **Limited Form Access**: Can only see and interact with step 1

### Viewer Workflow Example:

1. Viewer logs in and sees a simplified dashboard
2. They cannot access the Settings page
3. They can view all articles in their tenant but cannot modify them
4. No create, edit, or delete buttons are visible to them
5. In the multi-step form, they can only access step 1

## Multi-Tenant Functionality

All roles are further restricted by tenant boundaries:

- **Data Isolation**: Users can only see data from their own tenant
- **User Management**: Admins can only manage users within their own tenant
- **Article Visibility**: Articles are filtered by tenant ID
- **Settings Scope**: Settings only apply to the user's tenant

For example, an Admin in Tenant A cannot see or manage users, articles, or settings from Tenant B, even though they have full permissions within their own tenant.

## Permission Enforcement Mechanisms

The application enforces these role-based permissions through several mechanisms:

1. **UI Rendering**: Components like buttons and navigation items are conditionally rendered based on permissions
   ```jsx
   <Can I="create" a="Article">
     <Button onClick={handleCreateClick}>Create Article</Button>
   </Can>
   ```

2. **Route Protection**: Routes are protected to prevent unauthorized access
   ```jsx
   <PrivateRoute requiredAbility={{ action: "manage", subject: "Settings" }}>
     <Settings />
   </PrivateRoute>
   ```

3. **Action Validation**: Before performing actions, the system checks if the user has permission
   ```jsx
   if (ability.can('delete', article)) {
     // Proceed with deletion
   } else {
     showToast("You don't have permission to delete this item", "error");
   }
   ```

4. **Data Filtering**: Data is automatically filtered by tenant ID
   ```jsx
   const filteredData = data.filter(item => item.tenantId === currentUser?.tenantId);
   ```

## Testing Different Roles

To test how each role functions:

1. **Log in as different users**: Use the login dropdown to switch between users with different roles
2. **Observe UI changes**: Notice how the available options and buttons change
3. **Try different actions**: Attempt to create, view, edit, and delete articles
4. **Access different pages**: Try to navigate to Settings or other restricted areas
5. **Use the multi-step form**: See how far you can progress based on your role

This comprehensive RBAC system ensures that users only have access to the features and data appropriate for their role within their tenant, creating a secure and well-organized application.


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

