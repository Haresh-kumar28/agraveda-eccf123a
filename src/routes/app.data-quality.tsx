import {createFileRoute} from '@tanstack/react-router';
import {DataQualityView} from '@/components/agraveda/app-views';
import {pageHead} from '@/lib/metadata';
export const Route=createFileRoute('/app/data-quality')({head:()=>pageHead('Data quality and lineage','Data quality and lineage in the AgraVeda operational workspace. Original calculation engines with synthetic demo data; not clinical advice.'),component:DataQualityView});
