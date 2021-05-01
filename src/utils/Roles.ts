export interface Role {
  /**
   * Bitwise ID (read: power of two) that can uniquely
   * identify this specific role from all roles stored as aggregate bitwise int
   */
  id: number;
  name: string;
}

export const roles: Role[] = [
  {id: 1, name: "2D Art"},
  {id: 2, name: "3D Art"},
  {id: 4, name: "Code"},
  {id: 8, name: "Design/Production"},
  {id: 16, name: "Sound/Music"},
  {id: 32, name: "Testing/Support"},
  {id: 64, name: "Other"},
];

/**
 * Get all roles for a given Role ID (as an combined view of all roles, by the sum of the IDs)
 */
export const getRoles = (bitwiseRoleId: number): Role[] => {
  return roles.filter(role => roleIsInBitwiseRoleId(bitwiseRoleId, role.id));
}

/**
 * Does the aggregated collection of all roles contain the given role ID?
 *
 * For ease of querying the DB, a collection of Roles is stored as a single int.
 * This int is the sum of all Roles which are active for that Team/Jammer
 *  (e.g. 2dArt+Code+Sound = 1+4+16 = 21)
 *
 * We can check if a given role is in the aggregated ("bitwise") role ID by doing
 * an AND operation on the two numbers when represented as binary; if the resulting
 * value of the AND is the roleId we passed in, then that bitwiseRoleId contains that role.
 */
const roleIsInBitwiseRoleId = (bitwiseRoleId: number, roleId: number): boolean => {
  return (bitwiseRoleId & roleId) == roleId;
}
