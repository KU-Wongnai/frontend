import General from "./general-profile";
import MyOrders from "./my-orders";
import ChangePassword from "./change-password";
import History from "./history-orders";

interface MainProfileProps {
  active: number;
}

export default function MainProfile({ active }: MainProfileProps) {
  const renderContent = () => {
    switch (active) {
      case 1:
        return (
          <>
            {/* <section className="mb-4">
              <h2 className="text-lg font-bold">Profile</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Update personal infomation for your better experience browsing
                our website.
              </p>
            </section> */}
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
    <main className="flex-1 p-8">
      <div>{renderContent()}</div>
    </main>
  );
}
