import React from "react";

function ShowMenu({ params }: { params: { slug: string } }) {
  return (
    <main className="container mx-auto py-6">
      <div>ShowMenu {params.slug}</div>
    </main>
  );
}

export default ShowMenu;
