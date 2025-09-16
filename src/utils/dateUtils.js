export const formatDate = (dateString) => {
  if (!dateString) return "";
  return new Date(dateString)
    .toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, "/"); // deixa dd-MM-yyyy
};
