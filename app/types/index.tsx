export interface Position {
    distance: number;
    angle: number;
  }
  
export interface Connection {
    id: string;
    relationship: string;
    strength: number;
}

export interface Entity {
    id: string;
    type: "Character" | "Location" | "Object";
    name: string;
    description: string;
    position: Position;
    details: { [key: string]: string };
    connections: Connection[];
}