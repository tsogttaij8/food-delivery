import UserIcon from "@/app/admin/_icons/User";

export default function HeaderAccount() {
  return (
    <div>
      <div className="w-9 h-9 cursor-pointer rounded-full bg-red-500 flex items-center justify-center ">
        <UserIcon />
      </div>
    </div>
  );
}
