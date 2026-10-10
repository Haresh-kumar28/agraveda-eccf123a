import { createContext,useContext,useMemo,useState,type ReactNode } from 'react';
import {syntheticData,getLatestRecord,getRecentRecords} from '@/data/syntheticData';
import {inputsFromRecord,applyInputsToRecord,applyScenario,type SimulationInputs} from '@/types';
import {generateForecast} from '@/engines/forecastEngine';
import {calculatePressure} from '@/engines/pressureEngine';
import {analyzeBottlenecks} from '@/engines/bottleneckEngine';
import {generateRecommendations} from '@/engines/recommendationEngine';
import {runWhatIfSimulation,type WhatIfParams} from '@/engines/whatIfSimulator';
import {assessDataQuality} from '@/engines/dataQualityEngine';
const emptyParams:WhatIfParams={additionalBeds:0,additionalNurses:0,additionalDoctors:0,patientSurgePercent:0};
function useOperationsState(){const base=getLatestRecord(syntheticData);const [inputs,setInputs]=useState(()=>inputsFromRecord(base));const [params,setParams]=useState<WhatIfParams>(emptyParams);const result=useMemo(()=>{const current=applyInputsToRecord(base,inputs);const scenario=inputs.scenario==='outbreak'||inputs.scenario==='custom'?'normal':inputs.scenario;const forecast=generateForecast(syntheticData,current,scenario);const pressure=calculatePressure(current,forecast.forecasts);const bottlenecks=analyzeBottlenecks(current,forecast.forecasts);return {current,forecast,pressure,bottlenecks,recommendations:generateRecommendations(pressure,bottlenecks,current,forecast.forecasts),whatIf:runWhatIfSimulation(current,forecast.forecasts,pressure,bottlenecks,params)};},[base,inputs,params]);return {...result,inputs,setInputs,params,setParams,recent:getRecentRecords(syntheticData,24),quality:useMemo(()=>assessDataQuality(syntheticData),[]),reset:()=>{setInputs(inputsFromRecord(base));setParams(emptyParams);},resetWhatIf:()=>setParams(emptyParams),selectScenario:(scenario:SimulationInputs['scenario'])=>{setInputs(applyScenario(inputsFromRecord(base),scenario));setParams(emptyParams);},simulateAction:()=>setParams({additionalBeds:Math.max(0,-(result.bottlenecks.all.find(b=>b.resource==='beds')?.gap??0)),additionalNurses:Math.max(0,-(result.bottlenecks.all.find(b=>b.resource==='nurses')?.gap??0)),additionalDoctors:Math.max(0,-(result.bottlenecks.all.find(b=>b.resource==='doctors')?.gap??0)),patientSurgePercent:0})};}
const Context=createContext<ReturnType<typeof useOperationsState>|null>(null);
export function OperationsProvider({children}:{children:ReactNode}){const value=useOperationsState();return <Context.Provider value={value}>{children}</Context.Provider>}
export function useOperations(){const v=useContext(Context);if(!v)throw new Error('OperationsProvider required');return v;}
