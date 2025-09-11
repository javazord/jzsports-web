export default function PlayerOption({ option }) {
  return (
    <div className="flex align-items-center">
      <img
        alt={option.photoURL}
        src={option.photoURL}
        className="mr-2"
        style={{
          width: 22,
          height: 22,
          borderRadius: "50%",
          objectFit: "cover",
        }}
      />
      <div>{option.nickname}</div>
    </div>
  );
}
