import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { columns } from './components/vh-type-columns'
import { VhTypesDialogs } from './components/vh-type-dialogs'
import { VhTypePrimaryButtons } from './components/vh-type-primary-buttons'
import { VhTypesTable } from './components/vh-table-table'
import VhTypesProvider from './context/vh-types-context'
import { useQuery } from "@tanstack/react-query";
import MasterServices from "@/services/master";


export default function vhTypes() {
  interface VehicleType {
    contAakno: number;
    contName: string;
    varient: string;
    CStatus: number;
    CreatedDate: string;
    updDateTime: number;
  }


  const vehicleTypeList: any = useQuery<VehicleType[]>({
    queryKey: ["vehicleTypeList"],
    queryFn: async () => {
      const res = await MasterServices.vehicleTypeList();
      return res.data.container;
    },
  });


  return (
    <VhTypesProvider>
      <Header fixed>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Vehicle Types</h2>
            <p className='text-muted-foreground'>
              Manage your vehicle type master here.
            </p>
          </div>
          <VhTypePrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
          {vehicleTypeList.isLoading ? (
            <p>Loading...</p>
          ) : vehicleTypeList.isError ? (
            <p>Error loading vehicle types</p>
          ) : (
            <VhTypesTable data={vehicleTypeList.data} columns={columns} />
          )}
        </div>
      </Main>
      <VhTypesDialogs />
    </VhTypesProvider>
  )
}
