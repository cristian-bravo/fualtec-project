type SuperAdminLike = {
  rol?: string | null;
  is_super_admin?: boolean | null;
};

export const isSuperAdminUser = (user?: SuperAdminLike | null) =>
  Boolean(user?.is_super_admin) || user?.rol === "super_admin";
