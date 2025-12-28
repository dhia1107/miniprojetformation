import { Sessions } from "./sessions";

export interface Formation {
    id: number;
  titre: string;
  description: string;
  image?: string;
  duree: number;
  niveau: 'debutant' | 'intermediaire' | 'avance';
  tags: string[];
  categorie: string[];
  sessions: Sessions[];
}

