
const TotalCard = ({ title, value, icon}: any) => {
    return (<div className="col-span-12 sm:col-span-4">
    <div className="p-4 relative rounded-sm shadow-sm border bg-card ">
      <div className="grid grid-cols-2">
        <div>
          <div className="flex gap-5 items-center ">
            <UserIcon className="mb-2" />
            <Icon
            <div className="text-md">Total Users</div>
          </div>
          <div className="text-2xl font-medium leading-8 mt-4">
            {users.filter(isUser).length}
          </div>
          <Link
            href={"/admin/user-management"}
            className="opacity-40  underline text-sm hover:opacity-90 mt-4"
          >
            View all
          </Link>
        </div>

        <div className="h-20">
          <TinyLineChart data={userCreateTimes}/>
        </div>
      </div>
    </div>
  </div>);}
