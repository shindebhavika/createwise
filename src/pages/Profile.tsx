import { useLocation } from "react-router-dom";

export default function Profile() {
  const location = useLocation();
  const activeItem = location.state?.activeItem;

  return (
    <div>
      <h1 className="font-bold text-2xl">{activeItem.title}</h1>
      
    </div>
  );
}
