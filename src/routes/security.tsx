import {createFileRoute} from '@tanstack/react-router';
import {ContentPage} from '@/components/agraveda/content-page';
import {pageHead} from '@/lib/metadata';
export const Route=createFileRoute('/security')({head:()=>pageHead('Security and trust','Security and trust: transparent emergency-department operational decision support from AgraVeda.'),component:()=> <ContentPage kind="security"/>});
