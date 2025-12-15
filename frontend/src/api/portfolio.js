export async function fetchPortfolio() {
  const res = await fetch("http://localhost:8000/api/portfolio");
  if (!res.ok) throw new Error("No se pudo cargar el portfolio");
  return res.json();
}

export async function sendContact(payload) {
  const res = await fetch("http://localhost:8000/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("No se pudo enviar el mensaje");
  return res.json();
}
