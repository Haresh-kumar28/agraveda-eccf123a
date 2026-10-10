import {createFileRoute} from '@tanstack/react-router';
import {PatientFlowView} from '@/components/agraveda/app-views';
import {pageHead} from '@/lib/metadata';
export const Route=createFileRoute('/app/patient-flow')({head:()=>pageHead('Patient flow','Patient flow in the AgraVeda operational workspace. Original calculation engines with synthetic demo data; not clinical advice.'),component:PatientFlowView});
