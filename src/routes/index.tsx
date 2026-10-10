import {createFileRoute} from '@tanstack/react-router';
import {Landing} from '@/components/agraveda/site';
import {pageHead} from '@/lib/metadata';
export const Route=createFileRoute('/')({head:()=>pageHead('A clearer view of emergency care','Anticipate emergency demand, understand patient-flow bottlenecks and plan resources with AgraVeda. Explore a clearly labelled synthetic-data demo.'),component:Landing});
