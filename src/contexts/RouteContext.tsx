import { createContext } from 'react';

interface RouteContextInterface {
    routeFrom: string;
    routeTo: string;
}

export const RouteContext = createContext<RouteContextInterface | {}>({})