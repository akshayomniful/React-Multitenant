export const articles = [
  {
    id: 1,
    title: "Getting Started with RBAC",
    content:
      "Role-based access control (RBAC) is an approach to restricting system access to authorized users...",
    authorId: 1,
    tenantId: 1,
    createdAt: "2023-01-15T10:30:00Z",
    status: "published",
  },
  {
    id: 2,
    title: "Advanced CASL Techniques",
    content:
      "CASL is an isomorphic authorization JavaScript library which restricts what resources a given user is allowed to access...",
    authorId: 2,
    tenantId: 1,
    createdAt: "2023-02-20T14:15:00Z",
    status: "published",
  },
  {
    id: 3,
    title: "Multi-tenant Architecture",
    content:
      "A multi-tenant architecture is one in which a single instance of software serves multiple customers...",
    authorId: 1,
    tenantId: 1,
    createdAt: "2023-03-10T09:45:00Z",
    status: "draft",
  },
  {
    id: 4,
    title: "Tenant B Specific Article",
    content: "This article is only visible to users in Tenant B...",
    authorId: 4,
    tenantId: 2,
    createdAt: "2023-03-15T11:30:00Z",
    status: "published",
  },
  {
    id: 5,
    title: "Another Tenant B Article",
    content: "More content specific to Tenant B...",
    authorId: 5,
    tenantId: 2,
    createdAt: "2023-04-05T16:20:00Z",
    status: "published",
  },
];
