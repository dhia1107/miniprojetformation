import { computed, Injectable, signal } from '@angular/core';
import { Formation } from '../interfaces/formation';
import { Formateurs } from '../interfaces/formateurs';
import { Candidats } from '../interfaces/candidats';

@Injectable({
  providedIn: 'root',
})
export class Formations {
  allcategories=signal<string[]>([
    'Développement Web',
    'Développement Frontend',
    'Développement Backend',
    'Réseaux et Sécurité',
    'Data Science'
  ])

  
  

  formateurs = signal<Formateurs[]>([
    {
      id: 1,
      nom: 'battikh',
      prenom: 'dhia',
      email: 'dhiabattikh@abc.tn',
      telephone: 12345678 ,
      cin: 12345678,
      specialites: ['Angular', 'TypeScript', 'Développement Web'],
    },
    {
      id: 2,
      nom: 'ben foulen',
      prenom: 'foulen',
      email: 'foulenfoulen@gmail.tn',
      telephone: 87654321,
      cin: 87654321,
      specialites: ['Node.js', 'Backend', 'APIs'],
    }
  ]);

formationsList = signal<Formation[]>([
  {
    id: 1,
    titre: 'Introduction à Angular',
    description: 'Apprenez les bases d\'Angular, un framework populaire pour construire des applications web modernes.',
    duree: 6,
    image: 'assets/images/angular.png',
    pdf: 'assets/images/programme_introduction_angular.pdf',
    niveau: 'debutant',
    tags: ['Angular', 'Frontend', 'Web Development', 'TypeScript'],
    categorie: ['Développement Web', 'Développement Frontend'], // ✅ AJOUTÉ
    sessions: [
      {
        id: 1,
        formateurs: [this.formateurs()[0]],
        candidats: [
          { id: 101, nom: 'Ben Salah', prenom: 'Ahmed', email: 'ahmed@email.com', cin: 10000101, mdp: 'pass123' },
          { id: 102, nom: 'Mansour', prenom: 'Sara', email: 'sara@email.com', cin: 10000102, mdp: 'pass123' },
          { id: 103, nom: 'Gharbi', prenom: 'Karim', email: 'karim@email.com', cin: 10000103, mdp: 'pass123' },
          { id: 104, nom: 'Chaouch', prenom: 'Nadia', email: 'nadia@email.com', cin: 10000104, mdp: 'pass123' }
        ],
        dateDebut: new Date('2024-04-10'),
        dateFin: new Date('2024-04-24'),
        description: 'Session Avril - 4/15 places',
        complet: false
      },
      {
        id: 2,
        formateurs: [this.formateurs()[0]],
        candidats: [
          { id: 105, nom: 'Bouzid', prenom: 'Youssef', email: 'youssef@email.com', cin: 10000105, mdp: 'pass123' },
          { id: 106, nom: 'Ben Ali', prenom: 'Fatma', email: 'fatma@email.com', cin: 10000106, mdp: 'pass123' },
          { id: 107, nom: 'Trabelsi', prenom: 'Omar', email: 'omar@email.com', cin: 10000107, mdp: 'pass123' },
          { id: 108, nom: 'Jlassi', prenom: 'Leila', email: 'leila@email.com', cin: 10000108, mdp: 'pass123' },
          { id: 109, nom: 'Masmoudi', prenom: 'Ramy', email: 'ramy@email.com', cin: 10000109, mdp: 'pass123' }
        ],
        dateDebut: new Date('2024-05-10'),
        dateFin: new Date('2024-05-24'),
        description: 'Session Mai - 5/15 places',
        complet: false
      }
    ]
  },
  {
    id: 2,
    titre: 'Développement Backend avec Node.js',
    description: 'Découvrez comment créer des applications backend robustes avec Node.js et Express.js.',
    duree: 8,
    image: 'assets/images/nodejs.png',
    pdf: 'assets/images/programme_d_veloppement_backend_avec_node_js.pdf',
    niveau: 'avance',
    tags: ['Node.js', 'Backend', 'API', 'Express', 'MongoDB'],
    categorie: ['Développement Web', 'Développement Backend'], 
    sessions: [
      {
        id: 3,
        formateurs: [this.formateurs()[1]],
        candidats: [
          { id: 201, nom: 'Karray', prenom: 'Ali', email: 'ali@email.com', cin: 10000201, mdp: 'pass123' },
          { id: 202, nom: 'Saidi', prenom: 'Amina', email: 'amina@email.com', cin: 10000202, mdp: 'pass123' },
          { id: 203, nom: 'Ferchichi', prenom: 'Hichem', email: 'hichem@email.com', cin: 10000203, mdp: 'pass123' },
          { id: 204, nom: 'Ben Ammar', prenom: 'Salma', email: 'salma@email.com', cin: 10000204, mdp: 'pass123' },
          { id: 205, nom: 'Zarrouk', prenom: 'Wassim', email: 'wassim@email.com', cin: 10000205, mdp: 'pass123' },
          { id: 206, nom: 'Mabrouk', prenom: 'Ines', email: 'ines@email.com', cin: 10000206, mdp: 'pass123' },
          { id: 207, nom: 'Cherif', prenom: 'Tarek', email: 'tarek@email.com', cin: 10000207, mdp: 'pass123' },
          { id: 208, nom: 'Ben Rhouma', prenom: 'Sonia', email: 'sonia@email.com', cin: 10000208, mdp: 'pass123' },
          { id: 209, nom: 'Laroussi', prenom: 'Bilel', email: 'bilel@email.com', cin: 10000209, mdp: 'pass123' },
          { id: 210, nom: 'Ben Ahmed', prenom: 'Rania', email: 'rania@email.com', cin: 10000210, mdp: 'pass123' }
        ],
        dateDebut: new Date('2024-04-15'),
        dateFin: new Date('2024-05-05'),
        description: 'Session Avril - 10/15 places',
        complet: false
      },
      {
        id: 4,
        formateurs: [this.formateurs()[1]],
        candidats: [
          { id: 211, nom: 'Guesmi', prenom: 'Mohamed', email: 'mohamed@email.com', cin: 10000211, mdp: 'pass123' },
          { id: 212, nom: 'Ben Youssef', prenom: 'Hana', email: 'hana@email.com', cin: 10000212, mdp: 'pass123' },
          { id: 213, nom: 'Ammar', prenom: 'Aziz', email: 'aziz@email.com', cin: 10000213, mdp: 'pass123' },
          { id: 214, nom: 'Miled', prenom: 'Amel', email: 'amel@email.com', cin: 10000214, mdp: 'pass123' },
          { id: 215, nom: 'Chaabane', prenom: 'Fares', email: 'fares@email.com', cin: 10000215, mdp: 'pass123' },
          { id: 216, nom: 'Bouaziz', prenom: 'Yosra', email: 'yosra@email.com', cin: 10000216, mdp: 'pass123' },
          { id: 217, nom: 'Hammami', prenom: 'Nadia', email: 'nadia@email.com', cin: 10000217, mdp: 'pass123' },
          { id: 218, nom: 'Fersi', prenom: 'Karim', email: 'karim@email.com', cin: 10000218, mdp: 'pass123' },
          { id: 219, nom: 'Mahfoudh', prenom: 'Sami', email: 'sami@email.com', cin: 10000219, mdp: 'pass123' }
        ],
        dateDebut: new Date('2024-06-01'),
        dateFin: new Date('2024-06-20'),
        description: 'Session Juin - 9/15 places',
        complet: false
      }
    ]
  },
  {
    id: 3,
    titre: 'Java Spring Boot - Formation Complète',
    description: 'Développement d\'applications backend avec Java Spring Boot, sécurité et microservices.',
    duree: 10,
    image: 'assets/images/spring.png',
    pdf: 'assets/images/programme_java_spring_boot_formation_complete.pdf',
    niveau: 'intermediaire',
    tags: ['Java', 'Spring Boot', 'Backend', 'REST API', 'Microservices'],
    categorie: ['Développement Backend', 'Java'], 
    sessions: [
      {
        id: 5,
        formateurs: [this.formateurs()[0], this.formateurs()[1]],
        candidats: [
          { id: 301, nom: 'Ben Ali', prenom: 'Mohamed', email: 'mohamed.benali@email.com', cin: 10000001, mdp: 'pass123' },
          { id: 302, nom: 'Trabelsi', prenom: 'Fatma', email: 'fatma.trabelsi@email.com', cin: 10000002, mdp: 'pass123' },
          { id: 303, nom: 'Hammami', prenom: 'Ali', email: 'ali.hammami@email.com', cin: 10000003, mdp: 'pass123' },
          { id: 304, nom: 'Chaabane', prenom: 'Sarra', email: 'sarra.chaabane@email.com', cin: 10000004, mdp: 'pass123' },
          { id: 305, nom: 'Karray', prenom: 'Ahmed', email: 'ahmed.karray@email.com', cin: 10000005, mdp: 'pass123' },
          { id: 306, nom: 'Masmoudi', prenom: 'Leila', email: 'leila.masmoudi@email.com', cin: 10000006, mdp: 'pass123' },
          { id: 307, nom: 'Jlassi', prenom: 'Omar', email: 'omar.jlassi@email.com', cin: 10000007, mdp: 'pass123' },
          { id: 308, nom: 'Bouaziz', prenom: 'Nour', email: 'nour.bouaziz@email.com', cin: 10000008, mdp: 'pass123' },
          { id: 309, nom: 'Gharbi', prenom: 'Karim', email: 'karim.gharbi@email.com', cin: 10000009, mdp: 'pass123' },
          { id: 310, nom: 'Saidi', prenom: 'Amina', email: 'amina.saidi@email.com', cin: 10000010, mdp: 'pass123' },
          { id: 311, nom: 'Fersi', prenom: 'Youssef', email: 'youssef.fersi@email.com', cin: 10000011, mdp: 'pass123' },
          { id: 312, nom: 'Mabrouk', prenom: 'Salma', email: 'salma.mabrouk@email.com', cin: 10000012, mdp: 'pass123' },
          { id: 313, nom: 'Zarrouk', prenom: 'Hichem', email: 'hichem.zarrouk@email.com', cin: 10000013, mdp: 'pass123' },
          { id: 314, nom: 'Bouzid', prenom: 'Ines', email: 'ines.bouzid@email.com', cin: 10000014, mdp: 'pass123' },
          { id: 315, nom: 'Cherif', prenom: 'Ramy', email: 'ramy.cherif@email.com', cin: 10000015, mdp: 'pass123' }
        ],
        dateDebut: new Date('2024-03-01'),
        dateFin: new Date('2024-03-15'),
        description: 'Session Mars - COMPLÈTE (15/15)',
        complet: true
      },
      {
        id: 6,
        formateurs: [this.formateurs()[0]],
        candidats: [
          { id: 316, nom: 'Laroussi', prenom: 'Sami', email: 'sami.laroussi@email.com', cin: 10000016, mdp: 'pass123' },
          { id: 317, nom: 'Ben Ahmed', prenom: 'Rania', email: 'rania.benahmed@email.com', cin: 10000017, mdp: 'pass123' },
          { id: 318, nom: 'Guesmi', prenom: 'Tarek', email: 'tarek.guesmi@email.com', cin: 10000018, mdp: 'pass123' },
          { id: 319, nom: 'Ben Salah', prenom: 'Mariem', email: 'mariem.bensalah@email.com', cin: 10000019, mdp: 'pass123' },
          { id: 320, nom: 'Zaibi', prenom: 'Wassim', email: 'wassim.zaibi@email.com', cin: 10000020, mdp: 'pass123' },
          { id: 321, nom: 'Mansour', prenom: 'Nadia', email: 'nadia.mansour@email.com', cin: 10000021, mdp: 'pass123' },
          { id: 322, nom: 'Ben Youssef', prenom: 'Khaled', email: 'khaled.benyoussef@email.com', cin: 10000022, mdp: 'pass123' },
          { id: 323, nom: 'Ammar', prenom: 'Sonia', email: 'sonia.ammar@email.com', cin: 10000023, mdp: 'pass123' },
          { id: 324, nom: 'Ferchichi', prenom: 'Aziz', email: 'aziz.ferchichi@email.com', cin: 10000024, mdp: 'pass123' },
          { id: 325, nom: 'Ben Ammar', prenom: 'Hana', email: 'hana.benammar@email.com', cin: 10000025, mdp: 'pass123' },
          { id: 326, nom: 'Mahfoudh', prenom: 'Bilel', email: 'bilel.mahfoudh@email.com', cin: 10000026, mdp: 'pass123' },
          { id: 327, nom: 'Chaouch', prenom: 'Amel', email: 'amel.chaouch@email.com', cin: 10000027, mdp: 'pass123' },
          { id: 328, nom: 'Ben Rhouma', prenom: 'Fares', email: 'fares.benrhouma@email.com', cin: 10000028, mdp: 'pass123' },
          { id: 329, nom: 'Miled', prenom: 'Yosra', email: 'yosra.miled@email.com', cin: 10000029, mdp: 'pass123' }
        ],
        dateDebut: new Date('2024-04-01'),
        dateFin: new Date('2024-04-15'),
        description: 'Session Avril - Presque complète (14/15)',
        complet: false
      },
      {
        id: 7,
        formateurs: [this.formateurs()[1]],
        candidats: [],
        dateDebut: new Date('2024-05-01'),
        dateFin: new Date('2024-05-15'),
        description: 'Session Mai - Disponible (0/15)',
        complet: false
      }
    ]
  },
  {
    id: 4,
    titre: 'React.js - De Zéro à Expert',
    description: 'Maîtrisez React.js, la librairie JavaScript la plus populaire pour le développement frontend.',
    duree: 7,
    image: 'assets/images/react.png',
    pdf: 'assets/images/programme_react_js_de_z_ro_expert.pdf',
    niveau: 'intermediaire',
    tags: ['React', 'JavaScript', 'Frontend', 'Hooks', 'Redux'],
    categorie: ['Développement Frontend', 'JavaScript'], 
    sessions: [
      {
        id: 8,
        formateurs: [this.formateurs()[0]],
        candidats: [
          { id: 401, nom: 'Dupont', prenom: 'Jean', email: 'jean@email.com', cin: 10000401, mdp: 'pass123' },
          { id: 402, nom: 'Martin', prenom: 'Marie', email: 'marie@email.com', cin: 10000402, mdp: 'pass123' },
          { id: 403, nom: 'Bernard', prenom: 'Pierre', email: 'pierre@email.com', cin: 10000403, mdp: 'pass123' },
          { id: 404, nom: 'Thomas', prenom: 'Julie', email: 'julie@email.com', cin: 10000404, mdp: 'pass123' },
          { id: 405, nom: 'Robert', prenom: 'Luc', email: 'luc@email.com', cin: 10000405, mdp: 'pass123' }
        ],
        dateDebut: new Date('2024-05-01'),
        dateFin: new Date('2024-05-15'),
        description: 'Session Mai - 5/15 places',
        complet: false
      },
      {
        id: 9,
        formateurs: [this.formateurs()[0]],
        candidats: [
          { id: 406, nom: 'Petit', prenom: 'Sophie', email: 'sophie@email.com', cin: 10000406, mdp: 'pass123' },
          { id: 407, nom: 'Durand', prenom: 'Paul', email: 'paul@email.com', cin: 10000407, mdp: 'pass123' },
          { id: 408, nom: 'Leroy', prenom: 'Alice', email: 'alice@email.com', cin: 10000408, mdp: 'pass123' },
          { id: 409, nom: 'Moreau', prenom: 'Jacques', email: 'jacques@email.com', cin: 10000409, mdp: 'pass123' },
          { id: 410, nom: 'Simon', prenom: 'Claire', email: 'claire@email.com', cin: 10000410, mdp: 'pass123' },
          { id: 411, nom: 'Laurent', prenom: 'Michel', email: 'michel@email.com', cin: 10000411, mdp: 'pass123' },
          { id: 412, nom: 'Lefebvre', prenom: 'Catherine', email: 'catherine@email.com', cin: 10000412, mdp: 'pass123' },
          { id: 413, nom: 'Michel', prenom: 'Philippe', email: 'philippe@email.com', cin: 10000413, mdp: 'pass123' },
          { id: 414, nom: 'Garcia', prenom: 'Isabelle', email: 'isabelle@email.com', cin: 10000414, mdp: 'pass123' },
          { id: 415, nom: 'David', prenom: 'Christophe', email: 'christophe@email.com', cin: 10000415, mdp: 'pass123' },
          { id: 416, nom: 'Bertrand', prenom: 'Nathalie', email: 'nathalie@email.com', cin: 10000416, mdp: 'pass123' },
          { id: 417, nom: 'Roux', prenom: 'Patrick', email: 'patrick@email.com', cin: 10000417, mdp: 'pass123' },
          { id: 418, nom: 'Vincent', prenom: 'Sandra', email: 'sandra@email.com', cin: 10000418, mdp: 'pass123' },
          { id: 419, nom: 'Fournier', prenom: 'Alexandre', email: 'alexandre@email.com', cin: 10000419, mdp: 'pass123' },
          { id: 420, nom: 'Morel', prenom: 'Virginie', email: 'virginie@email.com', cin: 10000420, mdp: 'pass123' }
        ],
        dateDebut: new Date('2024-06-01'),
        dateFin: new Date('2024-06-15'),
        description: 'Session Juin - COMPLÈTE (15/15)',
        complet: true
      }
    ]
  },
  {
    id: 5,
    titre: 'Python pour la Data Science',
    description: 'Apprenez Python et ses bibliothèques pour l\'analyse de données et le machine learning.',
    duree: 10,
    image: 'assets/images/python.png',
    pdf: 'assets/images/programme_python_pour_la_data_science.pdf',
    niveau: 'intermediaire',
    tags: ['Python', 'Data Science', 'Pandas', 'NumPy', 'Machine Learning'],
    categorie: ['Data Science', 'Python'], 
    sessions: [
      {
        id: 10,
        formateurs: [this.formateurs()[0], this.formateurs()[1]],
        candidats: [
          { id: 501, nom: 'Data', prenom: 'Analyst', email: 'analyst@email.com', cin: 10000501, mdp: 'pass123' },
          { id: 502, nom: 'Science', prenom: 'Data', email: 'data@email.com', cin: 10000502, mdp: 'pass123' }
        ],
        dateDebut: new Date('2024-05-20'),
        dateFin: new Date('2024-06-10'),
        description: 'Session Data Science',
        complet: false
      }
    ]
  },
  {
    id: 6,
    titre: 'AWS Cloud Practitioner',
    description: 'Introduction aux services cloud AWS et préparation à la certification AWS.',
    duree: 12,
    image: 'assets/images/aws.png',
    pdf: 'assets/images/programme_aws_cloud_practitioner.pdf',
    niveau: 'avance',
    tags: ['AWS', 'Cloud', 'DevOps', 'Infrastructure', 'Certification'],
    categorie: ['Réseaux et Sécurité', 'Cloud'],
    sessions: [
      {
        id: 11,
        formateurs: [this.formateurs()[0]],
        candidats: [
          { id: 601, nom: 'Cloud', prenom: 'Expert', email: 'cloud@email.com', cin: 10000601, mdp: 'pass123' },
          { id: 602, nom: 'AWS', prenom: 'Master', email: 'aws@email.com', cin: 10000602, mdp: 'pass123' },
          { id: 603, nom: 'DevOps', prenom: 'Engineer', email: 'devops@email.com', cin: 10000603, mdp: 'pass123' }
        ],
        dateDebut: new Date('2024-07-01'),
        dateFin: new Date('2024-07-20'),
        description: 'Session certification AWS',
        complet: false
      }
    ]
  }
]);
  
  getFormateurs() {
    return this.formateurs.asReadonly(); 
  }

   getFormationById(id: number){
    return this.formationsList().find(formation => formation.id === id);
  }
  
  getformations(){
    return this.formationsList();
  }
  
  searchFormationByTitle(title:string){
    return this.formationsList().filter(formation=>formation.titre.toLowerCase().includes( title.toLowerCase()));
  }
  formationsdebutant = computed(()=>this.formationsList().filter(f => f.niveau==='debutant'))
  formationsavance = computed(()=>this.formationsList().filter(f => f.niveau==='avance'))

}
 
