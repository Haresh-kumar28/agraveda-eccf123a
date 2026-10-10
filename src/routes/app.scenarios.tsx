import {createFileRoute} from '@tanstack/react-router';
import {ScenariosView} from '@/components/agraveda/app-views';
import {pageHead} from '@/lib/metadata';
export const Route=createFileRoute('/app/scenarios')({head:()=>pageHead('Operational scenarios','Operational scenarios in the AgraVeda operational workspace. Original calculation engines with synthetic demo data; not clinical advice.'),component:ScenariosView});
