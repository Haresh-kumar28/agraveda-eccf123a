import {createFileRoute} from '@tanstack/react-router';
import {ContentPage} from '@/components/agraveda/content-page';
import {pageHead} from '@/lib/metadata';
export const Route=createFileRoute('/privacy')({head:()=>pageHead('Demo privacy notice','Demo privacy notice: transparent emergency-department operational decision support from AgraVeda.'),component:()=> <ContentPage kind="privacy"/>});
