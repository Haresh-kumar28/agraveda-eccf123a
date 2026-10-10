import {createFileRoute} from '@tanstack/react-router';
import {ForecastView} from '@/components/agraveda/app-views';
import {pageHead} from '@/lib/metadata';
export const Route=createFileRoute('/app/forecast')({head:()=>pageHead('Demand forecast','Demand forecast in the AgraVeda operational workspace. Original calculation engines with synthetic demo data; not clinical advice.'),component:ForecastView});
