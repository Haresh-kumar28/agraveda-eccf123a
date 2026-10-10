import { Link } from '@tanstack/react-router';
import { Activity } from 'lucide-react';
export function Brand(){return <Link to="/" className="brand" aria-label="AgraVeda home"><span className="brand-mark"><Activity size={20}/></span><span className="brand-name">AgraVeda<span className="text-primary">.</span></span></Link>}
