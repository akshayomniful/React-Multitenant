export const permissions = {
  admin: [{ action: "manage", subject: "all" }],
  editor: [
    { action: "read", subject: "Article" },
    { action: "create", subject: "Article" },
    { action: "update", subject: "Article" },
    {
      action: "delete",
      subject: "Article",
      conditions: { authorId: "${user.id}" },
    },
    { action: "read", subject: "Dashboard" },
    { action: "access", subject: "form-step-1" },
    { action: "access", subject: "form-step-2" },
  ],
  viewer: [
    { action: "read", subject: "Article" },
    { action: "read", subject: "Dashboard" },
    { action: "access", subject: "form-step-1" },
  ],
};
