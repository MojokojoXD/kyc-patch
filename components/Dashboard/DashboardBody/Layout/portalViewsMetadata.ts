import { Grid2x2Plus, UserCog } from "lucide-react";

export const portalViewsMetadata = [

    {
        id: 0,
        name: 'metrics',
        displayName: 'dashboard',
        icon: Grid2x2Plus
    },
    {
        id: 1,
        name: 'clientele',
        displayName: 'all clients',
        icon: UserCog
    }
] as const;