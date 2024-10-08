import type { Entity } from "../types";

export const data: Entity[] = [
    {
        id: "C001",
        type: "Character",
        name: "Darth Vader",
        description: "Former Jedi turned Sith Lord, now serves as the Emperor's right hand. Has a strong connection to the Death Star and wields a red lightsaber.",
        position: {
          distance: 0.4,
          angle: 30
        },
        details: {
          species: "Human/Cyborg",
          affiliation: "Galactic Empire"
        },
        connections: [
          { id: "C002", relationship: "Superior", strength: 0.9 },
          { id: "L001", relationship: "Frequents", strength: 0.85 },
          { id: "O001", relationship: "Wields", strength: 0.7 }
        ]
      },
      {
        id: "C002",
        type: "Character",
        name: "Emperor Palpatine",
        description: "Supreme ruler of the Galactic Empire, known Sith Lord. Operates from the Imperial Palace on Coruscant.",
        position: {
          distance: 0.4,
          angle: 90
        },
        details: {
          species: "Human",
          affiliation: "Galactic Empire"
        },
        connections: [
          { id: "C001", relationship: "Subordinate", strength: 0.9 },
          { id: "L002", relationship: "Base of Operations", strength: 0.95 }
        ]
      },
      {
        id: "L001",
        type: "Location",
        name: "Death Star",
        description: "Massive space station capable of destroying planets. Frequented by Darth Vader and houses a superlaser.",
        position: {
          distance: 0.3,
          angle: 180
        },
        details: {
          type: "Space Station",
          status: "Operational"
        },
        connections: [
          { id: "C001", relationship: "Visited by", strength: 0.85 },
          { id: "O002", relationship: "Houses", strength: 0.8 }
        ]
      },
      {
        id: "L002",
        type: "Location",
        name: "Imperial Palace",
        description: "Center of Imperial power on Coruscant. Residence of Emperor Palpatine and site of key Imperial decision-making.",
        position: {
          distance: 0.4,
          angle: 210
        },
        details: {
          planet: "Coruscant",
          type: "Government Building"
        },
        connections: [
          { id: "C002", relationship: "Residence of", strength: 0.95 }
        ]
      },
      {
        id: "O001",
        type: "Object",
        name: "Red Lightsaber",
        description: "Signature weapon of the Sith, wielded by Darth Vader. Its red color signifies alignment with the dark side of the Force.",
        position: {
          distance: 0.6,
          angle: 300
        },
        details: {
          type: "Weapon",
          color: "Red"
        },
        connections: [
          { id: "C001", relationship: "Owned by", strength: 0.7 }
        ]
      },
      {
        id: "O002",
        type: "Object",
        name: "Superlaser",
        description: "The Death Star's primary weapon, capable of destroying entire planets. Represents the ultimate destructive power of the Empire.",
        position: {
          distance: 0.5,
          angle: 330
        },
        details: {
          type: "Weapon",
          status: "Active"
        },
        connections: [
          { id: "L001", relationship: "Part of", strength: 0.8 }
        ]
      }
];