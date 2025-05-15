export function formatCustomDate(dateString) {
  const date = new Date(dateString);

  const bulan = date.toLocaleDateString("id-ID", { month: "long" });
  const hari = date.getDate();
  const tahun = date.getFullYear();
  const jam = date.getHours();
  const menit = date.getMinutes().toString().padStart(2, "0");

  let waktu;
  if (jam < 12) waktu = "Pagi";
  else if (jam < 15) waktu = "Siang";
  else if (jam < 18) waktu = "Sore";
  else waktu = "Malam";

  return `${bulan} ${hari}, ${tahun} pukul ${jam}:${menit} ${waktu}`;
}
