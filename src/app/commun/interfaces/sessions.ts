
import { Candidats } from "./candidats";
import { Formateurs } from "./formateurs";

export interface Sessions {
    id: number;
    dateDebut: Date;
    dateFin: Date;
    description: string;
    formateurs: Formateurs[];
    candidats: Candidats[];
    complet:boolean;
}
