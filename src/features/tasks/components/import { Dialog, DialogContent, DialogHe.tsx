import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

const menuItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    module: "Dashboard",
    view: true,
    edit: false,
    update: true,
  },
  {
    name: "Vehicle Type",
    path: "/users",
    module: "Masters",
    view: true,
    edit: true,
    update: false,
  }, {
    name: "Vehicle Brand",
    path: "/users",
    module: "Masters",
    view: true,
    edit: true,
    update: false,
  }, {
    name: "Vehicle ",
    path: "/users",
    module: "Masters",
    view: true,
    edit: true,
    update: false,
  }, {
    name: "Users",
    path: "/users",
    module: "Admin",
    view: true,
    edit: true,
    update: false,
  }, {
    name: "Users",
    path: "/users",
    module: "Admin",
    view: true,
    edit: true,
    update: false,
  }, {
    name: "Users",
    path: "/users",
    module: "Admin",
    view: true,
    edit: true,
    update: false,
  }, {
    name: "Users",
    path: "/users",
    module: "Admin",
    view: true,
    edit: true,
    update: false,
  }, {
    name: "Users",
    path: "/users",
    module: "Admin",
    view: true,
    edit: true,
    update: false,
  }, {
    name: "Users",
    path: "/users",
    module: "Admin",
    view: true,
    edit: true,
    update: false,
  }, {
    name: "Users",
    path: "/users",
    module: "Admin",
    view: true,
    edit: true,
    update: false,
  }, {
    name: "Users",
    path: "/users",
    module: "Admin",
    view: true,
    edit: true,
    update: false,
  }, {
    name: "Users",
    path: "/users",
    module: "Admin",
    view: true,
    edit: true,
    update: false,
  }, {
    name: "Users",
    path: "/users",
    module: "Admin",
    view: true,
    edit: true,
    update: false,
  }, {
    name: "Users",
    path: "/users",
    module: "Admin",
    view: true,
    edit: true,
    update: false,
  }, {
    name: "Users",
    path: "/users",
    module: "Admin",
    view: true,
    edit: true,
    update: false,
  }, {
    name: "Users",
    path: "/users",
    module: "Admin",
    view: true,
    edit: true,
    update: false,
  }, {
    name: "Users",
    path: "/users",
    module: "Admin",
    view: true,
    edit: true,
    update: false,
  }, {
    name: "Users",
    path: "/users",
    module: "Admin",
    view: true,
    edit: true,
    update: false,
  }, {
    name: "Users",
    path: "/users",
    module: "Admin",
    view: true,
    edit: true,
    update: false,
  }, {
    name: "Users",
    path: "/users",
    module: "Admin",
    view: true,
    edit: true,
    update: false,
  }, {
    name: "Users",
    path: "/users",
    module: "Admin",
    view: true,
    edit: true,
    update: false,
  }, {
    name: "Users",
    path: "/users",
    module: "Admin",
    view: true,
    edit: true,
    update: false,
  }, {
    name: "Users",
    path: "/users",
    module: "Admin",
    view: true,
    edit: true,
    update: false,
  }, {
    name: "Users",
    path: "/users",
    module: "Admin",
    view: true,
    edit: true,
    update: false,
  }, {
    name: "Users",
    path: "/users",
    module: "Admin",
    view: true,
    edit: true,
    update: false,
  }, {
    name: "Users",
    path: "/users",
    module: "Admin",
    view: true,
    edit: true,
    update: false,
  }, {
    name: "Users",
    path: "/users",
    module: "Admin",
    view: true,
    edit: true,
    update: false,
  },
]

export function UsersInviteDialog({ open, onOpenChange }: any) {
  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        onOpenChange(state)
      }}
    >
      <DialogTrigger asChild>
        <Button variant="default">Configure Menu</Button>
      </DialogTrigger>

      <DialogContent
        className="max-w-[1500px] w-full h-[750px] overflow-hidden"
        style={{ maxWidth: '1500px', width: '100%', height: '750px' }}
      >
        <div className="space-y-2 h-full">
          <DialogHeader className="p-0 mb-2">
            <DialogTitle className="text-lg font-semibold">Menu Configuration</DialogTitle>
          </DialogHeader>

          {/* Scrollable Table Container */}
          <div className="overflow-auto border rounded-md max-h-[600px]">
            <table className="w-full table-auto border-collapse text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="border px-5 py-2 text-left" >Menu</th>
                  <th className="border px-5 py-2 text-left">Category</th>
                  <th className="border px-5 py-2 text-center">Sub Items</th>
                  <th className="border px-5 py-2 text-center">View</th>
                  <th className="border px-5 py-2 text-center">Edit</th>
                  <th className="border px-5 py-2 text-center">Update</th>
                </tr>
              </thead>
              <tbody>
                {menuItems.map((item, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-5 py-2 border" >{item.name}</td>
                    <td className="px-4 py-2 border">{item.module}</td>
                    <td className="px-4 py-2 border text-center" style={{ width: '200px' }}>
                      <div className="flex flex-col items-start gap-1">
                        <div className="flex items-center gap-2">
                          <Checkbox checked={item.view} />
                          <span>User Add</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox checked={item.view} />
                           <span>User Update</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-2 border text-center" style={{ width: '200px' }}>
                      <Checkbox checked={item.view} />
                    </td>
                    <td className="px-4 py-2 border text-center" style={{ width: '200px' }}>
                      <Checkbox checked={item.edit} />
                    </td>
                    <td className="px-4 py-2 border text-center" style={{ width: '200px' }}>
                      <Checkbox checked={item.update} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

