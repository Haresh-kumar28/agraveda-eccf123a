import {createFileRoute} from '@tanstack/react-router';
import {AccessDeniedView} from '@/components/agraveda/app-views';
import {pageHead} from '@/lib/metadata';
export const Route=createFileRoute('/app/access-denied')({head:()=>pageHead('Demo access details','Demo access details in the AgraVeda operational workspace. Original calculation engines with synthetic demo data; not clinical advice.'),component:AccessDeniedView});
