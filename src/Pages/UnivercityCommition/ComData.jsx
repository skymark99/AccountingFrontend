import ComDataItems from "./ComDataItems";

export default function ComData() {
  const data = [{ name: "name" }, { name: "name" }];
  return (
    <div className="commition__data-container">
      <ComDataItems />
      <ComDataItems />
      <ComDataItems />
    </div>
  );
}
