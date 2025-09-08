export default function PlayerImage({ rowData }) {
  return (
    <img
      src={rowData?.photoURL || "https://i.redd.it/semgwb8aiex71.jpg"}
      className="w-3rem shadow-2 border-round"
    />
  );
}
