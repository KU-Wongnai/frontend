interface AdminMainProps {
  active: number;
}

export default function AdminMain({ active }: AdminMainProps) {
  const renderContent = () => {
    switch (active) {
      case 1:
        return (
          <>
          </>
        );
      case 2:
        return (
          <>
          </>
        );
      case 3:
        return (
          <>
          </>
        );
      case 4:
        return (
          <>
          </>
        );
      case 5:
      return (
        <>
        </>
      );
      case 6:
      return (
        <>
        </>
      );
        
    }
  };
  return (
    <main className="flex-1 p-8 mt-3 md:mt-16 overflow-auto rounded-sm shadow-sm border bg-card">
      <div>{renderContent()}</div>
    </main>
  );
}
