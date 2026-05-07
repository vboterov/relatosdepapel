/**
 * Pedidos simulados por usuario (sin persistencia real).
 */
export const orders = [
  {
    id: "PED-24089",
    id_user: 1,
    date: "2026-04-02",
    total: 81000,
    status: "Entregado",
    items: ["La sombra del viento", "Pedro Páramo"],
  },
  {
    id: "PED-24102",
    id_user: 1,
    date: "2026-03-18",
    total: 52000,
    status: "En tránsito",
    items: ["Cien años de soledad"],
  },
  {
    id: "PED-23967",
    id_user: 1,
    date: "2026-02-01",
    total: 96000,
    status: "Entregado",
    items: ["Rayuela", "La casa de los espíritus"],
  },
  {
    id: "PED-23890",
    id_user: 1,
    date: "2025-12-15",
    total: 34000,
    status: "Entregado",
    items: ["Crónica de una muerte anunciada"],
  },
  {
    id: "PED-23771",
    id_user: 1,
    date: "2025-11-03",
    total: 34000,
    status: "Cancelado",
    items: ["El túnel"],
  },
  {
    id: "PED-23654",
    id_user: 1,
    date: "2025-09-21",
    total: 114000,
    status: "Entregado",
    items: ["Don Quijote de la Mancha", "Rayuela"],
  },
  {
    id: "PED-24155",
    id_user: 2,
    date: "2026-04-28",
    total: 52000,
    status: "Preparando envío",
    items: ["Cien años de soledad"],
  },
  {
    id: "PED-24001",
    id_user: 2,
    date: "2026-03-09",
    total: 115000,
    status: "Entregado",
    items: ["Juego de tronos", "El nombre de la rosa"],
  },
  {
    id: "PED-23812",
    id_user: 2,
    date: "2025-10-30",
    total: 38000,
    status: "Entregado",
    items: ["1984"],
  },
];

export function getRecentOrdersForUser(id_user, limit = 5) {
  return orders
    .filter((o) => o.id_user === id_user)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, limit);
}
