import {createFileRoute} from '@tanstack/react-router';
import {ContentPage} from '@/components/agraveda/content-page';
import {pageHead} from '@/lib/metadata';
export const Route=createFileRoute('/for-hospitals')({head:()=>pageHead('For hospital teams','For hospital teams: transparent emergency-department operational decision support from AgraVeda.'),component:()=> <ContentPage kind="for-hospitals"/>});
