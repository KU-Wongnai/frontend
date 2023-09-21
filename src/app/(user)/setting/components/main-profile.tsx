import General from "./general";
import MyOrders from "./my-orders";
import ChangePassword from "./change-password";
import History from "./history";

interface MainProfileProps {
  active: number;
}

export default function MainProfile({ active }: MainProfileProps) {
  const renderContent = () => {
    switch (active) {
      case 1:
        return (
          <>
            <h2 className="mb-4 text-2xl font-bold">Profile</h2>
            <General />
          </>
        );
      case 2:
        return (
          <>
            <h2 className="mb-4 text-2xl font-bold">Order</h2>
            <MyOrders />
          </>
        );
      case 3:
        return (
          <>
            <h2 className="mb-4 text-2xl font-bold">History</h2>
            <History />
          </>
        );
      case 4:
        return (
          <>
            <h2 className="mb-4 text-2xl font-bold">Change Password</h2>
            <ChangePassword />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <main className="flex-1 p-8 mt-3 md:mt-16 overflow-auto rounded-sm shadow-sm border bg-card">
      <div>{renderContent()}</div>
    </main>
  );
}
