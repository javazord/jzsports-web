export function useChampionshipRegister() {
  const imageTeamRender = (rowData) => (
    <img
      src={
        rowData?.data?.photoURL ||
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsUL8s1gbXCu6wiDFf8_dnPPs9ghIX0Oce9w&s"
      }
      className="w-3rem shadow-2 border-round"
    />
  );

  return {
    imageTeamRender,
  };
}
