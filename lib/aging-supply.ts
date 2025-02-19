export default function agingSupply(due_date: Date | null): number {
  if (due_date === null) return 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const agingSupply = new Date(due_date.getTime());
  agingSupply.setHours(0, 0, 0, 0);

  const selisih = today.getTime() - agingSupply.getTime();

  return Math.floor(selisih / (1000 * 60 * 60 * 24));
}
