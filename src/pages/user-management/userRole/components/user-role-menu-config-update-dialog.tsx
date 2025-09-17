import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { sidebarData } from "../../../../../src/components/layout/data/sidebar-data"
import { useEffect, useState } from 'react'
import UserManagmentService from "@/services/user-management";
import { toast } from 'sonner'



let menuItems = sidebarData.navGroups.find((x: any) => x.title == 'General')?.items || [];

export function UserRoleMenuConfigUpdateModal({ open, onOpenChange, currentRow }: any) {

  if (currentRow?.pageDetails && currentRow?.pageDetails.length) {
    menuItems = menuItems.map((x: any) => {
      return currentRow?.pageDetails.find((y: any) => y.title == x.title) || x
    })
  }
  const [tableData, setTableData] = useState(menuItems);

  useEffect(() => {
    console.log(tableData)
  }, [tableData])


  const onSubmit = async (values: any) => {
    try {
      const formData = new FormData();
      formData.append('roleName', values.roleName);
      formData.append('cstatus', values.cstatus);
      formData.append('userAakno', '1');
      formData.append('opt', '2');
      formData.append('roleAakno', currentRow?.roleAakno ? currentRow.roleAakno.toString() : '0');
      formData.append('pageDetails', JSON.stringify(tableData));

      await UserManagmentService.userRoleSave(formData);

      toast.success('Menu Config Updated Successfully!!!');

      onOpenChange(false);
    } catch (error) {
      console.error('Failed to save User Role:', error);
      toast.error('Failed to save User Role');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-[1500px] w-full max-h-[90vh] h-auto min-h-0 overflow-hidden p-4 flex flex-col"
        style={{ maxWidth: '1500px' }}
      >
        <DialogHeader className="p-0 mb-2">
          <DialogTitle className="text-lg font-semibold">
            Menu Configuration
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <div className="border rounded-md flex-1 overflow-auto min-h-0">
          <table className="w-full table-auto border-collapse text-sm">
            <thead className="bg-muted sticky top-0 z-10">
              <tr>
                <th className="border px-5 py-2 text-left">Master</th>
                <th className="border px-5 py-2 text-left">Sub Master</th>
                <th className="border px-5 py-2 text-center">
                  <label className="inline-flex items-center gap-2 justify-center">
                    <Checkbox className="border-2 border-gray-400" />
                    <span>Sub Items</span>
                  </label>
                </th>
                <th className="border px-5 py-2 text-center">
                  <label className="inline-flex items-center gap-2 justify-center">
                    <Checkbox className="border-2 border-gray-400" />
                    <span>View</span>
                  </label>
                </th>
                <th className="border px-5 py-2 text-center">
                  <label className="inline-flex items-center gap-2 justify-center">
                    <Checkbox className="border-2 border-gray-400" />
                    <span>Edit</span>
                  </label>
                </th>
                <th className="border px-5 py-2 text-center">
                  <label className="inline-flex items-center gap-2 justify-center">
                    <Checkbox className="border-2 border-gray-400" />
                    <span>Delete</span>
                  </label>
                </th>
              </tr>
            </thead>
            <tbody>{tableBodySetup(tableData, setTableData)}</tbody>
          </table>
        </div>

        {/* Footer now stays fixed at bottom */}
        <DialogFooter className="pt-4">
          <Button type="submit"
            onClick={onSubmit}>Update</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

  );
}

function tableBodySetup(data: any, setData: any) {
  const rows: any = []

  data.forEach((master: any, masterIndex: any) => {
    if (!master.items) {
      rows.push(
        <tr key={`m-${masterIndex}`} className="border-t">
          <td className="px-5 py-2 border">{master.title}</td>
          <td className="px-4 py-2 border"></td>
          <td className="px-4 py-2 border"></td>
          <td className="px-4 py-2 border text-center">
            <Checkbox
              className="border-2 border-gray-400"
              checked={master?.actions?.view || false}
              onCheckedChange={(checked) => {
                const newData = [...data]
                newData[masterIndex].actions = { ...newData[masterIndex].actions, view: !!checked }
                setData(newData)
              }}
            />
          </td>
          <td className="px-4 py-2 border text-center">
            <Checkbox
              className="border-2 border-gray-400"
              checked={master?.actions?.edit || false}
              onCheckedChange={(checked) => {
                const newData = [...data]
                newData[masterIndex].actions = { ...newData[masterIndex].actions, edit: !!checked }
                setData(newData)
              }}
            />
          </td>
          <td className="px-4 py-2 border text-center">
            <Checkbox
              className="border-2 border-gray-400"
              checked={master?.actions?.delete || false}
              onCheckedChange={(checked) => {
                const newData = [...data]
                newData[masterIndex].actions = { ...newData[masterIndex].actions, delete: !!checked }
                setData(newData)
              }}
            />
          </td>
        </tr>
      )
    } else {
      master.items.forEach((sub: any, subIndex: any) => {
        const subItems =
          sub.subItems && sub.subItems.length > 0 ? sub.subItems : [null]

        subItems.forEach((subItem: any, subItemIndex: any) => {
          rows.push(
            <tr
              key={`m-${masterIndex}-s-${subIndex}-si-${subItemIndex}`}
              className="border-t"
            >
              {subIndex === 0 && subItemIndex === 0 && (
                <td
                  className="px-5 py-2 border"
                  rowSpan={countTotalRows(master)}
                >
                  {master.title}
                </td>
              )}
              {subItemIndex === 0 && (
                <td
                  className="px-4 py-2 border"
                  rowSpan={sub.subItems ? sub.subItems.length : 1}
                >
                  {sub.title}
                </td>
              )}
              <td className="px-4 py-2 border">
                {subItem?.name && (
                  <div className="flex items-center gap-2">
                    <Checkbox
                      className="border-2 border-gray-400"
                      checked={subItem.status || false}
                      onCheckedChange={(checked) => {
                        const newData = [...data]
                        newData[masterIndex].items[subIndex].subItems[
                          subItemIndex
                        ].status = !!checked
                        setData(newData)
                      }}
                    />
                    <span>{subItem.name}</span>
                  </div>
                )}
              </td>
              <td className="px-4 py-2 border text-center">
                <Checkbox
                  className="border-2 border-gray-400"
                  checked={sub?.actions?.view || false}
                  onCheckedChange={(checked) => {
                    const newData = [...data]
                    newData[masterIndex].items[subIndex].actions = { ...newData[masterIndex].items[subIndex].actions, view: !!checked }
                    setData(newData)
                  }}
                />
              </td>
              <td className="px-4 py-2 border text-center">
                <Checkbox
                  className="border-2 border-gray-400"
                  checked={sub?.actions?.edit || false}
                  onCheckedChange={(checked) => {
                    const newData = [...data]
                    newData[masterIndex].items[subIndex].actions = { ...newData[masterIndex].items[subIndex].actions, edit: !!checked }
                    setData(newData)
                  }}
                />
              </td>
              <td className="px-4 py-2 border text-center">
                <Checkbox
                  className="border-2 border-gray-400"
                  checked={sub?.actions?.delete || false}
                  onCheckedChange={(checked) => {
                    const newData = [...data]
                    newData[masterIndex].items[subIndex].actions = { ...newData[masterIndex].items[subIndex].actions, delete: !!checked }
                    setData(newData)
                  }}
                />
              </td>
            </tr>
          )
        })
      })
    }
  })

  return rows;
}

function countTotalRows(master: any) {
  let total = 0
  if (!master.items) return 1
  master.items.forEach((sub: any) => {
    total += sub.subItems ? sub.subItems.length : 1
  })
  return total
}
